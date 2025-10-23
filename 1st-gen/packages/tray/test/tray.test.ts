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
import '@spectrum-web-components/dialog/sp-dialog.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
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

    describe('Dismiss helpers', () => {
        it('renders visually-hidden dismiss helpers when no buttons detected', async () => {
            const el = await fixture<Tray>(html`
                <sp-tray open>
                    <sp-menu style="width: 100%">
                        <sp-menu-item>Item 1</sp-menu-item>
                        <sp-menu-item>Item 2</sp-menu-item>
                    </sp-menu>
                </sp-tray>
            `);
            await elementUpdated(el);

            const helpers = el.shadowRoot.querySelectorAll('.visually-hidden');
            expect(helpers.length).to.equal(2);

            const buttons = el.shadowRoot.querySelectorAll(
                '.visually-hidden button'
            );
            expect(buttons.length).to.equal(2);
            expect(buttons[0].getAttribute('aria-label')).to.equal('Dismiss');
            expect(buttons[0].getAttribute('tabindex')).to.equal('-1');
        });

        it('does not render dismiss helpers when sp-button is detected', async () => {
            const el = await fixture<Tray>(html`
                <sp-tray open>
                    <div>
                        <sp-button>Close</sp-button>
                    </div>
                </sp-tray>
            `);
            await elementUpdated(el);

            const helpers = el.shadowRoot.querySelectorAll('.visually-hidden');
            expect(helpers.length).to.equal(0);
        });

        it('does not render dismiss helpers when dismissable dialog is detected', async () => {
            const el = await fixture<Tray>(html`
                <sp-tray open>
                    <sp-dialog size="s" dismissable>
                        <h2 slot="heading">New messages</h2>
                        You have 5 new messages.
                    </sp-dialog>
                </sp-tray>
            `);
            await elementUpdated(el);

            const helpers = el.shadowRoot.querySelectorAll('.visually-hidden');
            expect(helpers.length).to.equal(0);
        });

        it('does not render dismiss helpers when native button is detected', async () => {
            const el = await fixture<Tray>(html`
                <sp-tray open>
                    <div>
                        <button>Close</button>
                    </div>
                </sp-tray>
            `);
            await elementUpdated(el);

            const helpers = el.shadowRoot.querySelectorAll('.visually-hidden');
            expect(helpers.length).to.equal(0);
        });

        it('does not render dismiss helpers with has-keyboard-dismiss attribute', async () => {
            const el = await fixture<Tray>(html`
                <sp-tray open has-keyboard-dismiss>
                    <p>Custom content with custom dismiss handling</p>
                </sp-tray>
            `);
            await elementUpdated(el);

            expect(el.hasKeyboardDismissButton).to.be.true;

            const helpers = el.shadowRoot.querySelectorAll('.visually-hidden');
            expect(helpers.length).to.equal(0);
        });

        it('renders dismiss helpers after slot content changes to remove buttons', async () => {
            const el = await fixture<Tray>(html`
                <sp-tray open>
                    <sp-button>Close</sp-button>
                </sp-tray>
            `);
            await elementUpdated(el);

            // Should not have helpers initially
            let helpers = el.shadowRoot.querySelectorAll('.visually-hidden');
            expect(helpers.length).to.equal(0);

            // Remove the button
            const button = el.querySelector('sp-button');
            button?.remove();
            await elementUpdated(el);

            // Should now have helpers
            helpers = el.shadowRoot.querySelectorAll('.visually-hidden');
            expect(helpers.length).to.equal(2);
        });

        it('removes dismiss helpers after slot content changes to add buttons', async () => {
            const el = await fixture<Tray>(html`
                <sp-tray open>
                    <p>Some content</p>
                </sp-tray>
            `);
            await elementUpdated(el);

            // Should have helpers initially
            let helpers = el.shadowRoot.querySelectorAll('.visually-hidden');
            expect(helpers.length).to.equal(2);

            // Add a button
            const button = document.createElement('sp-button');
            button.textContent = 'Close';
            el.appendChild(button);
            await elementUpdated(el);

            // Should no longer have helpers
            helpers = el.shadowRoot.querySelectorAll('.visually-hidden');
            expect(helpers.length).to.equal(0);
        });

        it('dismiss helper buttons trigger close when clicked', async () => {
            const test = await fixture<HTMLElement>(html`
                <sp-theme system="spectrum" scale="medium" color="dark">
                    <sp-tray open>
                        <p>Content without buttons</p>
                    </sp-tray>
                </sp-theme>
            `);

            const el = test.querySelector('sp-tray') as Tray;
            // Ensure closed styles are set before opening so that
            // the `transitionend` event will be met below.
            await nextFrame();
            await nextFrame();
            await elementUpdated(el);
            expect(el.open).to.be.true;

            const root = el.shadowRoot ? el.shadowRoot : el;
            const dismissButton = root.querySelector(
                '.visually-hidden button'
            ) as HTMLButtonElement;
            expect(dismissButton.getAttribute('aria-label')).to.equal(
                'Dismiss'
            );

            const closed = oneEvent(el, 'close');
            dismissButton.click();
            await closed;

            expect(el.open).to.be.false;
        });
    });
});
