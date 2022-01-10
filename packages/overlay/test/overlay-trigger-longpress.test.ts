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
    waitUntil,
} from '@open-wc/testing';
import { ActionButton } from '@spectrum-web-components/action-button';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js';
import { Popover } from '@spectrum-web-components/popover';
import '@spectrum-web-components/popover/sp-popover.js';
import { OverlayTrigger } from '..';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import {
    a11ySnapshot,
    findAccessibilityNode,
    sendKeys,
} from '@web/test-runner-commands';
import { spy } from 'sinon';
import '@spectrum-web-components/base';

type DescribedNode = {
    name: string;
    description: string;
};

const findDescribedNode = async (
    name: string,
    description: string
): Promise<void> => {
    const isWebkit =
        /AppleWebKit/.test(window.navigator.userAgent) &&
        !/Chrome/.test(window.navigator.userAgent);

    const snapshot = (await a11ySnapshot({})) as unknown as DescribedNode & {
        children: DescribedNode[];
    };
    const node = findAccessibilityNode<DescribedNode>(
        snapshot,
        (node) =>
            node.name === name &&
            (node.description === description ||
                // if we're in Safari and there's no description, we still want to have it exist
                (isWebkit && typeof node.description === 'undefined'))
    );
    //console.log(JSON.stringify(snapshot, null, '  '));
    expect(node, '`name`ed with `description`').to.not.be.null;

    if (isWebkit) {
        const webkitNode = findAccessibilityNode<DescribedNode>(
            snapshot,
            (node) => node.name === name && node.description === description
        );
        expect(webkitNode).to.be.null;
    }
};

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
        /* This test passes because OverlayTrigger adds a new node to describe
           the longpress interaction now available on the trigger element
        */
        expect(el.childNodes.length, 'always').to.equal(6);

        await findDescribedNode(
            'Trigger with hold affordance',
            'Press Alt+Down Arrow for additional options'
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
            'Press Alt+Down Arrow for additional options'
        );

        const closed = oneEvent(el, 'sp-closed');

        await sendKeys({
            press: 'Escape',
        });
        await closed;

        expect(el.open).to.be.null;
        expect(trigger.hasAttribute('aria-describedby')).to.be.true;
        expect(el.childNodes.length, 'always').to.equal(6);

        await findDescribedNode(
            'Trigger with hold affordance',
            'Press Alt+Down Arrow for additional options'
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

        expect(el.hasLongpressContent).to.be.true;
        expect(el.childNodes.length, 'always').to.equal(6);

        el.removeAttribute('hold-affordance');
        el.removeChild(content);

        await elementUpdated(el);

        expect(trigger.hasAttribute('aria-describedby')).to.be.false;
        expect(el.hasLongpressContent).to.be.false;
        expect(el.childNodes.length, 'always').to.equal(4);

        el.setAttribute('hold-affordance', 'true');
        el.append(content);

        await elementUpdated(el);
        await findDescribedNode(
            'Trigger with hold affordance',
            'Press Alt+Down Arrow for additional options'
        );

        expect(el.hasLongpressContent).to.be.true;
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
        const firstTrigger = document.getElementById(
            'first-trigger'
        ) as OverlayTrigger;
        const secondTrigger = document.getElementById(
            'second-trigger'
        ) as OverlayTrigger;

        expect(firstTrigger.hasLongpressContent).to.be.true;
        expect(secondTrigger.hasLongpressContent).to.be.true;
        expect(div.childNodes.length, 'always').to.equal(5);

        await findDescribedNode(
            'First button',
            'Press Alt+Down Arrow for additional options'
        );
        await findDescribedNode(
            'Second button',
            'Press Alt+Down Arrow for additional options'
        );
    });
    // TO-DO: figure out a way to make the message different depending on the type of interaction
    it('describes interactions differently to the user', async () => {
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
        const open = oneEvent(el, 'sp-opened');
        //const closed = oneEvent(el, 'sp-closed');
        const trigger = el.querySelector('sp-action-button') as HTMLElement;
        const content = el.querySelector(
            '[slot="longpress-content"]'
        ) as Popover;

        await elementUpdated(el);

        expect(trigger).to.not.be.null;
        expect(content).to.not.be.null;
        expect(trigger.hasAttribute('aria-describedby')).to.be.true;
        expect(content.open).to.be.false;

        trigger.focus();

        // the user... uses (keyboard, pointer, mouse, whatever)
        sendKeys({
            press: 'Alt+ArrowDown',
        });
        await open;
        // if focus:visible --> person is using a keyboard --> tell user to activate longpress via (space/alt+down) for add. opts
        await findDescribedNode(
            'Trigger with hold affordance',
            'Press Alt+Down Arrow for additional options'
        );
    });
});
