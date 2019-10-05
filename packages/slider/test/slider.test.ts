/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import '../';
import { Slider } from '../';
import {
    fixture,
    elementUpdated,
    html,
    expect,
    nextFrame,
} from '@open-wc/testing';

type TestableSliderType = {
    _supportsPointerEvent: boolean;
};

describe('Slider', () => {
    it('loads', async () => {
        const el = await fixture<Slider>(
            html`
                <sp-slider></sp-slider>
            `
        );

        await elementUpdated(el);

        expect(el).shadowDom.to.equalSnapshot();
    });
    it('loads - [variant="color"]', async () => {
        const el = await fixture<Slider>(
            html`
                <sp-slider variant="color"></sp-slider>
            `
        );

        await elementUpdated(el);

        expect(el).shadowDom.to.equalSnapshot();
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
        await elementUpdated(el);

        expect(el.dragging).to.be.true;
        expect(el.handleHighlight).to.be.true;
        expect(pointerId).to.equal(1);

        handle.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 2,
            })
        );
        await elementUpdated(el);

        expect(el.dragging).to.be.false;
        expect(el.handleHighlight).to.be.false;
        expect(pointerId).to.equal(2);

        handle.dispatchEvent(
            new PointerEvent('pointerdown', {
                pointerId: 1,
            })
        );
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
        const el = await fixture<Slider>(
            html`
                <sp-slider style="width: 500px; float: left;"></sp-slider>
            `
        );
        const _supportsPointerEvent = ((el as unknown) as TestableSliderType)
            ._supportsPointerEvent;
        ((el as unknown) as TestableSliderType)._supportsPointerEvent = false;

        await elementUpdated(el);

        expect(el.value).to.equal(10);

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

        document.dispatchEvent(
            new MouseEvent('mouseup', {
                clientX: 131,
            })
        );
        await elementUpdated(el);
        await nextFrame();
        await nextFrame();

        expect(el.value).to.equal(5);

        ((el as unknown) as TestableSliderType)._supportsPointerEvent = _supportsPointerEvent;
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
                clientX: 50,
                pointerId: 4,
            })
        );
        await elementUpdated(el);

        expect(pointerId).to.equal(4);
        expect(el.value).to.equal(1);
    });
    it('will fallback to `trackMouseDown` on `#controls`', async () => {
        const el = await fixture<Slider>(
            html`
                <sp-slider></sp-slider>
            `
        );
        const _supportsPointerEvent = ((el as unknown) as TestableSliderType)
            ._supportsPointerEvent;
        ((el as unknown) as TestableSliderType)._supportsPointerEvent = false;

        await elementUpdated(el);

        expect(el.value).to.equal(10);

        const controls = el.shadowRoot
            ? (el.shadowRoot.querySelector('#controls') as HTMLDivElement)
            : (el as Slider);

        controls.dispatchEvent(
            new MouseEvent('mousedown', {
                clientX: 50,
            })
        );
        await elementUpdated(el);

        expect(el.value).to.equal(1);
        ((el as unknown) as TestableSliderType)._supportsPointerEvent = _supportsPointerEvent;
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
        const el = await fixture<Slider>(
            html`
                <sp-slider step="0"></sp-slider>
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
});
