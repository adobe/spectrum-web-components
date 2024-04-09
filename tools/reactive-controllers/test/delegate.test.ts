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

import { html, LitElement } from 'lit';
import { expect, fixture, nextFrame } from '@open-wc/testing';
import { DownState } from '@spectrum-web-components/reactive-controllers/src/downstate.js';

class TestEl extends LitElement {}
customElements.define('test-downstate-el', TestEl);

describe('DownState', () => {
    it('adds downstate to SpectrumElement', async () => {
        const el = await fixture(
            html`
                <test-downstate-el></test-downstate-el>
            `
        );
        const controller = new DownState(
            el as LitElement & { shadowRoot: ShadowRoot }
        );
        await nextFrame();
        await nextFrame();

        expect(
            (controller.getElement() as HTMLElement).style.getPropertyValue(
                'transform'
            )
        ).to.equal('');

        controller.getElement().dispatchEvent(new PointerEvent('pointerdown'));

        await nextFrame();
        await nextFrame();

        const transformStyle = (
            controller.getElement() as HTMLElement
        ).style.getPropertyValue('transform');
        expect(transformStyle).to.include('translate3d(0px, 0px, -2px)');

        controller.getElement().dispatchEvent(new PointerEvent('pointerup'));

        await nextFrame();
        await nextFrame();
        expect(
            (controller.getElement() as HTMLElement).style.getPropertyValue(
                'transform'
            )
        ).to.equal('');
    });
});
