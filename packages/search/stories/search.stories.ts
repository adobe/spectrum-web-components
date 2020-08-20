/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { html, action } from '@open-wc/demoing-storybook';

import '../sp-search.js';
import { Search } from '../';
import { TemplateResult } from '@spectrum-web-components/base';

export default {
    component: 'sp-search',
    title: 'Search',
};

export const Default = (): TemplateResult => html`
    <sp-search
        @submit=${(event: Event): void => {
            event.preventDefault();
            const search = event.target as Search;
            action(`Search: ${search.value}`)();
        }}
    ></sp-search>
    <sp-search disabled></sp-search>
`;

export const Quiet = (): TemplateResult => html`
    <sp-search
        quiet
        @submit=${(event: Event): void => {
            event.preventDefault();
            const search = event.target as Search;
            action(`Search: ${search.value}`)();
        }}
    ></sp-search>
    <sp-search quiet disabled></sp-search>
`;
