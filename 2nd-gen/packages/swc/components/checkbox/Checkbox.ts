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
import { property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { CheckboxBase } from '@spectrum-web-components/core/components/checkbox';
import type { ElementSize } from '@spectrum-web-components/core/mixins/index.js';

import styles from './checkbox.css';

/* Inline SVG checkmark - fills the box when checked */
const checkmarkSvg = html`
  <svg
    id="checkmark"
    class="swc-Checkbox-checkmark"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M14.5 4.5l-8 8-3.5-3.5 1.5-1.5 2 2 6.5-6.5 1.5 1.5z"
    />
  </svg>
`;

/* Inline SVG dash (minus) - for indeterminate state */
const dashSvg = html`
  <svg
    id="partial-checkmark"
    class="swc-Checkbox-dash"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M4 8h10v2H4V8z"
    />
  </svg>
`;

/**
 * A checkbox component for form selection and toggles.
 *
 * @element swc-checkbox
 *
 * @slot - Label content for the checkbox.
 * @fires change - When the checked state is changed by the user.
 *
 * @example
 * <swc-checkbox>Accept terms</swc-checkbox>
 */
export class Checkbox extends CheckboxBase {
  static override shadowRootOptions = {
    ...CheckboxBase.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * Size of the checkbox. Declared here so the Custom Elements Manifest
   * and Storybook template apply it; behavior is inherited from SizedMixin.
   */
  @property({ type: String, reflect: true })
  public override size: ElementSize = 'm';

  @query('#input')
  public override inputElement!: HTMLInputElement;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <input
        id="input"
        type="checkbox"
        name=${ifDefined(this.name || undefined)}
        .checked=${this.checked}
        ?disabled=${this.disabled}
        aria-invalid=${ifDefined(this.invalid ? 'true' : undefined)}
        @change=${this.handleChange}
      />
      <span id="box" class="swc-Checkbox-box">
        ${this.checked && !this.indeterminate ? checkmarkSvg : nothing}
        ${this.indeterminate ? dashSvg : nothing}
      </span>
      <label id="label" class="swc-Checkbox-label" for="input">
        <slot></slot>
      </label>
    `;
  }

  protected override updated(
    changes: import('lit').PropertyValues<this>
  ): void {
    super.updated(changes);
    if (changes.has('disabled') && this.inputElement) {
      if (this.disabled) {
        this.inputElement.tabIndex = this.tabIndex;
        this.tabIndex = -1;
      } else {
        this.tabIndex = this.inputElement.tabIndex;
        this.inputElement.removeAttribute('tabindex');
      }
    }
  }
}
