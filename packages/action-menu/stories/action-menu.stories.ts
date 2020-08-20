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
import { html, action, boolean, text } from '@open-wc/demoing-storybook';
import { TemplateResult } from '@spectrum-web-components/base';

import { ActionMenu } from '../';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { ActionMenuMarkup } from './';

export default {
    component: 'sp-action-menu',
    title: 'Action menu',
};

export const iconOnly = (): TemplateResult => {
    return html`
        ${ActionMenuMarkup()}
    `;
};

export const Default = (): TemplateResult => {
    const ariaLabel = text('Arial Label', 'More Actions', 'Component');
    const visibleLabel = text('Visible Label', 'More Actions', 'Component');
    const disabled = boolean('Is Disabled', false, 'Component');
    const changeHandler = (event: Event): void => {
        const actionMenu = event.target as ActionMenu;
        action(`Change: ${actionMenu.value}`)();
    };
    return ActionMenuMarkup({
        ariaLabel,
        disabled,
        changeHandler,
        visibleLabel,
    });
};
