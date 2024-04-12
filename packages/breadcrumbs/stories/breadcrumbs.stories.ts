/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { html, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';

import '../sp-breadcrumbs.js';
import '../sp-breadcrumb-item.js';
import {
    getBreadcrumbs,
    getResizableStyles,
    StoryArgs,
    Template,
} from './template.js';
import { argTypes } from './args.js';

export default {
    title: 'Breadcrumbs',
    component: 'sp-breadcrumbs',
    args: {
        'max-visible-items': 4,
        compact: false,
        multiline: false,
        disabled: false,
    },
    ...argTypes,
};

export const Default = (args: StoryArgs): TemplateResult => Template(3, args);

export const compact = (args: StoryArgs): TemplateResult => Template(4, args);
compact.args = {
    compact: true,
};

export const multiline = (args: StoryArgs): TemplateResult => Template(4, args);
multiline.args = {
    multiline: true,
};

export const disabledMultiline = (args: StoryArgs): TemplateResult =>
    Template(4, args);
disabledMultiline.args = {
    disabled: true,
    multiline: true,
};

export const showRoot = (args: StoryArgs): TemplateResult => Template(8, args);
showRoot.args = {
    showRoot: true,
};

export const showRootCompact = (args: StoryArgs): TemplateResult =>
    Template(8, args);
showRootCompact.args = {
    showRoot: true,
    compact: true,
};

export const showRootMultiline = (args: StoryArgs): TemplateResult =>
    Template(8, args);
showRootMultiline.args = {
    showRoot: true,
    multiline: true,
};

export const customMaximumVisibleItems = (args: StoryArgs): TemplateResult =>
    Template(8, args);
customMaximumVisibleItems.args = {
    'max-visible-items': 6,
};

export const customMenuIcon = (): TemplateResult => {
    return html`
        <sp-breadcrumbs>
            <sp-icon-settings slot="icon"></sp-icon-settings>

            ${getBreadcrumbs(6)}
        </sp-breadcrumbs>
    `;
};

export const resizableBehavior = (): TemplateResult => {
    return html`
        <div class="resizable-container">
            ${getResizableStyles()}

            <sp-breadcrumbs multiline>${getBreadcrumbs(7)}</sp-breadcrumbs>
        </div>
        <br />
        <div class="resizable-container">
            ${getResizableStyles()}

            <sp-breadcrumbs>${getBreadcrumbs(7)}</sp-breadcrumbs>
        </div>
    `;
};
