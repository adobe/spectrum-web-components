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
import {
    shiftEvent,
    arrowUpEvent,
    arrowDownEvent,
    arrowLeftEvent,
    arrowRightEvent,
    arrowUpKeyupEvent,
    arrowDownKeyupEvent,
    arrowLeftKeyupEvent,
    arrowRightKeyupEvent,
    shiftKeyupEvent,
} from '../../../test/testing-helpers.js';

import '../sp-color-area.js';
import { ColorArea } from '..';

describe('ColorArea', () => {
    it('loads default color-area accessibly', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area></sp-color-area>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('accepts "color" values as hsl', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area color="hsl(100, 50%, 50%)"></sp-color-area>
            `
        );

        await elementUpdated(el);

        expect(el.hue, 'hue').to.equal(100.00000000000003);
        expect(el.x, 'x').to.equal(0.6666666666666666);
        expect(el.y, 'y').to.equal(0.25);
    });
    it('accepts "color" values as hsls', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area color="hsla(100, 50%, 50%, 1)"></sp-color-area>
            `
        );

        await elementUpdated(el);

        expect(el.hue, 'hugh').to.equal(100.00000000000003);
        expect(el.x, 'ex').to.equal(0.6666666666666666);
        expect(el.y, 'why').to.equal(0.25);
    });
    it('accepts "color" values as rgb', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area color="rgb(0,255,0)"></sp-color-area>
            `
        );

        await elementUpdated(el);

        expect(el.hue).to.equal(120);
        expect(el.x).to.equal(1);
        expect(el.y).to.equal(0);
    });
    it('accepts "color" values as hex', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area color="#00ff00"></sp-color-area>
            `
        );

        await elementUpdated(el);

        expect(el.hue).to.equal(120);
        expect(el.x).to.equal(1);
        expect(el.y).to.equal(0);
    });
    it('accepts "Arrow*" keypresses', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area color="hsla(100, 50%, 50%, 1)"></sp-color-area>
            `
        );

        await elementUpdated(el);

        expect(el.hue, 'hue').to.equal(100.00000000000003);
        expect(el.x, 'x').to.equal(0.6666666666666666);
        expect(el.y, 'y').to.equal(0.25);

        el.dispatchEvent(arrowUpEvent);
        el.dispatchEvent(arrowUpKeyupEvent);
        el.dispatchEvent(arrowUpEvent);
        el.dispatchEvent(arrowUpKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(0.6666666666666666);
        expect(el.y).to.equal(0.22999999999999998);

        el.dispatchEvent(arrowRightEvent);
        el.dispatchEvent(arrowRightKeyupEvent);
        el.dispatchEvent(arrowRightEvent);
        el.dispatchEvent(arrowRightKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(0.6866666666666666);
        expect(el.y).to.equal(0.22999999999999998);

        el.dispatchEvent(arrowDownEvent);
        el.dispatchEvent(arrowDownKeyupEvent);
        el.dispatchEvent(arrowDownEvent);
        el.dispatchEvent(arrowDownKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(0.6866666666666666);
        expect(el.y).to.equal(0.25);

        el.dispatchEvent(arrowLeftEvent);
        el.dispatchEvent(arrowLeftKeyupEvent);
        el.dispatchEvent(arrowLeftEvent);
        el.dispatchEvent(arrowLeftKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(0.6666666666666666);
        expect(el.y).to.equal(0.25);
    });
    it('accepts "Arrow*" keypresses with alteration', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area color="hsla(100, 50%, 50%, 1)"></sp-color-area>
            `
        );

        await elementUpdated(el);

        expect(el.hue, 'hue').to.equal(100.00000000000003);
        expect(el.x, 'x').to.equal(0.6666666666666666);
        expect(el.y, 'y').to.equal(0.25);

        el.dispatchEvent(shiftEvent);
        el.dispatchEvent(arrowUpEvent);
        el.dispatchEvent(arrowUpKeyupEvent);
        el.dispatchEvent(arrowUpEvent);
        el.dispatchEvent(arrowUpKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(0.6666666666666666);
        expect(el.y).to.equal(0.15000000000000002);

        el.dispatchEvent(arrowRightEvent);
        el.dispatchEvent(arrowRightKeyupEvent);
        el.dispatchEvent(arrowRightEvent);
        el.dispatchEvent(arrowRightKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(0.7666666666666667);
        expect(el.y).to.equal(0.15000000000000002);

        el.dispatchEvent(arrowDownEvent);
        el.dispatchEvent(arrowDownKeyupEvent);
        el.dispatchEvent(arrowDownEvent);
        el.dispatchEvent(arrowDownKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(0.7666666666666667);
        expect(el.y).to.equal(0.25);

        el.dispatchEvent(arrowLeftEvent);
        el.dispatchEvent(arrowLeftKeyupEvent);
        el.dispatchEvent(arrowLeftEvent);
        el.dispatchEvent(arrowLeftKeyupEvent);
        el.dispatchEvent(shiftKeyupEvent);

        await elementUpdated(el);

        expect(el.x).to.equal(0.6666666666666666);
        expect(el.y).to.equal(0.25);
    });
    it('accepts pointer events', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area
                    style="--spectrum-colorarea-default-width: 192px; --spectrum-colorarea-default-height: 192px;"
                ></sp-color-area>
            `
        );

        await elementUpdated(el);

        const { handle } = (el as unknown) as { handle: HTMLElement };

        handle.setPointerCapture = () => {
            return;
        };
        handle.releasePointerCapture = () => {
            return;
        };

        expect(el.hue).to.equal(0);
        expect(el.x).to.equal(1);
        expect(el.y).to.equal(0);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const gradient = root.querySelector('.gradient') as HTMLElement;
        gradient.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
                clientX: 100,
                clientY: 100,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.hue).to.equal(0);
        expect(el.x).to.equal(0.4791666666666667);
        expect(el.y).to.equal(0.4791666666666667);

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                pointerId: 1,
                clientX: 110,
                clientY: 110,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        handle.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 1,
                clientX: 110,
                clientY: 110,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.hue).to.equal(0);
        expect(el.x).to.equal(0.53125);
        expect(el.y).to.equal(0.53125);
    });
});
