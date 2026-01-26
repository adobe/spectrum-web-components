/**
 * Copyright 2025 Adobe. All rights reserved.
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
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';

import { CheckboxBase } from '@spectrum-web-components/core/components/checkbox';
import type { ElementSize } from '@spectrum-web-components/core/shared/base/index.js';

// Import checkmark icons for different sizes
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark75.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark200.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark300.js';
// Import dash icons for indeterminate state
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash75.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash100.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash200.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash300.js';

import styles from './checkbox.css';

/**
 * A checkbox component that allows users to select or deselect options.
 * Checkboxes are typically used to allow users to make binary choices (yes/no, on/off)
 * or to select multiple items from a list.
 *
 * @element swc-checkbox
 *
 * @example
 * <swc-checkbox>Label text</swc-checkbox>
 *
 * @example
 * <swc-checkbox checked>Checked by default</swc-checkbox>
 *
 * @example
 * <swc-checkbox emphasized checked>Emphasized style</swc-checkbox>
 *
 * @example
 * <swc-checkbox indeterminate>Partially selected</swc-checkbox>
 */
export class Checkbox extends CheckboxBase {
    // ──────────────────────────────
    //     RENDERING & STYLING
    // ──────────────────────────────

    static override shadowRootOptions = {
        ...CheckboxBase.shadowRootOptions,
        delegatesFocus: true,
    };

    public static override get styles(): CSSResultArray {
        return [styles];
    }

    /**
     * Render the appropriate checkmark icon based on size.
     * @internal
     */
    private renderCheckmark(): TemplateResult {
        const size = (this.size || 'm') as ElementSize;
        const iconMap = {
            s: html`<sp-icon-checkmark75
                class="swc-Checkbox-checkmark"
            ></sp-icon-checkmark75>`,
            m: html`<sp-icon-checkmark100
                class="swc-Checkbox-checkmark"
            ></sp-icon-checkmark100>`,
            l: html`<sp-icon-checkmark200
                class="swc-Checkbox-checkmark"
            ></sp-icon-checkmark200>`,
            xl: html`<sp-icon-checkmark300
                class="swc-Checkbox-checkmark"
            ></sp-icon-checkmark300>`,
        };
        return iconMap[size] || iconMap.m;
    }

    /**
     * Render the appropriate dash icon for indeterminate state based on size.
     * @internal
     */
    private renderDash(): TemplateResult {
        const size = (this.size || 'm') as ElementSize;
        const iconMap = {
            s: html`<sp-icon-dash75
                class="swc-Checkbox-partialCheckmark"
            ></sp-icon-dash75>`,
            m: html`<sp-icon-dash100
                class="swc-Checkbox-partialCheckmark"
            ></sp-icon-dash100>`,
            l: html`<sp-icon-dash200
                class="swc-Checkbox-partialCheckmark"
            ></sp-icon-dash200>`,
            xl: html`<sp-icon-dash300
                class="swc-Checkbox-partialCheckmark"
            ></sp-icon-dash300>`,
        };
        return iconMap[size as keyof typeof iconMap] || iconMap.m;
    }

    protected override render(): TemplateResult {
        return html`
            <div
                class=${classMap({
                    ['swc-Checkbox']: true,
                    ['swc-Checkbox--emphasized']: this.emphasized,
                    ['swc-Checkbox--invalid']: this.invalid,
                    ['swc-Checkbox--indeterminate']: this.indeterminate,
                    ['swc-Checkbox--readonly']: this.readonly,
                })}
            >
                ${this.renderInput()}
                <div class="swc-Checkbox-control">
                    ${when(this.checked && !this.indeterminate, () =>
                        this.renderCheckmark()
                    )}
                    ${when(this.indeterminate, () => this.renderDash())}
                </div>
                <label class="swc-Checkbox-label" for="input">
                    <slot></slot>
                </label>
            </div>
        `;
    }
}
