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

import { SlotPresenceController } from '@adobe/spectrum-wc-core/controllers/slot-presence-controller/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import {
  runAfterTransition,
  validateEnum,
} from '@adobe/spectrum-wc-core/utils/index.js';

import { TOAST_VARIANTS, type ToastVariant } from './Toast.types.js';

/**
 * Abstract base class for toast. Owns shared API and behavior; rendering lives in SWC.
 *
 * @slot - Toast message text.
 * @slot action - Optional action button.
 */
export abstract class ToastBase extends SpectrumElement {
  private _cancelAfterTransition?: () => void;
  private _closeEventDispatched = false;
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
   * Observes whether an action button is present.
   *
   * @internal
   */
  protected actionSlotPresence = new SlotPresenceController(
    this,
    '[slot="action"]'
  );

  /**
   * Whether the action slot has content.
   *
   * @internal
   */
  protected get hasAction(): boolean {
    return this.actionSlotPresence.isPresent;
  }

  /**
   * The rendered element whose CSS transition gates the open/close lifecycle events.
   */
  protected abstract get internalElement(): HTMLElement | null;

  public override connectedCallback(): void {
    super.connectedCallback();
    this._contentObserver.observe(this, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  public override disconnectedCallback(): void {
    this._contentObserver.disconnect();
    this._cancelAfterTransition?.();
    super.disconnectedCallback();
  }

  /**
   * Closes the toast.
   */
  public close(): void {
    this.open = false;
  }

  /**
   * Requests dismissal and closes unless the `swc-close` event is canceled.
   *
   * @internal
   */
  protected readonly requestClose = (): void => {
    const accepted = this.dispatchEvent(
      new CustomEvent('swc-close', {
        bubbles: true,
        cancelable: true,
        composed: true,
      })
    );
    if (!accepted) {
      return;
    }
    this._closeEventDispatched = true;
    this.close();
  };

  protected override update(changedProperties: PropertyValues): void {
    validateEnum(this, {
      prop: 'variant',
      value: this.variant,
      valid: TOAST_VARIANTS,
      url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-toast--docs',
    });
    this.setAttribute('role', 'alertdialog');
    this.setAttribute('aria-modal', 'false');
    this.setAttribute('tabindex', '0');
    if (this.open) {
      this.removeAttribute('aria-hidden');
    } else {
      this.setAttribute('aria-hidden', 'true');
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
      this.dispatchEvent(
        new CustomEvent('swc-open', { bubbles: true, composed: true })
      );
      this.dispatchAfterTransition('swc-after-open');
      return;
    }

    if (!this._closeEventDispatched) {
      const accepted = this.dispatchEvent(
        new CustomEvent('swc-close', {
          bubbles: true,
          cancelable: true,
          composed: true,
        })
      );
      if (!accepted) {
        this.open = true;
        return;
      }
    }
    this._closeEventDispatched = false;
    this.dispatchAfterTransition('swc-after-close');
  }

  private updateAccessibleName(): void {
    const messageNodes = [...this.childNodes].filter((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return Boolean(node.textContent?.trim());
      }
      return (
        node.nodeType === Node.ELEMENT_NODE &&
        !(node as Element).hasAttribute('slot')
      );
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
