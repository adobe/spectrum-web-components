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
import {
  property,
  query,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import '@adobe/spectrum-wc/icon';

import { uniqueId } from '../../../utils/id.js';
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

export type PromptFieldMode = 'default' | 'loading' | 'disabled';

/**
 * Prompt entry surface for conversational AI flows.
 *
 * Uncontrolled with mirror pattern: the component updates its own draft state first,
 * then emits events so consumers can mirror or override that state.
 *
 * @element swc-prompt-field
 *
 * @slot artifact - Optional attachment preview(s); supports multiple slotted artifacts.
 * @slot legal - Optional legal/footer content.
 * @fires swc-prompt-field-input - Dispatched after the textarea value is internally updated.
 * Detail: `{ value: string }`
 * @fires swc-prompt-field-submit - Dispatched when send is triggered with text and/or artifacts.
 * Detail: `{ value: string, artifactValues: PromptFieldArtifactValue[] }`
 * @fires swc-prompt-field-stop - Dispatched when stop generation is requested in loading mode.
 * @fires swc-prompt-field-upload-click - Dispatched before opening the native file picker.
 * Cancel this event to prevent the picker from opening.
 * @fires swc-prompt-field-files-selected - Dispatched after files are chosen from the picker.
 * Detail:
 * `{ files: File[], artifactValues: PromptFieldArtifactValue[], allArtifactValues: PromptFieldArtifactValue[] }`
 */
export class PromptField extends SpectrumElement {
  private readonly labelId = uniqueId('swc-prompt-field-label');

  /** Visual mode for the prompt field action/interaction state. */
  @property({ type: String, reflect: true })
  public mode: PromptFieldMode = 'default';

  /** Accessible label shown above the textarea. */
  @property({ type: String })
  public label = 'Prompt';

  /** Optional accessible label override for the textarea. */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel = '';

  /** Accessible label for the send action button. */
  @property({ type: String, attribute: 'send-label' })
  public sendLabel = 'Send';

  /** Accessible label for the stop action button in loading mode. */
  @property({ type: String, attribute: 'stop-label' })
  public stopLabel = 'Stop generating';

  /** Accessible label for the upload button. */
  @property({ type: String, attribute: 'upload-label' })
  public uploadLabel = 'Add attachment';

  /** Placeholder text shown inside the textarea. */
  @property({ type: String })
  public placeholder =
    'Ready to get started? Ask a question, share an idea, or add a task.';

  /** The current textarea value; internally updated and externally mirrorable. */
  @property({ type: String })
  public value = '';

  /**
   * Attachment values associated with the current draft.
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

  @query('.swc-PromptField-file-input')
  private _fileInput?: HTMLInputElement;

  @queryAssignedElements({ slot: 'artifact', flatten: true })
  private _assignedArtifactElements!: HTMLElement[];

  @queryAssignedElements({ slot: 'legal', flatten: true })
  private _assignedLegalElements!: HTMLElement[];

  @state()
  private _hasSlottedLegal = false;

  /** Next textarea focus follows pointerdown on the textarea (click/touch). */
  private _textareaFocusFromPointer = false;

  /** Outer card ring: Tab / non-pointer focus only (see prompt-field.css). */
  @state()
  private _promptBoxKeyboardFocusRing = false;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _handleInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.dispatchEvent(
      new CustomEvent('swc-prompt-field-input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  private _handleTextareaPointerDown(event: PointerEvent): void {
    const textarea = event.currentTarget as HTMLTextAreaElement;
    if (textarea.matches(':focus')) {
      this._promptBoxKeyboardFocusRing = false;
      return;
    }

    this._textareaFocusFromPointer = true;
  }

  private _handleTextareaFocusIn(): void {
    const showRing = !this._textareaFocusFromPointer;
    this._textareaFocusFromPointer = false;
    this._promptBoxKeyboardFocusRing = showRing;
  }

  private _handleTextareaFocusOut(): void {
    this._promptBoxKeyboardFocusRing = false;
    this._textareaFocusFromPointer = false;
  }

  private _handleTextareaKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' || event.shiftKey || event.isComposing) {
      return;
    }

    event.preventDefault();
    if (this._isLoading || this._isDisabled) {
      return;
    }
    this._handleSendClick();
  }

  private _handleSendClick(): void {
    if (!this._isPopulated || this._isDisabled) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent<PromptFieldSubmitDetail>('swc-prompt-field-submit', {
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
      new CustomEvent('swc-prompt-field-stop', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleUploadClick(): void {
    if (this._isDisabled) {
      return;
    }
    const uploadClickEvent = new CustomEvent('swc-prompt-field-upload-click', {
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(uploadClickEvent);
    if (uploadClickEvent.defaultPrevented) {
      return;
    }
    this._fileInput?.click();
  }

  private _handleFileInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    if (files.length === 0) {
      return;
    }

    const nextArtifactValues = files.map((file) => ({
      id: uniqueId('swc-prompt-field-artifact'),
      name: file.name,
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
      file,
    }));

    this.artifactValues = [...this.artifactValues, ...nextArtifactValues];

    this.dispatchEvent(
      new CustomEvent<PromptFieldFilesSelectedDetail>(
        'swc-prompt-field-files-selected',
        {
          bubbles: true,
          composed: true,
          detail: {
            files,
            artifactValues: nextArtifactValues,
            allArtifactValues: this.artifactValues,
          },
        }
      )
    );

    // Allow selecting the same file again in subsequent picker interactions.
    input.value = '';
  }

  private _syncArtifactPresenceFromSlot(): void {
    const artifactCount = this._assignedArtifactElements?.length ?? 0;
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

  private _handleArtifactSlotChange(): void {
    this._syncArtifactPresenceFromSlot();
  }

  private get _isPopulated(): boolean {
    return (
      this.value.trim().length > 0 ||
      this._hasArtifacts ||
      this.artifactValues.length > 0
    );
  }

  private get _isLoading(): boolean {
    return this.mode === 'loading';
  }

  private get _isDisabled(): boolean {
    return this.mode === 'disabled';
  }

  protected override firstUpdated(): void {
    this._syncArtifactPresenceFromSlot();
    this._syncLegalSlotPresence();
  }

  private _syncLegalSlotPresence(): void {
    const hasSlottedLegal = (this._assignedLegalElements?.length ?? 0) > 0;
    if (hasSlottedLegal !== this._hasSlottedLegal) {
      this._hasSlottedLegal = hasSlottedLegal;
    }
  }

  private _handleLegalSlotChange(): void {
    this._syncLegalSlotPresence();
  }

  private _renderLegalFooter(): TemplateResult | null {
    if (!this._hasSlottedLegal) {
      return html`
        <slot
          name="legal"
          hidden
          @slotchange=${this._handleLegalSlotChange}
        ></slot>
      `;
    }
    return html`
      <div class="swc-PromptField-footer">
        <slot name="legal" @slotchange=${this._handleLegalSlotChange}></slot>
      </div>
    `;
  }

  private _renderArtifact(): TemplateResult {
    const artifactClass =
      this._artifactCount <= 1
        ? 'swc-PromptField-artifacts swc-PromptField-artifacts--single'
        : 'swc-PromptField-artifacts swc-PromptField-artifacts--multiple';

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
        ?disabled=${!this._isPopulated || this._isDisabled}
        aria-label=${this.sendLabel}
        @click=${this._handleSendClick}
      >
        <swc-icon aria-hidden="true">${ChevronUpIcon()}</swc-icon>
      </button>
    `;
  }

  private _renderStopButton(): TemplateResult {
    return html`
      <button
        class="swc-PromptField-stop"
        aria-label=${this.stopLabel}
        @click=${this._handleStopClick}
      >
        <swc-icon aria-hidden="true">${StopIcon()}</swc-icon>
      </button>
    `;
  }

  protected override render(): TemplateResult {
    const showStop = this._isLoading;

    return html`
      <div class="swc-PromptField">
        <div
          class="swc-PromptField-box${this._promptBoxKeyboardFocusRing
            ? ' swc-PromptField-box--keyboard-focus'
            : ''}"
        >
          <div
            class="swc-PromptField-input-area${this._hasArtifacts
              ? ' has-artifact'
              : ''}"
          >
            ${this._renderArtifact()}
            <div class="swc-PromptField-text-area">
              <span id=${this.labelId} class="swc-PromptField-label">
                ${this.label}
              </span>
              <textarea
                class="swc-PromptField-textarea"
                .value=${this.value}
                placeholder=${this.placeholder}
                aria-labelledby=${this.labelId}
                aria-label=${ifDefined(
                  this.accessibleLabel.trim().length > 0
                    ? this.accessibleLabel.trim()
                    : undefined
                )}
                aria-placeholder=${ifDefined(this.placeholder || undefined)}
                ?disabled=${this._isDisabled}
                rows="1"
                @input=${this._handleInput}
                @keydown=${this._handleTextareaKeydown}
                @pointerdown=${this._handleTextareaPointerDown}
                @focusin=${this._handleTextareaFocusIn}
                @focusout=${this._handleTextareaFocusOut}
              ></textarea>
            </div>
          </div>

          <div class="swc-PromptField-action-bar">
            <div class="swc-PromptField-leading-actions">
              <button
                class="swc-PromptField-upload"
                aria-label=${this.uploadLabel}
                ?disabled=${this._isDisabled}
                @click=${this._handleUploadClick}
              >
                <swc-icon aria-hidden="true">${PlusIcon()}</swc-icon>
              </button>
              <input
                class="swc-PromptField-file-input"
                type="file"
                ?multiple=${this.multiple}
                ?disabled=${this._isDisabled}
                accept=${ifDefined(this.accept || undefined)}
                tabindex="-1"
                @change=${this._handleFileInputChange}
              />
            </div>

            ${showStop ? this._renderStopButton() : this._renderSendButton()}
          </div>
        </div>
        ${this._renderLegalFooter()}
      </div>
    `;
  }
}
