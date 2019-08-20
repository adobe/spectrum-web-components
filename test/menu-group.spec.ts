/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { expect } from '@bundled-es-modules/chai';
import { fixture, elementUpdated } from '@open-wc/testing';
import { Menu } from '../lib/menu';
import '../lib/menu';
import '../lib/menu-item';
import { MenuGroup } from '../lib/menu-group';
import '../lib/menu-group';
import { html } from 'lit-element';

describe('Menu group', () => {
    it('renders', async () => {
        const el = await fixture<Menu>(
            html`
                <sp-menu>
                    <sp-menu-group>
                        <span slot="header">
                            Section Heading
                        </span>
                        <sp-menu-item>
                            Action 1
                        </sp-menu-item>
                        <sp-menu-item>
                            Action 2
                        </sp-menu-item>
                        <sp-menu-item>
                            Action 3
                        </sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-group>
                        <span slot="header">
                            Section Heading
                        </span>
                        <sp-menu-item>
                            Save
                        </sp-menu-item>
                        <sp-menu-item disabled>
                            Download
                        </sp-menu-item>
                    </sp-menu-group>
                </sp-menu>
            `
        );

        await elementUpdated(el);

        const firstGroup = el.querySelector(
            'sp-menu-group:nth-of-type(1)'
        ) as MenuGroup;
        const secondGroup = el.querySelector(
            'sp-menu-group:nth-of-type(2)'
        ) as MenuGroup;
        const firstLabelledByEl = firstGroup.shadowRoot!.querySelector(
            '[aria-labelledby]'
        ) as HTMLDivElement;
        const secondLabelledByEl = secondGroup.shadowRoot!.querySelector(
            '[aria-labelledby]'
        ) as HTMLDivElement;
        const firstLabelledById = firstLabelledByEl.getAttribute(
            'aria-labelledby'
        ) as string;
        const secondLabelledById = secondLabelledByEl.getAttribute(
            'aria-labelledby'
        ) as string;

        expect(firstLabelledById).to.not.be.null;
        expect(secondLabelledById).to.not.be.null;
        expect(firstLabelledById).to.not.equal(secondLabelledById);
    });
});
