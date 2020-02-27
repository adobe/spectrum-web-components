/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { html, TemplateResult } from 'lit-html';

import '../';
import { landscape, portrait } from './images';
import '../../textfield';

export default {
    component: 'sp-card',
    title: 'Card',
};

export const Default = (): TemplateResult => {
    return html`
        <div style="color: var(--spectrum-global-color-gray-800)">
            <sp-card title="Card Title" subtitle="JPG">
                <img slot="cover-photo" src=${portrait} alt="Demo Image" />
                <div slot="footer">Footer</div>
            </sp-card>
        </div>
    `;
};

export const Gallery = (): TemplateResult => {
    return html`
        <div style="width: 532px; height: 224px">
            <sp-card variant="gallery" title="Card Title" subtitle="JPG">
                <img
                    slot="preview"
                    src=${landscape}
                    style="object-fit: cover"
                    alt="Demo Image"
                />
                <div slot="description">10/15/18</div>
                <div slot="footer">Footer</div>
            </sp-card>
        </div>
    `;
};

export const Quiet = (): TemplateResult => {
    return html`
        <div style="width: 208px; height: 264px">
            <sp-card variant="quiet" title="Card Title" subtitle="JPG">
                <img slot="preview" src=${portrait} alt="Demo Image" />
                <div slot="description">10/15/18</div>
                <div slot="footer">Footer</div>
            </sp-card>
        </div>
    `;
};

export const SlottedTitle = (): TemplateResult => {
    return html`
        <div
            style="color: var(--spectrum-global-color-gray-800); --spectrum-card-body-header-height: auto;"
        >
            <sp-card subtitle="JPG">
                <sp-textfield
                    slot="title"
                    placeholder="Enter Title"
                ></sp-textfield>
                <img slot="cover-photo" src=${portrait} alt="Demo Image" />
                <div slot="footer">Footer</div>
            </sp-card>
        </div>
    `;
};
