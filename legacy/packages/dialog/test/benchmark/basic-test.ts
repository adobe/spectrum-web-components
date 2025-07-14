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

import '@spectrum-web-components/dialog/sp-dialog.js';
import { html } from 'lit';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers.js';

measureFixtureCreation(html`
    <sp-dialog size="s">
        <h2 slot="heading">Disclaimer</h2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Auctor augue mauris
        augue neque gravida. Libero volutpat sed ornare arcu. Quisque egestas
        diam in arcu cursus euismod quis viverra. Posuere ac ut consequat semper
        viverra nam libero justo laoreet. Enim ut tellus elementum sagittis
        vitae et leo duis ut. Neque laoreet suspendisse interdum consectetur
        libero id faucibus nisl. Diam volutpat commodo sed egestas egestas.
        Dolor magna eget est lorem ipsum dolor. Vitae suscipit tellus mauris a
        diam maecenas sed. Turpis in eu mi bibendum neque egestas congue.
        Rhoncus est pellentesque elit ullamcorper dignissim cras lobortis.
    </sp-dialog>
`);
