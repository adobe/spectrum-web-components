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
 * @status preview
 * @since 0.0.1
 *
 * @example
 * <swc-illustrated-message>
 *   <svg slot="" aria-hidden="true" viewBox="0 0 200 160"><!-- illustration --></svg>
 *   <span slot="heading">Create your first asset.</span>
 *   <span slot="description">Get started by uploading or importing some assets.</span>
 * </swc-illustrated-message>
 *
 * @example
 * <swc-illustrated-message heading-level="3">
 *   <svg slot="" aria-hidden="true" viewBox="0 0 200 160"><!-- illustration --></svg>
 *   <span slot="heading">No results found.</span>
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
    const level = this.getHeadingLevel();
    const headingClass = 'swc-IllustratedMessage-heading';
    const heading = html`
      <slot name="heading">${this.heading}</slot>
    `;

    return html`
      <div class="swc-IllustratedMessage">
        <div class="swc-IllustratedMessage-illustration">
          <slot></slot>
        </div>
        <div class="swc-IllustratedMessage-content">
          ${level === 2
            ? html`
                <h2 class=${headingClass}>${heading}</h2>
              `
            : level === 3
              ? html`
                  <h3 class=${headingClass}>${heading}</h3>
                `
              : level === 4
                ? html`
                    <h4 class=${headingClass}>${heading}</h4>
                  `
                : level === 5
                  ? html`
                      <h5 class=${headingClass}>${heading}</h5>
                    `
                  : html`
                      <h6 class=${headingClass}>${heading}</h6>
                    `}
          <div class="swc-IllustratedMessage-description">
            <slot name="description">${this.description}</slot>
          </div>
        </div>
      </div>
    `;
  }
}
