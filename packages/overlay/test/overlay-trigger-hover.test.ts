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
import {
    fixture,
    ignoreResizeObserverLoopError,
} from '../../../test/testing-helpers.js';

ignoreResizeObserverLoopError(before, after);

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
                new MouseEvent('pointerenter', {
                    bubbles: true,
                    composed: true,
                })
            );
            await nextFrame();
            await nextFrame();
            await nextFrame();
            await nextFrame();
            expect(tooltip.open).to.be.true;
            button.dispatchEvent(
                new MouseEvent('pointerleave', {
                    relatedTarget: tooltip,
                    bubbles: true,
                    composed: true,
                })
            );
            await nextFrame();
            tooltip.dispatchEvent(
                new MouseEvent('pointerleave', {
                    relatedTarget: button,
                    bubbles: true,
                    composed: true,
                })
            );
            await opened;

            expect(el.open).to.equal('hover');

            const closed = oneEvent(button, 'sp-closed');
            button.dispatchEvent(
                new MouseEvent('pointerleave', {
                    relatedTarget: null,
                    bubbles: true,
                    composed: true,
                })
            );
            await closed;

            expect(el.open).to.be.undefined;
        });
        it('closes the "tooltip" when leaving the "tooltip"', async () => {
            const opened = oneEvent(button, 'sp-opened');
            button.dispatchEvent(
                new MouseEvent('pointerenter', {
                    bubbles: true,
                    composed: true,
                })
            );
            await nextFrame();
            button.dispatchEvent(
                new MouseEvent('pointerleave', {
                    relatedTarget: tooltip,
                    bubbles: true,
                    composed: true,
                })
            );
            await opened;

            expect(el.open).to.equal('hover');

            const closed = oneEvent(button, 'sp-closed');
            tooltip.dispatchEvent(
                new MouseEvent('pointerleave', {
                    relatedTarget: null,
                    bubbles: true,
                    composed: true,
                })
            );
            await closed;

            expect(el.open).to.be.undefined;
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
        const opened = oneEvent(trigger, 'sp-opened');
        trigger.dispatchEvent(
            new Event('pointerenter', {
                bubbles: true,
                composed: true,
            })
        );
        await opened;

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
        let opened = oneEvent(trigger, 'sp-opened');
        trigger.dispatchEvent(
            new Event('pointerenter', {
                bubbles: true,
            })
        );
        await opened;

        expect(el.open).to.equal('hover');

        opened = oneEvent(trigger, 'sp-opened');
        trigger.dispatchEvent(
            new Event('longpress', {
                bubbles: true,
            })
        );
        await opened;

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

        expect(el.open).to.equal('hover');

        const closed = oneEvent(el, 'sp-closed');
        trigger.blur();
        await closed;

        expect(el.open).to.be.undefined;
    });
    it('will not return focus to a "modal" parent', async () => {
        const el = await styledFixture<OverlayTrigger>(html`
            <overlay-trigger type="modal">
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
        const button1 = dialog.querySelector('#button-1') as Button;
        const button2 = dialog.querySelector('#button-2') as Button;
        const button3 = dialog.querySelector('#button-3') as Button;
        await elementUpdated(button);
        await elementUpdated(dialog);

        let opened = oneEvent(button, 'sp-opened');
        const openedHint = oneEvent(button1, 'sp-opened');
        button.dispatchEvent(new Event('click', { bubbles: true }));
        await opened;
        await openedHint;

        expect(button1 === document.activeElement).to.be.true;

        opened = oneEvent(button2, 'sp-opened');
        sendKeys({
            press: 'Tab',
        });
        await opened;

        expect(button2 === document.activeElement).to.be.true;

        opened = oneEvent(button3, 'sp-opened');
        sendKeys({
            press: 'Tab',
        });
        await opened;

        expect(button3 === document.activeElement).to.be.true;
    });
});
