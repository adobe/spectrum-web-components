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

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import { ArrowCurvedIcon } from '../utils/icons/index.js';

import styles from './suggestion-item.css';

/**
 * Interactive suggestion action chip used inside `<swc-suggestion-group>`.
 *
 * Composes `<swc-button variant="secondary">` and restyles it into a chip via
 * the button's public custom properties. Label content comes from the default
 * slot.
 *
 * @element swc-suggestion-item
 * @slot - Suggestion label text/content.
 * @fires swc-suggestion - Dispatched when the suggestion chip is activated.
 * Detail: `{ label: string }`
 *
 * @cssprop --swc-suggestion-item-min-block-size - Minimum block size of the chip.
 * @cssprop --swc-suggestion-item-icon-margin-inline-start - Inline spacing from the leading edge to the icon.
 * @cssprop --swc-suggestion-item-icon-margin-inline-end - Gap between the icon and the label.
 * @cssprop --swc-suggestion-item-label-padding-block - Block padding applied to the label.
 * @cssprop --swc-suggestion-item-label-padding-inline-end - Inline spacing from the label to the trailing edge.
 * @since 2.0.0-beta.3
 */
export class SuggestionItem extends SpectrumElement {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _handleClick(): void {
    const label = this.textContent?.trim() ?? '';
    this.dispatchEvent(
      new CustomEvent('swc-suggestion', {
        bubbles: true,
        composed: true,
        detail: { label },
      })
    );
  }

  protected override render(): TemplateResult {
    return html`
      <swc-button
        variant="secondary"
        class="swc-SuggestionItem"
        @click=${this._handleClick}
      >
        <swc-icon slot="icon" aria-hidden="true">${ArrowCurvedIcon()}</swc-icon>
        <span class="swc-SuggestionItem-label">
          <slot></slot>
        </span>
      </swc-button>
    `;
  }
}
