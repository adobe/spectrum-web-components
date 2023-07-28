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
    nextFrame,
    oneEvent,
} from '@open-wc/testing';
import type { Overlay } from '@spectrum-web-components/overlay/src/Overlay.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import { Tooltip } from '@spectrum-web-components/tooltip';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/popover/sp-popover.js';
import { Theme } from '@spectrum-web-components/theme';
import { TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import '@spectrum-web-components/button/sp-button.js';

import { sendMouse } from '../../../test/plugins/browser.js';
import { Button } from '@spectrum-web-components/button';
import { sendKeys } from '@web/test-runner-commands';

const OVERLAY_TYPES = ['modal', 'page', 'hint', 'auto', 'manual'] as const;
type OverlayTypes = typeof OVERLAY_TYPES[number];

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

describe('sp-overlay', () => {
    function opensDeclaratively(overlayType: OverlayTypes): void {
        it(`as [type="'${overlayType}'"]`, async () => {
            const el = await styledFixture<Overlay>(html`
                <sp-overlay open type=${overlayType}>
                    <sp-tooltip>Content</sp-tooltip>
                </sp-overlay>
            `);
            const content = el.children[0] as Tooltip;
            let opened = oneEvent(el, 'sp-opened');
            await opened;

            expect(content.open).to.be.true;
            const closed = oneEvent(el, 'sp-closed');
            el.open = false;
            await closed;

            expect(content.open).to.be.false;
            opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;

            expect(content.open).to.be.true;
        });
    }

    describe('[type="modal"]', () => {
        opensDeclaratively('modal');
        describe('interaction with other non-ancestor overlays', function () {
            beforeEach(async function () {
                this.fixture = await styledFixture<Overlay>(html`
                    <div>
                        ${OVERLAY_TYPES.map(
                            (type) => html`
                                <sp-overlay type=${type}>
                                    <sp-tooltip>${type} Content</sp-tooltip>
                                </sp-overlay>
                            `
                        )}
                    </div>
                `);

                this.modal = this.fixture.querySelector(
                    '[type="modal"]'
                ) as Overlay;
                this.page = this.fixture.querySelector(
                    '[type="page"]'
                ) as Overlay;
                this.hint = this.fixture.querySelector(
                    '[type="hint"]'
                ) as Overlay;
                this.auto = this.fixture.querySelector(
                    '[type="auto"]'
                ) as Overlay;
                this.manual = this.fixture.querySelector(
                    '[type="manual"]'
                ) as Overlay;

                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.false;
            });
            afterEach(async function () {
                const closed = oneEvent(this.modal, 'sp-closed');
                this.modal.open = false;
                await closed;
            });
            it('closes "page" overlays when opening', async function () {
                let opened = oneEvent(this.page, 'sp-opened');
                this.page.open = true;
                await opened;
                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.true;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.false;

                opened = oneEvent(this.modal, 'sp-opened');
                const closed = oneEvent(this.page, 'sp-closed');
                this.modal.open = true;
                await opened;
                await closed;
                expect(this.modal.open).to.be.true;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.false;
            });
            it('closes "hint" overlays when opening', async function () {
                let opened = oneEvent(this.hint, 'sp-opened');
                this.hint.open = true;
                await opened;
                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.true;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.false;

                opened = oneEvent(this.modal, 'sp-opened');
                const closed = oneEvent(this.hint, 'sp-closed');
                this.modal.open = true;
                await opened;
                await closed;
                expect(this.modal.open).to.be.true;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.false;
            });
            it('closes "auto" overlays when opening', async function () {
                let opened = oneEvent(this.auto, 'sp-opened');
                this.auto.open = true;
                await opened;
                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.true;
                expect(this.manual.open).to.be.false;

                opened = oneEvent(this.modal, 'sp-opened');
                const closed = oneEvent(this.auto, 'sp-closed');
                this.modal.open = true;
                await opened;
                await closed;
                expect(this.modal.open).to.be.true;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.false;
            });
            it('does not close "manual" overlays when opening', async function () {
                let opened = oneEvent(this.manual, 'sp-opened');
                this.manual.open = true;
                await opened;
                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.true;

                opened = oneEvent(this.modal, 'sp-opened');
                this.modal.open = true;
                await opened;
                expect(this.modal.open).to.be.true;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.true;
            });
        });
    });
    describe('[type="page"]', () => {
        opensDeclaratively('page');
        describe('interaction with other non-ancestor overlays', function () {
            beforeEach(async function () {
                this.fixture = await styledFixture<Overlay>(html`
                    <div>
                        ${OVERLAY_TYPES.map(
                            (type) => html`
                                <sp-overlay type=${type}>
                                    <sp-tooltip>${type} Content</sp-tooltip>
                                </sp-overlay>
                            `
                        )}
                    </div>
                `);

                this.modal = this.fixture.querySelector(
                    '[type="modal"]'
                ) as Overlay;
                this.page = this.fixture.querySelector(
                    '[type="page"]'
                ) as Overlay;
                this.hint = this.fixture.querySelector(
                    '[type="hint"]'
                ) as Overlay;
                this.auto = this.fixture.querySelector(
                    '[type="auto"]'
                ) as Overlay;
                this.manual = this.fixture.querySelector(
                    '[type="manual"]'
                ) as Overlay;

                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.false;
            });
            afterEach(async function () {
                const closed = oneEvent(this.page, 'sp-closed');
                this.page.open = false;
                await closed;
            });
            it('closes "page" overlays when opening', async function () {
                let opened = oneEvent(this.modal, 'sp-opened');
                this.modal.open = true;
                await opened;
                expect(this.modal.open).to.be.true;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.false;

                opened = oneEvent(this.page, 'sp-opened');
                const closed = oneEvent(this.modal, 'sp-closed');
                this.page.open = true;
                await opened;
                await closed;
                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.true;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.false;
            });
            it('closes "hint" overlays when opening', async function () {
                let opened = oneEvent(this.hint, 'sp-opened');
                this.hint.open = true;
                await opened;
                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.true;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.false;

                opened = oneEvent(this.page, 'sp-opened');
                const closed = oneEvent(this.hint, 'sp-closed');
                this.page.open = true;
                await opened;
                await closed;
                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.true;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.false;
            });
            it('closes "auto" overlays when opening', async function () {
                let opened = oneEvent(this.auto, 'sp-opened');
                this.auto.open = true;
                await opened;
                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.true;
                expect(this.manual.open).to.be.false;

                opened = oneEvent(this.page, 'sp-opened');
                const closed = oneEvent(this.auto, 'sp-closed');
                this.page.open = true;
                await opened;
                await closed;
                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.true;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.false;
            });
            it('does not close "manual" overlays when opening', async function () {
                let opened = oneEvent(this.manual, 'sp-opened');
                this.manual.open = true;
                await opened;
                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.true;

                opened = oneEvent(this.page, 'sp-opened');
                this.page.open = true;
                await opened;
                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.true;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.true;
            });
        });
        it('ignores Escape key interactions', async () => {
            const el = await styledFixture<Overlay>(html`
                <sp-overlay type="page">
                    <sp-popover>This is a "page" Overlay</sp-popover>
                </sp-overlay>
            `);
            const opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;

            expect(el.open).to.be.true;

            await sendKeys({
                press: 'Escape',
            });

            await elementUpdated(el);

            expect(el.open).to.be.true;
        });
    });

    describe('[type="hint"]', () => {
        opensDeclaratively('hint');

        it('closes other `[type=hint]` overlays when opening', async () => {
            const test = await styledFixture<Overlay>(html`
                <div>
                    ${[1, 2].map(
                        (overlay) => html`
                            <sp-overlay type="hint" class="hint-${overlay}">
                                <sp-tooltip>Hint ${overlay} Content</sp-tooltip>
                            </sp-overlay>
                        `
                    )}
                </div>
            `);
            const hint1 = test.querySelector('.hint-1') as Overlay;
            const hint2 = test.querySelector('.hint-2') as Overlay;

            expect(hint1.open).to.be.false;
            expect(hint2.open).to.be.false;

            let opened = oneEvent(hint1, 'sp-opened');
            hint1.open = true;
            await opened;

            expect(hint1.open).to.be.true;
            expect(hint2.open).to.be.false;

            opened = oneEvent(hint2, 'sp-opened');
            let closed = oneEvent(hint1, 'sp-closed');
            hint2.open = true;
            await opened;
            await closed;

            expect(hint1.open).to.be.false;
            expect(hint2.open).to.be.true;

            opened = oneEvent(hint1, 'sp-opened');
            closed = oneEvent(hint2, 'sp-closed');
            hint1.open = true;
            await opened;
            await closed;

            expect(hint1.open).to.be.true;
            expect(hint2.open).to.be.false;
        });
        it('stays open when pointer enters overlay from trigger element', async () => {
            const test = await styledFixture(
                html`
                    <div>
                        <sp-button id="test-button">
                            This is a button.
                        </sp-button>
                        <sp-overlay
                            trigger="test-button@hover"
                            placement="bottom"
                            offset="-10"
                        >
                            <sp-tooltip>Help text.</sp-tooltip>
                        </sp-overlay>
                    </div>
                `
            );

            const button = test.querySelector('sp-button') as Button;
            const overlay = test.querySelector(
                'sp-overlay'
            ) as unknown as Overlay;
            const el = test.querySelector('sp-tooltip') as Tooltip;
            const buttonRect = button.getBoundingClientRect();
            const buttonPoint = [
                buttonRect.x + buttonRect.width / 2,
                buttonRect.y + buttonRect.height - 2,
            ] as [number, number];

            await elementUpdated(overlay);
            // This test is possibly weird in its over simplicity for this contexts...
            await expect(button).to.be.accessible();
            // Pointer enter the button to trigger the tooltip
            let opened = oneEvent(button, 'sp-opened');
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: buttonPoint,
                    },
                ],
            });
            await nextFrame();
            await nextFrame();
            await nextFrame();
            await nextFrame();
            expect(overlay.open).to.be.true;
            // Pointer leave the button to close the tooltip, but...
            // Pointer enter the tooltip to keep the tooltip open
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: [
                            buttonRect.x + buttonRect.width / 2,
                            buttonRect.y + buttonRect.height - 1,
                        ],
                    },
                    {
                        type: 'move',
                        position: [
                            buttonRect.x + buttonRect.width / 2,
                            buttonRect.y + buttonRect.height,
                        ],
                    },
                    {
                        type: 'move',
                        position: [
                            buttonRect.x + buttonRect.width / 2,
                            buttonRect.y + buttonRect.height + 1,
                        ],
                    },
                ],
            });
            await nextFrame();
            await nextFrame();
            expect(overlay.open).to.be.true;
            await opened;

            expect(el.open).to.be.true;
            await expect(button).to.be.accessible();

            let closed = oneEvent(button, 'sp-closed');
            // point enter the button to trigger the tooltip
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: buttonPoint,
                    },
                ],
            });
            // pointer leave the button to close the tooltip
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: [
                            buttonRect.x + buttonRect.width * 2,
                            buttonRect.y + buttonRect.height * 2,
                        ] as [number, number],
                    },
                ],
            });
            await closed;

            expect(el.open).to.be.false;

            opened = oneEvent(button, 'sp-opened');
            // pointer enter the button to trigger the tooltip
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: buttonPoint,
                    },
                ],
            });
            await opened;
            await elementUpdated(el);
            closed = oneEvent(button, 'sp-closed');
            // pointer leave the button to close the tooltip
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: [
                            buttonRect.x + buttonRect.width * 2,
                            buttonRect.y + buttonRect.height * 2,
                        ] as [number, number],
                    },
                ],
            });
            await closed;
        });
        it('stays open when pointer enters overlay from trigger element', async () => {
            const button = await styledFixture(
                html`
                    <sp-button>
                        This is a button.
                        <sp-tooltip self-managed placement="bottom">
                            Help text.
                        </sp-tooltip>
                    </sp-button>
                `
            );

            const el = button.querySelector('sp-tooltip') as Tooltip;
            const buttonRect = button.getBoundingClientRect();
            const buttonPoint = [
                buttonRect.x + buttonRect.width / 2,
                buttonRect.y + buttonRect.height / 2,
            ] as [number, number];

            await elementUpdated(el);
            // This test is possibly weird in its over simplicity for this contexts...
            await expect(button).to.be.accessible();
            // Pointer enter the button to trigger the tooltip
            let opened = oneEvent(button, 'sp-opened');
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: buttonPoint,
                    },
                ],
            });
            // It takes this many frame for the overlay content to actual be queryable.
            // We're trying to do work _before_ `sp-opened` so it's a little tricky.
            // Is it possible to do this work _after_ `sp-opened` for more stability?
            // Try futzing with the `offset` values of the `sp-overlay`?
            await nextFrame();
            await nextFrame();
            await nextFrame();
            await nextFrame();
            const tooltipRect = (
                el.shadowRoot.querySelector('#tooltip') as HTMLDivElement
            ).getBoundingClientRect();
            const tooltipPoint = [
                tooltipRect.x + tooltipRect.width / 2,
                tooltipRect.y + tooltipRect.height / 2,
            ] as [number, number];
            // Pointer leave the button to close the tooltip, but...
            // Pointer enter the tooltip to keep the tooltip open
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: tooltipPoint,
                    },
                ],
            });
            await opened;

            expect(el.open).to.be.true;
            await expect(button).to.be.accessible();

            let closed = oneEvent(button, 'sp-closed');
            // point enter the button to trigger the tooltip
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: buttonPoint,
                    },
                ],
            });
            // pointer leave the button to close the tooltip
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: [
                            buttonRect.x + buttonRect.width * 2,
                            buttonRect.y + buttonRect.height * 2,
                        ] as [number, number],
                    },
                ],
            });
            await closed;

            expect(el.open).to.be.false;

            opened = oneEvent(button, 'sp-opened');
            // pointer enter the button to trigger the tooltip
            await sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: buttonPoint,
                    },
                ],
            });
            await opened;
            expect(el.open).to.be.true;

            closed = oneEvent(button, 'sp-closed');
            // pointer leave the button to close the tooltip
            sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: [
                            buttonRect.x + buttonRect.width * 2,
                            buttonRect.y + buttonRect.height * 2,
                        ] as [number, number],
                    },
                ],
            });
            await closed;
            expect(el.open).to.be.false;
        });
    });
    describe('[type="auto"]', () => {
        opensDeclaratively('auto');
    });
    describe('[type="manual"]', () => {
        opensDeclaratively('manual');
        describe('interaction with other non-ancestor overlays', function () {
            beforeEach(async function () {
                this.fixture = await styledFixture<Overlay>(html`
                    <div>
                        ${OVERLAY_TYPES.map(
                            (type) => html`
                                <sp-overlay type=${type}>
                                    <sp-tooltip>${type} Content</sp-tooltip>
                                </sp-overlay>
                            `
                        )}
                    </div>
                `);

                this.modal = this.fixture.querySelector(
                    '[type="modal"]'
                ) as Overlay;
                this.page = this.fixture.querySelector(
                    '[type="page"]'
                ) as Overlay;
                this.hint = this.fixture.querySelector(
                    '[type="hint"]'
                ) as Overlay;
                this.auto = this.fixture.querySelector(
                    '[type="auto"]'
                ) as Overlay;
                this.manual = this.fixture.querySelector(
                    '[type="manual"]'
                ) as Overlay;

                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.false;
            });
            afterEach(async function () {
                const closed = oneEvent(this.manual, 'sp-closed');
                this.manual.open = false;
                await closed;
            });
            it('does not close "modal" overlays when opening', async function () {
                let opened = oneEvent(this.modal, 'sp-opened');
                this.modal.open = true;
                await opened;
                expect(this.modal.open).to.be.true;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.false;

                opened = oneEvent(this.manual, 'sp-opened');
                this.manual.open = true;
                await opened;
                expect(this.modal.open).to.be.true;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.true;
            });
            it('does not close "modal" overlays when opening', async function () {
                let opened = oneEvent(this.page, 'sp-opened');
                this.page.open = true;
                await opened;
                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.true;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.false;

                opened = oneEvent(this.manual, 'sp-opened');
                this.manual.open = true;
                await opened;
                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.true;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.true;
            });
            it('does not close "hint" overlays when opening', async function () {
                let opened = oneEvent(this.hint, 'sp-opened');
                this.hint.open = true;
                await opened;
                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.true;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.false;

                opened = oneEvent(this.manual, 'sp-opened');
                this.manual.open = true;
                await opened;

                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.true;
                expect(this.auto.open).to.be.false;
                expect(this.manual.open).to.be.true;
            });
            it('does not close "auto" overlays when opening', async function () {
                let opened = oneEvent(this.auto, 'sp-opened');
                this.auto.open = true;
                await opened;

                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.true;
                expect(this.manual.open).to.be.false;

                opened = oneEvent(this.manual, 'sp-opened');
                this.manual.open = true;
                await opened;

                expect(this.modal.open).to.be.false;
                expect(this.page.open).to.be.false;
                expect(this.hint.open).to.be.false;
                expect(this.auto.open).to.be.true;
                expect(this.manual.open).to.be.true;
            });
        });
    });
});
