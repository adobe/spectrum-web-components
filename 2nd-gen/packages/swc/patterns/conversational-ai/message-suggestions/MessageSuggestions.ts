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
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import '@adobe/spectrum-wc/icon';

import { ArrowCurvedIcon } from '../utils/icons/index.js';

import styles from './message-suggestions.css';

/**
 * A row of up to three follow-up suggestion chips rendered below an AI response.
 *
 * Slot suggestion text into the named slots `suggestion-1`, `suggestion-2`, `suggestion-3`.
 *
 * @element swc-message-suggestions
 * @slot suggestion-1 - Text for the first suggestion chip
 * @slot suggestion-2 - Text for the second suggestion chip
 * @slot suggestion-3 - Text for the third suggestion chip
 * @fires {CustomEvent} swc-suggestion - Dispatched when a chip is clicked.
 */
export class MessageSuggestions extends SpectrumElement {
  /**
   * How many suggestion chips to render (1–3).
   */
  @property({ type: String, reflect: true })
  public suggestions: '1' | '2' | '3' = '3';

  /**
   * When `true`, shows the section title "What would you like to do next?".
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-title' })
  public showTitle = false;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _handleChip1Click(): void {
    this.dispatchEvent(
      new CustomEvent('swc-suggestion', {
        bubbles: true,
        composed: true,
        detail: { index: 1 },
      })
    );
  }

  private _handleChip2Click(): void {
    this.dispatchEvent(
      new CustomEvent('swc-suggestion', {
        bubbles: true,
        composed: true,
        detail: { index: 2 },
      })
    );
  }

  private _handleChip3Click(): void {
    this.dispatchEvent(
      new CustomEvent('swc-suggestion', {
        bubbles: true,
        composed: true,
        detail: { index: 3 },
      })
    );
  }

  protected override render(): TemplateResult {
    const count = parseInt(this.suggestions, 10) as 1 | 2 | 3;

    return html`
      <div class="swc-MessageSuggestions">
        ${this.showTitle
          ? html`
              <p class="swc-MessageSuggestions-title">
                What would you like to do next?
              </p>
            `
          : ''}
        <div class="swc-MessageSuggestions-chips">
          <button
            class="swc-MessageSuggestions-chip"
            @click=${this._handleChip1Click}
          >
            <swc-icon
              style="--swc-icon-inline-size:14px;--swc-icon-block-size:14px;"
              label=""
            >
              ${ArrowCurvedIcon()}
            </swc-icon>
            <slot name="suggestion-1"></slot>
          </button>
          ${count >= 2
            ? html`
                <button
                  class="swc-MessageSuggestions-chip"
                  @click=${this._handleChip2Click}
                >
                  <swc-icon
                    style="--swc-icon-inline-size:14px;--swc-icon-block-size:14px;"
                    label=""
                  >
                    ${ArrowCurvedIcon()}
                  </swc-icon>
                  <slot name="suggestion-2"></slot>
                </button>
              `
            : ''}
          ${count >= 3
            ? html`
                <button
                  class="swc-MessageSuggestions-chip"
                  @click=${this._handleChip3Click}
                >
                  <swc-icon
                    style="--swc-icon-inline-size:14px;--swc-icon-block-size:14px;"
                    label=""
                  >
                    ${ArrowCurvedIcon()}
                  </swc-icon>
                  <slot name="suggestion-3"></slot>
                </button>
              `
            : ''}
        </div>
      </div>
    `;
  }
}
