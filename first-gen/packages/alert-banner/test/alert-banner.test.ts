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
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { SinonStub, spy, stub } from 'sinon';

import '@spectrum-web-components/alert-banner/sp-alert-banner.js';
import '@spectrum-web-components/button/sp-button.js';
import { AlertBanner } from '@spectrum-web-components/alert-banner';
import {
    escapeEvent,
    testForLitDevWarnings,
} from '../../../test/testing-helpers.js';

describe('AlertBanner', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<AlertBanner>(html`
                <sp-alert-banner>Your trial will expire soon</sp-alert-banner>
            `)
    );
    it('loads default alert-banner accessibly', async () => {
        const el = await fixture<AlertBanner>(html`
            <sp-alert-banner open>Your trial will expire soon</sp-alert-banner>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('accepts variants', async () => {
        const el = await fixture<AlertBanner>(html`
            <sp-alert-banner open variant="info">
                Your trial will expire soon
            </sp-alert-banner>
        `);

        await elementUpdated(el);

        expect(el.getAttribute('variant')).to.equal('info');
        expect(el.shadowRoot.querySelector('sp-icon-info')).to.exist;

        el.variant = 'negative';
        await elementUpdated(el);

        expect(el.getAttribute('variant')).to.equal('negative');
        expect(el.shadowRoot.querySelector('sp-icon-alert')).to.exist;
    });
    it('removes variant attribute when given invalid variant', async () => {
        const el = await fixture<AlertBanner>(html`
            <sp-alert-banner open variant="inexistent">
                Your trial will expire soon
            </sp-alert-banner>
        `);

        await elementUpdated(el);

        expect(el.getAttribute('variant')).to.be.null;
    });
    it('calls corresponding handler using Space or Enter key for actionable alerts', async () => {
        const actionSpy = spy();
        const el = await fixture<AlertBanner>(html`
            <sp-alert-banner open>
                Your trial will expire soon
                <sp-button slot="action" @click=${() => actionSpy()}>
                    Buy now
                </sp-button>
            </sp-alert-banner>
        `);
        await elementUpdated(el);

        const buttonEl = el.querySelector('sp-button');
        expect(buttonEl).to.exist;

        buttonEl?.focus();
        await sendKeys({ press: 'Enter' });
        await elementUpdated(el);

        expect(actionSpy).to.be.calledOnce;

        buttonEl?.focus();
        await sendKeys({ press: 'Space' });
        await elementUpdated(el);

        expect(actionSpy).to.be.calledTwice;
    });

    describe('dismiss behavior', () => {
        it('can be dismissed by clicking the close button', async () => {
            const el = await fixture<AlertBanner>(html`
                <sp-alert-banner open dismissible>
                    Your trial will expire soon
                </sp-alert-banner>
            `);

            await elementUpdated(el);

            const closeButton = el.shadowRoot.querySelector('sp-close-button');

            expect(closeButton).to.exist;
            expect(el.open).to.be.true;

            closeButton?.click();
            await elementUpdated(el);

            expect(el.open).to.be.false;
        });
        it('can be dismissed using close button', async () => {
            const el = await fixture<AlertBanner>(html`
                <sp-alert-banner open>
                    Your trial will expire soon
                </sp-alert-banner>
            `);

            await elementUpdated(el);

            const closeButton = el.shadowRoot.querySelector('sp-close-button');

            expect(closeButton).to.not.exist;
            expect(el.open).to.be.true;

            el.close();
            await elementUpdated(el);

            expect(el.open).to.be.false;
        });
        it('prevent close', async () => {
            const closeSpy = spy();
            const el = await fixture<AlertBanner>(html`
                <sp-alert-banner
                    open
                    dismissible
                    @close=${(event: CustomEvent) => {
                        event.preventDefault();
                        closeSpy();
                    }}
                >
                    Your trial will expire soon
                </sp-alert-banner>
            `);

            await elementUpdated(el);

            const closeButton = el.shadowRoot.querySelector('sp-close-button');
            expect(el.open).to.be.true;

            closeButton?.click();
            await elementUpdated(el);

            expect(el.open).to.be.true;
            expect(closeSpy).to.be.calledOnce;
        });
        it('can be closed using Escape key', async () => {
            const closeSpy = spy();
            const el = await fixture<AlertBanner>(html`
                <sp-alert-banner open dismissible @close=${() => closeSpy()}>
                    Your trial will expire soon
                </sp-alert-banner>
            `);

            await elementUpdated(el);
            expect(el.open).to.be.true;

            el.dispatchEvent(escapeEvent());
            await elementUpdated(el);

            expect(el.open).to.be.false;
            expect(closeSpy).to.be.calledOnce;
        });
    });

    describe('dev mode', () => {
        let consoleStub: SinonStub;
        before(() => {
            window.__swc.verbose = true;
            consoleStub = stub(console, 'warn');
        });

        after(() => {
            window.__swc.verbose = false;
            consoleStub.restore();
        });

        it('should log dev warning when given invalid variant', async () => {
            const el = await fixture<AlertBanner>(html`
                <sp-alert-banner open variant="inexistent">
                    Your trial will expire soon
                </sp-alert-banner>
            `);

            await elementUpdated(el);

            const warning = consoleStub.getCall(0).args.at(0);
            const expectedContent = `<sp-alert-banner> element expects the "variant" attribute to be one of the following`;

            expect(consoleStub).to.be.calledOnce;
            expect(warning.includes(expectedContent)).to.be.true;
            expect(warning.includes('neutral')).to.be.true;
            expect(warning.includes('info')).to.be.true;
            expect(warning.includes('negative')).to.be.true;
        });
    });
});
