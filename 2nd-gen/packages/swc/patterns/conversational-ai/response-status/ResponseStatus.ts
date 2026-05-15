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
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { Chevron75Icon } from '@adobe/spectrum-wc/icon/elements/index.js';
import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';
import '@adobe/spectrum-wc/components/progress-circle/swc-progress-circle.js';

import { uniqueId } from '../../../utils/id.js';
import { CheckCircleIcon } from '../utils/icons/index.js';

import styles from './response-status.css';

/**
 * Displays the current status of an AI response generation.
 *
 * While **`loading`** is `true`, reasoning is not shown.
 *
 * @element swc-response-status
 * @slot - Optional reasoning content. Disclosure UI is shown only when slot has content
 * and `loading` is `false`; content is visible when `open` is `true`.
 * If slot reasoning content is removed while `open=true`, the component collapses itself
 * by setting `open=false`.
 * @fires swc-response-status-toggle - Dispatched when the user expands or collapses the reasoning panel.
 * Detail: `{ open: boolean }`
 */
export class ResponseStatus extends SpectrumElement {
  private readonly reasoningPanelId = uniqueId('swc-reasoning-panel');
  @state()
  private _hasReasoningContent = false;

  /** `true`: progress circle + status label, `false`: checkmark + status label. */
  @property({ type: Boolean, reflect: true })
  public loading = false;

  /**
   * Status row label text shown while `loading=true`.
   */
  @property({ type: String, reflect: true })
  public loadingLabel = 'Generating response';

  /**
   * Status row label text shown while `loading=false`.
   */
  @property({ type: String, reflect: true })
  public completeLabel = 'Response generated';

  /**
   * Accessible label for the reasoning content group.
   */
  @property({ type: String, attribute: 'reasoning-label' })
  public reasoningLabel = 'Reasoning';

  /**
   * `true`: reasoning expanded; `false`: reasoning collapsed.
   * Ignored while `loading` is `true`. If reasoning slot content is removed,
   * `open` is automatically set to `false` and no `swc-response-status-toggle` event is emitted.
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override firstUpdated(): void {
    this._syncReasoningContent();
  }

  private _handleToggle(): void {
    if (this.loading || !this._hasReasoningContent) {
      return;
    }
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('swc-response-status-toggle', {
        bubbles: true,
        composed: true,
        detail: { open: this.open },
      })
    );
  }

  private _getStatusLabel(): string {
    return this.loading ? this.loadingLabel : this.completeLabel;
  }

  private _slotHasReasoningContent(slot: HTMLSlotElement | null): boolean {
    if (!slot) {
      return false;
    }
    for (const node of slot.assignedNodes({ flatten: true })) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        return true;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        return true;
      }
    }

    return false;
  }

  private _syncReasoningContent(slot?: HTMLSlotElement): void {
    const reasoningSlot =
      slot ??
      this.shadowRoot?.querySelector<HTMLSlotElement>(
        '.swc-ResponseStatus-reasoning-slot'
      ) ??
      null;
    const hasReasoningContent = this._slotHasReasoningContent(reasoningSlot);

    if (!hasReasoningContent && this.open) {
      this.open = false;
    }
    this._hasReasoningContent = hasReasoningContent;
  }

  private _handleReasoningSlotChange(event: Event): void {
    this._syncReasoningContent(event.target as HTMLSlotElement);
  }

  private _renderLoadingRow(label: string): TemplateResult {
    return html`
      <div class="swc-ResponseStatus-row" role="status" aria-label=${label}>
        <span class="swc-ResponseStatus-loadingSlot">
          <swc-progress-circle
            size="s"
            indeterminate
            aria-hidden="true"
          ></swc-progress-circle>
        </span>
        <span class="swc-ResponseStatus-label">${label}</span>
      </div>
    `;
  }

  private _renderCompleteRow(
    label: string,
    showDisclosure: boolean
  ): TemplateResult {
    const expanded = this.open;

    if (showDisclosure) {
      return html`
        <button
          class="swc-ResponseStatus-row swc-ResponseStatus-row--button"
          aria-label=${label}
          aria-expanded=${expanded}
          aria-controls=${this.reasoningPanelId}
          @click=${this._handleToggle}
        >
          <swc-icon
            class=${expanded
              ? 'swc-ResponseStatus-chevron swc-ResponseStatus-chevron--down'
              : 'swc-ResponseStatus-chevron'}
            style="--swc-icon-inline-size:10px;--swc-icon-block-size:10px;"
            aria-hidden="true"
          >
            ${Chevron75Icon()}
          </swc-icon>
          <span class="swc-ResponseStatus-label">${label}</span>
          <swc-icon
            style="--swc-icon-inline-size:20px;--swc-icon-block-size:20px;"
            aria-hidden="true"
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
          aria-hidden="true"
        >
          ${CheckCircleIcon()}
        </swc-icon>
        <span class="swc-ResponseStatus-label">${label}</span>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    const isLoading = this.loading;
    const statusLabel = this._getStatusLabel();
    const showDisclosure = !isLoading && this._hasReasoningContent;

    return html`
      <div class="swc-ResponseStatus">
        ${isLoading
          ? this._renderLoadingRow(statusLabel)
          : this._renderCompleteRow(statusLabel, showDisclosure)}
        <div
          id=${this.reasoningPanelId}
          class="swc-ResponseStatus-reasoning-panel"
          role=${ifDefined(showDisclosure ? 'group' : undefined)}
          aria-label=${ifDefined(
            showDisclosure ? this.reasoningLabel : undefined
          )}
          ?hidden=${!showDisclosure || !this.open}
        >
          <slot
            class="swc-ResponseStatus-reasoning-slot"
            @slotchange=${this._handleReasoningSlotChange}
          ></slot>
        </div>
      </div>
    `;
  }
}
