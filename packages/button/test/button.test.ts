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
import { Button } from '../';
import { html } from 'lit-element';
import { fixture, elementUpdated, expect } from '@open-wc/testing';

describe('Button', () => {
    it('loads default', async () => {
        const el = await fixture<Button>(
            html`
                <sp-button>Button</sp-button>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Button');
        // make sure href is being passed to <a>
        expect(el).shadowDom.to.equal(
            `<button id="button" tabindex="0"><div id="label"><slot></slot></div></button>`
        );
    });
    it('loads default w/ an icon', async () => {
        const el = await fixture<Button>(
            html`
                <sp-button>
                    Button
                    <svg slot="icon"></svg>
                </sp-button>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Button');
        // make sure href is being passed to <a>
        expect(el).shadowDom.to.equal(
            `<button id="button" tabindex="0"><slot name="icon"></slot><div id="label"><slot></slot></div></button>`
        );
    });
    it('loads default w/ an icon on the right', async () => {
        const el = await fixture<Button>(
            html`
                <sp-button icon-right>
                    Button
                    <svg slot="icon"></svg>
                </sp-button>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Button');
        // make sure href is being passed to <a>
        expect(el).shadowDom.to.equal(
            `<button id="button" tabindex="0"><div id="label"><slot></slot></div><slot name="icon"></slot></button>`
        );
    });
    it('loads with href', async () => {
        const el = await fixture<Button>(
            html`
                <sp-button href="test_url">With Href</sp-button>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('With Href');
        // make sure href is being passed to <a>
        expect(el).shadowDom.to.equal(
            `<a href="test_url" id="button" tabindex="0"><div id="label"><slot></slot></div></a>`
        );
    });
    it('loads with href and target', async () => {
        const el = await fixture<Button>(
            html`
                <sp-button href="test_url" target="_blank">
                    With Target
                </sp-button>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('With Target');
        // make sure href is being passed to <a>
        expect(el).shadowDom.to.equal(
            `<a href="test_url" target="_blank" id="button" tabindex="0"><div id="label"><slot></slot></div></a>`
        );
    });
});
