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

import '../sp-icon.js';
import { back } from './images';
import '@spectrum-web-components/icons/sp-icons-medium.js';
import '@spectrum-web-components/icons/sp-icons-large.js';

const sizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'];

export default {
    component: 'sp-icon',
    title: 'Icon',
};

export const Medium = (): TemplateResult => {
    return html`
        <sp-icons-medium></sp-icons-medium>
        ${sizes.map(
            (size) => html`
                <sp-icon size=${size} name="ui:Magnifier"></sp-icon>
            `
        )}
    `;
};

export const Large = (): TemplateResult => {
    return html`
        <sp-icons-large></sp-icons-large>
        ${sizes.map(
            (size) => html`
                <sp-icon size=${size} name="ui:Magnifier"></sp-icon>
            `
        )}
    `;
};

export const imageIcon = (): TemplateResult => {
    return html`
        ${sizes.map(
            (size) => html`
                <sp-icon label="Back" size=${size} src=${back}></sp-icon>
            `
        )}
    `;
};

imageIcon.story = {
    name: 'Image Icon',
};

export const svgIcon = (): TemplateResult => {
    return html`
        ${sizes.map(
            (size) => html`
                <sp-icon size=${size}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 22 22"
                        role="img"
                        fill="currentColor"
                        height="18"
                        width="18"
                        aria-hidden="true"
                    >
                        <path
                            d="M19.75,10.04h-15l5.97-5.97a.483.483,0,0,0,0-.7l-.35-.36a.513.513,0,0,0-.71,0L2.24,10.44a.513.513,0,0,0,0,.71l7.39,7.84a.513.513,0,0,0,.71,0l.35-.35a.513.513,0,0,0,0-.71L4.76,11.5H19.75a.25.25,0,0,0,.25-.25v-.96A.25.25,0,0,0,19.75,10.04Z"
                        ></path>
                    </svg>
                </sp-icon>
            `
        )}
    `;
};

svgIcon.story = {
    name: 'SVG Icon',
};
