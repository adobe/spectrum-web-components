/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/color-wheel/sp-color-wheel.js';

export default {
    title: 'Color/Wheel',
    component: 'sp-color-wheel',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-color-wheel></sp-color-wheel>
    `;
};

export const StepSize = (): TemplateResult => {
    return html`
        <div style="display: flex; gap: 20px; align-items: center;">
            <div style="text-align: center;">
                <sp-color-wheel step="0.5"></sp-color-wheel>
                <p style="margin: 8px 0 0 0; font-size: 14px; color: #666;">
                    Step: 0.5°
                </p>
            </div>
            <div style="text-align: center;">
                <sp-color-wheel step="1"></sp-color-wheel>
                <p style="margin: 8px 0 0 0; font-size: 14px; color: #666;">
                    Step: 1°
                </p>
            </div>
            <div style="text-align: center;">
                <sp-color-wheel step="10"></sp-color-wheel>
                <p style="margin: 8px 0 0 0; font-size: 14px; color: #666;">
                    Step: 10°
                </p>
            </div>
            <div style="text-align: center;">
                <sp-color-wheel step="50"></sp-color-wheel>
                <p style="margin: 8px 0 0 0; font-size: 14px; color: #666;">
                    Step: 50°
                </p>
            </div>
        </div>
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
    return html`
        <sp-color-wheel>
            <canvas slot="gradient"></canvas>
        </sp-color-wheel>
    `;
};

class CanvasWriter extends HTMLElement {
    writeToCanvas(): void {
        const { previousElementSibling } = this;
        if (previousElementSibling) {
            const canvas = previousElementSibling.querySelector(
                'canvas[slot="gradient"]'
            ) as HTMLCanvasElement;

            if (canvas) {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
                const context = canvas.getContext('2d');
                if (context) {
                    context.rect(0, 0, canvas.width, canvas.height);

                    const width = canvas.width;
                    const height = canvas.height;
                    const centerX = width / 2;
                    const centerY = height / 2;
                    const ringSize = centerX - 18;

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
            }
        }
    }

    constructor() {
        super();
        this.writeStatePromise = new Promise((res) => {
            requestAnimationFrame(() => {
                this.writeToCanvas();
                res(true);
            });
        });
    }

    private writeStatePromise: Promise<boolean> = Promise.resolve(false);

    get updateComplete(): Promise<boolean> {
        return this.writeStatePromise;
    }
}

customElements.define('wheel-canvas-writer', CanvasWriter);

canvas.decorators = [
    (story: () => TemplateResult): TemplateResult => {
        return html`
            ${story()}
            <wheel-canvas-writer></wheel-canvas-writer>
        `;
    },
];
