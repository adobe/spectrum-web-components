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

import '../';
import { Card } from '../';
import { fixture, elementUpdated, html, expect } from '@open-wc/testing';

describe('card', () => {
    it('loads', async () => {
        const el = await fixture<Card>(
            html`
                <sp-card title="Card Title" subtitle="JPG">
                    <img
                        slot="preview"
                        src="https://picsum.photos/532/192"
                        alt="Slotted Preview"
                    />
                    <div slot="footer">Footer</div>
                </sp-card>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads - [quiet]', async () => {
        const el = await fixture<Card>(
            html`
                <sp-card variant="quiet" title="Card Title" subtitle="JPG">
                    <img
                        slot="preview"
                        src="https://picsum.photos/532/192"
                        alt="Slotted Preview"
                    />
                    <div slot="description">10/15/18</div>
                    <div slot="footer">Footer</div>
                </sp-card>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads - [gallery]', async () => {
        const el = await fixture<Card>(
            html`
                <sp-card variant="gallery" title="Card Title" subtitle="JPG">
                    <img
                        slot="preview"
                        src="https://picsum.photos/532/192"
                        alt="Slotted Preview"
                    />
                    <div slot="description">10/15/18</div>
                    <div slot="footer">Footer</div>
                </sp-card>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('displays the `title` attribute as `#title`', async () => {
        const testTitle = 'This is a test title';
        const el = await fixture<Card>(
            html`
                <sp-card title=${testTitle} subtitle="JPG">
                    <img
                        slot="preview"
                        src="https://picsum.photos/532/192"
                        alt="Slotted Preview"
                    />
                    <div slot="footer">Footer</div>
                </sp-card>
            `
        );

        await elementUpdated(el);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const titleEl = root.querySelector('#title');

        expect(titleEl, 'did not find title element').to.not.be.null;
        expect((titleEl as HTMLDivElement).textContent).to.contain(
            testTitle,
            'the title renders in the element'
        );
    });
    it('displays the slotted content as `#title`', async () => {
        const testTitle = 'This is a test title';
        const el = await fixture<Card>(
            html`
                <sp-card subtitle="JPG">
                    <h1 slot="title">${testTitle}</h1>
                    <img
                        slot="preview"
                        src="https://picsum.photos/532/192"
                        alt="Slotted Preview"
                    />
                    <div slot="footer">Footer</div>
                </sp-card>
            `
        );

        await elementUpdated(el);

        const root = el.shadowRoot ? el.shadowRoot : el;
        const titleSlot = root.querySelector(
            '[name="title"]'
        ) as HTMLSlotElement;

        expect(titleSlot, 'did not find slot element').to.not.be.null;
        const nodes = titleSlot.assignedNodes();
        const h1Element = nodes.find(
            (node) => (node as HTMLElement).tagName === 'H1'
        );
        expect(h1Element, 'did not find H1 element').to.not.be.null;
        expect((h1Element as HTMLHeadingElement).textContent).to.contain(
            testTitle,
            'the slotted content renders in the element'
        );
    });
});
