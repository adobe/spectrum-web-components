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

import '@spectrum-web-components/dropzone/sp-dropzone.js';
import { illustration } from '../test/test-svg';
import '@spectrum-web-components/illustrated-message/sp-illustrated-message.js';
import '@spectrum-web-components/link/sp-link.js';

export default {
    component: 'sp-dropzone',
    title: 'Dropzone',
    args: {
        isDragged: false,
    },
    argTypes: {
        isDragged: {
            name: 'isDragged',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
    },
};

type StoryArgs = {
    isDragged?: boolean;
};

export const Default = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-dropzone id="dropzone" tabindex="0" ?dragged=${args.isDragged}>
            <sp-illustrated-message heading="Drag and Drop Your File" cta>
                ${illustration}
                <div slot="description">
                    <label for="file-input">
                        <sp-link>Select a File</sp-link>
                        from your computer
                    </label>
                    <input type="file" id="file-input" style="display: none" />
                </div>
                <div slot="description">
                    or
                    <sp-link href="http://stock.adobe.com" target="blank">
                        Search Adobe Stock
                    </sp-link>
                </div>
            </sp-illustrated-message>
        </sp-dropzone>
    `;
};

export const Dragged = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-dropzone id="dropzone" tabindex="0" ?dragged=${args.isDragged}>
            <sp-illustrated-message heading="Drag and Drop Your File" cta>
                ${illustration}
                <div slot="description">
                    <label for="file-input">
                        <sp-link>Select a File</sp-link>
                        from your computer
                    </label>
                    <input type="file" id="file-input" style="display: none" />
                </div>
                <div slot="description">
                    or
                    <sp-link href="http://stock.adobe.com" target="blank">
                        Search Adobe Stock
                    </sp-link>
                </div>
            </sp-illustrated-message>
        </sp-dropzone>
    `;
};
Dragged.args = {
    isDragged: true,
};
