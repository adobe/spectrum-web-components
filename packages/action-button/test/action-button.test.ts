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

import '../sp-action-button.js';
import { ActionButton } from '../';
import {
    fixture,
    elementUpdated,
    expect,
    html,
    waitUntil,
} from '@open-wc/testing';
import { executeServerCommand } from '@web/test-runner-commands';
import { spy } from 'sinon';

describe('ActionButton', () => {
    it('loads default', async () => {
        const el = await fixture<ActionButton>(
            html`
                <sp-action-button>Button</sp-action-button>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Button');
        await expect(el).to.be.accessible();
    });
    it('loads [hold-affordance]', async () => {
        const el = await fixture<ActionButton>(
            html`
                <sp-action-button hold-affordance>Button</sp-action-button>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Button');
        await expect(el).to.be.accessible();
    });
    it('dispatches `longpress` events when [hold-affordance]', async () => {
        const longpressSpy = spy();
        const el = await fixture<ActionButton>(
            html`
                <sp-action-button
                    hold-affordance
                    @longpress=${() => longpressSpy()}
                >
                    Button
                </sp-action-button>
            `
        );

        await elementUpdated(el);

        el.focus();
        await executeServerCommand('send-keys', {
            press: 'Space',
        });

        expect(longpressSpy.callCount).to.equal(1);
        await executeServerCommand('send-keys', {
            press: 'Alt+ArrowDown',
        });

        expect(longpressSpy.callCount).to.equal(2);
        el.dispatchEvent(new Event('pointerdown'));
        el.dispatchEvent(new Event('pointerup'));
        el.dispatchEvent(new Event('pointerdown'));
        await waitUntil(() => longpressSpy.callCount === 3);
    });
    it(':not([toggles])', async () => {
        const el = await fixture<ActionButton>(
            html`
                <sp-action-button>Button</sp-action-button>
            `
        );

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
    it('toggles', async () => {
        const el = await fixture<ActionButton>(
            html`
                <sp-action-button toggles>Button</sp-action-button>
            `
        );

        await elementUpdated(el);
        const button = el.focusElement;

        expect(el.toggles).to.be.true;
        expect(el.selected).to.be.false;
        expect(button.getAttribute('aria-pressed')).to.equal('false');

        el.focus();
        await executeServerCommand('send-keys', {
            press: 'Space',
        });
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
});
