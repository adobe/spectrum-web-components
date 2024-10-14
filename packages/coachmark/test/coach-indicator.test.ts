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

import '@spectrum-web-components/coachmark/sp-coach-indicator.js';
import { CoachIndicator } from '@spectrum-web-components/coachmark';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { stub } from 'sinon';

describe('CoachIndicator', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<CoachIndicator>(html`
                <sp-coach-indicator></sp-coach-indicator>
            `)
    );
    it('loads default coach-indicator accessibly', async () => {
        const el = await fixture<CoachIndicator>(html`
            <sp-coach-indicator></sp-coach-indicator>
        `);
        await elementUpdated(el);
        await expect(el).to.be.accessible();
    });
    it('loads coach-indicator white static-color when static is set', async () => {
        const el = await fixture<CoachIndicator>(html`
            <sp-coach-indicator static="white"></sp-coach-indicator>
        `);
        await elementUpdated(el);
        expect(el.staticColor == 'white').to.be.true;
        expect(el.getAttribute('static-color')).to.equal('white');
    });
    it('loads coach-indicator white static-color variant', async () => {
        const el = await fixture<CoachIndicator>(html`
            <sp-coach-indicator variant="white"></sp-coach-indicator>
        `);
        await elementUpdated(el);
        expect(el.staticColor == 'white').to.be.true;
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
        const el = await fixture<CoachIndicator>(html`
            <sp-coach-indicator static="white"></sp-coach-indicator>
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
                localName: 'sp-coach-indicator',
                type: 'api',
                level: 'deprecation',
            },
        });
    });

    it('warns in Dev Mode when deprecated `variant` attribute is used', async () => {
        const el = await fixture<CoachIndicator>(html`
            <sp-coach-indicator variant="white"></sp-coach-indicator>
        `);
        await elementUpdated(el);
        expect(consoleWarnStub.called).to.be.true;

        const spyCall = consoleWarnStub.getCall(0);
        expect(
            (spyCall.args.at(0) as string).includes('The "variant" attribute'),
            'confirm deprecated static warning'
        ).to.be.true;
        expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
            data: {
                localName: 'sp-coach-indicator',
                type: 'api',
                level: 'deprecation',
            },
        });
    });
});
