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
    fixture,
    expect,
    elementUpdated,
    waitUntil,
    html,
} from '@open-wc/testing';
import { ActionButton } from '@spectrum-web-components/action-button';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js';
import { Popover } from '@spectrum-web-components/popover';
import '@spectrum-web-components/popover/sp-popover.js';
import { OverlayTrigger } from '..';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import { sendKeys } from '@web/test-runner-commands';
import { waitForPredicate } from '../../../test/testing-helpers';
import { spy } from 'sinon';

describe('Overlay Trigger - Longpress', () => {
    it('displays `longpress` content', async () => {
        const el = await fixture<OverlayTrigger>(
            (() => html`
                <overlay-trigger placement="right-start">
                    <sp-action-button slot="trigger" hold-affordance>
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-popover slot="longpress-content" tip>
                        <sp-action-group
                            selects="single"
                            vertical
                            style="margin: calc(var(--spectrum-actiongroup-button-gap-y,var(--spectrum-global-dimension-size-100)) / 2);"
                        >
                            <sp-action-button>
                                <sp-icon-magnify slot="icon"></sp-icon-magnify>
                            </sp-action-button>
                            <sp-action-button>
                                <sp-icon-magnify slot="icon"></sp-icon-magnify>
                            </sp-action-button>
                            <sp-action-button>
                                <sp-icon-magnify slot="icon"></sp-icon-magnify>
                            </sp-action-button>
                        </sp-action-group>
                    </sp-popover>
                </overlay-trigger>
            `)()
        );

        await elementUpdated(el);

        const trigger = el.querySelector('sp-action-button') as ActionButton;
        const content = el.querySelector(
            '[slot="longpress-content"]'
        ) as Popover;

        expect(trigger).to.not.be.null;
        expect(content).to.not.be.null;
        expect(content.open).to.be.false;

        trigger.focus();
        await sendKeys({
            press: 'Space',
        });
        await waitForPredicate(
            () => !(content.parentElement instanceof OverlayTrigger)
        );
        await waitUntil(() => content.open, 'opens for `Space`');
        document.body.click();

        await waitUntil(() => !content.open, 'closes for `Space`');
        await elementUpdated(el);

        trigger.focus();
        await sendKeys({
            press: 'Alt+ArrowDown',
        });
        await waitUntil(() => content.open, 'opens for `Alt+ArrowDown`');
        await sendKeys({
            press: 'Escape',
        });
        await waitUntil(() => !content.open, 'closes for `Alt+ArrowDown`');
        await elementUpdated(el);

        trigger.dispatchEvent(new Event('pointerdown'));
        await waitUntil(() => content.open, 'opens for `pointerdown`');
        await sendKeys({
            press: 'Escape',
        });
        await waitUntil(() => !content.open, 'closes for `pointerdown`');
    });
    it('displays `longpress` declaratively', async () => {
        const openedSpy = spy();
        const closedSpy = spy();
        const el = await fixture<OverlayTrigger>(
            (() => html`
                <overlay-trigger placement="right-start" open="longpress">
                    <sp-action-button
                        slot="trigger"
                        hold-affordance
                        @sp-opened=${() => openedSpy()}
                        @sp-closed=${() => closedSpy()}
                    >
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-popover slot="longpress-content" tip></sp-popover>
                </overlay-trigger>
            `)()
        );
        await elementUpdated(el);

        await waitUntil(
            () => openedSpy.calledOnce,
            'longpress content projected to overlay',
            { timeout: 2000 }
        );

        el.removeAttribute('open');
        await elementUpdated(el);

        await waitUntil(
            () => closedSpy.calledOnce,
            'longpress content returned',
            { timeout: 2000 }
        );
    });
});
