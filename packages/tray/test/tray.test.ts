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

import {
    elementUpdated,
    expect,
    fixture,
    html,
    nextFrame,
    oneEvent,
} from '@open-wc/testing';

import '@spectrum-web-components/tray/sp-tray.js';
import { Tray } from '@spectrum-web-components/tray';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

describe('Tray', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Tray>(html`
                <sp-tray></sp-tray>
            `)
    );
    it('loads default tray accessibly', async () => {
        const el = await fixture<Tray>(html`
            <sp-tray></sp-tray>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('focuses focusable light DOM element', async () => {
        const el = await fixture<Tray>(html`
            <sp-tray open>
                <div>
                    <a href="#">Test element</a>
                </div>
            </sp-tray>
        `);
        const anchor = el.querySelector('a');
        await elementUpdated(el);

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement).to.equal(anchor);
    });
    it('focuses "tray"', async () => {
        const el = await fixture<Tray>(html`
            <sp-tray open>
                <div></div>
            </sp-tray>
        `);
        await elementUpdated(el);

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement).to.equal(el);
        expect(el.shadowRoot.activeElement).to.equal(
            (el as unknown as { tray: HTMLDivElement }).tray
        );
    });
    it('closes', async () => {
        const test = await fixture<HTMLElement>(html`
            <sp-theme system="spectrum" scale="medium" color="dark">
                <sp-tray></sp-tray>
            </sp-theme>
        `);

        const el = test.querySelector('sp-tray') as Tray;
        // Ensure closed styles are set before opening so that
        // the `transitionend` event will be met below.
        await nextFrame();
        await nextFrame();
        expect(el.open).to.be.false;

        el.open = true;
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
