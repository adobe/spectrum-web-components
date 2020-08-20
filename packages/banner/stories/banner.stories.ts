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
import { html, boolean, radios, text } from '@open-wc/demoing-storybook';

import '../sp-banner.js';
import { TemplateResult } from '@spectrum-web-components/base';

export default {
    component: 'sp-banner',
    title: 'Banner',
};

export const Default = (): TemplateResult => {
    const header = text('Header', 'Header Text');
    const content = text('Content', 'Content of the banner!');
    const typeOptions = {
        info: 'info',
        warning: 'warning',
        error: 'error',
    };
    const type = radios('Type', typeOptions, typeOptions.info);
    const inCorner = boolean('In Corner', false);
    return html`
        <div style="margin: -8px 0;">
            <div
                style="width: 300px; height: 200px; background-color: #ccc; position: relative; margin: 20px;"
            >
                <sp-banner type="${type}" ?corner=${inCorner}>
                    <div slot="header">${header}</div>
                    <div slot="content">${content}</div>
                </sp-banner>
            </div>
        </div>
    `;
};

export const bannerTypes = (): TemplateResult => {
    return html`
        <sp-banner type="info">
            <div slot="header">Header Text</div>
            <div slot="content">Content of the banner!</div>
        </sp-banner>
        <sp-banner type="warning">
            <div slot="header">Header Text</div>
            <div slot="content">Content of the banner!</div>
        </sp-banner>
        <sp-banner type="error">
            <div slot="header">Header Text</div>
            <div slot="content">Content of the banner!</div>
        </sp-banner>
    `;
};

bannerTypes.story = {
    name: 'Banner Types',
};

export const cornerPlacement = (): TemplateResult => {
    return html`
        <div style="margin: -8px 0;">
            <div
                style="width: 300px; height: 200px; background-color: #ccc; position: relative; margin: 20px;"
            >
                <sp-banner corner>
                    <div slot="header">A corner banner!</div>
                    <div slot="content">Content of the banner!</div>
                </sp-banner>
            </div>
        </div>
    `;
};

cornerPlacement.story = {
    name: 'Corner Placement',
};
