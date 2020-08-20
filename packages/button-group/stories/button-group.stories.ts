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

import '../sp-button-group.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/button/sp-action-button.js';
import '@spectrum-web-components/icon/sp-icon.js';
import {
    PropertiesIcon,
    InfoIcon,
    ViewAllTagsIcon,
} from '@spectrum-web-components/icons-workflow';

export default {
    title: 'Button Group',
    component: 'sp-button-group',
};

export const buttons = (): TemplateResult => {
    return html`
        <sp-button-group>
            <sp-button>Button 1</sp-button>
            <sp-button>Longer Button 2</sp-button>
            <sp-button>Short 3</sp-button>
        </sp-button-group>
    `;
};

export const actionButtons = (): TemplateResult => {
    return html`
        <sp-button-group>
            <sp-action-button>Button 1</sp-action-button>
            <sp-action-button>Longer Button 2</sp-action-button>
            <sp-action-button>Short 3</sp-action-button>
        </sp-button-group>
    `;
};

export const actionButtonsIcons = (): TemplateResult => {
    return html`
        <sp-button-group>
            <sp-action-button>
                <sp-icon slot="icon" size="s">
                    ${PropertiesIcon({ hidden: true })}
                </sp-icon>
                Button 1
            </sp-action-button>
            <sp-action-button>
                <sp-icon slot="icon" size="s">
                    ${InfoIcon({ hidden: true })}
                </sp-icon>
                Longer Button 2
            </sp-action-button>
            <sp-action-button>
                <sp-icon slot="icon" size="s">
                    ${ViewAllTagsIcon({ hidden: true })}
                </sp-icon>
                Short 3
            </sp-action-button>
        </sp-button-group>
    `;
};

export const actionButtonsIconsOnly = (): TemplateResult => {
    return html`
        <sp-button-group>
            <sp-action-button quiet label="Properties">
                <sp-icon slot="icon" size="s">
                    ${PropertiesIcon({ hidden: true })}
                </sp-icon>
            </sp-action-button>
            <sp-action-button quiet label="Info">
                <sp-icon slot="icon" size="s">
                    ${InfoIcon({ hidden: true })}
                </sp-icon>
            </sp-action-button>
            <sp-action-button quiet label="View All Tags">
                <sp-icon slot="icon" size="s">
                    ${ViewAllTagsIcon({ hidden: true })}
                </sp-icon>
            </sp-action-button>
        </sp-button-group>
    `;
};

export const buttonsVertical = (): TemplateResult => {
    return html`
        <sp-button-group vertical>
            <sp-button>Button 1</sp-button>
            <sp-button>Longer Button 2</sp-button>
            <sp-button>Short 3</sp-button>
        </sp-button-group>
    `;
};

export const actionButtonsVertical = (): TemplateResult => {
    return html`
        <sp-button-group vertical>
            <sp-action-button>Button 1</sp-action-button>
            <sp-action-button>Longer Button 2</sp-action-button>
            <sp-action-button>Short 3</sp-action-button>
        </sp-button-group>
    `;
};

export const actionButtonsVerticalIcons = (): TemplateResult => {
    return html`
        <sp-button-group vertical>
            <sp-action-button>
                <sp-icon slot="icon" size="s">
                    ${PropertiesIcon({ hidden: true })}
                </sp-icon>
                Button 1
            </sp-action-button>
            <sp-action-button>
                <sp-icon slot="icon" size="s">
                    ${InfoIcon({ hidden: true })}
                </sp-icon>
                Longer Button 2
            </sp-action-button>
            <sp-action-button>
                <sp-icon slot="icon" size="s">
                    ${ViewAllTagsIcon({ hidden: true })}
                </sp-icon>
                Short 3
            </sp-action-button>
        </sp-button-group>
    `;
};

export const actionButtonsVerticalIconsOnly = (): TemplateResult => {
    return html`
        <sp-button-group vertical>
            <sp-action-button quiet label="Properties">
                <sp-icon slot="icon" size="s">
                    ${PropertiesIcon({ hidden: true })}
                </sp-icon>
            </sp-action-button>
            <sp-action-button quiet label="Info">
                <sp-icon slot="icon" size="s">
                    ${InfoIcon({ hidden: true })}
                </sp-icon>
            </sp-action-button>
            <sp-action-button quiet label="View All Tags">
                <sp-icon slot="icon" size="s">
                    ${ViewAllTagsIcon({ hidden: true })}
                </sp-icon>
            </sp-action-button>
        </sp-button-group>
    `;
};
