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

import { html, TemplateResult } from '@spectrum-web-components/base';

import '../sp-color-slider.js';
import { gradient } from './images.js';
export default {
    title: 'Color/Slider',
    component: 'sp-color-slider',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-color-slider></sp-color-slider>
    `;
};

// export const alpha = (): TemplateResult => {
//     return html`
//         <sp-color-slider
//             style="--sp-color-slider-gradient: rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%;"
//             color="rgba(0, 0, 0, 1)"
//         ></sp-color-slider>
//     `;
// };

export const disabled = (): TemplateResult => {
    return html`
        <sp-color-slider disabled></sp-color-slider>
    `;
};

export const vertical = (): TemplateResult => {
    return html`
        <sp-color-slider vertical></sp-color-slider>
    `;
};

export const canvas = (): TemplateResult => {
    requestAnimationFrame(() => {
        const canvas = document.querySelector(
            'canvas[slot="gradient"]'
        ) as HTMLCanvasElement;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const context = canvas.getContext('2d');
        if (context) {
            context.rect(0, 0, canvas.width, canvas.height);

            const gradient = context.createLinearGradient(
                0,
                0,
                canvas.width,
                canvas.height
            );

            gradient.addColorStop(0, 'rgb(255, 0, 0)');
            gradient.addColorStop(0.17, 'rgb(255, 255, 0)');
            gradient.addColorStop(0.33, 'rgb(0, 255, 0)');
            gradient.addColorStop(0.5, 'rgb(0, 255, 255)');
            gradient.addColorStop(0.67, 'rgb(0, 0, 255)');
            gradient.addColorStop(0.83, 'rgb(255, 0, 255)');
            gradient.addColorStop(1, 'rgb(255, 0, 0)');

            context.fillStyle = gradient;
            context.fill();
        }
    });
    return html`
        <sp-color-slider color="rgb(255, 0, 0)">
            <canvas slot="gradient" role="presentation"></canvas>
        </sp-color-slider>
    `;
};

export const image = (): TemplateResult => {
    return html`
        <sp-color-slider color="rgb(255, 0, 0)">
            <img slot="gradient" role="presentation" src=${gradient} />
        </sp-color-slider>
    `;
};
