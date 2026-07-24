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

import styles from './user-message-attachment.css';

/**
 * One attachment tile inside `<swc-user-message type="attachments">`.
 *
 * A deliberately minimal, presentation-only tile: no dismiss affordance, no
 * actions slot. `swc-user-message` owns all grouping (media grid vs. stacked
 * files), show-all/less disclosure, and layout; this component only renders
 * its own thumbnail/title/subtitle/badge.
 *
 * @element swc-user-message-attachment
 *
 * @slot thumbnail - Shared visual slot for icon/thumbnail/preview image.
 * @slot badge - Optional file-type badge rendered over `type="media"` previews (for example, "PDF").
 * @slot title - Primary text label. For `type="media"`, omit on grouped grid tiles
 * (matching the compose-time `swc-upload-artifact` strip's caption-less tiles); a
 * single "hero" attachment typically includes one.
 * @slot subtitle - Secondary text label. Same `type="media"` guidance as `title`.
 */
export class UserMessageAttachment extends SpectrumElement {
  /** Visual treatment type for this attachment: `media` renders a grid tile, `card` renders a stacked row. */
  @property({ type: String, reflect: true })
  public type: 'card' | 'media' = 'media';

  @queryAssignedElements({ slot: 'badge', flatten: true })
  private _assignedBadge!: HTMLElement[];

  @queryAssignedElements({ slot: 'title', flatten: true })
  private _assignedTitle!: HTMLElement[];

  @queryAssignedElements({ slot: 'subtitle', flatten: true })
  private _assignedSubtitle!: HTMLElement[];

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _hasBadgeContent(): boolean {
    return (this._assignedBadge?.length ?? 0) > 0;
  }

  private _hasMediaMetaContent(): boolean {
    return (
      (this._assignedTitle?.length ?? 0) > 0 ||
      (this._assignedSubtitle?.length ?? 0) > 0
    );
  }

  private _handleBadgeSlotChange(): void {
    this.requestUpdate();
  }

  private _handleMediaMetaSlotChange(): void {
    this.requestUpdate();
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
      <div class="swc-UserMessageAttachment-badge">
        <slot name="badge" @slotchange=${this._handleBadgeSlotChange}></slot>
      </div>
    `;
  }

  /**
   * Title/subtitle beneath the media square, shown only when slotted:
   * grouped grid tiles are conventionally caption-less (matching the compose-time
   * `swc-upload-artifact` strip), while a single "hero" attachment typically
   * has one, same as `type="card"`.
   */
  private _renderMediaMeta(): TemplateResult {
    if (!this._hasMediaMetaContent()) {
      return html`
        <slot
          name="title"
          hidden
          @slotchange=${this._handleMediaMetaSlotChange}
        ></slot>
        <slot
          name="subtitle"
          hidden
          @slotchange=${this._handleMediaMetaSlotChange}
        ></slot>
      `;
    }

    return html`
      <div class="swc-UserMessageAttachment-meta">
        <div class="swc-UserMessageAttachment-title">
          <slot
            name="title"
            @slotchange=${this._handleMediaMetaSlotChange}
          ></slot>
        </div>
        <div class="swc-UserMessageAttachment-subtitle">
          <slot
            name="subtitle"
            @slotchange=${this._handleMediaMetaSlotChange}
          ></slot>
        </div>
      </div>
    `;
  }

  private _renderMediaSurface(): TemplateResult {
    return html`
      <div class="swc-UserMessageAttachment-surface">
        <div class="swc-UserMessageAttachment-thumbnail">
          <slot name="thumbnail"></slot>
        </div>
        ${this._renderBadge()}
      </div>
      ${this._renderMediaMeta()}
    `;
  }

  private _renderCardSurface(): TemplateResult {
    return html`
      <div class="swc-UserMessageAttachment-surface">
        <div class="swc-UserMessageAttachment-thumbnail">
          <slot name="thumbnail"></slot>
        </div>
        <div class="swc-UserMessageAttachment-meta">
          <div class="swc-UserMessageAttachment-title">
            <slot name="title"></slot>
          </div>
          <div class="swc-UserMessageAttachment-subtitle">
            <slot name="subtitle"></slot>
          </div>
        </div>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-UserMessageAttachment">
        ${this.getAttribute('type') === 'card'
          ? this._renderCardSurface()
          : this._renderMediaSurface()}
      </div>
    `;
  }
}
