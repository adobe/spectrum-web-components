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

import { Chevron75Icon } from '../../../components/icon/elements/index.js';
import { CheckCircleIcon } from '../utils/icons/index.js';

import styles from './response-status.css';

/**
 * Displays the current status of an AI response generation.
 *
 * @element swc-response-status
 * @slot reasoning - Content shown in the expandable reasoning panel
 */
export class ResponseStatus extends SpectrumElement {
  /**
   * The current generation state.
   * - `loading`: spinner + "Thinking…" label
   * - `loading-complete`: checkmark + "Response generated" label
   */
  @property({ type: String, reflect: true })
  public state: 'loading' | 'loading-complete' = 'loading';

  /**
   * When `true`, shows the expandable reasoning disclosure below the status row.
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-reasoning' })
  public showReasoning = false;

  /**
   * Whether the reasoning panel is expanded.
   */
  @property({ type: Boolean, reflect: true, attribute: 'reasoning-expanded' })
  public reasoningExpanded = false;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _handleReasoningToggle(): void {
    this.reasoningExpanded = !this.reasoningExpanded;
    this.dispatchEvent(
      new CustomEvent('swc-reasoning-toggle', {
        bubbles: true,
        composed: true,
        detail: { expanded: this.reasoningExpanded },
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
    /* When show-reasoning is true, the chevron acts as the reasoning toggle */
    if (this.showReasoning) {
      return html`
        <button
          class="swc-ResponseStatus-row swc-ResponseStatus-row--button"
          aria-expanded=${this.reasoningExpanded}
          aria-controls="swc-reasoning-panel"
          @click=${this._handleReasoningToggle}
        >
          <swc-icon
            class=${this.reasoningExpanded
              ? 'swc-ResponseStatus-chevron swc-ResponseStatus-chevron--down'
              : 'swc-ResponseStatus-chevron'}
            style="--swc-icon-inline-size:10px;--swc-icon-block-size:10px;"
            label=${this.reasoningExpanded
              ? 'Collapse reasoning'
              : 'Expand reasoning'}
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
    const isLoading = this.state === 'loading';

    return html`
      <div class="swc-ResponseStatus">
        ${isLoading ? this._renderLoadingRow() : this._renderCompleteRow()}
        ${this.showReasoning && this.reasoningExpanded
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
