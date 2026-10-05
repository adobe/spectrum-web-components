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

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import {
  runAfterTransition,
  validateEnum,
} from '@adobe/spectrum-wc-core/utils/index.js';

import {
  SWC_TOAST_AFTER_CLOSE_EVENT,
  SWC_TOAST_AFTER_OPEN_EVENT,
  SWC_TOAST_CLOSE_EVENT,
  SWC_TOAST_OPEN_EVENT,
  TOAST_VARIANTS,
  type ToastVariant,
} from './Toast.types.js';

/**
 * Abstract base class for toast. Owns shared API and behavior; rendering lives in SWC.
 *
 * @slot - Toast message text.
 */
export abstract class ToastBase extends SpectrumElement {
  private _cancelAfterTransition?: () => void;
  private _closeEventDispatched = false;
  private _contentRevealed = true;
  private _cancelContentReveal?: () => void;
  private readonly _contentObserver = new MutationObserver(() => {
    this.requestUpdate();
  });

  /**
   * Whether the toast is visible.
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /**
   * The semantic variant of the toast.
   */
  @property({ type: String, reflect: true })
  public variant: ToastVariant = 'neutral';

  /**
   * An accessible label for the semantic variant icon.
   *
   * Set to an empty string when the message text already communicates the
   * variant and the icon should be decorative.
   */
  @property({ type: String, attribute: 'icon-label' })
  public iconLabel?: string;

  /**
   * The label for the optional action button. When set, Toast renders its own button.
   */
  @property({ type: String, attribute: 'action-label' })
  public actionLabel?: string;

  /**
   * Whether the message content is exposed to the accessibility tree.
   *
   * Prototype for Q11: false for one paint after opening so the live region
   * is announced reliably (Q10), then set true on the following frame.
   *
   * @internal
   */
  protected get contentRevealed(): boolean {
    return this._contentRevealed;
  }

  /**
   * The rendered element whose CSS transition gates the open/close lifecycle events.
   */
  protected abstract get internalElement(): HTMLElement | null;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'alertdialog');
    this.setAttribute('aria-modal', 'false');
    this.requestUpdate();
    this._contentObserver.observe(this, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  public override disconnectedCallback(): void {
    this._contentObserver.disconnect();
    this._cancelAfterTransition?.();
    this._cancelAfterTransition = undefined;
    this._cancelContentReveal?.();
    this._cancelContentReveal = undefined;
    this._contentRevealed = true;
    this._closeEventDispatched = false;
    super.disconnectedCallback();
  }

  /**
   * Closes the toast unless the synchronous `swc-close` event is canceled.
   *
   * Assigning `open = false` directly still dispatches `swc-close` during the
   * update cycle.
   */
  public close(): void {
    if (!this.open) {
      return;
    }
    this.requestClose();
  }

  /**
   * Requests dismissal and closes unless the `swc-close` event is canceled.
   *
   * @internal
   */
  protected readonly requestClose = (): void => {
    const accepted = this.dispatchEvent(
      new CustomEvent(SWC_TOAST_CLOSE_EVENT, {
        bubbles: true,
        cancelable: true,
        composed: true,
      })
    );
    if (!accepted) {
      return;
    }
    this._closeEventDispatched = true;
    this.open = false;
  };

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    if (this.open && changedProperties.get('open') === false) {
      this._contentRevealed = false;
      this.dispatchEvent(
        new CustomEvent(SWC_TOAST_OPEN_EVENT, {
          bubbles: true,
          composed: true,
        })
      );
    } else if (
      !this.open &&
      changedProperties.get('open') === true &&
      !this._closeEventDispatched
    ) {
      const accepted = this.dispatchEvent(
        new CustomEvent(SWC_TOAST_CLOSE_EVENT, {
          bubbles: true,
          cancelable: true,
          composed: true,
        })
      );
      this._closeEventDispatched = true;
      if (!accepted) {
        this.open = true;
      }
    }
  }

  protected override update(changedProperties: PropertyValues): void {
    validateEnum(this, {
      prop: 'variant',
      value: this.variant,
      valid: TOAST_VARIANTS,
      url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-toast--docs',
    });
    if (!this.hasUpdated || changedProperties.has('open')) {
      this.setAttribute('tabindex', '0');
      if (this.open) {
        this.removeAttribute('aria-hidden');
      } else {
        this.setAttribute('aria-hidden', 'true');
      }
    }
    this.updateAccessibleName();
    super.update(changedProperties);
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (
      !changedProperties.has('open') ||
      changedProperties.get('open') === undefined
    ) {
      return;
    }

    if (this.open) {
      if (this._closeEventDispatched) {
        this._closeEventDispatched = false;
        return;
      }
      this.scheduleContentReveal();
      this.dispatchAfterTransition(SWC_TOAST_AFTER_OPEN_EVENT);
      return;
    }

    this._cancelContentReveal?.();
    this._closeEventDispatched = false;
    this.dispatchAfterTransition(SWC_TOAST_AFTER_CLOSE_EVENT);
  }

  private updateAccessibleName(): void {
    const messageNodes = [...this.childNodes].filter((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return Boolean(node.textContent?.trim());
      }
      if (node.nodeType !== Node.ELEMENT_NODE) {
        return false;
      }
      // An empty slot="" attribute assigns to the default slot, same as no
      // slot attribute at all.
      return !(node as Element).getAttribute('slot');
    });
    const idTarget =
      messageNodes.length === 1 && messageNodes[0] instanceof HTMLElement
        ? messageNodes[0].id
        : '';

    if (idTarget) {
      this.setAttribute('aria-labelledby', idTarget);
      this.removeAttribute('aria-label');
      return;
    }

    this.removeAttribute('aria-labelledby');
    const label = messageNodes
      .map((node) => node.textContent ?? '')
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (label) {
      this.setAttribute('aria-label', label);
    } else {
      this.removeAttribute('aria-label');
    }
  }

  /**
   * Waits two frames, then exposes the message content (Q10/Q11 prototype).
   */
  private scheduleContentReveal(): void {
    this._cancelContentReveal?.();
    let cancelled = false;
    requestAnimationFrame(() => {
      if (cancelled) {
        return;
      }
      requestAnimationFrame(() => {
        if (cancelled) {
          return;
        }
        this._contentRevealed = true;
        this.requestUpdate();
      });
    });
    this._cancelContentReveal = () => {
      cancelled = true;
    };
  }

  private dispatchAfterTransition(eventName: string): void {
    this._cancelAfterTransition?.();
    const element = this.internalElement;
    if (!element) {
      return;
    }
    this._cancelAfterTransition = runAfterTransition(element, () => {
      this._cancelAfterTransition = undefined;
      this.dispatchEvent(
        new CustomEvent(eventName, { bubbles: true, composed: true })
      );
    });
  }
}
