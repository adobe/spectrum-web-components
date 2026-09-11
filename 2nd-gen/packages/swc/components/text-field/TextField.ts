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

  /**
   * The real role element `LabellingMixin` wires the resolved accessible-name
   * ARIA relationship onto.
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

  protected override render(): TemplateResult {
    // @todo (SWC-2466 / Phase 4–5): render the required indicator, validation
    // icon, and description/error container via a future help-text mixin.
    return html`
      <div class="swc-TextField">
        ${this.renderLabel(INPUT_ID)}
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
      </div>
    `;
  }
}
