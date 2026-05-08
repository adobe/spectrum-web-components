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
 * Aligns one turn in a chat column: user content toward the end (right in LTR)
 * and system content toward the start at full width.
 *
 * Slot **`swc-user-message`** or **`swc-system-message`** inside each turn
 * Multiple slotted messages are stacked automatically with
 * `--swc-conversation-turn-group-gap` spacing.
 * User-message widths are applied by layout context (full screen, split rail,
 * panel) while system content remains full width.
 *
 * The inner layout root is exposed as **`role="group"`** with an **`aria-label`**
 * derived from **`type`** (**"User message"** / **"System message"**) so assistive
 * technology can distinguish user turns from assistant turns, not only alignment.
 * Use `accessible-label` to override this label (for localization or product-specific phrasing).
 *
 * @element swc-conversation-turn
 * @slot - Turn body (message stack or bubble)
 */
export class ConversationTurn extends SpectrumElement {
  /**
   * `user` — end-aligned; `system` — start-aligned, full width of the column.
   * Drives the accessible name of the turn (`User message` vs `System message`).
   */
  @property({ type: String, reflect: true })
  public type: 'system' | 'user' = 'user';

  /**
   * Optional accessible label override for the turn group.
   * When omitted, the label falls back to `type` ("User message" / "System message").
   */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel = '';

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private get _turnAriaLabel(): string {
    if (this.accessibleLabel.trim().length > 0) {
      return this.accessibleLabel.trim();
    }
    return this.type === 'user' ? 'User message' : 'System message';
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class="swc-ConversationTurn"
        role="group"
        aria-label=${this._turnAriaLabel}
      >
        <slot></slot>
      </div>
    `;
  }
}
