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
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { RadioBase } from '@spectrum-web-components/core/components/radio';
import type { ElementSize } from '@spectrum-web-components/core/mixins/index.js';

import styles from './radio.css';

/**
 * A radio button component for use inside a radio group.
 *
 * @element swc-radio
 *
 * @slot - Text label of the radio button.
 * @fires change - When the input is interacted with and its state is changed.
 *
 * @example
 * <swc-radio value="opt1" name="group">Option 1</swc-radio>
 */
export class Radio extends RadioBase {
  /**
   * Size of the radio button. Declared here so the Custom Elements Manifest
   * and Storybook template apply it; behavior is inherited from SizedMixin.
   */
  @property({ type: String, reflect: true })
  public override size: ElementSize = 'm';

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div id="input" class="swc-Radio-input"></div>
      <span
        id="button"
        class=${classMap({
          ['swc-Radio-button']: true,
        })}
      ></span>
      <span id="label" class="swc-Radio-label" role="presentation">
        <slot></slot>
      </span>
    `;
  }
}
