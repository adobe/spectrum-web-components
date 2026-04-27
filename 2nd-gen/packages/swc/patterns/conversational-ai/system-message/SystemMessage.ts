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

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import styles from './system-message.css';

/**
 * Layout container for a single system reply: status, body, feedback, sources, and suggestions.
 *
 * **Presentation order is fixed** by this element's shadow tree: **status -> default content -> feedback -> sources -> suggestions**,
 * regardless of the order slotted nodes appear in the host DOM (each child must use the correct **`slot`** name).
 *
 * Slots:
 * - `status` — `<swc-response-status>` thinking/complete indicator
 * - default slot — System message body (semantic HTML; styled with Spectrum token variables)
 * - `feedback` — `<swc-message-feedback>` positive/negative feedback
 * - `sources` — `<swc-message-sources>` collapsible source list
 * - `suggestions` — `<swc-suggestion-group>` follow-up suggestion group
 *
 * Wrap with `<swc-conversation-turn type="system">` for column alignment in the thread.
 *
 * @element swc-system-message
 * @slot - System message body (semantic HTML; styled with Spectrum token variables)
 * @slot status - Response status indicator (thinking / complete)
 * @slot feedback - Positive / negative feedback controls
 * @slot sources - Collapsible list of sources
 * @slot suggestions - Follow-up suggestion chips (rendered outside the main body)
 */
export class SystemMessage extends SpectrumElement {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-SystemMessage">
        <div class="swc-SystemMessage-body">
          <div class="swc-SystemMessage-output">
            <slot name="status"></slot>
            <div class="swc-SystemMessage-content">
              <slot></slot>
              <slot name="feedback"></slot>
            </div>
          </div>
          <slot name="sources"></slot>
        </div>
        <slot name="suggestions"></slot>
      </div>
    `;
  }
}
