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
import { ifDefined } from 'lit/directives/if-defined.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import '@adobe/spectrum-wc/icon';

import { ChevronUpIcon, PlusIcon, StopIcon } from '../utils/icons/index.js';

import styles from './prompt-field.css';

export interface PromptFieldArtifactValue {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  file: File;
}

export interface PromptFieldFilesSelectedDetail {
  files: File[];
  artifactValues: PromptFieldArtifactValue[];
  allArtifactValues: PromptFieldArtifactValue[];
}

export interface PromptFieldSubmitDetail {
  value: string;
  artifactValues: PromptFieldArtifactValue[];
}

/**
 * Prompt entry surface for conversational AI flows.
 *
 * Fires events for all interactions; consumers are responsible for managing state.
 *
 * @element swc-prompt-field
 *
 * @slot artifact - Optional attachment preview(s); supports multiple slotted artifacts.
 *
 * @event swc-submit - Fires when the send button is clicked or Enter is pressed in the textarea.
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
  public placeholder =
    'Ready to get started? Ask a question, share an idea, or add a task.';

  /** The current textarea value. Controlled by the consumer. */
  @property({ type: String })
  public value = '';

  /**
   * Controlled attachment values associated with the current draft.
   * Updated automatically when files are selected through the built-in file picker.
   */
  @property({ attribute: false })
  public artifactValues: PromptFieldArtifactValue[] = [];

  /** Comma-separated file MIME types/extensions accepted by the picker. */
  @property({ type: String })
  public accept = '';

  /** When true, picker allows selecting multiple files. */
  @property({ type: Boolean })
  public multiple = true;

  private _hasArtifacts = false;
  private _artifactCount = 0;
  private _artifactIdCounter = 0;

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

  private _handleTextareaKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' || event.shiftKey) {
      return;
    }

    event.preventDefault();
    if (this.sending) {
      return;
    }
    this._handleSendClick();
  }

  private _handleSendClick(): void {
    if (!this._isPopulated) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent<PromptFieldSubmitDetail>('swc-submit', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value,
          artifactValues: this.artifactValues,
        },
      })
    );
  }

  private _handleStopClick(): void {
    this.dispatchEvent(
      new CustomEvent('swc-stop', { bubbles: true, composed: true })
    );
  }

  private _handleUploadClick(): void {
    const uploadClickEvent = new CustomEvent('swc-upload-click', {
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(uploadClickEvent);
    if (uploadClickEvent.defaultPrevented) {
      return;
    }
    const fileInput = this.shadowRoot?.querySelector<HTMLInputElement>(
      '.swc-PromptField-file-input'
    );
    fileInput?.click();
  }

  private _handleFileInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    if (files.length === 0) {
      return;
    }

    const nextArtifactValues = files.map((file) => ({
      id: `artifact-${++this._artifactIdCounter}`,
      name: file.name,
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
      file,
    }));

    this.artifactValues = [...this.artifactValues, ...nextArtifactValues];

    this.dispatchEvent(
      new CustomEvent<PromptFieldFilesSelectedDetail>('swc-files-selected', {
        bubbles: true,
        composed: true,
        detail: {
          files,
          artifactValues: nextArtifactValues,
          allArtifactValues: this.artifactValues,
        },
      })
    );

    // Allow selecting the same file again in subsequent picker interactions.
    input.value = '';
  }

  private _syncArtifactPresenceFromSlot(slot?: HTMLSlotElement): void {
    const artifactSlot =
      slot ??
      this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="artifact"]');

    const artifactCount =
      artifactSlot?.assignedElements({ flatten: true })?.length ?? 0;
    const hasArtifacts = artifactCount > 0;

    if (
      hasArtifacts !== this._hasArtifacts ||
      artifactCount !== this._artifactCount
    ) {
      this._hasArtifacts = hasArtifacts;
      this._artifactCount = artifactCount;
      this.requestUpdate();
    }
  }

  private _handleArtifactSlotChange(event: Event): void {
    this._syncArtifactPresenceFromSlot(event.target as HTMLSlotElement);
  }

  private get _isPopulated(): boolean {
    return (
      this.value.trim().length > 0 ||
      this._hasArtifacts ||
      this.artifactValues.length > 0
    );
  }

  protected override firstUpdated(): void {
    this._syncArtifactPresenceFromSlot();
  }

  private _renderArtifact(): TemplateResult {
    const artifactClass =
      this._artifactCount <= 1
        ? 'swc-PromptField-artifacts is-single'
        : 'swc-PromptField-artifacts is-multiple';

    return html`
      <div class=${artifactClass} ?hidden=${!this._hasArtifacts}>
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
                @keydown=${this._handleTextareaKeydown}
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
              <input
                class="swc-PromptField-file-input"
                type="file"
                ?multiple=${this.multiple}
                accept=${ifDefined(this.accept || undefined)}
                tabindex="-1"
                @change=${this._handleFileInputChange}
              />
            </div>

            ${showStop ? this._renderStopButton() : this._renderSendButton()}
          </div>
        </div>
        <div class="swc-PromptField-footer">
          <p class="swc-PromptField-legal-disclaimer">
            Responses are generated using AI, and may be inaccurate. Check
            before using.
            <a
              target="_blank"
              href="https://www.adobe.com/legal/licenses-terms/adobe-gen-ai-user-guidelines.html"
            >
              AI User Guidelines
            </a>
          </p>
        </div>
      </div>
    `;
  }
}
