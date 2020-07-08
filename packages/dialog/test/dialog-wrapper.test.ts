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

import { fixture, elementUpdated, expect } from '@open-wc/testing';
import { spy } from 'sinon';

import '../sp-dialog-wrapper.js';
import { Dialog, DialogWrapper } from '../';
import { Button } from '@spectrum-web-components/button';
import {
    wrapperLabeledHero,
    wrapperDismissible,
    wrapperButtons,
    wrapperFullscreen,
    wrapperButtonsUnderlay,
} from '../stories/dialog-wrapper.stories.js';
import { Underlay } from '@spectrum-web-components/underlay';

describe('Dialog Wrapper', () => {
    it('loads wrapped dialog accessibly', async () => {
        const el = await fixture<DialogWrapper>(wrapperDismissible());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads labeled hero dialog accessibly', async () => {
        const el = await fixture<DialogWrapper>(wrapperLabeledHero());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads fullscreen wrapped dialog accessibly', async () => {
        const el = await fixture<DialogWrapper>(wrapperFullscreen());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads with underlay and no headline accessibly', async () => {
        const el = await fixture<DialogWrapper>(wrapperButtonsUnderlay());
        await elementUpdated(el);
        el.headline = '';
        await elementUpdated(el);
        expect(el).to.be.accessible();
    });
    it('dismisses via clicking the underlay', async () => {
        const el = await fixture<DialogWrapper>(wrapperButtonsUnderlay());
        await elementUpdated(el);
        expect(el.open).to.be.true;
        el.dismissible = true;
        const root = el.shadowRoot ? el.shadowRoot : el;
        const underlay = root.querySelector('sp-underlay') as Underlay;
        underlay.click();
        await elementUpdated(el);
        expect(el.open).to.be.false;
    });
    it('dismisses', async () => {
        const el = await fixture<DialogWrapper>(wrapperDismissible());

        await elementUpdated(el);
        expect(el.open).to.be.true;

        const root = el.shadowRoot ? el.shadowRoot : el;
        const dialog = root.querySelector('sp-dialog') as Dialog;
        dialog.dispatchEvent(new Event('close'));

        await elementUpdated(el);
        expect(el.open).to.be.false;
    });
    it('dispatches `confirm`, `cancel` and `secondary`', async () => {
        const confirmSpy = spy();
        const cancelSpy = spy();
        const secondarySpy = spy();
        const handleConfirm = (): void => confirmSpy();
        const handleCancel = (): void => cancelSpy();
        const handleSecondary = (): void => secondarySpy();
        const el = await fixture<DialogWrapper>(wrapperButtons());
        el.addEventListener('confirm', handleConfirm);
        el.addEventListener('cancel', handleCancel);
        el.addEventListener('secondary', handleSecondary);

        await elementUpdated(el);
        expect(confirmSpy.called).to.be.false;
        expect(cancelSpy.called).to.be.false;
        expect(secondarySpy.called).to.be.false;

        const root = el.shadowRoot ? el.shadowRoot : el;
        const ctaButton = root.querySelector('[variant="cta"]') as Button;
        const primaryButton = root.querySelector(
            '[variant="primary"]'
        ) as Button;
        const secondaryButton = root.querySelector(
            '[variant="secondary"]'
        ) as Button;

        ctaButton.click();

        await elementUpdated(el);
        expect(confirmSpy.called, 'dispatched `confirm`').to.be.true;
        expect(secondarySpy.called).to.be.false;
        expect(cancelSpy.called).to.be.false;

        primaryButton.click();

        await elementUpdated(el);
        expect(confirmSpy.callCount).to.equal(1);
        expect(secondarySpy.called, 'dispatched `cancel`').to.be.true;
        expect(cancelSpy.called).to.be.false;

        secondaryButton.click();

        await elementUpdated(el);
        expect(confirmSpy.callCount).to.equal(1);
        expect(secondarySpy.callCount).to.equal(1);
        expect(cancelSpy.called, 'dispatched `secondary`').to.be.true;
    });
});
