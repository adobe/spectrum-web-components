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
import { MenuItem } from '../src/menu-item/menu-item';

chai.use(chaiDomDiff);

describe('Menu', () => {
    it('renders', async () => {
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

        // TODO: Should probably be snapshots, but wait till #115 is merged to figure out why they don't work here.
        expect(el.querySelectorAll('sp-menu-item').length).to.equal(6);
    });

    it('handle focus and keyboard input', async () => {
        // !!! WHEN RUNNING THIS TEST LOCALLY !!!
        // If you don't focus (click) on the FireFox browser that gets spawned,
        // then it won't be able to take focus events and this test will fail.
        const handleFocus = (e: Event) => {
            activeElement = e.target as MenuItem;
        };
        const el = await fixture<Menu>(
            html`
                <sp-menu @focusin=${handleFocus}>
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

        let activeElement = el.querySelector(
            'sp-menu-item:nth-of-type(4)'
        ) as MenuItem;
        const firstItem = el.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        const thirdToLastItem = el.querySelector(
            'sp-menu-item:nth-last-of-type(3)'
        ) as MenuItem;
        const secondToLastItem = el.querySelector(
            'sp-menu-item:nth-last-of-type(2)'
        ) as MenuItem;
        const arrowUpEvent = new KeyboardEvent('keydown', {
            bubbles: true,
            composed: true,
            code: 'ArrowUp',
            cancelable: true,
        });
        const arrowDownEvent = new KeyboardEvent('keydown', {
            bubbles: true,
            composed: true,
            code: 'ArrowDown',
            cancelable: true,
        });

        firstItem.focus();

        expect(activeElement === firstItem).to.be.true;

        el.dispatchEvent(arrowUpEvent);
        el.dispatchEvent(arrowUpEvent);

        expect(activeElement === thirdToLastItem).to.be.true;

        el.dispatchEvent(arrowDownEvent);

        expect(activeElement === secondToLastItem).to.be.true;
    });
});
