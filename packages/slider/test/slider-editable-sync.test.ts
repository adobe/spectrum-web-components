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

import '../sync/sp-slider.js';
import { Slider } from '../';
import { editable, hideStepper } from '../stories/slider.stories.js';
import { elementUpdated, expect, fixture } from '@open-wc/testing';
import { TemplateResult } from '@spectrum-web-components/base';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';

async function sliderFromFixture(
    sliderFixture: () => TemplateResult
): Promise<Slider> {
    const el = await fixture<Slider>(sliderFixture());
    const slider = el.querySelector('sp-slider') as Slider;
    return slider;
}

describe('Slider - editable, sync', () => {
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

    it('focuses `<sp-number-field>` directly', async () => {
        const el = await sliderFromFixture(editable);

        await elementUpdated(el);

        el.focus();

        await elementUpdated(el);

        expect(el.shadowRoot.activeElement).to.equal(el.numberField);
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
    });

    it('focuses `<input>` after pointer interactions', async () => {
        let pointerId = -1;
        const el = await sliderFromFixture(editable);

        await elementUpdated(el);

        expect(el.dragging).to.be.false;
        expect(el.highlight).to.be.false;
        expect(pointerId).to.equal(-1);

        const handle = el.shadowRoot.querySelector('.handle') as HTMLDivElement;
        handle.setPointerCapture = (id: number) => (pointerId = id);
        handle.releasePointerCapture = (id: number) => (pointerId = id);
        handle.dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 1,
                pointerId: 1,
                cancelable: true,
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
            })
        );
        await elementUpdated(el);

        expect(el.dragging, 'it is dragging 1').to.be.true;
        expect(pointerId, '2').to.equal(1);

        handle.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 2,
                cancelable: true,
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
            })
        );
        await elementUpdated(el);

        expect(el.dragging, 'it is dragging 2').to.be.true;
        expect(pointerId, '4').to.equal(1);

        handle.dispatchEvent(
            new PointerEvent('pointercancel', {
                pointerId: 3,
                cancelable: true,
            })
        );
        await elementUpdated(el);

        expect(el.dragging).to.be.false;
        expect(pointerId, '5').to.equal(3);
        expect(el.shadowRoot.activeElement).to.equal(
            el.handleController.inputForHandle(el)
        );
    });
});
