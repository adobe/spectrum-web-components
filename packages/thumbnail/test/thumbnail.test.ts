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

import '@spectrum-web-components/thumbnail/sp-thumbnail.js';
import { Thumbnail } from '..';
import { thumbnail } from '../stories/images.js';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

describe('Thumbnail', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Thumbnail>(
                html`
                    <sp-thumbnail>
                        <img src=${thumbnail} alt="Woman crouching" />
                    </sp-thumbnail>
                `
            )
    );
    it('loads default thumbnail accessibly', async () => {
        const el = await fixture<Thumbnail>(
            html`
                <sp-thumbnail>
                    <img src=${thumbnail} alt="Woman crouching" />
                </sp-thumbnail>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('can be size `xxs`', async () => {
        const el = await fixture<Thumbnail>(
            html`
                <sp-thumbnail size="xxs">
                    <img src=${thumbnail} alt="Woman crouching" />
                </sp-thumbnail>
            `
        );

        await elementUpdated(el);

        expect(el.size).to.equal('xxs');
    });
    it('accepts `background`', async () => {
        const el = await fixture<Thumbnail>(
            html`
                <sp-thumbnail background="blue">
                    <img src=${thumbnail} alt="Woman crouching" />
                </sp-thumbnail>
            `
        );

        const background = el.shadowRoot.querySelector('.background');
        expect(background).to.not.be.null;
    });
});
