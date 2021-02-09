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

import '../sp-link.js';
import { Link } from '../';
import { fixture, elementUpdated, html, expect } from '@open-wc/testing';

describe('Link', () => {
    it('loads', async () => {
        const el = await fixture<Link>(
            html`
                <sp-link href="test_url">Default Link</sp-link>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Default Link');

        await expect(el).to.be.accessible();
    });

    it('loads[download]', async () => {
        const el = await fixture<Link>(
            html`
                <sp-link href="test_url" download="somefile.txt">
                    Default Link
                </sp-link>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Default Link');

        await expect(el).to.be.accessible();
    });

    it('loads[rel]', async () => {
        const el = await fixture<Link>(
            html`
                <sp-link href="test_url" rel="external">Default Link</sp-link>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.focusElement.getAttribute('rel')).to.eq('external');

        await expect(el).to.be.accessible();
    });

    it('manages the `size` atrbute', async () => {
        const el = await fixture<Link>(
            html`
                <sp-link href="test_url">Default Link</sp-link>
            `
        );

        await elementUpdated(el);
        expect(el.size, 'property 0: m').to.equal('m');
        expect(el.getAttribute('size'), 'attribute 0: null').to.be.null;

        el.setAttribute('size', 'xl');
        await elementUpdated(el);
        expect(el.size, 'property 1: xl').to.equal('xl');
        expect(el.getAttribute('size'), 'attribute 1: xl').to.equal('xl');

        el.removeAttribute('size');
        await elementUpdated(el);
        expect(el.size, 'property 2: m').to.equal('m');
        expect(el.getAttribute('size'), 'attribute 2: null').to.be.null;

        el.setAttribute('size', 'm');
        await elementUpdated(el);
        expect(el.size, 'property 3: m').to.equal('m');
        expect(el.getAttribute('size'), 'attribute 3: m').to.equal('m');
    });
});
