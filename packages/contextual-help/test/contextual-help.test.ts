/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { elementUpdated, expect, fixture, oneEvent } from '@open-wc/testing';
import { nextFrame } from '@spectrum-web-components/overlay/src/AbstractOverlay.js';
import { sendKeys } from '@web/test-runner-commands';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { ContextualHelp } from '../src/ContextualHelp.js';
import { ContextualHelpMarkup } from '../stories';

describe('ContextualHelp', () => {
    testForLitDevWarnings(
        async () => await fixture<ContextualHelp>(ContextualHelpMarkup())
    );
    it('loads default contextual-help accessibly', async () => {
        const el = await fixture<ContextualHelp>(ContextualHelpMarkup());

        await elementUpdated(el);

        await expect(el).to.be.accessible();

        const button = document
            .querySelector('sp-contextual-help')
            ?.shadowRoot?.querySelector('sp-action-button');
        expect(button).to.have.attribute('aria-label', 'Informations');

        el.variant = 'help';

        await elementUpdated(el);
        expect(button).to.have.attribute('aria-label', 'Help');
    });
    it('is a popover on web', async () => {
        const el = await fixture<ContextualHelp>(ContextualHelpMarkup());

        await elementUpdated(el);
        const trigger = el.shadowRoot?.querySelector('#trigger') as HTMLElement;

        let popover = el.shadowRoot?.querySelector('sp-popover');
        expect(popover).not.to.exist;

        const opened = oneEvent(el, 'sp-opened');
        trigger.click();
        await opened;

        popover = el.shadowRoot?.querySelector('sp-popover');
        expect(popover).to.exist;
        const heading = popover?.querySelector('h2')?.textContent;
        expect(heading).to.equal('Permission required');

        const closed = oneEvent(el, 'sp-closed');
        await sendKeys({
            press: 'Escape',
        });
        await closed;
        await nextFrame();
        await nextFrame();

        popover = el.shadowRoot?.querySelector('sp-popover');
        expect(el.shadowRoot?.querySelector('sp-popover')).not.to.exist;
    });
});
