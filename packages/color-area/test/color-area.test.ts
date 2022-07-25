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

import {
    elementUpdated,
    expect,
    fixture,
    html,
    nextFrame,
    oneEvent,
} from '@open-wc/testing';
import { HSL, HSLA, HSV, HSVA, RGB, RGBA, TinyColor } from '@ctrl/tinycolor';

import '@spectrum-web-components/color-area/sp-color-area.js';
import { ColorArea } from '@spectrum-web-components/color-area';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

describe('ColorArea', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<ColorArea>(
                html`
                    <sp-color-area></sp-color-area>
                `
            )
    );
    it('loads default color-area accessibly', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area></sp-color-area>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('manages a single tab stop', async () => {
        const test = await fixture<HTMLDivElement>(
            html`
                <div>
                    <input type="text" />
                    <sp-color-area color="hsl(100, 50%, 50%)"></sp-color-area>
                    <input type="text" />
                </div>
            `
        );
        const el = test.querySelector('sp-color-area') as ColorArea;
        const input1 = test.querySelector(
            'input:nth-of-type(1)'
        ) as HTMLInputElement;
        const input2 = test.querySelector(
            'input:nth-of-type(2)'
        ) as HTMLInputElement;

        await elementUpdated(el);

        input1.focus();

        expect(document.activeElement, 'before input').to.equal(input1);

        await sendKeys({
            press: 'Tab',
        });
        await elementUpdated(el);

        expect(document.activeElement, 'element').to.equal(el);
        let value = el.value;
        await sendKeys({
            press: 'ArrowRight',
        });
        await elementUpdated(el);
        expect(el.value).to.not.equal(value);
        await sendKeys({
            press: 'Tab',
        });
        await elementUpdated(el);

        expect(document.activeElement, 'after input').to.equal(input2);

        await sendKeys({
            press: 'Shift+Tab',
        });
        await elementUpdated(el);

        expect(document.activeElement, 'element again').to.equal(el);

        value = el.value;
        await sendKeys({
            press: 'ArrowDown',
        });
        expect(el.value).to.not.equal(value);
        await sendKeys({
            press: 'Shift+Tab',
        });
        expect(document.activeElement, 'before input again').to.equal(input1);
    });
    it('provides separate aria-labels for X and Y inputs', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area color="hsl(100, 50%, 50%)"></sp-color-area>
            `
        );
        const inputX = el.shadowRoot.querySelector('input[name="x"]');
        const inputY = el.shadowRoot.querySelector('input[name="y"]');

        expect(inputX?.getAttribute('aria-label')).to.equal('saturation');
        expect(inputY?.getAttribute('aria-label')).to.equal('luminosity');
    });
    it('overrides both X and Y labels with a provided "label" attribute', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area
                    color="hsl(100, 50%, 50%)"
                    label="something custom"
                ></sp-color-area>
            `
        );
        const inputX = el.shadowRoot.querySelector('input[name="x"]');
        const inputY = el.shadowRoot.querySelector('input[name="y"]');

        expect(inputX?.getAttribute('aria-label')).to.equal('something custom');
        expect(inputY?.getAttribute('aria-label')).to.equal('something custom');
    });
    it('accepts "color" values as hsl', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area color="hsl(100, 50%, 50%)"></sp-color-area>
            `
        );

        await elementUpdated(el);

        expect(el.hue, 'hue').to.equal(100);
        expect(el.x, 'x').to.equal(0.67);
        expect(el.y, 'y').to.equal(0.25);
    });
    it('accepts "color" values as hsla', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area color="hsla(100, 50%, 50%, 1)"></sp-color-area>
            `
        );

        await elementUpdated(el);

        expect(el.hue, 'hugh').to.equal(100);
        expect(el.x, 'ex').to.equal(0.67);
        expect(el.y, 'why').to.equal(0.25);

        el.color = 'hsla(120, 100%, 0, 1)';
        await elementUpdated(el);

        expect(el.hue, 'hue 2').to.equal(120);
        expect(el.x, 'x 2').to.equal(0);
        expect(el.y, 'y 2').to.equal(1);
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

        expect(el.hue, 'hue').to.equal(100);
        expect(el.x, 'x').to.equal(0.67);
        expect(el.y, 'y').to.equal(0.25);

        el.inputX.focus();
        await nextFrame();

        let changeEvent = oneEvent(el, 'change');
        await sendKeys({
            press: 'ArrowUp',
        });
        await changeEvent;
        changeEvent = oneEvent(el, 'change');
        await sendKeys({
            press: 'ArrowUp',
        });
        await changeEvent;

        expect(el.x).to.equal(0.67);
        expect(el.y).to.equal(0.23);

        changeEvent = oneEvent(el, 'change');
        await sendKeys({
            press: 'ArrowRight',
        });
        await changeEvent;
        changeEvent = oneEvent(el, 'change');
        await sendKeys({
            press: 'ArrowRight',
        });
        await changeEvent;

        expect(el.x).to.equal(0.69);
        expect(el.y).to.equal(0.23);

        changeEvent = oneEvent(el, 'change');
        await sendKeys({
            press: 'ArrowDown',
        });
        await changeEvent;
        changeEvent = oneEvent(el, 'change');
        await sendKeys({
            press: 'ArrowDown',
        });
        await changeEvent;

        expect(el.x).to.equal(0.69);
        expect(el.y).to.equal(0.25);

        changeEvent = oneEvent(el, 'change');
        await sendKeys({
            press: 'ArrowLeft',
        });
        await changeEvent;
        changeEvent = oneEvent(el, 'change');
        await sendKeys({
            press: 'ArrowLeft',
        });
        await changeEvent;

        expect(el.x).to.equal(0.67);
        expect(el.y).to.equal(0.25);
    });
    it('accepts "Arrow*" keypresses with alteration', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area color="hsla(100, 50%, 50%, 1)"></sp-color-area>
            `
        );

        await elementUpdated(el);
        el.focus();
        expect(el.hue, 'hue').to.equal(100);
        expect(el.x, 'x').to.equal(0.67);
        expect(el.y, 'y').to.equal(0.25);

        await sendKeys({
            down: 'Shift',
        });
        await elementUpdated(el);
        await sendKeys({
            press: 'ArrowUp',
        });
        // This ensures that all the keystrokes are processed seperately
        await elementUpdated(el);
        await sendKeys({
            press: 'ArrowUp',
        });

        await elementUpdated(el);

        expect(el.color).to.equal('hsl(100, 65%, 57%)');
        expect(el.x, 'first').to.equal(0.67);
        expect(el.y).to.equal(0.15);

        await sendKeys({
            press: 'ArrowRight',
        });
        await elementUpdated(el);
        await sendKeys({
            press: 'ArrowRight',
        });
        await elementUpdated(el);

        expect(el.color).to.equal('hsl(100, 69%, 52%)');
        expect(el.x).to.equal(0.77);
        expect(el.y).to.equal(0.15);

        await sendKeys({
            press: 'ArrowDown',
        });
        await elementUpdated(el);
        await sendKeys({
            press: 'ArrowDown',
        });

        await elementUpdated(el);

        expect(el.color).to.equal('hsl(100, 63%, 46%)');
        expect(el.x).to.equal(0.77);
        expect(el.y).to.equal(0.25);

        await sendKeys({
            press: 'ArrowLeft',
        });
        await elementUpdated(el);
        await sendKeys({
            press: 'ArrowLeft',
        });
        await elementUpdated(el);
        await sendKeys({
            up: 'Shift',
        });

        await elementUpdated(el);

        expect(el.color).to.equal('hsl(100, 50%, 50%)');
        expect(el.x, 'last').to.equal(0.67);
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
        await elementUpdated(el);

        const { handle } = el as unknown as { handle: HTMLElement };

        handle.setPointerCapture = () => {
            return;
        };
        handle.releasePointerCapture = () => {
            return;
        };

        expect(el.hue).to.equal(0);
        expect(el.x).to.equal(1);
        expect(el.y).to.equal(0);

        handle.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 1,
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
        expect(el.x).to.equal(1);
        expect(el.y).to.equal(0);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const gradient = root.querySelector('.gradient') as HTMLElement;
        gradient.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 1,
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
        expect(el.x).to.equal(1);
        expect(el.y).to.equal(0);

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
        expect(el.x, 'pointerdown x').to.equal(0.48);
        expect(el.y, 'pointerdown y').to.equal(0.48);

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
        expect(el.x).to.equal(0.53);
        expect(el.y).to.equal(0.53);
    });
    it('responds to events on the internal input element', async () => {
        const inputSpy = spy();
        const changeSpy = spy();
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area
                    color="hsla(100, 50%, 50%, 1)"
                    @change=${() => changeSpy()}
                    @input=${() => inputSpy()}
                ></sp-color-area>
            `
        );

        await elementUpdated(el);

        el.inputX.focus();

        el.inputX.dispatchEvent(
            new Event('input', {
                bubbles: true,
                composed: true,
            })
        );
        el.inputX.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: false, // native change events do not compose themselves by default
            })
        );

        expect(inputSpy.callCount).to.equal(1);
        expect(changeSpy.callCount).to.equal(1);

        el.inputY.focus();

        el.inputY.dispatchEvent(
            new Event('input', {
                bubbles: true,
                composed: true,
            })
        );
        el.inputY.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: false, // native change events do not compose themselves by default
            })
        );

        expect(inputSpy.callCount).to.equal(2);
        expect(changeSpy.callCount).to.equal(2);
    });
    it('dispatches input and change events in response to "Arrow*" keypresses', async () => {
        const inputSpy = spy();
        const changeSpy = spy();
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area
                    color="hsla(100, 50%, 50%, 1)"
                    @change=${() => changeSpy()}
                    @input=${() => inputSpy()}
                ></sp-color-area>
            `
        );

        await elementUpdated(el);

        el.inputX.focus();
        inputSpy.resetHistory();
        changeSpy.resetHistory();
        await sendKeys({ press: 'ArrowRight' });
        await sendKeys({ press: 'ArrowRight' });

        await elementUpdated(el);

        expect(inputSpy.callCount).to.equal(2);
        expect(changeSpy.callCount).to.equal(2);

        el.inputY.focus();
        inputSpy.resetHistory();
        changeSpy.resetHistory();
        await sendKeys({ press: 'ArrowUp' });
        await sendKeys({ press: 'ArrowUp' });

        await elementUpdated(el);

        expect(inputSpy.callCount).to.equal(2);
        expect(changeSpy.callCount).to.equal(2);

        el.inputY.focus();
        inputSpy.resetHistory();
        changeSpy.resetHistory();
        await sendKeys({ press: 'ArrowDown' });
        await sendKeys({ press: 'ArrowDown' });

        await elementUpdated(el);

        expect(inputSpy.callCount).to.equal(2);
        expect(changeSpy.callCount).to.equal(2);

        el.inputX.focus();
        inputSpy.resetHistory();
        changeSpy.resetHistory();
        await sendKeys({ press: 'ArrowLeft' });
        await sendKeys({ press: 'ArrowLeft' });

        await elementUpdated(el);
        expect(inputSpy.callCount).to.equal(2);
        expect(changeSpy.callCount).to.equal(2);
    });
    it('retains `hue` value when s = 0 in HSL string format', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area color="hsl(100, 50%, 50%)"></sp-color-area>
            `
        );

        await elementUpdated(el);

        expect(el.hue, 'hue').to.equal(100);
        expect(el.x, 'x').to.equal(0.67);
        expect(el.y, 'y').to.equal(0.25);
        expect(el.color).to.equal('hsl(100, 50%, 50%)');

        el.color = 'hsl(100, 0%, 50%)';
        await elementUpdated(el);

        expect(el.hue, 'new hue').to.equal(100);
        expect(el.x, 'new x').to.equal(0);
        expect(el.y, 'new y').to.equal(0.5);
        expect(el.color).to.equal('hsl(100, 0%, 50%)');
    });
    it('retains `hue` value when s = 0 in HSL object format', async () => {
        let inputColor = { h: 100, s: 0.5, l: 0.5 };

        const el = await fixture<ColorArea>(
            html`
                <sp-color-area .color=${inputColor}></sp-color-area>
            `
        );

        await elementUpdated(el);

        let outputColor = el.color as { h: number; s: number; l: number };
        const variance = 0.00005;

        expect(el.hue).to.equal(100);
        expect(el.x, 'x').to.equal(0.67);
        expect(el.y, 'y').to.equal(0.25);

        expect(Math.abs(outputColor.h - inputColor.h)).to.be.lessThan(variance);
        expect(Math.abs(outputColor.s - inputColor.s)).to.be.lessThan(variance);
        expect(Math.abs(outputColor.l - inputColor.l)).to.be.lessThan(variance);

        inputColor = { h: 100, s: 0, l: 0.5 };
        el.color = inputColor;

        await elementUpdated(el);
        outputColor = el.color as { h: number; s: number; l: number };

        expect(el.hue).to.equal(100);
        expect(el.x, 'x').to.equal(0);
        expect(el.y, 'y').to.equal(0.5);

        expect(Math.abs(outputColor.h - inputColor.h)).to.be.lessThan(variance);
        expect(Math.abs(outputColor.s - inputColor.s)).to.be.lessThan(variance);
        expect(Math.abs(outputColor.l - inputColor.l)).to.be.lessThan(variance);
    });
    it('retains `hue` value when s = 0 in HSV string format', async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area color="hsv(100, 50%, 50%)"></sp-color-area>
            `
        );

        await elementUpdated(el);

        expect(el.hue, 'hue').to.equal(100);
        expect(el.x, 'x').to.equal(0.5);
        expect(el.y, 'y').to.equal(0.5);
        expect(el.color).to.equal('hsv(100, 50%, 50%)');

        el.color = 'hsv(100, 0%, 50%)';
        await elementUpdated(el);

        expect(el.hue, 'new hue').to.equal(100);
        expect(el.x, 'new x').to.equal(0);
        expect(el.y, 'new y').to.equal(0.5);
        expect(el.color).to.equal('hsv(100, 0%, 50%)');
    });
    it('retains `hue` value when s = 0 in HSV object format', async () => {
        let inputColor = { h: 100, s: 0.5, v: 0.5 };

        const el = await fixture<ColorArea>(
            html`
                <sp-color-area .color=${inputColor}></sp-color-area>
            `
        );

        await elementUpdated(el);

        let outputColor = el.color as { h: number; s: number; v: number };
        const variance = 0.00005;

        expect(el.hue).to.equal(100);
        expect(el.x, 'x').to.equal(0.5);
        expect(el.y, 'y').to.equal(0.5);

        expect(Math.abs(outputColor.h - inputColor.h)).to.be.lessThan(variance);
        expect(Math.abs(outputColor.s - inputColor.s)).to.be.lessThan(variance);
        expect(Math.abs(outputColor.v - inputColor.v)).to.be.lessThan(variance);

        inputColor = { h: 100, s: 0, v: 0.5 };
        el.color = inputColor;

        await elementUpdated(el);
        outputColor = el.color as { h: number; s: number; v: number };

        expect(el.hue).to.equal(100);
        expect(el.x, 'x').to.equal(0);
        expect(el.y, 'y').to.equal(0.5);

        expect(Math.abs(outputColor.h - inputColor.h)).to.be.lessThan(variance);
        expect(Math.abs(outputColor.s - inputColor.s)).to.be.lessThan(variance);
        expect(Math.abs(outputColor.v - inputColor.v)).to.be.lessThan(variance);
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
            const el = await fixture<ColorArea>(
                html`
                    <sp-color-area></sp-color-area>
                `
            );

            el.color = format.color;
            if (format.name.startsWith('Hex')) {
                expect(el.color).to.equal(format.color);
            } else expect(el.color).to.deep.equal(format.color);
        });
    });
    it(`maintains \`color\` format as TinyColor`, async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area></sp-color-area>
            `
        );
        const color = new TinyColor('rgb(204, 51, 204)');
        el.color = color;
        expect(color.equals(el.color));
    });
    it(`resolves Hex3 format to Hex6 format`, async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area></sp-color-area>
            `
        );
        el.color = '0f0';
        expect(el.color).to.equal('00ff00');

        el.color = '#1e0';
        expect(el.color).to.equal('#11ee00');
    });
    it(`resolves Hex4 format to Hex8 format`, async () => {
        const el = await fixture<ColorArea>(
            html`
                <sp-color-area></sp-color-area>
            `
        );
        el.color = 'f3af';
        expect(el.color).to.equal('ff33aaff');

        el.color = '#f3af';
        expect(el.color).to.equal('#ff33aaff');
    });
});
