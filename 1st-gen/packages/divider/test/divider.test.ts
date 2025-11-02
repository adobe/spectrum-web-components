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

import '@spectrum-web-components/divider/sp-divider.js';
import { Divider } from '@spectrum-web-components/divider';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

describe('Divider', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Divider>(html`
                <sp-divider></sp-divider>
            `)
    );
    it('loads default divider accessibly', async () => {
        const el = await fixture<Divider>(html`
            <sp-divider></sp-divider>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads [vertical] divider accessibly', async () => {
        const el = await fixture<Divider>(html`
            <sp-divider vertical></sp-divider>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('manages a `static-color` attribute', async () => {
        const el = await fixture<Divider>(html`
            <sp-divider static-color="black"></sp-divider>
        `);

        await elementUpdated(el);
        expect(el.staticColor).to.equal('black');
        expect(el.getAttribute('static-color')).to.equal('black');
        el.removeAttribute('static-color');
        await elementUpdated(el);
        expect(el.staticColor).to.be.null;
        expect(el.hasAttribute('static-color')).to.be.false;
    });
});
