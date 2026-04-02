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
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import '@adobe/spectrum-wc/icon';

import { ThumbDownIcon, ThumbUpIcon } from '../utils/icons/index.js';

import styles from './message-feedback.css';

const THUMB_UP_LABEL = 'Good response';
const THUMB_DOWN_LABEL = 'Poor response';

/**
 * Binary thumbs-up / thumbs-down feedback control for AI responses.
 *
 * @element swc-message-feedback
 * @fires {CustomEvent} swc-feedback - Dispatched when the user selects a feedback option.
 *
 * When `show-tooltips` is true (default), Spectrum-style labels appear above each control on
 * `:hover` or when the button matches `:focus-visible` (keyboard-style focus, not click-focus).
 */
export class MessageFeedback extends SpectrumElement {
  /**
   * The currently selected feedback option.
   * - `none`: no selection (default)
   * - `thumb-up`: positive feedback selected
   * - `thumb-down`: negative feedback selected
   */
  @property({ type: String, reflect: true })
  public selection: 'none' | 'thumb-up' | 'thumb-down' = 'none';

  /**
   * When `true`, shows Tooltip (M)-style labels on hover and when the thumb has `:focus-visible`
   * (fixed English copy matching design; not attribute-configurable).
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-tooltips' })
  public showTooltips = true;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _handleThumbUp(): void {
    this.selection = this.selection === 'thumb-up' ? 'none' : 'thumb-up';
    this.dispatchEvent(
      new CustomEvent('swc-feedback', {
        bubbles: true,
        composed: true,
        detail: { selection: this.selection },
      })
    );
  }

  private _handleThumbDown(): void {
    this.selection = this.selection === 'thumb-down' ? 'none' : 'thumb-down';
    this.dispatchEvent(
      new CustomEvent('swc-feedback', {
        bubbles: true,
        composed: true,
        detail: { selection: this.selection },
      })
    );
  }

  protected override render(): TemplateResult {
    const tipUp = this.showTooltips
      ? html`
          <span class="swc-MessageFeedback-tooltip" aria-hidden="true">
            ${THUMB_UP_LABEL}
          </span>
        `
      : nothing;
    const tipDown = this.showTooltips
      ? html`
          <span class="swc-MessageFeedback-tooltip" aria-hidden="true">
            ${THUMB_DOWN_LABEL}
          </span>
        `
      : nothing;

    return html`
      <div
        class="swc-MessageFeedback"
        role="group"
        aria-label="Response feedback"
      >
        <span class="swc-MessageFeedback-anchor">
          <button
            class="swc-MessageFeedback-button"
            ?data-selected=${this.selection === 'thumb-up'}
            aria-label=${THUMB_UP_LABEL}
            aria-pressed=${this.selection === 'thumb-up'}
            @click=${this._handleThumbUp}
          >
            <swc-icon
              label=${THUMB_UP_LABEL}
              style="--swc-icon-inline-size:16px;--swc-icon-block-size:16px;"
            >
              ${ThumbUpIcon()}
            </swc-icon>
          </button>
          ${tipUp}
        </span>
        <span class="swc-MessageFeedback-anchor">
          <button
            class="swc-MessageFeedback-button"
            ?data-selected=${this.selection === 'thumb-down'}
            aria-label=${THUMB_DOWN_LABEL}
            aria-pressed=${this.selection === 'thumb-down'}
            @click=${this._handleThumbDown}
          >
            <swc-icon
              label=${THUMB_DOWN_LABEL}
              style="--swc-icon-inline-size:16px;--swc-icon-block-size:16px;"
            >
              ${ThumbDownIcon()}
            </swc-icon>
          </button>
          ${tipDown}
        </span>
      </div>
    `;
  }
}
