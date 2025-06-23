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
    oneEvent,
} from '@open-wc/testing';
import { TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import '@spectrum-web-components/dialog/sp-dialog-base.js';
import { Theme } from '@spectrum-web-components/theme';
import { OverlayTrigger } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import { alertDestructive } from '../stories/dialog.stories.js';
import { Button } from '@spectrum-web-components/button/src/Button.js';
import { DialogBase } from '@spectrum-web-components/dialog';

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

const overlayTrigger = (story: () => TemplateResult): TemplateResult => html`
    <overlay-trigger type="modal">
        <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
        ${story()}
    </overlay-trigger>
`;

describe('dialog base', () => {
    it('does not close by default when interacting with buttons', async () => {
        const el = await styledFixture<OverlayTrigger>(
            overlayTrigger(
                () => html`
                    <sp-dialog-base underlay slot="click-content">
                        ${alertDestructive()}
                    </sp-dialog-base>
                `
            )
        );
        await elementUpdated(el);

        const dialog = el.querySelector('sp-dialog-base') as DialogBase;
        await elementUpdated(dialog);
        const secondaryButton = el.querySelector(
            '[variant="secondary"]'
        ) as Button;
        const negativeButton = el.querySelector(
            '[variant="negative"]'
        ) as Button;

        expect(el.open).to.be.undefined;
        expect(dialog.open).to.be.false;
        const opened = oneEvent(el, 'sp-opened');
        el.open = 'click';
        await opened;

        expect(dialog.open).to.be.true;
        expect(el.open).to.be.equal('click');

        secondaryButton.click();
        // Give time to ensure reactions DO NOT close the dialog.
        await aTimeout(100);

        expect(el.open).to.be.equal('click');

        negativeButton.click();
        // Give time to ensure reactions DO NOT close the dialog.
        await aTimeout(100);

        expect(el.open).to.be.equal('click');

        const closed = oneEvent(el, 'sp-closed');
        dialog.open = false;
        await closed;

        expect(dialog.open).to.be.false;
    });
    it('does not close by default when interacting with buttons when recycled', async () => {
        const el = await styledFixture<OverlayTrigger>(
            overlayTrigger(
                () => html`
                    <sp-dialog-base underlay slot="click-content">
                        ${alertDestructive()}
                    </sp-dialog-base>
                `
            )
        );
        await elementUpdated(el);

        const dialog = el.querySelector('sp-dialog-base') as DialogBase;
        await elementUpdated(dialog);
        const secondaryButton = el.querySelector(
            '[variant="secondary"]'
        ) as Button;
        const negativeButton = el.querySelector(
            '[variant="negative"]'
        ) as Button;

        expect(el.open).to.be.undefined;
        expect(dialog.open).to.be.false;
        const opened = oneEvent(el, 'sp-opened');
        el.open = 'click';
        await opened;

        expect(dialog.open).to.be.true;
        expect(el.open).to.be.equal('click');

        secondaryButton.click();
        // Give time to ensure reactions DO NOT close the dialog.
        await aTimeout(100);

        expect(el.open).to.be.equal('click');

        negativeButton.click();
        // Give time to ensure reactions DO NOT close the dialog.
        await aTimeout(100);

        expect(el.open).to.be.equal('click');

        const closed = oneEvent(el, 'sp-closed');
        dialog.open = false;
        await closed;
        await elementUpdated(el);

        expect(dialog.open).to.be.false;
    });
});
