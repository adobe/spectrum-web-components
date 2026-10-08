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

import { CSSResultArray, html, PropertyValues, TemplateResult } from 'lit';

import { RadioGroupBase } from '@adobe/spectrum-wc-core/components/radio-group';

import '@adobe/spectrum-wc-icons/swc-icon-alert-triangle.js';
import '../ui-icons/swc-ui-icon.js';

import formFieldStyles from '../../stylesheets/_lit-styles/form-fields.css';
import styles from './radio-group.css';

const NECESSITY_INDICATOR_TEXT = {
  required: '(required)',
  optional: '(optional)',
};

/**
 * Coordinates a set of `swc-radio` items as a single mutually-exclusive selection.
 *
 * @element swc-radio-group
 * @since 2.0.0-beta.5
 *
 * @slot - The `swc-radio` items to manage.
 * @slot label - Visible group label.
 * @slot description - Group-level guidance text.
 * @slot error-text - Error message shown when `invalid`.
 *
 * @cssprop --swc-radio-group-item-gap - Space between radio button items.
 * @cssprop --swc-radio-group-side-label-gap - Space between the radio items and the side label.
 * @cssprop --swc-radio-group-row-gap - Space between the labels and group of radio items.
 * @cssprop --swc-field-label-max-inline-size - `label-position="side"` only: max inline size of the label's grid column. Defaults to 25ch.
 * @cssprop --swc-form-field-label-font-size - Font size of the visible group label. Defaults to the group size typography scale.
 * @cssprop --swc-form-field-description-font-size - Font size of the description and error text. Defaults to the group size typography scale.
 * @cssprop --swc-form-field-necessity-gap - Space between the label text and the necessity indicator. Changes by size.
 * @cssprop --swc-form-field-invalid-icon-gap - Space between the error icon and the error message. Changes by size.
 *
 * @example
 * <swc-radio-group><swc-radio value="1"></swc-radio></swc-radio-group>
 */
export class RadioGroup extends RadioGroupBase {
  public static override get styles(): CSSResultArray {
    return [formFieldStyles, styles];
  }

  public override get roleElement(): Element | null {
    return this.renderRoot.querySelector('.swc-RadioGroup');
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    // Must run after `super.updated()`: the mixin resets `ariaLabelledByElements`
    // each update, so the slotted-label fallback is re-applied here.
    const target = this.roleElement as
      | (Element & {
          ariaLabelledByElements: Element[] | null;
        })
      | null;
    if (
      !target ||
      target.ariaLabelledByElements?.length ||
      this.accessibleLabel
    ) {
      return;
    }
    const label = this.renderRoot.querySelector('.swc-FormFieldLabel');
    target.ariaLabelledByElements = label ? [label] : null;
  }

  protected override render(): TemplateResult {
    // Keep `role="radiogroup"` on this outer element: other placements break
    // item position or group name announcements in some browser/AT
    // combinations. A `div` can't use `<label for>`, so `updated()` wires the
    // slotted label.
    return html`
      <div
        class="swc-FormField swc-RadioGroup"
        role="radiogroup"
        tabindex="-1"
        aria-required=${this.required ? 'true' : 'false'}
        aria-invalid=${this.invalid ? 'true' : 'false'}
        aria-readonly=${this.readonly ? 'true' : 'false'}
      >
        ${this.renderLabel(undefined, {
          required: this.required,
          necessityIndicator: this.necessityIndicator,
          necessityIndicatorText: NECESSITY_INDICATOR_TEXT,
          necessityIcon: html`
            <swc-ui-icon icon="asterisk" size=${this.size}></swc-ui-icon>
          `,
        })}
        <div class="swc-RadioGroup-items">
          <slot></slot>
        </div>
        ${this.renderFieldDescription({
          invalid: this.invalid,
          errorIcon: html`
            <swc-icon-alert-triangle></swc-icon-alert-triangle>
          `,
        })}
      </div>
    `;
  }
}
