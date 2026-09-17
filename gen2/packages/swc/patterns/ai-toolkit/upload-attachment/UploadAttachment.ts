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

import { CSSResultArray, html, PropertyValues, TemplateResult } from 'lit';
import { property, query, queryAssignedElements } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { getLabelFromSlot } from '@adobe/spectrum-wc-core/utils/index.js';
import { Icon_AudioWave } from '@adobe/spectrum-wc-icons/AudioWave.js';
import { Icon_File } from '@adobe/spectrum-wc-icons/File.js';
import { Icon_FileText } from '@adobe/spectrum-wc-icons/FileText.js';
import { Icon_Image } from '@adobe/spectrum-wc-icons/Image.js';
import { Icon_Play } from '@adobe/spectrum-wc-icons/Play.js';

import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';
import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import { CrossIcon } from '../utils/icons/index.js';

import visuallyHiddenStyles from '../../../stylesheets/_lit-styles/visually-hidden.css';
import styles from './upload-attachment.css';

/**
 * Shared upload attachment primitive with card and media types.
 * Do not mix `type="card"` and `type="media"` in the same attachment strip.
 * When uploads mix images and documents, normalize to one layout (typically all `type="media"` with thumbnails and optional badges).
 *
 * This tile has no default `tabindex` of its own. Its dismiss button is natively
 * tabbable when used standalone; `swc-prompt-field` manages its Tab-key sequence
 * for tiles slotted into its `attachment` slot.
 *
 * @element swc-upload-attachment
 *
 * @example
 * <swc-upload-attachment type="card" dismissible>
 *   <span slot="title">Brief.pdf</span>
 * </swc-upload-attachment>
 *
 * @slot thumbnail - Shared visual slot for icon/thumbnail/preview image. When
 * empty and `mime-type` is set, a fallback icon is rendered based on the MIME type.
 * On `type="card"`, a slotted `swc-icon` is automatically sized to match the
 * fallback icon instead of stretching to fill the tile.
 * @slot badge - Optional file-type badge rendered over `type="media"` previews (for example, "PDF").
 * @slot title - Primary text label.
 * @slot subtitle - Secondary text label.
 * @slot actions - Optional trailing actions.
 * @fires swc-upload-attachment-dismiss - Dispatched when the dismiss button is pressed.
 * Detail: `{ attachment: this }`
 *
 * @cssprop --swc-upload-attachment-focus-indicator-color - Focus ring color for the tile and its dismiss button. Defaults to a dedicated ring color pending a matching design token.
 * @cssprop --swc-upload-attachment-card-min-block-size - Minimum block size of the surface for `type="card"`. Defaults to 72px.
 * @cssprop --swc-upload-attachment-card-thumbnail-inline-size - Thumbnail inline size for `type="card"`. Defaults to 48px.
 * @cssprop --swc-upload-attachment-card-thumbnail-block-size - Thumbnail block size for `type="card"`. Defaults to 48px.
 * @cssprop --swc-upload-attachment-preview-size - Inline and block size of the tile for `type="media"`. Defaults to 72px.
 * @cssprop --swc-upload-attachment-dismiss-visual-size - Rendered size of the dismiss button's circular hit area. Defaults to 20px.
 * @cssprop --swc-upload-attachment-dismiss-icon-inline-size - Inline size of the dismiss icon. Defaults to 8px.
 * @cssprop --swc-upload-attachment-dismiss-icon-block-size - Block size of the dismiss icon. Defaults to 8px.
 * @cssprop --swc-upload-attachment-thumbnail-fallback-icon-color - Color of the mime-type fallback icon.
 * @cssprop --swc-upload-attachment-thumbnail-fallback-icon-inline-size - Inline size of the mime-type fallback icon.
 * @cssprop --swc-upload-attachment-thumbnail-fallback-icon-block-size - Block size of the mime-type fallback icon.
 * @since 2.0.0-beta.3
 */
export class UploadAttachment extends SpectrumElement {
  /** Visual treatment type for this attachment. */
  @property({ type: String, reflect: true })
  public type: 'card' | 'media' = 'card';

  /** When `true`, show a dismiss affordance and emit `swc-upload-attachment-dismiss` on click. */
  @property({ type: Boolean, reflect: true })
  public dismissible = false;

  /**
   * Accessible label for the dismiss/remove attachment button. When unset, derives
   * "Remove [file name].[file type]" from the `title` slot's text content, falling
   * back to "Remove attachment" when no title text is available.
   */
  @property({ type: String, attribute: 'dismiss-label' })
  public dismissLabel = '';

  /**
   * Accessible name for the tile itself. When unset, derives from the `title`
   * slot's text content (typically the file name and type).
   */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel = '';

  /**
   * MIME type of the attached file (for example `image/png`). When set and no
   * content is slotted into `thumbnail`, renders a matching fallback icon:
   * `audio/*` → audio wave, `video/*` → play, `image/*` → image,
   * `text/*` → file text, anything else → generic file.
   */
  @property({ type: String, attribute: 'mime-type' })
  public mimeType = '';

  @queryAssignedElements({ slot: 'badge', flatten: true })
  private _assignedBadge!: HTMLElement[];

  @queryAssignedElements({ slot: 'thumbnail', flatten: true })
  private _assignedThumbnail!: HTMLElement[];

  @query('slot[name="title"]')
  private _titleSlot?: HTMLSlotElement;

  private _titleObserver = new MutationObserver(() => this.requestUpdate());

  public static override get styles(): CSSResultArray {
    return [styles, visuallyHiddenStyles];
  }

  protected override firstUpdated(_changed: PropertyValues<this>): void {
    super.firstUpdated(_changed);
    this.setAttribute('role', 'group');
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    if (this._titleSlot) {
      this._observeTitleSlot(this._titleSlot);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._titleObserver.disconnect();
  }

  protected override willUpdate(_changed: PropertyValues<this>): void {
    this._syncHostAccessibleLabel();
  }

  private _titleText(): string {
    return this._titleSlot ? (getLabelFromSlot('', this._titleSlot) ?? '') : '';
  }

  /**
   * Splits a filename for middle truncation: the end keeps the extension plus
   * a few leading characters (so the file type stays visible even when the
   * name is clipped), everything before that is left for the start span to
   * ellipsize.
   */
  private _splitTitleForMiddleTruncation(name: string): {
    start: string;
    end: string;
  } {
    const dot = name.lastIndexOf('.');
    // Keep the extension and three preceding characters visible; extensionless names use the same six-character tail budget.
    const tailLength = dot > -1 ? name.length - dot + 3 : 6;
    const keep = Math.min(tailLength, Math.max(0, name.length - 1));
    return {
      start: name.slice(0, name.length - keep),
      end: name.slice(name.length - keep),
    };
  }

  private _syncHostAccessibleLabel(): void {
    const label = this.accessibleLabel.trim() || this._titleText();
    if (label) {
      this.setAttribute('aria-label', label);
    } else {
      this.removeAttribute('aria-label');
    }
  }

  private _resolvedDismissLabel(): string {
    const explicit = this.dismissLabel.trim();
    if (explicit) {
      return explicit;
    }
    const title = this._titleText();
    return title ? `Remove ${title}` : 'Remove attachment';
  }

  private _observeTitleSlot(slot: HTMLSlotElement): void {
    this._titleObserver.disconnect();
    for (const node of slot.assignedNodes({ flatten: true })) {
      this._titleObserver.observe(node, {
        characterData: true,
        childList: true,
        subtree: true,
      });
    }
  }

  private _handleTitleSlotChange(event: Event): void {
    this._observeTitleSlot(event.target as HTMLSlotElement);
    this._syncHostAccessibleLabel();
    this.requestUpdate();
  }

  private _handleBadgeSlotChange(): void {
    this.requestUpdate();
  }

  private _hasBadgeContent(): boolean {
    return (this._assignedBadge?.length ?? 0) > 0;
  }

  private _handleThumbnailSlotChange(): void {
    this.requestUpdate();
  }

  private _hasThumbnailContent(): boolean {
    return (this._assignedThumbnail?.length ?? 0) > 0;
  }

  /** Mirrors React Spectrum's AttachmentPreview mime-type fallback order. */
  private _fallbackIcon(): string {
    if (this.mimeType.startsWith('audio/')) {
      return Icon_AudioWave();
    }
    if (this.mimeType.startsWith('video/')) {
      return Icon_Play();
    }
    if (this.mimeType.startsWith('image/')) {
      return Icon_Image();
    }
    if (this.mimeType.startsWith('text/')) {
      return Icon_FileText();
    }
    return Icon_File();
  }

  private _renderThumbnail(): TemplateResult {
    const showFallback = !!this.mimeType && !this._hasThumbnailContent();
    return html`
      <slot
        name="thumbnail"
        ?hidden=${showFallback}
        @slotchange=${this._handleThumbnailSlotChange}
      ></slot>
      ${showFallback
        ? html`
            <div class="swc-UploadAttachment-thumbnail-fallback">
              <swc-icon aria-hidden="true">
                ${unsafeSVG(this._fallbackIcon())}
              </swc-icon>
            </div>
          `
        : ''}
    `;
  }

  private _handleDismissClick(): void {
    this.dispatchEvent(
      new CustomEvent('swc-upload-attachment-dismiss', {
        bubbles: true,
        composed: true,
        detail: { attachment: this },
      })
    );
  }

  private _renderDismissButton(): TemplateResult {
    return html`
      <swc-action-button
        class="swc-UploadAttachment-dismiss"
        tabindex=${ifDefined(this.closest('swc-prompt-field') ? -1 : undefined)}
        accessible-label=${this._resolvedDismissLabel()}
        ?hidden=${!this.dismissible}
        @click=${this._handleDismissClick}
      >
        <span
          slot="icon"
          class="swc-UploadAttachment-dismiss-icon"
          aria-hidden="true"
        >
          ${CrossIcon()}
        </span>
      </swc-action-button>
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
      <div class="swc-UploadAttachment-badge">
        <slot name="badge" @slotchange=${this._handleBadgeSlotChange}></slot>
      </div>
    `;
  }

  private _renderMediaSurface(): TemplateResult {
    return html`
      <div class="swc-UploadAttachment-surface">
        <div class="swc-UploadAttachment-thumbnail">
          ${this._renderThumbnail()}
        </div>
        ${this._renderBadge()}
        <div class="swc-UploadAttachment-actions">
          <slot name="actions"></slot>
        </div>
        <slot
          name="title"
          hidden
          @slotchange=${this._handleTitleSlotChange}
        ></slot>
      </div>
    `;
  }

  private _renderCardSurface(): TemplateResult {
    const { start, end } = this._splitTitleForMiddleTruncation(
      this._titleText()
    );
    return html`
      <div class="swc-UploadAttachment-surface">
        <div class="swc-UploadAttachment-thumbnail">
          ${this._renderThumbnail()}
        </div>
        <div class="swc-UploadAttachment-meta">
          <div class="swc-UploadAttachment-title">
            <span class="swc-UploadAttachment-title-start" aria-hidden="true">
              ${start}
            </span>
            <span class="swc-UploadAttachment-title-end" aria-hidden="true">
              ${end}
            </span>
            <slot
              name="title"
              class="swc-VisuallyHidden"
              hidden
              @slotchange=${this._handleTitleSlotChange}
            ></slot>
          </div>
          <div class="swc-UploadAttachment-subtitle">
            <slot name="subtitle"></slot>
          </div>
        </div>
        <div class="swc-UploadAttachment-actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    return html`
      ${this._renderDismissButton()}
      <div class="swc-UploadAttachment">
        ${this.type === 'media'
          ? this._renderMediaSurface()
          : this._renderCardSurface()}
      </div>
    `;
  }
}
