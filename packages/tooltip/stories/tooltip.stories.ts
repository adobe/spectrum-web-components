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
import '../sp-tooltip.js';
import { html, ifDefined, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
import '@spectrum-web-components/button/sp-button.js';
import { Placement } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/overlay-trigger.js';

const iconOptions: {
    [key: string]: ({
        width,
        height,
        hidden,
        title,
    }?: {
        width?: number;
        height?: number;
        hidden?: boolean;
        title?: string;
    }) => TemplateResult | string;
} = {
    '': () => html``,
    negative: () =>
        html`
            <sp-icon-alert slot="icon"></sp-icon-alert>
        `,
    positive: () =>
        html`
            <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
        `,
    info: () =>
        html`
            <sp-icon-info slot="icon"></sp-icon-info>
        `,
};

export default {
    component: 'sp-tooltip',
    title: 'Tooltip',
};

interface Properties {
    open?: boolean;
    placement?: Placement;
    variant?: string;
    text?: string;
}

export const Default = ({
    open,
    placement,
    variant,
    text,
}: Properties): TemplateResult => {
    return html`
        <sp-tooltip ?open=${open} placement=${placement} variant=${variant}>
            ${text}
        </sp-tooltip>
    `;
};
Default.args = {
    open: true,
    placement: 'top',
    variant: '',
    text: 'Tooltip',
};
Default.argTypes = {
    open: {
        name: 'open',
        type: { name: 'boolean', required: false },
        description: 'Whether the tooltip is open.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    placement: {
        name: 'placement',
        type: { name: 'string', required: false },
        description: 'The placement of the tooltip in relation to its parent',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: 'top' },
        },
        control: {
            type: 'inline-radio',
            options: [
                'auto',
                'auto-start',
                'auto-end',
                'top',
                'bottom',
                'right',
                'left',
                'top-start',
                'top-end',
                'bottom-start',
                'bottom-end',
                'right-start',
                'right-end',
                'left-start',
                'left-end',
                'none',
            ],
        },
    },
    text: {
        name: 'text',
        type: { name: 'string', required: false },
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: '' },
        },
        control: 'text',
    },
    variant: {
        name: 'variant',
        type: { name: 'string', required: false },
        description: 'The style of the tooltip.',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: '' },
        },
        control: {
            type: 'inline-radio',
            options: ['info', 'positive', 'negative', ''],
        },
    },
};

export const wIcon = ({
    open,
    placement,
    variant,
    text,
}: Properties): TemplateResult => {
    return html`
        <sp-tooltip ?open=${open} placement=${placement} variant=${variant}>
            ${!!variant ? iconOptions[variant]() : html``} ${text}
        </sp-tooltip>
    `;
};
wIcon.args = {
    open: true,
    placement: 'top',
    text: 'Tooltip',
    variant: 'negative',
};
wIcon.argTypes = {
    open: {
        name: 'open',
        type: { name: 'boolean', required: false },
        description: 'Whether the tooltip is open.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    placement: {
        name: 'placement',
        type: { name: 'string', required: false },
        description: 'The placement of the tooltip in relation to its parent',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: 'top' },
        },
        control: {
            type: 'inline-radio',
            options: [
                'auto',
                'auto-start',
                'auto-end',
                'top',
                'bottom',
                'right',
                'left',
                'top-start',
                'top-end',
                'bottom-start',
                'bottom-end',
                'right-start',
                'right-end',
                'left-start',
                'left-end',
                'none',
            ],
        },
    },
    text: {
        name: 'text',
        type: { name: 'string', required: false },
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: '' },
        },
        control: 'text',
    },
    variant: {
        name: 'variant',
        type: { name: 'string', required: false },
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: '' },
        },
        control: {
            type: 'inline-radio',
            options: ['info', 'positive', 'negative', ''],
        },
    },
};

const overlayStyles = html`
    <style>
        html,
        body,
        #root,
        #root-inner,
        sp-story-decorator {
            height: 100%;
            margin: 0;
        }

        sp-story-decorator > div {
            display: contents;
        }

        sp-story-decorator::part(container) {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
        }

        overlay-trigger {
            flex: none;
            margin: 24px 0;
        }
    </style>
`;

const overlaid = (openPlacement: Placement): TemplateResult => {
    return html`
        ${overlayStyles}
        ${([
            ['bottom', ''],
            ['left', 'negative'],
            ['right', 'positive'],
            ['top', 'info'],
        ] as [Placement, string][]).map(([placement, variant]) => {
            return html`
                <overlay-trigger
                    placement=${placement}
                    open=${ifDefined(
                        openPlacement === placement ? 'hover' : undefined
                    )}
                >
                    <sp-button label="${placement} test" slot="trigger">
                        Hover for ${variant ? variant : 'tooltip'} on the
                        ${placement}
                    </sp-button>
                    <sp-tooltip slot="hover-content" variant=${variant}>
                        ${placement}
                    </sp-tooltip>
                </overlay-trigger>
            `;
        })}
    `;
};

export const overlaidTop = (): TemplateResult => overlaid('top');
export const overlaidRight = (): TemplateResult => overlaid('right');
export const overlaidBottom = (): TemplateResult => overlaid('bottom');
export const overlaidLeft = (): TemplateResult => overlaid('left');
