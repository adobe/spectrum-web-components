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

import {
    elementUpdated,
    expect,
    fixture,
    html,
    nextFrame,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import '@spectrum-web-components/button/sp-button.js';
import { Overlay } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/popover/sp-popover.js';
import { Slider, SliderHandle } from '@spectrum-web-components/slider';
import '@spectrum-web-components/slider/sp-slider-handle.js';
import '@spectrum-web-components/slider/sp-slider.js';
import { sendKeys } from '@web/test-runner-commands';
import { spy, stub } from 'sinon';
import { sendMouse } from '../../../test/plugins/browser.js';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { createLanguageContext } from '../../../tools/reactive-controllers/test/helpers.js';
import { tick } from '../stories/slider.stories.js';

describe('Slider', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Slider>(html`
                <sp-slider label="Slider"></sp-slider>
            `)
    );
    it('loads', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider label="Slider"></sp-slider>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads - [variant="tick"]', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider
                label="Ticked Slider"
                min="-100"
                max="100"
                value="0"
                tick-labels
                variant="tick"
            ></sp-slider>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads - [variant="tick"] irregularly', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider label="Slider"></sp-slider>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('receives value from the outside', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider max="20"></sp-slider>
        `);

        await elementUpdated(el);

        expect(el.value).to.equal(10);

        el.value = 10;
        await elementUpdated(el);

        expect(el.value).to.equal(10);

        el.value = 50;
        await elementUpdated(el);

        expect(el.value).to.equal(20);
    });
    it('accepts keyboard events', async () => {
        const el = await fixture<Slider>(
            tick({
                variant: 'tick',
                tickStep: 5,
            })
        );

        await elementUpdated(el);

        expect(el.value).to.equal(46);
        expect(el.highlight).to.be.false;

        el.focus();
        await sendKeys({ press: 'ArrowDown' });
        await elementUpdated(el);

        expect(el.value).to.equal(45);
        expect(el.highlight).to.be.true;
        await sendKeys({ press: 'ArrowUp' });
        await elementUpdated(el);

        expect(el.value).to.equal(46);
        expect(el.highlight).to.be.true;
    });
    it('stops propagation of arrow key events but allows other keys to propagate', async () => {
        const keydownSpy = spy();
        const el = await fixture<Slider>(html`
            <div @keydown=${() => keydownSpy()}>
                <sp-slider value="50"></sp-slider>
            </div>
        `);
        const slider = el.querySelector('sp-slider') as Slider;

        await elementUpdated(slider);

        slider.focus();

        // Arrow keys should NOT propagate
        await sendKeys({ press: 'ArrowDown' });
        await elementUpdated(slider);

        expect(slider.value).to.equal(49);
        expect(
            keydownSpy.callCount,
            'ArrowDown event should not propagate'
        ).to.equal(0);

        await sendKeys({ press: 'ArrowUp' });
        await elementUpdated(slider);

        expect(slider.value).to.equal(50);
        expect(
            keydownSpy.callCount,
            'ArrowUp event should not propagate'
        ).to.equal(0);

        await sendKeys({ press: 'ArrowLeft' });
        await elementUpdated(slider);

        expect(
            keydownSpy.callCount,
            'ArrowLeft event should not propagate'
        ).to.equal(0);

        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(slider);

        expect(
            keydownSpy.callCount,
            'ArrowRight event should not propagate'
        ).to.equal(0);

        // Other keys SHOULD propagate
        await sendKeys({ press: 'Tab' });
        await elementUpdated(slider);

        expect(
            keydownSpy.callCount,
            'Tab event should propagate'
        ).to.be.greaterThan(0);
    });
    it('accepts pointer events', async () => {
        let pointerId = -1;
        const el = await fixture<Slider>(html`
            <sp-slider></sp-slider>
        `);

        await elementUpdated(el);

        expect(el.dragging).to.be.false;
        expect(el.highlight).to.be.false;
        expect(pointerId).to.equal(-1);

        const handle = el.shadowRoot.querySelector('.handle') as HTMLDivElement;
        el.track.setPointerCapture = (id: number) => (pointerId = id);
        el.track.releasePointerCapture = (id: number) => (pointerId = id);
        handle.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 1,
                pointerId: 1,
                cancelable: true,
                bubbles: true,
                composed: true,
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
            })
        );
        await elementUpdated(el);

        expect(el.dragging).to.be.false;
        expect(pointerId, '5').to.equal(3);
    });
    it('will `trackPointerDown` on `#controls`', async () => {
        let pointerId = -1;
        const el = await fixture<Slider>(html`
            <sp-slider style="width: 500px" max="70"></sp-slider>
        `);

        await elementUpdated(el);

        expect(el.value).to.equal(35);

        const controls = el.shadowRoot.querySelector(
            '#controls'
        ) as HTMLDivElement;
        const handle = el.shadowRoot.querySelector('.handle') as HTMLDivElement;
        el.track.setPointerCapture = (id: number) => (pointerId = id);
        el.track.releasePointerCapture = (id: number) => (pointerId = id);

        controls.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 1,
                // account for 8px <body> margin by default
                clientX: 9,
                pointerId: 4,
                bubbles: true,
                cancelable: true,
            })
        );
        await elementUpdated(el);

        expect(pointerId).to.equal(-1);
        expect(el.value).to.equal(35);
        expect(el.dragging, 'handle is not yet being dragged').to.be.false;

        controls.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0,
                // account for 8px <body> margin by default
                clientX: 9,
                pointerId: 4,
                bubbles: true,
                cancelable: true,
            })
        );
        await elementUpdated(el);

        expect(pointerId).to.equal(4);
        expect(el.value).to.equal(0);
        expect(el.dragging, 'handle is being dragged').to.be.true;
        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                button: 0,
                // account for 8px <body> margin by default
                clientX: 508,
                pointerId: 4,
                bubbles: true,
                cancelable: true,
            })
        );
        await elementUpdated(el);

        expect(el.dragging, 'handle is still being dragged').to.be.true;
        expect(pointerId).to.equal(4);
        expect(el.value).to.equal(70);

        handle.dispatchEvent(
            new PointerEvent('pointerup', {
                button: 0,
                // account for 8px <body> margin by default
                clientX: 9,
                pointerId: 4,
                bubbles: true,
                cancelable: true,
            })
        );
        await elementUpdated(el);

        expect(pointerId).to.equal(4);
        expect(el.value).to.equal(70);
        expect(el.dragging, 'handle is no longer being dragged').to.be.false;
    });
    it('can be disabled', async () => {
        let pointerId = -1;
        const el = await fixture<Slider>(html`
            <sp-slider disabled></sp-slider>
        `);

        await elementUpdated(el);

        expect(el.dragging).to.be.false;
        expect(pointerId).to.equal(-1);
        expect(el.value).to.equal(50);

        const handle = el.shadowRoot.querySelector('.handle') as HTMLDivElement;
        handle.setPointerCapture = (id: number) => (pointerId = id);

        handle.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0,
                pointerId: 1,
                cancelable: true,
            })
        );
        await elementUpdated(el);

        expect(el.dragging).to.be.false;
        expect(pointerId).to.equal(-1);

        const controls = el.shadowRoot.querySelector(
            '#controls'
        ) as HTMLDivElement;

        controls.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0,
                clientX: 50,
                pointerId: 1,
                cancelable: true,
            })
        );
        await elementUpdated(el);

        expect(pointerId).to.equal(-1);
        expect(el.value).to.equal(50);
    });
    it('accepts pointermove events', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider></sp-slider>
        `);
        await elementUpdated(el);

        expect(el.value).to.equal(50);

        const handle = el.shadowRoot.querySelector('.handle') as HTMLDivElement;

        await sendMouse([
            {
                type: 'move',
                position: [handle],
            },
            {
                type: 'down',
            },
        ]);
        await elementUpdated(el);

        expect(el.dragging, 'is dragging').to.be.true;
        expect(el.highlight, 'not highlighted').to.be.false;

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: 0,
                cancelable: true,
                bubbles: true,
                composed: true,
            })
        );
        await elementUpdated(el);

        expect(el.value).to.equal(0);
    });

    it('changes value when clicking on the track', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider style="width: 100px"></sp-slider>
        `);
        await elementUpdated(el);

        expect(el.value).to.equal(50);

        const track = el.shadowRoot.querySelector('#track') as HTMLDivElement;
        const trackBoundingRect = track.getBoundingClientRect();

        let pointerId = -1;
        el.track.setPointerCapture = (id: number) => (pointerId = id);
        el.track.releasePointerCapture = (id: number) => (pointerId = id);

        // Click on the track moves it to value 60
        track.dispatchEvent(
            new PointerEvent('pointerdown', {
                clientX: trackBoundingRect.x + trackBoundingRect.width / 2 + 10,
                clientY: trackBoundingRect.y + trackBoundingRect.height / 2,
                pointerId: 1,
                cancelable: true,
                bubbles: true,
                composed: true,
                button: 0,
            })
        );
        await elementUpdated(el);
        track.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 1,
                cancelable: true,
                bubbles: true,
                composed: true,
            })
        );
        await elementUpdated(el);

        expect(el.value).to.equal(60);
        expect(pointerId, '1').to.equal(1);

        // Click and drag on the track moves it from value 60 -> 75
        track.dispatchEvent(
            new PointerEvent('pointerdown', {
                clientX: trackBoundingRect.x + trackBoundingRect.width / 2 + 10,
                clientY: trackBoundingRect.y + trackBoundingRect.height / 2,
                pointerId: 2,
                cancelable: true,
                bubbles: true,
                composed: true,
                button: 0,
            })
        );
        track.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: trackBoundingRect.x + trackBoundingRect.width / 2 + 25,
                clientY: trackBoundingRect.y + trackBoundingRect.height / 2,
                pointerId: 2,
                cancelable: true,
                bubbles: true,
                composed: true,
            })
        );
        await elementUpdated(el);
        track.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 2,
                cancelable: true,
                bubbles: true,
                composed: true,
            })
        );
        await elementUpdated(el);
        expect(el.value).to.equal(75);
    });

    it('dispatches `input` of the animation frame', async () => {
        const inputSpy = spy();
        const changeSpy = spy();
        const el = await fixture<Slider>(html`
            <sp-slider
                value="50"
                style="width: 100px"
                @input=${(event: Event & { target: Slider }) => {
                    inputSpy(event.target.value);
                }}
                @change=${(event: Event & { target: Slider }) => {
                    changeSpy(event.target.value);
                }}
            ></sp-slider>
        `);
        await elementUpdated(el);

        const handle = el.shadowRoot.querySelector('.handle') as HTMLDivElement;

        expect(inputSpy.callCount, 'start clean').to.equal(0);
        expect(changeSpy.callCount, 'start clean').to.equal(0);

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
            position: [9 + i, 30],
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

        expect(
            inputSpy.callCount,
            'should not have more "input"s than frames'
        ).to.lte(frames);
        expect(changeSpy.callCount, 'only one change').to.equal(1);
    });

    it('manages RTL when min != 0', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider min="1" max="11" dir="rtl"></sp-slider>
        `);
        await elementUpdated(el);

        expect(el.value).to.equal(6);

        const handle = el.shadowRoot.querySelector('.handle') as HTMLDivElement;
        await sendMouse([
            {
                type: 'move',
                position: [handle],
            },
            {
                type: 'down',
            },
        ]);
        await elementUpdated(el);

        expect(el.dragging, 'is dragging').to.be.true;
        expect(el.highlight, 'not highlighted').to.be.false;

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: 0,
                cancelable: true,
                bubbles: true,
                composed: true,
            })
        );
        await elementUpdated(el);

        expect(el.value).to.equal(11);
    });

    it('goes [disabled] while dragging', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider></sp-slider>
        `);
        await elementUpdated(el);

        expect(el.value).to.equal(50);

        const handle = el.shadowRoot.querySelector('.handle') as HTMLDivElement;
        const handleBoundingRect = handle.getBoundingClientRect();
        await sendMouse([
            {
                type: 'move',
                position: [handle],
            },
            {
                type: 'down',
            },
        ]);
        await elementUpdated(el);

        expect(el.dragging, 'is dragging').to.be.true;
        expect(el.highlight, 'not highlighted').to.be.false;
        expect(el.value).to.equal(50);

        const inputEvent = oneEvent(el, 'input');
        await sendMouse({
            type: 'move',
            position: [
                handleBoundingRect.x + handleBoundingRect.width / 2 + 100,
                handleBoundingRect.y + handleBoundingRect.height / 2,
            ],
        });
        await inputEvent;

        expect(el.value).to.equal(63);

        el.disabled = true;
        await elementUpdated(el);

        expect(el.dragging, 'is dragging').to.be.false;
        expect(el.highlight, 'not highlighted').to.be.false;

        await sendMouse({
            type: 'move',
            position: [
                0,
                handleBoundingRect.top + handleBoundingRect.height / 2,
            ],
        });

        expect(el.value).to.equal(63);
    });
    it('accepts pointermove events in separate interactions', async () => {
        let pointerId = -1;
        const el = await fixture<Slider>(html`
            <sp-slider style="width: 100px"></sp-slider>
        `);
        await elementUpdated(el);

        expect(el.value, 'initial').to.equal(50);

        const handle = el.shadowRoot.querySelector('.handle') as HTMLDivElement;
        el.track.setPointerCapture = (id: number) => (pointerId = id);
        el.track.releasePointerCapture = (id: number) => (pointerId = id);
        handle.dispatchEvent(
            new PointerEvent('pointerdown', {
                clientX: 58,
                cancelable: true,
                button: 0,
                pointerId: 100,
                composed: true,
                bubbles: true,
            })
        );
        await elementUpdated(el);
        await nextFrame();
        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: 58,
                cancelable: true,
                composed: true,
                bubbles: true,
            })
        );
        await elementUpdated(el);
        await nextFrame();

        expect(el.value, 'first pointerdown').to.equal(50);
        expect(el.dragging, 'is dragging').to.be.true;
        expect(el.classList.contains('handle-highlight'), 'not highlighted').to
            .be.false;
        expect(pointerId).to.equal(100);

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: 0,
                cancelable: true,
                composed: true,
                bubbles: true,
            })
        );
        await elementUpdated(el);
        await nextFrame();

        expect(el.value, 'first pointermove').to.equal(0);

        handle.dispatchEvent(
            new PointerEvent('pointerup', {
                clientX: 0,
                cancelable: true,
                composed: true,
                bubbles: true,
            })
        );
        await elementUpdated(el);

        expect(el.value, 'first pointerup').to.equal(0);
        expect(el.dragging, 'is dragging').to.be.false;
        handle.dispatchEvent(
            new PointerEvent('pointerdown', {
                clientX: 58,
                cancelable: true,
                button: 0,
                composed: true,
                bubbles: true,
            })
        );
        await elementUpdated(el);
        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: 58,
                cancelable: true,
                composed: true,
                bubbles: true,
            })
        );
        await elementUpdated(el);
        await nextFrame();

        expect(el.value, 'second pointerdown').to.equal(50);
        expect(el.dragging, 'is dragging').to.be.true;
        expect(el.classList.contains('handle-highlight'), 'not highlighted').to
            .be.false;

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: 0,
                cancelable: true,
                composed: true,
                bubbles: true,
            })
        );
        await elementUpdated(el);
        await nextFrame();

        expect(el.value, 'second pointermove').to.equal(0);

        handle.dispatchEvent(
            new PointerEvent('pointerup', {
                clientX: 0,
                cancelable: true,
                composed: true,
                bubbles: true,
            })
        );
        await elementUpdated(el);

        expect(el.value, 'second pointerup').to.equal(0);
        expect(el.dragging, 'is dragging').to.be.false;
    });
    it('accepts pointermove events - [step=0]', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider step="0" max="20" style="width: 500px; float: left;">
                Step = 0
            </sp-slider>
        `);
        await elementUpdated(el);
        await nextFrame();
        await nextFrame();

        expect(el.value).to.equal(10);

        const handle = el.shadowRoot.querySelector('.handle') as HTMLDivElement;
        const handleBoundingRect = handle.getBoundingClientRect();

        await sendMouse([
            {
                type: 'move',
                position: [handle],
            },
            {
                type: 'down',
            },
        ]);

        await elementUpdated(el);

        expect(el.highlight, 'with no highlight').to.be.false;
        expect(el.dragging, 'dragging').to.be.true;

        let inputEvent = oneEvent(el, 'input');
        await sendMouse({
            type: 'move',
            position: [
                200,
                handleBoundingRect.y + handleBoundingRect.height + 100,
            ],
        });
        await inputEvent;
        await nextFrame();

        expect(el.value).to.equal(8);

        inputEvent = oneEvent(el, 'input');
        await sendMouse({
            type: 'move',
            position: [
                125,
                handleBoundingRect.y + handleBoundingRect.height / 2,
            ],
        });
        await inputEvent;

        expect(el.value).to.equal(5);
    });
    it('will not pointermove unless `pointerdown`', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider></sp-slider>
        `);

        await elementUpdated(el);

        expect(el.value).to.equal(50);
        expect(el.dragging).to.be.false;

        const handle = el.shadowRoot.querySelector('.handle') as HTMLDivElement;

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: 0,
                cancelable: true,
            })
        );
        await nextFrame();

        expect(el.value).to.equal(50);
    });
    it('responds to input events on the <input/> element', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider></sp-slider>
        `);

        await elementUpdated(el);

        expect(el.value).to.equal(50);

        const input = el.shadowRoot.querySelector('.input') as HTMLInputElement;

        input.value = '0';
        input.dispatchEvent(new Event('change'));

        expect(el.value).to.equal(0);
    });
    it('accepts variants', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider variant="tick"></sp-slider>
        `);

        await elementUpdated(el);

        expect(el.variant).to.equal('tick');
        expect(el.getAttribute('variant')).to.equal('tick');

        el.variant = 'ramp';

        await elementUpdated(el);

        expect(el.variant).to.equal('ramp');
        expect(el.getAttribute('variant')).to.equal('ramp');

        el.setAttribute('variant', 'filled');

        await elementUpdated(el);

        expect(el.variant).to.equal('filled');
        expect(el.getAttribute('variant')).to.equal('filled');

        el.removeAttribute('variant');

        await elementUpdated(el);

        expect(el.variant).to.equal('');
        expect(el.hasAttribute('variant')).to.be.false;
    });
    it('validates variants', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider variant="other"></sp-slider>
        `);

        await elementUpdated(el);

        expect(el.variant).to.equal('');
        expect(el.hasAttribute('variant')).to.be.false;

        el.variant = 'tick';

        await elementUpdated(el);

        expect(el.variant).to.equal('tick');
        expect(el.getAttribute('variant')).to.equal('tick');

        el.variant = 'tick';

        await elementUpdated(el);

        expect(el.variant).to.equal('tick');
        expect(el.getAttribute('variant')).to.equal('tick');
    });
    it('renders fill from the centerPoint of the track when fill-start has no value', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider
                max="20"
                variant="filled"
                fill-start
                min="0"
                value="10"
                step="1"
            ></sp-slider>
        `);

        await elementUpdated(el);
        await nextFrame();
        await nextFrame();
        const fillElement = el.shadowRoot.querySelector(
            '.fill'
        ) as HTMLDivElement;

        expect(fillElement).to.exist;
        expect(fillElement.style.left).to.equal('50%');
        expect(fillElement.style.width).to.equal('0%');
        expect(el.values).to.deep.equal({ value: 10 });
    });
    it('renders fill from value when fill-start has value=0', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider
                max="150"
                variant="filled"
                fill-start="0"
                min="-50"
                value="25"
                step="1"
            ></sp-slider>
        `);

        await elementUpdated(el);
        await nextFrame();
        await nextFrame();
        const fillElement = el.shadowRoot.querySelector(
            '.fill'
        ) as HTMLDivElement;

        expect(fillElement).to.exist;
        expect(fillElement.style.left).to.equal('25%');
        expect(fillElement.style.width).to.equal('12.5%');
        expect(el.values).to.deep.equal({ value: 25 });
    });
    it('renders fill from fill-start point', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider max="100" fill-start="15" min="0" value="10"></sp-slider>
        `);

        await elementUpdated(el);
        await nextFrame();
        await nextFrame();
        const fillElement = el.shadowRoot.querySelector(
            '.fill'
        ) as HTMLDivElement;

        expect(fillElement).to.exist;
        expect(fillElement.style.left).to.equal('10%');
        expect(fillElement.style.width).to.equal('5%');
        expect(el.values).to.deep.equal({ value: 10 });

        const handle = el.shadowRoot.querySelector('.handle') as HTMLDivElement;
        const handleBoundingRect = handle.getBoundingClientRect();
        await sendMouse([
            {
                type: 'move',
                position: [handle],
            },
            {
                type: 'down',
            },
        ]);

        await elementUpdated(el);
        await sendMouse({
            type: 'move',
            position: [
                200,
                handleBoundingRect.y + handleBoundingRect.height + 100,
            ],
        });
        await nextFrame();

        expect(el.value).to.equal(24);
    });
    it('renders fill from fill-start point with given normalization function', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider
                max="100"
                fill-start="0"
                min="-50"
                value="-25"
                .normalization=${{
                    toNormalized: (value: number): number => {
                        if (value === 0) return 0.5;
                        return value < 0
                            ? 0.5 - (value / -50) * 0.5
                            : 0.5 + (value / 100) * 0.5;
                    },
                    fromNormalized: (value: number): number => {
                        if (value === 0.5) return 0;
                        return value < 0.5
                            ? (1 - value / 0.5) * -50
                            : ((value - 0.5) / 0.5) * 100;
                    },
                }}
            ></sp-slider>
        `);

        await elementUpdated(el);
        await nextFrame();
        await nextFrame();
        const fillElement = el.shadowRoot.querySelector(
            '.fill'
        ) as HTMLDivElement;

        expect(fillElement).to.exist;
        expect(fillElement.style.left).to.equal('25%');
        expect(fillElement.style.width).to.equal('25%');
        expect(el.values).to.deep.equal({ value: -25 });
    });
    it('has a `focusElement`', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider></sp-slider>
        `);

        await elementUpdated(el);

        const input = el.focusElement as HTMLInputElement;
        expect(input).to.not.be.undefined;
        expect(input.type).to.equal('range');
    });
    it('displays result of getAriaValueText', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider
                value="50"
                min="0"
                max="100"
                .getAriaHandleText=${(value: number) => `${value}%`}
            ></sp-slider>
        `);

        await elementUpdated(el);

        const input = el.focusElement as HTMLInputElement;
        expect(input.getAttribute('aria-valuetext')).to.equal('50%');

        el.value = 100;
        await elementUpdated(el);

        expect(input.getAttribute('aria-valuetext')).to.equal('100%');
    });
    it('displays Intl.formatNumber results', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider
                value=".5"
                min="0"
                max="1"
                .formatOptions=${{ style: 'percent' }}
            ></sp-slider>
        `);

        await elementUpdated(el);

        const input = el.focusElement as HTMLInputElement;
        expect(input.getAttribute('aria-valuetext')).to.equal('50%');

        el.value = 100;
        await elementUpdated(el);

        expect(input.getAttribute('aria-valuetext')).to.equal('100%');
    });
    it('obeys language property', async () => {
        const [languageContext, updateLanguage] = createLanguageContext('de');
        let el = await fixture<Slider>(html`
            <sp-slider
                value="2.44"
                min="0"
                max="10"
                step="0.01"
                @sp-language-context=${languageContext}
                .formatOptions=${{ maximumFractionDigits: 2 }}
            ></sp-slider>
        `);

        await elementUpdated(el);

        let input = el.focusElement as HTMLInputElement;
        expect(
            input.getAttribute('aria-valuetext'),
            'First German number'
        ).to.equal('2,44');

        updateLanguage('en');
        await elementUpdated(el);

        expect(
            input.getAttribute('aria-valuetext'),
            'First English number'
        ).to.equal('2.44');

        updateLanguage('de');
        el = await fixture<Slider>(html`
            <sp-slider min="0" max="10" @sp-language-context=${languageContext}>
                <sp-slider-handle
                    slot="handle"
                    step="0.01"
                    value="2.44"
                    .formatOptions=${{ maximumFractionDigits: 2 }}
                    @sp-language-context=${languageContext}
                ></sp-slider-handle>
            </sp-slider>
        `);

        await elementUpdated(el);

        input = el.focusElement as HTMLInputElement;
        expect(
            input.getAttribute('aria-valuetext'),
            'Second German number'
        ).to.equal('2,44');

        updateLanguage('en');
        await elementUpdated(el);

        expect(
            input.getAttribute('aria-valuetext'),
            'Second English number'
        ).to.equal('2.44');
    });
    it('uses fallback ariaValueText', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider value="50" min="0" max="100"></sp-slider>
        `);

        await elementUpdated(el);
        (
            el as unknown as {
                getAriaValueText: boolean;
            }
        ).getAriaValueText = false;

        const input = el.focusElement as HTMLInputElement;
        await elementUpdated(el);

        expect(input.getAttribute('aria-valuetext')).to.equal('50');
    });
    it('supports units not included in Intl.NumberFormatOptions', async () => {
        let el = await fixture<Slider>(html`
            <sp-slider
                value="50"
                min="0"
                max="100"
                format-options='{"style": "unit", "unit": "px"}'
            ></sp-slider>
        `);

        await elementUpdated(el);

        const input = el.focusElement as HTMLInputElement;
        await elementUpdated(el);

        expect(input.getAttribute('aria-valuetext')).to.equal('50px');

        el = await fixture<Slider>(html`
            <sp-slider
                value="5"
                step="1"
                min="0"
                max="255"
                format-options='{"style": "unit", "unit": "px"}'
            >
                <sp-slider-handle
                    slot="handle"
                    name="min"
                    label="Minimum"
                    value="5"
                ></sp-slider-handle>
                <sp-slider-handle
                    slot="handle"
                    name="max"
                    label="Maximum"
                    value="250"
                ></sp-slider-handle>
            </sp-slider>
        `);

        await elementUpdated(el);

        let shadowRoot = el.shadowRoot as ShadowRoot;
        expect(shadowRoot.querySelector('input#input-0[aria-valuetext="5px"]'))
            .to.exist;
        expect(
            shadowRoot.querySelector('input#input-1[aria-valuetext="250px"]')
        ).to.exist;

        el = await fixture<Slider>(html`
            <sp-slider value="5" step="1" min="0" max="255">
                <sp-slider-handle
                    slot="handle"
                    name="min"
                    label="Minimum"
                    value="5"
                    format-options='{"style": "unit", "unit": "px"}'
                ></sp-slider-handle>
                <sp-slider-handle
                    slot="handle"
                    name="max"
                    label="Maximum"
                    value="250"
                    format-options='{"style": "unit", "unit": "px"}'
                ></sp-slider-handle>
            </sp-slider>
        `);

        await elementUpdated(el);

        shadowRoot = el.shadowRoot as ShadowRoot;
        expect(shadowRoot.querySelector('input#input-0[aria-valuetext="5px"]'))
            .to.exist;
        expect(
            shadowRoot.querySelector('input#input-1[aria-valuetext="250px"]')
        ).to.exist;
    });
    it('accepts min/max/value in the same timing', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider></sp-slider>
        `);

        await elementUpdated(el);

        expect(el.value).to.equal(50);

        el.min = 0;
        el.max = 200;
        el.value = 200;

        await elementUpdated(el);

        expect(el.value).to.equal(200);

        el.value = 500;
        el.min = 0;
        el.max = 500;

        await elementUpdated(el);

        expect(el.value).to.equal(500);

        el.value = -100;
        el.min = -100;
        el.max = 500;

        await elementUpdated(el);

        expect(el.value).to.equal(-100);
    });
    it('returns values for handles', async () => {
        let el = await fixture<Slider>(html`
            <sp-slider>
                <sp-slider-handle
                    slot="handle"
                    name="a"
                    min="0"
                    value="10"
                ></sp-slider-handle>
                <sp-slider-handle
                    id="middle-handle"
                    slot="handle"
                    name="b"
                    value="20"
                ></sp-slider-handle>
                <sp-slider-handle
                    slot="handle"
                    name="c"
                    value="30"
                    max="100"
                ></sp-slider-handle>
            </sp-slider>
        `);

        await elementUpdated(el);

        expect(el.values).to.deep.equal({ a: 10, b: 20, c: 30 });

        const middleHandle = el.querySelector('#middle-handle') as SliderHandle;
        middleHandle.value = 22;

        await elementUpdated(el);

        expect(el.values).to.deep.equal({ a: 10, b: 22, c: 30 });

        el = await fixture<Slider>(html`
            <sp-slider value="10" min="0" max="100"></sp-slider>
        `);
        expect(el.values).to.deep.equal({ value: 10 });

        el = await fixture<Slider>(html`
            <sp-slider min="0" max="100">
                <sp-slider-handle slot="handle" value="10"></sp-slider-handle>
            </sp-slider>
        `);
        expect(el.values).to.deep.equal({ handle1: 10 });
    });
    it('clamps values for multi-handle slider', async () => {
        const el = await fixture<Slider>(html`
            <sp-slider min="0" max="100">
                <sp-slider-handle
                    id="first-handle"
                    max="next"
                    slot="handle"
                    name="a"
                    value="10"
                ></sp-slider-handle>
                <sp-slider-handle
                    id="middle-handle"
                    min="previous"
                    max="next"
                    slot="handle"
                    name="b"
                    value="20"
                ></sp-slider-handle>
                <sp-slider-handle
                    id="last-handle"
                    min="previous"
                    slot="handle"
                    name="c"
                    value="30"
                ></sp-slider-handle>
            </sp-slider>
        `);

        await elementUpdated(el);

        expect(el.values).to.deep.equal({ a: 10, b: 20, c: 30 });

        const firstHandle = el.querySelector('#first-handle') as SliderHandle;
        const middleHandle = el.querySelector('#middle-handle') as SliderHandle;
        const lastHandle = el.querySelector('#last-handle') as SliderHandle;

        firstHandle.value = 25;
        await elementUpdated(el);
        expect(el.values).to.deep.equal({ a: 20, b: 20, c: 30 });

        firstHandle.value = 10;
        await elementUpdated(el);
        middleHandle.value = 5;
        await elementUpdated(el);
        expect(el.values).to.deep.equal({ a: 10, b: 10, c: 30 });

        lastHandle.value = 11;
        await elementUpdated(el);
        expect(el.values).to.deep.equal({ a: 10, b: 10, c: 11 });

        lastHandle.value = 7;
        await elementUpdated(el);
        expect(el.values).to.deep.equal({ a: 10, b: 10, c: 10 });
    });
    it('builds both handles from a <template>', async () => {
        const template = document.createElement('template');
        template.innerHTML = `
            <sp-slider variant="range" step="1" id="price" name="price" label="Max Price" min="35425" max="86610">
                <sp-slider-handle slot="handle" name="min" label="Minimum" max="next" value="35425"></sp-slider-handle>
                <sp-slider-handle slot="handle" name="max" label="Maximum" min="previous" value="86610"></sp-slider-handle>
            </sp-slider>
        `;
        const el = await fixture<HTMLDivElement>(html`
            <div></div>
        `);

        el.appendChild(template.content.cloneNode(true));
        await waitUntil(() => {
            return el.querySelector('sp-slider')?.shadowRoot != null;
        });
        // Sliders take several frames to fully upgrade
        await nextFrame();

        const createdHandles =
            el
                .querySelector('sp-slider')
                ?.shadowRoot.querySelectorAll('.handle') || [];
        expect(createdHandles).to.have.lengthOf(2);
    });
    it('enforces next/previous max/min', async () => {
        let el = await fixture<Slider>(html`
            <sp-slider min="0" max="100">
                <sp-slider-handle
                    id="first-handle"
                    max="next"
                    slot="handle"
                    name="a"
                    value="10"
                ></sp-slider-handle>
                <sp-slider-handle
                    id="middle-handle"
                    min="previous"
                    max="next"
                    slot="handle"
                    name="b"
                    value="20"
                ></sp-slider-handle>
                <sp-slider-handle
                    id="last-handle"
                    min="previous"
                    slot="handle"
                    name="c"
                    value="30"
                ></sp-slider-handle>
            </sp-slider>
        `);

        await elementUpdated(el);

        expect(el.values).to.deep.equal({ a: 10, b: 20, c: 30 });

        let firstHandle = el.querySelector('#first-handle') as SliderHandle;
        let lastHandle = el.querySelector('#last-handle') as SliderHandle;

        let firstInput = el.shadowRoot.querySelector(
            '.handle[name="a"] > input'
        ) as HTMLInputElement;
        let middleInput = el.shadowRoot.querySelector(
            '.handle[name="b"] > input'
        ) as HTMLInputElement;
        let lastInput = el.shadowRoot.querySelector(
            '.handle[name="c"] > input'
        ) as HTMLInputElement;

        expect(firstInput.min).to.equal('0');
        expect(firstInput.max).to.equal('20');

        expect(middleInput.min).to.equal('10');
        expect(middleInput.max).to.equal('30');

        expect(lastInput.min).to.equal('20');
        expect(lastInput.max).to.equal('100');

        firstHandle.value = 15;
        lastHandle.value = 85;

        await elementUpdated(el);
        await elementUpdated(el);

        expect(firstInput.min).to.equal('0');
        expect(firstInput.max).to.equal('20');

        expect(middleInput.min).to.equal('15');
        expect(middleInput.max).to.equal('85');

        expect(lastInput.min).to.equal('20');
        expect(lastInput.max).to.equal('100');

        el = await fixture<Slider>(html`
            <sp-slider>
                <sp-slider-handle
                    id="first-handle"
                    min="0"
                    max="next"
                    slot="handle"
                    name="a"
                    value="10"
                ></sp-slider-handle>
                <sp-slider-handle
                    id="middle-handle"
                    min="previous"
                    max="next"
                    slot="handle"
                    name="b"
                    value="20"
                ></sp-slider-handle>
                <sp-slider-handle
                    id="last-handle"
                    min="previous"
                    max="100"
                    slot="handle"
                    name="c"
                    value="30"
                ></sp-slider-handle>
            </sp-slider>
        `);

        firstInput = el.shadowRoot.querySelector(
            '.handle[name="a"] > input'
        ) as HTMLInputElement;
        middleInput = el.shadowRoot.querySelector(
            '.handle[name="b"] > input'
        ) as HTMLInputElement;
        lastInput = el.shadowRoot.querySelector(
            '.handle[name="c"] > input'
        ) as HTMLInputElement;

        expect(firstInput.min).to.equal('0');
        expect(firstInput.max).to.equal('20');

        expect(middleInput.min).to.equal('10');
        expect(middleInput.max).to.equal('30');

        expect(lastInput.min).to.equal('20');
        expect(lastInput.max).to.equal('100');

        firstHandle = el.querySelector('#first-handle') as SliderHandle;
        lastHandle = el.querySelector('#last-handle') as SliderHandle;

        firstHandle.min = 5;
        lastHandle.max = 95;

        await elementUpdated(el);
        await elementUpdated(el);

        expect(firstInput.min).to.equal('5');
        expect(firstInput.max).to.equal('20');

        expect(lastInput.min).to.equal('20');
        expect(lastInput.max).to.equal('95');
    });
    it('sends keyboard events to active handle', async () => {
        // let pointerId = -1;

        const el = await fixture<Slider>(html`
            <sp-slider step="1" min="0" max="100">
                <sp-slider-handle
                    id="first-handle"
                    max="next"
                    slot="handle"
                    name="a"
                    value="10"
                ></sp-slider-handle>
                <sp-slider-handle
                    id="middle-handle"
                    min="previous"
                    max="next"
                    slot="handle"
                    name="b"
                    value="20"
                ></sp-slider-handle>
                <sp-slider-handle
                    id="last-handle"
                    min="previous"
                    slot="handle"
                    name="c"
                    value="30"
                ></sp-slider-handle>
            </sp-slider>
        `);

        await elementUpdated(el);
        expect(el.values).to.deep.equal({ a: 10, b: 20, c: 30 });

        const lastHandle = el.querySelector('#last-handle') as SliderHandle;
        lastHandle.focus();

        await sendKeys({ press: 'ArrowDown' });
        await elementUpdated(el);
        expect(el.values).to.deep.equal({ a: 10, b: 20, c: 29 });
    });
    it('resets to default value on double click after moving pointer', async () => {
        const inputSpy = spy();
        const changeSpy = spy();

        const el = await fixture<Slider>(html`
            <sp-slider
                style="width: 100px"
                value="50"
                default-value="50"
                @input=${(event: Event & { target: Slider }) => {
                    inputSpy(event.target.value);
                }}
                @change=${(event: Event & { target: Slider }) => {
                    changeSpy(event.target.value);
                }}
            ></sp-slider>
        `);
        await elementUpdated(el);
        expect(el.value, 'initial').to.equal(50);

        const handle = el.shadowRoot.querySelector('.handle') as HTMLDivElement;
        const handleBoundingRect = handle.getBoundingClientRect();
        await sendMouse([
            {
                type: 'move',
                position: [handle],
            },
            {
                type: 'down',
            },
        ]);

        await elementUpdated(el);
        await sendMouse([
            {
                type: 'move',
                position: [
                    150,
                    handleBoundingRect.y + handleBoundingRect.height + 100,
                ],
            },
            {
                type: 'up',
            },
        ]);

        await elementUpdated(el);

        // since we've moved the pointer, the new value should be 100
        expect(el.value).to.equal(100);

        inputSpy.resetHistory();
        changeSpy.resetHistory();

        handle.dispatchEvent(
            new PointerEvent('dblclick', {
                clientX: 0,
                cancelable: true,
                button: 0,
                composed: true,
                bubbles: true,
            })
        );

        await elementUpdated(el);

        expect(
            el.value,
            'reset to default value on double click after moving pointer'
        ).to.equal(50);

        // input and change events should have been fired
        expect(inputSpy.callCount).to.equal(1);
        expect(changeSpy.callCount).to.equal(1);
    });
    it('manages escape key interactions correctly in an overlaid context', async () => {
        const inputSpy = spy();
        const changeSpy = spy();

        const el = await fixture<HTMLDivElement>(html`
            <div>
                <sp-button id="trigger">Overlay Trigger</sp-button>
                <sp-overlay trigger="trigger@click" placement="bottom">
                    <sp-popover>
                        <sp-slider
                            style="width: 100px"
                            value="70"
                            default-value="50"
                            @input=${(event: Event & { target: Slider }) => {
                                inputSpy(event.target.value);
                            }}
                            @change=${(event: Event & { target: Slider }) => {
                                changeSpy(event.target.value);
                            }}
                        ></sp-slider>
                    </sp-popover>
                </sp-overlay>
            </div>
        `);

        await elementUpdated(el);

        // open the overlay
        const trigger = el.querySelector('#trigger') as HTMLButtonElement;
        const opened = oneEvent(el, 'sp-opened');
        trigger.click();
        await opened;

        // current slider value should be 70
        const slider = el.querySelector('sp-slider') as Slider;
        expect(slider.value).to.equal(70);

        slider.focus();
        // send escape key
        await sendKeys({ press: 'Escape' });

        await elementUpdated(el);

        // now the slider value should be 50
        expect(slider.value).to.equal(50);

        // input and change events should have been fired
        expect(inputSpy.callCount).to.equal(1);
        expect(changeSpy.callCount).to.equal(1);

        // and the overlay should be in open state
        const overlay = el.querySelector('sp-overlay') as Overlay;
        expect(overlay.open).to.be.true;

        const closed = oneEvent(el, 'sp-closed');
        // send escape key again
        await sendKeys({ press: 'Escape' });
        await closed;

        // now the overlay should be closed
        expect(overlay.open).to.be.false;
    });

    describe('dev mode', () => {
        let consoleWarnStub!: ReturnType<typeof stub>;
        before(() => {
            window.__swc.verbose = true;
            consoleWarnStub = stub(console, 'warn');
        });
        afterEach(() => {
            consoleWarnStub.resetHistory();
            window.__swc.issuedWarnings = new Set<BrandedSWCWarningID>();
        });
        after(() => {
            window.__swc.verbose = false;
            consoleWarnStub.restore();
        });

        it('warns in Dev Mode when using the default slot for text labels', async () => {
            const el = await fixture<Slider>(html`
                <sp-slider min="0" max="100" value="50">
                    This is a deprecated text label
                </sp-slider>
            `);

            await elementUpdated(el);

            expect(consoleWarnStub.called).to.be.true;
            const spyCall = consoleWarnStub.getCall(0);
            expect(
                (spyCall.args.at(0) as string).includes('default slot'),
                'confirm "default slot" in message'
            ).to.be.true;
            expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
                data: {
                    localName: 'sp-slider',
                    level: 'deprecation',
                    type: 'api',
                },
            });
        });

        it('warns in Dev Mode when `min="previous"` is leveraged on first handle', async () => {
            window.__swc.issuedWarnings = new Set<BrandedSWCWarningID>();
            const el = await fixture<Slider>(html`
                <sp-slider min="0" max="100">
                    <sp-slider-handle
                        id="first-handle"
                        min="previous"
                        max="next"
                        slot="handle"
                        name="a"
                        value="10"
                    ></sp-slider-handle>
                    <sp-slider-handle
                        id="middle-handle"
                        min="previous"
                        max="next"
                        slot="handle"
                        name="b"
                        value="20"
                    ></sp-slider-handle>
                    <sp-slider-handle
                        id="last-handle"
                        min="previous"
                        slot="handle"
                        name="c"
                        value="30"
                    ></sp-slider-handle>
                </sp-slider>
            `);

            await elementUpdated(el);

            expect(consoleWarnStub.called).to.be.true;
            const spyCall = consoleWarnStub.getCall(0);
            expect(
                (spyCall.args.at(0) as string).includes('previous'),
                'confirm "previous" in message'
            ).to.be.true;
            expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
                data: {
                    localName: 'sp-slider',
                    type: 'api',
                    level: 'default',
                },
            });
        });

        it('warns in Dev Mode when `max="next"` is leveraged on last handle', async () => {
            window.__swc.issuedWarnings = new Set<BrandedSWCWarningID>();
            const el = await fixture<Slider>(html`
                <sp-slider min="0" max="100">
                    <sp-slider-handle
                        id="first-handle"
                        max="next"
                        slot="handle"
                        name="a"
                        value="10"
                    ></sp-slider-handle>
                    <sp-slider-handle
                        id="middle-handle"
                        min="previous"
                        max="next"
                        slot="handle"
                        name="b"
                        value="20"
                    ></sp-slider-handle>
                    <sp-slider-handle
                        id="last-handle"
                        min="previous"
                        max="next"
                        slot="handle"
                        name="c"
                        value="30"
                    ></sp-slider-handle>
                </sp-slider>
            `);

            await elementUpdated(el);

            expect(consoleWarnStub.called).to.be.true;
            const spyCall = consoleWarnStub.getCall(0);
            expect(
                (spyCall.args.at(0) as string).includes('next'),
                'confirm "next" in message'
            ).to.be.true;
            expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
                data: {
                    localName: 'sp-slider',
                    type: 'api',
                    level: 'default',
                },
            });
        });
    });
});
