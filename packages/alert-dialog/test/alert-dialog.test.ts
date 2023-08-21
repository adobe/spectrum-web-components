/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import { elementUpdated, expect, fixture, nextFrame } from '@open-wc/testing';
import { html, TemplateResult } from '@spectrum-web-components/base';
import { Theme } from '@spectrum-web-components/theme';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/alert-dialog/sp-alert-dialog.js';
import {
    AlertDialog,
    alertDialogVariants,
    AlertDialogWrapper,
} from '@spectrum-web-components/alert-dialog';
import { OverlayTrigger } from '@spectrum-web-components/overlay';
import { Button } from '@spectrum-web-components/button/src/Button.js';
import {
    confirmation,
    destructive,
    information,
    secondary,
    warning,
} from '../stories/alert-dialog.stories.js';
import { IconAlert } from '@spectrum-web-components/icons-workflow/src/elements/IconAlert.js';
import { Underlay } from '@spectrum-web-components/underlay';
import { spy } from 'sinon';

async function styledFixture<T extends Element>(
    story: TemplateResult
): Promise<T> {
    const test = await fixture<Theme>(html`
        <sp-theme theme="spectrum" scale="medium" color="dark">
            ${story}
        </sp-theme>
    `);
    return test.children[0] as T;
}

describe('AlertDialog', () => {
    it('does not recycle applied content ids', async () => {
        const el = await fixture<AlertDialogWrapper>(html`
            <sp-alert-dialog>
                <h2 slot="heading">Disclaimer</h2>
                <p>Initial paragraph.</p>
            </sp-alert-dialog>
        `);
        await elementUpdated(el);

        await expect(el).to.be.accessible();

        const paragraph = document.createElement('p');
        paragraph.textContent = 'Added paragraph.';

        const target = el.querySelector('p') as HTMLParagraphElement;
        target.insertAdjacentElement('beforebegin', paragraph);

        await nextFrame();

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('validates variants', async () => {
        const el = await fixture<AlertDialogWrapper>(
            html`
                <sp-alert-dialog-wrapper variant="invalid" open>
                    This Alert Dialog validates variants.
                </sp-alert-dialog-wrapper>
            `
        );

        await elementUpdated(el);
        expect(el.variant).to.equal('');

        el.variant = alertDialogVariants[0];

        await elementUpdated(el);
        expect(el.variant).to.equal(alertDialogVariants[0]);

        el.variant = alertDialogVariants[0];

        await elementUpdated(el);
        expect(el.variant).to.equal(alertDialogVariants[0]);
    });
    it('loads with underlay and headline accessibly', async () => {
        const test = await styledFixture<OverlayTrigger>(information());
        const el = test.querySelector(
            'sp-alert-dialog-wrapper'
        ) as AlertDialogWrapper;
        await elementUpdated(el);
        el.headline = 'I am a headline';
        await elementUpdated(el);
        await expect(el).to.be.accessible();
    });
    it('renders with confirmation variant', async () => {
        const test = await styledFixture<OverlayTrigger>(confirmation());
        const el = test.querySelector(
            'sp-alert-dialog-wrapper'
        ) as AlertDialogWrapper;
        await elementUpdated(el);
        const dialog = el.shadowRoot.querySelector(
            'sp-alert-dialog'
        ) as AlertDialog;
        expect(dialog).to.be.an.instanceOf(AlertDialog);
        const confirmButton = dialog.querySelector(
            'sp-button[variant="accent"]'
        ) as Button;
        confirmButton.setAttribute('treatment', 'outline');
        expect(confirmButton).to.be.not.undefined;
        const expectedConfirmLabel = el.getAttribute('confirm-label');
        expect(confirmButton.textContent?.trim()).to.equal(
            expectedConfirmLabel
        );
        const cancelButton = dialog.querySelector(
            'sp-button[variant="secondary"]'
        ) as Button;
        expect(cancelButton).to.be.not.undefined;
        const expectedCancelLabel = el.getAttribute('cancel-label');
        expect(cancelButton.textContent?.trim()).to.equal(expectedCancelLabel);
    });
    it('renders warning variant renders with an icon', async () => {
        const test = await styledFixture<OverlayTrigger>(warning());
        const el = test.querySelector(
            'sp-alert-dialog-wrapper'
        ) as AlertDialogWrapper;
        await elementUpdated(el);
        const dialog = el.shadowRoot.querySelector(
            'sp-alert-dialog'
        ) as AlertDialog;
        const alertIcon = dialog.shadowRoot.querySelector(
            'sp-icon-alert'
        ) as IconAlert;
        expect(alertIcon).to.be.not.null;
    });
    it('does not dismiss via clicking the underlay :not([dismissable])', async () => {
        const test = await styledFixture<OverlayTrigger>(destructive());
        const el = test.querySelector(
            'sp-alert-dialog-wrapper'
        ) as AlertDialogWrapper;
        await elementUpdated(el);
        expect(el.open).to.be.true;
        const underlay = el.shadowRoot.querySelector('sp-underlay') as Underlay;
        underlay.click();
        await elementUpdated(el);
        expect(el.open).to.be.true;
    });
    it('dispatches `confirm`, `cancel` and `secondary`', async () => {
        const confirmSpy = spy();
        const cancelSpy = spy();
        const secondarySpy = spy();
        const handleConfirm = (): void => confirmSpy();
        const handleCancel = (): void => cancelSpy();
        const handleSecondary = (): void => secondarySpy();
        const test = await styledFixture<OverlayTrigger>(secondary());
        const el = test.querySelector(
            'sp-alert-dialog-wrapper'
        ) as AlertDialogWrapper;
        el.addEventListener('confirm', handleConfirm);
        el.addEventListener('cancel', handleCancel);
        el.addEventListener('secondary', handleSecondary);

        await elementUpdated(el);
        expect(confirmSpy.called).to.be.false;
        expect(cancelSpy.called).to.be.false;
        expect(secondarySpy.called).to.be.false;
        const confirmButton = el.shadowRoot.querySelector(
            '#confirmButton'
        ) as Button;
        const cancelButton = el.shadowRoot.querySelector(
            '#cancelButton'
        ) as Button;
        const secondaryButton = el.shadowRoot.querySelector(
            '#secondaryButton'
        ) as Button;

        confirmButton.click();

        await elementUpdated(el);
        expect(confirmSpy.called, 'dispatched `confirm`').to.be.true;
        expect(secondarySpy.called).to.be.false;
        expect(cancelSpy.called).to.be.false;

        cancelButton.click();

        await elementUpdated(el);
        expect(confirmSpy.callCount).to.equal(1);
        expect(cancelSpy.called, 'dispatched `cancel`').to.be.true;
        expect(secondarySpy.called).to.be.false;

        secondaryButton.click();

        await elementUpdated(el);
        expect(confirmSpy.callCount).to.equal(1);
        expect(cancelSpy.callCount).to.equal(1);
        expect(secondarySpy.called, 'dispatched `secondary`').to.be.true;
    });
});
