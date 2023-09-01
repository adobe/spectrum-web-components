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
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/alert-dialog/sp-alert-dialog.js';
import {
    AlertDialog,
    alertDialogVariants,
} from '@spectrum-web-components/alert-dialog';
import { Button } from '@spectrum-web-components/button/src/Button.js';
import {
    confirmation,
    secondary,
    warning,
} from '../stories/alert-dialog.stories.js';

describe('AlertDialog', () => {
    it('renders confirmation variant accessible', async () => {
        const el = await fixture<AlertDialog>(confirmation());
        await elementUpdated(el);
        await expect(el).to.be.accessible();
    });
    it('warning variant renders with an alert icon', async () => {
        const el = await fixture<AlertDialog>(warning());
        await elementUpdated(el);
        const alertIcon = el.shadowRoot.querySelector('sp-icon-alert');
        expect(alertIcon).to.be.not.null;
    });
    it('secondary variant renders with `confirm`, `cancel` and `secondary` buttons', async () => {
        const el = await fixture<AlertDialog>(secondary());
        await elementUpdated(el);
        const confirmButton = el.querySelector('#confirmButton') as Button;
        const cancelButton = el.querySelector('#cancelButton') as Button;
        const secondaryButton = el.querySelector('#secondaryButton') as Button;

        expect(confirmButton).to.be.not.null;
        expect(cancelButton).to.be.not.null;
        expect(secondaryButton).to.be.not.null;
    });
    it('validates variants', async () => {
        const el = await fixture<AlertDialog>(
            html`
                <sp-alert-dialog variant="invalid">
                    This Alert Dialog validates variants.
                </sp-alert-dialog>
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
    it('does not recycle applied content ids', async () => {
        const el = await fixture<AlertDialog>(html`
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

    it('allows heading override', async () => {
        class Override extends AlertDialog {
            protected override renderHeading(): TemplateResult {
                return html`
                    <h2 id="heading-container">Test</h2>
                `;
            }
        }

        customElements.define('heading-dialog', Override);

        const el = await fixture<Override>(
            html`
                <heading-dialog></heading-dialog>
            `
        );

        const container = el.shadowRoot.querySelector('#heading-container');
        expect(container).to.not.be.null;
    });
    it('allows content override', async () => {
        class Override extends AlertDialog {
            protected override renderContent(): TemplateResult {
                return html`
                    <p id="content-container">Test</p>
                `;
            }
        }

        customElements.define('content-dialog', Override);

        const el = await fixture<Override>(
            html`
                <content-dialog></content-dialog>
            `
        );

        const container = el.shadowRoot.querySelector('#content-container');
        expect(container).to.not.be.null;
    });
    it('allows button override', async () => {
        class Override extends AlertDialog {
            protected override get hasButtons(): boolean {
                return true;
            }
            protected override renderButtons(): TemplateResult {
                return html`
                    <p id="button-container">Test</p>
                `;
            }
        }

        customElements.define('button-dialog', Override);

        const el = await fixture<Override>(
            html`
                <button-dialog></button-dialog>
            `
        );

        const container = el.shadowRoot.querySelector('#button-container');
        expect(container).to.not.be.null;
    });
});
