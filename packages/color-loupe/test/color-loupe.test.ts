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

import '@spectrum-web-components/color-loupe/sp-color-loupe.js';
import { ColorLoupe } from '@spectrum-web-components/color-loupe';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

describe('ColorLoupe', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<ColorLoupe>(
                html`
                    <sp-color-loupe></sp-color-loupe>
                `
            )
    );
    it('loads default color-loupe accessibly', async () => {
        const el = await fixture<ColorLoupe>(
            html`
                <sp-color-loupe></sp-color-loupe>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
});
