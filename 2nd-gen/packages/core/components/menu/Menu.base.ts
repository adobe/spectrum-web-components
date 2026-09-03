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
  type Placement,
  PlacementController,
  type PlacementOptions,
} from '@adobe/spectrum-wc-core/controllers/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { SizedMixin } from '@adobe/spectrum-wc-core/mixins/index.js';
import {
  physicalSide,
  resolveTrigger,
  validateAllowedChildren,
  validateEnum,
  warnIf,
} from '@adobe/spectrum-wc-core/utils/index.js';

import {
  MENU_ALIGNMENTS,
  MENU_ALLOWED_CHILDREN,
  MENU_DIRECTIONS,
  MENU_VALID_SIZES,
  type MenuAlignment,
  type MenuDirection,
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
 * ARIA and click-to-toggle wiring on the trigger, and open/close events, are
 * handled here. Keyboard/focus management inside the list is added in a
 * later migration phase.
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
   * Where the anchored surface opens relative to the trigger.
   *
   * @default 'bottom'
   */
  @property({ type: String, reflect: true })
  public direction: MenuDirection = 'bottom';

  /**
   * Cross-axis alignment of the anchored surface against the trigger.
   *
   * @default 'start'
   */
  @property({ type: String, reflect: true })
  public align: MenuAlignment = 'start';

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
   * Translates the public `direction`/`align` pair into the `Placement`
   * value `PlacementController` understands. Floating UI's `Placement` type
   * uses physical `top`/`bottom` alignment suffixes for the `left`/`right`/
   * `start`/`end` sides (`left-top`, `start-bottom`, etc.) — only the
   * `bottom`/`top` sides pair directly with a `start`/`end` suffix. For the
   * other four, `align: 'start'` maps to the top-aligned cross-axis edge and
   * `'end'` to the bottom-aligned edge, mirroring how `start`/`end` already
   * reads top-to-bottom for block direction elsewhere in the API.
   */
  private resolvePlacement(): Placement {
    const { direction, align } = this;
    if (direction === 'bottom' || direction === 'top') {
      return `${direction}-${align}` as Placement;
    }
    const crossAxis = align === 'start' ? 'top' : 'bottom';
    return `${direction}-${crossAxis}` as Placement;
  }

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
      placement: this.resolvePlacement(),
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
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('direction')) {
      validateEnum(this, {
        prop: 'direction',
        value: this.direction,
        valid: MENU_DIRECTIONS,
        url: DOCS_URL,
      });
    }
    if (changedProperties.has('align')) {
      validateEnum(this, {
        prop: 'align',
        value: this.align,
        valid: MENU_ALIGNMENTS,
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

    const openChanged = changedProperties.has('open');
    if (openChanged) {
      this.dispatchOpenEvents(this.open);
      if (this.open) {
        this.startPlacement();
      } else {
        this.placementController.stop();
        this.removeAttribute('actual-placement');
      }
    } else if (
      this.open &&
      (changedProperties.has('direction') ||
        changedProperties.has('align') ||
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
  }
}
