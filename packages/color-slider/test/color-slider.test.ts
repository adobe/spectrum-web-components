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

import '../sp-color-slider.js';
import { ColorSlider } from '..';
import { HSL, HSLA, HSV, HSVA, RGB, RGBA, TinyColor } from '@ctrl/tinycolor';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';

describe('ColorSlider', () => {
    it('loads default color-slider accessibly', async () => {
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider></sp-color-slider>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('manages [focused]', async () => {
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider></sp-color-slider>
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
    it('dispatches input and change events in response to "Arrow*" keypresses', async () => {
        const inputSpy = spy();
        const changeSpy = spy();
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider
                    @change=${() => changeSpy()}
                    @input=${() => inputSpy()}
                ></sp-color-slider>
            `
        );

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
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider
                    @change=${() => changeSpy()}
                    @input=${() => inputSpy()}
                ></sp-color-slider>
            `
        );
        await elementUpdated(el);

        el.focus();
        el.focusElement.dispatchEvent(
            new Event('input', {
                bubbles: true,
                composed: true,
            })
        );
        el.focusElement.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: false, // native change events do not compose themselves by default
            })
        );

        expect(inputSpy.callCount).to.equal(1);
        expect(changeSpy.callCount).to.equal(1);
    });
    it('manages value on "Arrow*" keypresses', async () => {
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider
                    style="--spectrum-colorslider-default-length: 192px; --spectrum-colorslider-default-height: 24px; --spectrum-colorslider-default-height: 24px;"
                ></sp-color-slider>
            `
        );

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(0);

        const input = el.focusElement;

        input.dispatchEvent(arrowUpEvent);
        input.dispatchEvent(arrowUpKeyupEvent);
        input.dispatchEvent(arrowUpEvent);
        input.dispatchEvent(arrowUpKeyupEvent);

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(2);

        input.dispatchEvent(arrowRightEvent);
        input.dispatchEvent(arrowRightKeyupEvent);
        input.dispatchEvent(arrowRightEvent);
        input.dispatchEvent(arrowRightKeyupEvent);

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(3.9999999999999996);

        input.dispatchEvent(arrowDownEvent);
        input.dispatchEvent(arrowDownKeyupEvent);
        input.dispatchEvent(arrowDownEvent);
        input.dispatchEvent(arrowDownKeyupEvent);

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(1.9999999999999998);

        input.dispatchEvent(arrowLeftEvent);
        input.dispatchEvent(arrowLeftKeyupEvent);
        input.dispatchEvent(arrowLeftEvent);
        input.dispatchEvent(arrowLeftKeyupEvent);

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(0);
    });
    it('accepts "Arrow*" keypresses in dir="rtl"', async () => {
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider dir="rtl"></sp-color-slider>
            `
        );

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(0);

        const input = el.focusElement;

        input.dispatchEvent(arrowUpEvent);
        input.dispatchEvent(arrowUpKeyupEvent);
        input.dispatchEvent(arrowUpEvent);
        input.dispatchEvent(arrowUpKeyupEvent);

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(2);

        input.dispatchEvent(arrowRightEvent);
        input.dispatchEvent(arrowRightKeyupEvent);
        input.dispatchEvent(arrowRightEvent);
        input.dispatchEvent(arrowRightKeyupEvent);

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(0);

        input.dispatchEvent(arrowLeftEvent);
        input.dispatchEvent(arrowLeftKeyupEvent);
        input.dispatchEvent(arrowLeftEvent);
        input.dispatchEvent(arrowLeftKeyupEvent);

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(2);

        input.dispatchEvent(arrowDownEvent);
        input.dispatchEvent(arrowDownKeyupEvent);
        input.dispatchEvent(arrowDownEvent);
        input.dispatchEvent(arrowDownKeyupEvent);

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(0);
    });
    it('accepts "Arrow*" keypresses with alteration', async () => {
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider></sp-color-slider>
            `
        );

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(0);

        const input = el.focusElement;

        input.dispatchEvent(shiftEvent);
        input.dispatchEvent(arrowUpEvent);
        input.dispatchEvent(arrowUpKeyupEvent);
        input.dispatchEvent(arrowUpEvent);
        input.dispatchEvent(arrowUpKeyupEvent);

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(20);

        input.dispatchEvent(arrowRightEvent);
        input.dispatchEvent(arrowRightKeyupEvent);
        input.dispatchEvent(arrowRightEvent);
        input.dispatchEvent(arrowRightKeyupEvent);

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(40);

        input.dispatchEvent(arrowDownEvent);
        input.dispatchEvent(arrowDownKeyupEvent);
        input.dispatchEvent(arrowDownEvent);
        input.dispatchEvent(arrowDownKeyupEvent);

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(20);

        input.dispatchEvent(arrowLeftEvent);
        input.dispatchEvent(arrowLeftKeyupEvent);
        input.dispatchEvent(arrowLeftEvent);
        input.dispatchEvent(arrowLeftKeyupEvent);
        input.dispatchEvent(shiftKeyupEvent);

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(0);
    });
    it('accepts pointer events', async () => {
        const color = new TinyColor({ h: '0', s: '20%', l: '70%' });
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider
                    .color=${color}
                    style="--spectrum-colorslider-default-length: 192px; --spectrum-colorslider-default-height: 24px; --spectrum-colorslider-default-height: 24px;"
                ></sp-color-slider>
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

        expect(el.sliderHandlePosition).to.equal(0);
        expect((el.color as HSLA).s).to.be.within(0.19, 0.21);
        expect((el.color as HSLA).l).to.be.within(0.69, 0.71);

        handle.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 1,
                pointerId: 1,
                clientX: 100,
                clientY: 15,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);
        expect(el.sliderHandlePosition).to.equal(0);
        expect((el.color as HSLA).s).to.be.within(0.19, 0.21);
        expect((el.color as HSLA).l).to.be.within(0.69, 0.71);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const gradient = root.querySelector('.gradient') as HTMLElement;
        gradient.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 1,
                pointerId: 1,
                clientX: 100,
                clientY: 15,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);
        expect(el.sliderHandlePosition).to.equal(0);
        expect((el.color as HSLA).s).to.be.within(0.19, 0.21);
        expect((el.color as HSLA).l).to.be.within(0.69, 0.71);

        gradient.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
                clientX: 100,
                clientY: 15,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(47.91666666666667);
        expect((el.color as HSLA).s).to.be.within(0.19, 0.21);
        expect((el.color as HSLA).l).to.be.within(0.69, 0.71);

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                pointerId: 1,
                clientX: 110,
                clientY: 15,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        handle.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 1,
                clientX: 110,
                clientY: 15,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(53.125);
        expect((el.color as HSLA).s).to.be.within(0.19, 0.21);
        expect((el.color as HSLA).l).to.be.within(0.69, 0.71);
    });
    it('accepts pointer events while [vertical]', async () => {
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider
                    vertical
                    style="--spectrum-colorslider-vertical-default-length: 192px; --spectrum-colorslider-vertical-width: 24px;"
                ></sp-color-slider>
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

        expect(el.sliderHandlePosition).to.equal(0);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const gradient = root.querySelector('.gradient') as HTMLElement;
        gradient.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
                clientX: 15,
                clientY: 100,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(47.91666666666667);

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                pointerId: 1,
                clientX: 15,
                clientY: 110,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        handle.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 1,
                clientX: 15,
                clientY: 110,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(53.125);
    });
    it('accepts pointer events in dir="rtl"', async () => {
        document.documentElement.dir = 'rtl';
        const el = await fixture<
            ColorSlider & {
                handle: HTMLElement;
            }
        >(
            html`
                <sp-color-slider
                    dir="rtl"
                    style="--spectrum-colorslider-default-length: 192px; --spectrum-colorslider-default-height: 24px; --spectrum-colorslider-height: 24px;"
                ></sp-color-slider>
            `
        );
        await elementUpdated(el);

        const { handle } = el;
        const clientWidth = document.documentElement.offsetWidth;

        handle.setPointerCapture = () => {
            return;
        };
        handle.releasePointerCapture = () => {
            return;
        };

        expect(el.sliderHandlePosition).to.equal(0);

        const gradient = el.shadowRoot.querySelector(
            '.gradient'
        ) as HTMLElement;
        gradient.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
                clientX: 700,
                clientY: 15,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(52.083333333333336);

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                pointerId: 1,
                clientX: clientWidth - 110,
                clientY: 15,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        handle.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 1,
                clientX: clientWidth - 110,
                clientY: 15,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(46.875);
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
            const el = await fixture<ColorSlider>(
                html`
                    <sp-color-slider></sp-color-slider>
                `
            );

            el.color = format.color;
            if (format.name.startsWith('Hex')) {
                expect(el.color).to.equal(format.color);
            } else expect(el.color).to.deep.equal(format.color);
        });
    });
    it(`maintains \`color\` format as TinyColor`, async () => {
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider></sp-color-slider>
            `
        );
        const color = new TinyColor('rgb(204, 51, 204)');
        el.color = color;
        expect(color.equals(el.color));
    });
    it(`resolves Hex3 format to Hex6 format`, async () => {
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider></sp-color-slider>
            `
        );
        el.color = '0f0';
        expect(el.color).to.equal('00ff00');

        el.color = '#1e0';
        expect(el.color).to.equal('#11ee00');
    });
    it(`resolves Hex4 format to Hex8 format`, async () => {
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider></sp-color-slider>
            `
        );
        el.color = 'f3af';
        expect(el.color).to.equal('ff33aaff');

        el.color = '#f3af';
        expect(el.color).to.equal('#ff33aaff');
    });
    it(`maintains hue value`, async () => {
        const el = await fixture<ColorSlider>(
            html`
                <sp-color-slider></sp-color-slider>
            `
        );
        const hue = 300;
        const hsl = `hsl(${hue}, 60%, 100%)`;
        el.color = hsl;
        expect(el.value).to.equal(hue);
        expect(el.color).to.equal(hsl);

        const hsla = `hsla(${hue}, 60%, 100%, 0.9)`;
        el.color = hsla;
        expect(el.value).to.equal(hue);
        expect(el.color).to.equal(hsla);

        const hsv = `hsv(${hue}, 60%, 100%)`;
        el.color = hsv;
        expect(el.value).to.equal(hue);
        expect(el.color).to.equal(hsv);

        const hsva = `hsva(${hue}, 60%, 100%, 0.9)`;
        el.color = hsva;
        expect(el.value).to.equal(hue);
        expect(el.color).to.equal(hsva);

        const tinyHSV = new TinyColor({ h: hue, s: 60, v: 100 });
        el.color = tinyHSV;
        expect(el.value).to.equal(hue);
        expect(tinyHSV.equals(el.color)).to.be.true;

        const tinyHSVA = new TinyColor({ h: hue, s: 60, v: 100, a: 1 });
        el.color = tinyHSVA;
        expect(el.value).to.equal(hue);
        expect(tinyHSVA.equals(el.color)).to.be.true;

        const tinyHSL = new TinyColor({ h: hue, s: 60, l: 100 });
        el.color = tinyHSL;
        expect(el.value).to.equal(hue);
        expect(tinyHSL.equals(el.color)).to.be.true;

        const tinyHSLA = new TinyColor({ h: hue, s: 60, l: 100, a: 1 });
        el.color = tinyHSLA;
        expect(el.value).to.equal(hue);
        expect(tinyHSLA.equals(el.color)).to.be.true;
    });
});
