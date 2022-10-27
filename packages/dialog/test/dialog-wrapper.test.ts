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

import {
    elementUpdated,
    expect,
    fixture,
    nextFrame,
    oneEvent,
} from '@open-wc/testing';
import { spy } from 'sinon';

import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
import { Dialog, DialogWrapper } from '@spectrum-web-components/dialog';
import { ActionButton } from '@spectrum-web-components/action-button';
import { Button } from '@spectrum-web-components/button';
import { Underlay } from '@spectrum-web-components/underlay';
import {
    longContent,
    wrapperButtons,
    wrapperButtonsUnderlay,
    wrapperDismissable,
    wrapperDismissableUnderlayError,
    wrapperFullscreen,
    wrapperLabeledHero,
} from '../stories/dialog-wrapper.stories.js';
import { OverlayTrigger } from '@spectrum-web-components/overlay';
import { html, TemplateResult } from '@spectrum-web-components/base';
import { Theme } from '@spectrum-web-components/theme';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

async function styledFixture<T extends Element>(
    story: TemplateResult
): Promise<T> {
    const test = await fixture<Theme>(html`
        <sp-theme theme="classic" scale="medium" color="dark">
            ${story}
        </sp-theme>
    `);
    return test.children[0] as T;
}

describe('Dialog Wrapper', () => {
    testForLitDevWarnings(
        async () => await styledFixture<DialogWrapper>(wrapperDismissable())
    );
    it('loads wrapped dialog accessibly', async () => {
        const el = await styledFixture<DialogWrapper>(wrapperDismissable());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads labeled hero dialog accessibly', async () => {
        const el = await styledFixture<DialogWrapper>(wrapperLabeledHero());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads fullscreen wrapped dialog accessibly', async () => {
        const el = await styledFixture<DialogWrapper>(wrapperFullscreen());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    xit('loads with underlay and no headline accessibly', async () => {
        const el = await styledFixture<DialogWrapper>(wrapperButtonsUnderlay());
        await elementUpdated(el);
        el.headline = '';
        await elementUpdated(el);
        await expect(el).to.be.accessible();
    });
    it('opens and closes', async () => {
        const closeSpy = spy();
        const test = await styledFixture<OverlayTrigger>(longContent());
        const el = test.querySelector('sp-dialog-wrapper') as DialogWrapper;
        el.addEventListener('close', () => closeSpy());

        await elementUpdated(el);

        const opened = oneEvent(test, 'sp-opened');
        test.open = 'click';
        await opened;

        expect(el.open).to.be.true;

        const closed = oneEvent(test, 'sp-closed');
        test.open = undefined;
        await closed;
        await nextFrame();

        expect(el.open).to.be.false;
        expect(closeSpy.callCount).to.equal(1);
    });
    it('opens and closes when element is recycled', async () => {
        const closeSpy = spy();
        const test = await styledFixture<OverlayTrigger>(longContent());
        const el = test.querySelector('sp-dialog-wrapper') as DialogWrapper;
        el.addEventListener('close', () => closeSpy());

        await elementUpdated(el);

        const opened = oneEvent(test, 'sp-opened');
        test.open = 'click';
        await opened;

        expect(el.open).to.be.true;

        const closed = oneEvent(test, 'sp-closed');
        test.open = undefined;
        await closed;
        await nextFrame();

        expect(el.open).to.be.false;
        expect(closeSpy.callCount).to.equal(1);
    });
    it('dismisses via clicking the underlay when [dismissable]', async () => {
        const test = await styledFixture<DialogWrapper>(
            wrapperDismissableUnderlayError()
        );
        const el = test.querySelector('sp-dialog-wrapper') as DialogWrapper;
        await elementUpdated(el);
        expect(el.open).to.be.true;
        el.dismissable = true;
        const underlay = el.shadowRoot.querySelector('sp-underlay') as Underlay;
        underlay.click();
        await elementUpdated(el);
        expect(el.open).to.be.false;
    });
    it('does not dismiss via clicking the underlay :not([dismissable])', async () => {
        const el = await styledFixture<DialogWrapper>(wrapperButtonsUnderlay());
        await elementUpdated(el);
        expect(el.open).to.be.true;
        const underlay = el.shadowRoot.querySelector('sp-underlay') as Underlay;
        underlay.click();
        await elementUpdated(el);
        expect(el.open).to.be.true;
    });
    it('dismisses', async () => {
        const el = await styledFixture<DialogWrapper>(wrapperDismissable());

        await elementUpdated(el);
        expect(el.open).to.be.true;

        const root = el.shadowRoot ? el.shadowRoot : el;
        const dialog = root.querySelector('sp-dialog') as Dialog;
        const dialogRoot = dialog.shadowRoot ? dialog.shadowRoot : dialog;
        const dismissButton = dialogRoot.querySelector(
            '.close-button'
        ) as HTMLButtonElement;
        dismissButton.click();

        await elementUpdated(el);
        expect(el.open).to.be.false;
    });
    it('manages entry focus - dismissable', async () => {
        const el = await styledFixture<DialogWrapper>(wrapperDismissable());

        await elementUpdated(el);
        expect(el.open).to.be.true;
        expect(document.activeElement !== el, 'no focused').to.be.true;

        const dialog = el.shadowRoot.querySelector('sp-dialog') as Dialog;
        const dialogRoot = dialog.shadowRoot ? dialog.shadowRoot : dialog;
        const dismissButton = dialogRoot.querySelector(
            '.close-button'
        ) as ActionButton;

        el.focus();
        await elementUpdated(el);
        expect(
            document.activeElement === el,
            `focused generally, ${document.activeElement}`
        ).to.be.true;
        expect(
            (dismissButton.getRootNode() as Document).activeElement !==
                dismissButton,
            `does not focus specifically, ${
                (dismissButton.getRootNode() as Document).activeElement
            }`
        ).to.be.true;

        dismissButton.click();
        await elementUpdated(el);
        expect(el.open).to.be.false;
    });
    it('manages entry focus - buttons', async () => {
        const el = await styledFixture<DialogWrapper>(wrapperButtons());

        await elementUpdated(el);
        expect(el.open).to.be.true;
        expect(document.activeElement !== el, 'no focused').to.be.true;

        const button = el.shadowRoot.querySelector('sp-button') as Button;

        el.focus();
        await elementUpdated(el);
        expect(
            document.activeElement === el,
            `focused generally, ${document.activeElement}`
        ).to.be.true;
        expect(
            (button.getRootNode() as Document).activeElement === button,
            `focused specifically, ${
                (button.getRootNode() as Document).activeElement?.outerHTML
            }`
        ).to.be.true;
    });
    it('dispatches `confirm`, `cancel` and `secondary`', async () => {
        const confirmSpy = spy();
        const cancelSpy = spy();
        const secondarySpy = spy();
        const handleConfirm = (): void => confirmSpy();
        const handleCancel = (): void => cancelSpy();
        const handleSecondary = (): void => secondarySpy();
        const el = await styledFixture<DialogWrapper>(wrapperButtons());
        el.addEventListener('confirm', handleConfirm);
        el.addEventListener('cancel', handleCancel);
        el.addEventListener('secondary', handleSecondary);

        await elementUpdated(el);
        expect(confirmSpy.called).to.be.false;
        expect(cancelSpy.called).to.be.false;
        expect(secondarySpy.called).to.be.false;

        const accentButton = el.shadowRoot.querySelector(
            '[variant="accent"]'
        ) as Button;
        const primaryButton = el.shadowRoot.querySelector(
            '[variant="primary"]'
        ) as Button;
        const secondaryButton = el.shadowRoot.querySelector(
            '[variant="secondary"]'
        ) as Button;

        accentButton.click();

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
