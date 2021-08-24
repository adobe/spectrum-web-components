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
    SpectrumElement,
    CSSResultArray,
    TemplateResult,
    property,
    PropertyValues,
} from '@spectrum-web-components/base';

import '@spectrum-web-components/color-loupe/sp-color-loupe.js';
import { HSL, HSLA, HSV, HSVA, RGB, RGBA, TinyColor } from '@ctrl/tinycolor';
import styles from './color-handle.css.js';

export type ColorValue =
    | string
    | number
    | TinyColor
    | HSVA
    | HSV
    | RGB
    | RGBA
    | HSL
    | HSLA;

export const extractHueAndSaturationRegExp = /^hs[v|l]a?\s?\((\d{1,3}\.?\d*?),?\s?(\d{1,3})/;
export const replaceHueAndSaturationRegExp = /(^hs[v|l]a?\s?\()\d{1,3}\.?\d*?(,?\s?)\d{1,3}/;
export const replaceHueRegExp = /(^hs[v|l]a?\()\d{1,3}/;

/**
 * @element sp-color-handle
 */
export class ColorHandle extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public focused = false;

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: String })
    public color = 'rgba(255, 0, 0, 0.5)';

    private handlePointerdown(event: PointerEvent): void {
        if (event.pointerType === 'touch') {
            this.open = true;
        }
        this.setPointerCapture(event.pointerId);
    }

    private handlePointerup(event: PointerEvent): void {
        this.open = false;
        this.releasePointerCapture(event.pointerId);
    }

    protected render(): TemplateResult {
        return html`
            <div class="color" style="background-color: ${this.color}"></div>
            <sp-color-loupe
                color=${this.color}
                ?open=${this.open && !this.disabled}
            ></sp-color-loupe>
        `;
    }

    protected firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);
        this.addEventListener('pointerdown', this.handlePointerdown);
        this.addEventListener('pointerup', this.handlePointerup);
        this.addEventListener('pointercancel', this.handlePointerup);
    }
}
