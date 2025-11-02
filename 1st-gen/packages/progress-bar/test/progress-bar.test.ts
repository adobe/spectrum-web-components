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

import '@spectrum-web-components/progress-bar/sp-progress-bar.js';
import { ProgressBar } from '@spectrum-web-components/progress-bar';
import { stub } from 'sinon';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { createLanguageContext } from '../../../tools/reactive-controllers/test/helpers.js';

describe('ProgressBar', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<ProgressBar>(html`
                <sp-progress-bar label="Loading"></sp-progress-bar>
            `)
    );
    it('loads default progress-bar accessibly', async () => {
        const el = await fixture<ProgressBar>(html`
            <sp-progress-bar label="Loading"></sp-progress-bar>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;

        await expect(el).to.be.accessible();
    });

    it('accepts label from `slot`', async () => {
        const el = await fixture<ProgressBar>(html`
            <sp-progress-bar role="progressbar">
                Label From Slot
            </sp-progress-bar>
        `);

        await elementUpdated(el);

        expect(el.getAttribute('label')).to.equal('Label From Slot');
    });

    it('handles label attribute changes', async () => {
        const el = await fixture<ProgressBar>(html`
            <sp-progress-bar label="label" indeterminate>
                content
            </sp-progress-bar>
        `);

        await elementUpdated(el);
        el.setAttribute('label', '');
        await elementUpdated(el);

        expect(el.getAttribute('label')).to.equal('');
        el.setAttribute('label', 'label1');
        await elementUpdated(el);
        expect(el.getAttribute('label')).to.equal('label1');
    });

    it('renders label when content is absent', async () => {
        const el = await fixture<ProgressBar>(html`
            <sp-progress-bar label="myLabel" indeterminate></sp-progress-bar>
        `);
        expect(el.getAttribute('label')).to.equal('myLabel');
    });

    it('renders nothing when both content and label is absent', async () => {
        const el = await fixture<ProgressBar>(html`
            <sp-progress-bar></sp-progress-bar>
        `);

        expect(el.getAttribute('label')).to.equal('');
        expect(el.shadowRoot.textContent?.trim()).to.equal('');
    });

    it('accepts a changing progress', async () => {
        const el = await fixture<ProgressBar>(html`
            <sp-progress-bar label="Changing value"></sp-progress-bar>
        `);

        await elementUpdated(el);

        expect(el.hasAttribute('aria-valuenow')).to.be.true;
        expect(el.getAttribute('aria-valuenow')).to.equal('0');

        el.progress = 50;

        await elementUpdated(el);

        expect(el.hasAttribute('aria-valuenow')).to.be.true;
        expect(el.getAttribute('aria-valuenow')).to.equal('50');

        el.progress = 100;

        await elementUpdated(el);

        expect(el.hasAttribute('aria-valuenow')).to.be.true;
        expect(el.getAttribute('aria-valuenow')).to.equal('100');
    });
    it('loads - [indeterminate]', async () => {
        const el = await fixture<ProgressBar>(html`
            <sp-progress-bar indeterminate label="Loading"></sp-progress-bar>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;

        await expect(el).to.be.accessible();
    });
    it('accepts user `role`', async () => {
        const el = await fixture<ProgressBar>(html`
            <sp-progress-bar
                role="progressbar"
                label="With user role"
            ></sp-progress-bar>
        `);

        await elementUpdated(el);

        expect(el.getAttribute('role')).to.equal('progressbar');
    });
    it('returns to indeterminate', async () => {
        const el = await fixture<ProgressBar>(html`
            <sp-progress-bar
                progress="50"
                label="Sometimes indeterminate"
            ></sp-progress-bar>
        `);

        await elementUpdated(el);

        expect(el.hasAttribute('aria-valuenow')).to.be.true;
        expect(el.getAttribute('aria-valuenow')).to.equal('50');

        el.indeterminate = true;

        await elementUpdated(el);

        expect(el.hasAttribute('aria-valuenow')).to.be.false;
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

        it('warns in Dev Mode when accessible attributes are not leveraged', async () => {
            const el = await fixture<ProgressBar>(html`
                <sp-progress-bar progress="50"></sp-progress-bar>
            `);

            await elementUpdated(el);

            const spyCall = consoleWarnStub.getCall(0);
            expect(
                (spyCall.args.at(0) as string).includes('accessible'),
                'confirm accessibility-centric message'
            ).to.be.true;
            expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
                data: {
                    localName: 'sp-progress-bar',
                    type: 'accessibility',
                    level: 'default',
                },
            });
        });
        it('resolves a language (en-US)', async () => {
            const [languageContext] = createLanguageContext('en-US');
            const test = await fixture(html`
                <div @sp-language-context=${languageContext}>
                    <sp-progress-bar
                        label="Changing Value"
                        progress="45"
                    ></sp-progress-bar>
                </div>
            `);
            const el = test.querySelector('sp-progress-bar') as ProgressBar;
            const percentage = el.shadowRoot.querySelector(
                '.percentage'
            ) as HTMLElement;
            expect(percentage.textContent?.search('%')).to.not.equal(-1);
        });

        it('resolves a language (ar-sa)', async () => {
            const [languageContext] = createLanguageContext('ar-sa');
            const test = await fixture(html`
                <div @sp-language-context=${languageContext}>
                    <sp-progress-bar
                        label="Changing Value"
                        progress="45"
                    ></sp-progress-bar>
                </div>
            `);
            const el = test.querySelector('sp-progress-bar') as ProgressBar;
            const percentage = el.shadowRoot.querySelector(
                '.percentage'
            ) as HTMLElement;
            expect(percentage.textContent?.search('٪')).to.not.equal(-1);
        });

        it('accepts `aria-label`', async () => {
            const el = await fixture<ProgressBar>(html`
                <sp-progress-bar aria-label="Loading"></sp-progress-bar>
            `);

            await elementUpdated(el);

            expect(el.hasAttribute('aria-label')).to.be.true;
            expect(el.getAttribute('aria-label')).to.equal('Loading');
        });
        it('sets `aria-label` to equal `label` if `label` is set', async () => {
            const el = await fixture<ProgressBar>(html`
                <sp-progress-bar label="Loading"></sp-progress-bar>
            `);

            await elementUpdated(el);

            expect(el.hasAttribute('aria-label')).to.be.true;
            expect(el.getAttribute('aria-label')).to.equal('Loading');
        });
        it('does not remove `aria-label` if set independently of `label`', async () => {
            const el = await fixture<ProgressBar>(html`
                <sp-progress-bar
                    label=""
                    aria-label="Loading"
                ></sp-progress-bar>
            `);

            await elementUpdated(el);

            expect(el.hasAttribute('aria-label')).to.be.true;
            expect(el.getAttribute('aria-label')).to.equal('Loading');
        });
        it('warns in devMode for deprecated usage of over-background', async () => {
            const el = await fixture<ProgressBar>(html`
                <sp-progress-bar
                    progress="50"
                    over-background
                    label="Loading"
                ></sp-progress-bar>
            `);

            await elementUpdated(el);
            expect(
                consoleWarnStub.called,
                'confirm deprecated over-background warning'
            ).to.be.true;

            const spyCall = consoleWarnStub.getCall(0);
            expect(
                (spyCall.args.at(0) as string).includes('deprecated'),
                'confirm deprecated over-background warning'
            ).to.be.true;
            expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
                data: {
                    localName: 'sp-progress-bar',
                    type: 'api',
                    level: 'deprecation',
                },
            });
        });
        it('warns in Dev Mode when accessible attributes are not leveraged', async () => {
            const el = await fixture<ProgressBar>(html`
                <sp-progress-bar progress="50"></sp-progress-bar>
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
                    localName: 'sp-progress-bar',
                    type: 'accessibility',
                    level: 'default',
                },
            });
        });
    });
});
