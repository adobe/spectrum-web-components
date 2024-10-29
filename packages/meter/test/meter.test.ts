/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';

import '@spectrum-web-components/meter/sp-meter.js';
import { Meter, meterVariants } from '@spectrum-web-components/meter';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { createLanguageContext } from '../../../tools/reactive-controllers/test/helpers.js';
import { stub } from 'sinon';

describe('Meter', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Meter>(html`
                <sp-meter label="Loading"></sp-meter>
            `)
    );
    it('loads default meter accessibly', async () => {
        const el = await fixture<Meter>(html`
            <sp-meter label="Loading"></sp-meter>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;

        await expect(el).to.be.accessible();
    });
    meterVariants.map((variant) => {
        it(`loads - [variant="${variant}"]`, async () => {
            const el = await fixture<Meter>(html`
                <sp-meter variant=${variant}>
                    This meter is of the \`${variant}\` variant.
                </sp-meter>
            `);

            await elementUpdated(el);

            await expect(el).to.be.accessible();
        });
    });
    it('accepts a changing process w/ [label]', async () => {
        const el = await fixture<Meter>(html`
            <sp-meter label="Changing Value"></sp-meter>
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

    it('accepts label from `slot`', async () => {
        const el = await fixture<Meter>(html`
            <sp-meter>Label From Slot</sp-meter>
        `);

        await elementUpdated(el);

        expect(el.getAttribute('label')).to.equal('Label From Slot');
    });
    it('accepts a changing process', async () => {
        const el = await fixture<Meter>(html`
            <sp-meter>Changing Value</sp-meter>
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

    it('resolves a language (en-US)', async () => {
        const [languageContext] = createLanguageContext('en-US');
        const test = await fixture(html`
            <div @sp-language-context=${languageContext}>
                <sp-meter label="Changing Value" progress="45"></sp-meter>
            </div>
        `);
        const el = test.querySelector('sp-meter') as Meter;
        const percentage = el.shadowRoot.querySelector(
            '.percentage'
        ) as HTMLElement;
        expect(percentage.textContent?.search('%')).to.not.equal(-1);
    });

    it('resolves a language (ar-sa)', async () => {
        const [languageContext] = createLanguageContext('ar-sa');
        const test = await fixture(html`
            <div @sp-language-context=${languageContext}>
                <sp-meter label="Changing Value" progress="45"></sp-meter>
            </div>
        `);
        const el = test.querySelector('sp-meter') as Meter;
        const percentage = el.shadowRoot.querySelector(
            '.percentage'
        ) as HTMLElement;
        expect(percentage.textContent?.search('٪')).to.not.equal(-1);
    });

    it('validates variants', async () => {
        const el = await fixture<Meter>(html`
            <sp-meter variant="invalid">
                This meter validates variants.
            </sp-meter>
        `);

        await elementUpdated(el);
        expect(el.variant).to.equal('');

        el.variant = meterVariants[0];

        await elementUpdated(el);
        expect(el.variant).to.equal(meterVariants[0]);

        el.variant = meterVariants[0];

        await elementUpdated(el);
        expect(el.variant).to.equal(meterVariants[0]);
    });

    it('prefers `staticColor` over `static`', async () => {
        const el = await fixture<Meter>(html`
            <sp-meter static="white" label="Loading"></sp-meter>
        `);
        await elementUpdated(el);
        expect(el.staticColor).to.equal('white');
        el.setAttribute('static', 'white');
        await elementUpdated(el);
        expect(el.staticColor).to.equal('white');
        expect(el.static).to.equal('white');
        expect(el.getAttribute('static-color')).to.equal('white');
    });
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

    it('warns in Dev Mode when deprecated `static` attribute is used', async () => {
        const el = await fixture<Meter>(html`
            <sp-meter static="white" label="Loading"></sp-meter>
        `);
        await elementUpdated(el);
        expect(consoleWarnStub.called).to.be.true;

        const spyCall = consoleWarnStub.getCall(0);
        expect(
            (spyCall.args.at(0) as string).includes('deprecated'),
            'confirm deprecated static warning'
        ).to.be.true;
        expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
            data: {
                localName: 'sp-meter',
                type: 'api',
                level: 'deprecation',
            },
        });
    });
});
