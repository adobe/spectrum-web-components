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
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import styles from './user-message.css';

export type UserMessageType = 'copy' | 'card' | 'media';

/**
 * User-authored conversation bubble for conversational AI pattern exploration.
 * Default slot content is rendered only when `type="copy"` and ignored when
 * `type="card"` or `type="media"`.
 *
 * @element swc-user-message
 * @slot - Message copy content when `type="copy"`.
 * @slot thumbnail - Attachment preview when `type="card"` or `type="media"`.
 * @slot title - Attachment title when `type="card"` or `type="media"`.
 * @slot subtitle - Attachment subtitle when `type="card"` or `type="media"`.
 */
export class UserMessage extends SpectrumElement {
  /**
   * Visual content type for the user message bubble.
   */
  @property({ type: String, reflect: true })
  public type: UserMessageType = 'copy';

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return this.type === 'copy'
      ? html`
          <slot></slot>
        `
      : html`
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
}
