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

import '../sp-color-wheel.js';

export default {
    title: 'Color/Wheel',
    component: 'sp-color-wheel',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-color-wheel
            @input=${() => console.log('inpoot')}
            @change=${() => console.log('cabbage')}
        ></sp-color-wheel>
    `;
};

export const sized = (): TemplateResult => {
    return html`
        <sp-color-wheel style="width: 300px; height: 300px;"></sp-color-wheel>
    `;
};

export const wheelDisabled = (): TemplateResult => {
    return html`
        <sp-color-wheel disabled></sp-color-wheel>
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

            const width = canvas.width;
            const height = canvas.height;
            const centerX = width / 2;
            const centerY = height / 2;
            const ringSize = 57;

            for (let i = 0; i < 360; i += Math.PI / 8) {
                const rad = (i * (2 * Math.PI)) / 360;
                context.strokeStyle = `hsla(${i}, 100%, 50%, 1.0)`;
                context.beginPath();
                context.moveTo(
                    centerX + ringSize * Math.cos(rad),
                    centerY + ringSize * Math.sin(rad)
                );
                context.lineTo(
                    centerX + centerX * Math.cos(rad),
                    centerY + centerY * Math.sin(rad)
                );
                context.stroke();
            }
        }
    });
    return html`
        <sp-color-wheel>
            <canvas slot="gradient"></canvas>
        </sp-color-wheel>
    `;
};
