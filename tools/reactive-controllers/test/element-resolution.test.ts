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

import { html, LitElement } from 'lit';
import { elementUpdated, expect, fixture } from '@open-wc/testing';
import { ElementResolutionController } from '@spectrum-web-components/reactive-controllers/src/ElementResolution.js';

describe('Element Resolution', () => {
    it('responds to DOM changes', async () => {
        class TestEl extends LitElement {}
        if (!customElements.get('test-element-resolution-el')) {
            customElements.define('test-element-resolution-el', TestEl);
        }
        const test = await fixture(html`
            <div>
                <test-element-resolution-el></test-element-resolution-el>
                <div class="target" id="one"></div>
                <div class="target" id="two"></div>
            </div>
        `);
        const el = test.querySelector('test-element-resolution-el') as TestEl;
        const target1 = test.querySelector('#one') as HTMLDivElement;
        const target2 = test.querySelector('#two') as HTMLDivElement;
        const controller = new ElementResolutionController(el as LitElement);
        expect(controller.element).to.be.null;
        controller.selector = '.target';
        await elementUpdated(el);
        expect(controller.element === target1).to.be.true;
        test.insertAdjacentElement('afterbegin', target2);
        await elementUpdated(el);
        expect(controller.element === target2).to.be.true;
        target2.setAttribute('class', 'not-target');
        await elementUpdated(el);
        expect(controller.element === target1).to.be.true;
        target2.setAttribute('class', 'target');
        await elementUpdated(el);
        expect(controller.element === target2).to.be.true;
    });
});
