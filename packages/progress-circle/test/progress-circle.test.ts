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

import '@spectrum-web-components/progress-circle/sp-progress-circle.js';
import { ProgressCircle } from '@spectrum-web-components/progress-circle';
import { stub } from 'sinon';
import {
    testForLitDevWarnings,
    warnsOnDoubleRegister,
} from '../../../test/testing-helpers.js';

describe('ProgressCircle', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<ProgressCircle>(html`
                <sp-progress-circle label="Loading"></sp-progress-circle>
            `)
    );
    it('loads', async () => {
        const el = await fixture<ProgressCircle>(html`
            <sp-progress-circle label="Loading"></sp-progress-circle>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;

        await expect(el).to.be.accessible();
    });
    it('loads - [indeterminate]', async () => {
        const el = await fixture<ProgressCircle>(html`
            <sp-progress-circle
                indeterminate
                label="Loading"
            ></sp-progress-circle>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;

        await expect(el).to.be.accessible();
    });
    it('accepts user `role`', async () => {
        const el = await fixture<ProgressCircle>(html`
            <sp-progress-circle
                role="progressbar"
                label="With user role"
            ></sp-progress-circle>
        `);

        await elementUpdated(el);

        expect(el.getAttribute('role')).to.equal('progressbar');
    });
    it('returns to indeterminate', async () => {
        const el = await fixture<ProgressCircle>(html`
            <sp-progress-circle
                progress="50"
                label="Will be indeterminate"
            ></sp-progress-circle>
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
        const el = await fixture<ProgressCircle>(html`
            <sp-progress-circle progress="50"></sp-progress-circle>
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
                localName: 'sp-progress-circle',
                type: 'accessibility',
                level: 'default',
            },
        });
        consoleWarnStub.restore();
    });
    describe(
        'dev mode registration large',
        warnsOnDoubleRegister(() => import('../sp-progress-circle.js'))
    );
});
