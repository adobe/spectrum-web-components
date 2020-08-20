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

import '@spectrum-web-components/button/sp-button.js';
import { Button } from '@spectrum-web-components/button';
import { fixture, elementUpdated, expect, html } from '@open-wc/testing';
import { shiftTabEvent } from '../../../test/testing-helpers.js';

type TestableButtonType = {
    hasLabel: boolean;
};

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
        await expect(el).to.be.accessible();
    });
    it('loads default w/ element content', async () => {
        const el = await fixture<Button>(
            html`
                <sp-button label="Button"><svg></svg></sp-button>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        await expect(el).to.be.accessible();
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
        await expect(el).to.be.accessible();
    });
    it('loads default only icon', async () => {
        const el = await fixture<Button>(
            html`
                <sp-button label="Button">
                    <svg slot="icon"></svg>
                </sp-button>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        await expect(el).to.be.accessible();
    });
    it('allows label to be toggled', async () => {
        const testNode = document.createTextNode('Button');
        const el = await fixture<Button>(
            html`
                <sp-button>
                    ${testNode}
                    <svg slot="icon"></svg>
                </sp-button>
            `
        );

        await elementUpdated(el);

        const labelTestableEl = (el as unknown) as TestableButtonType;

        expect(labelTestableEl.hasLabel).to.be.true;

        testNode.textContent = '';

        await elementUpdated(el);

        expect(labelTestableEl.hasLabel).to.be.false;

        testNode.textContent = 'Button';

        await elementUpdated(el);

        expect(labelTestableEl.hasLabel).to.be.true;
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
        await expect(el).to.be.accessible();
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
        expect(el).shadowDom.to.equalSnapshot();
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
        expect(el).shadowDom.to.equalSnapshot();
    });
    it('targets `el.focusElement` on `focusin`', async () => {
        let focusedCount = 0;
        const el = await fixture<Button>(
            html`
                <sp-button href="test_url" target="_blank">
                    With Target
                </sp-button>
            `
        );

        await elementUpdated(el);

        const focusElement = el.focusElement as HTMLButtonElement;
        focusElement.addEventListener('focus', () => (focusedCount += 1));
        expect(focusedCount).to.equal(0);

        el.focus();
        await elementUpdated(el);

        expect(focusedCount).to.equal(1);

        focusElement.blur();
        el.dispatchEvent(new Event('focusin'));
        await elementUpdated(el);

        expect(focusedCount).to.equal(2);
    });
    it('accepts shit+tab interactions', async () => {
        let focusedCount = 0;
        const el = await fixture<Button>(
            html`
                <sp-button href="test_url" target="_blank">
                    With Target
                </sp-button>
            `
        );

        await elementUpdated(el);

        const focusElement = el.focusElement as HTMLButtonElement;
        focusElement.addEventListener('focus', () => (focusedCount += 1));
        expect(focusedCount).to.equal(0);

        el.focus();
        await elementUpdated(el);

        expect(focusedCount).to.equal(1);

        el.dispatchEvent(shiftTabEvent);
        el.dispatchEvent(new Event('focusin'));
        await elementUpdated(el);

        expect(focusedCount).to.equal(1);
    });
    it('manages `aria-disabled`', async () => {
        const el = await fixture<Button>(
            html`
                <sp-button href="test_url" target="_blank">
                    With Target
                </sp-button>
            `
        );

        await elementUpdated(el);

        expect(el.hasAttribute('aria-disabled')).to.be.false;
        expect((el.focusElement as HTMLButtonElement).disabled).to.be.false;

        el.disabled = true;
        await elementUpdated(el);

        expect(el.hasAttribute('aria-disabled')).to.be.true;
        expect((el.focusElement as HTMLButtonElement).disabled).to.be.true;

        el.disabled = false;
        await elementUpdated(el);

        expect(el.hasAttribute('aria-disabled')).to.be.false;
        expect((el.focusElement as HTMLButtonElement).disabled).to.be.false;
    });
    it('manages tabIndex while disabled', async () => {
        const el = await fixture<Button>(
            html`
                <sp-button href="test_url" target="_blank">
                    With Target
                </sp-button>
            `
        );

        await elementUpdated(el);

        expect(el.tabIndex).to.equal(0);

        el.disabled = true;
        await elementUpdated(el);

        expect(el.tabIndex).to.equal(-1);

        el.tabIndex = 2;
        await elementUpdated(el);

        expect(el.tabIndex).to.equal(-1);

        el.disabled = false;
        await elementUpdated(el);

        expect(el.tabIndex).to.equal(2);
    });
});
