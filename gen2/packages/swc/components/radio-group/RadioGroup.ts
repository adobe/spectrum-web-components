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

import {
  CSSResultArray,
  html,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';

import { RadioGroupBase } from '@adobe/spectrum-wc-core/components/radio-group';

import styles from './radio-group.css';

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
 * @example
 * <swc-radio-group><swc-radio value="1"></swc-radio></swc-radio-group>
 */
export class RadioGroup extends RadioGroupBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  public override get roleElement(): Element | null {
    return this.renderRoot.querySelector('.swc-RadioGroup');
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    // Must run after `super.updated()`: the labelling mixin resets
    // `ariaLabelledByElements` on every update, so the slotted-label fallback
    // is re-applied here each time.
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
    // The group role contains its label, items, and description. A radiogroup
    // div cannot use native `<label for>` association, so `updated()` wires
    // the slotted label after the mixin resolves programmatic name sources.
    return html`
      <div
        class="swc-RadioGroup"
        role="radiogroup"
        aria-required=${this.required ? 'true' : 'false'}
        aria-invalid=${this.invalid ? 'true' : 'false'}
        aria-readonly=${this.readonly ? 'true' : 'false'}
      >
        ${this.hasLabelSlotContent
          ? html`
              <span class="swc-FormFieldLabel">
                <slot name="label"></slot>
              </span>
            `
          : nothing}
        <div class="swc-RadioGroup-items">
          <slot></slot>
        </div>
        ${this.renderFieldDescription({ invalid: this.invalid })}
      </div>
    `;
  }
}
