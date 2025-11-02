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

import { LitElement } from 'lit';
import { expect } from '@open-wc/testing';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';

describe('RovingTabindex', () => {
    it('constructs with defaults', async () => {
        class TestEl extends LitElement {}
        customElements.define('test-roving-tabindex-el', TestEl);
        const el = new TestEl();
        const controller = new RovingTabindexController(
            el as LitElement & { shadowRoot: ShadowRoot }
        );
        expect(controller.direction).to.equal('both');
        expect(controller.focusInIndex).to.equal(0);
        expect(controller.isFocusableElement(el)).to.be.true;
    });
});
