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
import { Search } from '../';
import { litFixture, html, elementUpdated, expect } from '@open-wc/testing';

describe('Search', () => {
    it('loads', async () => {
        const el = await litFixture<Search>(
            html`
                <sp-search></sp-search>
            `
        );

        await elementUpdated(el);

        expect(el).shadowDom.to.equalSnapshot();
    });
    it('cannot be multiline', async () => {
        const el = await litFixture<Search>(
            html`
                <sp-search multiline></sp-search>
            `
        );

        await elementUpdated(el);

        expect(el.multiline).to.be.false;

        el.multiline = true;

        await elementUpdated(el);

        expect(el.multiline).to.be.false;
    });
    it('accepts `placeholder` and `label` properties', async () => {
        const testString = 'Search for images';
        const el = await litFixture<Search>(
            html`
                <sp-search></sp-search>
            `
        );

        await elementUpdated(el);
        el.placeholder = testString;
        el.label = testString;

        await elementUpdated(el);

        expect(el.focusElement.placeholder).to.equal(testString);
        expect(el.focusElement.getAttribute('aria-label')).to.equal(testString);
    });
    it('submits', async () => {
        const el = await litFixture<Search>(
            html`
                <sp-search action="#"></sp-search>
            `
        );

        await elementUpdated(el);
        const searchForm = (el.shadowRoot
            ? el.shadowRoot.querySelector('form')
            : el.querySelector('form')) as HTMLFormElement;

        const submitEvent = new Event('submit', {
            cancelable: true,
            bubbles: false,
            composed: false,
        });
        searchForm.dispatchEvent(submitEvent);

        expect(submitEvent.defaultPrevented).to.be.false;
    });
    it('can have default prevented', async () => {
        const el = await litFixture<Search>(
            html`
                <sp-search
                    @submit=${(event: Event) => {
                        event.preventDefault();
                    }}
                ></sp-search>
            `
        );

        await elementUpdated(el);
        const searchForm = (el.shadowRoot
            ? el.shadowRoot.querySelector('form')
            : el.querySelector('form')) as HTMLFormElement;

        const submitEvent = new Event('submit', {
            cancelable: true,
            bubbles: false,
            composed: false,
        });
        searchForm.dispatchEvent(submitEvent);

        expect(submitEvent.defaultPrevented).to.be.true;
    });
});
