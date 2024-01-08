/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import {
    CSSResultArray,
    html,
    TemplateResult,
} from '@spectrum-web-components/base';

import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/color-handle/sp-color-handle.js';
import { TextfieldBase } from '@spectrum-web-components/textfield';

//import styles from './color-field.css.js';

/**
 * @element sp-color-field
 */
export class ColorField extends TextfieldBase {
    public static override get styles(): CSSResultArray {
        return [TextfieldBase.styles];
    }

    public override set value(value: string) {
        if (value === this.value) {
            return;
        }
        const oldValue = this._value;
        this._value = value;
        this.requestUpdate('value', oldValue);
    }

    public override get value(): string {
        return this._value;
    }

    protected override _value = '';

    protected override render(): TemplateResult {
        return html`
            <sp-color-handle size="m" color="${this.value}"></sp-color-handle>
            ${super.render()}
        `;
    }

    protected override checkValidity(): boolean {
        let validity = super.checkValidity();
        //console.log(this);

        if (this.inputElement.value) {
            const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            const rgbaRegex =
                /^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d*(?:\.\d+)?)\)$/i;
            if (
                rgbaRegex.test(this.inputElement.value) ||
                hexColorRegex.test(this.inputElement.value)
            ) {
                // Input value is in rgba format
                //console.log("valid value");
                validity = true;
                this.valid = validity;
                const colorHandle =
                    this.shadowRoot?.querySelector('sp-color-handle');
                colorHandle?.setAttribute('color', this.inputElement.value);
                //console.log(this.valid,"hi");
            } else {
                // Input value is not in rgba format
                //console.log("invalid value");
                validity = false;
                this.valid = validity;
                //console.log(this.valid,"hi");
            }
            this.valid = validity;
            this.invalid = !validity;
        }
        return validity;
    }
}
