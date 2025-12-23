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
import { SpectrumElement } from '@spectrum-web-components/base';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { version } from '@spectrum-web-components/base/src/version.js';

class DirElement extends SpectrumElement {}

customElements.define('dir-element', DirElement);

describe('Base', () => {
    after(() => {
        document.dir = '';
    });
    it('component understands `dir` from `document`', async () => {
        document.dir = 'rtl';
        const el = await fixture<DirElement>(html`
            <dir-element></dir-element>
        `);

        await elementUpdated(el);

        const dir = getComputedStyle(el).direction;
        expect(dir).to.equal('rtl');
    });
    it('has a static VERSION property', () => {
        expect(DirElement.VERSION).to.equal(version);
    });
});
