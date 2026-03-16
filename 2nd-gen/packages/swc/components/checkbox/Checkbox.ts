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

import type { CheckboxSize } from '@spectrum-web-components/core/components/checkbox';
import { CheckboxBase } from '@spectrum-web-components/core/components/checkbox';

import styles from './checkbox.css';

/**
 * Checkbox allows users to select one or more options from a list, or to toggle
 * a single option on or off.
 *
 * @element swc-checkbox
 * @slot - The label content for the checkbox.
 * @fires change - Dispatched when the checked state changes.
 */
export class Checkbox extends CheckboxBase {
  static override shadowRootOptions = {
    ...CheckboxBase.shadowRootOptions,
    delegatesFocus: true,
  };

  // ────────────────────
  //     RENDERING & STYLING
  // ────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    const size = (this.size ?? 'm') as CheckboxSize;
    return html`
      <div class="swc-Checkbox">
        <input
          id="input"
          class="swc-Checkbox-input"
          name=${ifDefined(this.name ?? undefined)}
          type="checkbox"
          .checked=${this.checked}
          ?disabled=${this.readonly || this.disabled}
          @change=${this.handleChange}
        />
        <span class="swc-Checkbox-box" id="box">
          ${this.checked && !this.indeterminate
            ? this.renderCheckmark(size)
            : nothing}
          ${this.indeterminate ? this.renderDash(size) : nothing}
        </span>
        <label class="swc-Checkbox-label" id="label" for="input">
          <slot></slot>
        </label>
      </div>
    `;
  }

  public override handleChange(): void {
    this.indeterminate = false;
    super.handleChange();
  }

  public override click(): void {
    if (this.disabled) {
      return;
    }
    this.inputElement?.click();
  }

  private renderCheckmark(size: CheckboxSize): TemplateResult {
    const sizeMap = { s: 10, m: 10, l: 12, xl: 14 };
    const d = sizeMap[size] ?? 10;
    return html`
      <svg
        class="swc-Checkbox-checkmark"
        width=${d}
        height=${d}
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <polyline points="2,6 5,9 10,3" />
      </svg>
    `;
  }

  private renderDash(size: CheckboxSize): TemplateResult {
    const sizeMap = { s: 8, m: 10, l: 12, xl: 12 };
    const w = sizeMap[size] ?? 10;
    return html`
      <svg
        class="swc-Checkbox-partialCheckmark"
        width=${w}
        height="2"
        viewBox="0 0 12 2"
        fill="currentColor"
        aria-hidden="true"
      >
        <rect width="12" height="2" rx="1" />
      </svg>
    `;
  }
}
