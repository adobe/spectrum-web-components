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
import { state } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import styles from './conversation-artifact-media.css';

/**
 * Media-first attachment layout (image, GIF, video poster, and similar).
 * Does not render a dismiss control; hosts such as `swc-prompt-field` own removal chrome.
 *
 * When **`title`** and **`subtitle`** are omitted (empty slots), only the preview is shown and it
 * stretches to fill the host — for example the square tile with `uploaded-artifact="media"`.
 *
 * @element swc-conversation-artifact-media
 *
 * @slot preview - Primary visual (for example `<img>` or styled preview region).
 * @slot title - Primary label below the preview.
 * @slot subtitle - Secondary line below the title.
 */
export class ConversationArtifactMedia extends SpectrumElement {
  /** `null` until first slot sync — avoids hiding the meta row before slotted title/subtitle are measured. */
  @state()
  private _hideTextMeta: boolean | null = null;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _slotHasAssignedContent(slot: HTMLSlotElement | null): boolean {
    if (!slot) {
      return false;
    }
    for (const node of slot.assignedNodes({ flatten: true })) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        return true;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (el.tagName === 'SLOT') {
          continue;
        }
        if (el.textContent?.trim() || el.children.length > 0) {
          return true;
        }
      }
    }
    return false;
  }

  private _syncTextMetaSlots(): void {
    const root = this.shadowRoot;
    if (!root) {
      return;
    }
    const titleSlot = root.querySelector<HTMLSlotElement>('slot[name="title"]');
    const subtitleSlot = root.querySelector<HTMLSlotElement>(
      'slot[name="subtitle"]'
    );
    const has =
      this._slotHasAssignedContent(titleSlot) ||
      this._slotHasAssignedContent(subtitleSlot);
    const hide = !has;
    const prev = this._hideTextMeta;
    this._hideTextMeta = hide;
    this.toggleAttribute('data-preview-only', hide);
    if (prev !== hide) {
      this.requestUpdate();
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    queueMicrotask(() => this._syncTextMetaSlots());
  }

  protected override firstUpdated(): void {
    const root = this.shadowRoot;
    if (!root) {
      return;
    }
    const titleSlot = root.querySelector<HTMLSlotElement>('slot[name="title"]');
    const subtitleSlot = root.querySelector<HTMLSlotElement>(
      'slot[name="subtitle"]'
    );
    titleSlot?.addEventListener('slotchange', () => this._syncTextMetaSlots());
    subtitleSlot?.addEventListener('slotchange', () =>
      this._syncTextMetaSlots()
    );
    this._syncTextMetaSlots();
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-ConversationArtifactMedia">
        <div class="swc-ConversationArtifactMedia-preview">
          <slot name="preview"></slot>
        </div>
        <div
          class="swc-ConversationArtifactMedia-meta"
          ?hidden=${this._hideTextMeta === true}
        >
          <div class="swc-ConversationArtifactMedia-title">
            <slot name="title"></slot>
          </div>
          <div class="swc-ConversationArtifactMedia-subtitle">
            <slot name="subtitle"></slot>
          </div>
        </div>
      </div>
    `;
  }
}
