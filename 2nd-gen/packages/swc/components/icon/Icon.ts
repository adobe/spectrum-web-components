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

import { IconBase } from '@spectrum-web-components/core/components/icon';

import styles from './icon.css';

/**
 * Minimal icon renderer that accepts slotted SVG markup.
 *
 * @element swc-icon
 *
 * @example
 * <swc-icon label="Search">
 *   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
 *     <path d="M14.5 13.09 11.41 10a6 6 0 1 0-1.41 1.41l3.09 3.09a1 1 0 0 0 1.41-1.41zM3 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"/>
 *   </svg>
 * </swc-icon>
 *
 * @example
 * import { Chevron100Icon } from './elements/Chevron100Icon.js';
 *
 * html`<swc-icon label="Expand">${Chevron100Icon()}</swc-icon>`;
 */
export class Icon extends IconBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <span class="swc-Icon">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </span>
    `;
  }
}
