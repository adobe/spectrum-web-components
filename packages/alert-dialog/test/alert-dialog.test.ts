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
import { elementUpdated, expect, fixture } from '@open-wc/testing';
import { html, TemplateResult } from '@spectrum-web-components/base';
import { Theme } from '@spectrum-web-components/theme';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/alert-dialog/sp-alert-dialog.js';
import {
    AlertDialog,
    AlertDialogBase,
} from '@spectrum-web-components/alert-dialog';
import { OverlayTrigger } from '@spectrum-web-components/overlay';
import { Button } from '@spectrum-web-components/button/src/Button.js';
import { confirmation, warning } from '../stories/alert-dialog.stories.js';
import { IconAlert } from '@spectrum-web-components/icons-workflow/src/elements/IconAlert.js';

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
    it('alert dialog renders with variant confirmation', async () => {
        const test = await styledFixture<OverlayTrigger>(confirmation());
        const el = test.querySelector('sp-alert-dialog') as AlertDialog;
        await elementUpdated(el);
        const dialog = el.shadowRoot.querySelector(
            'sp-alert-dialog-base'
        ) as AlertDialogBase;
        const confirmButton = dialog.querySelector(
            'sp-button[variant="accent"]'
        ) as Button;
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
    it('warning variant renders with an icon', async () => {
        const test = await styledFixture<OverlayTrigger>(warning());
        const el = test.querySelector('sp-alert-dialog') as AlertDialog;
        await elementUpdated(el);
        const dialog = el.shadowRoot.querySelector(
            'sp-alert-dialog-base'
        ) as AlertDialogBase;
        const alertIcon = dialog.querySelector('sp-icon-alert') as IconAlert;
        expect(alertIcon).to.be.not.null;
    });
});
