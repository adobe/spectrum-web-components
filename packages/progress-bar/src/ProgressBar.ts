/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/**
 * Concrete implementation of the Swan abstract base class.
 * This component provides the rendering layer and styles, while
 * the core logic resides in Swan's abstract class.
 *
 * @see swan/src/components/progress-bar/ProgressBarBase.ts for the abstract base implementation
 */

import {
    CSSResultArray,
    html,
    nothing,
    TemplateResult,
} from '@spectrum-web-components/base';

import '@spectrum-web-components/field-label/sp-field-label.js';
import styles from './progress-bar.css.js';
import { ProgressBarBase } from '@spectrum-web-components/swan/progress-bar/ProgressBarBase.js';

/**
 * @element sp-progress-bar
 */
export class ProgressBar extends ProgressBarBase {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    protected override render(): TemplateResult {
        return html`
            ${this.slotHasContent || this.label
                ? html`
                      <sp-field-label size=${this.size} class="label">
                          ${this.slotHasContent ? html`` : this.label}

                          <slot @slotchange=${this.handleSlotchange}></slot>
                      </sp-field-label>
                  `
                : html``}
            ${this.label
                ? html`
                      ${this.indeterminate
                          ? nothing
                          : html`
                                <sp-field-label
                                    size=${this.size}
                                    class="percentage"
                                >
                                    ${new Intl.NumberFormat(
                                        this.languageResolver.language,
                                        {
                                            style: 'percent',
                                            unitDisplay: 'narrow',
                                        }
                                    ).format(this.progress / 100)}
                                </sp-field-label>
                            `}
                  `
                : nothing}
            <div class="track">
                <div
                    class="fill"
                    style="transform: scaleX(calc(${this.progress} / 100));"
                ></div>
            </div>
        `;
    }
}
