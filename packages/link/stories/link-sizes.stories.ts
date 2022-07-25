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

import '@spectrum-web-components/link/sp-link.js';

export default {
    component: 'sp-link',
    title: 'Link/Sizes',
};

export const s = (): TemplateResult => html`
    <sp-link size="s" href="#">small link</sp-link>
`;

export const m = (): TemplateResult => html`
    <sp-link size="m" href="#">medium link</sp-link>
`;

export const L = (): TemplateResult => html`
    <sp-link size="l" href="#">large link</sp-link>
`;

export const XL = (): TemplateResult => html`
    <sp-link size="xl" href="#">extra large link</sp-link>
`;
