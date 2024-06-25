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

import { html, type TemplateResult } from '@spectrum-web-components/base';
import '../sp-breadcrumbs.js';
import '../sp-breadcrumb-item.js';
import { spreadProps } from '../../../test/lit-helpers.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export type StoryArgs = {
    label?: string;
    compact?: boolean;
    disabled?: boolean;
    multiline?: boolean;
    showRoot?: boolean;
    'max-visible-items': number;
    nrOfItems: number;
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

export const getBreadcrumbs = (count: number): TemplateResult[] => {
    const breadcrumbs: TemplateResult[] = [];
    for (let i = 0; i < count; i++) {
        breadcrumbs.push(
            html`
                <sp-breadcrumb-item href=${window.location.href}>
                    ${dummyOrganizer[i] || `Breadcrumb ${i}`}
                </sp-breadcrumb-item>
            `
        );
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
    >
        ${getBreadcrumbs(args.nrOfItems)}
    </sp-breadcrumbs>
`;
