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
    // @todo (Phase 3–5): render the label, required indicator, input, validation
    // icon, and description/error container per the migration plan.
    return html`
      <div class="swc-TextField">
        <input class="input" />
      </div>
    `;
  }
}
