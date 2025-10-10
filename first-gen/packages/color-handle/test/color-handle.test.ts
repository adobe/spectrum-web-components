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

import '@spectrum-web-components/color-handle/sp-color-handle.js';
import { ColorHandle } from '@spectrum-web-components/color-handle';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

describe('ColorHandle', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<ColorHandle>(html`
                <sp-color-handle></sp-color-handle>
            `)
    );
    it('loads default color-handle accessibly', async () => {
        const el = await fixture<ColorHandle>(html`
            <sp-color-handle></sp-color-handle>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads [open] color-handle accessibly', async () => {
        const el = await fixture<ColorHandle>(html`
            <sp-color-handle open></sp-color-handle>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('opens/closes on pointerdown/up/cancel', async () => {
        const el = await fixture<ColorHandle>(html`
            <sp-color-handle></sp-color-handle>
        `);

        await elementUpdated(el);
        el.setPointerCapture = () => {
            return;
        };
        el.releasePointerCapture = () => {
            return;
        };

        el.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
                pointerType: 'touch',
            })
        );

        await elementUpdated(el);

        expect(el.open).to.be.true;

        el.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 1,
                pointerType: 'touch',
            })
        );

        await elementUpdated(el);

        expect(el.open).to.be.false;

        el.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
                pointerType: 'touch',
            })
        );

        await elementUpdated(el);

        expect(el.open).to.be.true;

        el.dispatchEvent(
            new PointerEvent('pointercancel', {
                pointerId: 1,
                pointerType: 'touch',
            })
        );

        await elementUpdated(el);

        expect(el.open).to.be.false;
    });
});
