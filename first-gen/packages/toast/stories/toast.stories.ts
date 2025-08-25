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

import '@spectrum-web-components/toast/sp-toast.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/overlay/sp-overlay.js';

import { Placement } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

const toast = ({
    variant = '',
    open = true,
    content = '',
    timeout = 0,
    iconLabel = '',
}): TemplateResult => html`
    <sp-toast
        variant=${variant as
            | ''
            | 'negative'
            | 'positive'
            | 'info'
            | 'error'
            | 'warning'}
        ?open=${open}
        timeout=${ifDefined(timeout)}
        .iconLabel=${iconLabel}
    >
        ${content}
        <sp-button
            slot="action"
            static-color="white"
            variant="secondary"
            treatment="outline"
        >
            Undo
        </sp-button>
    </sp-toast>
`;

export default {
    component: 'sp-toast',
    title: 'Toast',
    args: {
        content: 'This is a toast message.',
        open: true,
    },
    argTypes: {
        content: {
            name: 'content',
            type: { name: 'string', required: false },
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
        },
        open: {
            name: 'open',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        variant: {
            name: 'variant',
            options: ['', 'negative', 'positive', 'info', 'error', 'warning'],
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
            control: {
                type: 'select',
            },
        },
        timeout: {
            name: 'timeout',
            type: { name: 'number', required: false },
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: null },
            },
        },
        iconLabel: {
            name: 'iconLabel',
            type: { name: 'string', required: false },
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
        },
    },
};

interface Properties {
    variant: '' | 'negative' | 'positive' | 'info' | 'error' | 'warning';
    open: boolean;
    content: string;
    timeout: number;
    iconLabel: string;
    onClose: (event: Event) => void;
}

export const Default = ({
    variant,
    open,
    content,
    timeout,
    iconLabel,
}: Properties): TemplateResult => {
    return toast({ variant, open, content, timeout, iconLabel });
};

const variantDemo = ({
    variant,
    open,
    content,
    timeout,
    iconLabel,
}: Properties): TemplateResult => {
    return toast({ variant, open, content, timeout, iconLabel });
};

export const Positive = (args: Properties): TemplateResult =>
    variantDemo({ ...args, variant: 'positive' });

export const Negative = (args: Properties): TemplateResult =>
    variantDemo({ ...args, variant: 'negative' });

export const Info = (args: Properties): TemplateResult =>
    variantDemo({ ...args, variant: 'info' });

export const Wrapping = (args: Properties): TemplateResult =>
    variantDemo({
        ...args,
        variant: 'info',
        content:
            'A new version of Lightroom Classic is now available. Use the Update button below to start using the new version.',
    });

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
                        openPlacement === placement ? 'click' : undefined
                    )}
                >
                    <sp-button label="${placement} test" slot="trigger">
                        Click for ${variant ? variant : 'toast'} on the
                        ${placement}
                    </sp-button>
                    <sp-toast slot="click-content" variant=${variant}>
                        ${placement}
                    </sp-toast>
                </overlay-trigger>
            `;
        })}
    `;
};

export const overlaidTop = (): TemplateResult => overlaid('top');
export const overlaidRight = (): TemplateResult => overlaid('right');
export const overlaidBottom = (): TemplateResult => overlaid('bottom');
export const overlaidLeft = (): TemplateResult => overlaid('left');

export const overlay = (args: Properties): TemplateResult => {
    return html`
        <style>
            sp-toast {
                position: fixed;
                bottom: 1em;
                left: 1em;
            }
        </style>
        <sp-button id="overlay">Toggle Toast overlay</sp-button>
        <sp-overlay trigger="overlay@click" type="auto" open>
            ${variantDemo({ ...args, variant: 'positive' })}
        </sp-overlay>
    `;
};
