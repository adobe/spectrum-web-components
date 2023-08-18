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
    html,
    nextFrame,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import { ActionButton } from '@spectrum-web-components/action-button';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js';
import { Popover } from '@spectrum-web-components/popover';
import '@spectrum-web-components/popover/sp-popover.js';
import {
    LONGPRESS_INSTRUCTIONS,
    OverlayTrigger,
} from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';
import { sendMouse } from '../../../test/plugins/browser.js';
import { findDescribedNode } from '../../../test/testing-helpers-a11y.js';
import { fixture, isOnTopLayer } from '../../../test/testing-helpers.js';
import { longpress } from '../stories/overlay.stories.js';

describe('Overlay Trigger - Longpress', () => {
    describe('responds to input', () => {
        beforeEach(async function () {
            this.el = await fixture<OverlayTrigger>(longpress());
            this.trigger = this.el.querySelector(
                'sp-action-button'
            ) as ActionButton;
            this.content = this.el.querySelector(
                '[slot="longpress-content"]'
            ) as Popover;

            expect(this.trigger).to.not.be.null;
            expect(this.content).to.not.be.null;
            expect(this.content.open).to.be.false;

            this.trigger.focus();
        });
        afterEach(async function () {
            if (this.el.open) {
                const closed = oneEvent(this.trigger, 'sp-closed');
                this.el.open = undefined;
                await closed;
            }
        });
        it.skip('opens/closes for `Space`', async function () {
            const open = oneEvent(this.el, 'sp-opened');
            await sendKeys({
                press: 'Space',
            });
            await open;
            expect(this.content.open, 'opens for `Space`').to.be.true;
            expect(await isOnTopLayer(this.content)).to.be.true;

            const closed = oneEvent(this.el, 'sp-closed');
            sendMouse({
                steps: [
                    {
                        type: 'click',
                        position: [500, 20],
                    },
                ],
            });
            await closed;

            expect(this.content.open, 'closes for `Space`').to.be.false;
            expect(await isOnTopLayer(this.content)).to.be.false;
        });
        it.skip('opens/closes for `Alt+ArrowDown`', async function () {
            const open = oneEvent(this.el, 'sp-opened');
            sendKeys({
                press: 'Alt+ArrowDown',
            });
            await open;
            expect(this.content.open, 'opens for `Alt+ArrowDown`').to.be.true;
            expect(await isOnTopLayer(this.content)).to.be.true;
            const closed = oneEvent(this.el, 'sp-closed');
            await sendKeys({
                press: 'Escape',
            });
            await closed;
            expect(this.content.open, 'closes for `Alt+ArrowDown`').to.be.false;
            expect(await isOnTopLayer(this.content)).to.be.false;
        });
        it.skip('opens/closes for `longpress`', async function () {
            let open = oneEvent(this.el, 'sp-opened');
            const rect = this.trigger.getBoundingClientRect();
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: [
                            rect.left + rect.width / 2,
                            rect.top + rect.height / 2,
                        ],
                    },
                    {
                        type: 'down',
                    },
                ],
            });
            // Hover content opens, first.
            await open;
            open = oneEvent(this.el, 'sp-opened');
            // Then, the longpress content opens.
            await open;
            await sendMouse({
                steps: [
                    {
                        type: 'up',
                    },
                ],
            });
            expect(this.content.open, 'opens for `pointerdown`').to.be.true;
            expect(await isOnTopLayer(this.content)).to.be.true;
            const closed = oneEvent(this.trigger, 'sp-closed');
            await sendKeys({
                press: 'Escape',
            });
            await closed;
            expect(this.content.open, 'closes for `pointerdown`').to.be.false;
            expect(await isOnTopLayer(this.content)).to.be.false;
        });
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
    it('describes longpress interaction accessibly', async () => {
        const el = await fixture<OverlayTrigger>(
            html`
                <overlay-trigger placement="right-start">
                    <sp-action-button slot="trigger" hold-affordance>
                        Trigger with hold affordance
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
            `
        );
        const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;

        await elementUpdated(el);

        expect(trigger.hasAttribute('aria-describedby')).to.be.true;
        expect(el.open).to.be.undefined;
        /*
         * This test passes because `<sp-overlay>` adds a new node to describe
         * the longpress interaction now available on the trigger element
         */
        expect(el.childNodes.length, 'always').to.equal(6);

        await findDescribedNode(
            'Trigger with hold affordance',
            LONGPRESS_INSTRUCTIONS.keyboard
        );

        const opened = oneEvent(el, 'sp-opened');
        trigger.dispatchEvent(
            new Event('longpress', { bubbles: true, composed: true })
        );
        await opened;

        expect(el.open).to.equal('longpress');
        expect(el.childNodes.length, 'always').to.equal(6);

        await findDescribedNode(
            'Trigger with hold affordance',
            LONGPRESS_INSTRUCTIONS.keyboard
        );

        const closed = oneEvent(el, 'sp-closed');
        sendKeys({
            press: 'Escape',
        });
        await closed;

        expect(el.open).to.be.undefined;
        expect(trigger.hasAttribute('aria-describedby')).to.be.true;
        expect(el.childNodes.length, 'always').to.equal(6);

        await findDescribedNode(
            'Trigger with hold affordance',
            LONGPRESS_INSTRUCTIONS.keyboard
        );
    });
    it('removes longpress `aria-describedby` description element when longpress content is removed', async () => {
        const el = await fixture<OverlayTrigger>(
            html`
                <overlay-trigger placement="right-start">
                    <sp-action-button slot="trigger" hold-affordance>
                        Trigger with hold affordance
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
            `
        );
        const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
        const content = el.querySelector(
            '[slot="longpress-content"]'
        ) as Popover;
        await elementUpdated(el);

        expect(trigger.hasAttribute('aria-describedby')).to.be.true;
        expect(el.childNodes.length, 'always').to.equal(6);

        el.removeAttribute('hold-affordance');
        content.remove();

        await elementUpdated(el);

        expect(trigger.hasAttribute('aria-describedby')).to.be.false;
        expect(el.childNodes.length, 'always').to.equal(4);

        el.setAttribute('hold-affordance', 'true');
        el.append(content);

        await elementUpdated(el);
        await nextFrame();
        await nextFrame();

        await findDescribedNode(
            'Trigger with hold affordance',
            LONGPRESS_INSTRUCTIONS.keyboard
        );

        expect(el.childNodes.length, 'always').to.equal(6);
    });
    it('recognises multiple overlay triggers in a11y tree', async () => {
        const el = await fixture<OverlayTrigger>(
            html`
                <div id="container">
                    <overlay-trigger id="first-trigger" placement="right-start">
                        <sp-action-button slot="trigger" hold-affordance>
                            First button
                        </sp-action-button>
                        <sp-popover slot="longpress-content" tip>
                            <sp-action-group
                                selects="single"
                                vertical
                                style="margin: calc(var(--spectrum-actiongroup-button-gap-y,var(--spectrum-global-dimension-size-100)) / 2);"
                            >
                                <sp-action-button>
                                    <sp-icon-magnify
                                        slot="icon"
                                    ></sp-icon-magnify>
                                </sp-action-button>
                            </sp-action-group>
                        </sp-popover>
                    </overlay-trigger>
                    <overlay-trigger id="second-trigger" placement="left-start">
                        <sp-action-button slot="trigger" hold-affordance>
                            Second button
                        </sp-action-button>
                        <sp-popover slot="longpress-content" tip>
                            <sp-action-group
                                selects="single"
                                vertical
                                style="margin: calc(var(--spectrum-actiongroup-button-gap-y,var(--spectrum-global-dimension-size-100)) / 2);"
                            >
                                <sp-action-button>
                                    <sp-icon-magnify
                                        slot="icon"
                                    ></sp-icon-magnify>
                                </sp-action-button>
                            </sp-action-group>
                        </sp-popover>
                    </overlay-trigger>
                </div>
            `
        );
        await elementUpdated(el);

        const div = document.getElementById('container') as HTMLElement;

        expect(div.childNodes.length, 'always').to.equal(5);

        await findDescribedNode(
            'First button',
            LONGPRESS_INSTRUCTIONS.keyboard
        );
        await findDescribedNode(
            'Second button',
            LONGPRESS_INSTRUCTIONS.keyboard
        );
    });
    it('describes interactions differently to the user', async () => {
        const test = await fixture<OverlayTrigger>(
            html`
                <div>
                    <input id="first" />
                    <overlay-trigger placement="right-start">
                        <sp-action-button slot="trigger" hold-affordance>
                            Trigger with hold affordance
                        </sp-action-button>
                        <sp-popover slot="longpress-content" tip>
                            <sp-action-group
                                selects="single"
                                vertical
                                style="margin: calc(var(--spectrum-actiongroup-button-gap-y,var(--spectrum-global-dimension-size-100)) / 2);"
                            >
                                <sp-action-button>
                                    <sp-icon-magnify
                                        slot="icon"
                                    ></sp-icon-magnify>
                                </sp-action-button>
                                <sp-action-button>
                                    <sp-icon-magnify
                                        slot="icon"
                                    ></sp-icon-magnify>
                                </sp-action-button>
                                <sp-action-button>
                                    <sp-icon-magnify
                                        slot="icon"
                                    ></sp-icon-magnify>
                                </sp-action-button>
                            </sp-action-group>
                        </sp-popover>
                    </overlay-trigger>
                    <input id="last" />
                </div>
            `
        );
        const el = test.querySelector('overlay-trigger') as OverlayTrigger;
        const first = test.querySelector('#first') as HTMLElement;
        const firstRect = first.getBoundingClientRect();
        const trigger = el.querySelector('sp-action-button') as HTMLElement;
        const content = el.querySelector(
            '[slot="longpress-content"]'
        ) as Popover;

        await elementUpdated(el);

        expect(trigger).to.not.be.null;
        expect(content).to.not.be.null;
        expect(trigger.hasAttribute('aria-describedby')).to.be.true;
        expect(content.open).to.be.false;

        first.focus();

        await sendKeys({
            press: 'Tab',
        });

        expect(document.activeElement === trigger, 'Trigger focused').to.be
            .true;

        await findDescribedNode(
            'Trigger with hold affordance',
            LONGPRESS_INSTRUCTIONS.keyboard
        );

        await sendKeys({
            press: 'Tab',
        });

        await findDescribedNode(
            'Trigger with hold affordance',
            LONGPRESS_INSTRUCTIONS.keyboard
        );

        /*
         * The following re-establishes that focus is not visible
         * for this portion of the test. That way, the LONGPRESS_INSTRUCTIONS
         * change appropriately depending on the type of interaction.
         */
        await sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [firstRect.x, firstRect.y],
                },
            ],
        });

        trigger.focus();

        await nextFrame();
        await nextFrame();

        await findDescribedNode(
            'Trigger with hold affordance',
            LONGPRESS_INSTRUCTIONS.keyboard
        );
    });
});
