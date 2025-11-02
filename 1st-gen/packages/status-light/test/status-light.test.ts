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
import '@spectrum-web-components/status-light/sp-status-light.js';
import { StatusLight } from '@spectrum-web-components/status-light';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';

describe('Status Light', () => {
    it('loads correctly', async () => {
        const el = await fixture<StatusLight>(html`
            <sp-status-light variant="positive"></sp-status-light>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        const rootEl = el.shadowRoot
            ? (el.shadowRoot.querySelector('#root') as HTMLImageElement)
            : (el.querySelector('#root') as HTMLImageElement);
        expect(rootEl).to.not.be.undefined;
    });
    it('[disabled] manages [aria-disabled]', async () => {
        const el = await fixture<StatusLight>(html`
            <sp-status-light variant="positive"></sp-status-light>
        `);

        await elementUpdated(el);

        expect(el.hasAttribute('aria-disabled')).to.be.false;

        el.disabled = true;
        await elementUpdated(el);

        expect(el.hasAttribute('aria-disabled')).to.be.true;
        expect(el.getAttribute('aria-disabled')).to.equal('true');
    });

    describe('dev mode warnings', () => {
        let warningMessage: typeof window.__swc.warn;

        beforeEach(() => {
            // Create __swc if it doesn't exist
            window.__swc = window.__swc || { warn: () => {} };
            // Store original warn function
            warningMessage = window.__swc.warn;
            // Reset issued warnings to avoid dedupe interference
            window.__swc.issuedWarnings = new Set();
            // Enable debug guard
            window.__swc.DEBUG = true;
        });

        afterEach(() => {
            // Restore original warn function
            window.__swc.warn = warningMessage;
        });

        it('warns when unsupported variant is used (brown)', async () => {
            const warnSpy = spy();
            window.__swc.warn = warnSpy as unknown as typeof window.__swc.warn;

            const el = await fixture<StatusLight>(html`
                <sp-status-light variant="brown"></sp-status-light>
            `);

            await elementUpdated(el);

            expect(warnSpy.called).to.be.true;
            expect(warnSpy.firstCall.args[0]).to.equal(el);
            expect(warnSpy.firstCall.args[1]).to.equal(
                `<${el.localName}> element expects the "variant" attribute to be one of the following:`
            );
        });
    });
});
