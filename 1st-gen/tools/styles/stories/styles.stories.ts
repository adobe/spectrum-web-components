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

import { html, TemplateResult } from '@spectrum-web-components/base';

export default {
    title: 'Styles',
};

export const dividers = (): TemplateResult => html`
    <style>
        .app-dividers {
            display: grid;
            position: absolute;
            inset: 0;
            grid-template-areas:
                'header header header'
                'toolbar main properties';
            grid-template-columns: 50px 1fr 250px;
            grid-template-rows: 50px 1fr;
            gap: var(--spectrum-global-alias-appframe-border-size);
            background: var(--spectrum-background-base-color);
        }
        header,
        aside {
            background: var(--spectrum-background-layer-1-color);
        }
        header {
            grid-area: header;
        }
        header + aside {
            grid-area: toolbar;
        }
        main {
            grid-area: main;
            background: var(--spectrum-background-layer-2-color);
        }
        main + aside {
            grid-area: properties;
        }
    </style>
    <div class="app-dividers">
        <header></header>
        <aside></aside>
        <main></main>
        <aside></aside>
    </div>
`;
