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
import { MutationController } from '@lit-labs/observers/mutation-controller.js';

import { Chevron75Icon } from '@adobe/spectrum-wc/icon/elements/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import { uniqueId } from '../../../utils/id.js';
import { UserMessageAttachment } from './user-message-attachment/UserMessageAttachment.js';

import styles from './user-message.css';

export type UserMessageType = 'copy' | 'card' | 'media' | 'attachments';

/** Grid tiles beyond this count collapse behind "Show all" by default. */
const VISIBLE_MEDIA_COUNT = 4;

/**
 * User-authored conversation bubble for conversational AI pattern exploration.
 * Default slot content is rendered only when `type="copy"` and ignored otherwise.
 *
 * `type="attachments"` accepts many `<swc-user-message-attachment>` children:
 * `type="media"` attachments lay out in a 4-column grid (collapsing behind a
 * "Show all" disclosure beyond {@link VISIBLE_MEDIA_COUNT}), `type="card"`
 * attachments stack full-width beneath the grid. `swc-user-message` owns this
 * grouping and disclosure; the attachment tiles are presentation-only.
 *
 * @element swc-user-message
 * @slot - Message copy content when `type="copy"`.
 * @slot thumbnail - Attachment preview when `type="card"` or `type="media"`.
 * @slot title - Attachment title when `type="card"` or `type="media"`.
 * @slot subtitle - Attachment subtitle when `type="card"` or `type="media"`.
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

  /** Label for the disclosure button when collapsed. */
  @property({ type: String, attribute: 'show-all-label' })
  public showAllLabel = 'Show all';

  /** Label for the disclosure button when expanded. */
  @property({ type: String, attribute: 'show-less-label' })
  public showLessLabel = 'Show less';

  @state()
  private _mediaCount = 0;

  @state()
  private _cardCount = 0;

  @state()
  private _hasMediaOverflow = false;

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

    this._mediaCount = mediaAttachments.length;
    this._cardCount = cardAttachments.length;
    this._hasMediaOverflow = hasOverflow;
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

  private _renderAttachmentsToggle(): TemplateResult | '' {
    if (!this._hasMediaOverflow) {
      return '';
    }

    const label = this.open ? this.showLessLabel : this.showAllLabel;

    return html`
      <button
        class="swc-UserMessage-attachments-toggle"
        aria-expanded=${this.open}
        aria-controls=${this.attachmentsPanelId}
        @click=${this._handleAttachmentsToggle}
      >
        ${label}
        <swc-icon
          class=${this.open
            ? 'swc-UserMessage-attachments-chevron swc-UserMessage-attachments-chevron--down'
            : 'swc-UserMessage-attachments-chevron'}
          style="--swc-icon-inline-size:10px;--swc-icon-block-size:10px;"
          aria-hidden="true"
        >
          ${Chevron75Icon()}
        </swc-icon>
      </button>
    `;
  }

  private _renderAttachments(): TemplateResult {
    return html`
      <div id=${this.attachmentsPanelId} class="swc-UserMessage-attachments">
        <div
          class="swc-UserMessage-attachments-media"
          ?hidden=${this._mediaCount === 0}
        >
          <slot name="attachment-media"></slot>
        </div>
        <div
          class="swc-UserMessage-attachments-files"
          ?hidden=${this._cardCount === 0}
        >
          <slot name="attachment-card"></slot>
        </div>
        ${this._renderAttachmentsToggle()}
      </div>
    `;
  }

  private _renderSingleAttachment(): TemplateResult {
    return html`
      <div
        class="swc-UserMessage-attachment swc-UserMessage-attachment--${this
          .type}"
      >
        <div class="swc-UserMessage-thumbnail">
          <slot name="thumbnail"></slot>
        </div>
        <div class="swc-UserMessage-meta">
          <div class="swc-UserMessage-title">
            <slot name="title"></slot>
          </div>
          <div class="swc-UserMessage-subtitle">
            <slot name="subtitle"></slot>
          </div>
        </div>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    if (this.type === 'copy') {
      return html`
        <slot></slot>
      `;
    }

    return this.type === 'attachments'
      ? this._renderAttachments()
      : this._renderSingleAttachment();
  }
}
