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

import { CheckboxBase } from '@adobe/spectrum-wc-core/components/checkbox';

import '@adobe/spectrum-wc-icons/swc-icon-alert-triangle.js';

import styles from './checkbox.css';

/**
 * The `<input>`'s `id`, referenced by the rendered `<label for>`. It only
 * needs to be unique within this component's own shadow root.
 */
const INPUT_ID = 'input';

/**
 * A checkbox for selecting or marking an item, or for giving consent.
 *
 * @element swc-checkbox
 * @since 2.0.0-beta.7
 *
 * @fires {Event} input - Fires when the user toggles the checkbox. Listeners on the checkbox see the updated `checked`, form value, and validity. Bubbles and crosses shadow boundaries; not cancelable.
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
   * Native checkbox input, or `null` before rendering.
   */
  public override get roleElement(): HTMLInputElement | null {
    return this.renderRoot?.querySelector(`input#${INPUT_ID}`) ?? null;
  }

  protected override render(): TemplateResult {
    // A read-only checkbox is barred from validation, but a native required,
    // unchecked input still reports itself invalid, and Firefox ignores
    // aria-invalid="false". Move required to aria-required while read-only.
    // Native readonly and aria-readonly do not apply to checkboxes, so
    // read-only is aria-disabled on an input that stays focusable.
    const readOnly = this.fieldStatus === 'readonly';
    // `checked` and `indeterminate` aren't bound here: the base class writes
    // them to the input directly, from their setters and on first render.
    return html`
      <div class="swc-Checkbox">
        <input
          id=${INPUT_ID}
          type="checkbox"
          class="swc-Checkbox-input"
          ?required=${this.required && !readOnly}
          aria-required=${ifDefined(
            this.required && readOnly ? 'true' : undefined
          )}
          ?disabled=${this.effectiveDisabled}
          aria-disabled=${ifDefined(readOnly ? 'true' : undefined)}
          aria-invalid=${ifDefined(
            this.fieldStatus === 'invalid' ? 'true' : undefined
          )}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @keydown=${this.handleKeydown}
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
   * `<swc-checkbox @change=…>` would otherwise never fire.
   */
  private handleChange(): void {
    if (this.toggleReverted) {
      return;
    }
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }
}
