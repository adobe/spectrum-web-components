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

import { fixture, elementUpdated, expect, html } from '@open-wc/testing';

import '../sp-tag.js';
import '../sp-tags.js';
import { Tags, Tag } from '..';
import {
    arrowUpEvent,
    arrowDownEvent,
    arrowLeftEvent,
    arrowRightEvent,
    endEvent,
    homeEvent,
    pageUpEvent,
    pageDownEvent,
    enterEvent,
} from '../../../test/testing-helpers.js';

describe('Tags', () => {
    it('loads default tags accessibly', async () => {
        const el = await fixture<Tags>(
            html`
                <sp-tags>
                    <sp-tag>Tag 1</sp-tag>
                    <sp-tag invalid>Tag 2</sp-tag>
                    <sp-tag disabled>Tag 3</sp-tag>
                </sp-tags>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
        expect(el.hasAttribute('role')).to.be.true;
        expect(el.hasAttribute('aria-label')).to.be.true;
    });
    it('does not accept focus when empty', async () => {
        const el = await fixture<Tags>(
            html`
                <sp-tags></sp-tags>
            `
        );

        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;
    });
    it('loads default tags with `role` and `aria-label` from the outside', async () => {
        const el = await fixture<Tags>(
            html`
                <sp-tags>
                    <sp-tag>Tag 1</sp-tag>
                    <sp-tag invalid>Tag 2</sp-tag>
                    <sp-tag disabled>Tag 3</sp-tag>
                </sp-tags>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
        expect(el.hasAttribute('role')).to.be.true;
        expect(el.hasAttribute('aria-label')).to.be.true;
    });
    it('accepts keyboard events while focused', async () => {
        const el = await fixture<Tags>(
            html`
                <sp-tags>
                    <sp-tag>Tag 1</sp-tag>
                    <sp-tag>Tag 2</sp-tag>
                    <sp-tag>Tag 3</sp-tag>
                    <sp-tag>Tag 4</sp-tag>
                    <sp-tag>Tag 5</sp-tag>
                </sp-tags>
            `
        );

        await elementUpdated(el);

        const tag1 = el.querySelector('sp-tag:nth-child(1)') as Tag;
        const tag2 = el.querySelector('sp-tag:nth-child(2)') as Tag;
        const tag3 = el.querySelector('sp-tag:nth-child(3)') as Tag;
        const tag4 = el.querySelector('sp-tag:nth-child(4)') as Tag;
        const tag5 = el.querySelector('sp-tag:nth-child(5)') as Tag;

        tag1.focus();
        await elementUpdated(el);

        el.dispatchEvent(pageUpEvent);
        el.dispatchEvent(arrowRightEvent);
        await elementUpdated(el);

        expect(document.activeElement === tag2).to.be.true;

        el.dispatchEvent(arrowDownEvent);
        await elementUpdated(el);

        expect(document.activeElement === tag3).to.be.true;

        el.dispatchEvent(endEvent);
        await elementUpdated(el);

        expect(document.activeElement === tag5).to.be.true;

        el.dispatchEvent(arrowLeftEvent);
        await elementUpdated(el);

        expect(document.activeElement === tag4).to.be.true;

        el.dispatchEvent(arrowUpEvent);
        await elementUpdated(el);

        expect(document.activeElement === tag3).to.be.true;

        el.dispatchEvent(homeEvent);
        await elementUpdated(el);

        expect(document.activeElement === tag1).to.be.true;

        tag1.blur();
    });
    it('will no focus [disabled] children', async () => {
        const el = await fixture<Tags>(
            html`
                <sp-tags>
                    <sp-tag disabled>Tag 1</sp-tag>
                    <sp-tag>Tag 2</sp-tag>
                    <sp-tag>Tag 3</sp-tag>
                    <sp-tag>Tag 4</sp-tag>
                    <sp-tag disabled>Tag 5</sp-tag>
                </sp-tags>
            `
        );

        await elementUpdated(el);

        const tag2 = el.querySelector('sp-tag:nth-child(2)') as Tag;
        const tag4 = el.querySelector('sp-tag:nth-child(4)') as Tag;

        tag2.focus();
        await elementUpdated(el);

        el.dispatchEvent(enterEvent);
        el.dispatchEvent(endEvent);
        await elementUpdated(el);

        expect(document.activeElement === tag4).to.be.true;

        el.dispatchEvent(homeEvent);
        await elementUpdated(el);

        expect(document.activeElement === tag2).to.be.true;

        el.dispatchEvent(arrowUpEvent);
        await elementUpdated(el);

        expect(document.activeElement === tag4).to.be.true;

        el.dispatchEvent(arrowDownEvent);
        await elementUpdated(el);

        expect(document.activeElement === tag2).to.be.true;
    });
    it('loads accepts "PageUp" and "PageDown" keys', async () => {
        const el = await fixture<HTMLDivElement>(
            html`
                <div>
                    <sp-tags>
                        <sp-tag>Tag 1</sp-tag>
                    </sp-tags>
                    <sp-tags>
                        <sp-tag>Tag 2</sp-tag>
                    </sp-tags>
                    <sp-tags></sp-tags>
                    <sp-tags>
                        <sp-tag disabled>Tag 3</sp-tag>
                        <sp-tag>Tag 4</sp-tag>
                    </sp-tags>
                </div>
            `
        );

        const tags1 = el.querySelector('sp-tags:nth-child(1)') as Tags;
        const tags2 = el.querySelector('sp-tags:nth-child(2)') as Tags;
        const tags4 = el.querySelector('sp-tags:nth-child(4)') as Tags;

        const tag1 = tags1.querySelector('sp-tag') as Tag;
        const tag2 = tags2.querySelector('sp-tag') as Tag;
        const tag4 = tags4.querySelector('sp-tag:not([disabled])') as Tag;

        tag1.focus();
        tag1.dispatchEvent(pageUpEvent);

        expect(document.activeElement === tag4).to.be.true;

        tag4.dispatchEvent(pageDownEvent);

        expect(document.activeElement === tag1).to.be.true;

        tag1.dispatchEvent(pageDownEvent);

        expect(document.activeElement === tag2).to.be.true;

        tag2.dispatchEvent(pageDownEvent);

        expect(document.activeElement === tag4, 'Focuses `tag4`').to.be.true;
    });
});
