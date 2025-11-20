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
    elementUpdated,
    expect,
    html,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import { ActionButton } from '@spectrum-web-components/action-button';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { TemplateResult } from '@spectrum-web-components/base';
import { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js';
import { OverlayTrigger } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/popover/sp-popover.js';
import { Theme } from '@spectrum-web-components/theme';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import { Tooltip } from '@spectrum-web-components/tooltip';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { spy } from 'sinon';
import {
    fixture,
    ignoreResizeObserverLoopError,
    mouseMoveAway,
    mouseMoveOver,
    sendShiftTabKey,
    sendTabKey,
} from '../../../test/testing-helpers.js';

ignoreResizeObserverLoopError(before, after);

async function styledFixture<T extends Element>(
    story: TemplateResult
): Promise<T> {
    const test = await fixture<Theme>(html`
        <sp-theme system="spectrum" scale="medium" color="light">
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
                    triggered-by="hover"
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
        const trigger = el.querySelector('[slot="trigger"]') as ActionButton;

        await mouseMoveOver(trigger);
        await elementUpdated(el);

        await waitUntil(
            () => openedSpy.calledOnce,
            'hover content projected to overlay',
            { timeout: 2000 }
        );

        await mouseMoveAway(trigger);
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
                    <overlay-trigger
                        placement="right-start"
                        triggered-by="hover"
                    >
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
            await waitUntil(
                () => tooltip.open === true,
                'tooltip should open',
                { timeout: 500 }
            );
            expect(tooltip.open).to.be.true;

            button.dispatchEvent(
                new MouseEvent('pointerleave', {
                    bubbles: true,
                    composed: true,
                })
            );
            await elementUpdated(tooltip);

            tooltip.dispatchEvent(
                new MouseEvent('pointerenter', {
                    bubbles: true,
                    composed: true,
                })
            );
            await elementUpdated(tooltip);
            expect(tooltip.open).to.be.true;

            tooltip.dispatchEvent(
                new MouseEvent('pointerleave', {
                    bubbles: true,
                    composed: true,
                })
            );
            await elementUpdated(tooltip);

            button.dispatchEvent(
                new MouseEvent('pointerenter', {
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
            await elementUpdated(tooltip);
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
        it('closes the "tooltip" on "escape" keydown', async () => {
            // Open the tooltip
            const opened = oneEvent(button, 'sp-opened');
            button.dispatchEvent(
                new MouseEvent('pointerenter', {
                    bubbles: true,
                    composed: true,
                })
            );
            await waitUntil(
                () => tooltip.open === true,
                'tooltip should open',
                { timeout: 500 }
            );
            await opened;
            expect(el.open).to.equal('hover');

            // Test escape key closes tooltip when focus is not on trigger
            const body = el.ownerDocument.body;
            body.focus();
            const closed = oneEvent(button, 'sp-closed');
            const escapeKeydown = new KeyboardEvent('keydown', {
                code: 'Escape',
                bubbles: true,
                composed: true,
            });
            body.dispatchEvent(escapeKeydown);
            await closed;
            expect(el.open).to.be.undefined;
        });
    });
    it('persists hover content', async () => {
        const el = await fixture<OverlayTrigger>(
            (() => html`
                <overlay-trigger placement="right-start" triggered-by="hover">
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
                <overlay-trigger
                    placement="right-start"
                    triggered-by="hover longpress"
                >
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
                <overlay-trigger
                    placement="right-start"
                    type="modal"
                    triggered-by="hover"
                >
                    <sp-action-button slot="trigger">
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-popover slot="hover-content" tip></sp-popover>
                </overlay-trigger>
            `)()
        );
        await elementUpdated(el);
        const input = document.createElement('input');
        el.insertAdjacentElement('beforebegin', input);

        expect(el.open).to.be.undefined;

        const trigger = el.querySelector('[slot="trigger"]') as ActionButton;
        const opened = oneEvent(el, 'sp-opened');
        input.focus();
        await sendTabKey();
        await opened;

        expect(el.open).to.equal('hover');

        const closed = oneEvent(el, 'sp-closed');
        trigger.blur();
        await closed;

        expect(el.open).to.be.undefined;
    });
    it('will not return focus to a "modal" parent', async () => {
        const el = await styledFixture<OverlayTrigger>(html`
            <overlay-trigger type="modal" triggered-by="click">
                <sp-button slot="trigger">Toggle Dialog</sp-button>
                <sp-dialog-wrapper
                    slot="click-content"
                    headline="Dialog title"
                    size="s"
                >
                    ${[1, 2, 3, 4].map(
                        (index) => html`
                            <overlay-trigger triggered-by="hover">
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
        await sendTabKey();
        await opened;

        expect(button2 === document.activeElement).to.be.true;

        opened = oneEvent(button3, 'sp-opened');
        await sendTabKey();
        await opened;

        expect(button3 === document.activeElement).to.be.true;
    });
    describe('nested overlays focus management', () => {
        it('closes nested hover overlay without closing parent modal when focus leaves nested overlay', async () => {
            const el = await styledFixture<OverlayTrigger>(html`
                <overlay-trigger type="modal" triggered-by="click">
                    <sp-button slot="trigger">Toggle Dialog</sp-button>
                    <sp-dialog-wrapper
                        slot="click-content"
                        headline="Dialog with hover tooltips"
                        size="s"
                    >
                        <overlay-trigger
                            triggered-by="hover"
                            id="tooltip-trigger-1"
                        >
                            <sp-button slot="trigger" id="button-1">
                                Button with Tooltip 1
                            </sp-button>
                            <sp-tooltip slot="hover-content" id="tooltip-1">
                                Tooltip content 1
                            </sp-tooltip>
                        </overlay-trigger>
                        <overlay-trigger
                            triggered-by="hover"
                            id="tooltip-trigger-2"
                        >
                            <sp-button slot="trigger" id="button-2">
                                Button with Tooltip 2
                            </sp-button>
                            <sp-tooltip slot="hover-content" id="tooltip-2">
                                Tooltip content 2
                            </sp-tooltip>
                        </overlay-trigger>
                    </sp-dialog-wrapper>
                </overlay-trigger>
            `);
            await elementUpdated(el);

            const button = el.querySelector('sp-button') as Button;
            const dialog = el.querySelector('sp-dialog-wrapper') as HTMLElement;
            const button1 = dialog.querySelector('#button-1') as Button;
            const button2 = dialog.querySelector('#button-2') as Button;
            const tooltipTrigger1 = dialog.querySelector(
                '#tooltip-trigger-1'
            ) as OverlayTrigger;
            const tooltipTrigger2 = dialog.querySelector(
                '#tooltip-trigger-2'
            ) as OverlayTrigger;

            // Open the modal dialog
            const opened = oneEvent(button, 'sp-opened');
            button.dispatchEvent(new Event('click', { bubbles: true }));
            await opened;

            expect(el.open).to.equal('click');

            // Focus button1 to open its tooltip
            button1.focus();
            await elementUpdated(tooltipTrigger1);
            await waitUntil(
                () => tooltipTrigger1.open === 'hover',
                'tooltip 1 opens on focus',
                { timeout: 500 }
            );

            expect(tooltipTrigger1.open).to.equal('hover');
            expect(el.open).to.equal('click'); // Modal should still be open

            // Tab to button2, which should close tooltip1 and open tooltip2
            await sendTabKey();
            await elementUpdated(tooltipTrigger1);
            await elementUpdated(tooltipTrigger2);

            // Wait for tooltip 2 to open
            await waitUntil(
                () => tooltipTrigger2.open === 'hover',
                'tooltip 2 opens on focus',
                { timeout: 500 }
            );

            // Verify button2 has focus
            expect(
                button2 === document.activeElement ||
                    button2.contains(document.activeElement)
            ).to.be.true;

            // Wait for tooltip 1 to close (with delay)
            await new Promise((resolve) => setTimeout(resolve, 400));
            await elementUpdated(tooltipTrigger1);

            expect(tooltipTrigger2.open).to.equal('hover');
            expect(tooltipTrigger1.open).to.be.undefined; // Tooltip 1 should be closed
            expect(el.open).to.equal('click'); // Modal should still be open

            // Shift+Tab back to button1
            await sendShiftTabKey();
            await elementUpdated(tooltipTrigger1);
            await elementUpdated(tooltipTrigger2);

            // Wait for tooltip 1 to open
            await waitUntil(
                () => tooltipTrigger1.open === 'hover',
                'tooltip 1 opens on reverse focus',
                { timeout: 500 }
            );

            // Verify button1 has focus again
            expect(
                button1 === document.activeElement ||
                    button1.contains(document.activeElement)
            ).to.be.true;

            // Wait for tooltip 2 to close (with delay)
            await new Promise((resolve) => setTimeout(resolve, 400));
            await elementUpdated(tooltipTrigger2);

            expect(tooltipTrigger1.open).to.equal('hover');
            expect(tooltipTrigger2.open).to.be.undefined; // Tooltip 2 should be closed
            expect(el.open).to.equal('click'); // Modal should still be open
        });

        it('maintains parent modal open when nested hover overlay closes on pointer leave', async () => {
            const el = await styledFixture<OverlayTrigger>(html`
                <overlay-trigger type="modal" triggered-by="click">
                    <sp-button slot="trigger">Toggle Dialog</sp-button>
                    <sp-dialog-wrapper
                        slot="click-content"
                        headline="Dialog with hover content"
                        size="s"
                    >
                        <overlay-trigger
                            triggered-by="hover"
                            id="popover-trigger"
                        >
                            <sp-button slot="trigger" id="button-with-popover">
                                Button with Popover
                            </sp-button>
                            <sp-tooltip
                                slot="hover-content"
                                id="nested-tooltip"
                            >
                                Tooltip content
                            </sp-tooltip>
                        </overlay-trigger>
                    </sp-dialog-wrapper>
                </overlay-trigger>
            `);
            await elementUpdated(el);

            const button = el.querySelector('sp-button') as Button;
            const dialog = el.querySelector('sp-dialog-wrapper') as HTMLElement;
            const buttonWithPopover = dialog.querySelector(
                '#button-with-popover'
            ) as Button;
            const popoverTrigger = dialog.querySelector(
                '#popover-trigger'
            ) as OverlayTrigger;

            // Open the modal dialog
            const opened = oneEvent(button, 'sp-opened');
            button.dispatchEvent(new Event('click', { bubbles: true }));
            await opened;
            await elementUpdated(dialog);
            await elementUpdated(buttonWithPopover);

            expect(el.open).to.equal('click');

            // Hover over the button to open tooltip
            buttonWithPopover.dispatchEvent(
                new MouseEvent('pointerenter', {
                    bubbles: true,
                    composed: true,
                })
            );
            await elementUpdated(popoverTrigger);
            await waitUntil(
                () => popoverTrigger.open === 'hover',
                'tooltip opens on hover',
                { timeout: 1000 }
            );

            expect(popoverTrigger.open).to.equal('hover');
            expect(el.open).to.equal('click'); // Modal should still be open

            // Find the rendered tooltip
            const nestedTooltip = document.querySelector(
                '#nested-tooltip'
            ) as HTMLElement;

            // Blur the button to ensure it doesn't keep tooltip open via focus
            buttonWithPopover.blur();
            await elementUpdated(popoverTrigger);

            // Dispatch pointerleave on button with tooltip as relatedTarget
            const closed = oneEvent(buttonWithPopover, 'sp-closed');
            buttonWithPopover.dispatchEvent(
                new MouseEvent('pointerleave', {
                    relatedTarget: nestedTooltip,
                    bubbles: true,
                    composed: true,
                })
            );
            await elementUpdated(popoverTrigger);

            // Then dispatch pointerleave on the tooltip itself
            if (nestedTooltip) {
                nestedTooltip.dispatchEvent(
                    new MouseEvent('pointerleave', {
                        relatedTarget: null,
                        bubbles: true,
                        composed: true,
                    })
                );
            }
            await closed;

            expect(popoverTrigger.open).to.be.undefined; // Tooltip should be closed
            expect(el.open).to.equal('click'); // Modal should still be open
        });
    });
    describe('keyboard navigation into hover content', () => {
        it('keeps hover content open when tabbing into interactive overlay content', async () => {
            const el = await styledFixture<OverlayTrigger>(html`
                <overlay-trigger placement="bottom" triggered-by="hover">
                    <sp-button slot="trigger">
                        Hover trigger with interactive content
                    </sp-button>
                    <sp-popover slot="hover-content">
                        <sp-button id="button-in-popover">
                            Interactive button
                        </sp-button>
                    </sp-popover>
                </overlay-trigger>
            `);
            await elementUpdated(el);

            const trigger = el.querySelector('[slot="trigger"]') as Button;
            const buttonInPopover = el.querySelector(
                '#button-in-popover'
            ) as Button;

            // Focus the trigger element
            trigger.focus();
            await elementUpdated(el);

            // Wait for hover content to open
            await waitUntil(
                () => el.open === 'hover',
                'hover content opens on focus',
                { timeout: 500 }
            );

            // Hover content should open when trigger receives focus
            expect(el.open).to.equal('hover');

            // Tab into the popover content
            await sendTabKey();
            await elementUpdated(el);

            // Wait for focus to move to button in popover
            await waitUntil(
                () =>
                    buttonInPopover === document.activeElement ||
                    buttonInPopover.contains(document.activeElement),
                'focus moved to button in popover',
                { timeout: 500 }
            );

            // Verify focus moved to button in popover
            expect(
                buttonInPopover === document.activeElement ||
                    buttonInPopover.contains(document.activeElement)
            ).to.be.true;

            // Wait beyond the hover delay to ensure content stays open
            await new Promise((resolve) => setTimeout(resolve, 400));
            await elementUpdated(el);

            // Hover content should still be open
            expect(el.open).to.equal('hover');
        });

        it('closes hover content after delay when tabbing out of both trigger and content', async () => {
            const theme = await fixture<Theme>(html`
                <sp-theme system="spectrum" scale="medium" color="light">
                    <input id="before-trigger" />
                    <overlay-trigger placement="bottom" triggered-by="hover">
                        <sp-button slot="trigger">Hover trigger</sp-button>
                        <sp-popover slot="hover-content">
                            <sp-button id="button-in-popover">
                                Interactive button
                            </sp-button>
                        </sp-popover>
                    </overlay-trigger>
                    <input id="after-trigger" />
                </sp-theme>
            `);
            await elementUpdated(theme);

            const el = theme.querySelector('overlay-trigger') as OverlayTrigger;
            const trigger = el.querySelector('[slot="trigger"]') as Button;
            const afterInput = theme.querySelector(
                '#after-trigger'
            ) as HTMLInputElement;

            // Focus the trigger element
            trigger.focus();
            await elementUpdated(el);
            await waitUntil(
                () => el.open === 'hover',
                'overlay should open on focus',
                { timeout: 500 }
            );

            expect(el.open).to.equal('hover');

            // Tab into the popover content
            await sendTabKey();
            await elementUpdated(el);

            expect(el.open).to.equal('hover');

            // Tab out of the popover content completely
            await sendTabKey();
            await elementUpdated(el);

            // Wait for focus to move out completely
            await waitUntil(
                () => afterInput === document.activeElement,
                'focus moved to input after overlay',
                { timeout: 500 }
            );

            // Verify focus moved out
            expect(afterInput === document.activeElement).to.be.true;

            // Should still be open initially
            expect(el.open).to.equal('hover');

            // Wait for the hover delay
            await new Promise((resolve) => setTimeout(resolve, 400));
            await elementUpdated(el);

            // Now it should be closed
            expect(el.open).to.be.undefined;
        });

        it('closes hover content after delay when using Shift+Tab to exit overlay content backwards', async () => {
            const theme = await fixture<Theme>(html`
                <sp-theme system="spectrum" scale="medium" color="light">
                    <input id="before-trigger" />
                    <overlay-trigger placement="bottom" triggered-by="hover">
                        <sp-button slot="trigger">Hover trigger</sp-button>
                        <sp-popover slot="hover-content">
                            <sp-button id="button-in-popover">
                                Interactive button
                            </sp-button>
                        </sp-popover>
                    </overlay-trigger>
                    <input id="after-trigger" />
                </sp-theme>
            `);
            await elementUpdated(theme);

            const el = theme.querySelector('overlay-trigger') as OverlayTrigger;
            const trigger = el.querySelector('[slot="trigger"]') as Button;
            const beforeInput = theme.querySelector(
                '#before-trigger'
            ) as HTMLInputElement;

            // Focus the trigger element
            trigger.focus();
            await elementUpdated(el);
            await waitUntil(
                () => el.open === 'hover',
                'overlay should open on focus',
                { timeout: 500 }
            );

            expect(el.open).to.equal('hover');

            // Tab into the popover content
            await sendTabKey();
            await elementUpdated(el);

            expect(el.open).to.equal('hover');

            // Shift+Tab back out of the popover content
            await sendShiftTabKey();
            await elementUpdated(el);

            // Wait for focus to return to trigger
            await waitUntil(
                () =>
                    trigger === document.activeElement ||
                    trigger.contains(document.activeElement),
                'focus returned to trigger',
                { timeout: 500 }
            );

            // Should still be open while trigger has focus
            expect(el.open).to.equal('hover');

            // Shift+Tab again to move focus before the trigger
            await sendShiftTabKey();
            await elementUpdated(el);

            // Wait for focus to move to input before overlay
            await waitUntil(
                () => beforeInput === document.activeElement,
                'focus moved to input before overlay',
                { timeout: 500 }
            );

            // Verify focus moved out
            expect(beforeInput === document.activeElement).to.be.true;

            // Should still be open initially
            expect(el.open).to.equal('hover');

            // Wait for the hover delay
            await new Promise((resolve) => setTimeout(resolve, 400));
            await elementUpdated(el);

            // Now it should be closed
            expect(el.open).to.be.undefined;
        });

        it('closes hover content on Escape and returns focus to trigger', async () => {
            const el = await styledFixture<OverlayTrigger>(html`
                <overlay-trigger placement="bottom" triggered-by="hover">
                    <sp-button slot="trigger">Hover trigger</sp-button>
                    <sp-popover slot="hover-content">
                        <sp-button id="button-in-popover">
                            Interactive button
                        </sp-button>
                    </sp-popover>
                </overlay-trigger>
            `);
            await elementUpdated(el);

            const trigger = el.querySelector('[slot="trigger"]') as Button;
            const buttonInPopover = el.querySelector(
                '#button-in-popover'
            ) as Button;

            // Focus the trigger element
            trigger.focus();
            await elementUpdated(el);
            await waitUntil(
                () => el.open === 'hover',
                'overlay should open on focus',
                { timeout: 500 }
            );

            expect(el.open).to.equal('hover');

            // Tab into the popover content
            await sendTabKey();
            await elementUpdated(el);

            expect(el.open).to.equal('hover');

            // Press Escape
            const escapeEvent = new KeyboardEvent('keyup', {
                code: 'Escape',
                bubbles: true,
                composed: true,
                cancelable: true,
            });
            buttonInPopover.dispatchEvent(escapeEvent);
            await elementUpdated(el);

            // Wait for hover content to close
            await waitUntil(
                () => el.open === undefined,
                'hover content closes on Escape',
                { timeout: 500 }
            );

            // Hover content should be closed
            expect(el.open).to.be.undefined;

            // Focus should return to trigger
            expect(
                trigger === document.activeElement ||
                    trigger.shadowRoot?.activeElement
            ).to.exist;
        });

        it('allows keyboard navigation through multiple interactive elements in hover content', async () => {
            const el = await styledFixture<OverlayTrigger>(html`
                <overlay-trigger placement="bottom" triggered-by="hover">
                    <sp-button slot="trigger">Hover trigger</sp-button>
                    <sp-popover slot="hover-content">
                        <sp-button id="button-1">Button 1</sp-button>
                        <sp-button id="button-2">Button 2</sp-button>
                        <sp-button id="button-3">Button 3</sp-button>
                    </sp-popover>
                </overlay-trigger>
            `);
            await elementUpdated(el);

            const trigger = el.querySelector('[slot="trigger"]') as Button;

            // Focus the trigger element
            trigger.focus();
            await elementUpdated(el);

            // Wait for hover content to open
            await waitUntil(
                () => el.open === 'hover',
                'hover content opens on focus',
                { timeout: 500 }
            );

            expect(el.open).to.equal('hover');

            // Tab through all buttons in popover
            await sendTabKey();
            await elementUpdated(el);
            expect(el.open).to.equal('hover');

            await sendTabKey();
            await elementUpdated(el);
            expect(el.open).to.equal('hover');

            await sendTabKey();
            await elementUpdated(el);
            expect(el.open).to.equal('hover');

            // Content should remain open while navigating through interactive elements
            expect(el.open).to.equal('hover');
        });

        it('keeps hover content open when mouse enters after keyboard focus', async () => {
            const el = await styledFixture<OverlayTrigger>(html`
                <overlay-trigger placement="bottom" triggered-by="hover">
                    <sp-button slot="trigger">Hover trigger</sp-button>
                    <sp-popover slot="hover-content">
                        <sp-button id="button-in-popover">
                            Interactive button
                        </sp-button>
                    </sp-popover>
                </overlay-trigger>
            `);
            await elementUpdated(el);

            const trigger = el.querySelector('[slot="trigger"]') as Button;

            // Focus the trigger element with keyboard
            trigger.focus();
            await elementUpdated(el);

            // Wait for hover content to open
            await waitUntil(
                () => el.open === 'hover',
                'hover content opens on focus',
                { timeout: 500 }
            );

            expect(el.open).to.equal('hover');

            // Tab into the popover content
            await sendTabKey();
            await elementUpdated(el);

            expect(el.open).to.equal('hover');

            // Mouse enters the trigger
            trigger.dispatchEvent(
                new MouseEvent('pointerenter', {
                    bubbles: true,
                    composed: true,
                })
            );
            await elementUpdated(el);

            // Content should still be open
            expect(el.open).to.equal('hover');

            // Tab out of popover
            await sendTabKey();
            await elementUpdated(el);

            // Should still be open due to pointer interaction
            expect(el.open).to.equal('hover');
        });
    });
});
