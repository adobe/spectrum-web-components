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

import { CSSResultArray, html, type PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import '@adobe/spectrum-wc/icon';

import {
  ChevronUpIcon,
  CrossIcon,
  InformationIcon,
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
 * @fires swc-prompt-send-ready - Fired when the send control becomes actionable (was not ready, now ready). Not emitted on first paint. `detail.value` is the current prompt string.
 * @fires swc-prompt-send-idle - Fired when the send control stops being actionable (e.g. text cleared and `populated` is false, or `state` becomes `stop`).
 *
 * @slot artifact - Optional attachment preview; pair with `uploaded-artifact` for shell layout.
 */
export class PromptField extends SpectrumElement {
  /** Controls whether the send button or stop button is shown on the right. */
  @property({ type: String, reflect: true })
  public state: 'default' | 'send' | 'stop' = 'default';

  /**
   * Shell layout preset for the artifact region above the text input.
   * - `none`: hide the artifact area
   * - `card`: full-width band (horizontal file-style attachments)
   * - `media`: square tile region for visual previews (image, GIF, video poster, etc.); use `swc-conversation-artifact-media` without title/subtitle to fill it
   */
  @property({ type: String, reflect: true, attribute: 'uploaded-artifact' })
  public uploadedArtifact: 'none' | 'card' | 'media' = 'none';

  /**
   * When `true`, the send button is enabled even if the textarea is empty (e.g. attachment-only send).
   * Otherwise send is enabled when `value` has non-whitespace content.
   */
  @property({ type: Boolean, reflect: true })
  public populated = false;

  /** Accessible label shown above the textarea. */
  @property({ type: String })
  public label = 'Prompt';

  /** Placeholder text shown inside the textarea. */
  @property({ type: String })
  public placeholder = 'Ask anything';

  /** The current textarea value. Controlled by the consumer. */
  @property({ type: String })
  public value = '';

  private _sendReady = false;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  /** Whether the send affordance is enabled (`state` is not `stop`, and there is text or `populated`). */
  private _isSendReady(): boolean {
    if (this.state === 'stop') {
      return false;
    }
    return this.populated || this.value.trim().length > 0;
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this._sendReady = this._isSendReady();
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (
      !changedProperties.has('value') &&
      !changedProperties.has('populated') &&
      !changedProperties.has('state')
    ) {
      return;
    }
    const next = this._isSendReady();
    if (next === this._sendReady) {
      return;
    }
    if (next) {
      this.dispatchEvent(
        new CustomEvent('swc-prompt-send-ready', {
          bubbles: true,
          composed: true,
          detail: { value: this.value },
        })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent('swc-prompt-send-idle', {
          bubbles: true,
          composed: true,
          detail: { value: this.value },
        })
      );
    }
    this._sendReady = next;
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
    if (!this._isSendReady()) {
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

  private _handleArtifactDismiss(): void {
    this.dispatchEvent(
      new CustomEvent('swc-artifact-dismiss', { bubbles: true, composed: true })
    );
  }

  private _renderArtifact(): TemplateResult {
    return html`
      <div class="swc-PromptField-artifact">
        <slot name="artifact"></slot>
        <button
          class="swc-PromptField-artifact-dismiss"
          aria-label="Remove attachment"
          @click=${this._handleArtifactDismiss}
        >
          <swc-icon label="Remove">${CrossIcon()}</swc-icon>
        </button>
      </div>
    `;
  }

  private _renderSendButton(): TemplateResult {
    return html`
      <button
        class="swc-PromptField-send"
        ?disabled=${!this._isSendReady()}
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
    const showArtifact = this.uploadedArtifact !== 'none';
    const showStop = this.state === 'stop';

    return html`
      <div class="swc-PromptField">
        <div class="swc-PromptField-box">
          <div class="swc-PromptField-input-area">
            ${showArtifact ? this._renderArtifact() : ''}
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
            <button
              class="swc-PromptField-upload"
              aria-label="Add attachment"
              @click=${this._handleUploadClick}
            >
              <swc-icon label="Add">${PlusIcon()}</swc-icon>
            </button>

            ${showStop ? this._renderStopButton() : this._renderSendButton()}
          </div>
        </div>

        <p class="swc-PromptField-disclaimer">
          <span class="swc-PromptField-disclaimer-copy">
            <span class="swc-PromptField-disclaimer-text">
              Responses are generated using AI, and may be inaccurate. Check
              before using.
            </span>
            <span class="swc-PromptField-disclaimer-link-row">
              <a
                class="swc-PromptField-disclaimer-link"
                href="https://www.adobe.com/legal/licenses-terms/adobe-gen-ai-user-guidelines.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                AI User Guidelines
              </a>
              <span class="swc-PromptField-disclaimer-icon" aria-hidden="true">
                ${InformationIcon()}
              </span>
            </span>
          </span>
        </p>
      </div>
    `;
  }
}
