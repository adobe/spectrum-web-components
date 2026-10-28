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

import { CheckboxBase } from '@adobe/spectrum-wc-core/components/checkbox';

import styles from './checkbox.css';

/**
 * The `<input>`'s `id`, referenced by the rendered `<label for>`. A fixed
 * string stays stable across SSR/hydration; it only needs to be unique within
 * this component's own shadow root.
 */
const INPUT_ID = 'input';

/**
 * A checkbox for selecting or marking an item, or for giving consent.
 *
 * @element swc-checkbox
 * @since 2.0.0-beta.7
 *
 * @example
 * <swc-checkbox><span slot="label">Send me updates</span></swc-checkbox>
 */
export class Checkbox extends CheckboxBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-Checkbox">
        <input id=${INPUT_ID} type="checkbox" class="swc-Checkbox-input" />
        ${this.renderLabel(INPUT_ID)}
      </div>
    `;
  }
}
