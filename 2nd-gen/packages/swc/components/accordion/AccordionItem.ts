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

import { CSSResultArray, html, type TemplateResult } from 'lit';

import { AccordionItemBase } from '@spectrum-web-components/core/components/accordion';

import styles from './accordion-item.css';

/**
 * One expandable panel in an accordion. The header is a native `button` (focus is
 * delegated from the host when `delegatesFocus` is enabled).
 *
 * @element swc-accordion-item
 * @status preview
 *
 * @slot - Content shown when the item is open.
 */
export class AccordionItem extends AccordionItemBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private renderHeading(): TemplateResult {
    const level = this.getHeadingLevel();
    const headingInner = html`
      <span class="swc-AccordionItem-chevron" aria-hidden="true">▸</span>
      <button
        id="header"
        type="button"
        @click=${this.onHeaderClick}
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-controls="content"
        ?disabled=${this.disabled}
      >
        ${this.label}
      </button>
    `;

    switch (level) {
      case 2:
        return html`
          <h2 class="swc-AccordionItem-heading">${headingInner}</h2>
        `;
      case 4:
        return html`
          <h4 class="swc-AccordionItem-heading">${headingInner}</h4>
        `;
      case 5:
        return html`
          <h5 class="swc-AccordionItem-heading">${headingInner}</h5>
        `;
      case 6:
        return html`
          <h6 class="swc-AccordionItem-heading">${headingInner}</h6>
        `;
      default:
        return html`
          <h3 class="swc-AccordionItem-heading">${headingInner}</h3>
        `;
    }
  }

  protected override render(): TemplateResult {
    return html`
      ${this.renderHeading()}
      <div
        id="content"
        class="swc-AccordionItem-content"
        role="region"
        aria-labelledby="header"
        ?hidden=${!this.open}
      >
        <slot></slot>
      </div>
    `;
  }
}
