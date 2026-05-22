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
import { queryAssignedElements, queryAssignedNodes } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import styles from './user-message.css';

/**
 * User-authored message container for conversational AI pattern exploration.
 *
 * @element swc-user-message
 * @slot artifacts-media - Optional media artifacts rendered above file artifacts and message text.
 * @slot artifacts-file - Optional file/card artifacts rendered above message text.
 * @slot - Optional message copy rendered as the text bubble.
 */
export class UserMessage extends SpectrumElement {
  @queryAssignedElements({ slot: 'artifacts-media', flatten: true })
  private _assignedMediaArtifacts!: HTMLElement[];

  @queryAssignedElements({ slot: 'artifacts-file', flatten: true })
  private _assignedFileArtifacts!: HTMLElement[];

  @queryAssignedNodes({ flatten: true })
  private _assignedDefaultNodes!: Node[];

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _handleSlotChange(): void {
    this.requestUpdate();
  }

  private _handleHostClick(event: MouseEvent): void {
    const target = event.composedPath()[0];
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (!target.classList.contains('swc-UserMessage-overflow-indicator')) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent('swc-user-message-view-all-click', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _hasTextContent(): boolean {
    return (this._assignedDefaultNodes ?? []).some((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return Boolean(node.textContent?.trim());
      }

      return node.nodeType === Node.ELEMENT_NODE;
    });
  }

  private _renderMediaArtifacts(): TemplateResult | null {
    const count = this._assignedMediaArtifacts?.length ?? 0;
    if (count === 0) {
      return html`
        <slot
          name="artifacts-media"
          hidden
          @slotchange=${this._handleSlotChange}
        ></slot>
      `;
    }

    return html`
      <div class="swc-UserMessage-media-row">
        <slot
          name="artifacts-media"
          @slotchange=${this._handleSlotChange}
        ></slot>
      </div>
    `;
  }

  private _renderFileArtifacts(): TemplateResult | null {
    const count = this._assignedFileArtifacts?.length ?? 0;
    if (count === 0) {
      return html`
        <slot
          name="artifacts-file"
          hidden
          @slotchange=${this._handleSlotChange}
        ></slot>
      `;
    }

    return html`
      <div class="swc-UserMessage-file-row">
        <slot
          name="artifacts-file"
          @slotchange=${this._handleSlotChange}
        ></slot>
      </div>
    `;
  }

  private _renderTextBubble(): TemplateResult | null {
    if (!this._hasTextContent()) {
      return html`
        <slot hidden @slotchange=${this._handleSlotChange}></slot>
      `;
    }

    return html`
      <div class="swc-UserMessage-text-row">
        <div class="swc-UserMessage-text-bubble">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-UserMessage">
        ${this._renderMediaArtifacts()} ${this._renderFileArtifacts()}
        ${this._renderTextBubble()}
      </div>
    `;
  }

  protected override firstUpdated(): void {
    this.addEventListener('click', this._handleHostClick);
  }
}
