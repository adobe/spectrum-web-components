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

import '../sp-color-wheel.js';
import { ColorWheel } from '..';
import { HSL, HSLA, HSV, HSVA, RGB, RGBA, TinyColor } from '@ctrl/tinycolor';

describe('ColorWheel', () => {
    it('loads default color-wheel accessibly', async () => {
        const el = await fixture<ColorWheel>(
            html`
                <sp-color-wheel></sp-color-wheel>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('manages [focused]', async () => {
        const el = await fixture<ColorWheel>(
            html`
                <sp-color-wheel></sp-color-wheel>
            `
        );

        await elementUpdated(el);

        el.focusElement.dispatchEvent(new FocusEvent('focus'));
        await elementUpdated(el);

        expect(el.focused);

        el.focusElement.dispatchEvent(new FocusEvent('blur'));
        await elementUpdated(el);

        expect(!el.focused);
    });
    it('accepts "Arrow*" keypresses', async () => {
        const el = await fixture<ColorWheel>(
            html`
                <sp-color-wheel></sp-color-wheel>
            `
        );

        await elementUpdated(el);

        expect(el.value).to.equal(0);

        const input = el.focusElement;

        input.dispatchEvent(arrowUpEvent);
        input.dispatchEvent(arrowUpKeyupEvent);
        input.dispatchEvent(arrowUpEvent);
        input.dispatchEvent(arrowUpKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(2);

        input.dispatchEvent(arrowRightEvent);
        input.dispatchEvent(arrowRightKeyupEvent);
        input.dispatchEvent(arrowRightEvent);
        input.dispatchEvent(arrowRightKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(4);

        input.dispatchEvent(arrowDownEvent);
        input.dispatchEvent(arrowDownKeyupEvent);
        input.dispatchEvent(arrowDownEvent);
        input.dispatchEvent(arrowDownKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(2);

        input.dispatchEvent(arrowLeftEvent);
        input.dispatchEvent(arrowLeftKeyupEvent);
        input.dispatchEvent(arrowLeftEvent);
        input.dispatchEvent(arrowLeftKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(0);
    });
    it('accepts "Arrow*" keypresses in dir="rtl"', async () => {
        const el = await fixture<ColorWheel>(
            html`
                <sp-color-wheel dir="rtl"></sp-color-wheel>
            `
        );

        await elementUpdated(el);

        expect(el.value).to.equal(0);

        const input = el.focusElement;

        input.dispatchEvent(arrowUpEvent);
        input.dispatchEvent(arrowUpKeyupEvent);
        input.dispatchEvent(arrowUpEvent);
        input.dispatchEvent(arrowUpKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(2);

        input.dispatchEvent(arrowRightEvent);
        input.dispatchEvent(arrowRightKeyupEvent);
        input.dispatchEvent(arrowRightEvent);
        input.dispatchEvent(arrowRightKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(0);

        input.dispatchEvent(arrowLeftEvent);
        input.dispatchEvent(arrowLeftKeyupEvent);
        input.dispatchEvent(arrowLeftEvent);
        input.dispatchEvent(arrowLeftKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(2);

        input.dispatchEvent(arrowDownEvent);
        input.dispatchEvent(arrowDownKeyupEvent);
        input.dispatchEvent(arrowDownEvent);
        input.dispatchEvent(arrowDownKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(0);
    });
    it('accepts "Arrow*" keypresses with alteration', async () => {
        const el = await fixture<ColorWheel>(
            html`
                <sp-color-wheel></sp-color-wheel>
            `
        );

        await elementUpdated(el);

        expect(el.value).to.equal(0);

        const input = el.focusElement;

        input.dispatchEvent(shiftEvent);
        input.dispatchEvent(arrowUpEvent);
        input.dispatchEvent(arrowUpKeyupEvent);
        input.dispatchEvent(arrowUpEvent);
        input.dispatchEvent(arrowUpKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(20);

        input.dispatchEvent(arrowRightEvent);
        input.dispatchEvent(arrowRightKeyupEvent);
        input.dispatchEvent(arrowRightEvent);
        input.dispatchEvent(arrowRightKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(40);

        input.dispatchEvent(arrowDownEvent);
        input.dispatchEvent(arrowDownKeyupEvent);
        input.dispatchEvent(arrowDownEvent);
        input.dispatchEvent(arrowDownKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(20);

        input.dispatchEvent(arrowLeftEvent);
        input.dispatchEvent(arrowLeftKeyupEvent);
        input.dispatchEvent(arrowLeftEvent);
        input.dispatchEvent(arrowLeftKeyupEvent);
        input.dispatchEvent(shiftKeyupEvent);

        await elementUpdated(el);

        expect(el.value).to.equal(0);
    });
    it('accepts pointer events', async () => {
        const el = await fixture<ColorWheel>(
            html`
                <sp-color-wheel
                    style="--spectrum-global-dimension-size-125: 10px;"
                ></sp-color-wheel>
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

        expect(el.value).to.equal(0);

        handle.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 1,
                pointerId: 1,
                clientX: 80,
                clientY: 15,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.value).to.equal(0);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const gradient = root.querySelector('[name="gradient"]') as HTMLElement;
        gradient.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 1,
                pointerId: 1,
                clientX: 80,
                clientY: 15,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.value).to.equal(0);

        gradient.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
                clientX: 80,
                clientY: 15,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.value).to.equal(263.74596725608353);

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                pointerId: 1,
                clientX: 80,
                clientY: 160,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        handle.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 1,
                clientX: 80,
                clientY: 160,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.value).to.equal(96.34019174590992);
    });
    const colorFormats: {
        name: string;
        color:
            | string
            | number
            | TinyColor
            | HSVA
            | HSV
            | RGB
            | RGBA
            | HSL
            | HSLA;
    }[] = [
        //rgb
        { name: 'RGB String', color: 'rgb(204, 51, 204)' },
        { name: 'RGB', color: { r: 204, g: 51, b: 204, a: 1 } },
        //prgb
        { name: 'PRGB String', color: 'rgb(80%, 20%, 80%)' },
        { name: 'PRGB', color: { r: '80%', g: '20%', b: '80%', a: 1 } },
        // hex
        { name: 'Hex', color: 'cc33cc' },
        { name: 'Hex String', color: '#cc33cc' },
        // hex8
        { name: 'Hex8', color: 'cc33ccff' },
        { name: 'Hex8 String', color: '#cc33ccff' },
        // name
        { name: 'string', color: 'red' },
        // hsl
        { name: 'HSL String', color: 'hsl(300, 60%, 50%)' },
        { name: 'HSL', color: { h: 300, s: 0.6000000000000001, l: 0.5, a: 1 } },
        // hsv
        { name: 'HSV String', color: 'hsv(300, 75%, 100%)' },
        { name: 'HSV', color: { h: 300, s: 0.75, v: 1, a: 1 } },
    ];
    colorFormats.map((format) => {
        it(`maintains \`color\` format as ${format.name}`, async () => {
            const el = await fixture<ColorWheel>(
                html`
                    <sp-color-wheel></sp-color-wheel>
                `
            );

            el.color = format.color;
            if (format.name.startsWith('Hex')) {
                expect(el.color).to.equal(format.color);
            } else expect(el.color).to.deep.equal(format.color);
        });
    });
    it(`maintains \`color\` format as TinyColor`, async () => {
        const el = await fixture<ColorWheel>(
            html`
                <sp-color-wheel></sp-color-wheel>
            `
        );
        const color = new TinyColor('rgb(204, 51, 204)');
        el.color = color;
        expect(color.equals(el.color));
    });
});
