/*
Copyright 2025 Adobe. All rights reserved.
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
import { TextfieldBase } from '@spectrum-web-components/textfield';

/**
 * @element sp-color-field
 * @fires input - The value of the color-field has changed.
 * @fires change - An alteration to the value of the color-field has been committed by the user.
 */
export class ColorField extends TextfieldBase {
    public static override get styles(): CSSResultArray {
        return [...super.styles];
    }

    @property({ type: Boolean, attribute: 'view-color' })
    public viewColor = false;

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

    private cachedColor: string | null = null;

    public getColorValue(): string {
        if (!this.value) {
            return '';
        }

        if (!this.cachedColor || this.cachedColor !== this.value) {
            const tinyColor = new TinyColor(this.value);
            this.cachedColor = tinyColor.isValid ? tinyColor.toRgbString() : '';
        }

        return this.cachedColor;
    }

    private renderColorHandle(): TemplateResult {
        return this.viewColor
            ? html`
                  <sp-color-handle
                      size="m"
                      color="${this.getColorValue()}"
                  ></sp-color-handle>
              `
            : html``;
    }

    protected override render(): TemplateResult {
        if (this.viewColor) {
            import('@spectrum-web-components/color-handle/sp-color-handle.js');
        }
        return html`
            ${super.render()} ${this.renderColorHandle()}
        `;
    }

    private cachedTinyColor: TinyColor | null = null;

    public override checkValidity(): boolean {
        let validity = super.checkValidity();
        if (this.value) {
            if (
                !this.cachedTinyColor ||
                this.cachedTinyColor.originalInput !== this.value
            ) {
                this.cachedTinyColor = new TinyColor(this.value);
            }
            this.valid = validity = this.cachedTinyColor.isValid;
            this.invalid = !validity;
        }
        return validity;
    }
}
