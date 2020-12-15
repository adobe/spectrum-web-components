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

import { TemplateResult } from '@spectrum-web-components/base';
import { html, action } from '@open-wc/demoing-storybook';

import '../sp-split-button.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';

const menu = ({
    firstItemHandler = action('click "Option 1"'),
    secondItemHandler = action('click "Option Extended"'),
    thirdItemHandler = action('click "Short"'),
}): TemplateResult => html`
    <sp-menu>
        <sp-menu-item @click=${firstItemHandler}>Option 1</sp-menu-item>
        <sp-menu-item @click=${secondItemHandler}>Option Extended</sp-menu-item>
        <sp-menu-item @click=${thirdItemHandler}>Short</sp-menu-item>
    </sp-menu>
`;

interface Properties {
    variant?: 'cta' | 'overBackground' | 'primary' | 'secondary' | 'negative';
    quiet?: boolean;
    disabled?: boolean;
    size?: 's' | 'm' | 'l' | 'xl';
    type?: 'field' | 'more';
    left?: boolean;
    open?: boolean;
}

export const splitbutton = (
    properties: Properties = {},
    options = {}
): TemplateResult => html`
    <sp-split-button
        ?left=${!!properties.left}
        size=${properties.size || 'm'}
        variant=${properties.variant || 'cta'}
        type=${properties.type || 'field'}
        ?open=${!!properties.open}
    >
        ${menu(options)}
    </sp-split-button>
`;

const left = true;

export const renderSplitButtonSet = (
    properties: Properties = {},
    options = {}
): TemplateResult => html`
    ${splitbutton(properties, options)}
    ${splitbutton(
        {
            ...properties,
            left,
        },
        options
    )}
`;
