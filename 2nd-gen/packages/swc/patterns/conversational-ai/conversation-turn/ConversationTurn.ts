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

import styles from './conversation-turn.css';

/**
 * Aligns one turn in a chat column: user content toward the end (right in LTR) with a
 * comfortable inset, assistant content toward the start at full width.
 *
 * Slot **`swc-user-message`**, **`swc-assistant-message`**, or custom markup inside each turn.
 *
 * @element swc-conversation-turn
 * @slot - Turn body (message stack or bubble)
 */
export class ConversationTurn extends SpectrumElement {
  /** `user` — end-aligned; `assistant` — start-aligned, full width of the column. */
  @property({ type: String, reflect: true })
  public participant: 'user' | 'assistant' = 'user';

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-ConversationTurn">
        <slot></slot>
      </div>
    `;
  }
}
