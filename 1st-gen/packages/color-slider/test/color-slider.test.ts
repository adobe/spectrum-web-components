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
import {
    arrowDownEvent,
    arrowDownKeyupEvent,
    arrowLeftEvent,
    arrowLeftKeyupEvent,
    arrowRightEvent,
    arrowRightKeyupEvent,
    arrowUpEvent,
    arrowUpKeyupEvent,
    fixture,
    sendShiftTabKey,
    sendTabKey,
    testForLitDevWarnings,
} from '../../../test/testing-helpers.js';

import { ColorHandle } from '@spectrum-web-components/color-handle';
import { ColorSlider } from '@spectrum-web-components/color-slider';
import '@spectrum-web-components/color-slider/sp-color-slider.js';
import { ColorTypes } from '@spectrum-web-components/reactive-controllers/src/ColorController.js';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';
import { sendMouse } from '../../../test/plugins/browser.js';
import { Default } from '../stories/color-slider.stories.js';

describe('ColorSlider', () => {
    testForLitDevWarnings(async () => await fixture<ColorSlider>(Default()));
    it('loads default color-slider accessibly', async () => {
        const el = await fixture<ColorSlider>(Default());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('manages a single tab stop', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>
                <input type="text" id="test-input-1" />
                <sp-color-slider></sp-color-slider>
                <input type="text" id="test-input-2" />
            </div>
        `);
        const el = test.querySelector('sp-color-slider') as ColorSlider;
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
        await elementUpdated(el);
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
        const el = await fixture<ColorSlider>(Default());

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
        const el = await fixture<ColorSlider>(html`
            <sp-color-slider
                @change=${() => changeSpy()}
                @input=${() => inputSpy()}
            ></sp-color-slider>
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
        const el = await fixture<ColorSlider>(html`
            <sp-color-slider
                @change=${() => changeSpy()}
                @input=${() => inputSpy()}
            ></sp-color-slider>
        `);
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
        const el = await fixture<ColorSlider>(html`
            <sp-color-slider
                style="--spectrum-colorslider-default-length: 192px; --spectrum-colorslider-default-height: 24px; --spectrum-colorslider-default-height: 24px;"
            ></sp-color-slider>
        `);

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(0);
        expect(el.value).to.equal(0);

        const input = el.focusElement;

        input.dispatchEvent(arrowUpEvent());
        input.dispatchEvent(arrowUpKeyupEvent());
        input.dispatchEvent(arrowUpEvent());
        input.dispatchEvent(arrowUpKeyupEvent());

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.be.approximately(
            (2 * 100) / 360,
            0.000001
        );
        expect(el.value).to.equal(2);

        input.dispatchEvent(arrowRightEvent());
        input.dispatchEvent(arrowRightKeyupEvent());
        input.dispatchEvent(arrowRightEvent());
        input.dispatchEvent(arrowRightKeyupEvent());

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.be.approximately(
            (4 * 100) / 360,
            0.000001
        );
        expect(el.value).to.equal(4);

        input.dispatchEvent(arrowDownEvent());
        input.dispatchEvent(arrowDownKeyupEvent());
        input.dispatchEvent(arrowDownEvent());
        input.dispatchEvent(arrowDownKeyupEvent());

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.be.approximately(
            (2 * 100) / 360,
            0.000001
        );
        expect(el.value).to.equal(2);

        input.dispatchEvent(arrowLeftEvent());
        input.dispatchEvent(arrowLeftKeyupEvent());
        input.dispatchEvent(arrowLeftEvent());
        input.dispatchEvent(arrowLeftKeyupEvent());

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(0);
        expect(el.value).to.equal(0);
    });
    it('accepts "Arrow*" keypresses in dir="rtl"', async () => {
        const el = await fixture<ColorSlider>(html`
            <sp-color-slider dir="rtl"></sp-color-slider>
        `);

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(0);

        const input = el.focusElement;

        input.dispatchEvent(arrowUpEvent());
        input.dispatchEvent(arrowUpKeyupEvent());
        input.dispatchEvent(arrowUpEvent());
        input.dispatchEvent(arrowUpKeyupEvent());

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.be.approximately(
            (2 * 100) / 360,
            0.000001
        );
        expect(el.value).to.equal(2);

        input.dispatchEvent(arrowRightEvent());
        input.dispatchEvent(arrowRightKeyupEvent());
        input.dispatchEvent(arrowRightEvent());
        input.dispatchEvent(arrowRightKeyupEvent());

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(0);
        expect(el.value).to.equal(0);

        input.dispatchEvent(arrowLeftEvent());
        input.dispatchEvent(arrowLeftKeyupEvent());
        input.dispatchEvent(arrowLeftEvent());
        input.dispatchEvent(arrowLeftKeyupEvent());

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.be.approximately(
            (2 * 100) / 360,
            0.000001
        );
        expect(el.value).to.equal(2);

        input.dispatchEvent(arrowDownEvent());
        input.dispatchEvent(arrowDownKeyupEvent());
        input.dispatchEvent(arrowDownEvent());
        input.dispatchEvent(arrowDownKeyupEvent());

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(0);
        expect(el.value).to.equal(0);
    });
    it('accepts "Arrow*" keypresses with alteration', async () => {
        const el = await fixture<ColorSlider>(Default());

        await elementUpdated(el);
        el.focus();
        expect(el.sliderHandlePosition).to.equal(0);
        expect(el.value).to.equal(0);

        await sendKeys({ down: 'Shift' });
        await sendKeys({ press: 'ArrowUp' });
        await sendKeys({ press: 'ArrowUp' });

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.be.approximately(
            (20 * 100) / 360,
            0.000001
        );
        expect(el.value).to.equal(20);

        await sendKeys({ press: 'ArrowRight' });
        await sendKeys({ press: 'ArrowRight' });

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.be.approximately(
            (40 * 100) / 360,
            0.000001
        );
        expect(el.value).to.equal(40);

        await sendKeys({ press: 'ArrowDown' });
        await sendKeys({ press: 'ArrowDown' });

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.be.approximately(
            (20 * 100) / 360,
            0.000001
        );
        expect(el.value).to.be.approximately(20, 0.000001);

        await sendKeys({ press: 'ArrowLeft' });
        await sendKeys({ press: 'ArrowLeft' });
        await sendKeys({ up: 'Shift' });

        await elementUpdated(el);

        expect(el.sliderHandlePosition).to.equal(0);
        expect(el.value).to.equal(0);
    });
    it('accepts pointer events', async () => {
        const color = { h: '0', s: '20%', l: '70%' };
        const el = await fixture<ColorSlider>(html`
            <sp-color-slider
                .color=${color}
                style="--spectrum-colorslider-default-length: 192px; --spectrum-colorslider-height: 24px;"
            ></sp-color-slider>
        `);

        await elementUpdated(el);

        const { handle } = el as unknown as { handle: HTMLElement };

        handle.setPointerCapture = () => {
            return;
        };
        handle.releasePointerCapture = () => {
            return;
        };

        expect(el.sliderHandlePosition).to.equal(0);
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
                clientX: 100,
                clientY: 15,
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );

        await elementUpdated(el);
        expect(el.sliderHandlePosition).to.equal(0);
        expect(
            (el.color as { h: number; s: number; l: number; a: number }).s
        ).to.be.within(0.19, 0.21);
        expect(
            (el.color as { h: number; s: number; l: number; a: number }).l
        ).to.be.within(0.69, 0.71);

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
        expect(
            (el.color as { h: number; s: number; l: number; a: number }).s
        ).to.be.within(0.19, 0.21);
        expect(
            (el.color as { h: number; s: number; l: number; a: number }).l
        ).to.be.within(0.69, 0.71);

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
        expect(
            (el.color as { h: number; s: number; l: number; a: number }).s
        ).to.be.within(0.19, 0.21);
        expect(
            (el.color as { h: number; s: number; l: number; a: number }).l
        ).to.be.within(0.69, 0.71);

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
        expect(
            (el.color as { h: number; s: number; l: number; a: number }).s
        ).to.be.within(0.19, 0.21);
        expect(
            (el.color as { h: number; s: number; l: number; a: number }).l
        ).to.be.within(0.69, 0.71);
    });
    it('can have `change` events prevented', async () => {
        const color = { h: '0', s: '20%', l: '70%' };
        const el = await fixture<ColorSlider>(html`
            <sp-color-slider
                .color=${color}
                @change=${(event: Event) => {
                    event.preventDefault();
                }}
                style="
                        --spectrum-colorslider-default-length: 192px;
                        --spectrum-colorslider-height: 24px;
                        --spectrum-colorhandle-size: 5px;
                    "
            ></sp-color-slider>
        `);

        await elementUpdated(el);

        expect(el.value).to.equal(0);

        const handle = el.shadowRoot.querySelector(
            'sp-color-handle'
        ) as ColorHandle;
        const boundingClientRect = handle.getBoundingClientRect();
        const targetLocation: [number, number] = [
            boundingClientRect.left + boundingClientRect.width / 2 + 105,
            boundingClientRect.top + boundingClientRect.height / 2,
        ];

        await sendMouse([
            {
                type: 'move',
                position: [handle],
            },
            {
                type: 'down',
            },
            {
                type: 'move',
                position: targetLocation,
            },
        ]);

        await elementUpdated(el);

        expect(el.value).to.be.greaterThan(190);

        await sendMouse({ type: 'up' });

        await elementUpdated(el);
        expect(el.value).to.equal(0);
    });
    it('accepts pointer events while [vertical]', async () => {
        const el = await fixture<ColorSlider>(html`
            <sp-color-slider
                vertical
                style="--spectrum-colorslider-vertical-default-length: 192px; --spectrum-colorslider-vertical-width: 24px;"
            ></sp-color-slider>
        `);

        await elementUpdated(el);

        const { handle } = el as unknown as { handle: HTMLElement };

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

        expect(el.sliderHandlePosition).to.equal(100 - 47.91666666666667);

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

        expect(el.sliderHandlePosition).to.equal(100 - 53.125);
    });
    it('accepts pointer events in dir="rtl"', async () => {
        document.documentElement.dir = 'rtl';
        const el = await fixture<ColorSlider>(html`
            <sp-color-slider
                dir="rtl"
                style="--spectrum-colorslider-default-length: 192px; --spectrum-colorslider-default-height: 24px; --spectrum-colorslider-height: 24px;"
            ></sp-color-slider>
        `);
        await elementUpdated(el);

        const { handle } = el as unknown as { handle: HTMLElement };
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

        expect(el.sliderHandlePosition).to.be.approximately(
            100 - 52.083333333333336,
            0.000001
        );

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

        expect(el.sliderHandlePosition).to.equal(100 - 46.875);
    });
    const colorFormats: {
        name: string;
        color: ColorTypes;
        test?: string;
    }[] = [
        //rgb
        { name: 'RGB String', color: 'rgba(204, 51, 204, 1)' },
        { name: 'RGBA', color: { r: 204, g: 51, b: 204, a: 1 } },
        //prgb
        { name: 'PRGB String', color: 'rgba(80%, 20%, 80%,100%)' },
        { name: 'PRGB', color: { r: '80%', g: '20%', b: '80%', a: 1 } },
        // hex
        { name: 'Hex', color: '#cc33cc' },
        { name: 'Hex String', color: '#cc33cc' },
        // hex8
        { name: 'Hex8', color: '#cc33ccff' },
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
            const el = await fixture<ColorSlider>(Default());

            if (typeof format.color === 'string') {
                el.color = format.color;
            } else {
                el.color = { ...format.color } as ColorTypes;
            }

            if (format.name.startsWith('Hex')) {
                expect(el.color, el.color.toString()).to.equal(
                    format.test || format.color
                );
            } else {
                expect(
                    el.color,
                    `${JSON.stringify(el.color)} ${JSON.stringify(
                        format.color
                    )}`
                ).to.deep.equal(format.test || format.color);
            }
        });
    });
    it(`resolves Hex3 format to Hex6 format`, async () => {
        const el = await fixture<ColorSlider>(Default());
        el.color = '0f0';
        expect(el.color).to.equal('00ff00');

        el.color = '#1e0';
        expect(el.color).to.equal('#11ee00');
    });
    it(`resolves Hex4 format to Hex8 format`, async () => {
        const el = await fixture<ColorSlider>(Default());
        el.color = '#f3af';
        expect(el.color).to.equal('#ff33aaff');

        el.color = '#f3af';
        expect(el.color).to.equal('#ff33aaff');
    });
    it(`maintains hue value`, async () => {
        const el = await fixture<ColorSlider>(Default());
        const hue = 300;
        const hsl = `hsl(${hue}, 60%, 99%)`;
        el.color = hsl;
        expect(el.value).to.equal(hue);
        expect(el.color).to.equal(hsl);

        const hsla = `hsla(${hue}, 60%, 99%, 0.9)`;
        el.color = hsla;
        expect(el.value).to.equal(hue);
        expect(el.color).to.equal(hsla);

        const hsv = `hsv(${hue}, 60%, 99%)`;
        el.color = hsv;
        expect(el.value).to.equal(hue);
        expect(el.color).to.equal(hsv);

        const hsva = `hsva(${hue}, 60%, 99%, 0.9)`;
        el.color = hsva;
        expect(el.value).to.equal(hue);
        expect(el.color).to.equal(hsva);
    });
});
