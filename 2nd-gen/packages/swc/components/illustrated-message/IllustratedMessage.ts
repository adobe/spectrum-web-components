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

import { IllustratedMessageBase } from '@spectrum-web-components/core/components/illustrated-message';

import styles from './illustrated-message.css';

/**
 * @element swc-illustrated-message
 * @since 0.0.1
 *
 * @example
 * <swc-illustrated-message>
 *   <svg slot="" aria-hidden="true" viewBox="0 0 200 160"><!-- illustration --></svg>
 *   <h2 slot="heading">Create your first asset.</h2>
 *   <span slot="description">Get started by uploading or importing some assets.</span>
 * </swc-illustrated-message>
 *
 * @example
 * <swc-illustrated-message>
 *   <svg slot="" aria-hidden="true" viewBox="0 0 200 160"><!-- illustration --></svg>
 *   <h3 slot="heading">No results found.</h3>
 *   <span slot="description">Try adjusting your search or filters.</span>
 * </swc-illustrated-message>
 */
export class IllustratedMessage extends IllustratedMessageBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-IllustratedMessage">
        <div class="swc-IllustratedMessage-illustration">
          <slot></slot>
        </div>
        <div class="swc-IllustratedMessage-content">
          <slot
            name="heading"
            @slotchange=${this.handleHeadingSlotChange}
          ></slot>
          <div class="swc-IllustratedMessage-description">
            <slot name="description"></slot>
          </div>
        </div>
      </div>
    `;
  }
}
