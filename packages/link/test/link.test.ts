/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import '../';
import { Link } from '../';
import { fixture, elementUpdated, html, expect } from '@open-wc/testing';

describe('Link', () => {
    it('loads', async () => {
        const el = await fixture<Link>(
            html`
                <sp-link href="test_url">
                    Default Link
                </sp-link>
            `
        );

        const dlel = await fixture<Link>(
            html`
                <sp-link href="test_url" download="somefile.txt">
                    Default Link
                </sp-link>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Default Link');
        // make sure href is being passed to <a>
        expect(el).shadowDom.to.equal(
            `<a href="test_url" id="anchor" tabindex="0"><slot></slot></a>`
        );
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
        // make sure href is being passed to <a>
        expect(el).shadowDom.to.equal(
            `<a href="test_url" download="somefile.txt" id="anchor" tabindex="0"><slot></slot></a>`
        );
    });
});
