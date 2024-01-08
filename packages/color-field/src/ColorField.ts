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

    /*public get value(): string {
        return this.inputElement.value;
    }*/

    /*protected handleInput(_event: Event): void {
        if (this.allowedKeys && this.inputElement.value) {
            const rgbaRegex = /^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d*(?:\.\d+)?)\)$/i;
            if (rgbaRegex.test(this.inputElement.value)) {
                // Input value is in rgba format
                //console.log("valid value")
            } else {
                // Input value is not in rgba format
                //console.log("invalid value");
            }
        }

    }*/

    protected override render(): TemplateResult {
        return html`
            <sp-color-handle size="m" color="${this.value}"></sp-color-handle>
            ${super.render()}
        `;
    }
}
