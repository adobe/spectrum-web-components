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

import '@spectrum-web-components/swatch/sp-swatch-group.js';
import '@spectrum-web-components/swatch/sp-swatch.js';
import type {
    SwatchBorder,
    SwatchRounding,
    SwatchShape,
} from '../src/Swatch.js';
import { SwatchGroup } from '../src/SwatchGroup.js';

type Properties = {
    border: SwatchBorder | 'normal';
    density?: 'normal' | 'spacious' | 'compact';
    rounding?: SwatchRounding | 'normal';
    selected?: string[];
    selects?: 'none' | 'single' | 'multiple';
    shape?: SwatchShape | 'normal';
};

export default {
    title: 'Swatch group',
    component: 'sp-swatch-group',
    args: {},
    argTypes: {
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
        density: {
            name: 'density',
            type: { name: 'string', required: false },
            description: 'The density at which to display the Swatch children.',
            table: {
                defaultValue: { summary: '' },
            },
            control: {
                type: 'inline-radio',
                options: ['normal', 'compact', 'spacious'],
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
        selects: {
            name: 'selects',
            type: { name: 'string', required: false },
            description:
                'Whether the Swatch Group manages a selection, and whether it is a sinlge or multiple selection.',
            table: {
                defaultValue: { summary: '' },
            },
            control: {
                type: 'inline-radio',
                options: ['none', 'single', 'multiple'],
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
    decorators: [
        (
            story: () => TemplateResult,
            {
                args: { selected = [] },
            }: {
                args: {
                    selected: string[];
                };
            }
        ): TemplateResult => html`
            <div
                @change=${async (event: Event & { target: SwatchGroup }) => {
                    await 0;
                    if (event.defaultPrevented) return;
                    const next = event.target
                        .nextElementSibling as HTMLDivElement;
                    next.textContent = `Selected: ${JSON.stringify(
                        event.target.selected
                    )}`;
                }}
            >
                ${story()}
                <div>Selected: ${JSON.stringify(selected)}</div>
            </div>
        `,
    ],
};

const colors = [
    '--spectrum-gray-700',
    '--spectrum-red-700',
    '--spectrum-orange-700',
    '--spectrum-yellow-700',
    '--spectrum-chartreuse-700',
    '--spectrum-celery-700',
    '--spectrum-green-700',
    '--spectrum-seafoam-700',
    '--spectrum-blue-700',
    '--spectrum-indigo-700',
    '--spectrum-purple-700',
    '--spectrum-fuchsia-700',
    '--spectrum-magenta-700',
];

const template = ({
    border,
    density,
    rounding,
    selects,
    selected = [],
    shape,
}: Properties): TemplateResult => {
    const groupLabel = !!selects
        ? selects === 'single'
            ? 'Select a color'
            : 'Selects color(s)'
        : undefined;
    return html`
        <sp-swatch-group
            border=${ifDefined(border === 'normal' ? undefined : border)}
            density=${ifDefined(density === 'normal' ? undefined : density)}
            rounding=${ifDefined(rounding === 'normal' ? undefined : rounding)}
            selects=${ifDefined(selects === 'none' ? undefined : selects)}
            .selected=${selected}
            shape=${ifDefined(shape === 'normal' ? undefined : shape)}
            aria-label=${ifDefined(groupLabel)}
        >
            ${colors.map(
                (color) => html`
                    <sp-swatch
                        color="var(${color})"
                        label=${color}
                        value=${color}
                    ></sp-swatch>
                `
            )}
        </sp-swatch-group>
    `;
};

export const Default = (args: Properties): TemplateResult => template(args);
Default.args = {} as Properties;
export const densityCompact = (args: Properties): TemplateResult =>
    template(args);
densityCompact.args = {
    density: 'compact',
} as Properties;
export const densitySpacious = (args: Properties): TemplateResult =>
    template(args);
densitySpacious.args = {
    density: 'spacious',
} as Properties;
export const selectsSingle = (args: Properties): TemplateResult =>
    template(args);
selectsSingle.args = {
    selects: 'single',
    selected: ['--spectrum-yellow-500'],
} as Properties;
export const selectsMultiple = (args: Properties): TemplateResult =>
    template(args);
selectsMultiple.args = {
    selects: 'multiple',
    selected: [
        '--spectrum-celery-500',
        '--spectrum-red-500',
        '--spectrum-purple-500',
        '--spectrum-blue-500',
    ],
} as Properties;
export const borderLight = (args: Properties): TemplateResult => template(args);
borderLight.args = {
    border: 'light',
} as Properties;
export const borderNone = (args: Properties): TemplateResult => template(args);
borderNone.args = {
    border: 'none',
} as Properties;
export const roundingNone = (args: Properties): TemplateResult =>
    template(args);
roundingNone.args = {
    rounding: 'none',
} as Properties;
export const roundingFull = (args: Properties): TemplateResult =>
    template(args);
roundingFull.args = {
    rounding: 'full',
} as Properties;
export const shapeRectangle = (args: Properties): TemplateResult =>
    template(args);
shapeRectangle.args = {
    shape: 'rectangle',
} as Properties;
