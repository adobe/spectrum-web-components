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

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';

import '@spectrum-web-components/underlay/sp-underlay.js';
import { Underlay } from '@spectrum-web-components/underlay';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { spy } from 'sinon';

describe('Underlay', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Underlay>(html`
                <sp-underlay></sp-underlay>
            `)
    );
    it('loads default underlay accessibly', async () => {
        const el = await fixture<Underlay>(html`
            <sp-underlay></sp-underlay>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('fires a close event when clicked', async () => {
        const el = await fixture<Underlay>(html`
            <sp-underlay></sp-underlay>
        `);

        await elementUpdated(el);
        const closeSpy = spy();
        el.addEventListener('close', () => closeSpy());
        expect(closeSpy.callCount).to.equal(0);

        el.dispatchEvent(new PointerEvent('pointerdown', { button: 0 }));
        el.dispatchEvent(new PointerEvent('pointerup'));

        expect(closeSpy.callCount).to.equal(1);
    });
});
