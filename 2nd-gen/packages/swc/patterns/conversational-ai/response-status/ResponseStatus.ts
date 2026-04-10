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
  TemplateResult,
} from 'lit';
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import '@adobe/spectrum-wc/icon';

import { Chevron75Icon } from '../../../components/icon/elements/index.js';
import { CheckCircleIcon } from '../utils/icons/index.js';

import styles from './response-status.css';

/**
 * Displays the current status of an AI response generation.
 *
 * While **`loading`** is `true`, reasoning is not shown.
 *
 * @element swc-response-status
 * @slot reasoning - Optional reasoning content shown when `loading` is `false` and `open` is `true`.
 */
export class ResponseStatus extends SpectrumElement {
  /** `true`: spinner + "Thinking…", `false`: checkmark + "Response generated". */
  @property({ type: Boolean, reflect: true })
  public loading = false;

  /**
   * `true`: reasoning expanded; `false`: reasoning collapsed.
   * Ignored while `loading` is `true`.
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _handleReasoningToggle(): void {
    if (this.loading) {
      return;
    }
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('swc-reasoning-toggle', {
        bubbles: true,
        composed: true,
        detail: { open: this.open },
      })
    );
  }

  private _renderLoadingRow(): TemplateResult {
    return html`
      <div class="swc-ResponseStatus-row">
        <span
          class="swc-ResponseStatus-spinner"
          role="status"
          aria-label="Thinking"
        ></span>
        <span class="swc-ResponseStatus-label">Thinking…</span>
      </div>
    `;
  }

  private _renderCompleteRow(): TemplateResult {
    const showDisclosure = true;
    const expanded = this.open;

    if (showDisclosure) {
      return html`
        <button
          class="swc-ResponseStatus-row swc-ResponseStatus-row--button"
          aria-expanded=${expanded}
          aria-controls="swc-reasoning-panel"
          @click=${this._handleReasoningToggle}
        >
          <swc-icon
            class=${expanded
              ? 'swc-ResponseStatus-chevron swc-ResponseStatus-chevron--down'
              : 'swc-ResponseStatus-chevron'}
            style="--swc-icon-inline-size:10px;--swc-icon-block-size:10px;"
            label=${expanded ? 'Collapse reasoning' : 'Expand reasoning'}
          >
            ${Chevron75Icon()}
          </swc-icon>
          <span class="swc-ResponseStatus-label">Response generated</span>
          <swc-icon
            style="--swc-icon-inline-size:20px;--swc-icon-block-size:20px;"
            label="Response generated"
          >
            ${CheckCircleIcon()}
          </swc-icon>
        </button>
      `;
    }

    return html`
      <div class="swc-ResponseStatus-row">
        <swc-icon
          style="--swc-icon-inline-size:20px;--swc-icon-block-size:20px;"
          label="Response generated"
        >
          ${CheckCircleIcon()}
        </swc-icon>
        <span class="swc-ResponseStatus-label">Response generated</span>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    const isLoading = this.loading;
    const showReasoningPanel = !isLoading && this.open;

    return html`
      <div class="swc-ResponseStatus">
        ${isLoading ? this._renderLoadingRow() : this._renderCompleteRow()}
        ${showReasoningPanel
          ? html`
              <div
                id="swc-reasoning-panel"
                class="swc-ResponseStatus-reasoning-panel"
                role="region"
                aria-label="Reasoning"
              >
                <slot name="reasoning"></slot>
              </div>
            `
          : ''}
      </div>
    `;
  }
}
