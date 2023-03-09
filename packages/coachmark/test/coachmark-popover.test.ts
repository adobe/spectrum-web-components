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
    html,
    oneEvent,
} from '@open-wc/testing';

import '@spectrum-web-components/coachmark/sp-coachmark-popover.js';
import '@spectrum-web-components/coachmark/sp-coachmark-popover-content.js';
import '@spectrum-web-components/button/sp-button.js';
import {
    Coachmark,
    CoachmarkPopover,
    CoachmarkPopoverContent,
} from '@spectrum-web-components/coachmark';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { TemplateResult } from 'lit';
import { Button } from '@spectrum-web-components/button';

function isVisible(element: HTMLElement): boolean {
    return !!element.offsetParent;
}

function template(open = false): TemplateResult {
    return html`
        <sp-coachmark-popover ?open=${open}>
            <sp-button>Hello world</sp-button>
            <sp-coachmark-popover-content
                slot="coachmark"
                heading="Learn about the world"
                content="The world has some explaining to do!"
                secondary-cta="Cancel"
                primary-cta="Got it!"
            ></sp-coachmark-popover-content>
        </sp-coachmark-popover>
    `;
}

describe('Coachmark Popover', () => {
    testForLitDevWarnings(
        async () => await fixture<CoachmarkPopover>(template(true))
    );

    it('loads default coachmark popover accessibly', async () => {
        const el = await fixture<CoachmarkPopover>(template(true));

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('opens/ closes', async () => {
        const el = await fixture<CoachmarkPopover>(template());

        await elementUpdated(el);

        const coachmarkPopoverContent = el.querySelector(
            'sp-coachmark-popover-content'
        ) as CoachmarkPopoverContent;
        await expect(
            coachmarkPopoverContent,
            'expected existence of coachmark content'
        ).to.not.be.null;

        el.open = true;
        await elementUpdated(el);
        await expect(isVisible(coachmarkPopoverContent)).to.be.true;

        const defaultCoachmark = el.shadowRoot.querySelector(
            'sp-coachmark'
        ) as Coachmark;
        await expect(
            defaultCoachmark,
            'expected existence of default coachmark'
        ).to.not.be.null;

        await expect(isVisible(defaultCoachmark)).to.be.true;

        el.open = false;
        await elementUpdated(el);
        await expect(isVisible(coachmarkPopoverContent)).to.be.false;
        await expect(isVisible(defaultCoachmark)).to.be.false;
    });

    it('closes on primary cta click', async () => {
        const el = await fixture<CoachmarkPopover>(template(false));

        await elementUpdated(el);

        const coachmarkPopoverContent = el.querySelector(
            'sp-coachmark-popover-content'
        ) as CoachmarkPopoverContent;
        await expect(
            coachmarkPopoverContent,
            'expected existence of coachmark content'
        ).to.not.be.null;
        const primaryCTA = coachmarkPopoverContent.shadowRoot.querySelector(
            'sp-button[variant="primary"]'
        ) as Button;
        await expect(primaryCTA, 'expected existence of primary cta').to.not.be
            .null;

        el.open = true;
        await elementUpdated(el);

        const closed = oneEvent(el, 'sp-coachmark-closed');

        primaryCTA.click();

        await closed;

        await expect(el.open).to.be.false;
    });

    it('closes on secondary cta click', async () => {
        const el = await fixture<CoachmarkPopover>(template(false));

        await elementUpdated(el);

        const coachmarkPopoverContent = el.querySelector(
            'sp-coachmark-popover-content'
        ) as CoachmarkPopoverContent;
        await expect(
            coachmarkPopoverContent,
            'expected existence of coachmark content'
        ).to.not.be.null;
        const secondaryCTA = coachmarkPopoverContent.shadowRoot.querySelector(
            'sp-button[variant="secondary"]'
        ) as Button;
        await expect(secondaryCTA, 'expected existence of secondary cta').to.not
            .be.null;

        el.open = true;
        await elementUpdated(el);

        const closed = oneEvent(el, 'sp-coachmark-closed');

        secondaryCTA.click();

        await closed;

        await expect(el.open).to.be.false;
    });

    it('dispatches open/ close events', async () => {
        const el = await fixture<CoachmarkPopover>(template(false));

        await elementUpdated(el);
        const opened = oneEvent(el, 'sp-coachmark-opened');

        el.open = true;
        await opened;
        await elementUpdated(el);

        const closed = oneEvent(el, 'sp-coachmark-closed');
        el.open = false;
        await closed;
    });

    it('dispatches primary click events', async () => {
        const el = await fixture<CoachmarkPopover>(template(false));

        await elementUpdated(el);

        const coachmarkPopoverContent = el.querySelector(
            'sp-coachmark-popover-content'
        ) as CoachmarkPopoverContent;
        await expect(
            coachmarkPopoverContent,
            'expected existence of coachmark content'
        ).to.not.be.null;
        const primaryCTA = coachmarkPopoverContent.shadowRoot.querySelector(
            'sp-button[variant="primary"]'
        ) as Button;
        await expect(primaryCTA, 'expected existence of primary cta').to.not.be
            .null;
        const primary = oneEvent(el, 'primary');
        primaryCTA.click();
        await primary;
    });

    it('dispatches secondary click events', async () => {
        const el = await fixture<CoachmarkPopover>(template(false));

        await elementUpdated(el);

        const coachmarkPopoverContent = el.querySelector(
            'sp-coachmark-popover-content'
        ) as CoachmarkPopoverContent;
        await expect(
            coachmarkPopoverContent,
            'expected existence of coachmark content'
        ).to.not.be.null;
        const secondaryCTA = coachmarkPopoverContent.shadowRoot.querySelector(
            'sp-button[variant="secondary"]'
        ) as Button;
        await expect(secondaryCTA, 'expected existence of secondary cta').to.not
            .be.null;
        const secondary = oneEvent(el, 'secondary');
        secondaryCTA.click();
        await secondary;
    });
});
