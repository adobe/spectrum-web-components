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
import { property, queryAssignedNodes } from 'lit/decorators.js';

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
 * @fires swc-upload-artifact-dismiss - Dispatched when the dismiss button is pressed.
 * Detail: `{ artifact: this }`
 */
export class UploadArtifact extends SpectrumElement {
  /** Visual treatment type for this artifact. */
  @property({ type: String, reflect: true })
  public type: 'card' | 'media' = 'card';

  /** When `true`, show a dismiss affordance and emit `swc-upload-artifact-dismiss` on click. */
  @property({ type: Boolean, reflect: true })
  public dismissible = false;

  /** Accessible label for the dismiss/remove attachment button. */
  @property({ type: String, attribute: 'dismiss-label' })
  public dismissLabel = 'Remove attachment';

  /** Internal flag reflected for preview-only host styling hooks. */
  @property({ type: Boolean, attribute: 'data-preview-only', reflect: true })
  private _previewOnly = false;

  @queryAssignedNodes({ slot: 'title', flatten: true })
  private _assignedTitleNodes!: Node[];

  @queryAssignedNodes({ slot: 'subtitle', flatten: true })
  private _assignedSubtitleNodes!: Node[];

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _nodesHaveAssignedContent(nodes: Node[]): boolean {
    for (const node of nodes) {
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
    if (this.type !== 'media') {
      this._previewOnly = false;
      return;
    }

    const has =
      this._nodesHaveAssignedContent(this._assignedTitleNodes ?? []) ||
      this._nodesHaveAssignedContent(this._assignedSubtitleNodes ?? []);
    const hide = !has;

    this._previewOnly = hide;
  }

  protected override updated(changed: Map<string, unknown>): void {
    if (changed.has('type')) {
      this._syncTextMetaSlots();
    }
  }

  private _handleTextMetaSlotChange(): void {
    this._syncTextMetaSlots();
  }

  protected override firstUpdated(): void {
    this._syncTextMetaSlots();
  }

  private _handleDismissClick(): void {
    this.dispatchEvent(
      new CustomEvent('swc-upload-artifact-dismiss', {
        bubbles: true,
        composed: true,
        detail: { artifact: this },
      })
    );
  }

  protected override render(): TemplateResult {
    const isMedia = this.type === 'media';
    const hideMediaMeta = isMedia && this._previewOnly;

    return html`
      <div class="swc-UploadArtifact">
        <button
          class="swc-UploadArtifact-dismiss"
          aria-label=${this.dismissLabel}
          ?hidden=${!this.dismissible}
          @click=${this._handleDismissClick}
        >
          <swc-icon aria-hidden="true">${CrossIcon()}</swc-icon>
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
                      <slot
                        name="title"
                        @slotchange=${this._handleTextMetaSlotChange}
                      ></slot>
                    </div>
                    <div class="swc-UploadArtifact-actions">
                      <slot name="actions"></slot>
                    </div>
                  </div>
                  <div class="swc-UploadArtifact-subtitle">
                    <slot
                      name="subtitle"
                      @slotchange=${this._handleTextMetaSlotChange}
                    ></slot>
                  </div>
                </div>
              `
            : html`
                <div class="swc-UploadArtifact-meta">
                  <div class="swc-UploadArtifact-title">
                    <slot
                      name="title"
                      @slotchange=${this._handleTextMetaSlotChange}
                    ></slot>
                  </div>
                  <div class="swc-UploadArtifact-subtitle">
                    <slot
                      name="subtitle"
                      @slotchange=${this._handleTextMetaSlotChange}
                    ></slot>
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
