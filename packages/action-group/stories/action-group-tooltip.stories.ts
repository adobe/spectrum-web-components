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
import { spreadProps } from '../../../test/lit-helpers.js';

import '../sp-action-group.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-properties.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-view-all-tags.js';
import { ActionGroup } from '../src/ActionGroup.js';

export default {
    title: 'Action Group/Tooltips',
    component: 'sp-action-group',
    args: {
        compact: false,
        emphasized: false,
        justified: false,
        quiet: false,
        vertical: false,
        selects: 'none',
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
        selects: {
            name: 'selects',
            description:
                'Whether the elements selects its children and how many it can select at a time.',
            table: {
                defaultValue: { summary: '' },
            },
            control: {
                type: 'inline-radio',
                options: ['none', 'single', 'multiple'],
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
    selects?: 'none' | 'single' | 'multiple';
    [prop: string]: any;
}

const template = (args: Properties): TemplateResult => {
    return html`
        <sp-action-group
            label="Favorite Color"
            ...=${spreadProps(args)}
            @change=${({ target }: Event & { target: ActionGroup }) => {
                const next = target.nextElementSibling as HTMLDivElement;
                next.textContent = `Selected: ${JSON.stringify(
                    target.selected
                )}`;
            }}
        >
            <overlay-trigger>
                <sp-action-button slot="trigger">Red</sp-action-button>
                <sp-tooltip slot="hover-content">
                    This is a cool color.
                </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger">Green</sp-action-button>
                <sp-tooltip slot="hover-content">
                    You wouldn't be wrong.
                </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger" value="blue" selected>
                    Blue
                </sp-action-button>
                <sp-tooltip slot="hover-content">The sky in spring.</sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger">Yellow</sp-action-button>
                <sp-tooltip slot="hover-content">The sun at noon.</sp-tooltip>
            </overlay-trigger>
        </sp-action-group>
        ${args.selects == 'none'
            ? html``
            : html`
                  <div>Selected:</div>
              `}
    `;
};

export const selectsSingle = (args: Properties): TemplateResult =>
    template(args);
selectsSingle.args = {
    compact: true,
    emphasized: true,
    selects: 'single',
};

export const selectsMultiple = (args: Properties): TemplateResult =>
    template(args);
selectsMultiple.args = {
    compact: true,
    emphasized: true,
    selects: 'multiple',
};

export const justified = (args: Properties): TemplateResult => template(args);
justified.args = {
    compact: true,
    emphasized: true,
    justified: true,
};

export const vertical = (args: Properties): TemplateResult => template(args);
vertical.args = {
    compact: true,
    emphasized: true,
    vertical: true,
};
