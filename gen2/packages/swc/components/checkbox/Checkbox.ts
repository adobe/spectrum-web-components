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

import '@adobe/spectrum-wc-icons/swc-icon-alert-triangle.js';

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
 * @fires {Event} input - Fires when the user toggles the checkbox, after `checked`, the form value, and validity update. Bubbles and crosses shadow boundaries; not cancelable.
 * @fires {Event} change - Fires when the user toggles the checkbox, after `input`. Bubbles and crosses shadow boundaries; not cancelable. To block a toggle, cancel the `click` event instead.
 * @fires {Event} invalid - Fires on the host when validation fails. Cancelable; does not bubble or cross shadow boundaries. Canceling suppresses native validation UI, not the failure.
 *
 * @example
 * <swc-checkbox name="terms" value="accepted" required>
 *   <span slot="label">I agree to the terms of service</span>
 * </swc-checkbox>
 */
export class Checkbox extends CheckboxBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  /**
   * @internal
   *
   * Native checkbox input, or `null` before rendering. Internal: the inner
   * input is not public API.
   */
  public override get roleElement(): HTMLInputElement | null {
    return this.renderRoot?.querySelector(`input#${INPUT_ID}`) ?? null;
  }

  protected override render(): TemplateResult {
    // `checked` and `indeterminate` are written to the input by the base class
    // only when they change, never by a binding: a binding would re-apply the
    // previous value if the element re-renders during a user click.
    return html`
      <div class="swc-Checkbox">
        <input
          id=${INPUT_ID}
          type="checkbox"
          class="swc-Checkbox-input"
          ?required=${this.required}
          ?disabled=${this.effectiveDisabled}
          @input=${this.handleInput}
          @change=${this.handleChange}
        />
        ${this.renderLabel(INPUT_ID)}
      </div>
      ${this.renderFieldDescription({
        invalid: this.fieldStatus === 'invalid',
        errorIcon: this.effectiveDisabled
          ? undefined
          : html`
              <swc-icon-alert-triangle></swc-icon-alert-triangle>
            `,
      })}
    `;
  }

  /**
   * Re-dispatch `change` from the host: the native `change` event is
   * `composed: false`, so it never crosses the shadow boundary and a consumer's
   * `<swc-checkbox @change=…>` would otherwise never fire. While read-only, a
   * toggle only gets here if the base class guard was bypassed; the input
   * handler already undid it, so no `change` is sent.
   */
  private handleChange(): void {
    if (this.fieldStatus === 'readonly') {
      return;
    }
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }
}
