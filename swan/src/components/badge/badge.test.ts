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

        expect(el.variant).to.equal('neutral');
        expect(el.size).to.equal('medium');
        expect(el.pill).to.be.false;
        expect(el.pulse).to.be.false;
    });

    it('should reflect properties to attributes', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge variant="positive" size="large" pill pulse>
                Badge
            </swan-badge>
        `);

        expect(el.getAttribute('variant')).to.equal('positive');
        expect(el.getAttribute('size')).to.equal('large');
        expect(el.hasAttribute('pill')).to.be.true;
        expect(el.hasAttribute('pulse')).to.be.true;
    });

    it('should apply correct CSS classes', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge variant="negative" size="small" pill>Badge</swan-badge>
        `);

        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge).to.exist;
        expect(badge!.classList.contains('badge--negative')).to.be.true;
        expect(badge!.classList.contains('badge--small')).to.be.true;
        expect(badge!.classList.contains('badge--pill')).to.be.true;
    });

    it('should render slotted content', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge>Test Content</swan-badge>
        `);

        expect(el.textContent?.trim()).to.equal('Test Content');
    });

    it('should have role="status"', async () => {
        const el = await fixture<SwanBadge>(html`
            <swan-badge>Badge</swan-badge>
        `);
        const badge = el.shadowRoot!.querySelector('.badge');

        expect(badge!.getAttribute('role')).to.equal('status');
    });
});
