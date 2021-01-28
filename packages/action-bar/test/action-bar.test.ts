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

import { fixture, elementUpdated, expect, html } from '@open-wc/testing';

import '../sp-action-bar.js';
import { ActionBar } from '..';
import { Default } from '../stories/action-bar.stories.js';

describe('ActionBar', () => {
    it('loads', async () => {
        const el = await fixture<ActionBar>(Default());

        await elementUpdated(el);

        expect(el).to.not.be.undefined;

        await expect(el).to.be.accessible();
    });

    it('accepts variants', async () => {
        const el = await fixture<ActionBar>(
            html`
                <sp-action-bar variant="sticky">Help text.</sp-action-bar>
            `
        );

        await elementUpdated(el);

        expect(el.variant).to.equal('sticky');
        expect(el.getAttribute('variant')).to.equal('sticky');

        el.variant = 'fixed';

        await elementUpdated(el);

        expect(el.variant).to.equal('fixed');
        expect(el.getAttribute('variant')).to.equal('fixed');

        el.setAttribute('variant', 'sticky');

        await elementUpdated(el);

        expect(el.variant).to.equal('sticky');
        expect(el.getAttribute('variant')).to.equal('sticky');

        el.removeAttribute('variant');

        await elementUpdated(el);

        expect(el.variant).to.equal('');
        expect(el.hasAttribute('variant')).to.be.false;
    });
    it('validates variants', async () => {
        const el = await fixture<ActionBar>(
            html`
                <sp-action-bar variant="other">Help text.</sp-action-bar>
            `
        );

        await elementUpdated(el);

        expect(el.variant).to.equal('');
        expect(el.hasAttribute('variant')).to.be.false;

        el.variant = 'fixed';

        await elementUpdated(el);

        expect(el.variant).to.equal('fixed');
        expect(el.getAttribute('variant')).to.equal('fixed');

        el.variant = 'fixed';

        await elementUpdated(el);

        expect(el.variant).to.equal('fixed');
        expect(el.getAttribute('variant')).to.equal('fixed');
    });
});
