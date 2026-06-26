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
import { property, queryAssignedElements } from 'lit/decorators.js';

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';

import { CrossIcon } from '../utils/icons/index.js';

import styles from './upload-artifact.css';

/**
 * Shared upload artifact primitive with card and media types.
 * Do not mix `type="card"` and `type="media"` in the same attachment strip.
 * When uploads mix images and documents, normalize to one layout (typically all `type="media"` with thumbnails and optional badges).
 *
 * @element swc-upload-artifact
 *
 * @slot thumbnail - Shared visual slot for icon/thumbnail/preview image.
 * @slot badge - Optional file-type badge rendered over `type="media"` previews (for example, "PDF").
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

  @queryAssignedElements({ slot: 'badge', flatten: true })
  private _assignedBadge!: HTMLElement[];

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _handleBadgeSlotChange(): void {
    this.requestUpdate();
  }

  private _hasBadgeContent(): boolean {
    return (this._assignedBadge?.length ?? 0) > 0;
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

  private _renderDismissButton(): TemplateResult {
    return html`
      <button
        class="swc-UploadArtifact-dismiss"
        aria-label=${this.dismissLabel}
        ?hidden=${!this.dismissible}
        @click=${this._handleDismissClick}
      >
        <span
          class="swc-UploadArtifact-dismiss-visual"
          aria-hidden="true"
        ></span>
        <span class="swc-UploadArtifact-dismiss-icon" aria-hidden="true">
          ${CrossIcon()}
        </span>
      </button>
    `;
  }

  private _renderBadge(): TemplateResult {
    if (!this._hasBadgeContent()) {
      return html`
        <slot
          name="badge"
          hidden
          @slotchange=${this._handleBadgeSlotChange}
        ></slot>
      `;
    }

    return html`
      <div class="swc-UploadArtifact-badge">
        <slot name="badge" @slotchange=${this._handleBadgeSlotChange}></slot>
      </div>
    `;
  }

  private _renderMediaSurface(): TemplateResult {
    return html`
      <div class="swc-UploadArtifact-surface">
        <div class="swc-UploadArtifact-thumbnail">
          <slot name="thumbnail"></slot>
        </div>
        ${this._renderBadge()}
        <div class="swc-UploadArtifact-actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }

  private _renderCardSurface(): TemplateResult {
    return html`
      <div class="swc-UploadArtifact-surface">
        <div class="swc-UploadArtifact-thumbnail">
          <slot name="thumbnail"></slot>
        </div>
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
      </div>
    `;
  }

  protected override render(): TemplateResult {
    return html`
      ${this._renderDismissButton()}
      <div class="swc-UploadArtifact">
        ${this.type === 'media'
          ? this._renderMediaSurface()
          : this._renderCardSurface()}
      </div>
    `;
  }
}
