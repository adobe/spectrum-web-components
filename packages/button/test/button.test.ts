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
import {
    fixture,
    elementUpdated,
    expect,
    html,
    waitUntil,
} from '@open-wc/testing';
import { shiftTabEvent } from '../../../test/testing-helpers.js';
import { spy } from 'sinon';

type TestableButtonType = {
    hasLabel: boolean;
};

describe('Button', () => {
    it('loads default', async () => {
        const el = await fixture<Button>(
            html`
                <sp-button tabindex="0">Button</sp-button>
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
                <sp-button label="">
                    Button
                    <svg slot="icon"></svg>
                </sp-button>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Button');
        expect(!((el as unknown) as { hasIcon: boolean }).hasIcon);
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
    it('manages "role"', async () => {
        const el = await fixture<Button>(
            html`
                <sp-button>Button</sp-button>
            `
        );

        await elementUpdated(el);
        expect(el.getAttribute('role')).to.equal('button');

        el.href = '#';

        await elementUpdated(el);
        expect(el.hasAttribute('role')).to.be.false;
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

        expect(labelTestableEl.hasLabel, 'starts with label').to.be.true;

        testNode.textContent = '';

        await elementUpdated(el);

        await waitUntil(() => !labelTestableEl.hasLabel, 'label is removed');

        testNode.textContent = 'Button';

        await elementUpdated(el);

        expect(labelTestableEl.hasLabel, 'label is returned').to.be.true;
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
    it('manages `disabled`', async () => {
        const clickSpy = spy();
        const el = await fixture<Button>(
            html`
                <sp-button @click=${() => clickSpy()}>
                    Button
                </sp-button>
            `
        );

        await elementUpdated(el);
        el.click();
        await elementUpdated(el);
        expect(clickSpy.calledOnce);

        clickSpy.resetHistory();
        el.disabled = true;
        await elementUpdated(el);
        el.click();
        await elementUpdated(el);
        expect(clickSpy.callCount).to.equal(0);

        clickSpy.resetHistory();
        await elementUpdated(el);
        el.dispatchEvent(new Event('click', {}));
        await elementUpdated(el);
        expect(clickSpy.callCount).to.equal(0);

        clickSpy.resetHistory();
        el.disabled = false;
        el.click();
        await elementUpdated(el);
        expect(clickSpy.calledOnce);
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

        expect(el.hasAttribute('aria-disabled'), 'initially not').to.be.false;

        el.disabled = true;
        await elementUpdated(el);

        expect(el.getAttribute('aria-disabled')).to.equal('true');

        el.disabled = false;
        await elementUpdated(el);

        expect(el.hasAttribute('aria-disabled'), 'finally not').to.be.false;
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
    it('swallows `click` interaction when `[disabled]`', async () => {
        const clickSpy = spy();
        const el = await fixture<Button>(
            html`
                <sp-button disabled @click=${() => clickSpy()}>
                    Button
                </sp-button>
            `
        );

        await elementUpdated(el);
        expect(clickSpy.callCount).to.equal(0);

        el.click();

        await elementUpdated(el);
        expect(clickSpy.callCount).to.equal(0);
    });
    it('translates keyboard interactions to click', async () => {
        const clickSpy = spy();
        const el = await fixture<Button>(
            html`
                <sp-button @click=${() => clickSpy()}>Button</sp-button>
            `
        );

        await elementUpdated(el);

        el.dispatchEvent(
            new KeyboardEvent('keypress', {
                bubbles: true,
                composed: true,
                cancelable: true,
                code: 'Enter',
                key: 'Enter',
            })
        );

        await elementUpdated(el);
        expect(clickSpy.callCount).to.equal(1);
        clickSpy.resetHistory();

        el.dispatchEvent(
            new KeyboardEvent('keypress', {
                bubbles: true,
                composed: true,
                cancelable: true,
                code: 'Space',
                key: 'Space',
            })
        );

        await elementUpdated(el);
        expect(clickSpy.callCount).to.equal(0);
        clickSpy.resetHistory();

        el.dispatchEvent(
            new KeyboardEvent('keydown', {
                bubbles: true,
                composed: true,
                cancelable: true,
                code: 'Space',
                key: 'Space',
            })
        );
        el.dispatchEvent(
            new KeyboardEvent('keyup', {
                bubbles: true,
                composed: true,
                cancelable: true,
                code: 'Space',
                key: 'Space',
            })
        );

        await elementUpdated(el);
        expect(clickSpy.callCount).to.equal(1);
        clickSpy.resetHistory();

        el.dispatchEvent(
            new KeyboardEvent('keydown', {
                bubbles: true,
                composed: true,
                cancelable: true,
                code: 'Space',
                key: 'Space',
            })
        );
        el.dispatchEvent(
            new KeyboardEvent('keyup', {
                bubbles: true,
                composed: true,
                cancelable: true,
                code: 'KeyG',
                key: 'g',
            })
        );

        await elementUpdated(el);
        expect(clickSpy.callCount).to.equal(0);

        el.dispatchEvent(
            new KeyboardEvent('keyup', {
                bubbles: true,
                composed: true,
                cancelable: true,
                code: 'Space',
                key: 'Space',
            })
        );
        clickSpy.resetHistory();

        el.dispatchEvent(
            new KeyboardEvent('keydown', {
                bubbles: true,
                composed: true,
                cancelable: true,
                code: 'KeyG',
                key: 'g',
            })
        );
        el.dispatchEvent(
            new KeyboardEvent('keyup', {
                bubbles: true,
                composed: true,
                cancelable: true,
                code: 'Space',
                key: 'Space',
            })
        );

        await elementUpdated(el);
        expect(clickSpy.callCount).to.equal(0);
    });
    it('proxies clicks by "type"', async () => {
        const submitSpy = spy();
        const resetSpy = spy();
        const test = await fixture<HTMLFormElement>(
            html`
                <form
                    @submit=${(event: Event): void => {
                        event.preventDefault();
                        submitSpy();
                    }}
                    @reset=${(event: Event): void => {
                        event.preventDefault();
                        resetSpy();
                    }}
                >
                    <sp-button>Button</sp-button>
                </form>
            `
        );
        const el = test.querySelector('sp-button') as Button;

        await elementUpdated(el);
        el.type = 'submit';

        await elementUpdated(el);
        el.click();

        expect(submitSpy.callCount).to.equal(1);
        expect(resetSpy.callCount).to.equal(0);

        el.type = 'reset';

        await elementUpdated(el);
        el.click();

        expect(submitSpy.callCount).to.equal(1);
        expect(resetSpy.callCount).to.equal(1);

        el.type = 'button';

        await elementUpdated(el);
        el.click();

        expect(submitSpy.callCount).to.equal(1);
        expect(resetSpy.callCount).to.equal(1);
    });
    it('proxies click by [href]', async () => {
        const clickSpy = spy();
        const el = await fixture<Button>(
            html`
                <sp-button href="test_url">With Href</sp-button>
            `
        );

        await elementUpdated(el);
        ((el as unknown) as {
            anchorElement: HTMLAnchorElement;
        }).anchorElement.addEventListener('click', (event: Event): void => {
            event.preventDefault();
            event.stopPropagation();
            clickSpy();
        });
        expect(clickSpy.callCount).to.equal(0);

        el.click();
        await elementUpdated(el);
        expect(clickSpy.callCount).to.equal(1);
    });
    it('manages "active" while focused', async () => {
        const el = await fixture<Button>(
            html`
                <sp-button label="Button">
                    <svg slot="icon"></svg>
                </sp-button>
            `
        );

        await elementUpdated(el);
        el.active = true;
        await elementUpdated(el);

        el.dispatchEvent(new FocusEvent('focusout'));
        await elementUpdated(el);

        expect(el.active).to.be.false;
    });
});
