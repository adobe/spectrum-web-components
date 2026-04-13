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

import { CrossIcon, ThreeDotsIcon } from '../utils/icons/index.js';

import styles from './conversation-artifact.css';

/**
 * Shared conversation artifact primitive with card and media variants.
 *
 * @element swc-conversation-artifact
 *
 * @slot thumbnail - Shared visual slot for icon/thumbnail/preview media.
 * @slot title - Primary text label.
 * @slot subtitle - Secondary text label.
 * @slot actions - Optional trailing actions.
 */
export class ConversationArtifact extends SpectrumElement {
  /** Visual treatment variant for this artifact. */
  @property({ type: String, reflect: true })
  public variant: 'card' | 'media' = 'card';

  /** When `true`, show a dismiss affordance and emit `swc-dismiss` on click. */
  @property({ type: Boolean, reflect: true })
  public dismissible = false;

  /** `null` until first slot sync to avoid early false-negative hiding. */
  @state()
  private _hideTextMeta: boolean | null = null;
  @state()
  private _hasActions = false;

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
    if (!root || this.variant !== 'media') {
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

  private _syncActionsSlot(): void {
    const root = this.shadowRoot;
    if (!root) {
      return;
    }
    const actionsSlot = root.querySelector<HTMLSlotElement>(
      'slot[name="actions"]'
    );
    this._hasActions = this._slotHasAssignedContent(actionsSlot);
  }

  protected override updated(changed: Map<string, unknown>): void {
    if (changed.has('variant')) {
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
    const actionsSlot = root.querySelector<HTMLSlotElement>(
      'slot[name="actions"]'
    );
    titleSlot?.addEventListener('slotchange', () => this._syncTextMetaSlots());
    subtitleSlot?.addEventListener('slotchange', () =>
      this._syncTextMetaSlots()
    );
    actionsSlot?.addEventListener('slotchange', () => this._syncActionsSlot());
    this._syncTextMetaSlots();
    this._syncActionsSlot();
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
    const isMedia = this.variant === 'media';
    const hideMediaMeta = isMedia && this._hideTextMeta === true;
    const showDefaultActions = !this._hasActions && !hideMediaMeta;

    return html`
      <div class="swc-ConversationArtifact">
        <button
          class="swc-ConversationArtifact-dismiss"
          aria-label="Remove attachment"
          ?hidden=${!this.dismissible}
          @click=${this._handleDismissClick}
        >
          <swc-icon label="Remove">${CrossIcon()}</swc-icon>
        </button>

        <div class="swc-ConversationArtifact-surface">
          <div class="swc-ConversationArtifact-thumbnail">
            <slot name="thumbnail"></slot>
          </div>

          ${isMedia
            ? html`
                <div
                  class="swc-ConversationArtifact-meta"
                  ?hidden=${hideMediaMeta}
                >
                  <div class="swc-ConversationArtifact-header">
                    <div class="swc-ConversationArtifact-title">
                      <slot name="title"></slot>
                    </div>
                    <div class="swc-ConversationArtifact-actions">
                      <slot name="actions"></slot>
                      ${showDefaultActions
                        ? html`
                            <span
                              class="swc-ConversationArtifact-default-action"
                              aria-hidden="true"
                            >
                              ${ThreeDotsIcon()}
                            </span>
                          `
                        : ''}
                    </div>
                  </div>
                  <div class="swc-ConversationArtifact-subtitle">
                    <slot name="subtitle"></slot>
                  </div>
                </div>
              `
            : html`
                <div class="swc-ConversationArtifact-meta">
                  <div class="swc-ConversationArtifact-title">
                    <slot name="title"></slot>
                  </div>
                  <div class="swc-ConversationArtifact-subtitle">
                    <slot name="subtitle"></slot>
                  </div>
                </div>

                <div class="swc-ConversationArtifact-actions">
                  <slot name="actions"></slot>
                  ${showDefaultActions
                    ? html`
                        <span
                          class="swc-ConversationArtifact-default-action"
                          aria-hidden="true"
                        >
                          ${ThreeDotsIcon()}
                        </span>
                      `
                    : ''}
                </div>
              `}
        </div>
      </div>
    `;
  }
}
