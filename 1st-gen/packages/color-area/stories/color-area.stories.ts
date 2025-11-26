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

import '@spectrum-web-components/color-slider/sp-color-slider.js';
import { ColorSlider } from '@spectrum-web-components/color-slider/src/ColorSlider';
import '@spectrum-web-components/color-area/sp-color-area.js';
import { ColorArea } from '@spectrum-web-components/color-area/src/ColorArea.js';

export default {
    title: 'Color/Area',
    component: 'sp-color-area',
    argTypes: {
        onInput: { action: 'input' },
        onChange: { action: 'change' },
        color: {
            name: 'color',
            type: { name: 'ColorTypes', required: 'true' },
            description: 'The color displayed by the ColorArea.',
            table: {
                type: { summary: 'ColorTypes' },
                defaultValue: { summary: '' },
            },
            control: 'text',
        },
    },
};

type StoryArgs = {
    onInput: (val: string) => void;
    onChange: (val: string) => void;
};

export const Default = ({ onChange, onInput }: StoryArgs): TemplateResult => {
    return html`
        <sp-color-area
            color="#ff0000"
            @input=${({ target }: Event & { target: ColorArea }) => {
                const next = target.nextElementSibling as HTMLElement;
                next.textContent = target.color as string;
                next.style.color = target.color as string;
                onInput(target.value as string);
            }}
            @change=${({ target }: Event & { target: ColorArea }) => {
                onChange(target.value as string);
            }}
        ></sp-color-area>
        <div style="color: #ff0000" aria-live="off">#ff0000</div>
    `;
};

export const appliedValues = (): TemplateResult => {
    return html`
        <sp-color-area
            .color=${{ space: 'hsv', coords: [250, 90, 80] }}
        ></sp-color-area>
        <sp-color-area color="hsv(250, 90%, 80%)"></sp-color-area>
        <sp-color-area hue="250" x="0.1" y="0.1"></sp-color-area>
    `;
};

export const joint = (): TemplateResult => {
    return html`
        <div>
            <sp-color-area
                color="hsv (0 100% 100%)"
                @input=${({ target }: Event & { target: ColorArea }) => {
                    const next = target.nextElementSibling as ColorSlider;
                    const display = next.nextElementSibling as HTMLElement;
                    display.textContent = target.color as string;
                    display.style.color = target.color as string;
                    next.color = target.color;
                }}
            ></sp-color-area>
            <sp-color-slider
                color="hsv(0 100% 100%)"
                @input=${({
                    target: {
                        color,
                        previousElementSibling,
                        nextElementSibling,
                    },
                }: Event & {
                    target: ColorSlider & {
                        previousElementSibling: ColorArea;
                        nextElementSibling: HTMLDivElement;
                    };
                }): void => {
                    previousElementSibling.color = color;
                    nextElementSibling.textContent = color as string;
                    nextElementSibling.style.color = color as string;
                }}
            ></sp-color-slider>
            <div style="color: hsv(0, 100%, 100%)">hsv(0, 100%, 100%)</div>
        </div>
    `;
};

export const disabled = (): TemplateResult => {
    return html`
        <sp-color-area disabled></sp-color-area>
    `;
};

export const sized = (): TemplateResult => {
    return html`
        <sp-color-area style="width: 72px; height: 72px"></sp-color-area>
    `;
};

export const canvas = (): TemplateResult => {
    return html`
        <sp-color-area>
            <canvas slot="gradient"></canvas>
        </sp-color-area>
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

                    const gradB = context.createLinearGradient(
                        0,
                        0,
                        0,
                        canvas.height
                    );
                    gradB.addColorStop(0, 'white');
                    gradB.addColorStop(1, 'black');
                    const gradC = context.createLinearGradient(
                        0,
                        0,
                        canvas.width,
                        0
                    );
                    gradC.addColorStop(0, 'hsla(0,100%,50%,0)');
                    gradC.addColorStop(1, 'hsla(0,100%,50%,1)');

                    context.fillStyle = gradB;
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    context.fillStyle = gradC;
                    context.globalCompositeOperation = 'multiply';
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    context.globalCompositeOperation = 'source-over';
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

customElements.define('area-canvas-writer', CanvasWriter);

canvas.decorators = [
    (story: () => TemplateResult): TemplateResult => {
        return html`
            ${story()}
            <area-canvas-writer></area-canvas-writer>
        `;
    },
];
