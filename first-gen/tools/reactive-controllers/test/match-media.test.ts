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
import { expect, fixture, nextFrame } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { MatchMediaController } from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';

class TestEl extends LitElement {}
customElements.define('test-match-media-el', TestEl);

describe('Match Media', () => {
    it('responds to media changes', async () => {
        const el = await fixture(html`
            <test-match-media-el></test-match-media-el>
        `);
        const controller = new MatchMediaController(
            el as LitElement & { shadowRoot: ShadowRoot },
            '(min-width: 500px)'
        );
        // Allow Controller to initialize
        await nextFrame();
        await nextFrame();
        expect(controller.matches).to.be.true;

        await setViewport({ width: 360, height: 640 });
        // Allow viewport update to propagate.
        await nextFrame();
        await nextFrame();
        expect(controller.matches).to.be.false;
    });
});
