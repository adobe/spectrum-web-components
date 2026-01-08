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

import { html, type TemplateResult } from '@spectrum-web-components/base';
import { spreadProps } from '../../../test/lit-helpers.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import '@spectrum-web-components/breadcrumbs/sp-breadcrumbs.js';
import '@spectrum-web-components/breadcrumbs/sp-breadcrumb-item.js';

export type StoryArgs = {
    compact?: boolean;
    disabled?: boolean;
    label?: string;
    'max-visible-items'?: number;
    onChange: () => void;
};

// Some dummy folder structure
const dummyOrganizer = [
    'Your stuff',
    'Files',
    'Team',
    'In progress',
    'Trend',
    'Winter',
    'Assets',
    '18x24',
];

export const getBreadcrumbsWithLinks = (count: number): TemplateResult[] => {
    const breadcrumbs: TemplateResult[] = [];
    for (let i = 0; i < count; i++) {
        breadcrumbs.push(html`
            <sp-breadcrumb-item href=${window.location.href}>
                ${dummyOrganizer[i] || `Breadcrumb ${i}`}
            </sp-breadcrumb-item>
        `);
    }
    return breadcrumbs;
};

export const getBreadcrumbs = (count: number): TemplateResult[] => {
    const breadcrumbs: TemplateResult[] = [];
    for (let i = 0; i < count; i++) {
        breadcrumbs.push(html`
            <sp-breadcrumb-item value=${i}>
                ${dummyOrganizer[i] || `Breadcrumb ${i}`}
            </sp-breadcrumb-item>
        `);
    }
    return breadcrumbs;
};

export const getResizableStyles = (): TemplateResult => {
    return html`
        <style>
            .resizable-container {
                border: 2px solid;
                padding: 20px;
                width: 300px;
                resize: both;
                overflow: auto;
            }
        </style>
    `;
};

export const Template = (args: StoryArgs): TemplateResult => html`
    <sp-breadcrumbs
        ${spreadProps(args)}
        max-visible-items=${ifDefined(args['max-visible-items'])}
        @change=${args.onChange}
        ?compact=${args.compact}
    >
        <sp-breadcrumb-item value="0">Your stuff</sp-breadcrumb-item>
        <sp-breadcrumb-item ?disabled=${args.disabled} value="1">
            Files
        </sp-breadcrumb-item>
        <sp-breadcrumb-item value="2">Team</sp-breadcrumb-item>
        <sp-breadcrumb-item value="3">In progress</sp-breadcrumb-item>
    </sp-breadcrumbs>
`;
