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

import '../sync/sp-split-button.js';
import { html, TemplateResult } from '@spectrum-web-components/base';
import { runSplitButtonTests } from './index.js';

// wrap in div method

function wrapInDiv(storyArgument: TemplateResult): TemplateResult {
    return html`
        <div>${storyArgument}</div>
    `;
}

const deprecatedMenu = (): TemplateResult => html`
    <sp-menu>
        <sp-menu-item>Option 1</sp-menu-item>
        <sp-menu-item>Option Extended</sp-menu-item>
        <sp-menu-item>Short</sp-menu-item>
    </sp-menu>
`;

describe('Splitbutton', () => {
    runSplitButtonTests(wrapInDiv, deprecatedMenu);
});
