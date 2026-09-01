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
import { ifDefined } from 'lit/directives/if-defined.js';

import { TextFieldBase } from '@adobe/spectrum-wc-core/components/text-field';

import styles from './text-field.css';

/**
 * A single-line text field for entering and editing text.
 *
 * @element swc-text-field
 * @since 2.0.0-beta.1
 *
 * @example
 * <swc-text-field></swc-text-field>
 */
export class TextField extends TextFieldBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    // @todo (SWC-2466): render the visible label, required indicator, validation
    // icon, and description/error container via the LabellingController. Until
    // then the input takes its accessible name from `accessible-label`.
    return html`
      <div class="swc-TextField">
        <input
          class="input"
          aria-label=${ifDefined(this.accessibleLabel || undefined)}
          ?disabled=${this.effectiveDisabled}
        />
      </div>
    `;
  }
}
