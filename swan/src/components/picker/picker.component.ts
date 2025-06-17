/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, TemplateResult } from 'lit';
import { PickerBase } from '@core/components/picker/picker.base.js';
import styles from './picker.styles.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

/**
 * @element swan-badge
 * Adapted from Spectrum Web Components v1.x Badge
 *
 * @slot - Text label of the badge
 * @slot icon - Optional icon that appears to the left of the label
 */
export default class SwanPicker extends PickerBase {
    protected get renderInsideContent(): TemplateResult {
        return html`
            <div class="inside-content">
                <slot name="description"></slot>
            </div>
        `;
    }
    static override styles = styles;
    // a helper to throw focus to the button is needed because Safari
    // won't include buttons in the tab order even with tabindex="0"
    protected override render(): TemplateResult {
        if (this.tooltipEl) {
            this.tooltipEl.disabled = this.open;
        }
        return html`
            <button
                aria-controls=${ifDefined(this.open ? 'menu' : undefined)}
                aria-describedby="tooltip option-picker"
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-haspopup="true"
                aria-labelledby="loader icon label applied-label"
                id="button"
                class=${ifDefined(
                    this.labelAlignment
                        ? `label-${this.labelAlignment}`
                        : undefined
                )}
                @focus=${this.handleButtonFocus}
                @blur=${this.handleButtonBlur}
                @keydown=${{
                    handleEvent: this.handleEnterKeydown,
                    capture: true,
                }}
                ?disabled=${this.disabled}
            >
                ${this.renderInsideContent()} ${this.buttonContent}
            </button>
            <slot
                aria-hidden="true"
                name="tooltip"
                id="tooltip"
                @keydown=${this.handleKeydown}
                @slotchange=${this.handleTooltipSlotchange}
            ></slot>
            ${this.renderMenu} ${this.renderDescriptionSlot}
        `;
    }
    // protected override render() {
    //     return html`
    //         <div>
    //             <slot></slot>
    //         </div>
    //     `;
    // }
}
