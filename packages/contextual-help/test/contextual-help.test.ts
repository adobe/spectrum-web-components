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
import { elementUpdated, expect, fixture, oneEvent } from '@open-wc/testing';
import { nextFrame } from '@spectrum-web-components/overlay/src/AbstractOverlay.js';
import { sendKeys } from '@web/test-runner-commands';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { ContextualHelp, DEFAULT_ARIA_LABELS } from '../src/ContextualHelp.js';
import { ContextualHelpMarkup } from '../stories';
import { render, TemplateResult } from 'lit';

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
        expect(button).to.have.attribute(
            'aria-label',
            DEFAULT_ARIA_LABELS.info
        );

        el.variant = 'help';

        await elementUpdated(el);
        expect(button).to.have.attribute(
            'aria-label',
            DEFAULT_ARIA_LABELS.help
        );
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
        const headingSlot = popover?.querySelector(
            'slot[name="heading"]'
        ) as HTMLSlotElement;
        const heading = headingSlot.assignedElements()[0].textContent;
        expect(heading).to.equal('Permission required');

        const closed = oneEvent(el, 'sp-closed');
        await sendKeys({ press: 'Escape' });
        await closed;
        await nextFrame();
        await nextFrame();

        popover = el.shadowRoot?.querySelector('sp-popover');
        expect(el.shadowRoot?.querySelector('sp-popover')).not.to.exist;
    });
    it('returns the label if set', async () => {
        const el = await fixture<ContextualHelp>(ContextualHelpMarkup());
        el.label = 'Custom Label';
        expect(el.buttonAriaLabel).to.equal('Custom Label');
    });

    it(`returns ${DEFAULT_ARIA_LABELS.help} if variant is "help" and label is not set`, async () => {
        const el = await fixture<ContextualHelp>(ContextualHelpMarkup());
        el.variant = 'help';
        expect(el.buttonAriaLabel).to.equal(DEFAULT_ARIA_LABELS.help);
    });

    it(`returns ${DEFAULT_ARIA_LABELS.info} if variant is not "help" and label is not set`, async () => {
        const el = await fixture<ContextualHelp>(ContextualHelpMarkup());
        expect(el.buttonAriaLabel).to.equal(DEFAULT_ARIA_LABELS.info);
    });
    it('renders correctly when actualPlacement is undefined', async () => {
        const el = await fixture<ContextualHelp>(ContextualHelpMarkup());

        el.isMobile.matches = true;

        await elementUpdated(el);

        const trigger = el.shadowRoot?.querySelector('#trigger') as HTMLElement;
        expect(trigger).to.exist;
        expect(trigger).to.have.attribute(
            'aria-label',
            DEFAULT_ARIA_LABELS.info
        );

        const overlay = el.shadowRoot?.querySelector(
            'sp-overlay'
        ) as HTMLElement;
        expect(overlay).to.exist;
        expect(overlay).to.have.attribute('trigger', 'trigger@click');
        expect(overlay).to.have.attribute('receives-focus', 'true');
        expect(overlay).to.have.property('offset', el.offset);
        expect(overlay).to.have.property('open', el.open);
    });
    it('renders dialog content when isMobile.matches is true', async () => {
        const el = await fixture<ContextualHelp>(ContextualHelpMarkup());

        el.isMobile.matches = true;

        await elementUpdated(el);

        const template: TemplateResult = el['renderOverlayContent']();

        const container = document.createElement('div');
        render(template, container);

        const dialogBase = container.querySelector('sp-dialog-base');
        const dialog = container.querySelector('sp-dialog');
        const headingSlot = container.querySelector('slot[name="heading"]');
        const linkSlot = container.querySelector('slot[name="link"]');

        expect(dialogBase).to.exist;
        expect(dialog).to.exist;
        expect(dialog).to.have.attribute('dismissable');
        expect(dialog).to.have.attribute('size', 's');
        expect(headingSlot).to.exist;
        expect(linkSlot).to.exist;
    });
});
