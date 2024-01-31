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
import {
    getComponentFragments,
    registerComponentFragment,
    SpectrumElement,
} from '@spectrum-web-components/base';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { css } from 'lit';
import { version } from '@spectrum-web-components/base/src/version.js';

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
    it('has a static VERSION property', () => {
        expect(DirElement.VERSION).to.equal(version);
    });
    it('set and gets theme fragments with case-insensitivity', async () => {
        registerComponentFragment(
            'sP-AcTionButTon',
            css`
                :host {
                    background-color: orange;
                }
            `
        );

        const fragments = getComponentFragments('SP-ACTION-button');
        expect(fragments, 'Fragments for sp-action-button').to.exist;

        if (fragments) {
            expect(
                fragments.length,
                'Number of fragments for sp-action-button'
            ).to.equal(1);
        }
    });
    it('adopts registered Component Fragments for a given element', async () => {
        registerComponentFragment(
            'dir-element',
            css`
                :host {
                    background-color: orange;
                }
            `
        );
        const el = await fixture<DirElement>(
            html`
                <dir-element></dir-element>
            `
        );

        await elementUpdated(el);

        expect(el.shadowRoot.adoptedStyleSheets.length).to.equal(1);
    });
});
