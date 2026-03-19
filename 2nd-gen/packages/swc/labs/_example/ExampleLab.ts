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

import { SpectrumElement } from '@spectrum-web-components/core/element';

import styles from './example-lab.css';

/**
 * An example lab component to demonstrate the labs pattern.
 *
 * This is a simple color swatch that displays a colored circle with an optional label.
 * It serves as a reference for designers creating their own lab prototypes.
 *
 * @element swc-example-lab
 *
 * @example
 * <swc-example-lab color="accent">Accent</swc-example-lab>
 */
export class ExampleLab extends SpectrumElement {
  /**
   * The semantic or non-semantic color to display.
   */
  @property({ type: String, reflect: true })
  public color: string = 'accent';

  /**
   * The size of the swatch.
   */
  @property({ type: String, reflect: true })
  public size: 's' | 'm' | 'l' = 'm';

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-ExampleLab">
        <div class="swc-ExampleLab-swatch"></div>
        <div class="swc-ExampleLab-label">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
