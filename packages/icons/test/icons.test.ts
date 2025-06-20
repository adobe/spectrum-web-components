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
import '@spectrum-web-components/icons/sp-icons-large.js';
import '@spectrum-web-components/icons/sp-icons-medium.js';
import { IconsLarge, IconsMedium } from '../';
import IconsetSVG from '../src/icons-large.svg.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { stub } from 'sinon';

describe('icons', () => {
    it('large', async () => {
        const el = await fixture<IconsLarge>(html`
            <sp-icons-large></sp-icons-large>
        `);

        await elementUpdated(el);

        expect(el).to.not.equal(undefined);
        expect(el.getIconList().length).to.be.above(0);
    });
    it('medium', async () => {
        const el = await fixture<IconsMedium>(html`
            <sp-icons-medium></sp-icons-medium>
        `);

        await elementUpdated(el);

        expect(el).to.not.equal(undefined);
        expect(el.getIconList().length).to.be.above(0);
    });
    it('listens to slotchange events', async () => {
        const el = await fixture<IconsMedium>(html`
            <sp-icons-medium>${IconsetSVG}</sp-icons-medium>
        `);

        await elementUpdated(el);

        expect(el).to.not.equal(undefined);
        expect(el.getIconList().length).to.equal(48);
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

    it('warns in devMode for deprecated usage - medium', async () => {
        const el = await fixture<IconsMedium>(html`
            <sp-icons-medium>${IconsetSVG}</sp-icons-medium>
        `);

        await elementUpdated(el);
        expect(consoleWarnStub.called).to.be.true;

        const spyCall = consoleWarnStub.getCall(0);
        expect(
            (spyCall.args.at(0) as string).includes('deprecated'),
            'confirm deprecated variant warning'
        ).to.be.true;
        expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
            data: {
                localName: 'sp-icons-medium',
                type: 'api',
                level: 'deprecation',
            },
        });
    });
    it('warns in devMode for deprecated usage - large', async () => {
        const el = await fixture<IconsLarge>(html`
            <sp-icons-large>${IconsetSVG}</sp-icons-large>
        `);

        await elementUpdated(el);
        expect(consoleWarnStub.called).to.be.true;

        const spyCall = consoleWarnStub.getCall(0);
        expect(
            (spyCall.args.at(0) as string).includes('deprecated'),
            'confirm deprecated variant warning'
        ).to.be.true;
        expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
            data: {
                localName: 'sp-icons-large',
                type: 'api',
                level: 'deprecation',
            },
        });
    });
});
