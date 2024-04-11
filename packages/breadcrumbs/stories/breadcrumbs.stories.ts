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
// import { Breadcrumb } from '../src/Breadcrumbs.js';

export default {
    title: 'Breadcrumbs',
    component: 'sp-breadcrumbs',
};

const getBreadcrumbs = (count: number): TemplateResult[] => {
    const breadcrumbs: TemplateResult[] = [];
    for (let i = 0; i < count; i++) {
        breadcrumbs.push(
            html`
                <sp-breadcrumb-item href=${window.location.href}>
                    Breadcrumb ${i}
                </sp-breadcrumb-item>
            `
        );
    }
    return breadcrumbs;
};

const getResizableStyles = (): TemplateResult => {
    return html`
        <style>
            #container {
                border: 2px solid;
                padding: 20px;
                width: 300px;
                resize: both;
                overflow: auto;
            }
        </style>
    `;
};

export const Default = (): TemplateResult => {
    return html`
        <sp-breadcrumbs label="Organizer">${getBreadcrumbs(3)}</sp-breadcrumbs>
    `;
};

export const showRoot = (): TemplateResult => {
    return html`
        <sp-breadcrumbs show-root>${getBreadcrumbs(8)}</sp-breadcrumbs>
    `;
};

export const compact = (): TemplateResult => {
    return html`
        <sp-breadcrumbs compact>${getBreadcrumbs(4)}</sp-breadcrumbs>
    `;
};

export const multiline = (): TemplateResult => {
    return html`
        <sp-breadcrumbs multiline>${getBreadcrumbs(4)}</sp-breadcrumbs>
    `;
};

export const disabledMultiline = (): TemplateResult => {
    return html`
        <sp-breadcrumbs disabled multiline>${getBreadcrumbs(4)}</sp-breadcrumbs>
    `;
};

export const resizableBehavior = (): TemplateResult => {
    return html`
        <div id="container">
            ${getResizableStyles()}

            <sp-breadcrumbs multiline>${getBreadcrumbs(7)}</sp-breadcrumbs>
        </div>
    `;
};

export const showRootCompact = (): TemplateResult => {
    return html`
        <sp-breadcrumbs compact show-root>${getBreadcrumbs(6)}</sp-breadcrumbs>
    `;
};

export const customMenuIcon = (): TemplateResult => {
    return html`
        <sp-breadcrumbs compact show-root>
            <sp-icon-settings slot="icon"></sp-icon-settings>

            ${getBreadcrumbs(6)}
        </sp-breadcrumbs>
    `;
};

export const showRootMultiline = (): TemplateResult => {
    return html`
        <sp-breadcrumbs multiline show-root>
            ${getBreadcrumbs(6)}
        </sp-breadcrumbs>
    `;
};
