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

import '@spectrum-web-components/badge/sp-badge.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark-circle.js';
import { stub } from 'sinon';
import { Badge } from '../src/Badge.js';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

describe('Badge', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Badge>(
                html`
                    <sp-badge>
                        <sp-icon-checkmark-circle
                            slot="icon"
                        ></sp-icon-checkmark-circle>
                        Icon and label
                    </sp-badge>
                `
            )
    );
    it('loads default badge accessibly', async () => {
        const consoleWarnStub = stub(console, 'warn');
        const el = await fixture<Badge>(
            html`
                <sp-badge>
                    <sp-icon-checkmark-circle
                        slot="icon"
                    ></sp-icon-checkmark-circle>
                    Icon and label
                </sp-badge>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
        expect(consoleWarnStub.called).to.be.false;
        consoleWarnStub.restore();
    });
    it('warns in Dev Mode when sent an incorrect `variant`', async () => {
        const consoleWarnStub = stub(console, 'warn');
        const el = await fixture<Badge>(
            html`
                <sp-badge variant="other">
                    <sp-icon-checkmark-circle
                        slot="icon"
                    ></sp-icon-checkmark-circle>
                    Icon and label
                </sp-badge>
            `
        );

        await elementUpdated(el);

        expect(consoleWarnStub.called).to.be.true;
        const spyCall = consoleWarnStub.getCall(0);
        expect(
            spyCall.args.at(0).includes('"variant"'),
            'confirm variant-centric message'
        ).to.be.true;
        expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
            data: {
                localName: 'sp-badge',
                type: 'api',
                level: 'default',
            },
        });
        consoleWarnStub.restore();
    });
});
