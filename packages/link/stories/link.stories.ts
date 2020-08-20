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

import '../sp-link.js';

export default {
    component: 'sp-link',
    title: 'Link',
};

export const Default = (): TemplateResult => {
    // prettier-ignore
    return html`
        This is a <sp-link href="#">link</sp-link> in a sentence.
    `;
};

export const Quiet = (): TemplateResult => {
    // prettier-ignore
    return html`
        This is a <sp-link quiet href="#">quiet link</sp-link> in a sentence.
    `;
};

export const overBackground = (): TemplateResult => {
    return html`
        <div
            style="background-color: rgb(15, 121, 125); padding: 15px 20px; display: inline-block;"
        >
            <p style="color: rgb(240, 240, 240);">
                This
                <sp-link over-background href="#">link</sp-link>
                has a background.
            </p>
        </div>
    `;
};

export const Download = (): TemplateResult => {
    const blob = new Blob(['some text for the file'], {
        type: 'text/plain;charset=utf-8',
    });
    return html`
        This is a
        <sp-link download="somefile.txt" href="${URL.createObjectURL(blob)}">
            downloadable file
        </sp-link>
        for you to click on.
    `;
};

overBackground.story = {
    name: 'Over Background',
};
