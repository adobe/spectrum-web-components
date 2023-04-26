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

import '@spectrum-web-components/link/sp-link.js';
import { Link } from '@spectrum-web-components/link';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import {
    testForLitDevWarnings,
    warnsOnDoubleRegister,
} from '../../../test/testing-helpers.js';

describe('Link', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Link>(
                html`
                    <sp-link href="test_url">Default Link</sp-link>
                `
            )
    );
    it('loads', async () => {
        const el = await fixture<Link>(
            html`
                <sp-link href="test_url">Default Link</sp-link>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Default Link');

        await expect(el).to.be.accessible();
    });

    it('loads[download]', async () => {
        const el = await fixture<Link>(
            html`
                <sp-link href="test_url" download="somefile.txt">
                    Default Link
                </sp-link>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Default Link');

        await expect(el).to.be.accessible();
    });

    it('loads[rel]', async () => {
        const el = await fixture<Link>(
            html`
                <sp-link href="test_url" rel="external">Default Link</sp-link>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.focusElement.getAttribute('rel')).to.eq('external');

        await expect(el).to.be.accessible();
    });

    describe(
        'dev mode registration',
        warnsOnDoubleRegister(() => import('../sp-link.js'))
    );
});
