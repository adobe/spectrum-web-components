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
  PageScrollLockController,
  PlacementController,
  type VirtualTrigger,
} from '@spectrum-web-components/core/controllers/index.js';
import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';
import {
  deepContains,
  getActiveElement,
  isTopDismissible,
  physicalSide,
  registerDismissible,
  resolveTrigger,
  runAfterTransition,
  unregisterDismissible,
} from '@spectrum-web-components/core/utils/index.js';

import {
  type Placement,
  POPOVER_VALID_PLACEMENTS,
  POPOVER_VALID_SIZES,
  type PopoverCloseSource,
  type PopoverSize,
} from './Popover.types.js';

/**
 * The `aria-controls` relationship is wired via the element-reference IDL
 * (`ariaControlsElements`) so it works across shadow boundaries. The property
 * is Baseline but not yet in every TypeScript DOM lib, so it is declared here.
 */
interface ARIAControlsElements {
  ariaControlsElements?: readonly Element[] | null;
}

/** Properties whose change re-anchors the surface while open. */
const POSITIONING_PROPERTIES = [
  'placement',
  'offset',
  'crossOffset',
  'containerPadding',
  'shouldFlip',
  'hideArrow',
  'tipPadding',
  'size',
] as const;

/**
 * Abstract base for the popover component. Owns the popover's behavior: the
 * dual-mode dialog lifecycle (`showPopover()` / `showModal()`), trigger and ARIA
 * wiring, positioning through the `PlacementController`, dismissal coordination,
 * and `swc-*` event dispatch. The concrete SWC subclass adds only the styles, the
 * render template, and the shadow-DOM element getters (`internalElement`,
 * `tipElement`) it overrides.
 *
 * @slot - Popover content. Free-form; consumers slot whatever pattern they build.
 */
export abstract class PopoverBase extends SpectrumElement {
  /**
   * @internal
   *
   * The valid placement values for the popover. Narrowed in downstream
   * first-party subclasses per the proxy pattern.
   */
  static readonly VALID_PLACEMENTS: readonly Placement[] =
    POPOVER_VALID_PLACEMENTS;

  /**
   * @internal
   *
   * The valid fixed sizes for the popover.
   */
  static readonly VALID_SIZES: readonly PopoverSize[] = POPOVER_VALID_SIZES;

  /**
   * Whether the popover is open.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /**
   * Opt in to blocking modal behavior (`<dialog>.showModal()`): focus trap,
   * background inert, native `role="dialog"`. When unset, the popover uses
   * `popover="auto"` light-dismiss behavior.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public modal = false;

  /**
   * Accessible name for the popover's dialog surface, forwarded as `aria-label`
   * to the internal element (the `<dialog>` in modal mode, the `role="dialog"`
   * `<div popover>` in the default mode).
   *
   * The popover is a dialog in both modes, so a name is required in both: a
   * dialog with no accessible name is an authoring bug, and the component
   * dev-warns when opened without one. The internal surface lives in the
   * popover's shadow root, so a host `aria-labelledby` cannot reach it;
   * `accessible-label` is the supported naming path.
   */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel = '';

  /**
   * The placement of the popover relative to its trigger.
   *
   * @default 'bottom'
   */
  @property({ type: String, reflect: true })
  public placement: Placement = 'bottom';

  /**
   * Optional fixed size. When set, the popover uses a fixed inline size
   * (`s` → 336px, `m` → 416px, `l` → 576px); when unset, it fits its contents.
   */
  @property({ type: String, reflect: true })
  public size?: PopoverSize;

  // The computed placement after the `flip` middleware reorients the popover is
  // intentionally kept off the public property surface: a readonly property would
  // still be writable at runtime and could desync the component from the
  // controller. It is reflected as the internal `actual-placement` host attribute
  // (set via `setAttribute`, removed on close) for CSS only, mirroring Tooltip.
  // Consumers read the requested side via `placement`.

  /**
   * Hide the popover's arrow (tip). The arrow is shown by default.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-arrow' })
  public hideArrow = false;

  /**
   * Main-axis offset in pixels from the trigger.
   *
   * @default 8
   */
  @property({ type: Number })
  public offset = 8;

  /**
   * Cross-axis offset in pixels from the trigger.
   *
   * @default 0
   */
  @property({ type: Number, attribute: 'cross-offset' })
  public crossOffset = 0;

  /**
   * Distance from the viewport edge for the `flip` and `shift` middleware.
   *
   * Positioning implementation detail. Set by first-party components; excluded
   * from the public API. Users are not expected to set it.
   *
   * @internal
   * @default 8
   */
  @property({ type: Number, attribute: 'container-padding' })
  public containerPadding = 8;

  /**
   * Allow the popover to flip to the opposite side when constrained. When
   * `false`, the popover stays in the requested placement.
   *
   * @default true
   */
  @property({ type: Boolean, reflect: true, attribute: 'should-flip' })
  public shouldFlip = true;

  /**
   * Minimum inset of the tip from the popover's corners, passed to the
   * `PlacementController`'s `arrow` middleware as its `padding`.
   *
   * Positioning implementation detail. Set by first-party components; excluded
   * from the public API. Users are not expected to set it.
   *
   * @internal
   * @default 8
   */
  @property({ type: Number, attribute: 'tip-padding' })
  public tipPadding = 8;

  /**
   * ID of the trigger element in the same document tree root.
   */
  @property({ type: String })
  public for?: string;

  /**
   * Direct trigger reference. Overrides `for` when both are set. Use for
   * cross-shadow-root triggers or programmatic wiring.
   */
  @property({ attribute: false })
  public triggerElement: HTMLElement | VirtualTrigger | null = null;

  /**
   * Suppress the automatic click-to-toggle wiring on the resolved trigger. When
   * set, control visibility through the `open` property instead. ARIA
   * relationship wiring still applies.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public manual = false;

  // ──────────────────────────────
  //     RENDERING-LAYER HANDLES
  // ──────────────────────────────

  /**
   * The internal top-layer element (a `<div popover>` or a `<dialog>`) the
   * lifecycle drives. Mandatory: the SWC rendering layer must implement this to
   * return the rendered `.swc-Popover` element from the shadow DOM (it may still
   * return `null` before the first render, which the lifecycle guards against).
   */
  protected abstract get internalElement(): HTMLElement | null;

  /**
   * The arrow tip element passed to the `PlacementController`. Optional: returns
   * `null` in the base class (no arrow), and the SWC rendering layer overrides it
   * to return the rendered `.swc-Popover-tip` element when an arrow is shown.
   */
  protected get tipElement(): HTMLElement | null {
    return null;
  }

  /**
   * The arrow's height in pixels, added to the trigger gap when the arrow is
   * shown. Returns `0` in the base class; the SWC rendering layer overrides it
   * with the token-derived value so the gap stays in sync with the tip, keeping
   * the base free of any coupling to the surface's CSS.
   */
  protected get arrowHeight(): number {
    return 0;
  }

  // ──────────────────
  //     STATE
  // ──────────────────

  private _placementController = new PlacementController(this);

  /**
   * Page-scroll lock for modal mode. Reference-counted at module scope so stacked
   * modal surfaces coordinate a single lock and restore the original overflow
   * exactly once. See {@link PageScrollLockController}.
   */
  private _scrollLock = new PageScrollLockController(this);

  /** The trigger's AT-facing element that receives ARIA wiring. */
  private _interactiveElement: (HTMLElement & ARIAControlsElements) | null =
    null;

  /** The positioning anchor (an element or a `VirtualTrigger`). */
  private _anchor: HTMLElement | VirtualTrigger | null = null;

  /** The element the click-to-toggle listeners are currently attached to. */
  private _clickTrigger: HTMLElement | null = null;

  /**
   * True between a trigger `pointerdown` and its `click`, so a light-dismiss that
   * fires inside that window can be attributed to the trigger press.
   */
  private _triggerPointerActive = false;

  /**
   * Set when the trigger press light-dismissed an open popover (an `'outside'`
   * close observed while `_triggerPointerActive`), so the trailing `click` of
   * that same gesture is read as the close rather than a reopen. Keyed off the
   * real close event, not a timer or an assumption about whether a dismiss will
   * occur.
   */
  private _dismissedByTriggerPress = false;

  /** Cause of the in-progress close, read when dispatching `swc-close`. */
  private _closeSource: PopoverCloseSource | null = null;

  /** Suppresses the open/close effect when `open` is synced from a native event. */
  private _syncingOpen = false;

  /**
   * Suppresses the next `swc-open` dispatch. Set when re-showing an
   * already-open popover (a `modal` toggle swaps the internal element), so the
   * mode swap does not emit a second `swc-open` with no intervening close.
   */
  private _suppressOpenEvent = false;

  /** Document Escape listener (default mode) used to label the close source. */
  private _escapeListener?: (event: KeyboardEvent) => void;

  /** Tears down the in-flight `_afterTransition` wiring (listener + fallback timer). */
  private _cancelAfterTransition?: () => void;

  /**
   * Set after the first render. Auto-focus on open is suppressed until then so an
   * initially-`open` popover (server-rendered or a static demo) does not steal
   * focus on mount; only an open triggered after the element is live moves focus.
   */
  private _hasCompletedFirstUpdate = false;

  /**
   * Set when a default-mode open should move focus into the dialog surface;
   * consumed by the first placement compute so focus lands after the surface is
   * anchored on screen (focusing it at its 0,0 reset origin would shift layout).
   * Modal mode moves focus natively via `showModal()`.
   */
  private _pendingFocusOnOpen = false;

  // ──────────────────
  //     LIFECYCLE
  // ──────────────────

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._placementController.stop();
    this._cancelAfterTransition?.();
    unregisterDismissible(this);
    this._removeEscapeListener();
    this._scrollLock.unlock();
    this._removeTriggerListeners();
    this._clearTriggerAria();
    this._interactiveElement = null;
    this._anchor = null;
    // Focus restoration is handled by the close lifecycle: default mode in
    // `_onBeforeToggle`, modal mode natively by `<dialog>`. Both close routes
    // (Escape, outside click, programmatic `open=false`) pass through there.
    // Removing an open popover from the DOM is not handled: the browser has
    // already moved focus to `<body>` before this runs, so the trigger to
    // restore to can no longer be inferred.
  }

  protected override update(changedProperties: PropertyValues): void {
    if (window.__swc?.DEBUG) {
      // Validate against the static so subclasses that narrow the placement set
      // (the proxy pattern) get their own valid values checked at runtime.
      const constructor = this.constructor as typeof PopoverBase;
      if (!constructor.VALID_PLACEMENTS.includes(this.placement)) {
        window.__swc.warn(
          this,
          `<${this.localName}> element expects the "placement" attribute to be one of the following:`,
          'https://spectrum-web-components.adobe.com/?path=/docs/components-popover--docs',
          {
            issues: [...constructor.VALID_PLACEMENTS],
          }
        );
      }
    }
    super.update(changedProperties);
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (
      changedProperties.has('for') ||
      changedProperties.has('triggerElement') ||
      changedProperties.has('modal') ||
      changedProperties.has('manual')
    ) {
      this._wireTrigger();
    }

    if (changedProperties.has('open')) {
      if (this._syncingOpen) {
        // The change came from a native event; the element is already in the
        // right state. Just consume the guard.
        this._syncingOpen = false;
      } else if (this.open) {
        this._show();
      } else {
        this._hide();
      }
      this._interactiveElement?.setAttribute(
        'aria-expanded',
        String(this.open)
      );
    } else if (this.open && changedProperties.has('modal')) {
      // `modal` toggled while open: the render swapped the internal element
      // between a `<div popover="auto">` and a `<dialog>`. Lit removed the old
      // element (the browser closes a disconnected top-layer element), so the
      // newly rendered element is present but never went through its show API.
      // Re-show so the correct mode engages (e.g. `showModal()` traps focus),
      // without re-emitting `swc-open` for a popover that never closed.
      this._show(true);
    } else if (
      this.open &&
      (this._positioningChanged(changedProperties) ||
        changedProperties.has('for') ||
        changedProperties.has('triggerElement'))
    ) {
      // Re-anchor while open when a positioning input or the trigger changes.
      this._startPositioning();
    }

    // First render is done: subsequent opens may move focus into the surface.
    this._hasCompletedFirstUpdate = true;
  }

  private _positioningChanged(changedProperties: PropertyValues): boolean {
    return POSITIONING_PROPERTIES.some((prop) => changedProperties.has(prop));
  }

  // ──────────────────────────
  //     TRIGGER + ARIA
  // ──────────────────────────

  private _wireTrigger(): void {
    const { trigger, interactiveElement } = resolveTrigger(this, {
      for: this.for,
      triggerElement:
        this.triggerElement instanceof HTMLElement ? this.triggerElement : null,
    });

    if (!trigger && this.for && window.__swc?.DEBUG) {
      window.__swc.warn(
        this,
        `<${this.localName}> for="${this.for}" did not resolve to an element in the current tree root. Check that the referenced id exists in the same document tree root.`,
        'https://spectrum-web-components.adobe.com/?path=/docs/components-popover--docs',
        { level: 'high' }
      );
    }

    if (
      this._interactiveElement &&
      this._interactiveElement !== interactiveElement
    ) {
      this._clearTriggerAria();
    }

    this._interactiveElement = interactiveElement;
    // A `VirtualTrigger` (non-element) anchors positioning only; an element
    // trigger anchors positioning and carries ARIA.
    this._anchor =
      this.triggerElement && !(this.triggerElement instanceof HTMLElement)
        ? this.triggerElement
        : trigger;

    if (interactiveElement) {
      // Durable across open/close cycles; visibility is conveyed by aria-expanded.
      interactiveElement.ariaControlsElements = [this];
      interactiveElement.setAttribute('aria-expanded', String(this.open));
      // The surface is a dialog in both modes, so the trigger always signals it.
      interactiveElement.setAttribute('aria-haspopup', 'dialog');
    }

    // Click-to-toggle on the trigger host, unless the consumer drives `open`
    // themselves (`manual`). Listens on the host so clicks bubbling from an
    // inner button are caught. The `pointerdown` listener (capture, so it runs
    // before the browser's light-dismiss) records whether the popover was open
    // when the gesture started; `_onTriggerClick` uses that to tell a close
    // gesture from a reopen.
    const clickTrigger = this.manual ? null : trigger;
    if (clickTrigger !== this._clickTrigger) {
      this._removeTriggerListeners();
      if (clickTrigger) {
        clickTrigger.addEventListener(
          'pointerdown',
          this._onTriggerPointerDown,
          {
            capture: true,
          }
        );
        clickTrigger.addEventListener('click', this._onTriggerClick);
        this._clickTrigger = clickTrigger;
      }
    }
    // Re-anchoring while open (trigger or positioning input changed) is driven
    // from `updated()`, so this method only wires the trigger and ARIA. Doing it
    // here too would double-start the controller when `updated()` also re-shows
    // or re-anchors in the same cycle (e.g. a `modal` toggle while open).
  }

  private _removeTriggerListeners(): void {
    this._clickTrigger?.removeEventListener(
      'pointerdown',
      this._onTriggerPointerDown,
      { capture: true }
    );
    this._clickTrigger?.removeEventListener('click', this._onTriggerClick);
    this._clickTrigger = null;
  }

  // The trigger sits outside the popover, so in the default (auto) mode pressing
  // it while open is a native light-dismiss: the browser hides the popover on
  // pointerdown, before the click fires. Open the gesture window here (capture,
  // so it runs before the dismiss) so `_onBeforeToggle` can attribute that close
  // to this press.
  private _onTriggerPointerDown = (): void => {
    this._triggerPointerActive = true;
    this._dismissedByTriggerPress = false;
  };

  // If the trigger press light-dismissed the popover (recorded in
  // `_onBeforeToggle`), consume this click so it does not toggle back open;
  // otherwise toggle from the live state. The decision keys off the real close
  // event, so it is correct whether or not a dismiss fired (e.g. keyboard
  // activation, or environments without native light-dismiss) with no timer.
  // (`popovertarget`, which the browser would correlate automatically, can't
  // reach the shadow-DOM surface across roots.)
  private _onTriggerClick = (): void => {
    const dismissedByThisGesture = this._dismissedByTriggerPress;
    this._triggerPointerActive = false;
    this._dismissedByTriggerPress = false;
    if (dismissedByThisGesture) {
      return;
    }
    this.open = !this.open;
  };

  private _clearTriggerAria(): void {
    const element = this._interactiveElement;
    if (!element) {
      return;
    }
    element.ariaControlsElements = null;
    element.removeAttribute('aria-expanded');
    element.removeAttribute('aria-haspopup');
  }

  // Whether focus is currently within the popover's content. `deepContains`
  // crosses shadow boundaries, so focus inside a slotted custom element (e.g. a
  // button's inner control) is detected; the content is slotted, so its DOM
  // ancestors lead back to this host.
  private _isFocusWithin(): boolean {
    return deepContains(this, getActiveElement());
  }

  // ──────────────────────────
  //     POSITIONING
  // ──────────────────────────

  private _startPositioning(): void {
    const floating = this.internalElement;
    if (!floating || !this._anchor) {
      // No element or no anchor to position against (e.g. the trigger was
      // changed to an unresolved id while open). Tear down any prior session so
      // the surface is not left anchored to stale geometry; clearing
      // `actual-placement` also re-gates it hidden until a valid anchor returns.
      this._placementController.stop();
      this.removeAttribute('actual-placement');
      return;
    }
    const showArrow = !this.hideArrow;
    // Re-gate the surface and tip for this positioning session by clearing
    // `actual-placement`. `_placementController.start` calls `stop()`, which clears
    // the surface's inline `translate` back to the 0,0 origin until the (async)
    // first compute re-anchors it; the stylesheet only reveals the surface and the
    // tip once `actual-placement` is present, so they stay hidden through that
    // window (including a rapid reopen during the close fade) instead of painting
    // at 0,0. Re-set by onPlacementChange once the new session anchors.
    this.removeAttribute('actual-placement');
    // The arrow's height is added to the trigger gap so the surface clears the
    // tip on every side. It is applied through the controller's main-axis offset
    // (which is direction-aware) rather than a CSS margin, since a margin only
    // shifts the absolutely-positioned surface on its block-start / inline-start
    // sides. `arrowHeight` is supplied by the rendering layer.
    this._placementController.start(this._anchor, floating, {
      placement: this.placement,
      offset: this.offset + (showArrow ? this.arrowHeight : 0),
      crossOffset: this.crossOffset,
      containerPadding: this.containerPadding,
      shouldFlip: this.shouldFlip,
      tipElement: showArrow ? (this.tipElement ?? undefined) : undefined,
      tipPadding: this.tipPadding,
      onPlacementChange: (next) => {
        // The first compute of a session anchors the surface (the controller
        // resets its last-notified placement on `stop()`, so this always fires
        // once positioning lands). Expose the computed physical side as the
        // `actual-placement` host attribute for CSS: it orients the tip and, by
        // its presence, reveals the surface and tip (gated off until now so the
        // entry fade runs from the anchored position, not the 0,0 origin). Not a
        // public property; removed in `_stopPositioningWhenClosed`.
        //
        // The reveal therefore depends on the controller completing a compute.
        // The controller skips it when the floating element measures 0x0, but the
        // surface always has a border plus padded `.swc-Popover-content`, so it is
        // never zero-sized while open; a content-less popover would still have
        // chrome. If that ever changes, gate the reveal independently of the side.
        this.setAttribute('actual-placement', physicalSide(next));
        // The surface is now anchored and revealed; move focus into it (a pending
        // default-mode open). Focusing earlier, at the 0,0 origin, would shift
        // layout/scroll.
        if (this._pendingFocusOnOpen) {
          this._pendingFocusOnOpen = false;
          this._focusSurface();
        }
      },
    });
  }

  // ──────────────────
  //     OPEN/CLOSE
  // ──────────────────

  // `reShow` is true when re-engaging the show API for a popover that is already
  // open (a `modal` toggle swaps the internal element). It suppresses a second
  // `swc-open` for a popover that never closed.
  private _show(reShow = false): void {
    const element = this.internalElement;
    if (!element) {
      return;
    }
    // The surface is a dialog in both modes, so it must have an accessible name.
    if (window.__swc?.DEBUG && !this.accessibleLabel.trim()) {
      window.__swc.warn(
        this,
        `<${this.localName}> must have an "accessible-label" attribute to name the dialog for assistive technology.`,
        'https://spectrum-web-components.adobe.com/?path=/docs/components-popover--docs',
        { issues: ['accessible-label'] }
      );
    }
    // Enter the top layer first; only register listeners, the dismissible stack,
    // and positioning once the native show actually succeeds, so a failed
    // `showPopover()`/`showModal()` does not leave the component wired up for a
    // popover that never opened.
    if (this.modal) {
      const dialog = element as HTMLDialogElement;
      let shown = dialog.open;
      if (!shown) {
        try {
          dialog.showModal();
          shown = true;
        } catch {
          shown = false;
        }
      }
      if (!shown) {
        return;
      }
      // Modal mode uses the native `<dialog>` Escape (`cancel`); drop any
      // default-mode document listener left over from a prior mode.
      this._removeEscapeListener();
      this._scrollLock.lock();
      registerDismissible(this);
      // `<dialog>` modal-mode has no native open event, so dispatch here (unless
      // this is a re-show of an already-open popover).
      if (!reShow) {
        this._dispatchOpen();
      }
    } else {
      let shown = element.matches(':popover-open');
      if (!shown) {
        // `showPopover()` fires `beforetoggle` synchronously, which dispatches
        // `swc-open`; suppress that one dispatch on a re-show.
        this._suppressOpenEvent = reShow;
        try {
          element.showPopover();
          shown = true;
        } catch {
          this._suppressOpenEvent = false;
          shown = false;
        }
      }
      if (!shown) {
        return;
      }
      // Default mode never locks scroll; release a lock left from a prior modal
      // mode (e.g. `modal` toggled false while open).
      this._scrollLock.unlock();
      registerDismissible(this);
      this._addEscapeListener();
      // Move focus into the dialog surface so assistive technology lands inside
      // it (modal mode does this natively via `showModal()`). Deferred to the
      // first placement compute so focus lands once the surface is anchored on
      // screen, not at its 0,0 reset origin. Suppressed on the initial render so
      // an initially-`open` popover does not steal focus.
      this._pendingFocusOnOpen = this._hasCompletedFirstUpdate;
      // `swc-open` is dispatched from the `beforetoggle` listener.
    }
    this._startPositioning();
  }

  // Move focus into the open default-mode dialog surface. The surface is a named
  // `role="dialog"` element, so focusing it announces the dialog and seats the
  // user inside it; `preventScroll` because it is already anchored in the top
  // layer. Focus restoration on close is handled by `_onBeforeToggle`.
  private _focusSurface(): void {
    this.internalElement?.focus({ preventScroll: true });
  }

  private _hide(): void {
    const element = this.internalElement;
    if (!element) {
      return;
    }
    this._closeSource ??= 'programmatic';
    if (this.modal) {
      const dialog = element as HTMLDialogElement;
      if (dialog.open) {
        dialog.close();
      }
    } else if (element.matches(':popover-open')) {
      try {
        element.hidePopover();
      } catch {
        /* already hidden */
      }
    }
  }

  private _closeTeardown(): void {
    // The trigger-click reopen guard is gesture-based (see
    // `_onTriggerPointerDown`), so the close needs no source-specific handling
    // here.
    unregisterDismissible(this);
    this._removeEscapeListener();
    this._scrollLock.unlock();
    // `aria-expanded` is written by `updated()` on every `open` change (and by
    // `_wireTrigger` on initial wiring), so it is not set again here.
    // Positioning is torn down only after the close transition finishes
    // (see `_stopPositioningWhenClosed`), so the arrow keeps its computed
    // offset during the fade instead of snapping back to the edge.
  }

  // Tear down positioning once the close animation has completed. Guarded by
  // `!this.open` so a rapid re-open during the fade keeps its positioning.
  private _stopPositioningWhenClosed(): void {
    if (this.open) {
      return;
    }
    this._placementController.stop();
    this.removeAttribute('actual-placement');
  }

  /** Set `open` without re-triggering the show/hide effect. */
  private _syncOpen(value: boolean): void {
    if (this.open === value) {
      return;
    }
    this._syncingOpen = true;
    this.open = value;
  }

  // ──────────────────────────────
  //     NATIVE EVENT HANDLERS
  //   (bound by the SWC render template)
  // ──────────────────────────────

  // Default mode: the popover-API lifecycle on the internal `<div>`.
  protected _onBeforeToggle = (event: ToggleEvent): void => {
    if (event.newState === 'open') {
      this._dispatchOpen();
    } else {
      const source = this._closeSource ?? 'outside';
      // Attribute an outside light-dismiss that lands during a trigger press to
      // that press, so `_onTriggerClick` reads the trailing click as the close
      // rather than a reopen.
      if (source === 'outside' && this._triggerPointerActive) {
        this._dismissedByTriggerPress = true;
      }
      // `beforetoggle` fires before the popover hides, so focus is still inside if
      // it was there. Unlike modal `<dialog>` (which restores focus natively), the
      // popover API drops focus to `<body>` when the focused content is hidden, so
      // restore it to the trigger. Gated on focus actually being inside our content
      // so an outside click that moved focus elsewhere is left alone.
      const restoreFocusToTrigger = this._isFocusWithin();
      this._syncOpen(false);
      this._dispatchClose(source);
      this._closeTeardown();
      if (restoreFocusToTrigger) {
        this._interactiveElement?.focus();
      }
    }
  };

  // Modal mode: Escape routes through the native `cancel` event. Honor the
  // dismissible stack so Escape dismisses the topmost layer first: if something
  // opened on top of this dialog, cancel the close and let that layer handle the
  // key. The next Escape, once this dialog is topmost, closes it.
  protected _onCancel = (event: Event): void => {
    if (!isTopDismissible(this)) {
      event.preventDefault();
      return;
    }
    this._closeSource = 'escape';
  };

  // Modal mode: `close` fires for Escape, backdrop-click, and programmatic close.
  protected _onClose = (): void => {
    const source = this._closeSource ?? 'programmatic';
    this._syncOpen(false);
    this._dispatchClose(source);
    this._closeTeardown();
  };

  // Modal mode: a pointerdown on the dialog's backdrop is an outside dismiss.
  // The backdrop targets the dialog element itself, but so does its own border,
  // so confirm the point is actually outside the dialog box before closing —
  // otherwise a press on the 1px border would dismiss like a backdrop click.
  protected _onPointerDown = (event: PointerEvent): void => {
    const dialog = this.internalElement;
    if (!dialog || event.target !== dialog) {
      return;
    }
    const rect = dialog.getBoundingClientRect();
    const outsideDialogBox =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (!outsideDialogBox) {
      return;
    }
    this._closeSource = 'outside';
    (dialog as HTMLDialogElement).close();
  };

  private _addEscapeListener(): void {
    if (this._escapeListener) {
      return;
    }
    this._escapeListener = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isTopDismissible(this)) {
        this._closeSource = 'escape';
      }
    };
    document.addEventListener('keydown', this._escapeListener, {
      capture: true,
    });
  }

  private _removeEscapeListener(): void {
    if (!this._escapeListener) {
      return;
    }
    document.removeEventListener('keydown', this._escapeListener, {
      capture: true,
    });
    this._escapeListener = undefined;
  }

  // ──────────────────
  //     EVENTS
  // ──────────────────

  private _dispatchOpen(): void {
    // A re-show of an already-open popover (modal toggle) must not emit a second
    // `swc-open`; consume the one-shot suppression set in `_show`.
    if (this._suppressOpenEvent) {
      this._suppressOpenEvent = false;
      return;
    }
    this.dispatchEvent(
      new CustomEvent('swc-open', { bubbles: true, composed: true })
    );
    // No fallback timer on open: nothing is gated on `swc-after-open`, so a
    // delayed (janky) `transitionend` must not be pre-empted by the timer.
    this._afterTransition(() => {
      this.dispatchEvent(
        new CustomEvent('swc-after-open', { bubbles: true, composed: true })
      );
    }, false);
  }

  private _dispatchClose(source: PopoverCloseSource): void {
    this.dispatchEvent(
      new CustomEvent('swc-close', {
        detail: { source },
        bubbles: true,
        composed: true,
      })
    );
    this._afterTransition(() => {
      this.dispatchEvent(
        new CustomEvent('swc-after-close', { bubbles: true, composed: true })
      );
      // Positioning is torn down only after the exit transition; doing it earlier
      // would snap the surface to 0,0 while it is still fading out.
      this._stopPositioningWhenClosed();
    });
    this._closeSource = null;
  }

  // Run `callback` once the internal element's transition settles (or
  // immediately when none will run). Each call supersedes the previous
  // open/close cycle's pending run, so a rapid close-then-reopen never
  // dispatches a spurious `swc-after-close` after reopening. `fallback` arms the
  // allow-discrete safety timer (default true; the close path relies on it to
  // always tear down positioning). Shared with Tooltip via `core/utils`.
  private _afterTransition(callback: () => void, fallback = true): void {
    this._cancelAfterTransition?.();
    const element = this.internalElement;
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
}
