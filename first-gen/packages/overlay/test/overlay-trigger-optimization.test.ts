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

import { elementUpdated, expect, html } from '@open-wc/testing';
import { OverlayTrigger } from '../src/OverlayTrigger.js';
import { stub } from 'sinon';
import {
    fixture,
    testForLitDevWarnings,
} from '../../../test/testing-helpers.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/overlay/sync/overlay-trigger.js';

describe('Overlay Trigger - Trigger Interactions', () => {
    it('accepts valid trigger interaction combinations', async () => {
        const el = await fixture<OverlayTrigger>(html`
            <overlay-trigger triggered-by="click hover longpress">
                <sp-button slot="trigger">Test Button</sp-button>
                <sp-popover slot="click-content">Click Content</sp-popover>
                <sp-tooltip slot="hover-content">Hover Content</sp-tooltip>
                <sp-popover slot="longpress-content">
                    Longpress Content
                </sp-popover>
            </overlay-trigger>
        `);

        // Test single interaction types
        el.triggeredBy = 'click';
        await elementUpdated(el);
        expect(el.triggeredBy).to.equal('click');

        el.triggeredBy = 'hover';
        await elementUpdated(el);
        expect(el.triggeredBy).to.equal('hover');

        el.triggeredBy = 'longpress';
        await elementUpdated(el);
        expect(el.triggeredBy).to.equal('longpress');

        // Test valid combinations
        el.triggeredBy = 'click hover';
        await elementUpdated(el);
        expect(el.triggeredBy).to.equal('click hover');

        el.triggeredBy = 'click longpress';
        await elementUpdated(el);
        expect(el.triggeredBy).to.equal('click longpress');

        el.triggeredBy = 'hover longpress';
        await elementUpdated(el);
        expect(el.triggeredBy).to.equal('hover longpress');

        el.triggeredBy = 'click hover longpress';
        await elementUpdated(el);
        expect(el.triggeredBy).to.equal('click hover longpress');
    });

    it('optimizes rendering based on trigger interactions', async () => {
        const el = await fixture<OverlayTrigger>(html`
            <overlay-trigger triggered-by="click">
                <sp-button slot="trigger">Test Button</sp-button>
            </overlay-trigger>
        `);

        let overlays = el.shadowRoot!.querySelectorAll('sp-overlay');
        expect(overlays.length).to.equal(1);
        expect(overlays[0].id).to.equal('click-overlay');

        el.triggeredBy = 'click hover';
        await elementUpdated(el);
        await el.updateComplete;

        overlays = el.shadowRoot!.querySelectorAll('sp-overlay');
        expect(overlays.length).to.equal(2);
        expect(overlays[0].id).to.equal('click-overlay');
        expect(overlays[1].id).to.equal('hover-overlay');

        el.triggeredBy = 'click hover longpress';
        await elementUpdated(el);
        await el.updateComplete;

        overlays = el.shadowRoot!.querySelectorAll('sp-overlay');
        expect(overlays.length).to.equal(3);
        expect(overlays[0].id).to.equal('click-overlay');
        expect(overlays[1].id).to.equal('hover-overlay');
        expect(overlays[2].id).to.equal('longpress-overlay');
    });

    it('handles backwards compatible slot assigned content', async () => {
        const el = await fixture<OverlayTrigger>(html`
            <overlay-trigger triggered-by="click">
                <sp-button slot="trigger">Test Button</sp-button>
                <sp-popover slot="click-content">Click Content</sp-popover>
                <sp-tooltip slot="hover-content">Hover Content</sp-tooltip>
            </overlay-trigger>
        `);

        // Even though only "click" is specified, both overlays are created
        const overlays = el.shadowRoot!.querySelectorAll('sp-overlay');
        expect(overlays.length).to.equal(2);
        expect(overlays[0].id).to.equal('click-overlay');
        expect(overlays[1].id).to.equal('hover-overlay');
    });
});

describe('Overlay Trigger', () => {
    testForLitDevWarnings(async () => {
        const el = await fixture<OverlayTrigger>(html`
            <overlay-trigger>
                <sp-button slot="trigger">Test Button</sp-button>
                <sp-popover slot="click-content">Click Content</sp-popover>
                <sp-tooltip slot="hover-content">Hover Content</sp-tooltip>
                <sp-popover slot="longpress-content">
                    Longpress Content
                </sp-popover>
            </overlay-trigger>
        `);
        return el;
    });

    describe('Dev Mode', () => {
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

        it('warns in Dev Mode when no attributes or fragments', async () => {
            const el = await fixture<OverlayTrigger>(html`
                <overlay-trigger></overlay-trigger>
            `);

            await elementUpdated(el);

            expect(consoleWarnStub.called).to.be.true;
            const spyCall = consoleWarnStub.getCall(0);
            expect(
                (spyCall.args.at(0) as string).includes('performance'),
                'Performance optimization available'
            ).to.be.true;
            expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
                data: {
                    localName: 'overlay-trigger',
                    type: 'api',
                    level: 'default',
                },
            });
        });
    });
});
