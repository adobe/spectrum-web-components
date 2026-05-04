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
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import '@adobe/spectrum-wc/icon';

import { uniqueId } from '../../../utils/id.js';
import { ChevronUpIcon, PlusIcon, StopIcon } from '../utils/icons/index.js';

import styles from './prompt-field.css';

export interface PromptFieldSubmitDetail {
  value: string;
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
 * @fires swc-prompt-field-submit - Dispatched when send is triggered.
 * Detail: `{ value: string }`
 * @fires swc-prompt-field-stop - Dispatched when stop generation is requested in loading mode.
 * @fires swc-prompt-field-upload-click - Dispatched when upload affordance is activated.
 * Consumers should handle file picker flow externally.
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

  /** Minimum visible textarea rows before growth. */
  @property({ type: Number, attribute: 'min-rows' })
  public minRows = 1;

  /** Maximum visible textarea rows before internal scrolling. */
  @property({ type: Number, attribute: 'max-rows' })
  public maxRows = 4;

  @queryAssignedElements({ slot: 'artifact', flatten: true })
  private _assignedArtifactElements!: HTMLElement[];

  @queryAssignedElements({ slot: 'legal', flatten: true })
  private _assignedLegalElements!: HTMLElement[];

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
    this.dispatchEvent(
      new CustomEvent('swc-prompt-field-upload-click', {
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );
  }

  private _handleArtifactSlotChange(): void {
    this.requestUpdate();
  }

  private get _isPopulated(): boolean {
    return (
      this.value.trim().length > 0 ||
      (this._assignedArtifactElements?.length ?? 0) > 0
    );
  }

  private get _normalizedMinRows(): number {
    return Math.max(1, Math.floor(this.minRows || 1));
  }

  private get _normalizedMaxRows(): number {
    return Math.max(
      this._normalizedMinRows,
      Math.floor(this.maxRows || this._normalizedMinRows)
    );
  }

  private get _isLoading(): boolean {
    return this.mode === 'loading';
  }

  private get _isDisabled(): boolean {
    return this.mode === 'disabled';
  }

  private _handleLegalSlotChange(): void {
    this.requestUpdate();
  }

  private _renderLegalFooter(): TemplateResult | null {
    if ((this._assignedLegalElements?.length ?? 0) === 0) {
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
    const artifactCount = this._assignedArtifactElements?.length ?? 0;
    const artifactClass =
      artifactCount <= 1
        ? 'swc-PromptField-artifacts swc-PromptField-artifacts--single'
        : 'swc-PromptField-artifacts swc-PromptField-artifacts--multiple';

    return html`
      <div class=${artifactClass} ?hidden=${artifactCount === 0}>
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
    const hasArtifacts = (this._assignedArtifactElements?.length ?? 0) > 0;

    return html`
      <div class="swc-PromptField">
        <div
          class="swc-PromptField-box${this._promptBoxKeyboardFocusRing
            ? ' swc-PromptField-box--keyboard-focus'
            : ''}"
        >
          <div
            class="swc-PromptField-input-area${hasArtifacts
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
                rows=${this._normalizedMinRows}
                style=${styleMap({
                  '--swc-prompt-field-textarea-min-rows': String(
                    this._normalizedMinRows
                  ),
                  '--swc-prompt-field-textarea-max-rows': String(
                    this._normalizedMaxRows
                  ),
                })}
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
            </div>

            ${showStop ? this._renderStopButton() : this._renderSendButton()}
          </div>
        </div>
        ${this._renderLegalFooter()}
      </div>
    `;
  }
}
