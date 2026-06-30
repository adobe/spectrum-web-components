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
 * @since 2.0.0
 *
 * @example
 * <swc-icon label="Expand">
 *   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
 *     <path d="M2.83789 9.8252c-.19238 0-.38379-.07324-.53027-.21973-.29297-.29297-.29297-.76758 0-1.06055l3.54395-3.54492L2.30762 1.45508c-.29297-.29297-.29297-.76758 0-1.06055s.76758-.29297 1.06055 0l4.07422 4.0752c.29297.29297.29297.76758 0 1.06055l-4.07422 4.0752c-.14648.14648-.33789.21973-.53027.21973Z"/>
 *   </svg>
 * </swc-icon>
 *
 * @cssprop --swc-icon-color - Color of the icon.
 * @cssprop --swc-icon-inline-size - Inline size of the icon.
 * @cssprop --swc-icon-block-size - Block size of the icon.
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
