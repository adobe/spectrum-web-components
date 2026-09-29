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

import { CSSResultArray, html, nothing, TemplateResult } from 'lit';

import { RadioBase } from '@adobe/spectrum-wc-core/components/radio-group';

import styles from './radio.css';

/**
 * A single selectable option within `swc-radio-group`.
 *
 * @element swc-radio
 * @since 2.0.0-beta.5
 *
 * @example
 * <swc-radio value="1"><span slot="label">Option</span></swc-radio>
 */
export class Radio extends RadioBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-Radio">
        <slot name="label"></slot>
        ${this.hasDescription
          ? html`
              <slot name="description"></slot>
            `
          : nothing}
      </div>
    `;
  }
}
