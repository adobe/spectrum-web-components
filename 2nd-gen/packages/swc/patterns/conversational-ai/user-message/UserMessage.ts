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

/**
 * User-authored conversation bubble for conversational AI pattern exploration.
 *
 * @element swc-user-message
 * @slot - Message content (text, card, image, etc.)
 */
export class UserMessage extends SpectrumElement {
  /**
   * Controls the maximum width of the bubble to match the host modality.
   * - `full-screen`: max 536px (default)
   * - `split-right-rail`: max 440px
   * - `panel`: max 360px
   */
  @property({ type: String, reflect: true })
  public modality: 'full-screen' | 'split-right-rail' | 'panel' = 'full-screen';

  /**
   * Controls the padding of the bubble to match the content type.
   * - `copy`: regular text padding (default)
   * - `card`: reduced padding for horizontal card content
   * - `image`: regular padding for image/asset card content
   */
  @property({ type: String, reflect: true })
  public content: 'copy' | 'card' | 'image' = 'copy';

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-UserMessage">
        <slot></slot>
      </div>
    `;
  }
}
