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

import { IllustratedMessageBase } from '@adobe/spectrum-wc-core/components/illustrated-message';

import styles from './illustrated-message.css';

/**
 * @element swc-illustrated-message
 * @since 2.0.0-beta.1
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
 *
 * @cssprop --swc-illustrated-message-max-inline-size - Maximum inline size of the component.
 * @cssprop --swc-illustrated-message-illustration-size - Square size of the illustration (width and height). Defaults to 96px for `size="s"` and `size="m"`, 160px for `size="l"`.
 * @cssprop --swc-illustrated-message-illustration-inline-size - Illustration inline size override. Falls back to `--swc-illustrated-message-illustration-size`.
 * @cssprop --swc-illustrated-message-illustration-block-size - Illustration block size override. Falls back to `--swc-illustrated-message-illustration-size`.
 * @cssprop --swc-illustrated-message-illustration-color - Color applied to the SVG illustration via `currentcolor`.
 * @cssprop --swc-illustrated-message-illustration-to-content - Gap between the illustration and the heading/description area.
 * @cssprop --swc-illustrated-message-heading-font-size - Font size of the heading.
 * @cssprop --swc-illustrated-message-heading-line-height - Line height of the heading.
 * @cssprop --swc-illustrated-message-description-font-size - Font size of the description.
 * @cssprop --swc-illustrated-message-description-line-height - Line height of the description.
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
          <slot
            name="actions"
            @slotchange=${this.handleActionsSlotChange}
          ></slot>
        </div>
      </div>
    `;
  }
}
