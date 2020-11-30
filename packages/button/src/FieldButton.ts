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

import {
    html,
    CSSResultArray,
    TemplateResult,
} from '@spectrum-web-components/base';
import { ButtonBase } from './ButtonBase.js';
import buttonStyles from './field-button.css.js';

/**
 * A Spectrum button control.
 * @element sp-field-button
 */
export class FieldButton extends ButtonBase {
    public static get styles(): CSSResultArray {
        return [...super.styles, buttonStyles];
    }

    protected get buttonContent(): TemplateResult[] {
        const icon = html`
            <slot name="icon"></slot>
        `;
        const content = [
            html`
                <slot
                    ?hidden=${!this.hasLabel}
                    id="slot"
                    @slotchange=${this.manageTextObservedSlot}
                ></slot>
            `,
        ];
        if (!this.hasIcon) {
            return content;
        }
        this.iconRight ? content.push(icon) : content.unshift(icon);
        return content;
    }
}
