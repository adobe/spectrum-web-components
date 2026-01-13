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
import '@spectrum-web-components/avatar/sp-avatar.js';
import { Avatar } from '@spectrum-web-components/avatar';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { stub } from 'sinon';

describe('Avatar', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Avatar>(html`
                <sp-avatar
                    label="Shantanu Narayen"
                    src="https://picsum.photos/500/500"
                ></sp-avatar>
            `)
    );
    it('loads accessibly', async () => {
        const el = await fixture<Avatar>(html`
            <sp-avatar
                label="Shantanu Narayen"
                src="https://picsum.photos/500/500"
            ></sp-avatar>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads accessibly with [href]', async () => {
        const el = await fixture<Avatar>(html`
            <sp-avatar
                label="Shantanu Narayen"
                src="https://picsum.photos/500/500"
                href="https://adobe.com"
            ></sp-avatar>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('validates `size`', async () => {
        const el = await fixture<Avatar>(html`
            <sp-avatar
                label="Shantanu Narayen"
                src="https://picsum.photos/500/500"
            ></sp-avatar>
        `);

        await elementUpdated(el);

        expect(el.size).to.equal(100);

        el.setAttribute('size', '55');

        await elementUpdated(el);

        expect(el.size).to.equal(100);

        el.setAttribute('size', '600');

        await elementUpdated(el);

        expect(el.size).to.equal(600);
    });
    it('loads with everything set', async () => {
        const el = await fixture<Avatar>(html`
            <sp-avatar
                label="Shantanu Narayen"
                src="https://picsum.photos/500/500"
            ></sp-avatar>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        const imageEl = el.shadowRoot
            ? (el.shadowRoot.querySelector('img') as HTMLImageElement)
            : (el.querySelector('img') as HTMLImageElement);
        expect(imageEl.hasAttribute('alt')).to.be.true;
        expect(imageEl.getAttribute('alt')).to.equal('Shantanu Narayen');
    });
    it('loads with no label', async () => {
        const el = await fixture<Avatar>(html`
            <sp-avatar src="https://picsum.photos/500/500"></sp-avatar>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        const imageEl = el.shadowRoot
            ? (el.shadowRoot.querySelector('img') as HTMLImageElement)
            : (el.querySelector('img') as HTMLImageElement);
        // When no label is provided, alt should default to empty string for accessibility
        expect(imageEl.hasAttribute('alt')).to.be.true;
        expect(imageEl.getAttribute('alt')).to.equal('');
    });
    it('loads with is-decorative attribute', async () => {
        const el = await fixture<Avatar>(html`
            <sp-avatar
                is-decorative
                src="https://picsum.photos/500/500"
            ></sp-avatar>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.isDecorative).to.be.true;
        const imageEl = el.shadowRoot
            ? (el.shadowRoot.querySelector('img') as HTMLImageElement)
            : (el.querySelector('img') as HTMLImageElement);
        expect(imageEl.hasAttribute('alt')).to.be.true;
        expect(imageEl.getAttribute('alt')).to.equal('');
        expect(imageEl.getAttribute('aria-hidden')).to.equal('true');
    });
    it('loads accessibly with is-decorative', async () => {
        const el = await fixture<Avatar>(html`
            <sp-avatar
                is-decorative
                src="https://picsum.photos/500/500"
            ></sp-avatar>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads accessibly with is-decorative and href when label is provided', async () => {
        const el = await fixture<Avatar>(html`
            <sp-avatar
                is-decorative
                label="User profile"
                src="https://picsum.photos/500/500"
                href="https://adobe.com"
            ></sp-avatar>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('does not set aria-hidden when is-decorative is true with href but no label', async () => {
        const el = await fixture<Avatar>(html`
            <sp-avatar
                is-decorative
                src="https://picsum.photos/500/500"
                href="https://adobe.com"
            ></sp-avatar>
        `);

        await elementUpdated(el);
        const imageEl = el.shadowRoot
            ? (el.shadowRoot.querySelector('img') as HTMLImageElement)
            : (el.querySelector('img') as HTMLImageElement);
        // When decorative and has href, aria-hidden should NOT be set
        // because the link needs accessible text
        expect(imageEl.hasAttribute('aria-hidden')).to.be.false;
        expect(imageEl.getAttribute('alt')).to.equal('');
    });
    it('label takes precedence over is-decorative', async () => {
        const el = await fixture<Avatar>(html`
            <sp-avatar
                label="Shantanu Narayen"
                is-decorative
                src="https://picsum.photos/500/500"
            ></sp-avatar>
        `);

        await elementUpdated(el);
        const imageEl = el.shadowRoot
            ? (el.shadowRoot.querySelector('img') as HTMLImageElement)
            : (el.querySelector('img') as HTMLImageElement);
        expect(imageEl.getAttribute('alt')).to.equal('Shantanu Narayen');
        // When label is provided, is-decorative should be ignored
        expect(imageEl.hasAttribute('aria-hidden')).to.be.false;
    });
    it('can receive a `tabindex` without an `href`', async () => {
        try {
            const el = await fixture<Avatar>(html`
                <sp-avatar
                    label="Shantanu Narayen"
                    src="https://picsum.photos/500/500"
                    tabindex="0"
                ></sp-avatar>
            `);
            await elementUpdated(el);
            const focusEl = el.focusElement;
            expect(focusEl).to.exist;
        } catch (error) {
            expect(() => {
                throw error;
            }).to.throw('There should be no error.');
        }
    });
    describe('dev mode', () => {
        let consoleWarnStub!: ReturnType<typeof stub>;
        before(() => {
            window.__swc.verbose = true;
            consoleWarnStub = stub(console, 'warn');
        });
        afterEach(() => {
            consoleWarnStub.resetHistory();
        });
        after(() => {
            window.__swc.verbose = false;
            consoleWarnStub.restore();
        });
        it('does not warn when label is provided', async () => {
            const el = await fixture<Avatar>(html`
                <sp-avatar
                    label="Shantanu Narayen"
                    src="https://picsum.photos/500/500"
                ></sp-avatar>
            `);

            await elementUpdated(el);

            expect(consoleWarnStub.called).to.be.false;
        });
        it('does not warn when is-decorative is provided', async () => {
            const el = await fixture<Avatar>(html`
                <sp-avatar
                    is-decorative
                    src="https://picsum.photos/500/500"
                ></sp-avatar>
            `);

            await elementUpdated(el);

            expect(consoleWarnStub.called).to.be.false;
        });
        it('warns when neither label nor is-decorative is provided', async () => {
            const el = await fixture<Avatar>(html`
                <sp-avatar src="https://picsum.photos/500/500"></sp-avatar>
            `);

            await elementUpdated(el);

            expect(consoleWarnStub.called).to.be.true;
            const spyCall = consoleWarnStub.getCall(0);
            expect(
                (spyCall.args.at(0) as string).includes('accessible'),
                'confirm accessibility-centric message'
            ).to.be.true;
            expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
                data: {
                    localName: 'sp-avatar',
                    type: 'accessibility',
                    level: 'default',
                },
            });
        });
        it('warns when is-decorative and href are provided without label', async () => {
            const el = await fixture<Avatar>(html`
                <sp-avatar
                    is-decorative
                    src="https://picsum.photos/500/500"
                    href="https://adobe.com"
                ></sp-avatar>
            `);

            await elementUpdated(el);

            expect(consoleWarnStub.called).to.be.true;
            const spyCall = consoleWarnStub.getCall(0);
            expect(
                (spyCall.args.at(0) as string).includes('is-decorative'),
                'confirm decorative link message'
            ).to.be.true;
            expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
                data: {
                    localName: 'sp-avatar',
                    type: 'accessibility',
                    level: 'default',
                },
            });
        });
    });
});
