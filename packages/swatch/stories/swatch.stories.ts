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
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

import '@spectrum-web-components/swatch/sp-swatch.js';
import type {
    SwatchBorder,
    SwatchRounding,
    SwatchShape,
} from '../src/Swatch.js';

type Properties = {
    color: string;
    border: SwatchBorder | 'normal';
    rounding: SwatchRounding | 'normal';
    shape: SwatchShape | 'normal';
    mixedValue?: boolean;
    nothing?: boolean;
};

export default {
    title: 'Swatch',
    component: 'sp-swatch',
    args: {
        color: '#ff0000',
    },
    argTypes: {
        color: { control: 'color' },
        border: {
            name: 'border',
            type: { name: 'string', required: false },
            description: 'The border to apply to the Swatch children.',
            table: {
                defaultValue: { summary: '' },
            },
            control: {
                type: 'inline-radio',
                options: ['normal', 'light', 'none'],
            },
        },
        rounding: {
            name: 'rounding',
            type: { name: 'string', required: false },
            description: 'The rounding to apply to the Swatch children.',
            table: {
                defaultValue: { summary: '' },
            },
            control: {
                type: 'inline-radio',
                options: ['normal', 'none', 'full'],
            },
        },
        shape: {
            name: 'shape',
            type: { name: 'string', required: false },
            description: 'The shape to apply to the Swatch children.',
            table: {
                defaultValue: { summary: '' },
            },
            control: {
                type: 'inline-radio',
                options: ['normal', 'rectangle'],
            },
        },
    },
};

const template = ({
    color,
    border,
    rounding,
    shape,
    mixedValue,
    nothing,
}: Properties): TemplateResult => {
    return html`
        <sp-swatch
            border=${ifDefined(border === 'normal' ? undefined : border)}
            rounding=${ifDefined(rounding === 'normal' ? undefined : rounding)}
            shape=${ifDefined(shape === 'normal' ? undefined : shape)}
            color=${color}
            ?mixed-value=${mixedValue}
            ?nothing=${nothing}
        ></sp-swatch>
    `;
};

export const Default = (args: Properties): TemplateResult => template(args);
export const gradient = (args: Properties): TemplateResult => template(args);
gradient.args = {
    color: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
};
export const opacity = (args: Properties): TemplateResult => template(args);
opacity.args = {
    color: 'rgba(255, 0, 0, 0.3)',
};
export const mixedValue = (args: Properties): TemplateResult => template(args);
mixedValue.args = {
    mixedValue: true,
    color: '',
};
export const nothing = (args: Properties): TemplateResult => template(args);
nothing.args = {
    nothing: true,
    color: '',
};
export const borderLight = (args: Properties): TemplateResult => template(args);
borderLight.args = {
    border: 'light',
};
export const borderNone = (args: Properties): TemplateResult => template(args);
borderNone.args = {
    border: 'none',
};
export const roundingNone = (args: Properties): TemplateResult =>
    template(args);
roundingNone.args = {
    rounding: 'none',
};
export const roundingFull = (args: Properties): TemplateResult =>
    template(args);
roundingFull.args = {
    rounding: 'full',
};
export const shapeRectangle = (args: Properties): TemplateResult =>
    template(args);
shapeRectangle.args = {
    shape: 'rectangle',
};
