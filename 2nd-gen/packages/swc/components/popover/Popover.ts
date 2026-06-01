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

import {
  CSSResultArray,
  html,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import {
  PopoverBase,
  type PopoverCloseSource,
} from '@spectrum-web-components/core/components/popover';
import {
  PlacementController,
  type VirtualTrigger,
} from '@spectrum-web-components/core/controllers/index.js';
import {
  isTopDismissible,
  registerDismissible,
  resolveTrigger,
  unregisterDismissible,
} from '@spectrum-web-components/core/utils/index.js';

import styles from './popover.css';

/**
 * The `aria-controls` relationship is wired via the element-reference IDL
 * (`ariaControlsElements`) so it works across shadow boundaries. The property
 * is Baseline but not yet in every TypeScript DOM lib, so it is declared here.
 */
interface ARIAControlsElements {
  ariaControlsElements?: readonly Element[] | null;
}

/** Extra main-axis offset reserved for the arrow when it is shown. */
const ARROW_SPACE = 8;

/**
 * An anchored popover surface that renders an internal top-layer element. The
 * default lifecycle uses a `<div popover="auto">` with native light-dismiss;
 * setting the `modal` attribute renders a `<dialog>` opened via
 * `showModal()` for blocking modal behavior.
 *
 * @element swc-popover
 * @since 2.0.0
 *
 * @slot - Popover content.
 *
 * @fires swc-open - Dispatched when the popover begins opening.
 * @fires swc-after-open - Dispatched after the open transition completes.
 * @fires swc-close - Dispatched when the popover begins closing. `detail.source` reports `'escape'`, `'outside'`, or `'programmatic'`.
 * @fires swc-after-close - Dispatched after the close transition completes.
 */
export class Popover extends PopoverBase {
  // ──────────────────
  //     LIFECYCLE
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

  private get _internalElement(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.swc-Popover') ?? null;
  }

  private get _tipElement(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.swc-Popover-tip') ?? null;
  }

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
    const floating = this._internalElement;
    if (!floating || !this._anchor) {
      return;
    }
    const showArrow = !this.hideArrow;
    this._placementController.start(this._anchor, floating, {
      placement: this.placement,
      // Add room for the arrow when it is shown.
      offset: this.offset + (showArrow ? ARROW_SPACE : 0),
      crossOffset: this.crossOffset,
      containerPadding: this.containerPadding,
      shouldFlip: this.shouldFlip,
      tipElement: showArrow ? (this._tipElement ?? undefined) : undefined,
      tipPadding: this.tipPadding,
      onPlacementChange: (next) => {
        this.actualPlacement = next;
      },
    });
  }

  // ──────────────────
  //     OPEN/CLOSE
  // ──────────────────

  private _show(): void {
    const element = this._internalElement;
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
    const element = this._internalElement;
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
    this.actualPlacement = null;
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
  // ──────────────────────────────

  // Default mode: the popover-API lifecycle on the internal `<div>`.
  private _onBeforeToggle = (event: ToggleEvent): void => {
    if (event.newState === 'open') {
      this._dispatchOpen();
    } else {
      this._syncOpen(false);
      this._dispatchClose(this._closeSource ?? 'outside');
      this._closeTeardown();
    }
  };

  // Modal mode: Escape routes through the native `cancel` event.
  private _onCancel = (): void => {
    this._closeSource = 'escape';
  };

  // Modal mode: `close` fires for Escape, backdrop-click, and programmatic close.
  private _onClose = (): void => {
    this._syncOpen(false);
    this._dispatchClose(this._closeSource ?? 'programmatic');
    this._closeTeardown();
  };

  // Modal mode: a pointerdown landing on the dialog itself (not its padded
  // content) is a backdrop click.
  private _onPointerDown = (event: PointerEvent): void => {
    if (event.target === this._internalElement) {
      this._closeSource = 'outside';
      (this._internalElement as HTMLDialogElement).close();
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
    this._dispatchAfter('swc-after-open');
  }

  private _dispatchClose(source: PopoverCloseSource): void {
    this.dispatchEvent(
      new CustomEvent('swc-close', {
        detail: { source },
        bubbles: true,
        composed: true,
      })
    );
    this._dispatchAfter('swc-after-close');
    this._closeSource = null;
  }

  /** Fire an after-event on `transitionend`, or immediately if no transition. */
  private _dispatchAfter(type: 'swc-after-open' | 'swc-after-close'): void {
    const element = this._internalElement;
    const duration = element
      ? getComputedStyle(element).transitionDuration
      : '0s';
    const fire = (): void => {
      this.dispatchEvent(
        new CustomEvent(type, { bubbles: true, composed: true })
      );
      if (type === 'swc-after-close') {
        this._stopPositioningWhenClosed();
      }
    };
    if (!element || parseFloat(duration) === 0) {
      fire();
      return;
    }
    element.addEventListener('transitionend', () => fire(), { once: true });
  }

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    const classes = classMap({
      'swc-Popover': true,
      [`swc-Popover--${this.actualPlacement ?? this.placement}`]: true,
    });

    const content = html`
      <div class="swc-Popover-content">
        <slot></slot>
      </div>
      ${this.hideArrow
        ? nothing
        : html`
            <span class="swc-Popover-tip"></span>
          `}
    `;

    // The render shape branches on `modal`: a `<div popover="auto">` in the
    // default (non-modal) mode, a `<dialog>` (`.showModal()`) in modal mode.
    return this.modal
      ? html`
          <dialog
            class=${classes}
            @cancel=${this._onCancel}
            @close=${this._onClose}
            @pointerdown=${this._onPointerDown}
          >
            ${content}
          </dialog>
        `
      : html`
          <div
            class=${classes}
            popover="auto"
            @beforetoggle=${this._onBeforeToggle}
          >
            ${content}
          </div>
        `;
  }
}
