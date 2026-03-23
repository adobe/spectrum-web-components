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

import styles from './conversation-thread.css';

/**
 * Layout container for a single AI conversation exchange.
 *
 * Slot sub-components into the named slots in this order:
 * 1. `status` — `<swc-response-status>` thinking/complete indicator
 * 2. `message` — `<swc-system-message>` AI response body
 * 3. `feedback` — `<swc-message-feedback>` thumbs-up/down
 * 4. `sources` — `<swc-message-sources>` collapsible source list
 * 5. `suggestions` — `<swc-message-suggestions>` follow-up chips
 *
 * @element swc-conversation-thread
 * @slot status - Response status indicator (thinking / complete)
 * @slot message - AI response body content
 * @slot feedback - Thumbs-up / thumbs-down feedback controls
 * @slot sources - Collapsible list of sources
 * @slot suggestions - Follow-up suggestion chips (rendered outside the main body)
 */
export class ConversationThread extends SpectrumElement {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-ConversationThread">
        <div class="swc-ConversationThread-body">
          <div class="swc-ConversationThread-output">
            <slot name="status"></slot>
            <div class="swc-ConversationThread-content">
              <slot name="message"></slot>
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
