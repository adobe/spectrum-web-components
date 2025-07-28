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
import { spreadProps } from '../../../test/lit-helpers.js';

import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-properties.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-view-all-tags.js';

export default {
    title: 'Action Group/Sizes',
    component: 'sp-action-group',
    args: {
        compact: false,
        emphasized: false,
        justified: false,
        quiet: false,
        vertical: false,
        size: 'm',
    },
    argTypes: {
        compact: {
            name: 'compact',
            description:
                'Visually joins the buttons together to clarify their relationship to one another.',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        emphasized: {
            name: 'emphasized',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        justified: {
            name: 'justified',
            description:
                'Aligns the action group items to use all the available space on that line.',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        quiet: {
            name: 'quiet',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        vertical: {
            name: 'vertical',
            description: 'Changes the orientation of the action group.',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        size: {
            name: 'size',
            description: 'The size at which to display the action group.',
            type: { name: 'string', required: true },
            table: {
                type: { summary: '"s" | "m" | "l" | "xl"' },
                defaultValue: { summary: 'm' },
            },
            control: {
                type: 'select',
                options: ['s', 'm', 'l', 'xl'],
            },
        },
    },
};

interface Properties {
    compact?: boolean;
    emphasized?: boolean;
    justified?: boolean;
    quiet?: boolean;
    vertical?: boolean;
    size?: 's' | 'm' | 'l' | 'xl';
    [prop: string]: unknown;
}

function renderButtons(args: Properties): TemplateResult {
    return html`
        <sp-action-group ${spreadProps(args)}>
            <sp-action-button>Button 1</sp-action-button>
            <sp-action-button>Longer Button 2</sp-action-button>
            <sp-action-button>Short 3</sp-action-button>
        </sp-action-group>
    `;
}

export const XS = (args: Properties): TemplateResult => renderButtons(args);
XS.args = { size: 'xs' };

export const s = (args: Properties): TemplateResult => renderButtons(args);
s.args = { size: 's' };

export const m = (args: Properties): TemplateResult => renderButtons(args);
m.args = { size: 'm' };

export const l = (args: Properties): TemplateResult => renderButtons(args);
l.args = { size: 'l' };

export const XL = (args: Properties): TemplateResult => renderButtons(args);
XL.args = { size: 'xl' };

export const XSVertical = (args: Properties): TemplateResult =>
    renderButtons(args);
XSVertical.args = {
    vertical: true,
    size: 'xs',
};
export const sVertical = (args: Properties): TemplateResult =>
    renderButtons(args);
sVertical.args = {
    vertical: true,
    size: 's',
};

export const mVertical = (args: Properties): TemplateResult =>
    renderButtons(args);
mVertical.args = {
    vertical: true,
    size: 'm',
};

export const lVertical = (args: Properties): TemplateResult =>
    renderButtons(args);
lVertical.args = {
    vertical: true,
    size: 'l',
};

export const XLVertical = (args: Properties): TemplateResult =>
    renderButtons(args);
XLVertical.args = {
    vertical: true,
    size: 'xl',
};
