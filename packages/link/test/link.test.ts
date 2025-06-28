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

import '@spectrum-web-components/link/sp-link.js';
import { Link } from '@spectrum-web-components/link';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { spy } from 'sinon';
import { isWebKit } from '@spectrum-web-components/shared';

describe('Link', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Link>(html`
                <sp-link href="test_url">Default Link</sp-link>
            `)
    );
    it('loads', async () => {
        const el = await fixture<Link>(html`
            <sp-link href="test_url">Default Link</sp-link>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Default Link');

        await expect(el).to.be.accessible();
    });

    it('loads[download]', async () => {
        const el = await fixture<Link>(html`
            <sp-link href="test_url" download="somefile.txt">
                Default Link
            </sp-link>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Default Link');

        await expect(el).to.be.accessible();
    });

    it('loads[rel]', async () => {
        const el = await fixture<Link>(html`
            <sp-link href="test_url" rel="external">Default Link</sp-link>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.focusElement.getAttribute('rel')).to.eq('external');

        await expect(el).to.be.accessible();
    });

    it('no click triggers for disabled link', async () => {
        const clickSpy = spy();
        const el = await fixture<Link>(html`
            <sp-link href="#" disabled @click=${() => clickSpy()}>
                Disabled Link
            </sp-link>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.disabled).to.eq(true);
        await expect(el).to.be.accessible();
        el.click();
        expect(clickSpy.callCount).to.equal(0);
    });

    it('has proper Safari keyboard navigation support when running in WebKit', async () => {
        const el = await fixture<Link>(html`
            <sp-link href="test_url">WebKit Test Link</sp-link>
        `);

        await elementUpdated(el);

        // Always verify basic configuration
        expect(el.shadowRoot).to.not.be.null;
        expect(el.shadowRoot?.delegatesFocus).to.be.true;

        const anchor = el.shadowRoot?.querySelector(
            '#anchor'
        ) as HTMLAnchorElement;
        expect(anchor.getAttribute('tabindex')).to.eq('0');

        // WebKit-specific enhanced tests
        if (isWebKit()) {
            // Verify that the anchor element is properly focusable in Safari
            expect(anchor.tabIndex).to.be.greaterThan(-1);

            // Verify that the link maintains proper ARIA attributes in Safari
            expect(anchor.hasAttribute('href')).to.be.true;
            expect(anchor.getAttribute('role')).to.not.equal('button');
        }

        // Common verification for all browsers
        await expect(el).to.be.accessible();
    });
});
