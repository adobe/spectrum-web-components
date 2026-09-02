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

let nextTextFieldId = 0;

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

  private readonly _instanceId = ++nextTextFieldId;

  private get _inputId(): string {
    return `swc-text-field-input-${this._instanceId}`;
  }

  /**
   * The real role element `LabellingMixin`/`HelpTextMixin` wire the resolved
   * ARIA relationships onto.
   */
  public override get roleElement(): HTMLInputElement | null {
    return this.renderRoot.querySelector('input.input');
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-TextField">
        ${this.renderLabel(this._inputId)}
        <input
          id=${this._inputId}
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
          ?disabled=${this.disabled}
          aria-invalid=${ifDefined(this.invalid ? 'true' : undefined)}
        />
        ${this.renderHelpText()}
      </div>
    `;
  }
}
