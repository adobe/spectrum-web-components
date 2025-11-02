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
import {
    arrowDownEvent,
    arrowDownKeyupEvent,
    arrowLeftEvent,
    arrowLeftKeyupEvent,
    arrowRightEvent,
    arrowRightKeyupEvent,
    arrowUpEvent,
    arrowUpKeyupEvent,
    ignoreResizeObserverLoopError,
    sendShiftTabKey,
    sendTabKey,
    testForLitDevWarnings,
} from '../../../test/testing-helpers.js';

import { ColorWheel } from '@spectrum-web-components/color-wheel';
import '@spectrum-web-components/color-wheel/sp-color-wheel.js';
import { ColorTypes } from '@spectrum-web-components/reactive-controllers/src/ColorController.js';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';
import { sendMouse } from '../../../test/plugins/browser.js';

ignoreResizeObserverLoopError(before, after);

describe('ColorWheel', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<ColorWheel>(html`
                <sp-color-wheel></sp-color-wheel>
            `)
    );
    it('loads default color-wheel accessibly', async () => {
        const el = await fixture<ColorWheel>(html`
            <sp-color-wheel></sp-color-wheel>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('manages a single tab stop', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>
                <input type="text" id="test-input-1" />
                <sp-color-wheel></sp-color-wheel>
                <input type="text" id="test-input-2" />
            </div>
        `);
        const el = test.querySelector('sp-color-wheel') as ColorWheel;
        const input1 = test.querySelector(
            'input:nth-of-type(1)'
        ) as HTMLInputElement;
        const input2 = test.querySelector(
            'input:nth-of-type(2)'
        ) as HTMLInputElement;

        await elementUpdated(el);

        input1.focus();

        expect(document.activeElement).to.equal(input1);

        await sendTabKey();

        expect(document.activeElement).to.equal(el);

        let value = el.value;
        await sendKeys({ press: 'ArrowRight' });
        expect(el.value).to.not.equal(value);
        await sendTabKey();

        expect(document.activeElement).to.equal(input2);

        await sendShiftTabKey();

        expect(document.activeElement).to.equal(el);

        value = el.value;
        await sendKeys({ press: 'ArrowDown' });
        expect(el.value).to.not.equal(value);
        await sendShiftTabKey();

        expect(document.activeElement).to.equal(input1);
    });
    it('manages [focused]', async () => {
        const el = await fixture<ColorWheel>(html`
            <sp-color-wheel></sp-color-wheel>
        `);

        await elementUpdated(el);

        expect(el.focused).to.be.false;

        await sendTabKey();
        await elementUpdated(el);

        expect(el.focused).to.be.true;

        el.blur();
        await elementUpdated(el);

        expect(el.focused).to.be.false;

        el.dispatchEvent(new FocusEvent('focus'));
        await elementUpdated(el);

        expect(el.focused).to.be.true;

        el.dispatchEvent(new FocusEvent('blur'));
        await elementUpdated(el);

        expect(el.focused).to.be.false;
    });
    it('dispatches input and change events in response to "Arrow*" keypresses', async () => {
        const inputSpy = spy();
        const changeSpy = spy();
        const el = await fixture<ColorWheel>(html`
            <sp-color-wheel
                @change=${() => changeSpy()}
                @input=${() => inputSpy()}
            ></sp-color-wheel>
        `);

        await elementUpdated(el);
        el.focus();

        await sendKeys({ press: 'ArrowRight' });
        expect(inputSpy.callCount).to.equal(1);
        expect(changeSpy.callCount).to.equal(1);

        await sendKeys({ press: 'ArrowLeft' });
        expect(inputSpy.callCount).to.equal(2);
        expect(changeSpy.callCount).to.equal(2);

        await sendKeys({ press: 'ArrowUp' });
        expect(inputSpy.callCount).to.equal(3);
        expect(changeSpy.callCount).to.equal(3);

        await sendKeys({ press: 'ArrowDown' });
        expect(inputSpy.callCount).to.equal(4);
        expect(changeSpy.callCount).to.equal(4);
    });
    it('responds to events on the internal input element', async () => {
        // screen reader interactions dispatch events as found in the following test
        const inputSpy = spy();
        const changeSpy = spy();
        const el = await fixture<ColorWheel>(html`
            <sp-color-wheel
                @change=${() => changeSpy()}
                @input=${() => inputSpy()}
            ></sp-color-wheel>
        `);

        await elementUpdated(el);

        const input = el.focusElement;

        el.focus();

        input.dispatchEvent(
            new Event('input', {
                bubbles: true,
                composed: true,
            })
        );
        input.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: false, // native change events do not compose themselves by default
            })
        );

        expect(inputSpy.callCount).to.equal(1);
        expect(changeSpy.callCount).to.equal(1);
    });
    it('accepts "Arrow*" keypresses', async () => {
        const el = await fixture<ColorWheel>(html`
            <sp-color-wheel></sp-color-wheel>
        `);

        await elementUpdated(el);

        expect(el.value).to.equal(0);

        const input = el.focusElement;

        input.dispatchEvent(arrowUpEvent());
        input.dispatchEvent(arrowUpKeyupEvent());
        input.dispatchEvent(arrowUpEvent());
        input.dispatchEvent(arrowUpKeyupEvent());

        await elementUpdated(el);

        expect(el.value).to.equal(2);

        input.dispatchEvent(arrowRightEvent());
        input.dispatchEvent(arrowRightKeyupEvent());
        input.dispatchEvent(arrowRightEvent());
        input.dispatchEvent(arrowRightKeyupEvent());

        await elementUpdated(el);

        expect(el.value).to.equal(4);

        input.dispatchEvent(arrowDownEvent());
        input.dispatchEvent(arrowDownKeyupEvent());
        input.dispatchEvent(arrowDownEvent());
        input.dispatchEvent(arrowDownKeyupEvent());

        await elementUpdated(el);

        expect(el.value).to.equal(2);

        input.dispatchEvent(arrowLeftEvent());
        input.dispatchEvent(arrowLeftKeyupEvent());
        input.dispatchEvent(arrowLeftEvent());
        input.dispatchEvent(arrowLeftKeyupEvent());

        await elementUpdated(el);

        expect(el.value).to.equal(0);
    });
    it('accepts "Arrow*" keypresses in dir="rtl"', async () => {
        const el = await fixture<ColorWheel>(html`
            <sp-color-wheel dir="rtl"></sp-color-wheel>
        `);

        await elementUpdated(el);

        expect(el.value).to.equal(0);

        const input = el.focusElement;

        input.dispatchEvent(arrowUpEvent());
        input.dispatchEvent(arrowUpKeyupEvent());
        input.dispatchEvent(arrowUpEvent());
        input.dispatchEvent(arrowUpKeyupEvent());

        await elementUpdated(el);

        expect(el.value).to.equal(2);

        input.dispatchEvent(arrowRightEvent());
        input.dispatchEvent(arrowRightKeyupEvent());
        input.dispatchEvent(arrowRightEvent());
        input.dispatchEvent(arrowRightKeyupEvent());

        await elementUpdated(el);

        expect(el.value).to.equal(0);

        input.dispatchEvent(arrowLeftEvent());
        input.dispatchEvent(arrowLeftKeyupEvent());
        input.dispatchEvent(arrowLeftEvent());
        input.dispatchEvent(arrowLeftKeyupEvent());

        await elementUpdated(el);

        expect(el.value).to.equal(2);

        input.dispatchEvent(arrowDownEvent());
        input.dispatchEvent(arrowDownKeyupEvent());
        input.dispatchEvent(arrowDownEvent());
        input.dispatchEvent(arrowDownKeyupEvent());

        await elementUpdated(el);

        expect(el.value).to.equal(0);
    });
    it('respects custom step value with keyboard navigation', async () => {
        const el = await fixture<ColorWheel>(html`
            <sp-color-wheel step="10"></sp-color-wheel>
        `);

        await elementUpdated(el);
        el.focus();

        expect(el.value).to.equal(0);
        expect(el.step).to.equal(10);

        // Test arrow right with step=10
        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);
        expect(el.value).to.equal(10);

        // Test arrow right again
        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);
        expect(el.value).to.equal(20);

        // Test arrow up
        await sendKeys({ press: 'ArrowUp' });
        await elementUpdated(el);
        expect(el.value).to.equal(30);

        // Test arrow left
        await sendKeys({ press: 'ArrowLeft' });
        await elementUpdated(el);
        expect(el.value).to.equal(20);

        // Test arrow down
        await sendKeys({ press: 'ArrowDown' });
        await elementUpdated(el);
        expect(el.value).to.equal(10);
    });
    it('respects custom fractional step value with keyboard navigation', async () => {
        const el = await fixture<ColorWheel>(html`
            <sp-color-wheel step="0.5"></sp-color-wheel>
        `);

        await elementUpdated(el);
        el.focus();

        expect(el.value).to.equal(0);
        expect(el.step).to.equal(0.5);

        // Test arrow right with step=10
        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);
        expect(el.value).to.equal(0.5);

        // Test arrow right again
        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);
        expect(el.value).to.equal(1);

        // Test arrow up
        await sendKeys({ press: 'ArrowUp' });
        await elementUpdated(el);
        expect(el.value).to.equal(1.5);

        // Test arrow left
        await sendKeys({ press: 'ArrowLeft' });
        await elementUpdated(el);
        expect(el.value).to.equal(1);

        // Test arrow down
        await sendKeys({ press: 'ArrowDown' });
        await elementUpdated(el);
        expect(el.value).to.equal(0.5);
    });
    it('respects large step value (45 degrees)', async () => {
        const el = await fixture<ColorWheel>(html`
            <sp-color-wheel step="45"></sp-color-wheel>
        `);

        await elementUpdated(el);
        el.focus();

        expect(el.value).to.equal(0);
        expect(el.step).to.equal(45);

        // Test movement with 45-degree steps (8 stops around the wheel)
        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);
        expect(el.value).to.equal(45);

        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);
        expect(el.value).to.equal(90);

        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);
        expect(el.value).to.equal(135);

        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);
        expect(el.value).to.equal(180);

        // Test wrapping around
        await sendKeys({ press: 'ArrowRight' });
        await sendKeys({ press: 'ArrowRight' });
        await sendKeys({ press: 'ArrowRight' });
        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);
        expect(el.value).to.equal(0); // Should wrap back to 0
    });
    it('applies 10x multiplier with Shift key and custom step', async () => {
        const el = await fixture<ColorWheel>(html`
            <sp-color-wheel step="5"></sp-color-wheel>
        `);

        await elementUpdated(el);
        el.focus();

        expect(el.value).to.equal(0);
        expect(el.step).to.equal(5);

        // Test with Shift key (should be 5 * 10 = 50)
        await sendKeys({ down: 'Shift' });
        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);
        expect(el.value).to.equal(50);

        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);
        expect(el.value).to.equal(100);

        await sendKeys({ press: 'ArrowUp' });
        await elementUpdated(el);
        expect(el.value).to.equal(150);

        await sendKeys({ up: 'Shift' });

        // Test without Shift key (should be back to step=5)
        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);
        expect(el.value).to.equal(155);
    });
    it('maintains step value after property update', async () => {
        const el = await fixture<ColorWheel>(html`
            <sp-color-wheel></sp-color-wheel>
        `);

        await elementUpdated(el);
        el.focus();

        // Default step is 1
        expect(el.step).to.equal(1);
        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);
        expect(el.value).to.equal(1);

        // Update step to 15
        el.step = 15;
        await elementUpdated(el);
        expect(el.step).to.equal(15);

        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);
        expect(el.value).to.equal(16); // 1 + 15

        // Update step to 30
        el.step = 30;
        await elementUpdated(el);
        expect(el.step).to.equal(30);

        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);
        expect(el.value).to.equal(46); // 16 + 30
    });
    it('respects step value in RTL direction', async () => {
        const el = await fixture<ColorWheel>(html`
            <sp-color-wheel dir="rtl" step="20"></sp-color-wheel>
        `);

        await elementUpdated(el);
        el.focus();

        expect(el.value).to.equal(0);
        expect(el.step).to.equal(20);

        // In RTL, arrow right should decrease value
        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);
        expect(el.value).to.equal(340); // 360 - 20

        // Arrow left should increase value in RTL
        await sendKeys({ press: 'ArrowLeft' });
        await sendKeys({ press: 'ArrowLeft' });
        await elementUpdated(el);
        expect(el.value).to.equal(20); // 340 + 20 + 20, wrapped around
    });
    it('accepts "Arrow*" keypresses with alteration', async () => {
        const el = await fixture<ColorWheel>(html`
            <sp-color-wheel></sp-color-wheel>
        `);

        await elementUpdated(el);
        el.focus();
        expect(el.value).to.equal(0);

        await sendKeys({ down: 'Shift' });
        await sendKeys({ press: 'ArrowUp' });
        await sendKeys({ press: 'ArrowUp' });

        await elementUpdated(el);

        expect(el.value).to.equal(20);

        await sendKeys({ press: 'ArrowRight' });
        await sendKeys({ press: 'ArrowRight' });

        await elementUpdated(el);

        expect(el.value).to.equal(40);

        await sendKeys({ press: 'ArrowDown' });
        await sendKeys({ press: 'ArrowDown' });

        await elementUpdated(el);

        expect(el.value).to.equal(20);

        await sendKeys({ press: 'ArrowLeft' });
        await sendKeys({ press: 'ArrowLeft' });
        await sendKeys({ up: 'Shift' });

        await elementUpdated(el);

        expect(el.value).to.equal(0);
    });
    it('accepts pointer events', async () => {
        const color = { h: '0', s: '20%', l: '70%' };
        const el = await fixture<ColorWheel>(html`
            <sp-color-wheel
                .color=${color}
                style="--mod-colorwheel-width: 160px; --mod-colorwheel-height: 160px;"
            ></sp-color-wheel>
        `);

        await elementUpdated(el);

        const { handle } = el as unknown as { handle: HTMLElement };

        handle.setPointerCapture = () => {
            return;
        };
        handle.releasePointerCapture = () => {
            return;
        };

        expect(el.value).to.equal(0);
        expect(
            (el.color as { h: number; s: number; l: number; a: number }).s
        ).to.be.within(0.19, 0.21);
        expect(
            (el.color as { h: number; s: number; l: number; a: number }).l
        ).to.be.within(0.69, 0.71);

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
        expect(
            (el.color as { h: number; s: number; l: number; a: number }).s
        ).to.be.within(0.19, 0.21);
        expect(
            (el.color as { h: number; s: number; l: number; a: number }).l
        ).to.be.within(0.69, 0.71);

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
        expect(
            (el.color as { h: number; s: number; l: number; a: number }).s
        ).to.be.within(0.19, 0.21);
        expect(
            (el.color as { h: number; s: number; l: number; a: number }).l
        ).to.be.within(0.69, 0.71);

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
        expect(
            (el.color as { h: number; s: number; l: number; a: number }).s
        ).to.be.within(0.19, 0.21);
        expect(
            (el.color as { h: number; s: number; l: number; a: number }).l
        ).to.be.within(0.69, 0.71);

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
        expect(
            (el.color as { h: number; s: number; l: number; a: number }).s
        ).to.be.within(0.19, 0.21);
        expect(
            (el.color as { h: number; s: number; l: number; a: number }).l
        ).to.be.within(0.69, 0.71);
    });
    it('can have `change` events prevented', async () => {
        const color = { h: '0', s: '20%', l: '70%' };
        const el = await fixture<ColorWheel>(html`
            <sp-color-wheel
                .color=${color}
                @change=${(event: Event) => {
                    event?.preventDefault();
                }}
                style="--spectrum-global-dimension-size-125: 10px;"
            ></sp-color-wheel>
        `);

        await elementUpdated(el);

        expect(el.value).to.equal(0);

        await sendMouse([
            {
                type: 'move',
                position: [80, 15],
            },
            {
                type: 'down',
            },
            {
                type: 'move',
                position: [80, 160],
            },
        ]);

        await elementUpdated(el);

        await sendMouse({ type: 'up' });

        await elementUpdated(el);
        expect(el.value).to.equal(0);
    });
    const colorFormats: {
        name: string;
        color: ColorTypes;
        test?: string;
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
        { name: 'string', color: 'red', test: 'ff0000' },
        // hsl
        { name: 'HSL String', color: 'hsl(300, 60%, 50%)' },
        { name: 'HSL', color: { h: 300, s: 0.6000000000000001, l: 0.5, a: 1 } },
        // hsv
        { name: 'HSV String', color: 'hsv(300, 75%, 100%)' },
        { name: 'HSV', color: { h: 300, s: 0.75, v: 1, a: 1 } },
    ];
    colorFormats.map((format) => {
        it(`maintains \`color\` format as ${format.name}`, async () => {
            const el = await fixture<ColorWheel>(html`
                <sp-color-wheel></sp-color-wheel>
            `);

            if (typeof format.color === 'string') {
                el.color = format.color;
            } else {
                el.color = { ...format.color } as ColorTypes;
            }
            if (format.name.startsWith('Hex')) {
                expect(el.color).to.equal(format.color);
            } else if (format.name === 'string') {
                expect(el.color).to.equal(format.test);
            } else expect(el.color).to.deep.equal(format.color);
        });
    });
    it(`maintains hue value`, async () => {
        const el = await fixture<ColorWheel>(html`
            <sp-color-wheel></sp-color-wheel>
        `);
        const hue = 300;
        const hsl = `hsl(${hue}, 60%, 56%)`;

        el.color = hsl;
        await elementUpdated(el);

        expect(el.value).to.equal(hue);
        expect(el.color).to.equal(hsl);

        const hsla = `hsla(${hue}, 60%, 56%, 0.9)`;
        el.color = hsla;
        expect(el.value).to.equal(hue);
        expect(el.color).to.equal(hsla);

        const hsv = `hsv(${hue}, 60%, 56%)`;
        el.color = hsv;
        expect(el.value).to.equal(hue);
        expect(el.color).to.equal(hsv);

        const hsva = `hsva(${hue}, 60%, 56%, 0.9)`;
        el.color = hsva;
        expect(el.value).to.equal(hue);
        expect(el.color).to.equal(hsva);
    });
    it('should flip orientation with dir="rtl"', async () => {
        const el = await fixture<ColorWheel>(html`
            <sp-color-wheel></sp-color-wheel>
        `);

        await elementUpdated(el);

        const root = el.shadowRoot ? el.shadowRoot : el;
        expect(
            getComputedStyle(root.querySelector('.wheel') as HTMLElement)
                .transform
        ).to.equal('none');

        el.setAttribute('dir', 'rtl');

        await elementUpdated(el);
        expect(
            getComputedStyle(root.querySelector('.wheel') as HTMLElement)
                .transform
        ).to.equal('matrix(-1, 0, 0, 1, 0, 0)');
    });
});
