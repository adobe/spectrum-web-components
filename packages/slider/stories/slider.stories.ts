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
import { html } from 'lit-html';

import '../sp-slider.js';
import { Slider } from '../';
import { TemplateResult } from '@spectrum-web-components/base';

const action = (msg1: string) => (msg2: string | number): void =>
    console.log(msg1, msg2);

export default {
    component: 'sp-slider',
    title: 'Slider',
};

export const Default = (): TemplateResult => {
    const handleEvent = (event: Event): void => {
        const target = event.target as Slider;
        action(event.type)(target.value);
    };
    return html`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                max="100"
                min="0"
                value="50"
                @input=${handleEvent}
                @change=${handleEvent}
            >
                Opacity
            </sp-slider>
        </div>
    `;
};

export const Gradient = (): TemplateResult => {
    const handleEvent = (event: Event): void => {
        const target = event.target as Slider;
        action(event.type)(target.value);
    };
    return html`
        <div
            style="
                width: 500px;
                margin: 12px 20px;
                --spectrum-slider-track-color:linear-gradient(to right, red, green 100%);
                --spectrum-slider-track-color-rtl:linear-gradient(to left, red, green 100%);
            "
        >
            <sp-slider
                label="Opacity"
                max="100"
                min="0"
                value="50"
                id="opacity-slider"
                @input=${handleEvent}
                @change=${handleEvent}
            ></sp-slider>
        </div>
    `;
};

export const tick = (): TemplateResult => {
    return html`
        <sp-slider
            label="Slider Label"
            variant="tick"
            tick-step="5"
            min="0"
            max="92"
        ></sp-slider>
    `;
};

export const Disabled = (): TemplateResult => {
    return html`
        <div style="width: 500px; margin: 12px 20px;">
            <sp-slider
                disabled
                value="5"
                step="0.5"
                min="0"
                max="20"
                label="Intensity"
            ></sp-slider>
        </div>
    `;
};

export const focusTabDemo = (): TemplateResult => {
    const value = 50;
    const min = 0;
    const max = 100;
    const step = 1;
    return html`
        <div style="width: 500px; margin: 12px 20px 20px;">
            <sp-slider
                value="${value}"
                step="${step}"
                min="${min}"
                max="${max}"
                label="Opacity"
                id="opacity-slider-opacity"
            ></sp-slider>
        </div>
        <div style="width: 500px; margin: 20px;">
            <sp-slider
                value="${value}"
                step="${step}"
                min="${min}"
                max="${max}"
                label="Lightness"
                id="opacity-slider-lightness"
            ></sp-slider>
        </div>
        <div style="width: 500px; margin: 20px 20px 12px;">
            <sp-slider
                value="${value}"
                step="${step}"
                min="${min}"
                max="${max}"
                label="Saturation"
                id="opacity-slider-saturation"
            ></sp-slider>
        </div>
    `;
};
