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

import '@spectrum-web-components/thumbnail/sp-thumbnail.js';
import { Thumbnail } from '..';
import { thumbnail } from '../stories/images.js';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { stub } from 'sinon';

describe('Thumbnail', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Thumbnail>(html`
                <sp-thumbnail>
                    <img src=${thumbnail} alt="Woman crouching" />
                </sp-thumbnail>
            `)
    );
    it('loads default thumbnail accessibly', async () => {
        const el = await fixture<Thumbnail>(html`
            <sp-thumbnail>
                <img src=${thumbnail} alt="Woman crouching" />
            </sp-thumbnail>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('can be size `50`', async () => {
        const el = await fixture<Thumbnail>(html`
            <sp-thumbnail size="50">
                <img src=${thumbnail} alt="Woman crouching" />
            </sp-thumbnail>
        `);

        await elementUpdated(el);

        expect(el.size).to.equal('50');
    });
    it('accepts `background`', async () => {
        const el = await fixture<Thumbnail>(html`
            <sp-thumbnail background="blue">
                <img src=${thumbnail} alt="Woman crouching" />
            </sp-thumbnail>
        `);

        const background = el.shadowRoot.querySelector('.background');
        expect(background).to.not.be.null;
    });
    it('renders the opacity checkerboard and slot', async () => {
        const el = await fixture<Thumbnail>(html`
            <sp-thumbnail>
                <img src=${thumbnail} alt="Woman crouching" />
            </sp-thumbnail>
        `);

        await elementUpdated(el);
        el.setAttribute('layer', 'true');
        await elementUpdated(el);
        const checkerboard = el.shadowRoot.querySelector(
            '.opacity-checkerboard.layer-inner'
        );
        expect(checkerboard).to.not.be.null;

        const slot = checkerboard?.querySelector('slot');
        expect(slot).to.not.be.null;
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
    });
});
