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

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import '@adobe/spectrum-wc/icon';

import { CrossIcon } from '../utils/icons/index.js';

import styles from './upload-artifact.css';

/**
 * Shared upload artifact primitive with card and media types.
 *
 * @element swc-upload-artifact
 *
 * @slot thumbnail - Shared visual slot for icon/thumbnail/preview image.
 * @slot title - Primary text label.
 * @slot subtitle - Secondary text label.
 * @slot actions - Optional trailing actions.
 */
export class UploadArtifact extends SpectrumElement {
  /** Visual treatment type for this artifact. */
  @property({ type: String, reflect: true })
  public type: 'card' | 'media' = 'card';

  /** When `true`, show a dismiss affordance and emit `swc-dismiss` on click. */
  @property({ type: Boolean, reflect: true })
  public dismissible = false;

  /** `null` until first slot sync to avoid early false-negative hiding. */
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
    if (!root || this.type !== 'media') {
      this._hideTextMeta = false;
      this.removeAttribute('data-preview-only');
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

  protected override updated(changed: Map<string, unknown>): void {
    if (changed.has('type')) {
      this._syncTextMetaSlots();
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

  private _handleDismissClick(): void {
    this.dispatchEvent(
      new CustomEvent('swc-dismiss', {
        bubbles: true,
        composed: true,
        detail: { artifact: this },
      })
    );
  }

  protected override render(): TemplateResult {
    const isMedia = this.type === 'media';
    const hideMediaMeta = isMedia && this._hideTextMeta === true;

    return html`
      <div class="swc-UploadArtifact">
        <button
          class="swc-UploadArtifact-dismiss"
          aria-label="Remove attachment"
          ?hidden=${!this.dismissible}
          @click=${this._handleDismissClick}
        >
          <swc-icon label="Remove">${CrossIcon()}</swc-icon>
        </button>

        <div class="swc-UploadArtifact-surface">
          <div class="swc-UploadArtifact-thumbnail">
            <slot name="thumbnail"></slot>
          </div>

          ${isMedia
            ? html`
                <div class="swc-UploadArtifact-meta" ?hidden=${hideMediaMeta}>
                  <div class="swc-UploadArtifact-header">
                    <div class="swc-UploadArtifact-title">
                      <slot name="title"></slot>
                    </div>
                    <div class="swc-UploadArtifact-actions">
                      <slot name="actions"></slot>
                    </div>
                  </div>
                  <div class="swc-UploadArtifact-subtitle">
                    <slot name="subtitle"></slot>
                  </div>
                </div>
              `
            : html`
                <div class="swc-UploadArtifact-meta">
                  <div class="swc-UploadArtifact-title">
                    <slot name="title"></slot>
                  </div>
                  <div class="swc-UploadArtifact-subtitle">
                    <slot name="subtitle"></slot>
                  </div>
                </div>

                <div class="swc-UploadArtifact-actions">
                  <slot name="actions"></slot>
                </div>
              `}
        </div>
      </div>
    `;
  }
}
