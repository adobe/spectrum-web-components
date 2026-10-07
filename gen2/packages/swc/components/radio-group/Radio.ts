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

import { RadioBase } from '@adobe/spectrum-wc-core/components/radio-group';

import styles from './radio.css';

/**
 * A single selectable option within `swc-radio-group`.
 *
 * @element swc-radio
 * @since 2.0.0-beta.5
 *
 * @cssprop --swc-radio-control-size - Diameter of the radio control.
 * @cssprop --swc-radio-text-to-control - Space between the control and the text.
 * @cssprop --swc-radio-font-size - Font size of the label.
 * @cssprop --swc-radio-description-font-size - Font size of the description.
 * @cssprop --swc-radio-border-color-default - Border color of the control at rest.
 * @cssprop --swc-radio-border-color-hover - Border color of the control on hover.
 * @cssprop --swc-radio-border-color-down - Border color of the control while pressed.
 * @cssprop --swc-radio-border-color-focus - Border color of the control with keyboard focus.
 * @cssprop --swc-radio-border-color-disabled - Border color of the control when disabled.
 * @cssprop --swc-radio-content-color-default - Text color of the label at rest.
 * @cssprop --swc-radio-content-color-hover - Text color of the label on hover.
 * @cssprop --swc-radio-content-color-down - Text color of the label while pressed.
 * @cssprop --swc-radio-content-color-focus - Text color of the label with keyboard focus.
 * @cssprop --swc-radio-content-color-disabled - Text color of the label and description when disabled.
 *
 * @example
 * <swc-radio value="1"><span slot="label">Option</span></swc-radio>
 */
export class Radio extends RadioBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-Radio">
        <span class="swc-Radio-button" aria-hidden="true"></span>
        <div class="swc-Radio-content">
          <span class="swc-Radio-label"><slot name="label"></slot></span>
          ${this.hasDescription
            ? html`
                <span class="swc-Radio-description">
                  <slot name="description"></slot>
                </span>
              `
            : nothing}
        </div>
      </div>
    `;
  }
}
