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
import { SpectrumElement } from '../';
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

class DirElement extends SpectrumElement {}

customElements.define('dir-element', DirElement);

describe('Base', () => {
    after(() => {
        document.dir = '';
    });
    it('sets `dir` from `document`', async () => {
        document.dir = 'rtl';
        const el = await fixture<DirElement>(
            html`
                <dir-element></dir-element>
            `
        );

        await elementUpdated(el);

        expect(el.dir).to.equal('rtl');
        expect(el.isLTR).to.be.false;
    });
});
