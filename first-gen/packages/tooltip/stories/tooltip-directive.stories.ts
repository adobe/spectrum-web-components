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
import { tooltip } from '@spectrum-web-components/tooltip/src/tooltip-directive.js';
import { html, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { Placement } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/overlay-trigger.js';

export default {
    component: 'sp-tooltip',
    title: 'Tooltip Directive',
};

interface Properties {
    open?: boolean;
    placement?: Placement;
    text?: string;
    variant?: string;
    offset?: number;
    delayed?: boolean;
}

export const Default = ({
    open,
    placement,
    text,
    variant,
}: Properties): TemplateResult => {
    return html`
        <sp-button
            ${tooltip(
                () => html`
                    ${text || 'Tooltip'}
                `,
                {
                    open,
                    overlayOptions: { placement },
                    variant,
                }
            )}
        >
            Hover me
        </sp-button>
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
Default.swc_vrt = {
    skip: true,
};

Default.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};
