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

import '../sp-slider.js';
import { Slider } from '../';
import { tick } from '../stories/slider.stories.js';
import {
    fixture,
    elementUpdated,
    html,
    expect,
    nextFrame,
} from '@open-wc/testing';

type TestableSliderType = {
    supportsPointerEvent: boolean;
};

describe('Slider', () => {
    it('loads', async () => {
        const el = await fixture<Slider>(
            html`
                <sp-slider label="Slider"></sp-slider>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads - [variant="tick"]', async () => {
        const el = await fixture<Slider>(
            html`
                <sp-slider
                    label="Ticked Slider"
                    min="-100"
                    max="100"
                    value="0"
                    tick-labels
                    variant="tick"
                ></sp-slider>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads - [variant="tick"] irregularly', async () => {
        const el = await fixture<Slider>(tick());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('receives value from the outside', async () => {
        const el = await fixture<Slider>(
            html`
                <sp-slider></sp-slider>
            `
        );

        await elementUpdated(el);

        expect(el.value).to.equal(10);

        el.value = 10;
        await elementUpdated(el);

        expect(el.value).to.equal(10);

        el.value = 50;
        await elementUpdated(el);

        expect(el.value).to.equal(20);
    });
    it('accepts pointer events', async () => {
        let pointerId = -1;
        const el = await fixture<Slider>(
            html`
                <sp-slider></sp-slider>
            `
        );

        await elementUpdated(el);

        expect(el.dragging).to.be.false;
        expect(el.handleHighlight).to.be.false;
        expect(pointerId).to.equal(-1);

        const handle = el.shadowRoot
            ? (el.shadowRoot.querySelector('#handle') as HTMLDivElement)
            : (el as Slider);
        handle.setPointerCapture = (id: number) => (pointerId = id);
        handle.releasePointerCapture = (id: number) => (pointerId = id);

        handle.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
            })
        );
        handle.dispatchEvent(new MouseEvent('mousedown'));
        await elementUpdated(el);

        expect(el.dragging).to.be.true;
        expect(el.handleHighlight).to.be.true;
        expect(pointerId).to.equal(1);

        handle.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 2,
            })
        );
        handle.dispatchEvent(
            new MouseEvent('mouseup', {
                bubbles: true,
                composed: true,
            })
        );
        document.dispatchEvent(new MouseEvent('mouseup'));
        await elementUpdated(el);

        expect(el.dragging).to.be.false;
        expect(el.handleHighlight).to.be.false;
        expect(pointerId).to.equal(2);

        handle.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
            })
        );
        handle.dispatchEvent(new MouseEvent('mousedown'));
        await elementUpdated(el);

        expect(el.dragging).to.be.true;
        expect(pointerId).to.equal(1);

        handle.dispatchEvent(
            new PointerEvent('pointercancel', {
                pointerId: 3,
            })
        );
        await elementUpdated(el);

        expect(el.dragging).to.be.false;
        expect(pointerId).to.equal(3);
    });
    it('will fallback to mouse events', async () => {
        let inputsHandled = 0;
        const handleInput = (): void => {
            inputsHandled += 1;
        };
        const el = await fixture<Slider>(
            html`
                <sp-slider
                    style="width: 500px; float: left;"
                    @input=${handleInput}
                ></sp-slider>
            `
        );
        const supportsPointerEvent = ((el as unknown) as TestableSliderType)
            .supportsPointerEvent;
        ((el as unknown) as TestableSliderType).supportsPointerEvent = false;

        await elementUpdated(el);

        expect(el.value).to.equal(10);
        expect(inputsHandled).to.equal(0);

        const handle = el.shadowRoot
            ? (el.shadowRoot.querySelector('#handle') as HTMLDivElement)
            : (el as Slider);

        handle.dispatchEvent(
            new MouseEvent('mousedown', {
                clientX: 131,
            })
        );
        await elementUpdated(el);
        await nextFrame();
        await nextFrame();

        expect(el.value).to.equal(5);
        expect(inputsHandled).to.equal(1);

        await elementUpdated(el);

        document.dispatchEvent(
            new MouseEvent('mousemove', {
                clientX: 200,
            })
        );
        await elementUpdated(el);
        await nextFrame();
        await nextFrame();

        expect(el.value).to.equal(8);
        expect(inputsHandled).to.equal(2);

        document.dispatchEvent(
            new MouseEvent('mouseup', {
                clientX: 131,
            })
        );
        await elementUpdated(el);
        await nextFrame();
        await nextFrame();

        expect(el.value).to.equal(5);
        expect(inputsHandled).to.equal(3);

        ((el as unknown) as TestableSliderType).supportsPointerEvent = supportsPointerEvent;
    });
    it('will `trackPointerDown` on `#controls`', async () => {
        let pointerId = -1;
        const el = await fixture<Slider>(
            html`
                <sp-slider></sp-slider>
            `
        );

        await elementUpdated(el);

        expect(el.value).to.equal(10);

        const controls = el.shadowRoot
            ? (el.shadowRoot.querySelector('#controls') as HTMLDivElement)
            : (el as Slider);
        const handle = el.shadowRoot
            ? (el.shadowRoot.querySelector('#handle') as HTMLDivElement)
            : (el as Slider);
        handle.setPointerCapture = (id: number) => (pointerId = id);

        controls.dispatchEvent(
            new PointerEvent('pointerdown', {
                // account for 8px <body> margin by default
                clientX: 9,
                pointerId: 4,
                bubbles: true,
            })
        );
        controls.dispatchEvent(
            new MouseEvent('mousedown', {
                // account for 8px <body> margin by default
                clientX: 9,
                bubbles: true,
            })
        );
        await elementUpdated(el);

        expect(pointerId).to.equal(4);
        expect(el.value).to.equal(0);
    });
    it('will fallback to `trackMouseDown` on `#controls`', async () => {
        const el = await fixture<Slider>(
            html`
                <sp-slider></sp-slider>
            `
        );
        const supportsPointerEvent = ((el as unknown) as TestableSliderType)
            .supportsPointerEvent;
        ((el as unknown) as TestableSliderType).supportsPointerEvent = false;

        await elementUpdated(el);

        expect(el.value).to.equal(10);

        const controls = el.shadowRoot
            ? (el.shadowRoot.querySelector('#controls') as HTMLDivElement)
            : (el as Slider);

        controls.dispatchEvent(
            new MouseEvent('mousedown', {
                // account for 8px <body> margin by default
                clientX: 9,
                bubbles: true,
            })
        );
        await elementUpdated(el);

        expect(el.value).to.equal(0);
        ((el as unknown) as TestableSliderType).supportsPointerEvent = supportsPointerEvent;
    });
    it('can be disabled', async () => {
        let pointerId = -1;
        const el = await fixture<Slider>(
            html`
                <sp-slider disabled></sp-slider>
            `
        );

        await elementUpdated(el);

        expect(el.dragging).to.be.false;
        expect(pointerId).to.equal(-1);
        expect(el.value).to.equal(10);

        const handle = el.shadowRoot
            ? (el.shadowRoot.querySelector('#handle') as HTMLDivElement)
            : (el as Slider);
        handle.setPointerCapture = (id: number) => (pointerId = id);

        handle.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
            })
        );
        await elementUpdated(el);

        expect(el.dragging).to.be.false;
        expect(pointerId).to.equal(-1);

        const controls = el.shadowRoot
            ? (el.shadowRoot.querySelector('#controls') as HTMLDivElement)
            : (el as Slider);

        controls.dispatchEvent(
            new PointerEvent('pointerdown', {
                clientX: 50,
                pointerId: 1,
            })
        );
        await elementUpdated(el);

        expect(pointerId).to.equal(-1);
        expect(el.value).to.equal(10);
    });
    it('can be disabled w/ mouse event', async () => {
        let pointerId = -1;
        const el = await fixture<Slider>(
            html`
                <sp-slider disabled></sp-slider>
            `
        );
        const supportsPointerEvent = ((el as unknown) as TestableSliderType)
            .supportsPointerEvent;
        ((el as unknown) as TestableSliderType).supportsPointerEvent = false;

        await elementUpdated(el);

        expect(el.dragging).to.be.false;
        expect(pointerId).to.equal(-1);
        expect(el.value).to.equal(10);

        const handle = el.shadowRoot
            ? (el.shadowRoot.querySelector('#handle') as HTMLDivElement)
            : (el as Slider);
        handle.setPointerCapture = (id: number) => (pointerId = id);

        handle.dispatchEvent(new MouseEvent('mousedown'));
        await elementUpdated(el);

        expect(el.dragging).to.be.false;
        expect(pointerId).to.equal(-1);

        const controls = el.shadowRoot
            ? (el.shadowRoot.querySelector('#controls') as HTMLDivElement)
            : (el as Slider);

        controls.dispatchEvent(
            new MouseEvent('mousedown', {
                clientX: 50,
            })
        );
        await elementUpdated(el);

        expect(pointerId).to.equal(-1);
        expect(el.value).to.equal(10);
        ((el as unknown) as TestableSliderType).supportsPointerEvent = supportsPointerEvent;
    });
    it('accepts pointermove events', async () => {
        let pointerId = -1;
        const el = await fixture<Slider>(
            html`
                <sp-slider></sp-slider>
            `
        );

        await elementUpdated(el);

        expect(el.value).to.equal(10);

        const handle = el.shadowRoot
            ? (el.shadowRoot.querySelector('#handle') as HTMLDivElement)
            : (el as Slider);
        handle.setPointerCapture = (id: number) => (pointerId = id);
        handle.releasePointerCapture = (id: number) => (pointerId = id);

        handle.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
            })
        );
        await elementUpdated(el);

        expect(el.dragging).to.be.true;
        expect(el.handleHighlight).to.be.true;
        expect(pointerId).to.equal(1);

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: 0,
            })
        );
        await elementUpdated(el);

        expect(el.value).to.equal(0);
    });
    it('accepts pointermove events - [step=0]', async () => {
        let pointerId = -1;
        let inputsHandled = 0;
        const handleInput = (): void => {
            inputsHandled += 1;
        };
        const el = await fixture<Slider>(
            html`
                <sp-slider
                    step="0"
                    @input=${handleInput}
                    style="width: 500px; float: left;"
                ></sp-slider>
            `
        );

        await elementUpdated(el);

        expect(el.value).to.equal(10);
        expect(inputsHandled).to.equal(0);

        const handle = el.shadowRoot
            ? (el.shadowRoot.querySelector('#handle') as HTMLDivElement)
            : (el as Slider);
        handle.setPointerCapture = (id: number) => (pointerId = id);
        handle.releasePointerCapture = (id: number) => (pointerId = id);

        handle.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
            })
        );
        await elementUpdated(el);

        expect(el.dragging).to.be.true;
        expect(el.handleHighlight).to.be.true;
        expect(pointerId).to.equal(1);

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: 200,
            })
        );
        await elementUpdated(el);

        expect(el.value).to.equal(8);
        expect(inputsHandled).to.equal(1);

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: 125,
            })
        );
        await elementUpdated(el);

        expect(el.value).to.equal(5);
        expect(inputsHandled).to.equal(2);
    });
    it('will not pointermove unless `pointerdown`', async () => {
        const el = await fixture<Slider>(
            html`
                <sp-slider></sp-slider>
            `
        );

        await elementUpdated(el);

        expect(el.value).to.equal(10);
        expect(el.dragging).to.be.false;

        const handle = el.shadowRoot
            ? (el.shadowRoot.querySelector('#handle') as HTMLDivElement)
            : (el as Slider);

        handle.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: 0,
            })
        );
        await elementUpdated(el);

        expect(el.value).to.equal(10);
    });
    it('responds to input events on the <input/> element', async () => {
        const el = await fixture<Slider>(
            html`
                <sp-slider></sp-slider>
            `
        );

        await elementUpdated(el);

        expect(el.value).to.equal(10);

        const input = el.shadowRoot
            ? (el.shadowRoot.querySelector('#input') as HTMLInputElement)
            : (el as Slider);

        input.value = 0;
        input.dispatchEvent(new Event('change'));

        expect(el.value).to.equal(0);
    });
    it('accepts variants', async () => {
        const el = await fixture<Slider>(
            html`
                <sp-slider variant="tick"></sp-slider>
            `
        );

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
        const el = await fixture<Slider>(
            html`
                <sp-slider variant="other"></sp-slider>
            `
        );

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
    it('has a `focusElement`', async () => {
        const el = await fixture<Slider>(
            html`
                <sp-slider></sp-slider>
            `
        );

        await elementUpdated(el);

        const input = el.focusElement as HTMLInputElement;
        expect(input).to.not.be.undefined;
        expect(input.type).to.equal('range');
    });
    it('displays result of getAriaValueText', async () => {
        const el = await fixture<Slider>(
            html`
                <sp-slider
                    value="50"
                    min="0"
                    max="100"
                    .getAriaValueText=${(value: number) => `${value}%`}
                ></sp-slider>
            `
        );

        await elementUpdated(el);

        const input = el.focusElement as HTMLInputElement;
        expect(input.getAttribute('aria-valuetext')).to.equal('50%');

        el.value = 100;
        await elementUpdated(el);

        expect(input.getAttribute('aria-valuetext')).to.equal('100%');
    });
    it('uses fallback ariaValueText', async () => {
        const el = await fixture<Slider>(
            html`
                <sp-slider value="50" min="0" max="100"></sp-slider>
            `
        );

        await elementUpdated(el);
        ((el as unknown) as {
            getAriaValueText: boolean;
        }).getAriaValueText = false;

        const input = el.focusElement as HTMLInputElement;
        await elementUpdated(el);

        expect(input.getAttribute('aria-valuetext')).to.equal('50');
    });
});
