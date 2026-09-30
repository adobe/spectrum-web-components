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
import { ifDefined } from 'lit/directives/if-defined.js';

import { RadioBase } from '@adobe/spectrum-wc-core/components/radio-group';

import styles from './radio.css';

/** The `<input>`'s `id`, referenced by the rendered `<label for>`. */
const INPUT_ID = 'input';
/** The description container's `id`, referenced by the input's `aria-describedby`. */
const DESCRIPTION_ID = 'description';

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

  /**
   * Re-dispatch `change` from the host: the native `change` event is
   * `composed: false`, so it never crosses the shadow boundary and the
   * enclosing `swc-radio-group` (or a consumer's own listener) would
   * otherwise never see it.
   */
  private handleChange(event: Event): void {
    this.checked = (event.target as HTMLInputElement).checked;
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-Radio">
        <input
          id=${INPUT_ID}
          type="radio"
          .checked=${this.checked}
          .value=${this.value}
          ?disabled=${this.disabled}
          aria-describedby=${ifDefined(
            this.hasDescription ? DESCRIPTION_ID : undefined
          )}
          @change=${this.handleChange}
        />
        <label for=${INPUT_ID}><slot name="label"></slot></label>
        ${this.hasDescription
          ? html`
              <span id=${DESCRIPTION_ID}><slot name="description"></slot></span>
            `
          : nothing}
      </div>
    `;
  }
}
