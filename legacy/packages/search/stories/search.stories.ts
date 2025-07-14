/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import '@spectrum-web-components/search/sp-search.js';
import { html, TemplateResult } from '@spectrum-web-components/base';

export default {
    component: 'sp-search',
    title: 'Search',
};

export const Default = (): TemplateResult => html`
    <sp-search></sp-search>
    <sp-search disabled></sp-search>
`;

export const autofocus = (): TemplateResult => html`
    <sp-search autofocus></sp-search>
`;

export const focusedOverflowing = (): TemplateResult => html`
    <sp-search
        value="this is a really long search term that overflows the available space"
    ></sp-search>
`;

export const Quiet = (): TemplateResult => html`
    <sp-search quiet></sp-search>
    <sp-search quiet disabled></sp-search>
`;

export const holdValueOnEscape = (): TemplateResult => html`
    <sp-search holdValueOnEscape></sp-search>
`;
