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

import '@spectrum-web-components/avatar/sp-avatar.js';
import { avatar } from './images';
import type { Properties } from './args';
import { args, argTypes } from './args';

const meta: Meta<Properties> = {
    component: 'sp-avatar',
    title: 'Avatar',
    argTypes,
    args,
};

const Template = ({
    label = 'Place Dog',
    src = avatar,
    size = 100,
}: Properties = {}): TemplateResult => {
    return html`
        <sp-avatar label=${label} src=${src} size=${size}></sp-avatar>
    `;
};

const Link = ({
    disabled = false,
    label = 'Place Dog',
    src = avatar,
    size = 100,
}: Properties = {}): TemplateResult => {
    return html`
        <sp-avatar
            href="https://opensource.adobe.com/spectrum-web-components"
            ?disabled=${disabled}
            label=${label}
            src=${src}
            size=${size}
        ></sp-avatar>
    `;
};

export const size50 = (args: Properties = {}): TemplateResult =>
    Template({ ...args, size: 50 });
export const size75 = (args: Properties = {}): TemplateResult =>
    Template({ ...args, size: 75 });
export const size100 = (args: Properties = {}): TemplateResult =>
    Template({ ...args, size: 100 });
export const size200 = (args: Properties = {}): TemplateResult =>
    Template({ ...args, size: 200 });
export const size300 = (args: Properties = {}): TemplateResult =>
    Template({ ...args, size: 300 });
export const size400 = (args: Properties = {}): TemplateResult =>
    Template({ ...args, size: 400 });
export const size500 = (args: Properties = {}): TemplateResult =>
    Template({ ...args, size: 500 });
export const size600 = (args: Properties = {}): TemplateResult =>
    Template({ ...args, size: 600 });
export const size700 = (args: Properties = {}): TemplateResult =>
    Template({ ...args, size: 700 });
export const linked = (args: Properties = {}): TemplateResult => Link(args);
export const disabled = (args: Properties = {}): TemplateResult => Link(args);
disabled.args = { disabled: true };

export default meta;
