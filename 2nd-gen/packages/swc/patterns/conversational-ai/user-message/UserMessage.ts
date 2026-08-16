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

/** Grid tiles beyond this count collapse behind "Show all" by default. */
const VISIBLE_MEDIA_COUNT = 4;

/**
 * User-authored conversation bubble for conversational AI pattern exploration.
 * The default slot always renders message copy text. Any slotted
 * `<swc-user-message-attachment>` children are detected automatically and
 * grouped below the text — no mode attribute needed.
 *
 * A single attachment (media or card) is a common case, not a special one,
 * and gets a larger "hero" tile size than a grouped attachment:
 * `type="media"` attachments lay out in a 4-column grid — beyond
 * {@link VISIBLE_MEDIA_COUNT}, the last visible tile gets a "View all (N)"
 * scrim overlay instead of being grouped with a separate control — and
 * `type="card"` attachments stack full-width, each in its own row, never
 * merged into the grid's box. `swc-user-message` owns this grouping,
 * disclosure, and hero-vs-grouped sizing; the attachment tiles are
 * presentation-only.
 *
 * @element swc-user-message
 * @slot - Message copy text, and/or `<swc-user-message-attachment>` elements.
 * @fires swc-user-message-toggle - Dispatched when the "Show all/less" disclosure is toggled.
 * Detail: `{ open: boolean }`
 */
export class UserMessage extends SpectrumElement {
  private readonly attachmentsPanelId = uniqueId('swc-user-message-panel');

  /** Whether the attachments grid's "Show all" disclosure is open. */
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
        subtree: true,
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
    return element instanceof UserMessageAttachment;
  }

  private _routeAttachments(): void {
    const attachments = Array.from(this.children).filter(
      (element): element is UserMessageAttachment =>
        this._isAttachmentElement(element)
    );
    const mediaAttachments = attachments.filter(
      (el) => el.getAttribute('type') !== 'card'
    );
    const cardAttachments = attachments.filter(
      (el) => el.getAttribute('type') === 'card'
    );
    const hasOverflow = mediaAttachments.length > VISIBLE_MEDIA_COUNT;

    for (const el of attachments) {
      const targetSlot =
        el.getAttribute('type') === 'card'
          ? 'attachment-card'
          : 'attachment-media';
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
   * The "View all" overlay (`.swc-UserMessage-attachments-overflow`) stays in
   * the DOM at row 1 / column {@link VISIBLE_MEDIA_COUNT} even while hidden
   * (it fades, rather than being removed). Per the CSS Grid placement
   * algorithm, that explicitly-positioned cell is reserved *before*
   * auto-placed items are laid out, so leaving row 1 to auto-placement would
   * skip that cell and push the real 4th tile into row 2. Only row 1 needs
   * explicit placement to route around that; later rows auto-flow normally.
   */
  private _alignMediaGrid(
    mediaAttachments: UserMessageAttachment[],
    hasOverflow: boolean
  ): void {
    const visibleCount = mediaAttachments.filter(
      (_el, index) =>
        !(hasOverflow && !this.open && index >= VISIBLE_MEDIA_COUNT)
    ).length;
    this._mediaColumnCount = Math.max(
      1,
      Math.min(visibleCount, VISIBLE_MEDIA_COUNT)
    );

    mediaAttachments.forEach((el, index) => {
      if (index < VISIBLE_MEDIA_COUNT) {
        el.style.gridRowStart = '1';
        el.style.gridColumnStart = String(index + 1);
      } else {
        el.style.removeProperty('grid-row-start');
        el.style.removeProperty('grid-column-start');
      }
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

  private get _hasAttachments(): boolean {
    return this._mediaCount > 0 || this._cardCount > 0;
  }

  /** Toggles a host class (not a reflected property) so CSS can key off attachment
   *  presence without round-tripping it through an attribute consumers might set. */
  protected override updated(): void {
    this.classList.toggle('has-attachments', this._hasAttachments);
  }

  protected override render(): TemplateResult {
    return html`
      <slot></slot>
      ${this._hasAttachments ? this._renderAttachments() : ''}
    `;
  }
}
