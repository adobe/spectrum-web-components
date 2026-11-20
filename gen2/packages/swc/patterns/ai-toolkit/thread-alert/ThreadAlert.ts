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

import { CSSResultArray, html, TemplateResult } from 'lit';

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';

import '@adobe/spectrum-wc-icons/swc-icon-alert-diamond.js';
import '@adobe/spectrum-wc-icons/swc-icon-alert-triangle.js';
import '@adobe/spectrum-wc-icons/swc-icon-checkmark-circle.js';
import '@adobe/spectrum-wc-icons/swc-icon-info-circle.js';

import styles from './thread-alert.css';

/**
 * A rendering-only message with a status icon, required close button, and optional action.
 *
 * The message host is non-interactive and has no role or live region.
 * Applications own announcements, retry, dismissal, and named slotted controls.
 * The CSS-only `variant` attribute has no corresponding JavaScript property.
 *
 * @element swc-thread-alert
 * @attr {'informative' | 'positive' | 'notice' | 'negative' | 'neutral'} variant - Visual status. Defaults to informative when omitted.
 * @slot - Meaningful message text or inline HTML, including content links.
 * @slot actions - Optional single named action button.
 * @slot dismiss - Required single swc-close-button with a localized accessible-label.
 * @cssprop --swc-thread-alert-background-color - Message surface color.
 * @cssprop --swc-thread-alert-border-color - Decorative border color.
 * @cssprop --swc-thread-alert-border-width - Decorative border width.
 * @cssprop --swc-thread-alert-border-radius - Surface radius.
 * @cssprop --swc-thread-alert-content-color - Message text color.
 * @cssprop --swc-thread-alert-icon-color - Status icon color.
 * @cssprop --swc-thread-alert-icon-size - Status icon dimensions.
 * @cssprop --swc-thread-alert-min-block-size - Minimum message height.
 * @cssprop --swc-thread-alert-gap - Space between the icon, content, and controls.
 * @cssprop --swc-thread-alert-padding-block - Surface block padding.
 * @cssprop --swc-thread-alert-padding-inline-start - Surface inline-start padding.
 * @cssprop --swc-thread-alert-padding-inline-end - Surface inline-end padding.
 * @cssprop --swc-thread-alert-trailing-gap - Space before the inline dismiss control.
 * @cssprop --swc-thread-alert-font-family - Message font family.
 * @cssprop --swc-thread-alert-font-size - Message font size.
 * @cssprop --swc-thread-alert-font-weight - Message font weight.
 * @cssprop --swc-thread-alert-line-height - Message line height.
 */
export class ThreadAlert extends SpectrumElement {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-ThreadAlert">
        <span
          class="swc-ThreadAlert-icon swc-ThreadAlert-icon--informative"
          data-variant="informative"
          aria-hidden="true"
        >
          <swc-icon-info-circle></swc-icon-info-circle>
        </span>
        <span
          class="swc-ThreadAlert-icon swc-ThreadAlert-icon--positive"
          data-variant="positive"
          aria-hidden="true"
        >
          <swc-icon-checkmark-circle></swc-icon-checkmark-circle>
        </span>
        <span
          class="swc-ThreadAlert-icon swc-ThreadAlert-icon--notice"
          data-variant="notice"
          aria-hidden="true"
        >
          <swc-icon-alert-diamond></swc-icon-alert-diamond>
        </span>
        <span
          class="swc-ThreadAlert-icon swc-ThreadAlert-icon--negative"
          data-variant="negative"
          aria-hidden="true"
        >
          <swc-icon-alert-triangle></swc-icon-alert-triangle>
        </span>
        <span class="swc-ThreadAlert-content">
          <slot></slot>
        </span>
        <slot name="actions"></slot>
        <slot name="dismiss"></slot>
      </div>
    `;
  }
}
