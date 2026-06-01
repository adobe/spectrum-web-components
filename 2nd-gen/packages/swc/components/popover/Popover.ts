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

  #placementController = new PlacementController(this);

  /** The trigger's AT-facing element that receives ARIA wiring. */
  #interactiveElement: (HTMLElement & ARIAControlsElements) | null = null;

  /** The positioning anchor (an element or a `VirtualTrigger`). */
  #anchor: HTMLElement | VirtualTrigger | null = null;

  /** Cause of the in-progress close, read when dispatching `swc-close`. */
  #closeSource: PopoverCloseSource | null = null;

  /** Suppresses the open/close effect when `open` is synced from a native event. */
  #syncingOpen = false;

  /** Document Escape listener (default mode) used to label the close source. */
  #escapeListener?: (event: KeyboardEvent) => void;

  get #internalElement(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.swc-Popover') ?? null;
  }

  get #tipElement(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.swc-Popover-tip') ?? null;
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#placementController.stop();
    unregisterDismissible(this);
    this.#removeEscapeListener();
    this.#clearTriggerAria();
    this.#interactiveElement = null;
    this.#anchor = null;
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (
      changedProperties.has('for') ||
      changedProperties.has('triggerElement') ||
      changedProperties.has('modal')
    ) {
      this.#wireTrigger();
    }

    if (changedProperties.has('open')) {
      if (this.#syncingOpen) {
        // The change came from a native event; the element is already in the
        // right state. Just consume the guard.
        this.#syncingOpen = false;
      } else if (this.open) {
        this.#show();
      } else {
        this.#hide();
      }
      this.#interactiveElement?.setAttribute(
        'aria-expanded',
        String(this.open)
      );
    }
  }

  // ──────────────────────────
  //     TRIGGER + ARIA
  // ──────────────────────────

  #wireTrigger(): void {
    const { trigger, interactiveElement } = resolveTrigger(this, {
      for: this.for,
      triggerElement:
        this.triggerElement instanceof HTMLElement ? this.triggerElement : null,
    });

    if (
      this.#interactiveElement &&
      this.#interactiveElement !== interactiveElement
    ) {
      this.#clearTriggerAria();
    }

    this.#interactiveElement = interactiveElement;
    // A `VirtualTrigger` (non-element) anchors positioning only; an element
    // trigger anchors positioning and carries ARIA.
    this.#anchor =
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

    if (this.open) {
      this.#startPositioning();
    }
  }

  #clearTriggerAria(): void {
    const element = this.#interactiveElement;
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

  #startPositioning(): void {
    const floating = this.#internalElement;
    if (!floating || !this.#anchor) {
      return;
    }
    this.#placementController.start(this.#anchor, floating, {
      placement: this.placement,
      offset: this.offset,
      crossOffset: this.crossOffset,
      containerPadding: this.containerPadding,
      shouldFlip: this.shouldFlip,
      tipElement: this.tip ? (this.#tipElement ?? undefined) : undefined,
      tipPadding: this.tipPadding,
      onPlacementChange: (next) => {
        this.actualPlacement = next;
      },
    });
  }

  // ──────────────────
  //     OPEN/CLOSE
  // ──────────────────

  #show(): void {
    const element = this.#internalElement;
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
      this.#dispatchOpen();
    } else {
      this.#addEscapeListener();
      if (!element.matches(':popover-open')) {
        try {
          element.showPopover();
        } catch {
          /* already showing */
        }
      }
      // `swc-open` is dispatched from the `beforetoggle` listener.
    }
    this.#startPositioning();
    this.#interactiveElement?.setAttribute('aria-expanded', 'true');
  }

  #hide(): void {
    const element = this.#internalElement;
    if (!element) {
      return;
    }
    this.#closeSource ??= 'programmatic';
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

  #closeTeardown(): void {
    this.#placementController.stop();
    this.actualPlacement = null;
    unregisterDismissible(this);
    this.#removeEscapeListener();
    this.#interactiveElement?.setAttribute('aria-expanded', 'false');
  }

  /** Set `open` without re-triggering the show/hide effect. */
  #syncOpen(value: boolean): void {
    if (this.open === value) {
      return;
    }
    this.#syncingOpen = true;
    this.open = value;
  }

  // ──────────────────────────────
  //     NATIVE EVENT HANDLERS
  // ──────────────────────────────

  // Default mode: the popover-API lifecycle on the internal `<div>`.
  #onBeforeToggle = (event: ToggleEvent): void => {
    if (event.newState === 'open') {
      this.#dispatchOpen();
    } else {
      this.#syncOpen(false);
      this.#dispatchClose(this.#closeSource ?? 'outside');
      this.#closeTeardown();
    }
  };

  // Modal mode: Escape routes through the native `cancel` event.
  #onCancel = (): void => {
    this.#closeSource = 'escape';
  };

  // Modal mode: `close` fires for Escape, backdrop-click, and programmatic close.
  #onClose = (): void => {
    this.#syncOpen(false);
    this.#dispatchClose(this.#closeSource ?? 'programmatic');
    this.#closeTeardown();
  };

  // Modal mode: a pointerdown landing on the dialog itself (not its padded
  // content) is a backdrop click.
  #onPointerDown = (event: PointerEvent): void => {
    if (event.target === this.#internalElement) {
      this.#closeSource = 'outside';
      (this.#internalElement as HTMLDialogElement).close();
    }
  };

  #addEscapeListener(): void {
    if (this.#escapeListener) {
      return;
    }
    this.#escapeListener = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isTopDismissible(this)) {
        this.#closeSource = 'escape';
      }
    };
    document.addEventListener('keydown', this.#escapeListener, {
      capture: true,
    });
  }

  #removeEscapeListener(): void {
    if (!this.#escapeListener) {
      return;
    }
    document.removeEventListener('keydown', this.#escapeListener, {
      capture: true,
    });
    this.#escapeListener = undefined;
  }

  // ──────────────────
  //     EVENTS
  // ──────────────────

  #dispatchOpen(): void {
    this.dispatchEvent(
      new CustomEvent('swc-open', { bubbles: true, composed: true })
    );
    this.#dispatchAfter('swc-after-open');
  }

  #dispatchClose(source: PopoverCloseSource): void {
    this.dispatchEvent(
      new CustomEvent('swc-close', {
        detail: { source },
        bubbles: true,
        composed: true,
      })
    );
    this.#dispatchAfter('swc-after-close');
    this.#closeSource = null;
  }

  /** Fire an after-event on `transitionend`, or immediately if no transition. */
  #dispatchAfter(type: 'swc-after-open' | 'swc-after-close'): void {
    const element = this.#internalElement;
    const duration = element
      ? getComputedStyle(element).transitionDuration
      : '0s';
    const fire = (): void =>
      void this.dispatchEvent(
        new CustomEvent(type, { bubbles: true, composed: true })
      );
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
      ${this.tip
        ? html`
            <span class="swc-Popover-tip"></span>
          `
        : nothing}
    `;

    // The render shape branches on `modal`: a `<div popover="auto">` in the
    // default (non-modal) mode, a `<dialog>` (`.showModal()`) in modal mode.
    return this.modal
      ? html`
          <dialog
            class=${classes}
            @cancel=${this.#onCancel}
            @close=${this.#onClose}
            @pointerdown=${this.#onPointerDown}
          >
            ${content}
          </dialog>
        `
      : html`
          <div
            class=${classes}
            popover="auto"
            @beforetoggle=${this.#onBeforeToggle}
          >
            ${content}
          </div>
        `;
  }
}
