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

import '@spectrum-web-components/link/sp-link.js';
import { Link } from '@spectrum-web-components/link';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { spy, stub } from 'sinon';

describe('Link', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Link>(html`
                <sp-link href="test_url">Default Link</sp-link>
            `)
    );
    it('loads', async () => {
        const el = await fixture<Link>(html`
            <sp-link href="test_url">Default Link</sp-link>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Default Link');

        await expect(el).to.be.accessible();
    });

    it('loads[download]', async () => {
        const el = await fixture<Link>(html`
            <sp-link href="test_url" download="somefile.txt">
                Default Link
            </sp-link>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Default Link');

        await expect(el).to.be.accessible();
    });

    it('loads[rel]', async () => {
        const el = await fixture<Link>(html`
            <sp-link href="test_url" rel="external">Default Link</sp-link>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.focusElement.getAttribute('rel')).to.eq('external');

        await expect(el).to.be.accessible();
    });

    it('no click triggers for disabled link', async () => {
        const clickSpy = spy();
        const el = await fixture<Link>(html`
            <sp-link href="#" disabled @click=${() => clickSpy()}>
                Disabled Link
            </sp-link>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.disabled).to.eq(true);
        await expect(el).to.be.accessible();
        el.click();
        expect(clickSpy.callCount).to.equal(0);
    });

    it('prefers `staticColor` over `static`', async () => {
        const el = await fixture<Link>(html`
            <sp-link static="white" href="test_url">Default Link</sp-link>
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
        const el = await fixture<Link>(html`
            <sp-link static="white" href="test_url">Default Link</sp-link>
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
                localName: 'sp-link',
                type: 'api',
                level: 'deprecation',
            },
        });
    });
});
