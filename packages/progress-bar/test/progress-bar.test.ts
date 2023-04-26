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

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';

import '@spectrum-web-components/progress-bar/sp-progress-bar.js';
import { ProgressBar } from '@spectrum-web-components/progress-bar';
import { stub } from 'sinon';
import {
    testForLitDevWarnings,
    warnsOnDoubleRegister,
} from '../../../test/testing-helpers.js';

describe('ProgressBar', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<ProgressBar>(
                html`
                    <sp-progress-bar label="Loading"></sp-progress-bar>
                `
            )
    );
    it('loads default progress-bar accessibly', async () => {
        const el = await fixture<ProgressBar>(
            html`
                <sp-progress-bar label="Loading"></sp-progress-bar>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;

        await expect(el).to.be.accessible();
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
    it('warns in Dev Mode when accessible attributes are not leveraged', async () => {
        const consoleWarnStub = stub(console, 'warn');
        const el = await fixture<ProgressBar>(html`
            <sp-progress-bar progress="50"></sp-progress-bar>
        `);

        await elementUpdated(el);

        expect(consoleWarnStub.called).to.be.true;
        const spyCall = consoleWarnStub.getCall(0);
        expect(
            spyCall.args.at(0).includes('accessible'),
            'confirm accessibility-centric message'
        ).to.be.true;
        expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
            data: {
                localName: 'sp-progress-bar',
                type: 'accessibility',
                level: 'default',
            },
        });
        consoleWarnStub.restore();
    });
    describe(
        'dev mode registration large',
        warnsOnDoubleRegister(() => import('../sp-progress-bar.js'))
    );
});
