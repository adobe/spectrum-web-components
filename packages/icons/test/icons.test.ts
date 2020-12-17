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
import '../sp-icons-large.js';
import '../sp-icons-medium.js';
import { IconsMedium, IconsLarge } from '../';
import IconsetSVG from '../src/icons-large.svg.js';
import { elementUpdated, fixture, html, expect } from '@open-wc/testing';

describe('icons', () => {
    it('large', async () => {
        const el = await fixture<IconsLarge>(
            html`
                <sp-icons-large></sp-icons-large>
            `
        );

        await elementUpdated(el);

        expect(el).to.not.equal(undefined);
        expect(el.getIconList().length).to.be.above(0);
    });
    it('medium', async () => {
        const el = await fixture<IconsMedium>(
            html`
                <sp-icons-medium></sp-icons-medium>
            `
        );

        await elementUpdated(el);

        expect(el).to.not.equal(undefined);
        expect(el.getIconList().length).to.be.above(0);
    });
    it('listens to slotchange events', async () => {
        const el = await fixture<IconsMedium>(
            html`
                <sp-icons-medium>${IconsetSVG}</sp-icons-medium>
            `
        );

        await elementUpdated(el);

        expect(el).to.not.equal(undefined);
        expect(el.getIconList().length).to.equal(48);
    });
});
