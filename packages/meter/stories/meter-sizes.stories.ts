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

import '../sp-meter.js';

export default {
    title: 'Meter/Sizes',
    component: 'sp-meter',
};

export const s = (): TemplateResult => {
    return html`
        <sp-meter size="s" progress="50">Storage Space</sp-meter>
    `;
};

export const m = (): TemplateResult => {
    return html`
        <sp-meter size="m" progress="50">Storage Space</sp-meter>
    `;
};

export const l = (): TemplateResult => {
    return html`
        <sp-meter size="l" progress="50">Storage Space</sp-meter>
    `;
};

export const XL = (): TemplateResult => {
    return html`
        <sp-meter size="xl" progress="50">Storage Space</sp-meter>
    `;
};
