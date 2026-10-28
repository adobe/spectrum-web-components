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
import { live } from 'lit/directives/live.js';

import {
  TextFieldBase,
  type TextFieldSize,
} from '@adobe/spectrum-wc-core/components/text-field';
import { SlotAttributePropagationController } from '@adobe/spectrum-wc-core/controllers/index.js';

import '@adobe/spectrum-wc-icons/swc-icon-alert-triangle.js';
import '../ui-icons/swc-ui-icon.js';

import formFieldStyles from '../../stylesheets/_lit-styles/form-fields.css';
import styles from './text-field.css';

/**
 * The `<input>`'s `id`, referenced by the rendered `<label for>`. A fixed
 * string (not a per-instance counter) stays stable across SSR/hydration; it
 * only needs to be unique within this component's own shadow root.
 */
const INPUT_ID = 'input';
// @todo SWC-2712: Localize necessity indicators using shared message localization.
const NECESSITY_INDICATOR_TEXT = {
  required: '(required)',
  optional: '(optional)',
};
const PREFIX_AVATAR_SIZE = {
  s: '50',
  m: '75',
  l: '200',
  xl: '300',
} as const satisfies Record<TextFieldSize, string>;

/**
 * A single-line text field for entering and editing text.
 *
 * @element swc-text-field
 * @since 2.0.0-beta.1
 *
 * @fires {InputEvent} input - Fires during user edits, after the value, form data, and validity update. Bubbles and crosses shadow boundaries; not cancelable.
 * @fires {Event} change - Fires when the user commits an edited value, such as on blur. Bubbles and crosses shadow boundaries; not cancelable.
 * @fires {Event} invalid - Fires on the host when validation fails. Cancelable; does not bubble or cross shadow boundaries. Canceling suppresses native validation UI, not the failure.
 *
 * @cssprop --swc-field-label-max-inline-size - Maximum label inline size for `label-position="side"`. Defaults to `50%` of the field's inline size.
 * @cssprop --swc-field-input-min-inline-size - Minimum control inline size. Defaults to the control height for the selected `size`.
 * @cssprop --swc-field-input-max-inline-size - Maximum control inline size. Defaults to the field width for the selected `size`.
 * @cssprop --swc-text-field-padding-block - Block-axis control padding. Varies with `size`.
 * @cssprop --swc-text-field-padding-inline - Inline-axis control padding. Varies with `size`.
 * @cssprop --swc-text-field-affix-gap - Spacing between prefix content and the input. Varies with `size`.
 * @cssprop --swc-form-field-row-gap - Block-axis spacing between the label, control, and help text. Varies with `size`.
 * @cssprop --swc-form-field-necessity-gap - Inline spacing between the label and its necessity marker. Varies with `size`.
 * @cssprop --swc-text-field-font-size - Input and prefix font size. Varies with `size`.
 * @cssprop --swc-text-field-line-height - Input and prefix line height. Defaults to `normal`.
 * @cssprop --swc-text-field-border-radius - Control corner radius. Varies with `size`.
 * @cssprop --swc-text-field-border-color-default - Border color when neither hovered nor focused. Defaults vary with `field-status`.
 * @cssprop --swc-text-field-border-color-hover - Border color when hovered without focus. Defaults vary with `field-status`.
 * @cssprop --swc-text-field-border-color-focus - Border color when focused without hover. Defaults vary with `field-status`.
 * @cssprop --swc-text-field-border-color-focus-hover - Border color when both hovered and focused. Defaults vary with `field-status`.
 * @cssprop --swc-text-field-validation-icon-size - Inline and block size of the invalid-status icon. Varies with `size`.
 * @cssprop --swc-form-field-label-font-size - Visible label font size. Defaults to the typography scale for the selected `size`.
 * @cssprop --swc-form-field-description-font-size - Description and error-text font size. Defaults to the typography scale for the selected `size`.
 *
 * @example
 * <swc-text-field></swc-text-field>
 */
export class TextField extends TextFieldBase {
  private readonly prefixAvatarSize = new SlotAttributePropagationController(
    this,
    {
      attribute: 'size',
      getValue: () => PREFIX_AVATAR_SIZE[this.size],
      selector: 'swc-avatar',
      slotName: 'prefix',
    }
  );

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [formFieldStyles, styles];
  }

  /**
   * Native input element, or `null` before rendering.
   */
  public override get roleElement(): HTMLInputElement | null {
    return this.renderRoot?.querySelector('input#input') ?? null;
  }

  private handleInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.syncFormState();
  }

  /**
   * Re-dispatch `change` from the host: the native `change` event is
   * `composed: false`, so it never crosses the shadow boundary and a consumer's
   * `<swc-text-field @change=…>` would otherwise never fire.
   */
  private handleChange(): void {
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private handlePrefixSlotChange(): void {
    this.prefixAvatarSize.propagate();
  }

  /**
   * The border/padding live on the control wrapper, not the `<input>`, so a
   * pointer press on that surrounding area (padding or the non-interactive
   * prefix) no longer lands on the input. Route it to the input so the whole
   * control still behaves as one click-to-focus target.
   */
  private handleControlPointerDown(event: PointerEvent): void {
    if (event.target !== this.roleElement) {
      event.preventDefault();
      this.roleElement?.focus();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-FormField swc-TextField">
        ${this.renderLabel(INPUT_ID, {
          required: this.required,
          necessityIndicator: this.necessityIndicator,
          necessityIndicatorText: NECESSITY_INDICATOR_TEXT,
          // prettier-ignore
          necessityIcon: html`<swc-ui-icon icon="asterisk" size=${this.size}></swc-ui-icon>`,
        })}
        <div
          class="swc-TextField-control"
          @pointerdown=${this.handleControlPointerDown}
        >
          <slot name="prefix" @slotchange=${this.handlePrefixSlotChange}></slot>
          <input
            id=${INPUT_ID}
            class="swc-TextField-input"
            type=${this.inputType}
            .value=${live(this.value)}
            placeholder=${ifDefined(this.placeholder || undefined)}
            pattern=${ifDefined(this.pattern)}
            inputmode=${ifDefined(this.inputmode)}
            autocomplete=${ifDefined(this.autocomplete)}
            maxlength=${ifDefined(this.maxlength)}
            minlength=${ifDefined(this.minlength)}
            ?readonly=${this.fieldStatus === 'readonly'}
            ?required=${this.required}
            ?disabled=${this.effectiveDisabled}
            aria-invalid=${ifDefined(
              this.fieldStatus === 'invalid' ? 'true' : undefined
            )}
            @input=${this.handleInput}
            @change=${this.handleChange}
            @keydown=${this.handleKeydown}
          />
          ${this.fieldStatus === 'invalid' && !this.effectiveDisabled
            ? html`
                <swc-icon-alert-triangle
                  class="swc-TextField-invalidIcon"
                  aria-hidden="true"
                ></swc-icon-alert-triangle>
              `
            : nothing}
        </div>
        ${this.renderFieldDescription({
          invalid: this.fieldStatus === 'invalid',
        })}
      </div>
    `;
  }
}
