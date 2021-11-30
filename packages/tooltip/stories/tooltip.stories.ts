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
import { html, TemplateResult } from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
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
    offset?: number;
    delayed?: boolean;
}

export const Default = ({
    open,
    placement,
    variant,
    text,
}: Properties): TemplateResult => {
    return html`
        <sp-tooltip
            ?open=${open}
            placement=${placement}
            variant=${variant}
            managed
        >
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
        <sp-tooltip
            ?open=${open}
            placement=${placement}
            variant=${variant}
            managed
        >
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

        .self-managed:nth-child(3) {
            margin-left: 50px;
        }
    </style>
`;

const overlaid = (openPlacement: Placement): TemplateResult => {
    return html`
        ${overlayStyles}
        ${(
            [
                ['bottom', ''],
                ['left', 'negative'],
                ['right', 'positive'],
                ['top', 'info'],
            ] as [Placement, string][]
        ).map(([placement, variant]) => {
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
                    <sp-tooltip slot="hover-content" variant=${variant} managed>
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

export const selfManaged = ({
    placement,
    offset,
    delayed,
}: Properties): TemplateResult => html`
    ${overlayStyles}
    <sp-action-button class="self-managed">
        This is a button.
        <sp-tooltip
            self-managed
            placement=${placement}
            offset=${offset}
            ?delayed=${delayed}
            open
        >
            This is a tooltip.
        </sp-tooltip>
    </sp-action-button>
`;
selfManaged.args = {
    placement: 'top',
    offset: 6,
    delayed: false,
};
selfManaged.argTypes = {
    delayed: {
        name: 'delayed',
        type: { name: 'boolean', required: false },
        description: 'Whether to manage the tooltip with the warmup timer',
    },
    offset: {
        name: 'offset',
        type: { name: 'number', required: false },
        description:
            'The pixel distance from the parent element to place the tooltip',
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
};
