/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { expect, fixture, html } from '@open-wc/testing';
import type SwanBadge from './badge.component.js';
import './badge.js';

describe('SwanBadge', () => {
    it('should render with default properties', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge>Badge</swan-badge>
        `);

        expect(el.variant).to.equal('informative');
        expect(el.size).to.equal('m');
        expect(el.fixed).to.be.undefined;
    });

    it('should reflect properties to attributes', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge variant="positive" size="l" fixed="inline-end">
                Badge
            </swan-badge>
        `);

        expect(el.getAttribute('variant')).to.equal('positive');
        expect(el.getAttribute('size')).to.equal('l');
        expect(el.getAttribute('fixed')).to.equal('inline-end');
    });

    it('should render icon slot when icon is present', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge>
                <svg slot="icon" width="12" height="12"></svg>
                Badge with icon
            </swan-badge>
        `);

        const iconSlot = el.shadowRoot!.querySelector('slot[name="icon"]');
        expect(iconSlot).to.exist;
    });

    it('should detect icon-only badges', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge>
                <svg slot="icon" width="12" height="12"></svg>
            </swan-badge>
        `);

        // Need to wait for slot content detection
        await el.updateComplete;
        const iconSlot = el.shadowRoot!.querySelector('slot[name="icon"]');
        expect(iconSlot).to.exist;
        expect(iconSlot!.hasAttribute('icon-only')).to.be.true;
    });

    it('should render slotted content in label div', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge>Test Content</swan-badge>
        `);

        const label = el.shadowRoot!.querySelector('.label');
        expect(label).to.exist;
        expect(el.textContent?.trim()).to.equal('Test Content');
    });

    it('should support fixed positioning', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge fixed="block-start">Fixed Badge</swan-badge>
        `);

        expect(el.fixed).to.equal('block-start');
        expect(el.getAttribute('fixed')).to.equal('block-start');
    });
});
