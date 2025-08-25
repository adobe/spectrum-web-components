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

import { ReactiveElement } from 'lit';
import { expect, nextFrame } from '@open-wc/testing';
import { DependencyManagerController } from '@spectrum-web-components/reactive-controllers/src/DependencyManger.js';
import { spy } from 'sinon';

describe('Dependency Manager', () => {
    it('manages dependencies', async function () {
        this.retries(0);
        const tagName = 'some-heavy-element';
        const requestUpdateSpy = spy();
        const manager = new DependencyManagerController({
            requestUpdate: () => requestUpdateSpy(),
        } as unknown as ReactiveElement);
        expect(manager.loaded).to.be.false;
        manager.add(tagName);
        expect(manager.loaded).to.be.false;
        expect(requestUpdateSpy.notCalled).to.be.true;
        customElements.define(tagName, class extends HTMLElement {});
        // Allow time for the registration to propagate.
        await nextFrame();
        expect(manager.loaded).to.be.true;
        expect(requestUpdateSpy.notCalled).to.be.false;
    });
});
