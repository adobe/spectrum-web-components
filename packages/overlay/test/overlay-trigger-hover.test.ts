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
    aTimeout,
    elementUpdated,
    expect,
    fixture,
    html,
    nextFrame,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js';
import { OverlayTrigger } from '@spectrum-web-components/overlay';
import { spy } from 'sinon';
import { ActionButton } from '@spectrum-web-components/action-button';
import { sendKeys } from '@web/test-runner-commands';
import { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import { TemplateResult } from '@spectrum-web-components/base';
import { Theme } from '@spectrum-web-components/theme';
import { Tooltip } from '@spectrum-web-components/tooltip';
import { sendMouse } from '../../../test/plugins/browser.js';

async function styledFixture<T extends Element>(
    story: TemplateResult
): Promise<T> {
    const test = await fixture<Theme>(html`
        <sp-theme theme="spectrum" scale="medium" color="light">
            ${story}
        </sp-theme>
    `);
    return test.children[0] as T;
}

describe('Overlay Trigger - Hover', () => {
    afterEach(async () => {
        const triggers = [
            ...document.querySelectorAll('overlay-trigger'),
        ] as OverlayTrigger[];
        const promises = triggers.map((trigger) => {
            if (trigger.open) {
                const closed = oneEvent(trigger, 'sp-closed');
                trigger.open = undefined;
                return closed;
            }
            return Promise.resolve();
        });
        await Promise.all(promises);
    });
    beforeEach(async () => {
        // Something about this prevents Chromium from swallowing the CSS transitions
        // to "open" so that test timing can be properly acquired below.
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [0, 0],
                },
            ],
        });
    });
    it('displays `hover` declaratively', async () => {
        const openedSpy = spy();
        const closedSpy = spy();
        const el = await fixture<OverlayTrigger>(
            (() => html`
                <overlay-trigger
                    placement="right-start"
                    open="hover"
                    @sp-opened=${() => openedSpy()}
                    @sp-closed=${() => closedSpy()}
                >
                    <sp-action-button slot="trigger">
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-popover slot="hover-content" tip></sp-popover>
                </overlay-trigger>
            `)()
        );
        await elementUpdated(el);

        await waitUntil(
            () => openedSpy.calledOnce,
            'hover content projected to overlay',
            { timeout: 2000 }
        );

        el.removeAttribute('open');
        await elementUpdated(el);

        await waitUntil(() => closedSpy.calledOnce, 'hover content returned', {
            timeout: 2000,
        });
    });
    describe('"tooltip" mouse interactions', () => {
        let el: OverlayTrigger;
        let button: ActionButton;
        let tooltip: Tooltip;
        beforeEach(async () => {
            el = await fixture<OverlayTrigger>(
                (() => html`
                    <overlay-trigger placement="right-start">
                        <sp-action-button slot="trigger">
                            <sp-icon-magnify slot="icon"></sp-icon-magnify>
                        </sp-action-button>
                        <sp-tooltip slot="hover-content" tip>
                            Magnify
                        </sp-tooltip>
                    </overlay-trigger>
                `)()
            );
            await elementUpdated(el);
            button = el.querySelector('sp-action-button') as ActionButton;
            tooltip = el.querySelector('sp-tooltip') as Tooltip;
        });
        it('allows pointer to enter the "tooltip" without closing the "tooltip"', async () => {
            const opened = oneEvent(button, 'sp-opened');
            button.dispatchEvent(
                new MouseEvent('mouseenter', {
                    bubbles: true,
                    composed: true,
                })
            );
            await nextFrame();
            button.dispatchEvent(
                new MouseEvent('mouseleave', {
                    relatedTarget: tooltip,
                    bubbles: true,
                    composed: true,
                })
            );
            await nextFrame();
            tooltip.dispatchEvent(
                new MouseEvent('mouseleave', {
                    relatedTarget: button,
                    bubbles: true,
                    composed: true,
                })
            );
            await opened;

            expect(el.open).to.equal('hover');

            const closed = oneEvent(button, 'sp-closed');
            button.dispatchEvent(
                new MouseEvent('mouseleave', {
                    bubbles: true,
                    composed: true,
                })
            );
            await closed;

            expect(el.open).to.be.null;
        });
        it('closes the "tooltip" when leaving the "tooltip"', async () => {
            const opened = oneEvent(button, 'sp-opened');
            button.dispatchEvent(
                new MouseEvent('mouseenter', {
                    bubbles: true,
                    composed: true,
                })
            );
            await nextFrame();
            button.dispatchEvent(
                new MouseEvent('mouseleave', {
                    relatedTarget: tooltip,
                    bubbles: true,
                    composed: true,
                })
            );
            await opened;

            expect(el.open).to.equal('hover');

            const closed = oneEvent(button, 'sp-closed');
            tooltip.dispatchEvent(
                new MouseEvent('mouseleave', {
                    bubbles: true,
                    composed: true,
                })
            );
            await closed;

            expect(el.open).to.be.null;
        });
    });
    it('persists hover content', async () => {
        const el = await fixture<OverlayTrigger>(
            (() => html`
                <overlay-trigger placement="right-start">
                    <sp-action-button slot="trigger">
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-popover slot="hover-content" tip></sp-popover>
                </overlay-trigger>
            `)()
        );
        await elementUpdated(el);

        expect(el.open).to.be.undefined;

        const trigger = el.querySelector('[slot="trigger"]') as ActionButton;
        trigger.dispatchEvent(
            new Event('mouseenter', {
                bubbles: true,
            })
        );

        await elementUpdated(el);

        expect(el.open).to.equal('hover');

        trigger.click();

        await elementUpdated(el);

        expect(el.open).to.equal('hover');
    });
    it('closes persistent hover content on `longpress`', async () => {
        const el = await fixture<OverlayTrigger>(
            (() => html`
                <overlay-trigger placement="right-start">
                    <sp-action-button slot="trigger">
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-popover slot="hover-content" tip></sp-popover>
                    <sp-popover slot="longpress-content" tip></sp-popover>
                </overlay-trigger>
            `)()
        );
        await elementUpdated(el);

        expect(el.open).to.be.undefined;

        const trigger = el.querySelector('[slot="trigger"]') as ActionButton;
        trigger.dispatchEvent(
            new Event('mouseenter', {
                bubbles: true,
            })
        );

        await elementUpdated(el);

        expect(el.open).to.equal('hover');

        trigger.dispatchEvent(
            new Event('longpress', {
                bubbles: true,
            })
        );

        await elementUpdated(el);

        expect(el.open).to.equal('longpress');
    });
    it('closes `hover` overlay when [type="modal"]', async () => {
        const el = await fixture<OverlayTrigger>(
            (() => html`
                <overlay-trigger placement="right-start" type="modal">
                    <sp-action-button slot="trigger">
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-popover slot="hover-content" tip></sp-popover>
                </overlay-trigger>
            `)()
        );
        await elementUpdated(el);

        expect(el.open).to.be.undefined;

        const trigger = el.querySelector('[slot="trigger"]') as ActionButton;
        const opened = oneEvent(el, 'sp-opened');
        trigger.focus();
        await opened;

        await elementUpdated(el);
        await aTimeout(500);

        expect(el.open).to.equal('hover');

        const closed = oneEvent(el, 'sp-closed');
        trigger.blur();
        await closed;

        await elementUpdated(el);

        expect(el.open).to.be.null;
    });
    it('will not return focus to a "modal" parent', async () => {
        // There is an `sp-dialog-base` recyling issue in Firefox
        if (/Firefox/.test(window.navigator.userAgent)) {
            return;
        }
        const el = await styledFixture<OverlayTrigger>(html`
            <overlay-trigger type="modal" placement="none">
                <sp-button slot="trigger">Toggle Dialog</sp-button>
                <sp-dialog-wrapper
                    slot="click-content"
                    headline="Dialog title"
                    size="s"
                >
                    ${[1, 2, 3, 4].map(
                        (index) => html`
                            <overlay-trigger>
                                <sp-button slot="trigger" id="button-${index}">
                                    Button with Tooltip ${index}
                                </sp-button>
                                <sp-tooltip slot="hover-content">
                                    Tooltip ${index}
                                </sp-tooltip>
                            </overlay-trigger>
                        `
                    )}
                </sp-dialog-wrapper>
            </overlay-trigger>
        `);
        await elementUpdated(el);

        const button = el.querySelector('sp-button') as Button;
        const dialog = el.querySelector('sp-dialog-wrapper') as HTMLElement;
        await elementUpdated(button);
        await elementUpdated(dialog);

        let opened = oneEvent(button, 'sp-opened');
        button.dispatchEvent(new Event('click', { bubbles: true }));
        await opened;
        const button1 = dialog.querySelector('#button-1') as Button;
        const button2 = dialog.querySelector('#button-2') as Button;

        opened = oneEvent(button1, 'sp-opened');
        sendKeys({
            press: 'Tab',
        });
        await opened;

        await nextFrame();

        expect(button1 === document.activeElement).to.be.true;

        opened = oneEvent(button2, 'sp-opened');
        sendKeys({
            press: 'Tab',
        });
        await opened;

        await nextFrame();

        expect(button2 === document.activeElement).to.be.true;
    });
});
