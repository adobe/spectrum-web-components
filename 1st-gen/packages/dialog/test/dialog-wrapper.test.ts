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
    elementUpdated,
    expect,
    fixture,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import { SinonStub, spy, stub } from 'sinon';

import { html, TemplateResult } from '@spectrum-web-components/base';
import { Button } from '@spectrum-web-components/button';
import { Dialog, DialogWrapper } from '@spectrum-web-components/dialog';
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
import { Divider } from '@spectrum-web-components/divider/src/Divider.js';
import { OverlayTrigger } from '@spectrum-web-components/overlay';
import { nextFrame } from '@spectrum-web-components/overlay/src/AbstractOverlay.js';
import { Theme } from '@spectrum-web-components/theme';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import { Underlay } from '@spectrum-web-components/underlay';
import {
    mouseClickOn,
    testForLitDevWarnings,
} from '../../../test/testing-helpers.js';
import {
    lazyHero,
    longContent,
    wrapperButtons,
    wrapperButtonsUnderlay,
    wrapperDismissable,
    wrapperDismissableUnderlayError,
    wrapperFullscreen,
    wrapperHeadlineVisibilityNone,
    wrapperLabeledHero,
    wrapperWithHeadline,
    wrapperWithHeadlineNoDivider,
} from '../stories/dialog-wrapper.stories.js';

async function styledFixture<T extends Element>(
    story: TemplateResult
): Promise<T> {
    const test = await fixture<Theme>(html`
        <sp-theme system="spectrum" scale="medium" color="dark">
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
        const openedSpy = spy();
        const test = await styledFixture<OverlayTrigger>(html`
            <div @sp-opened=${() => openedSpy()}>${longContent()}</div>
        `);
        const overlayTrigger = test.querySelector(
            'overlay-trigger'
        ) as OverlayTrigger;
        const el = test.querySelector('sp-dialog-wrapper') as DialogWrapper;
        el.addEventListener('close', () => closeSpy());
        await waitUntil(
            () => openedSpy.calledOnce,
            'click content projected to overlay',
            { timeout: 2000 }
        );

        expect(el.open).to.be.true;
        const closed = oneEvent(overlayTrigger, 'sp-closed');
        overlayTrigger.open = undefined;
        await closed;

        expect(el.open).to.be.false;
        expect(closeSpy.callCount).to.equal(1);
    });
    it('opens and closes when element is recycled', async () => {
        const closeSpy = spy();
        const openedSpy = spy();
        const test = await styledFixture<OverlayTrigger>(html`
            <div @sp-opened=${() => openedSpy()}>${longContent()}</div>
        `);
        const overlayTrigger = test.querySelector(
            'overlay-trigger'
        ) as OverlayTrigger;
        const el = test.querySelector('sp-dialog-wrapper') as DialogWrapper;
        el.addEventListener('close', () => closeSpy());

        await waitUntil(
            () => openedSpy.calledOnce,
            'click content projected to overlay',
            { timeout: 2000 }
        );

        expect(el.open).to.be.true;
        const closed = oneEvent(overlayTrigger, 'sp-closed');
        overlayTrigger.open = undefined;
        await closed;

        expect(el.open).to.be.false;
        expect(closeSpy.callCount).to.equal(1);
    });
    it("shows header divider when there's a header", async () => {
        const wrapper = await styledFixture<DialogWrapper>(
            wrapperWithHeadline()
        );
        await elementUpdated(wrapper);

        const dialog = wrapper.shadowRoot.querySelector('sp-dialog') as Dialog;
        const divider = dialog.shadowRoot.querySelector(
            'sp-divider.divider'
        ) as Divider;

        expect(divider).to.be.not.null;
    });
    it('hides header divider when there\'s a header but "no-divider"', async () => {
        const wrapper = await styledFixture<DialogWrapper>(
            wrapperWithHeadlineNoDivider()
        );
        await elementUpdated(wrapper);

        await expect(wrapper).to.be.accessible();

        const dialog = wrapper.shadowRoot.querySelector('sp-dialog') as Dialog;
        const divider = dialog.shadowRoot.querySelector(
            'sp-divider.divider'
        ) as Divider;

        expect(divider).to.be.null;
    });
    it("hides header divider when there's no header", async () => {
        const wrapper = await styledFixture<DialogWrapper>(
            wrapperHeadlineVisibilityNone()
        );
        await elementUpdated(wrapper);

        await expect(wrapper).to.be.accessible();

        const dialog = wrapper.shadowRoot.querySelector('sp-dialog') as Dialog;
        const divider = dialog.shadowRoot.querySelector(
            'sp-divider.divider'
        ) as Divider;

        expect(divider).to.be.null;
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
        expect(dismissButton.ariaLabel).to.be.equals('Close');
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

    describe('dev mode', () => {
        let consoleWarnStub!: SinonStub;
        before(() => {
            consoleWarnStub = stub(console, 'warn');
        });
        afterEach(() => {
            consoleWarnStub.resetHistory();
        });
        after(() => {
            consoleWarnStub.restore();
        });
        it('warns in Dev Mode when accessible attributes are not leveraged', async () => {
            const el = await fixture<DialogWrapper>(html`
                <sp-dialog-wrapper></sp-dialog-wrapper>
            `);

            await elementUpdated(el);

            expect(consoleWarnStub.called, 'console.warn called').to.be.true;
            const spyCall = consoleWarnStub.getCall(0);
            expect(
                spyCall.args.at(0).includes('accessible'),
                'confirm accessibility-centric message'
            ).to.be.true;
            expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
                data: {
                    localName: 'sp-dialog-wrapper',
                    type: 'accessibility',
                    level: 'default',
                },
            });
        });
    });

    it('manages content element tabindex on resize observer time', async () => {
        const imgReadyPromise = new Promise((res) => {
            const img = document.createElement('img');
            img.onload = res;
            img.src = lazyHero.args.src;
        });
        const test = await styledFixture(lazyHero(lazyHero.args));
        const dialog = document.querySelector(
            'sp-dialog-wrapper'
        ) as DialogWrapper;
        const button = document.querySelector('sp-button') as Button;
        const contentElement = (
            (dialog as unknown as { dialog: Dialog }).dialog as unknown as {
                contentElement: HTMLElement;
            }
        ).contentElement;
        expect(contentElement.hasAttribute('tabindex')).to.be.false;
        await elementUpdated(dialog);
        const opened = oneEvent(test, 'sp-opened');
        await mouseClickOn(button);
        await opened;
        await elementUpdated(dialog);
        await imgReadyPromise;
        // Resize observer timing.
        await nextFrame();
        await nextFrame();
        expect(contentElement.hasAttribute('tabindex')).to.be.true;
    });
});

describe('dev mode', () => {
    let consoleWarnStub!: ReturnType<typeof stub>;
    before(() => {
        window.__swc.verbose = true;
        consoleWarnStub = stub(console, 'warn');
    });
    afterEach(() => {
        consoleWarnStub.resetHistory();
    });
    after(() => {
        window.__swc.verbose = false;
        consoleWarnStub.restore();
    });
});
