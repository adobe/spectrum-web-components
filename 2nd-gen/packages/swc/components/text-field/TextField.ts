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

import { TextFieldBase } from '@adobe/spectrum-wc-core/components/text-field';

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

/**
 * A single-line text field for entering and editing text.
 *
 * @element swc-text-field
 * @since 2.0.0-beta.1
 *
 * @cssprop --swc-text-field-width - Inline size of the field. Unset by default, so the field fills its container (like React Spectrum); set it for a fixed width.
 * @cssprop --swc-field-label-max-inline-size - Max width of the visible label before it wraps. Unset by default (the label wraps late, like React Spectrum); set it to wrap a long label sooner and give a `side` input more room.
 *
 * @example
 * <swc-text-field></swc-text-field>
 */
export class TextField extends TextFieldBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [formFieldStyles, styles];
  }

  /**
   * The `<input>` that both `LabellingMixin` (accessible name / `<label for>`)
   * and `HelpTextMixin` (resolved description) wire their ARIA relationships
   * onto. Queried by its stable `id` (referenced by the rendered `<label for>`).
   */
  public override get roleElement(): HTMLInputElement | null {
    return this.renderRoot.querySelector('input#input');
  }

  private handleInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
  }

  /**
   * Re-dispatch `change` from the host: the native `change` event is
   * `composed: false`, so it never crosses the shadow boundary and a consumer's
   * `<swc-text-field @change=…>` would otherwise never fire.
   */
  private handleChange(): void {
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
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
    // The required indicator (asterisk) is rendered by the shared label; only
    // the invalid AlertTriangle ships here. A valid-state checkmark is not yet
    // in scope.
    return html`
      <div class="swc-Field swc-TextField">
        ${this.renderLabel(INPUT_ID, {
          required: this.required,
          necessityIndicator: this.necessityIndicator,
          necessityIcon: html`<swc-ui-icon
            icon="asterisk"
            size=${this.size === 's' ? 'm' : this.size}
          ></swc-ui-icon>`,
        })}
        <div
          class="swc-TextField-control"
          @pointerdown=${this.handleControlPointerDown}
        >
          <slot name="prefix"></slot>
          <input
            id=${INPUT_ID}
            class="input"
            type=${this.type}
            .value=${this.value}
            placeholder=${ifDefined(this.placeholder || undefined)}
            pattern=${ifDefined(this.pattern)}
            inputmode=${ifDefined(this.inputmode)}
            autocomplete=${ifDefined(this.autocomplete)}
            maxlength=${ifDefined(this.maxlength)}
            minlength=${ifDefined(this.minlength)}
            ?readonly=${this.readonly}
            ?required=${this.required}
            ?disabled=${this.effectiveDisabled}
            aria-invalid=${ifDefined(this.invalid ? 'true' : undefined)}
            @input=${this.handleInput}
            @change=${this.handleChange}
          />
          ${this.invalid
            ? html`
                <swc-icon-alert-triangle
                  class="swc-TextField-validationIcon"
                  aria-hidden="true"
                ></swc-icon-alert-triangle>
              `
            : nothing}
        </div>
        ${this.renderHelpText()}
      </div>
    `;
  }
}
