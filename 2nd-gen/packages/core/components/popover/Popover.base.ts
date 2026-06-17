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
  fromFloatingPlacement,
  PlacementController,
  toFloatingPlacement,
  type VirtualTrigger,
} from '@spectrum-web-components/core/controllers/index.js';
import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';
import {
  hasActiveTransition,
  isTopDismissible,
  registerDismissible,
  resolveTrigger,
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

/**
 * Abstract base for the popover component. Owns the popover's behavior — the
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

  // ──────────────────
  //     STATE
  // ──────────────────

  private _placementController = new PlacementController(this);

  /** The trigger's AT-facing element that receives ARIA wiring. */
  private _interactiveElement: (HTMLElement & ARIAControlsElements) | null =
    null;

  /** The positioning anchor (an element or a `VirtualTrigger`). */
  private _anchor: HTMLElement | VirtualTrigger | null = null;

  /** The element the click-to-toggle listener is currently attached to. */
  private _clickTrigger: HTMLElement | null = null;

  /** Timestamp of the last native dismissal, to suppress click-reopen. */
  private _lastDismissAt = 0;

  /** Cause of the in-progress close, read when dispatching `swc-close`. */
  private _closeSource: PopoverCloseSource | null = null;

  /** Suppresses the open/close effect when `open` is synced from a native event. */
  private _syncingOpen = false;

  /** Document Escape listener (default mode) used to label the close source. */
  private _escapeListener?: (event: KeyboardEvent) => void;

  // ──────────────────
  //     LIFECYCLE
  // ──────────────────

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._placementController.stop();
    unregisterDismissible(this);
    this._removeEscapeListener();
    this._removeTriggerClick();
    this._clearTriggerAria();
    this._interactiveElement = null;
    this._anchor = null;
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
    } else if (this.open && this._positioningChanged(changedProperties)) {
      // Re-anchor while open when a positioning input changes.
      this._startPositioning();
    }
  }

  private _positioningChanged(changedProperties: PropertyValues): boolean {
    return (
      changedProperties.has('placement') ||
      changedProperties.has('offset') ||
      changedProperties.has('crossOffset') ||
      changedProperties.has('containerPadding') ||
      changedProperties.has('shouldFlip') ||
      changedProperties.has('hideArrow') ||
      changedProperties.has('tipPadding') ||
      changedProperties.has('size')
    );
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
      if (this.modal) {
        interactiveElement.setAttribute('aria-haspopup', 'dialog');
      } else {
        interactiveElement.removeAttribute('aria-haspopup');
      }
    }

    // Click-to-toggle on the trigger host, unless the consumer drives `open`
    // themselves (`manual`). Listens on the host so clicks bubbling from an
    // inner button are caught.
    const clickTrigger = this.manual ? null : trigger;
    if (clickTrigger !== this._clickTrigger) {
      this._removeTriggerClick();
      if (clickTrigger) {
        clickTrigger.addEventListener('click', this._onTriggerClick);
        this._clickTrigger = clickTrigger;
      }
    }

    if (this.open) {
      this._startPositioning();
    }
  }

  private _removeTriggerClick(): void {
    this._clickTrigger?.removeEventListener('click', this._onTriggerClick);
    this._clickTrigger = null;
  }

  // Toggle on trigger click. In the default (auto) mode, clicking the trigger
  // while open first triggers the browser's light-dismiss (which closes the
  // popover before this fires); the `_lastDismissAt` guard prevents an
  // immediate reopen so the click reads as a close.
  private _onTriggerClick = (): void => {
    if (!this.open && performance.now() - this._lastDismissAt < 200) {
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

  // ──────────────────────────
  //     POSITIONING
  // ──────────────────────────

  private _startPositioning(): void {
    const floating = this.internalElement;
    if (!floating || !this._anchor) {
      return;
    }
    const showArrow = !this.hideArrow;
    // Reflect the requested side synchronously so the tip is oriented before the
    // controller's first (async) compute; the controller then overwrites it with
    // the flip-resolved side via onPlacementChange.
    this._reflectDeclaredPlacement();
    this._placementController.start(this._anchor, floating, {
      placement: this.placement,
      // The trigger gap is the consumer's `offset`; the arrow's own clearance is
      // a token-based margin on the surface (see popover.css), so no arrow
      // allowance is added here — keeping a single source of truth in CSS.
      offset: this.offset,
      crossOffset: this.crossOffset,
      containerPadding: this.containerPadding,
      shouldFlip: this.shouldFlip,
      tipElement: showArrow ? (this.tipElement ?? undefined) : undefined,
      tipPadding: this.tipPadding,
      onPlacementChange: (next) => {
        // Mirror Tooltip: expose the computed physical side as the
        // `actual-placement` host attribute for CSS, not as a public property.
        this.setAttribute('actual-placement', next.split('-')[0]);
      },
    });
  }

  // Resolve the requested `placement` to its physical side (honoring the
  // trigger's writing direction for logical `start` / `end`) and reflect it as
  // the `actual-placement` host attribute.
  private _reflectDeclaredPlacement(): void {
    const directionSource =
      this._anchor instanceof HTMLElement ? this._anchor : this;
    const direction =
      getComputedStyle(directionSource).direction === 'rtl' ? 'rtl' : 'ltr';
    const side = fromFloatingPlacement(
      toFloatingPlacement(this.placement, direction)
    ).split('-')[0];
    this.setAttribute('actual-placement', side);
  }

  // ──────────────────
  //     OPEN/CLOSE
  // ──────────────────

  private _show(): void {
    const element = this.internalElement;
    if (!element) {
      return;
    }
    registerDismissible(this);
    if (this.modal) {
      const dialog = element as HTMLDialogElement;
      if (!dialog.open) {
        dialog.showModal();
      }
      // `<dialog>` modal-mode has no native open event, so dispatch here.
      this._dispatchOpen();
    } else {
      this._addEscapeListener();
      if (!element.matches(':popover-open')) {
        try {
          element.showPopover();
        } catch {
          /* already showing */
        }
      }
      // `swc-open` is dispatched from the `beforetoggle` listener.
    }
    this._startPositioning();
    this._interactiveElement?.setAttribute('aria-expanded', 'true');
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
    // Stamp the dismissal so a trigger click that caused a light-dismiss does
    // not immediately reopen the popover.
    this._lastDismissAt = performance.now();
    unregisterDismissible(this);
    this._removeEscapeListener();
    this._interactiveElement?.setAttribute('aria-expanded', 'false');
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
      this._syncOpen(false);
      this._dispatchClose(this._closeSource ?? 'outside');
      this._closeTeardown();
    }
  };

  // Modal mode: Escape routes through the native `cancel` event.
  protected _onCancel = (): void => {
    this._closeSource = 'escape';
  };

  // Modal mode: `close` fires for Escape, backdrop-click, and programmatic close.
  protected _onClose = (): void => {
    this._syncOpen(false);
    this._dispatchClose(this._closeSource ?? 'programmatic');
    this._closeTeardown();
  };

  // Modal mode: a pointerdown landing on the dialog itself (not its padded
  // content) is a backdrop click.
  protected _onPointerDown = (event: PointerEvent): void => {
    if (event.target === this.internalElement) {
      this._closeSource = 'outside';
      (this.internalElement as HTMLDialogElement).close();
    }
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
    this.dispatchEvent(
      new CustomEvent('swc-open', { bubbles: true, composed: true })
    );
    this._afterTransition(() => {
      this.dispatchEvent(
        new CustomEvent('swc-after-open', { bubbles: true, composed: true })
      );
    });
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

  // Run `callback` after the internal element's transition ends, or immediately
  // when no transition will run (none declared, or reduced motion), since
  // `transitionend` will not fire in that case.
  private _afterTransition(callback: () => void): void {
    const element = this.internalElement;
    if (!element || !hasActiveTransition(element)) {
      callback();
      return;
    }
    element.addEventListener('transitionend', callback, { once: true });
  }
}
