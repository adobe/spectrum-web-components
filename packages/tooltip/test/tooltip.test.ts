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

import '../sp-tooltip.js';
import { Tooltip } from '../';
import { OverlayDisplayQueryDetail } from '@spectrum-web-components/overlay';
import { fixture, elementUpdated, html, expect } from '@open-wc/testing';

describe('Tooltip', () => {
    it('loads', async () => {
        const el = await fixture<Tooltip>(
            html`
                <sp-tooltip>Help text.</sp-tooltip>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('accepts variants', async () => {
        const el = await fixture<Tooltip>(
            html`
                <sp-tooltip variant="negative">Help text.</sp-tooltip>
            `
        );

        await elementUpdated(el);

        expect(el.variant).to.equal('negative');
        expect(el.getAttribute('variant')).to.equal('negative');

        el.variant = 'info';

        await elementUpdated(el);

        expect(el.variant).to.equal('info');
        expect(el.getAttribute('variant')).to.equal('info');

        el.setAttribute('variant', 'positive');

        await elementUpdated(el);

        expect(el.variant).to.equal('positive');
        expect(el.getAttribute('variant')).to.equal('positive');

        el.removeAttribute('variant');

        await elementUpdated(el);

        expect(el.variant).to.equal('');
        expect(el.hasAttribute('variant')).to.be.false;
    });
    it('validates variants', async () => {
        const el = await fixture<Tooltip>(
            html`
                <sp-tooltip variant="other">Help text.</sp-tooltip>
            `
        );

        await elementUpdated(el);

        expect(el.variant).to.equal('');
        expect(el.hasAttribute('variant')).to.be.false;

        el.variant = 'info';

        await elementUpdated(el);

        expect(el.variant).to.equal('info');
        expect(el.getAttribute('variant')).to.equal('info');

        el.variant = 'info';

        await elementUpdated(el);

        expect(el.variant).to.equal('info');
        expect(el.getAttribute('variant')).to.equal('info');
    });

    it('answers tip query', async () => {
        const el = await fixture<Tooltip>(
            html`
                <sp-tooltip placement="top">Help text.</sp-tooltip>
            `
        );

        await elementUpdated(el);

        const overlayDetailQuery: OverlayDisplayQueryDetail = {};
        const queryOverlayDetailEvent = new CustomEvent<
            OverlayDisplayQueryDetail
        >('sp-overlay-query', {
            bubbles: true,
            composed: true,
            detail: overlayDetailQuery,
            cancelable: true,
        });
        el.dispatchEvent(queryOverlayDetailEvent);

        expect(overlayDetailQuery.overlayContentTipElement).to.exist;
        if (overlayDetailQuery.overlayContentTipElement) {
            expect(overlayDetailQuery.overlayContentTipElement.id).to.equal(
                'tip'
            );
        }
    });
});
