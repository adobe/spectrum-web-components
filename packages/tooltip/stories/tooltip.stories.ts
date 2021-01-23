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
import { boolean, html, select, text } from '@open-wc/demoing-storybook';
import { ifDefined, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/icon/sp-icon';
import {
    AlertIcon,
    CheckmarkIcon,
    InfoIcon,
} from '@spectrum-web-components/icons-workflow';
import '@spectrum-web-components/icons/sp-icons-medium.js';
import '../sp-tooltip.js';

const tipOptions = ['top', 'bottom', 'left', 'right'];

const variantOptions = ['', 'info', 'positive', 'negative'];

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
    negative: AlertIcon,
    positive: CheckmarkIcon,
    info: InfoIcon,
};

export default {
    component: 'sp-tooltip',
    title: 'Tooltip',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-tooltip
            ?open=${boolean('Open', true, 'Element')}
            placement=${select(
                'Tip direction',
                tipOptions,
                tipOptions[0],
                'Element'
            )}
            variant=${select(
                'Variant',
                variantOptions,
                variantOptions[0],
                'Element'
            )}
        >
            ${text('Tip text', 'Tooltip', 'Element')}
        </sp-tooltip>
    `;
};

export const wIcon = (): TemplateResult => {
    const variant = select(
        'Variant',
        variantOptions,
        variantOptions[3],
        'Element'
    );
    return html`
        <sp-tooltip
            ?open=${boolean('Open', true, 'Element')}
            placement=${select(
                'Tip direction',
                tipOptions,
                tipOptions[0],
                'Element'
            )}
            variant=${ifDefined(variant || undefined)}
        >
            ${!!variant
                ? html`
                      <sp-icon slot="icon">
                          ${iconOptions[variant]()}
                      </sp-icon>
                  `
                : html``}
            ${text('Tip text', 'Tooltip', 'Element')}
        </sp-tooltip>
    `;
};

wIcon.story = {
    name: 'w/ Icon',
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

export const Overlaid = (): TemplateResult => {
    return html`
        ${overlayStyles}
        ${[
            ['bottom', ''],
            ['left', 'negative'],
            ['right', 'positive'],
            ['top', 'info'],
        ].map(([placement, variant]) => {
            return html`
                <overlay-trigger placement=${placement}>
                    <sp-button label="${placement} test" slot="trigger">
                        Hover for ${variant ? variant : 'tooltip'} on the
                        ${placement}
                    </sp-button>
                    <sp-tooltip slot="hover-content" variant=${variant} open>
                        ${placement}
                    </sp-tooltip>
                </overlay-trigger>
            `;
        })}
    `;
};
