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

import '@spectrum-web-components/action-bar/sp-action-bar.js';
import '@spectrum-web-components/action-bar/sp-action-bar-scoped.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';

import { ActionBarWrapper } from './';

export default {
    title: 'Action Bar',
    component: 'sp-action-bar',
    args: {
        open: true,
        emphasized: false,
        variant: 'sticky',
        flexible: false,
        scoped: false,
    },
};

type Properties = {
    scoped?: boolean;
    open?: boolean;
    emphasized?: boolean;
    variant?: 'sticky' | 'fixed';
    flexible?: boolean;
};

export const Default = (args?: Properties): TemplateResult => {
    return ActionBarWrapper(args);
};

export const emphasized = (args?: Properties): TemplateResult => {
    return ActionBarWrapper(args);
};
emphasized.args = {
    open: true,
    emphasized: true,
};

export const fixed = (args?: Properties): TemplateResult => {
    const actionBarContent = ActionBarWrapper(args);
    return html`
        <style>
            [variant='fixed'] {
                bottom: 2.5em;
                inset-inline-end: 1em;
            }
        </style>
        ${actionBarContent}
    `;
};
fixed.args = {
    open: true,
    variant: 'fixed',
};

export const flexible = (args?: Properties): TemplateResult => {
    return ActionBarWrapper(args);
};
flexible.args = {
    open: true,
    flexible: true,
    emphasized: true,
};
