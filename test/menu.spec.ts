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

import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { fixture, elementUpdated } from '@open-wc/testing-helpers';
import { Menu } from '../src/menu';
import '../src/menu';
import '../src/menu-item';
import { html } from 'lit-element';

chai.use(chaiDomDiff);

describe('Link', () => {
    it('loads', async () => {
        const el = await fixture<Menu>(
            html`
                <sp-menu>
                    <sp-menu-item>
                        Deselect
                    </sp-menu-item>
                    <sp-menu-item>
                        Select Inverse
                    </sp-menu-item>
                    <sp-menu-item>
                        Feather...
                    </sp-menu-item>
                    <sp-menu-item>
                        Select and Mask...
                    </sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>
                        Save Selection
                    </sp-menu-item>
                    <sp-menu-item disabled aria-disabled="true">
                        Make Work Path
                    </sp-menu-item>
                </sp-menu>
            `
        );

        await elementUpdated(el);
    });
});
