/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import {
  FocusgroupNavigationController,
  PlacementController,
  type PlacementOptions,
} from '@adobe/spectrum-wc-core/controllers/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { SizedMixin } from '@adobe/spectrum-wc-core/mixins/index.js';
import {
  deepContains,
  getActiveElement,
  isTopDismissible,
  physicalSide,
  registerDismissible,
  resolveTrigger,
  unregisterDismissible,
  validateAllowedChildren,
  validateEnum,
  warnIf,
} from '@adobe/spectrum-wc-core/utils/index.js';

import {
  MENU_ALLOWED_CHILDREN,
  MENU_PLACEMENTS,
  MENU_VALID_SIZES,
  type MenuPlacement,
  type MenuSize,
} from './Menu.types.js';

/**
 * The `aria-controls` relationship is wired via the element-reference IDL
 * (`ariaControlsElements`) so it works across shadow boundaries. The property
 * is Baseline but not yet in every TypeScript DOM lib, so it is declared here.
 */
interface ARIAControlsElements {
  ariaControlsElements?: readonly Element[] | null;
}

const DOCS_URL =
  'https://spectrum-web-components.adobe.com/?path=/docs/components-menu--docs';

/**
 * Base class for the menu host. Implements the
 * {@link https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/ | menu button}
 * pattern: an externally-referenced trigger (`for`/`triggerElement`) opens a
 * `PlacementController`-anchored surface containing a `role="menu"` list.
 * ARIA and click-to-toggle wiring on the trigger, open/close events, roving
 * `tabindex` and arrow-key navigation among `swc-menu-item` rows, Escape to
 * close, and initial/return focus are all handled here.
 *
 * @slot - `swc-menu-item` elements. `swc-menu-group` and `swc-divider` (as a
 *   separator) join in a later migration phase.
 *
 * @fires swc-open - Dispatched when the menu begins to open.
 * @fires swc-after-open - Dispatched after the menu finishes opening.
 * @fires swc-close - Dispatched when the menu begins to close.
 * @fires swc-after-close - Dispatched after the menu finishes closing.
 */
export abstract class MenuBase extends SizedMixin(SpectrumElement, {
  validSizes: MENU_VALID_SIZES,
}) {
  /**
   * The size of the menu.
   *
   * @default m
   */
  declare public size: MenuSize;

  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * The `id` of the trigger element in the same document tree root.
   */
  @property({ attribute: 'for', type: String })
  public for: string | undefined;

  /**
   * Explicit trigger element reference; overrides `for` when set. Use when
   * `getElementById` cannot reach the trigger, such as across a shadow
   * boundary.
   *
   * @default null
   */
  @property({ attribute: false })
  public triggerElement: HTMLElement | null = null;

  /**
   * Where the anchored surface opens relative to the trigger, and its
   * cross-axis alignment against it.
   *
   * @default 'bottom-start'
   */
  @property({ type: String, reflect: true })
  public placement: MenuPlacement = 'bottom-start';

  /**
   * Whether the surface may reposition to the opposite side when the
   * requested direction does not fit within the viewport.
   *
   * @default true
   */
  @property({ type: Boolean, attribute: 'should-flip' })
  public shouldFlip: boolean = true;

  /**
   * Whether the menu is open.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public open: boolean = false;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  private readonly placementController = new PlacementController(this);

  /**
   * The AT-facing trigger element currently wired with `aria-controls`,
   * `aria-expanded`, and `aria-haspopup`. Tracked separately from `for`/
   * `triggerElement` so a previously-wired trigger can be cleaned up if the
   * resolved trigger changes.
   */
  private _interactiveElement: (HTMLElement & ARIAControlsElements) | null =
    null;

  /** The trigger element currently carrying the click-to-toggle listener. */
  private _trigger: HTMLElement | null = null;

  private readonly _handleTriggerClick = (): void => {
    this.open = !this.open;
  };

  /**
   * The element `PlacementController` positions: `swc-menu`'s shadow-internal
   * `role="menu"` surface. Returns `null` in the base class; the SWC
   * rendering layer overrides this once that surface exists.
   */
  protected get surfaceElement(): HTMLElement | null {
    return null;
  }

  /**
   * Roving-tabindex and arrow-key navigation among `swc-menu-item` rows.
   * `wrap: true` overrides the controller's toolbar-oriented default so
   * ArrowDown from the last item goes to the first (and reverse), matching
   * menu-button convention; `skipDisabled` and `memory` keep the controller's
   * own defaults (`false`/`true`) — disabled rows stay in the roving set per
   * the APG's focusability-of-disabled-controls guidance.
   */
  private readonly focusNavigation = new FocusgroupNavigationController(this, {
    direction: 'vertical',
    wrap: true,
    getItems: () => this.getMenuItems(),
  });

  /**
   * Whether focus should return to the trigger once the current close
   * finishes. Snapshotted in `willUpdate()`, before render can react to the
   * new `open` value, so a later show/hide mechanism dropping focus to the
   * document does not race this check.
   */
  private _restoreFocusToTrigger = false;

  // Direct `swc-menu-item` children only this phase; `swc-menu-group` joins
  // once it exists (Phase B), extending this to also collect its default
  // slot's items, matching the a11y analysis's illustrative query.
  private getMenuItems(): HTMLElement[] {
    return Array.from(
      this.querySelectorAll<HTMLElement>(':scope > swc-menu-item')
    );
  }

  // `deepContains` crosses shadow boundaries, so focus inside a slotted
  // custom element's own shadow tree (e.g. a future `swc-menu-item` internal
  // part) is still detected as "inside the menu".
  private isFocusWithin(): boolean {
    return deepContains(this, getActiveElement());
  }

  // Escape closes the menu. Registered on `document` (capture) only while
  // open (see `updated()`), matching `Tooltip.base.ts`/`Popover.base.ts`:
  // `swc-menu` has no native top-layer light-dismiss to fall back on.
  private readonly handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape' || !this.open) {
      return;
    }
    // Only the topmost dismissible handles Escape; a surface above us
    // (e.g. a submenu, once those exist) gets it first.
    if (!isTopDismissible(this)) {
      return;
    }
    event.preventDefault();
    this.open = false;
  };

  // Removes this menu's aria-controls reference from a previously-wired
  // trigger and clears the state/expanded attributes it owns, so a stale
  // trigger never retains a reference to this menu.
  private clearTriggerAria(): void {
    if (!this._interactiveElement) {
      return;
    }
    const stale = this._interactiveElement;
    stale.ariaControlsElements = (stale.ariaControlsElements ?? []).filter(
      (el) => el !== this
    );
    stale.removeAttribute('aria-expanded');
    stale.removeAttribute('aria-haspopup');
    this._interactiveElement = null;
  }

  private removeTriggerClickListener(): void {
    this._trigger?.removeEventListener('click', this._handleTriggerClick);
    this._trigger = null;
  }

  // Resolves `for`/`triggerElement`, wires ARIA onto the AT-facing
  // `interactiveElement`, and keeps the click-to-toggle listener on the
  // positioning `trigger` in sync. Called on every relevant property change,
  // not just once, so a trigger swapped while open is rewired cleanly.
  private wireTrigger(): void {
    const { trigger, interactiveElement } = resolveTrigger(this, {
      for: this.for,
      triggerElement: this.triggerElement,
    });

    warnIf(
      this,
      !trigger && Boolean(this.for),
      `<${this.localName}> for="${this.for}" did not resolve to an element in the current tree root. Check that the referenced id exists in the same document tree root.`,
      DOCS_URL,
      { level: 'high' }
    );

    const target = interactiveElement as
      | (HTMLElement & ARIAControlsElements)
      | null;
    if (this._interactiveElement && this._interactiveElement !== target) {
      this.clearTriggerAria();
    }
    this._interactiveElement = target;
    if (target) {
      target.ariaControlsElements = [this];
      target.setAttribute('aria-expanded', String(this.open));
      target.setAttribute('aria-haspopup', 'menu');
    }

    if (trigger !== this._trigger) {
      this.removeTriggerClickListener();
      if (trigger) {
        trigger.addEventListener('click', this._handleTriggerClick);
      }
      this._trigger = trigger;
    }
  }

  private startPlacement(): void {
    const surface = this.surfaceElement;
    if (!this._trigger || !surface) {
      return;
    }
    const options: PlacementOptions = {
      placement: this.placement,
      shouldFlip: this.shouldFlip,
      onPlacementChange: (resolvedPlacement) => {
        this.setAttribute('actual-placement', physicalSide(resolvedPlacement));
      },
    };
    this.placementController.start(this._trigger, surface, options);
  }

  // No CSS transition exists on the surface yet — that lands with rendering
  // in a later migration phase — so the after-* event fires synchronously
  // right behind the before-* event rather than waiting on `transitionend`
  // the way `Tooltip.base.ts`/`Popover.base.ts` do.
  //
  // Each event is dispatched from its own literal `new CustomEvent(...)` call
  // (not a shared helper keyed by a ternary) because the custom-elements-manifest
  // analyzer statically scans `dispatchEvent(new CustomEvent(...))` calls to
  // auto-detect events; a ternary event name has no literal `.text` for it to
  // read, and it emits an extra nameless event in the manifest for one.
  private dispatchOpenEvents(isOpen: boolean): void {
    if (isOpen) {
      this.dispatchEvent(
        new CustomEvent('swc-open', { bubbles: true, composed: true })
      );
      this.dispatchEvent(
        new CustomEvent('swc-after-open', { bubbles: true, composed: true })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent('swc-close', { bubbles: true, composed: true })
      );
      this.dispatchEvent(
        new CustomEvent('swc-after-close', { bubbles: true, composed: true })
      );
    }
  }

  /**
   * Validates that only `swc-menu-item` elements are slotted this phase. Wire
   * this to the default `<slot>`'s `slotchange` event in the SWC render().
   */
  protected handleDefaultSlotChange(event: Event): void {
    validateAllowedChildren(
      this,
      event.target as HTMLSlotElement,
      MENU_ALLOWED_CHILDREN,
      'default',
      DOCS_URL
    );
    this.focusNavigation.refresh();
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    // Snapshot before render reacts to the new `open` value (see
    // `_restoreFocusToTrigger`'s own doc). Reuses the same "not the
    // initialization entry" check as the `openChanged` guard below.
    if (
      changedProperties.has('open') &&
      changedProperties.get('open') !== undefined &&
      !this.open
    ) {
      this._restoreFocusToTrigger = this.isFocusWithin();
    }
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('placement')) {
      validateEnum(this, {
        prop: 'placement',
        value: this.placement,
        valid: MENU_PLACEMENTS,
        url: DOCS_URL,
      });
    }

    if (
      changedProperties.has('for') ||
      changedProperties.has('triggerElement') ||
      changedProperties.has('open')
    ) {
      this.wireTrigger();
    }

    // `changedProperties.get('open')` is the previous value. On the very
    // first `updated()` call, the entry recorded for the property's own
    // initializer has no real previous value: it reads `undefined`, not
    // `false`. Checking for that excludes that initialization entry so a
    // menu that starts closed does not dispatch a phantom `swc-close` (or one
    // that starts open, `swc-open`) the moment it first renders.
    const openChanged =
      changedProperties.has('open') &&
      changedProperties.get('open') !== undefined;
    if (openChanged) {
      this.dispatchOpenEvents(this.open);
      if (this.open) {
        registerDismissible(this);
        document.addEventListener('keydown', this.handleKeyDown, {
          capture: true,
        });
        this.startPlacement();
        // Re-checks eligibility (e.g. newly visible rows) before moving focus
        // in, then delegates "first item" to the controller's own preferred-
        // item algorithm rather than re-deriving eligibility here.
        this.focusNavigation.refresh();
        const active = this.focusNavigation.getActiveItem();
        if (active) {
          // Deferred with `queueMicrotask` per the controller's own
          // documented pattern for focusing from a trigger `click` handler:
          // otherwise the browser moves focus back to the trigger after the
          // click handler (which set `open`) returns.
          queueMicrotask(() => active.focus());
        }
      } else {
        unregisterDismissible(this);
        document.removeEventListener('keydown', this.handleKeyDown, {
          capture: true,
        });
        this.placementController.stop();
        this.removeAttribute('actual-placement');
        if (this._restoreFocusToTrigger) {
          this._restoreFocusToTrigger = false;
          this._interactiveElement?.focus({ preventScroll: true });
        }
      }
    } else if (
      this.open &&
      (changedProperties.has('placement') ||
        changedProperties.has('shouldFlip') ||
        changedProperties.has('for') ||
        changedProperties.has('triggerElement'))
    ) {
      // Re-anchor while open when a positioning input or the trigger changes.
      this.startPlacement();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.placementController.stop();
    this.clearTriggerAria();
    this.removeTriggerClickListener();
    unregisterDismissible(this);
    document.removeEventListener('keydown', this.handleKeyDown, {
      capture: true,
    });
  }
}
