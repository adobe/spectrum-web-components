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

import {
  CheckboxBase,
  type CheckboxSize,
} from '@adobe/spectrum-wc-core/components/checkbox';
import type { IconSize } from '@adobe/spectrum-wc-core/components/icon';

import '@adobe/spectrum-wc-icons/swc-icon-alert-triangle.js';
import '../ui-icons/swc-ui-icon.js';

import formFieldStyles from '../../stylesheets/_lit-styles/form-fields.css';
import styles from './checkbox.css';

/**
 * The `<input>`'s `id`, referenced by the rendered `<label for>`. It only
 * needs to be unique within this component's own shadow root.
 */
const INPUT_ID = 'input';

/**
 * The checkmark and dash render one size smaller than the checkbox, which
 * selects the 50, 75, 100, and 200 UI icon steps for `s`, `m`, `l`, and `xl`.
 */
const ICON_SIZE = {
  s: 'xs',
  m: 's',
  l: 'm',
  xl: 'l',
} as const satisfies Record<CheckboxSize, IconSize>;

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
 * @cssprop --swc-checkbox-control-size - Inline and block size of the box. Changes by size.
 * @cssprop --swc-checkbox-corner-radius - Corner radius of the box. Changes by size.
 * @cssprop --swc-checkbox-text-to-control - Space between the box and the label. Changes by size.
 * @cssprop --swc-checkbox-border-color-default - Border color of the unchecked box at rest.
 * @cssprop --swc-checkbox-border-color-hover - Border color of the unchecked box on hover.
 * @cssprop --swc-checkbox-border-color-down - Border color of the unchecked box while pressed.
 * @cssprop --swc-checkbox-border-color-focus - Border color of the unchecked box with keyboard focus.
 * @cssprop --swc-checkbox-border-color-disabled - Border and fill color of the box when disabled.
 * @cssprop --swc-checkbox-selected-color-default - Fill color of the checked or indeterminate box at rest. Changes with `emphasized`.
 * @cssprop --swc-checkbox-selected-color-hover - Fill color of the checked or indeterminate box on hover. Changes with `emphasized`.
 * @cssprop --swc-checkbox-selected-color-down - Fill color of the checked or indeterminate box while pressed. Changes with `emphasized`.
 * @cssprop --swc-checkbox-selected-color-focus - Fill color of the checked or indeterminate box with keyboard focus. Changes with `emphasized`.
 * @cssprop --swc-checkbox-content-color-default - Text color of the label at rest.
 * @cssprop --swc-checkbox-content-color-hover - Text color of the label on hover.
 * @cssprop --swc-checkbox-content-color-down - Text color of the label while pressed.
 * @cssprop --swc-checkbox-content-color-focus - Text color of the label with keyboard focus.
 * @cssprop --swc-checkbox-content-color-disabled - Text color of the label when disabled.
 * @cssprop --swc-form-field-label-font-size - Font size of the label. Changes by size.
 * @cssprop --swc-form-field-description-font-size - Font size of the description and error text. Changes by size.
 * @cssprop --swc-form-field-row-gap - Space between the checkbox row and the description or error text. Changes by size.
 * @cssprop --swc-form-field-invalid-icon-gap - Space between the error icon and the error message. Changes by size.
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
    return [formFieldStyles, styles];
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
    // A read-only checkbox is barred from validation, so required does
    // nothing; dropping it also keeps Firefox from announcing "invalid data".
    // Native readonly and aria-readonly do not apply to checkboxes, so
    // read-only is aria-disabled on an input that stays focusable.
    const readOnly = this.fieldStatus === 'readonly';
    // `checked` and `indeterminate` aren't bound here: the base class writes
    // them to the input directly, from their setters and on first render.
    return html`
      <div class="swc-FormField swc-Checkbox">
        <div class="swc-Checkbox-control">
          <input
            id=${INPUT_ID}
            type="checkbox"
            class="swc-Checkbox-input"
            ?required=${this.required && !readOnly}
            ?disabled=${this.effectiveDisabled}
            aria-disabled=${ifDefined(readOnly ? 'true' : undefined)}
            aria-invalid=${ifDefined(
              this.fieldStatus === 'invalid' ? 'true' : undefined
            )}
            @input=${this.handleInput}
            @change=${this.handleChange}
            @keydown=${this.handleKeydown}
          />
          <span class="swc-Checkbox-box" aria-hidden="true">
            <swc-ui-icon
              class="swc-Checkbox-checkmark"
              icon="checkmark"
              size=${ICON_SIZE[this.size]}
            ></swc-ui-icon>
            <swc-ui-icon
              class="swc-Checkbox-dash"
              icon="dash"
              size=${ICON_SIZE[this.size]}
            ></swc-ui-icon>
          </span>
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
      </div>
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
