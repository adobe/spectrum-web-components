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
    oneEvent,
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
        let open = oneEvent(el, 'sp-opened');
        await sendKeys({
            press: 'Space',
        });
        await open;
        expect(content.open, 'opens for `Space`').to.be.true;

        let closed = oneEvent(el, 'sp-closed');
        document.body.click();
        await closed;

        expect(!content.open, 'closes for `Space`').to.be.true;

        trigger.focus();
        open = oneEvent(el, 'sp-opened');
        sendKeys({
            press: 'Alt+ArrowDown',
        });
        await open;
        expect(content.open, 'opens for `Alt+ArrowDown`').to.be.true;
        closed = oneEvent(el, 'sp-closed');
        await sendKeys({
            press: 'Escape',
        });
        await closed;
        expect(!content.open, 'closes for `Alt+ArrowDown`').to.be.true;
        await elementUpdated(el);

        open = oneEvent(el, 'sp-opened');
        trigger.dispatchEvent(new Event('pointerdown'));
        await open;
        expect(content.open, 'opens for `pointerdown`').to.be.true;
        closed = oneEvent(el, 'sp-closed');
        await sendKeys({
            press: 'Escape',
        });
        await closed;
        expect(!content.open, 'closes for `pointerdown`').to.be.true;
    });
    it('displays `longpress` declaratively', async () => {
        const openedSpy = spy();
        const closedSpy = spy();
        const el = await fixture<OverlayTrigger>(
            (() => html`
                <overlay-trigger
                    placement="right-start"
                    open="longpress"
                    @sp-opened=${() => openedSpy()}
                    @sp-closed=${() => closedSpy()}
                >
                    <sp-action-button slot="trigger" hold-affordance>
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

        const closed = oneEvent(el, 'sp-closed');
        el.removeAttribute('open');
        await closed;

        expect(closedSpy.calledOnce, 'longpress content returned').to.be.true;
    });
});
