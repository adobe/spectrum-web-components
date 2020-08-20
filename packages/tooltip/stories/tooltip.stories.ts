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
import { html, boolean, select, text } from '@open-wc/demoing-storybook';

import '../sp-tooltip.js';
import '@spectrum-web-components/icon/sp-icon';
import '@spectrum-web-components/icons/sp-icons-medium.js';
import { TemplateResult } from '@spectrum-web-components/base';

const tipOptions = ['top', 'bottom', 'left', 'right'];

const variantOptions = ['', 'info', 'positive', 'negative'];

const iconOptions = ['AlertSmall', 'CheckmarkSmall', 'InfoSmall'];

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
    return html`
        <sp-icons-medium></sp-icons-medium>
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
            <sp-icon
                size="s"
                name="ui:${select(
                    'Icon',
                    iconOptions,
                    iconOptions[0],
                    'Element'
                )}"
                slot="icon"
            ></sp-icon>
            ${text('Tip text', 'Tooltip', 'Element')}
        </sp-tooltip>
    `;
};

wIcon.story = {
    name: 'w/ Icon',
};
