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
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { MutationController } from '@lit-labs/observers/mutation-controller.js';

import { Chevron75Icon } from '@adobe/spectrum-wc/icon/elements/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import { uniqueId } from '../../../utils/id.js';
import { UserMessageAttachment } from './user-message-attachment/UserMessageAttachment.js';

import styles from './user-message.css';

export type UserMessageType = 'copy' | 'attachments';

/** Grid tiles beyond this count collapse behind "Show all" by default. */
const VISIBLE_MEDIA_COUNT = 4;

/**
 * User-authored conversation bubble for conversational AI pattern exploration.
 * Default slot content is rendered only when `type="copy"` and ignored otherwise.
 *
 * `type="attachments"` accepts one or more `<swc-user-message-attachment>`
 * children — a single attachment (media or card) is a common case, not a
 * special one, and gets a larger "hero" tile size than a grouped attachment:
 * `type="media"` attachments lay out in a 4-column grid — beyond
 * {@link VISIBLE_MEDIA_COUNT}, the last visible tile gets a "View all (N)"
 * scrim overlay instead of being grouped with a separate control — and
 * `type="card"` attachments stack full-width, each in its own row, never
 * merged into the grid's box. `swc-user-message` owns this grouping,
 * disclosure, and hero-vs-grouped sizing; the attachment tiles are
 * presentation-only.
 *
 * @element swc-user-message
 * @slot - Message copy content when `type="copy"`.
 * @slot - `<swc-user-message-attachment>` elements when `type="attachments"`.
 * @fires swc-user-message-toggle - Dispatched when the "Show all/less" disclosure is toggled (`type="attachments"` only).
 * Detail: `{ open: boolean }`
 */
export class UserMessage extends SpectrumElement {
  private readonly attachmentsPanelId = uniqueId('swc-user-message-panel');

  /**
   * Visual content type for the user message bubble.
   */
  @property({ type: String, reflect: true })
  public type: UserMessageType = 'copy';

  /** Whether the attachments grid's "Show all" disclosure is open (`type="attachments"` only). */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /** Label for the overflow overlay on the last visible media tile (collapsed). */
  @property({ type: String, attribute: 'show-all-label' })
  public showAllLabel = 'View all';

  /** Label for the disclosure button when expanded. */
  @property({ type: String, attribute: 'show-less-label' })
  public showLessLabel = 'Show less';

  @state()
  private _mediaCount = 0;

  @state()
  private _cardCount = 0;

  @state()
  private _hasMediaOverflow = false;

  /**
   * Number of grid columns actually needed (1-{@link VISIBLE_MEDIA_COUNT}).
   * Keeps the grid's `fit-content` box shrink-wrapped to a partial single
   * row (e.g. 3 tiles) instead of always reserving 4 columns' width.
   */
  @state()
  private _mediaColumnCount = VISIBLE_MEDIA_COUNT;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  public constructor() {
    super();

    new MutationController(this, {
      config: {
        attributes: true,
        attributeFilter: ['type'],
        childList: true,
      },
      callback: () => {
        this._routeAttachments();
      },
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._routeAttachments();
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('open')) {
      this._routeAttachments();
    }
  }

  private _isAttachmentElement(
    element: Element
  ): element is UserMessageAttachment {
    return (
      element instanceof UserMessageAttachment ||
      element.localName === 'swc-user-message-attachment'
    );
  }

  private _routeAttachments(): void {
    if (this.type !== 'attachments') {
      return;
    }

    const attachments = Array.from(this.children).filter(
      (element): element is UserMessageAttachment =>
        this._isAttachmentElement(element)
    );
    const mediaAttachments = attachments.filter((el) => el.type !== 'card');
    const cardAttachments = attachments.filter((el) => el.type === 'card');
    const hasOverflow = mediaAttachments.length > VISIBLE_MEDIA_COUNT;

    for (const el of attachments) {
      const targetSlot =
        el.type === 'card' ? 'attachment-card' : 'attachment-media';
      if (el.getAttribute('slot') !== targetSlot) {
        el.setAttribute('slot', targetSlot);
      }
    }

    mediaAttachments.forEach((el, index) => {
      el.hidden = hasOverflow && !this.open && index >= VISIBLE_MEDIA_COUNT;
    });
    this._alignMediaGrid(mediaAttachments, hasOverflow);

    this._mediaCount = mediaAttachments.length;
    this._cardCount = cardAttachments.length;
    this._hasMediaOverflow = hasOverflow;
  }

  /**
   * Explicitly places every visible tile in the grid (row/column) instead of
   * leaving it to implicit auto-placement, for two reasons:
   *
   * 1. A trailing row shorter than {@link VISIBLE_MEDIA_COUNT} columns should
   *    hug the end of the grid (empty cells on the start side), not the
   *    start (default auto-placement fills from the start).
   * 2. The "View all" overlay (`.swc-UserMessage-attachments-overflow`) is
   *    explicitly positioned at row 1 / column {@link VISIBLE_MEDIA_COUNT}
   *    so it can stack on top of the last visible tile. Per the CSS Grid
   *    placement algorithm, explicitly-positioned items reserve their cell
   *    *before* auto-placed items are laid out, so leaving the 4th tile to
   *    auto-placement pushes it into row 2 instead of under the overlay.
   *    Explicit placement here avoids that fight entirely.
   */
  private _alignMediaGrid(
    mediaAttachments: UserMessageAttachment[],
    hasOverflow: boolean
  ): void {
    const visible = mediaAttachments.filter(
      (_el, index) => !(hasOverflow && !this.open && index >= VISIBLE_MEDIA_COUNT)
    );
    const total = visible.length;
    const columnCount = Math.max(1, Math.min(total, VISIBLE_MEDIA_COUNT));
    this._mediaColumnCount = columnCount;

    mediaAttachments.forEach((el) => {
      el.style.removeProperty('grid-row-start');
      el.style.removeProperty('grid-column-start');
    });

    visible.forEach((el, index) => {
      const row = Math.floor(index / VISIBLE_MEDIA_COUNT);
      const isLastRow = row === Math.floor((total - 1) / VISIBLE_MEDIA_COUNT);
      const itemsInThisRow = isLastRow
        ? total - row * VISIBLE_MEDIA_COUNT
        : VISIBLE_MEDIA_COUNT;
      // Offset against the grid's actual column count (`columnCount`), not
      // the constant VISIBLE_MEDIA_COUNT: when there's only a single row
      // (total <= VISIBLE_MEDIA_COUNT) the container itself shrinks to fit
      // that row exactly, so there's no leftover space to offset into —
      // using the constant here would place items past the declared column
      // count and force CSS Grid to fabricate an extra implicit column.
      const columnOffset = isLastRow ? columnCount - itemsInThisRow : 0;
      const posInRow = index - row * VISIBLE_MEDIA_COUNT;

      el.style.gridRowStart = String(row + 1);
      el.style.gridColumnStart = String(columnOffset + posInRow + 1);
    });
  }

  private _handleAttachmentsToggle(): void {
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('swc-user-message-toggle', {
        bubbles: true,
        composed: true,
        detail: { open: this.open },
      })
    );
  }

  /**
   * Scrim + pill overlay on the last visible media tile, shown only while
   * collapsed. Uses `?hidden` (not a conditional template) so it stays in
   * the DOM and fades out via CSS in step with the newly-revealed tiles
   * fading in, instead of vanishing instantly while they fade in gradually.
   */
  private _renderMediaOverflow(): TemplateResult | '' {
    if (!this._hasMediaOverflow) {
      return '';
    }

    return html`
      <button
        type="button"
        class="swc-UserMessage-attachments-overflow"
        ?hidden=${this.open}
        aria-expanded="false"
        aria-controls=${this.attachmentsPanelId}
        @click=${this._handleAttachmentsToggle}
      >
        <span class="swc-UserMessage-attachments-overflow-pill">
          ${this.showAllLabel} (${this._mediaCount})
        </span>
      </button>
    `;
  }

  /** "Show less" control below the grid, shown only while expanded. */
  private _renderShowLessToggle(): TemplateResult | '' {
    if (!this._hasMediaOverflow || !this.open) {
      return '';
    }

    return html`
      <button
        type="button"
        class="swc-UserMessage-attachments-toggle"
        aria-expanded="true"
        aria-controls=${this.attachmentsPanelId}
        @click=${this._handleAttachmentsToggle}
      >
        ${this.showLessLabel}
        <swc-icon
          class="swc-UserMessage-attachments-chevron swc-UserMessage-attachments-chevron--down"
          style="--swc-icon-inline-size:10px;--swc-icon-block-size:10px;"
          aria-hidden="true"
        >
          ${Chevron75Icon()}
        </swc-icon>
      </button>
    `;
  }

  private _renderAttachments(): TemplateResult {
    // A single attachment (no siblings) gets the larger "hero" tile size
    // instead of the smaller grouped-grid size (Figma spec: a lone media
    // attachment is a 180×180 hero, a lone card attachment caps at 440px).
    const isSingleMedia = this._mediaCount === 1 && this._cardCount === 0;
    const isSingleCard = this._cardCount === 1 && this._mediaCount === 0;

    return html`
      <div id=${this.attachmentsPanelId} class="swc-UserMessage-attachments">
        <div
          class=${classMap({
            'swc-UserMessage-attachments-media': true,
            'swc-UserMessage-attachments-media--single': isSingleMedia,
          })}
          style="grid-template-columns: repeat(${this
            ._mediaColumnCount}, var(--swc-user-message-attachment-media-size, 96px));"
          ?hidden=${this._mediaCount === 0}
        >
          <slot name="attachment-media"></slot>
          ${this._renderMediaOverflow()}
        </div>
        <div
          class=${classMap({
            'swc-UserMessage-attachments-files': true,
            'swc-UserMessage-attachments-files--single': isSingleCard,
          })}
          ?hidden=${this._cardCount === 0}
        >
          <slot name="attachment-card"></slot>
        </div>
        ${this._renderShowLessToggle()}
      </div>
    `;
  }

  protected override render(): TemplateResult {
    if (this.type === 'copy') {
      return html`
        <slot></slot>
      `;
    }

    return this._renderAttachments();
  }
}
