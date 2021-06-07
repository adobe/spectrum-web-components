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

import {
    fixture,
    elementUpdated,
    expect,
    html,
    oneEvent,
} from '@open-wc/testing';

import '../sp-tray.js';
import { Tray } from '..';

describe('Tray', () => {
    it('loads default tray accessibly', async () => {
        const el = await fixture<Tray>(
            html`
                <sp-tray></sp-tray>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('focuses focusable light DOM element', async () => {
        const el = await fixture<Tray>(
            html`
                <sp-tray open>
                    <div>
                        <a href="#">Test element</a>
                    </div>
                </sp-tray>
            `
        );
        const anchor = el.querySelector('a');
        await elementUpdated(el);

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement).to.equal(anchor);
    });
    it('closes', async () => {
        const el = await fixture<Tray>(
            html`
                <sp-tray open></sp-tray>
            `
        );

        await elementUpdated(el);
        expect(el.open).to.be.true;
        const closed = oneEvent(el, 'close');
        const overlay = el.shadowRoot.querySelector(
            'sp-underlay'
        ) as HTMLElement;
        overlay.click();
        await closed;

        expect(el.open).to.be.false;
    });
});
