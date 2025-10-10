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

import { Slider } from '@spectrum-web-components/slider';
import {
    editable,
    hideStepper,
    Indeterminate,
    StoryArgs,
} from '../stories/slider.stories.js';
import { elementUpdated, expect, nextFrame } from '@open-wc/testing';
import { html, TemplateResult } from '@spectrum-web-components/base';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';
import {
    fixture,
    testForLitDevWarnings,
} from '../../../test/testing-helpers.js';
import { sendMouse } from '../../../test/plugins/browser.js';

async function sliderFromFixture(
    sliderFixture: (args: StoryArgs) => TemplateResult
): Promise<Slider> {
    const el = await fixture<Slider>(sliderFixture({}));
    const slider = el.querySelector('sp-slider') as Slider;
    return slider;
}

export const testEditableSlider = (type: string): void => {
    describe(`Slider - editable, ${type}`, () => {
        testForLitDevWarnings(async () => await sliderFromFixture(editable));
        it('loads', async () => {
            const el = await sliderFromFixture(editable);

            await elementUpdated(el);

            await expect(el).to.be.accessible();
        });

        it('loads - [hide-stepper]', async () => {
            const el = await sliderFromFixture(hideStepper);

            await elementUpdated(el);

            await expect(el).to.be.accessible();
        });

        it('loads - [disabled]', async () => {
            const el = document.createElement('sp-slider');
            el.editable = true;
            el.disabled = true;
            el.label = 'Disabled, editable, slider';

            try {
                document.body.append(el);
            } catch (error) {
                expect(true).to.be.false;
            }

            await elementUpdated(el);

            await expect(el).to.be.accessible();
            el.remove();
        });

        it('toggles indeterminate when edited via the `<sp-number-field>`', async () => {
            const el = await sliderFromFixture(Indeterminate);

            await elementUpdated(el);

            expect(el.value).to.equal(5);
            expect(el.indeterminate).to.be.true;

            el.focus();

            await elementUpdated(el);

            await sendKeys({ press: 'Backspace' });
            await sendKeys({ press: 'Backspace' });
            await sendKeys({ type: '15' });
            await sendKeys({ press: 'Enter' });

            await elementUpdated(el);

            expect(el.value).to.equal(15);
            expect(el.indeterminate).to.be.false;
        });

        it('focuses `<sp-number-field>` directly', async () => {
            const el = await sliderFromFixture(editable);

            await elementUpdated(el);

            el.focus();

            await elementUpdated(el);

            expect(el.shadowRoot.activeElement).to.equal(el.numberField);
        });

        it('dispatches `input` of the animation frame', async () => {
            const inputSpy = spy();
            const changeSpy = spy();
            const el = await fixture<Slider>(html`
                <sp-slider
                    editable
                    hide-stepper
                    min="1"
                    max="100"
                    step="1"
                    label="Slider label"
                    @input=${(event: Event & { target: Slider }) => {
                        inputSpy(event.target.value);
                    }}
                    @change=${(event: Event & { target: Slider }) => {
                        changeSpy(event.target.value);
                    }}
                ></sp-slider>
            `);
            await elementUpdated(el);
            expect(el.value).to.equal(50.5);

            expect(inputSpy.callCount, 'start clean').to.equal(0);
            expect(changeSpy.callCount, 'start clean').to.equal(0);

            const handle = el.shadowRoot.querySelector(
                '.handle'
            ) as HTMLDivElement;
            const rect = handle.getBoundingClientRect();
            let frames = 0;
            let shouldCountFrames = true;
            const countFrames = (): void => {
                if (!shouldCountFrames) return;
                frames += 1;
                requestAnimationFrame(countFrames);
            };
            countFrames();
            type Steps = {
                type: 'move';
                position: [number, number];
            }[];
            const toRight: Steps = [...Array(51).keys()].map((i) => ({
                type: 'move',
                position: [
                    rect.left + rect.width / 2 + i,
                    rect.top + rect.height / 2,
                ],
            }));
            const toLeft: Steps = toRight.slice(0, -1).reverse();
            await sendMouse([
                {
                    type: 'move',
                    position: [handle],
                },
                {
                    type: 'down',
                },
                ...toRight,
                ...toLeft,
                {
                    type: 'up',
                },
            ]);
            shouldCountFrames = false;
            await elementUpdated(el);
            await nextFrame();
            await nextFrame();

            expect(el.value).to.gt(50.5);
            expect(
                inputSpy.callCount,
                'should not have more "input"s than frames'
            ).to.lte(frames);
            expect(changeSpy.callCount, 'only one change').to.equal(1);
        });

        it('edits via the `<sp-number-field>`', async () => {
            const inputSpy = spy();
            const changeSpy = spy();
            const el = await sliderFromFixture(editable);
            el.addEventListener('input', () => inputSpy());
            el.addEventListener('change', () => changeSpy());

            await elementUpdated(el);

            el.focus();

            await elementUpdated(el);

            expect(el.shadowRoot.activeElement).to.equal(el.numberField);
            expect(el.value).to.equal(90);

            await sendKeys({ press: 'Backspace' });
            await sendKeys({ press: 'Backspace' });
            await sendKeys({ press: 'Backspace' });
            await sendKeys({ type: '45' });
            await sendKeys({ press: 'Enter' });

            await elementUpdated(el);

            expect(el.shadowRoot.activeElement).to.equal(el.numberField);
            expect(el.value).to.equal(45);
            expect(inputSpy.callCount, 'one input').to.equal(1);
            expect(changeSpy.callCount, 'one change').to.equal(1);

            await sendKeys({ press: 'Backspace' });
            await sendKeys({ press: 'Backspace' });
            await sendKeys({ press: 'Backspace' });
            await sendKeys({ press: 'Enter' });

            expect(el.shadowRoot.activeElement).to.equal(el.numberField);
            expect(el.value).to.equal(45);
            expect(inputSpy.callCount, 'still one input').to.equal(1);
            expect(changeSpy.callCount, 'still one change').to.equal(1);

            el.shadowRoot.activeElement?.dispatchEvent(
                new WheelEvent('wheel', { deltaY: 1 })
            );

            await elementUpdated(el);

            expect(el.shadowRoot.activeElement).to.equal(el.numberField);
            expect(el.value).to.equal(46);
            expect(inputSpy.callCount, 'still one input').to.equal(2);

            el.shadowRoot.activeElement?.dispatchEvent(
                new WheelEvent('wheel', { deltaY: -1 })
            );

            await elementUpdated(el);

            expect(el.shadowRoot.activeElement).to.equal(el.numberField);
            expect(el.value).to.equal(45);
            expect(inputSpy.callCount, 'still one input').to.equal(3);

            el.shadowRoot.activeElement?.dispatchEvent(
                new WheelEvent('wheel', { deltaX: 1, shiftKey: true })
            );

            await elementUpdated(el);

            expect(el.shadowRoot.activeElement).to.equal(el.numberField);
            expect(el.value).to.equal(55);
            expect(inputSpy.callCount, 'still one input').to.equal(4);

            el.shadowRoot.activeElement?.dispatchEvent(
                new WheelEvent('wheel', { deltaX: -1, shiftKey: true })
            );

            await elementUpdated(el);

            expect(el.shadowRoot.activeElement).to.equal(el.numberField);
            expect(el.value).to.equal(45);
            expect(inputSpy.callCount, 'still one input').to.equal(5);
        });

        it('focuses `<input>` after pointer interactions', async () => {
            let pointerId = -1;
            const el = await sliderFromFixture(editable);

            await elementUpdated(el);

            expect(el.dragging).to.be.false;
            expect(el.highlight).to.be.false;
            expect(pointerId).to.equal(-1);

            const handle = el.shadowRoot.querySelector(
                '.handle'
            ) as HTMLDivElement;
            el.track.setPointerCapture = (id: number) => (pointerId = id);
            el.track.releasePointerCapture = (id: number) => (pointerId = id);
            handle.dispatchEvent(
                new PointerEvent('pointerdown', {
                    button: 1,
                    pointerId: 1,
                    cancelable: true,
                    bubbles: true,
                    composed: true,
                    pointerType: 'mouse',
                })
            );
            await elementUpdated(el);

            expect(el.dragging).to.be.false;
            expect(pointerId, '1').to.equal(-1);

            handle.dispatchEvent(
                new PointerEvent('pointerdown', {
                    button: 0,
                    pointerId: 1,
                    cancelable: true,
                    bubbles: true,
                    composed: true,
                    pointerType: 'mouse',
                })
            );

            await elementUpdated(el);

            expect(el.dragging, 'it is dragging 1').to.be.true;
            expect(pointerId, '2').to.equal(1);

            handle.dispatchEvent(
                new PointerEvent('pointerup', {
                    pointerId: 2,
                    cancelable: true,
                    bubbles: true,
                    composed: true,
                    pointerType: 'mouse',
                })
            );
            await elementUpdated(el);

            expect(el.dragging).to.be.false;
            expect(el.highlight).to.be.false;
            expect(pointerId, '3').to.equal(2);

            handle.dispatchEvent(
                new PointerEvent('pointerdown', {
                    button: 0,
                    pointerId: 1,
                    cancelable: true,
                    bubbles: true,
                    composed: true,
                    pointerType: 'mouse',
                })
            );

            await elementUpdated(el);

            expect(el.dragging, 'it is dragging 2').to.be.true;
            expect(pointerId, '4').to.equal(1);

            handle.dispatchEvent(
                new PointerEvent('pointercancel', {
                    pointerId: 3,
                    cancelable: true,
                    bubbles: true,
                    composed: true,
                    pointerType: 'mouse',
                })
            );
            await elementUpdated(el);

            expect(el.dragging).to.be.false;
            expect(pointerId, '5').to.equal(3);
            expect(el.shadowRoot.activeElement).to.equal(
                el.handleController.inputForHandle(el)
            );
        });

        // regression test for https://github.com/adobe/spectrum-web-components/issues/5522
        it('dispatches `input` on track interaction after handle interaction', async () => {
            const inputSpy = spy();
            const changeSpy = spy();

            const el = await fixture<Slider>(html`
                <sp-slider
                    editable
                    hide-stepper
                    min="1"
                    max="100"
                    step="1"
                    label="Slider label"
                    @input=${(event: Event & { target: Slider }) => {
                        inputSpy(event.target.value);
                    }}
                    @change=${(event: Event & { target: Slider }) => {
                        changeSpy(event.target.value);
                    }}
                ></sp-slider>
            `);
            await elementUpdated(el);
            expect(el.value).to.equal(50.5);

            expect(inputSpy.callCount, 'start clean').to.equal(0);
            expect(changeSpy.callCount, 'start clean').to.equal(0);

            const handle = el.shadowRoot.querySelector(
                '.handle'
            ) as HTMLDivElement;

            const rect = handle.getBoundingClientRect();

            // click handle once
            await sendMouse([
                {
                    type: 'move',
                    position: [handle],
                },
                { type: 'down' },
                { type: 'up' },
            ]);

            await elementUpdated(el);

            expect(changeSpy.callCount, 'one change').to.equal(1);
            expect(inputSpy.callCount, 'no input').to.equal(0);

            // move to and click track once
            await sendMouse([
                {
                    type: 'move',
                    position: [
                        rect.left - rect.width,
                        rect.top + rect.height / 2,
                    ],
                },
                { type: 'down' },
                { type: 'up' },
            ]);

            await elementUpdated(el);

            expect(changeSpy.callCount, 'one additional change').to.equal(2);
            expect(inputSpy.callCount, 'one input').to.equal(1);
        });
    });
};
