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

import { CSSResultArray, html, nothing, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { SpectrumElement } from '@spectrum-web-components/core/element';

import styles from './chat-bubble.css';

/**
 * A chat bubble for conversational UI. Displays a message with sender info,
 * timestamp, and an optional avatar.
 *
 * @element swc-chat-bubble
 *
 * @slot - Message body text content
 * @slot avatar - Optional avatar or icon displayed on the leading side
 *
 * @example
 * <swc-chat-bubble sender="Alice" timestamp="2:34 PM">
 *   Hey, how are you?
 * </swc-chat-bubble>
 *
 * @example
 * <swc-chat-bubble sender="You" timestamp="2:35 PM" variant="outgoing">
 *   I'm doing great, thanks!
 * </swc-chat-bubble>
 */
export class ChatBubble extends SpectrumElement {
  /**
   * Name of the message sender.
   */
  @property({ type: String })
  public sender: string = '';

  /**
   * Time string displayed next to the sender name (e.g., "2:34 PM").
   */
  @property({ type: String })
  public timestamp: string = '';

  /**
   * Visual variant controlling alignment and color scheme.
   * - `"incoming"` (default): left-aligned with neutral background
   * - `"outgoing"`: right-aligned with accent background
   */
  @property({ type: String, reflect: true })
  public variant: 'incoming' | 'outgoing' = 'incoming';

  @state()
  private _hasAvatar: boolean = false;

  private _handleAvatarSlotChange(event: Event): void {
    const slot = event.target as HTMLSlotElement;
    this._hasAvatar = slot.assignedElements({ flatten: true }).length > 0;
  }

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    const classes = {
      'swc-ChatBubble-root': true,
      'swc-ChatBubble-root--has-avatar': this._hasAvatar,
    };

    return html`
      <div class=${classMap(classes)}>
        <div class="swc-ChatBubble-avatar">
          <slot name="avatar" @slotchange=${this._handleAvatarSlotChange}></slot>
        </div>
        <div class="swc-ChatBubble-bubble">
          ${this.sender || this.timestamp
            ? html`
                <div class="swc-ChatBubble-header">
                  ${this.sender
                    ? html`<span class="swc-ChatBubble-sender"
                        >${this.sender}</span
                      >`
                    : nothing}
                  ${this.timestamp
                    ? html`<span class="swc-ChatBubble-timestamp"
                        >${this.timestamp}</span
                      >`
                    : nothing}
                </div>
              `
            : nothing}
          <div class="swc-ChatBubble-body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
