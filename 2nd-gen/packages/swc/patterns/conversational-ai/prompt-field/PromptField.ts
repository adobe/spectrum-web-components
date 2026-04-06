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

import {
  ChevronUpIcon,
  PlusIcon,
  StopIcon,
} from '../utils/icons/index.js';

import styles from './prompt-field.css';

/**
 * Prompt entry surface for conversational AI flows.
 *
 * Fires events for all interactions; consumers are responsible for managing state.
 *
 * @element swc-prompt-field
 *
 * @slot artifact - Optional attachment preview(s); supports multiple slotted artifacts.
 * @slot leading-actions - Optional additional actions shown next to the upload button.
 */
export class PromptField extends SpectrumElement {
  /** When `true`, show the stop action in place of send. */
  @property({ type: Boolean, reflect: true })
  public sending = false;

  /** Accessible label shown above the textarea. */
  @property({ type: String })
  public label = 'Prompt';

  /** Placeholder text shown inside the textarea. */
  @property({ type: String })
  public placeholder = 'Ask anything';

  /** The current textarea value. Controlled by the consumer. */
  @property({ type: String })
  public value = '';

  private _hasArtifacts = false;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _handleInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.dispatchEvent(
      new CustomEvent('swc-input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  private _handleSendClick(): void {
    if (!this._isPopulated) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent('swc-submit', { bubbles: true, composed: true })
    );
  }

  private _handleStopClick(): void {
    this.dispatchEvent(
      new CustomEvent('swc-stop', { bubbles: true, composed: true })
    );
  }

  private _handleUploadClick(): void {
    this.dispatchEvent(
      new CustomEvent('swc-upload-click', { bubbles: true, composed: true })
    );
  }

  private _syncArtifactPresenceFromSlot(slot?: HTMLSlotElement): void {
    const artifactSlot =
      slot ??
      this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="artifact"]');

    const hasArtifacts =
      (artifactSlot?.assignedElements({ flatten: true })?.length ?? 0) > 0;

    if (hasArtifacts !== this._hasArtifacts) {
      this._hasArtifacts = hasArtifacts;
      this.requestUpdate();
    }
  }

  private _handleArtifactSlotChange(event: Event): void {
    this._syncArtifactPresenceFromSlot(event.target as HTMLSlotElement);
  }

  private get _isPopulated(): boolean {
    return this.value.trim().length > 0 || this._hasArtifacts;
  }

  protected override firstUpdated(): void {
    this._syncArtifactPresenceFromSlot();
  }

  private _renderArtifact(): TemplateResult {
    return html`
      <div
        class="swc-PromptField-artifacts"
        ?hidden=${!this._hasArtifacts}
      >
        <slot
          name="artifact"
          @slotchange=${this._handleArtifactSlotChange}
        ></slot>
      </div>
    `;
  }

  private _renderSendButton(): TemplateResult {
    return html`
      <button
        class="swc-PromptField-send"
        ?disabled=${!this._isPopulated}
        aria-label="Send"
        @click=${this._handleSendClick}
      >
        <swc-icon label="Send">${ChevronUpIcon()}</swc-icon>
      </button>
    `;
  }

  private _renderStopButton(): TemplateResult {
    return html`
      <button
        class="swc-PromptField-stop"
        aria-label="Stop generating"
        @click=${this._handleStopClick}
      >
        <swc-icon label="Stop">${StopIcon()}</swc-icon>
      </button>
    `;
  }

  protected override render(): TemplateResult {
    const showStop = this.sending;

    return html`
      <div class="swc-PromptField">
        <div class="swc-PromptField-box">
          <div
            class="swc-PromptField-input-area${this._hasArtifacts
              ? ' has-artifact'
              : ''}"
          >
            ${this._renderArtifact()}
            <div class="swc-PromptField-text-area">
              <span class="swc-PromptField-label">${this.label}</span>
              <textarea
                class="swc-PromptField-textarea"
                .value=${this.value}
                placeholder=${this.placeholder}
                aria-label=${this.label}
                rows="1"
                @input=${this._handleInput}
              ></textarea>
            </div>
          </div>

          <div class="swc-PromptField-action-bar">
            <div class="swc-PromptField-leading-actions">
              <button
                class="swc-PromptField-upload"
                aria-label="Add attachment"
                @click=${this._handleUploadClick}
              >
                <swc-icon label="Add">${PlusIcon()}</swc-icon>
              </button>
              <slot name="leading-actions"></slot>
            </div>

            ${showStop ? this._renderStopButton() : this._renderSendButton()}
          </div>
        </div>
      </div>
    `;
  }
}
