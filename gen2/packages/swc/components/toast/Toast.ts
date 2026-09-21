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

import { CSSResultArray, html, nothing, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ToastBase } from '@adobe/spectrum-wc-core/components/toast';
import { SlotAttributePropagationController } from '@adobe/spectrum-wc-core/controllers/slot-attribute-propagation-controller/index.js';

import '@adobe/spectrum-wc-icons/swc-icon-alert-triangle.js';
import '@adobe/spectrum-wc-icons/swc-icon-checkmark-circle.js';
import '@adobe/spectrum-wc-icons/swc-icon-info-circle.js';
import '../close-button/swc-close-button.js';

import styles from './toast.css';

/**
 * A toast displays a temporary notification in response to a user action or system event.
 *
 * @element swc-toast
 * @since 2.0.0
 *
 * @slot - Toast message text.
 * @slot action - One optional `swc-button`.
 *
 * @fires swc-open - Dispatched when the toast begins to open.
 * @fires swc-after-open - Dispatched after the toast finishes opening.
 * @fires swc-close - Cancelable event dispatched when the toast begins to close.
 * @fires swc-after-close - Dispatched after the toast finishes closing.
 */
export class Toast extends ToastBase {
  private readonly _actionAttributeControllers = [
    new SlotAttributePropagationController(this, {
      attribute: 'size',
      getValue: () => 'm',
      selector: 'swc-button',
      slotName: 'action',
    }),
    new SlotAttributePropagationController(this, {
      attribute: 'variant',
      getValue: () => 'secondary',
      selector: 'swc-button',
      slotName: 'action',
    }),
    new SlotAttributePropagationController(this, {
      attribute: 'fill-style',
      getValue: () => 'outline',
      selector: 'swc-button',
      slotName: 'action',
    }),
    new SlotAttributePropagationController(this, {
      attribute: 'static-color',
      getValue: () => 'white',
      selector: 'swc-button',
      slotName: 'action',
    }),
  ];

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override get internalElement(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.swc-Toast') ?? null;
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class=${classMap({
          'swc-Toast': true,
          [`swc-Toast--${this.variant}`]: true,
          'swc-Toast--hasAction': this.hasAction,
        })}
      >
        <div class="swc-Toast-body" role="alert" aria-atomic="true">
          <div class="swc-Toast-content">
            ${this.renderIcon()}
            <div class="swc-Toast-text"><slot></slot></div>
          </div>
        </div>
        <slot name="action" @slotchange=${this.handleActionSlotChange}></slot>
        <swc-close-button
          size="m"
          static-color="white"
          accessible-label="Close"
          @click=${this.requestClose}
        ></swc-close-button>
      </div>
    `;
  }

  private renderIcon(): TemplateResult | typeof nothing {
    const accessibleLabel = this.resolvedIconLabel;
    switch (this.variant) {
      case 'info':
        return html`
          <swc-icon-info-circle
            class="swc-Toast-typeIcon"
            size="m"
            accessible-label=${ifDefined(accessibleLabel)}
          ></swc-icon-info-circle>
        `;
      case 'positive':
        return html`
          <swc-icon-checkmark-circle
            class="swc-Toast-typeIcon"
            size="m"
            accessible-label=${ifDefined(accessibleLabel)}
          ></swc-icon-checkmark-circle>
        `;
      case 'negative':
        return html`
          <swc-icon-alert-triangle
            class="swc-Toast-typeIcon"
            size="m"
            accessible-label=${ifDefined(accessibleLabel)}
          ></swc-icon-alert-triangle>
        `;
      default:
        return nothing;
    }
  }

  private get resolvedIconLabel(): string | undefined {
    if (this.iconLabel !== undefined) {
      return this.iconLabel || undefined;
    }
    switch (this.variant) {
      case 'info':
        return 'Information';
      case 'positive':
        return 'Success';
      case 'negative':
        return 'Error';
      default:
        return undefined;
    }
  }

  private readonly handleActionSlotChange = (): void => {
    for (const controller of this._actionAttributeControllers) {
      controller.propagate();
    }
  };
}
