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

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';

import styles from './user-message.css';

export type UserMessageType = 'card' | 'media';

/**
 * User-authored conversation bubble for AI Toolkit pattern exploration.
 * Default slot content is rendered when `type` is omitted and ignored when
 * `type="card"` or `type="media"`.
 *
 * @element swc-user-message
 * @slot - Message text when `type` is omitted.
 * @slot thumbnail - Document cards when `type="card"` or image previews when `type="media"`.
 * @since 2.0.0-beta.3
 */
export class UserMessage extends SpectrumElement {
  /** Attachment layout. Omit for message text. */
  @property({ type: String, reflect: true })
  public type?: UserMessageType;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return !this.type
      ? html`
          <slot></slot>
        `
      : html`
          <div
            class="swc-UserMessage-galleryViewport"
            role="group"
            aria-label=${this.type === 'card'
              ? 'Uploaded documents'
              : 'Uploaded images'}
            tabindex="0"
          >
            <slot name="thumbnail" class="swc-UserMessage-gallery"></slot>
          </div>
        `;
  }
}
