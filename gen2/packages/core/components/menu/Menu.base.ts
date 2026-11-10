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
  SlotAttributePropagationController,
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
import { isMenuActivationKey } from './MenuItem.base.js';

// Element-reference IDL, Baseline but not yet in every TypeScript DOM lib.
interface ARIAControlsElements {
  ariaControlsElements?: readonly Element[] | null;
}

// `aria-labelledby` as an element reference, so the shadow-internal
// `role="menu"` surface can be named by a trigger in another tree root
// (an IDREF cannot cross that boundary).
interface ARIALabelledByElements {
  ariaLabelledByElements?: readonly Element[] | null;
}

const DOCS_URL =
  'https://spectrum-web-components.adobe.com/?path=/docs/components-menu--docs';

// Read off the attribute, not a `disabled` property: rows stay in the roving
// set via `aria-disabled`, and the menu never requires the `swc-menu-item`
// class to be loaded to read one.
const isRowDisabled = (row: HTMLElement): boolean =>
  row.getAttribute('aria-disabled') === 'true';

/**
 * How long typed characters keep accumulating into one typeahead search. Long
 * enough to type a word at speed, short enough that a pause starts over.
 */
const TYPEAHEAD_TIMEOUT_MS = 500;

/**
 * Whether a press is a printable character, which APG routes to typeahead
 * rather than to navigation. `event.key` holds the character itself for
 * printable keys and a name like `ArrowDown` for the rest, so a single code
 * unit is the test. A modified press belongs to the app, and Space activates
 * the row rather than searching.
 */
const isTypeaheadKey = (event: KeyboardEvent): boolean =>
  event.key.length === 1 &&
  event.key !== ' ' &&
  !event.altKey &&
  !event.ctrlKey &&
  !event.metaKey;

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

  // The menu owns its rows' size, the way `swc-accordion` owns its items'.
  // Authoring it per row would let one menu render mismatched rows, and
  // `menu.mdx` tells consumers to set it once on the menu. Writing the
  // attribute rather than the property means it lands whether or not the row
  // class has upgraded yet, the same reason `isRowDisabled` reads an
  // attribute.
  private readonly _sizePropagation = new SlotAttributePropagationController(
    this,
    {
      attribute: 'size',
      getValue: () => this.size,
      selector: 'swc-menu-item',
    }
  );

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

  // The roving-tabindex row the event passed through, so keyboard and
  // pointer activation agree on what counts as a row.
  private menuItemFromEvent(event: Event): HTMLElement | null {
    const items = new Set(this.getMenuItems());
    const row = event
      .composedPath()
      .find((node) => items.has(node as HTMLElement));
    return (row as HTMLElement) ?? null;
  }

  // Closes the menu on Tab and claims Enter and Space without acting on them:
  // the row turns those into a click on keydown, and that click is what closes
  // the menu. Escape is native.
  private readonly handleKeyDown = (event: KeyboardEvent): void => {
    if (!this.open) {
      return;
    }
    // Any key hands control back to the keyboard, so the row the pointer
    // focused may show its ring again. Before the checks below, because a key
    // that this menu does not handle still ends the pointer's turn.
    this.clearPointerFocus();
    const item = this.menuItemFromEvent(event);
    if (!item) {
      return;
    }
    if (event.key === 'Tab') {
      // APG: Tab moves focus out of the menu and closes it, rather than moving
      // between rows. Closed through `_hide()` rather than by assigning `open`,
      // because that update is asynchronous and the browser would move focus
      // out of the row before the menu got out of the way. `_hide()` reconciles
      // synchronously through `_onBeforeToggle`, which restores focus to the
      // trigger, so the default action this deliberately does not prevent
      // carries on from there.
      this._hide();
      return;
    }
    if (isMenuActivationKey(event)) {
      // Claim the key only. The row activates on this same keydown and closes
      // the menu through its own click, so keyboard and pointer share one
      // path: activate, then close. Closing here instead would close first and
      // activate afterwards.
      event.preventDefault();
      // Closing restores focus to the trigger, so the auto-repeats and the
      // keyup of this same press land on a button that would treat them as its
      // own activation and reopen the menu. The press is held off until the
      // key that began it is released. Capture on `document`, because by then
      // neither this menu nor the row is in the event's path.
      this._activationKeyHeld = true;
      document.addEventListener('keyup', this.releaseActivationKey, {
        capture: true,
      });
      return;
    }
    if (isTypeaheadKey(event)) {
      this.typeahead(event.key);
    }
  };

  // APG's optional printable-character support: typing moves focus to the row
  // whose label starts with what was typed. Buffered, so quick typing matches a
  // prefix rather than restarting at every letter, and the buffer expires so the
  // next search starts clean.
  private _typeaheadPrefix = '';

  private _typeaheadTimer?: ReturnType<typeof setTimeout>;

  private typeahead(character: string): void {
    this._typeaheadPrefix += character;
    clearTimeout(this._typeaheadTimer);
    this._typeaheadTimer = setTimeout(() => {
      this._typeaheadPrefix = '';
    }, TYPEAHEAD_TIMEOUT_MS);
    // The controller owns which label a row answers to, reading `aria-label`
    // and `aria-labelledby` before text, and applies the roving tabindex. It
    // deliberately leaves the focus call to its host. No match means focus
    // stays where it is, which is what APG asks for.
    //
    // A disabled row cannot be reached this way: the controller treats any
    // element with a truthy `disabled` property as natively unfocusable and
    // moves the tab stop to the first enabled row, and a row carries that
    // property for its `aria-disabled` semantics. Arrow keys reach disabled
    // rows because they do not go through this path.
    if (
      this.focusNavigation.focusFirstItemByTextPrefix(this._typeaheadPrefix)
    ) {
      this.focusNavigation.getActiveItem()?.focus({ preventScroll: true });
    }
  }

  private clearTypeahead(): void {
    clearTimeout(this._typeaheadTimer);
    this._typeaheadPrefix = '';
  }

  // True from the keydown that chose a row until that key comes back up. See
  // `handleKeyDown` for why the trigger has to ignore the rest of that press.
  private _activationKeyHeld = false;

  private _releaseTimer?: ReturnType<typeof setTimeout>;

  private readonly releaseActivationKey = (): void => {
    document.removeEventListener('keyup', this.releaseActivationKey, {
      capture: true,
    });
    // Not cleared on the keyup itself. A button activates Space on its keyup,
    // and this capture-phase listener runs before that: clearing here would
    // let the click the keyup produces reopen the menu, which is the very
    // thing being guarded against. The timer clears it once the key's own
    // default action has run. Enter needs no such wait, but shares the path.
    this._releaseTimer = setTimeout(() => {
      this._activationKeyHeld = false;
    });
  };

  // Focus follows the pointer, the way it does in 1st-gen and in the native
  // menus this pattern imitates. Opening moves focus to the first row, so
  // without this a keyboard-opened menu keeps its focus ring on row one while
  // the pointer hovers another, showing two rows as active at once; arrow keys
  // would then resume from the row the user stopped looking at.
  //
  // Driven by `pointermove`, not `pointerover`. `pointerover` also fires for a
  // row that arrives under a cursor which never moved, so a menu opened by
  // keyboard with the mouse resting over it would start focused under the
  // cursor and Enter would choose that row instead of the first. Movement is
  // the thing that means the pointer, rather than the keyboard, is in use, and
  // a still cursor produces none.
  //
  // Fires repeatedly across a row, hence the guards against repeating work.
  private readonly handleItemPointerMove = (event: PointerEvent): void => {
    if (!this.open) {
      return;
    }
    const item = this.menuItemFromEvent(event);
    if (!item) {
      return;
    }
    // Marked before the focus check, not after it. Opening focuses the first
    // row, so hovering that row has nothing to move and would otherwise leave
    // it unmarked and unhighlighted: the pointer is on it either way. Skipped
    // when it is already the marked row, because this runs on every movement
    // and the attribute reflects to a reactive property.
    if (this._pointerFocusedItem !== item) {
      this.setPointerFocus(item);
    }
    if (item === getActiveElement()) {
      return;
    }
    this.focusNavigation.setActiveItem(item);
    // `preventScroll`: the surface must not scroll out from under the pointer.
    item.focus({ preventScroll: true });
  };

  // The row whose focus ring is suppressed because the pointer, not the
  // keyboard, put focus there. Tracked so it can be cleared again; reading it
  // back off the DOM would miss a row that has since been removed.
  private _pointerFocusedItem: HTMLElement | null = null;

  // Marks the row the pointer focused. The flag lives on the row because the
  // ring is drawn inside its shadow tree, where this menu's own state is not
  // reachable from CSS.
  private setPointerFocus(item: HTMLElement): void {
    this.clearPointerFocus();
    item.toggleAttribute('pointer-focus', true);
    this._pointerFocusedItem = item;
  }

  private clearPointerFocus(): void {
    this._pointerFocusedItem?.removeAttribute('pointer-focus');
    this._pointerFocusedItem = null;
  }

  // Closes the menu when a slotted row is clicked; no submenus/selection to
  // special-case yet, so any click on an enabled roving-tabindex item counts.
  private readonly handleItemActivate = (event: MouseEvent): void => {
    if (!this.open) {
      return;
    }
    const item = this.menuItemFromEvent(event);
    if (!item || isRowDisabled(item)) {
      return;
    }
    this.open = false;
  };

  // Wired once for the connected lifetime; the handlers no-op when closed.
  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this.handleItemActivate);
    this.addEventListener('pointermove', this.handleItemPointerMove);
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
    this.labelSurfaceByTrigger(null);
  }

  // `swc-menu` has no `label`, so the menu-button pattern names the surface
  // after its button. Element reference, not an IDREF, to cross the shadow
  // boundary; the outer trigger, since `interactiveElement` sits in a
  // sibling shadow tree and gets dropped. Playwright cannot see IDL-only
  // references, so tests assert the wiring, not the name.
  private labelSurfaceByTrigger(trigger: HTMLElement | null): void {
    const surface = this.surfaceElement as
      | (HTMLElement & ARIALabelledByElements)
      | null;
    if (!surface) {
      return;
    }
    surface.ariaLabelledByElements = trigger ? [trigger] : null;
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
    // The outer trigger, not `target`: `resolveTrigger` resolves `target` to
    // the AT-facing inner element, which for a shadow-rendered trigger like
    // `swc-button` is its internal `<button>`. That node holds only a slot,
    // so its text is empty; the name lives on the host's light DOM.
    this.labelSurfaceByTrigger(trigger);

    // `attach` is a no-op for an unchanged trigger.
    this._pressGuard.attach(trigger, {
      onToggle: () => {
        // The rest of the press that just chose a row belongs to that press,
        // not to the trigger it lands on once focus is restored.
        if (this._activationKeyHeld) {
          return;
        }
        this.open = !this.open;
      },
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

  // Each call supersedes the last, so a rapid close-then-reopen never fires
  // a stale `swc-after-close`. `fallback` arms the allow-discrete timer,
  // which the close path needs to guarantee teardown.
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

  // Clearing `actual-placement` mid-fade would snap the surface to its
  // default, so this waits for the exit and bails if a reopen beat it.
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
    this._sizePropagation.propagate();
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
    // Without a trigger the surface never gets `actual-placement` and stays
    // invisible (menu.css gates opacity on it); don't focus into that.
    if (this._hasCompletedFirstUpdate && this._trigger) {
      // Forces the first enabled row active rather than trusting the
      // controller's own memory-preferring refresh(); every normal open lands
      // there, matching React Spectrum. A menu of only disabled rows falls back
      // to the first, so the keyboard still has somewhere to start.
      this.focusNavigation.refresh();
      const rows = this.getMenuItems();
      const firstItem = rows.find((row) => !isRowDisabled(row)) ?? rows[0];
      const active =
        (firstItem &&
          this.focusNavigation.setActiveItem(firstItem) &&
          firstItem) ||
        this.focusNavigation.getActiveItem();
      if (active) {
        // Deferred past the click handler, which would otherwise refocus the
        // trigger. `preventScroll`: the real position lands asynchronously.
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
    // A trigger press light-dismisses before its own click lands; record
    // that so the trailing click reads as the close, not a reopen. `open` is
    // still true only for a native dismiss, which is what distinguishes it.
    if (this.open) {
      this._pressGuard.noteNativeDismiss();
    }
    const restoreFocusToTrigger = this.isFocusWithin();
    this._syncOpen(false);
    // Freeze where it is for the fade: `stop()` ends `autoUpdate` but leaves
    // `actual-placement` until `_stopPositioningWhenClosed`.
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
    // Rows outlive the menu being closed, so a flag left on one would suppress
    // the ring on the next open.
    this.clearPointerFocus();
    this.clearTypeahead();
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
    // Else a menu removed mid-transition leaves a timer that outlives it and
    // fires `swc-after-close` from a detached node.
    this._cancelAfterTransition?.();
    this.clearTriggerAria();
    this._trigger = null;
    unregisterDismissible(this);
    document.removeEventListener('keydown', this.handleKeyDown, {
      capture: true,
    });
    this.removeEventListener('click', this.handleItemActivate);
    this.removeEventListener('pointermove', this.handleItemPointerMove);
    document.removeEventListener('keyup', this.releaseActivationKey, {
      capture: true,
    });
    clearTimeout(this._releaseTimer);
    this._activationKeyHeld = false;
    this.clearTypeahead();
  }
}
