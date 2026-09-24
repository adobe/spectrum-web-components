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
  TriggerPressController,
} from '@adobe/spectrum-wc-core/controllers/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { SizedMixin } from '@adobe/spectrum-wc-core/mixins/index.js';
import {
  deepContains,
  getActiveElement,
  physicalSide,
  registerDismissible,
  resolveTrigger,
  runAfterTransition,
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

// Element-reference IDL, Baseline but not yet in every TypeScript DOM lib.
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
 * The shadow-internal surface is a native `popover="auto"` element, so
 * Escape and outside clicks close it via the platform's own light-dismiss.
 *
 * @slot - `swc-menu-item` elements. `swc-menu-group` and `swc-divider` (as a
 *   separator) join in a later migration phase.
 *
 * @fires swc-open - Dispatched when the menu begins opening.
 * @fires swc-after-open - Dispatched after the open transition completes.
 * @fires swc-close - Dispatched when the menu begins closing.
 * @fires swc-after-close - Dispatched after the close transition completes.
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

  // AT-facing element wired with aria-controls/aria-expanded/aria-haspopup;
  // tracked so a previously-wired trigger can be cleaned up on change.
  private _interactiveElement: (HTMLElement & ARIAControlsElements) | null =
    null;

  /** The trigger element currently carrying the click-to-toggle listeners. */
  private _trigger: HTMLElement | null = null;

  // Click-to-toggle on the resolved trigger, without the surface reopening on
  // the same click that light-dismissed it (see the controller's own doc for
  // why that needs dedicated gesture tracking, not just a naive toggle).
  private readonly _pressGuard = new TriggerPressController(this);

  // The element PlacementController positions. Null in the base class; the
  // SWC rendering layer overrides this once the shadow surface exists.
  protected get surfaceElement(): HTMLElement | null {
    return null;
  }

  // Roving-tabindex/arrow-key navigation. `wrap: true` overrides the
  // controller's toolbar-oriented default to match menu-button convention.
  private readonly focusNavigation = new FocusgroupNavigationController(this, {
    direction: 'vertical',
    wrap: true,
    getItems: () => this.getMenuItems(),
  });

  // Suppresses the open/close effect in updated() when `open` is being
  // synced from a native beforetoggle reaction rather than driving one.
  private _syncingOpen = false;

  // Set at the end of every updated() call; suppresses only the phantom
  // event dispatch and initial focus-steal on the very first render.
  private _hasCompletedFirstUpdate = false;

  // Cancels the pending `_afterTransition` run armed by the last open/close
  // cycle, matching `Popover.base.ts`'s own field of the same name.
  private _cancelAfterTransition?: () => void;

  // Direct `swc-menu-item` children only this phase; `swc-menu-group` joins
  // once it exists (Phase B).
  private getMenuItems(): HTMLElement[] {
    return Array.from(
      this.querySelectorAll<HTMLElement>(':scope > swc-menu-item')
    );
  }

  // `deepContains` crosses shadow boundaries, so focus inside a slotted
  // item's own shadow tree still counts as "inside the menu".
  private isFocusWithin(): boolean {
    return deepContains(this, getActiveElement());
  }

  // Whether the event's path crosses a roving-tabindex row, so keyboard and
  // pointer activation agree on what counts as a row.
  private isMenuItemEventTarget(event: Event): boolean {
    const items = new Set(this.getMenuItems());
    return event.composedPath().some((node) => items.has(node as HTMLElement));
  }

  // Traps Tab/Shift+Tab on the active row; Enter activates it like a click.
  // Escape is handled by the native popover light-dismiss, not here.
  private readonly handleKeyDown = (event: KeyboardEvent): void => {
    if (!this.open) {
      return;
    }
    if (event.key === 'Tab' && this.isMenuItemEventTarget(event)) {
      // Arrow keys are the only way to move among rows while open.
      event.preventDefault();
      return;
    }
    if (event.key === 'Enter' && this.isMenuItemEventTarget(event)) {
      // Suppresses the browser's own Enter default-action, which would
      // otherwise re-activate whatever has focus once it resolves.
      event.preventDefault();
      this.open = false;
    }
  };

  // Closes the menu when a slotted row is clicked; no submenus/selection to
  // special-case yet, so any click on a roving-tabindex item counts.
  private readonly handleItemActivate = (event: MouseEvent): void => {
    if (!this.open || !this.isMenuItemEventTarget(event)) {
      return;
    }
    this.open = false;
  };

  // Wired once for the connected lifetime; the handler no-ops when closed.
  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this.handleItemActivate);
  }

  // Clears aria-controls/expanded/haspopup from a previously-wired trigger.
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

  // Resolves for/triggerElement, wires ARIA, and keeps the click listener in
  // sync; called on every relevant property change, not just once.
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

    // `attach` is a no-op for an unchanged trigger.
    this._pressGuard.attach(trigger, {
      onToggle: () => (this.open = !this.open),
    });
    this._trigger = trigger;
  }

  private startPlacement(): void {
    const surface = this.surfaceElement;
    if (!this._trigger || !surface) {
      return;
    }
    const options: PlacementOptions = {
      placement: this.placement,
      shouldFlip: this.shouldFlip,
      // Fixed trigger-to-surface gap, not consumer-tunable (see the plan's
      // Q20). 8px matches spectrum-css's own
      // --spectrum-actionmenu-button-to-menu-gap (= --spectrum-spacing-100).
      offset: 8,
      onPlacementChange: (resolvedPlacement) => {
        this.setAttribute('actual-placement', physicalSide(resolvedPlacement));
      },
    };
    this.placementController.start(this._trigger, surface, options);
  }

  // Each event is its own literal `new CustomEvent(...)` call, not a shared
  // helper, so the custom-elements-manifest analyzer can statically detect it.
  private _dispatchOpen(): void {
    this.dispatchEvent(
      new CustomEvent('swc-open', { bubbles: true, composed: true })
    );
    // No fallback timer on open: nothing is gated on `swc-after-open`, so a
    // delayed (janky) `transitionend` must not be pre-empted by the timer
    // (matches `Popover.base.ts`'s own `_dispatchOpen`).
    this._afterTransition(() => {
      this.dispatchEvent(
        new CustomEvent('swc-after-open', { bubbles: true, composed: true })
      );
    }, false);
  }

  private _dispatchClose(): void {
    this.dispatchEvent(
      new CustomEvent('swc-close', { bubbles: true, composed: true })
    );
    this._afterTransition(() => {
      this.dispatchEvent(
        new CustomEvent('swc-after-close', { bubbles: true, composed: true })
      );
      this._stopPositioningWhenClosed();
    });
  }

  // Run `callback` once the surface's CSS transition settles (or
  // immediately when none will run). Each call supersedes the previous
  // open/close cycle's pending run, so a rapid close-then-reopen never
  // dispatches a spurious `swc-after-close` after reopening. `fallback` arms
  // the allow-discrete safety timer (default true; the close path relies on
  // it to always tear down positioning). Matches `Popover.base.ts`'s own
  // `_afterTransition`.
  private _afterTransition(callback: () => void, fallback = true): void {
    this._cancelAfterTransition?.();
    const element = this.surfaceElement;
    if (!element) {
      callback();
      return;
    }
    this._cancelAfterTransition = runAfterTransition(
      element,
      () => {
        this._cancelAfterTransition = undefined;
        callback();
      },
      { fallback }
    );
  }

  // Clears the now-stale `actual-placement` attribute once the exit
  // transition finishes, so the discrete transition doesn't snap to its
  // default mid-fade. Guarded by `!this.open` so a rapid reopen during the
  // fade keeps its positioning (matches `Popover.base.ts`'s own
  // `_stopPositioningWhenClosed`).
  private _stopPositioningWhenClosed(): void {
    if (this.open) {
      return;
    }
    this.placementController.stop();
    this.removeAttribute('actual-placement');
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

  // Enters the top layer; the rest of the open side effects only run once
  // that actually succeeds.
  private _show(): void {
    const surface = this.surfaceElement;
    if (!surface) {
      return;
    }
    let shown = surface.matches(':popover-open');
    if (!shown) {
      try {
        surface.showPopover();
        shown = true;
      } catch {
        shown = false;
      }
    }
    if (!shown) {
      return;
    }
    if (this._hasCompletedFirstUpdate) {
      this._dispatchOpen();
    }
    registerDismissible(this);
    document.addEventListener('keydown', this.handleKeyDown, {
      capture: true,
    });
    this.startPlacement();
    // `startPlacement()` no-ops without a resolved trigger, which leaves
    // `actual-placement` unset and the surface invisible (menu.css gates
    // `opacity` on it). Without this guard the menu would still move focus
    // into that invisible surface (e.g. `open` set with a missing or
    // mistyped `for`).
    if (this._hasCompletedFirstUpdate && this._trigger) {
      // Forces the first item active rather than trusting the controller's
      // own memory-preferring refresh(); every normal open lands on row one.
      this.focusNavigation.refresh();
      const firstItem = this.getMenuItems()[0];
      const active =
        (firstItem &&
          this.focusNavigation.setActiveItem(firstItem) &&
          firstItem) ||
        this.focusNavigation.getActiveItem();
      if (active) {
        // Deferred so the browser doesn't move focus back to the trigger
        // after the click handler that set `open` returns. `preventScroll`
        // because this fires before PlacementController's async compute has
        // applied the real position, so an unguarded focus() would scroll
        // the page to this item's temporary, not-yet-positioned location.
        queueMicrotask(() => active.focus({ preventScroll: true }));
      }
    }
  }

  // Only asks the surface to leave the top layer; the close side effects
  // run from `_onBeforeToggle` so teardown lives in one place.
  private _hide(): void {
    const surface = this.surfaceElement;
    if (surface?.matches(':popover-open')) {
      try {
        surface.hidePopover();
      } catch {
        /* already hidden */
      }
    }
  }

  // Sets `open` without re-entering _show()/_hide() for the resulting
  // updated() call, matching Popover.base.ts's own _syncOpen().
  private _syncOpen(value: boolean): void {
    if (this.open === value) {
      return;
    }
    this._syncingOpen = true;
    this.open = value;
  }

  // Single reconciliation point for any close, native or programmatic;
  // bound in the SWC render template's beforetoggle binding.
  protected _onBeforeToggle = (event: ToggleEvent): void => {
    if (event.newState === 'open') {
      return;
    }
    // A press on the trigger while open light-dismisses the surface (an
    // "outside" click from the popover's perspective) before the trailing
    // click fires; correlate that dismissal here so the trailing click reads
    // as the close rather than a reopen (see `TriggerPressController`).
    // `this.open` is still `true` here for a genuine native dismiss; a
    // programmatic close (e.g. `_hide()`) already set it `false` before this
    // fires.
    if (this.open) {
      this._pressGuard.noteNativeDismiss();
    }
    const restoreFocusToTrigger = this.isFocusWithin();
    this._syncOpen(false);
    // Freeze positioning at the current location the moment the close
    // begins: `stop()` tears down the `autoUpdate` loop but leaves
    // `actual-placement` in place until `_stopPositioningWhenClosed`, so the
    // surface fades out from where it is instead of snapping mid-fade.
    this.placementController.stop();
    if (this._hasCompletedFirstUpdate) {
      this._dispatchClose();
    } else {
      this._stopPositioningWhenClosed();
    }
    unregisterDismissible(this);
    document.removeEventListener('keydown', this.handleKeyDown, {
      capture: true,
    });
    if (restoreFocusToTrigger) {
      this._interactiveElement?.focus({ preventScroll: true });
    }
  };

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

    // Runs on every `open` change, including the first render for a menu
    // that starts open; `_show()`/`_hasCompletedFirstUpdate` gate the
    // phantom event and focus-steal, not this branch itself.
    if (changedProperties.has('open')) {
      if (this._syncingOpen) {
        // Reconciling a native light-dismiss; already in the right state.
        this._syncingOpen = false;
      } else if (this.open) {
        this._show();
      } else {
        this._hide();
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

    this._hasCompletedFirstUpdate = true;
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.placementController.stop();
    this.clearTriggerAria();
    this._trigger = null;
    unregisterDismissible(this);
    document.removeEventListener('keydown', this.handleKeyDown, {
      capture: true,
    });
    this.removeEventListener('click', this.handleItemActivate);
  }
}
