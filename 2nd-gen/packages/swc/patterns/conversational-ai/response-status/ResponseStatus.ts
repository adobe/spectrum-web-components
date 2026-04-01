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
  PropertyValues,
  TemplateResult,
} from 'lit';
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import '@adobe/spectrum-wc/icon';

import { Chevron75Icon } from '../../../components/icon/elements/index.js';
import { CheckCircleIcon } from '../utils/icons/index.js';

import styles from './response-status.css';

const REASONING_MODES = ['hidden', 'collapsed', 'expanded'] as const;
export type ResponseStatusReasoning = (typeof REASONING_MODES)[number];

/**
 * Displays the current status of an AI response generation.
 *
 * While **`state="loading"`**, reasoning is not shown (the `reasoning` attribute is ignored for UI).
 *
 * @element swc-response-status
 * @slot reasoning - Content shown when `reasoning` is `collapsed` (panel hidden) or `expanded` (panel visible); only interactive when `state` is `complete`.
 */
export class ResponseStatus extends SpectrumElement {
  /**
   * - `loading`: spinner + "Thinking…" label
   * - `complete`: checkmark + "Response generated" label
   */
  @property({ type: String, reflect: true })
  public state: 'loading' | 'complete' = 'loading';

  /**
   * - `hidden`: no reasoning disclosure
   * - `collapsed`: disclosure closed (default when showing reasoning)
   * - `expanded`: disclosure open; use for initial open state — toggling updates this attribute
   */
  @property({ type: String, reflect: true })
  public reasoning: ResponseStatusReasoning = 'hidden';

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);
    if (changed.has('reasoning')) {
      const v = this.reasoning as string;
      if (!REASONING_MODES.includes(v as ResponseStatusReasoning)) {
        this.reasoning = 'hidden';
      }
    }
  }

  private _handleReasoningToggle(): void {
    if (this.state !== 'complete') {
      return;
    }
    if (this.reasoning !== 'collapsed' && this.reasoning !== 'expanded') {
      return;
    }
    this.reasoning = this.reasoning === 'expanded' ? 'collapsed' : 'expanded';
    this.dispatchEvent(
      new CustomEvent('swc-reasoning-toggle', {
        bubbles: true,
        composed: true,
        detail: { reasoning: this.reasoning },
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
    const showDisclosure =
      this.reasoning === 'collapsed' || this.reasoning === 'expanded';
    const expanded = this.reasoning === 'expanded';

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
    const isLoading = this.state === 'loading';
    const showReasoningPanel =
      !isLoading && this.reasoning === 'expanded';

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
