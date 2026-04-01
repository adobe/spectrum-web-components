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

import styles from './conversation-artifact-card.css';

/**
 * Horizontal file-style attachment layout for conversational AI surfaces.
 * Does not render a dismiss control; hosts such as `swc-prompt-field` own removal chrome.
 *
 * @element swc-conversation-artifact-card
 *
 * @slot leading - Leading visual (for example file-type icon or thumbnail).
 * @slot title - Primary label (for example file or project name).
 * @slot subtitle - Secondary line (for example file type or year).
 */
export class ConversationArtifactCard extends SpectrumElement {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-ConversationArtifactCard">
        <div class="swc-ConversationArtifactCard-surface">
          <div class="swc-ConversationArtifactCard-leading">
            <slot name="leading"></slot>
          </div>
          <div class="swc-ConversationArtifactCard-body">
            <div class="swc-ConversationArtifactCard-title">
              <slot name="title"></slot>
            </div>
            <div class="swc-ConversationArtifactCard-subtitle">
              <slot name="subtitle"></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
