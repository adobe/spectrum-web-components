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
import { classMap } from 'lit/directives/class-map.js';

import {
  STATUS_LIGHT_VARIANTS,
  STATUS_LIGHT_VARIANTS_COLOR,
  STATUS_LIGHT_VARIANTS_SEMANTIC,
  StatusLightBase,
  type StatusLightVariant,
} from '@spectrum-web-components/core/components/status-light';

import styles from './status-light.css';

/**
 * A status light is a great way to convey semantic meaning and the condition of an entity, such as statuses and categories. It provides visual indicators through colored dots accompanied by descriptive text.
 *
 * @element swc-status-light
 * @since 0.0.1
 *
 * @property {string} variant - Semantic or non-semantic color variant for the status dot.
 *
 * @example
 * <swc-status-light>Archived</swc-status-light>
 *
 * @example
 * <swc-status-light variant="positive">Approved</swc-status-light>
 *
 * @example
 * <swc-status-light variant="silver">Supported in Edge</swc-status-light>
 *
 * @cssprop --swc-status-light-height - Minimum block size of the status light.
 * @cssprop --swc-status-light-dot-size - Size of the indicator dot.
 * @cssprop --swc-status-light-dot-color - Color of the indicator dot.
 * @cssprop --swc-status-light-font-size - Font size of the label.
 * @cssprop --swc-status-light-line-height - Line height of the label.
 * @cssprop --swc-status-light-padding-block - Block padding.
 * @cssprop --swc-status-light-top-to-dot - Distance from the block-start edge to the center of the dot.
 * @cssprop --swc-status-light-text-to-visual - Gap between the dot and the label.
 * @cssprop --swc-status-light-content-color - Color of the label text.
 */
export class StatusLight extends StatusLightBase {
  // ────────────────────
  //     API OVERRIDES
  // ────────────────────

  /**
   * @internal
   */
  static override readonly VARIANTS_COLOR = STATUS_LIGHT_VARIANTS_COLOR;

  /**
   * @internal
   */
  static override readonly VARIANTS_SEMANTIC = STATUS_LIGHT_VARIANTS_SEMANTIC;

  /**
   * @internal
   */
  static override readonly VARIANTS = STATUS_LIGHT_VARIANTS;

  /**
   * Changes the color of the status dot. The variant list includes both semantic and non-semantic options.
   */
  @property({ type: String, reflect: true })
  public override variant: StatusLightVariant = 'neutral';

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class=${classMap({
          ['swc-StatusLight']: true,
          [`swc-StatusLight--size${this.size?.toUpperCase()}`]:
            this.size != null,
          [`swc-StatusLight--${this.variant}`]:
            typeof this.variant !== 'undefined',
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}
