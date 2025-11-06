/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
    aTimeout,
    elementUpdated,
    expect,
    fixture,
    html,
    waitUntil,
} from '@open-wc/testing';
import {
    ActionButton,
    LONGPRESS_DURATION,
} from '@spectrum-web-components/action-button';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';
import {
    mouseClickOn,
    testForLitDevWarnings,
} from '../../../test/testing-helpers.js';
import { m as BlackActionButton } from '../stories/action-button-black.stories.js';

describe('ActionButton', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<ActionButton>(
                BlackActionButton(BlackActionButton.args)
            )
    );
    it('loads default', async () => {
        const el = await fixture<ActionButton>(html`
            <sp-action-button>Button</sp-action-button>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Button');
        await expect(el).to.be.accessible();
    });
    it('gardens "value" as a property', async () => {
        const el = await fixture<ActionButton>(html`
            <sp-action-button>Button</sp-action-button>
        `);

        await elementUpdated(el);
        expect(el.hasAttribute('value')).to.be.false;
        el.value = 'Value';
        await elementUpdated(el);
        expect(el.hasAttribute('value')).to.be.true;
        el.value = '';
        await elementUpdated(el);
        expect(el.hasAttribute('value')).to.be.false;
    });
    it('loads [hold-affordance]', async () => {
        const el = await fixture<ActionButton>(html`
            <sp-action-button hold-affordance>Button</sp-action-button>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Button');
        await expect(el).to.be.accessible();
    });
    it('manages a `tabindex`', async () => {
        const el = await fixture<ActionButton>(html`
            <sp-action-button>Button</sp-action-button>
        `);

        expect(el.tabIndex).to.equal(0);
        expect(el.disabled).to.be.false;

        el.setAttribute('tabindex', '-1');
        await elementUpdated(el);

        expect(el.tabIndex).to.equal(-1);
        expect(el.disabled).to.be.false;

        el.disabled = true;
        await elementUpdated(el);

        expect(el.tabIndex).to.equal(-1);
        expect(el.disabled).to.be.true;

        el.disabled = false;
        await elementUpdated(el);

        expect(el.tabIndex).to.equal(-1);
        expect(el.disabled).to.be.false;
    });
    it('manages a `size` attribute', async () => {
        const el = await fixture<ActionButton>(html`
            <sp-action-button size="xl">Button</sp-action-button>
        `);

        await elementUpdated(el);
        expect(el.size).to.equal('xl');
        expect(el.getAttribute('size')).to.equal('xl');
        el.removeAttribute('size');
        await elementUpdated(el);
        expect(el.size).to.equal('m');
        expect(el.hasAttribute('size')).to.be.false;
    });
    it('does not apply a default `size` attribute', async () => {
        const el = await fixture<ActionButton>(html`
            <sp-action-button>Button</sp-action-button>
        `);

        await elementUpdated(el);
        expect(el.size).to.equal('m');
        expect(el.hasAttribute('size')).to.be.false;
    });
    it('dispatches `longpress` events when [hold-affordance]', async () => {
        const longpressSpy = spy();
        const el = await fixture<ActionButton>(html`
            <sp-action-button
                hold-affordance
                @longpress=${() => longpressSpy()}
            >
                Button
            </sp-action-button>
        `);

        await elementUpdated(el);

        el.focus();
        await sendKeys({ press: 'Space' });

        expect(longpressSpy.callCount).to.equal(1);
        await sendKeys({ press: 'Alt+ArrowDown' });

        expect(longpressSpy.callCount).to.equal(2);
        el.dispatchEvent(new PointerEvent('pointerdown', { button: 0 }));
        el.dispatchEvent(new PointerEvent('pointerup'));
        el.dispatchEvent(new PointerEvent('pointerdown', { button: 0 }));
        await waitUntil(() => longpressSpy.callCount === 3);
    });
    it('does not dispatch `longpress` events when "right click"ed', async () => {
        const longpressSpy = spy();
        const el = await fixture<ActionButton>(html`
            <sp-action-button
                hold-affordance
                @longpress=${() => longpressSpy()}
            >
                Button
            </sp-action-button>
        `);

        await elementUpdated(el);
        expect(longpressSpy.callCount).to.equal(0);

        el.focus();
        el.dispatchEvent(new PointerEvent('pointerdown', { button: 1 }));
        await aTimeout(2 * LONGPRESS_DURATION);
        expect(longpressSpy.callCount).to.equal(0);
    });
    it(':not([toggles])', async () => {
        const el = await fixture<ActionButton>(html`
            <sp-action-button>Button</sp-action-button>
        `);

        await elementUpdated(el);
        const button = el.focusElement;

        expect(el.toggles).to.be.false;
        expect(el.selected).to.be.false;
        expect(button.hasAttribute('aria-pressed')).to.be.false;

        el.click();
        await elementUpdated(el);

        expect(el.toggles).to.be.false;
        expect(el.selected).to.be.false;
        expect(button.hasAttribute('aria-pressed')).to.be.false;
    });
    it('responds to [selected]', async () => {
        const el = await fixture<ActionButton>(html`
            <sp-action-button>Button</sp-action-button>
        `);

        await elementUpdated(el);
        const button = el.focusElement;

        expect(el.toggles).to.be.false;
        expect(el.selected).to.be.false;
        expect(button.hasAttribute('aria-pressed')).to.be.false;

        el.selected = true;
        await elementUpdated(el);

        expect(el.toggles).to.be.false;
        expect(el.selected).to.be.true;
        expect(button.getAttribute('aria-pressed')).to.equal('true');

        el.selected = false;
        await elementUpdated(el);

        expect(el.toggles).to.be.false;
        expect(el.selected).to.be.false;
        expect(button.hasAttribute('aria-pressed')).to.be.false;
    });
    it('toggles', async () => {
        const el = await fixture<ActionButton>(html`
            <sp-action-button toggles>Button</sp-action-button>
        `);

        await elementUpdated(el);
        const button = el.focusElement;

        expect(el.toggles).to.be.true;
        expect(el.selected).to.be.false;
        expect(button.getAttribute('aria-pressed')).to.equal('false');

        el.focus();
        await sendKeys({ press: 'Space' });
        await elementUpdated(el);

        expect(el.toggles).to.be.true;
        expect(el.selected).to.be.true;
        expect(button.getAttribute('aria-pressed')).to.equal('true');

        el.addEventListener('change', (event: Event) => event.preventDefault());
        el.click();
        await elementUpdated(el);

        expect(el.toggles).to.be.true;
        expect(el.selected).to.be.true;
        expect(button.getAttribute('aria-pressed')).to.equal('true');
    });
    it('toggles [aria-haspopup][aria-expanded]', async () => {
        const el = await fixture<ActionButton>(html`
            <sp-action-button
                toggles
                aria-haspopup="true"
                aria-expanded="false"
            >
                Button
            </sp-action-button>
        `);

        await elementUpdated(el);
        const button = el.focusElement;

        expect(el.toggles).to.be.true;
        expect(el.selected).to.be.false;
        expect(button).not.to.have.attribute('aria-pressed');
        expect(button).to.have.attribute('aria-haspopup', 'true');
        expect(button).to.have.attribute('aria-expanded', 'false');

        el.focus();
        await sendKeys({ press: 'Space' });
        await elementUpdated(el);

        expect(el.toggles).to.be.true;
        expect(el.selected).to.be.true;
        expect(button).not.to.have.attribute('aria-pressed');
        expect(button).to.have.attribute('aria-haspopup', 'true');
        expect(button).to.have.attribute('aria-expanded', 'true');

        el.addEventListener('change', (event: Event) => event.preventDefault());
        el.click();
        await elementUpdated(el);

        expect(el.toggles).to.be.true;
        expect(el.selected).to.be.true;
        expect(button).not.to.have.attribute('aria-pressed');
        expect(button).to.have.attribute('aria-haspopup', 'true');
        expect(button).to.have.attribute('aria-expanded', 'true');
    });
    it('manages a `static-color` attribute', async () => {
        const el = await fixture<ActionButton>(html`
            <sp-action-button static-color="black">Button</sp-action-button>
        `);

        await elementUpdated(el);
        expect(el.staticColor).to.equal('black');
        expect(el.getAttribute('static-color')).to.equal('black');
        el.removeAttribute('static-color');
        await elementUpdated(el);
        expect(el.staticColor).to.be.null;
        expect(el.hasAttribute('static-color')).to.be.false;
    });
    it('allows link click', async () => {
        let clicked = false;
        const el = await fixture<ActionButton>(html`
            <sp-action-button href="#top" target="_blank">
                With Target
            </sp-action-button>
        `);

        await elementUpdated(el);

        // prevents browser from activating link but records the proxy click
        el.shadowRoot
            ?.querySelector('.anchor')
            ?.addEventListener('click', (event: Event) => {
                event.preventDefault();
                clicked = true;
            });

        // tests mouse click events, and by extension VoiceOver CRTL+Option+Space click
        await mouseClickOn(el);
        await elementUpdated(el);
        expect(clicked).to.be.true;
    });
    it('dispatches only one click event per user interaction', async () => {
        let clickCount = 0;
        const el = await fixture<ActionButton>(html`
            <sp-action-button
                href="https://example.com/test.pdf"
                download="test.pdf"
            >
                Download
            </sp-action-button>
        `);

        await elementUpdated(el);

        // Track all click events on the action button
        el.addEventListener('click', () => {
            clickCount++;
        });

        // Prevent the anchor from actually navigating
        el.shadowRoot
            ?.querySelector('.anchor')
            ?.addEventListener('click', (event: Event) => {
                event.preventDefault();
            });

        // Simulate a user click
        await mouseClickOn(el);
        await elementUpdated(el);

        // Should only have one click event, not two
        expect(clickCount).to.equal(1);
    });
    it('allows keyboard activation with href', async () => {
        let clickCount = 0;
        const el = await fixture<ActionButton>(html`
            <sp-action-button
                href="https://example.com/test.pdf"
                download="test.pdf"
            >
                Download
            </sp-action-button>
        `);

        await elementUpdated(el);

        // Track all click events on the action button
        el.addEventListener('click', () => {
            clickCount++;
        });

        // Prevent the anchor from actually navigating
        el.shadowRoot
            ?.querySelector('.anchor')
            ?.addEventListener('click', (event: Event) => {
                event.preventDefault();
            });

        // Test Enter key
        el.focus();
        await sendKeys({ press: 'Enter' });
        await elementUpdated(el);
        expect(clickCount).to.equal(1);

        // Test Space key
        clickCount = 0;
        await sendKeys({ press: 'Space' });
        await elementUpdated(el);
        expect(clickCount).to.equal(1);
    });
});
