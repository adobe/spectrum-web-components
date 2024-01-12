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

import { property } from '@spectrum-web-components/base/src/decorators.js';
import { TinyColor } from '@ctrl/tinycolor';
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

    @property({ type: Boolean, reflect: true })
    public devMode = false;

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

    public renderColorHandle(): TemplateResult {
        return this.devMode
            ? html`
                  <sp-color-handle size="m" color=""></sp-color-handle>
              `
            : html``;
    }

    protected override render(): TemplateResult {
        return html`
            ${super.render()} ${this.renderColorHandle()}
        `;
    }

    public override checkValidity(): boolean {
        let validity = super.checkValidity();
        if (this.value) {
            const colorHandle =
                this.shadowRoot?.querySelector('sp-color-handle');
            const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            const rgbaRegex =
                /^rgba\(\s*(2[0-4]\d|25[0-5]|[01]?\d{1,2})\s*,\s*(2[0-4]\d|25[0-5]|[01]?\d{1,2})\s*,\s*(2[0-4]\d|25[0-5]|[01]?\d{1,2})\s*,\s*(1|0(\.\d+)?)\s*\)$/i;
            const rgbColorRegex =
                /^rgb\(\s*(2[0-4]\d|25[0-5]|[01]?\d{1,2})\s*,\s*(2[0-4]\d|25[0-5]|[01]?\d{1,2})\s*,\s*(2[0-4]\d|25[0-5]|[01]?\d{1,2})\s*\)$/i;
            const hsvColorRegex =
                /^hsv\(\s*(360|3[0-5]\d|[12]?\d{1,2})\s*,\s*(100|[1-9]?\d)%\s*,\s*(100|[1-9]?\d)%\s*\)$/i;
            const hslColorRegex =
                /^hsl\(\s*(360|3[0-5]\d|[12]?\d{1,2})\s*,\s*(100|[1-9]?\d)%\s*,\s*(100|[1-9]?\d)%\s*\)$/i;
            const cmykColorRegex =
                /^cmyk\(\s*(100|[1-9]?\d)%\s*,\s*(100|[1-9]?\d)%\s*,\s*(100|[1-9]?\d)%\s*,\s*(100|[1-9]?\d)%\s*\)$/i;
            if (
                rgbaRegex.test(this.value) ||
                rgbColorRegex.test(this.value) ||
                hexColorRegex.test(this.value) ||
                cmykColorRegex.test(this.value) ||
                hsvColorRegex.test(this.value) ||
                hslColorRegex.test(this.value)
            ) {
                // Input value is in rgba format
                validity = true;
                this.valid = validity;
                colorHandle?.setAttribute(
                    'color',
                    new TinyColor(this.value).toRgbString()
                );
            } else {
                // Input value is not in rgba | Hex format
                validity = false;
                this.valid = validity;
                colorHandle?.setAttribute('color', '');
            }
            this.valid = validity;
            this.invalid = !validity;
        }
        return validity;
    }
}
