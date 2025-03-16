/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { html, TemplateResult } from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

import '@spectrum-web-components/swatch/sp-swatch.js';
import type {
    SwatchBorder,
    SwatchRounding,
    SwatchShape,
} from '../src/Swatch.js';

export interface Properties {
    color: string;
    border: SwatchBorder | 'normal';
    rounding: SwatchRounding | 'normal';
    shape: SwatchShape | 'normal';
    mixedValue?: boolean;
    nothing?: boolean;
}

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

export const Default = {
    render: (args: Properties): TemplateResult => template(args),
};

export const gradient = {
    render: (args: Properties): TemplateResult => template(args),

    args: {
        color: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
    },
};

export const opacity = {
    render: (args: Properties): TemplateResult => template(args),

    args: {
        color: 'rgba(255, 0, 0, 0.3)',
    },
};

export const mixedValue = {
    render: (args: Properties): TemplateResult => template(args),

    args: {
        mixedValue: true,
        color: '',
    },
};

export const nothing = {
    render: (args: Properties): TemplateResult => template(args),

    args: {
        nothing: true,
        color: '',
    },
};

export const borderLight = {
    render: (args: Properties): TemplateResult => template(args),

    args: {
        border: 'light',
    },
};

export const borderNone = {
    render: (args: Properties): TemplateResult => template(args),

    args: {
        border: 'none',
    },
};

export const roundingNone = {
    render: (args: Properties): TemplateResult => template(args),

    args: {
        rounding: 'none',
    },
};

export const roundingFull = {
    render: (args: Properties): TemplateResult => template(args),

    args: {
        rounding: 'full',
    },
};

export const shapeRectangle = {
    render: (args: Properties): TemplateResult => template(args),

    args: {
        shape: 'rectangle',
    },
};
