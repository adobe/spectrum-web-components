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
    aTimeout,
    elementUpdated,
    expect,
    fixtureCleanup,
    html,
    nextFrame,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import {
    mouseClickAway,
    mouseClickOn,
    mouseMoveOver,
    sendTabKey,
    testForLitDevWarnings,
} from '../../../test/testing-helpers';

import { spy } from 'sinon';

import { ActionMenu } from '@spectrum-web-components/action-menu';
import { TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/dialog/sp-dialog-base.js';
import type { Menu, MenuItem } from '@spectrum-web-components/menu';
import type { Overlay } from '@spectrum-web-components/overlay';
import { SAFARI_FOCUS_RING_CLASS } from '@spectrum-web-components/picker/src/InteractionController.js';
import { isWebKit } from '@spectrum-web-components/shared';
import type { Tooltip } from '@spectrum-web-components/tooltip';
import {
    a11ySnapshot,
    findAccessibilityNode,
    sendKeys,
    setViewport,
} from '@web/test-runner-commands';
import { sendMouse } from '../../../test/plugins/browser.js';
import { findDescribedNode } from '../../../test/testing-helpers-a11y.js';
import {
    fixture,
    ignoreResizeObserverLoopError,
} from '../../../test/testing-helpers.js';
import type { TestablePicker } from '../../picker/test/index.js';
import {
    iconOnly,
    tooltipDescriptionAndPlacement,
} from '../stories/action-menu.stories.js';

ignoreResizeObserverLoopError(before, after);

const deprecatedActionMenuFixture = async (): Promise<ActionMenu> =>
    await fixture<ActionMenu>(html`
        <sp-action-menu label="More Actions">
            <sp-menu>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-menu>
        </sp-action-menu>
    `);

const actionMenuFixture = async (): Promise<ActionMenu> =>
    await fixture<ActionMenu>(html`
        <sp-action-menu label="More Actions">
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-action-menu>
    `);

const actionSubmenuFixture = async (): Promise<ActionMenu> =>
    await fixture<ActionMenu>(html`
        <sp-action-menu label="More Actions">
            <sp-menu-item>One</sp-menu-item>
            <sp-menu-item selected id="root-selected-item">Two</sp-menu-item>
            <sp-menu-item id="item-with-submenu">
                B should be selected
                <sp-menu slot="submenu">
                    <sp-menu-item>A</sp-menu-item>
                    <sp-menu-item selected id="sub-selected-item">
                        B
                    </sp-menu-item>
                    <sp-menu-item>C</sp-menu-item>
                </sp-menu>
            </sp-menu-item>
        </sp-action-menu>
    `);

export const testActionMenu = (mode: 'sync' | 'async'): void => {
    describe(`Action menu: ${mode}`, () => {
        afterEach(() => {
            fixtureCleanup();
        });
        testForLitDevWarnings(async () => await actionMenuFixture());
        it('loads', async () => {
            const el = await actionMenuFixture();
            await elementUpdated(el);

            expect(el).to.not.be.undefined;

            await expect(el).to.be.accessible();
        });

        describe('accessibility/dev mode warnings', () => {
            let warnSpy: sinon.SinonSpy;

            let originalWarn: typeof window.__swc.warn;

            beforeEach(() => {
                // Create __swc if it doesn't exist
                window.__swc = window.__swc || { warn: () => {} };
                // Store original warn function
                originalWarn = window.__swc.warn;
                // Create spy
                warnSpy = spy();
                window.__swc.warn = warnSpy;
            });

            afterEach(() => {
                // Restore original warn function
                window.__swc.warn = originalWarn;
                fixtureCleanup();
            });

            it('warns when no accessible label is provided', async () => {
                const el = await fixture<ActionMenu>(html`
                    <sp-action-menu>
                        <sp-menu-item>Deselect</sp-menu-item>
                    </sp-action-menu>
                `);

                await elementUpdated(el);
                await nextFrame();
                await nextFrame();

                expect(warnSpy.called).to.be.true;
                expect(warnSpy.firstCall.args[0]).to.equal(el);
                expect(warnSpy.firstCall.args[1]).to.equal(
                    '<sp-action-menu> needs one of the following to be accessible:'
                );
                expect(warnSpy.firstCall.args[2]).to.equal(
                    'https://opensource.adobe.com/spectrum-web-components/components/action-menu/#accessibility'
                );
                expect(warnSpy.firstCall.args[3]).to.deep.equal({
                    type: 'accessibility',
                    issues: [
                        'an <sp-field-label> element with a `for` attribute referencing the `id` of the `<sp-action-menu>`, or',
                        'value supplied to the "label" attribute, which will be displayed visually as placeholder text',
                        'text content supplied in a <span> with slot="label", or, text content supplied in a <span> with slot="label-only"',
                        'which will also be displayed visually as placeholder text.',
                    ],
                });
            });

            it('does not warn when label attribute is provided', async () => {
                const el = await fixture<ActionMenu>(html`
                    <sp-action-menu label="More Actions">
                        <sp-menu-item>Deselect</sp-menu-item>
                    </sp-action-menu>
                `);

                await elementUpdated(el);

                expect(warnSpy.called).to.be.false;
            });

            it('does not warn when label slot is provided', async () => {
                const el = await fixture<ActionMenu>(html`
                    <sp-action-menu>
                        <span slot="label">More Actions</span>
                        <sp-menu-item>Deselect</sp-menu-item>
                    </sp-action-menu>
                `);

                await elementUpdated(el);

                expect(warnSpy.called).to.be.false;
            });

            it('does not warn when label-only slot is provided', async () => {
                const el = await fixture<ActionMenu>(html`
                    <sp-action-menu>
                        <span slot="label-only">More Actions</span>
                        <sp-menu-item>Deselect</sp-menu-item>
                    </sp-action-menu>
                `);

                await elementUpdated(el);

                expect(warnSpy.called).to.be.false;
            });

            it('does not warn when aria-label is provided', async () => {
                const el = await fixture<ActionMenu>(html`
                    <sp-action-menu aria-label="More Actions">
                        <sp-menu-item>Deselect</sp-menu-item>
                    </sp-action-menu>
                `);

                await elementUpdated(el);

                expect(warnSpy.called).to.be.false;
            });

            it('does not warn when aria-labelledby is provided', async () => {
                const el = await fixture<ActionMenu>(html`
                    <div id="label-el">More Actions</div>
                    <sp-action-menu aria-labelledby="label-el">
                        <sp-menu-item>Deselect</sp-menu-item>
                    </sp-action-menu>
                `);

                await elementUpdated(el);

                expect(warnSpy.called).to.be.false;
            });
            it('opens unmeasured with deprecated syntax', async () => {
                const el = await deprecatedActionMenuFixture();

                el.click();
                await elementUpdated(el);
                expect(el.open).to.be.true;
            });
        });
        it('loads - [slot="label"]', async () => {
            const el = await fixture<ActionMenu>(html`
                <sp-action-menu>
                    <span slot="label">More Actions</span>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
            `);

            await elementUpdated(el);
            await nextFrame();
            await nextFrame();

            await expect(el).to.be.accessible();
        });
        it('loads - [custom icon]', async () => {
            const el = await fixture<ActionMenu>(html`
                <sp-action-menu label="More Actions">
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
            `);

            await elementUpdated(el);
            await nextFrame();
            await nextFrame();

            await expect(el).to.be.accessible();
        });
        it('has menuitems in accessibility tree', async () => {
            // @TODO: skipping this test because it's flaky in WebKit in CI. Will review in the migration to Spectrum 2.
            if (isWebKit()) {
                return;
            }
            const el = await fixture<ActionMenu>(html`
                <sp-action-menu label="More Actions">
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
            `);
            const opened = oneEvent(el, 'sp-opened');
            el.focus();
            sendKeys({ press: 'Enter' });
            await opened;
            await nextFrame();

            type NamedNode = { name: string; role: string; disabled: boolean };
            const snapshot = (await a11ySnapshot(
                {}
            )) as unknown as NamedNode & {
                children: NamedNode[];
            };
            const button = findAccessibilityNode<NamedNode>(
                snapshot,
                (node) => node.name === 'More Actions'
            );
            const menu = findAccessibilityNode<NamedNode>(
                snapshot,
                (node) => node.role === 'menu'
            );
            const deselect = findAccessibilityNode<NamedNode>(
                snapshot,
                (node) => node.role === 'menuitem' && node.name === 'Deselect'
            );
            const workPath = findAccessibilityNode<NamedNode>(
                snapshot,
                (node) =>
                    node.role === 'menuitem' &&
                    node.name === 'Make Work Path' &&
                    node.disabled
            );
            expect(button, 'button').to.not.be.null;
            expect(menu, 'menu').to.not.be.null;
            expect(deselect, 'first menuitem').to.not.be.null;
            expect(workPath, 'second menuitem').to.not.be.null;
        });
        it('dispatches change events, no [href]', async () => {
            const changeSpy = spy();

            const el = await fixture<ActionMenu>(html`
                <sp-action-menu
                    label="More Actions"
                    @change=${({
                        target: { value },
                    }: Event & { target: ActionMenu }) => {
                        changeSpy(value);
                    }}
                >
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
            `);

            expect(changeSpy.callCount).to.equal(0);
            expect(el.open).to.be.false;

            const menuItem2 = el.querySelector(
                'sp-menu-item:nth-child(2)'
            ) as MenuItem;
            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await elementUpdated(el);
            await opened;

            expect(el.open).to.be.true;

            const closed = oneEvent(el, 'sp-closed');
            menuItem2.click();
            await closed;

            expect(el.open).to.be.false;
            expect(changeSpy.callCount).to.equal(1);
            expect(changeSpy.calledWith('Deselect')).to.be.true;
        });
        it('closes when Menu Item has [href]', async () => {
            const changeSpy = spy();

            const el = await fixture<ActionMenu>(html`
                <sp-action-menu
                    label="More Actions"
                    @change=${() => {
                        changeSpy();
                    }}
                >
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                    <sp-menu-item href="#">Deselect</sp-menu-item>
                    <sp-menu-item href="#">Select Inverse</sp-menu-item>
                    <sp-menu-item href="#">Feather...</sp-menu-item>
                    <sp-menu-item href="#">Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item href="#">Save Selection</sp-menu-item>
                    <sp-menu-item href="#" disabled>
                        Make Work Path
                    </sp-menu-item>
                </sp-action-menu>
            `);

            expect(changeSpy.callCount).to.equal(0);
            expect(el.open).to.be.false;

            const menuItem2 = el.querySelector(
                'sp-menu-item:nth-child(2)'
            ) as MenuItem;

            const opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;

            expect(el.open).to.be.true;

            const closed = oneEvent(el, 'sp-closed');
            menuItem2.click();
            await closed;

            expect(el.open).to.be.false;
            expect(changeSpy.callCount).to.equal(0);
        });
        it('can be `quiet`', async () => {
            const el = await actionMenuFixture();

            expect(el.quiet).to.be.false;

            el.quiet = true;
            await elementUpdated(el);

            expect(el.quiet).to.be.true;
        });
        it('can be `staticColor`', async () => {
            const el = await actionMenuFixture();

            expect(el.staticColor == undefined).to.be.true;

            el.staticColor = 'black';
            await elementUpdated(el);

            expect(el.staticColor == 'black').to.be.true;

            el.staticColor = 'white';
            await elementUpdated(el);

            expect(el.staticColor == 'white').to.be.true;
        });
        it('stay `valid`', async () => {
            const el = await actionMenuFixture();

            expect(el.invalid).to.be.false;

            el.invalid = true;
            await elementUpdated(el);

            expect(el.invalid).to.be.false;
        });
        it('focus()', async () => {
            const el = await actionMenuFixture();

            el.focus();

            expect(document.activeElement).to.equal(el);
            expect(el.shadowRoot.activeElement).to.equal(el.focusElement);

            const opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;

            const closed = oneEvent(el, 'sp-closed');
            el.open = false;
            await closed;

            expect(document.activeElement).to.equal(el);
            expect(el.shadowRoot.activeElement).to.equal(el.focusElement);
        });
        it('manages focus-ring styles', async () => {
            // @TODO: skipping this test for non-WebKit browsers. Will review in the migration to Spectrum 2.
            if (!isWebKit()) {
                return;
            }

            const el = await actionMenuFixture();

            /**
             * This is a hack to set the `isMobile` property to true so that we can test the MobileController
             */
            el.isMobile.matches = true;
            el.bindEvents();

            await setViewport({ width: 360, height: 640 });
            // Allow viewport update to propagate.
            await nextFrame();

            let opened = oneEvent(el, 'sp-opened');

            await mouseClickOn(el.button);

            await opened;

            const tray = el.shadowRoot.querySelector('sp-tray');
            expect(tray).to.not.be.null;

            // Make a selection
            let closed = oneEvent(el, 'sp-closed');

            const firstItem = el.querySelector('sp-menu-item') as MenuItem;
            firstItem.click();

            await elementUpdated(el);
            await closed;

            // expect the tray to be closed
            expect(el.open).to.be.false;

            const button = el.shadowRoot.querySelector(
                '#button'
            ) as HTMLButtonElement;
            expect(button).to.not.be.null;

            // we should have SAFARI_FOCUS_RING_CLASS in the classList
            expect(button.classList.contains(SAFARI_FOCUS_RING_CLASS)).to.be
                .true;

            // picker should still have focus
            expect(document.activeElement === el).to.be.true;

            // click outside (0,0)
            await mouseClickAway(el);

            // picker should not have focus
            expect(document.activeElement === el).to.be.false;

            // Let's use keyboard to open the tray now
            opened = oneEvent(el, 'sp-opened');
            await sendTabKey();
            await sendKeys({ press: 'Enter' });
            await elementUpdated(el);
            await opened;

            // Make a selection again
            closed = oneEvent(el, 'sp-closed');
            firstItem.click();
            await elementUpdated(el);
            await closed;

            // expect the tray to be closed
            expect(el.open).to.be.false;

            // we should not have SAFARI_FOCUS_RING_CLASS in the classList
            expect(button.classList.contains(SAFARI_FOCUS_RING_CLASS)).to.be
                .false;
        });
        it('opens unmeasured', async () => {
            const el = await actionMenuFixture();

            const button = el.button as HTMLButtonElement;
            expect(button).to.have.attribute('aria-haspopup', 'true');
            expect(button).to.not.have.attribute('aria-expanded', 'true');
            expect(button).to.not.have.attribute('aria-controls', 'menu');

            el.click();
            await elementUpdated(el);
            expect(el.open).to.be.true;
            expect(button).to.have.attribute('aria-haspopup', 'true');
            expect(button).to.have.attribute('aria-expanded', 'true');
            expect(button).to.have.attribute('aria-controls', 'menu');
        });
        it('opens repeatedly with Menu in the correct location', async function () {
            const el = await fixture<ActionMenu>(
                iconOnly({
                    ...iconOnly.args,
                    align: 'end',
                })
            );

            expect(el.open, 'open?').to.be.false;

            let opened = oneEvent(el, 'sp-opened');
            el.click();
            await opened;

            expect(el.open, 'open?').to.be.true;

            const firstRect = (
                el as unknown as { overlayElement: Overlay }
            )?.overlayElement?.dialogEl?.getBoundingClientRect();

            const closed = oneEvent(el, 'sp-closed');
            el.close();
            await closed;
            expect(el.open, 'open?').to.be.false;

            opened = oneEvent(el, 'sp-opened');
            el.toggle();
            await opened;
            expect(el.open, 'open?').to.be.true;

            const secondRect = (
                el as unknown as { overlayElement: Overlay }
            )?.overlayElement?.dialogEl?.getBoundingClientRect();

            el.close();

            expect(firstRect).to.deep.equal(secondRect);
        });
        it('opens and selects in a single pointer button interaction', async () => {
            const el = await actionMenuFixture();
            const thirdItem = el.querySelector(
                'sp-menu-item:nth-of-type(3)'
            ) as MenuItem;

            expect(el.value).to.not.equal(thirdItem.value);
            const opened = oneEvent(el, 'sp-opened');
            await sendMouse([
                {
                    type: 'move',
                    position: [el.button],
                },
                {
                    type: 'down',
                },
            ]);
            await opened;

            const closed = oneEvent(el, 'sp-closed');
            let selected = '';
            el.addEventListener('change', (event: Event) => {
                selected = (event.target as ActionMenu).value;
            });
            await sendMouse([
                {
                    type: 'move',
                    position: [thirdItem],
                },
                {
                    type: 'up',
                },
            ]);
            await closed;

            expect(el.open).to.be.false;
            expect(selected).to.equal(thirdItem.value);
        });
        it('returns focus on `Escape`', async () => {
            const el = await actionMenuFixture();
            const thirdItem = el.querySelector(
                'sp-menu-item:nth-of-type(3)'
            ) as MenuItem;

            expect(el.value).to.not.equal(thirdItem.value);
            const opened = oneEvent(el, 'sp-opened');
            el.focus();
            await sendKeys({ press: 'Enter' });
            await opened;

            await sendKeys({ press: 'Escape' });
            await waitUntil(() => document.activeElement === el, 'focused', {
                timeout: 300,
            });
            expect(el.open).to.be.false;
        });
        it('returns focus on select', async () => {
            const el = await actionMenuFixture();
            const thirdItem = el.querySelector(
                'sp-menu-item:nth-of-type(3)'
            ) as MenuItem;

            expect(el.value).to.not.equal(thirdItem.value);
            const opened = oneEvent(el, 'sp-opened');
            el.focus();
            await sendKeys({ press: 'Enter' });
            await opened;

            thirdItem.click();
            await waitUntil(() => document.activeElement === el, 'focused', {
                timeout: 300,
            });
            expect(el.open).to.be.false;
        });
        it('has attribute aria-describedby', async () => {
            const name = 'sp-picker';
            const description = 'Rendering a Picker';

            const el = await fixture(html`
                <sp-action-menu label=${name}>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <span slot="description">${description}</span>
                </sp-action-menu>
            `);

            await elementUpdated(el);

            await findDescribedNode(name, description);
        });

        it('toggles open/close multiple time', async () => {
            const el = await actionMenuFixture();

            await elementUpdated(el);

            const button = el.button as HTMLButtonElement;
            expect(button).to.have.attribute('aria-haspopup', 'true');
            expect(button).to.have.attribute('aria-expanded', 'false');
            expect(button).not.to.have.attribute('aria-controls');

            let opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;

            expect(el.open).to.be.true;
            expect(button).to.have.attribute('aria-expanded', 'true');
            expect(button).to.have.attribute('aria-controls', 'menu');

            let closed = oneEvent(el, 'sp-closed');
            el.open = false;
            await closed;

            expect(el.open).to.be.false;
            expect(button).to.have.attribute('aria-expanded', 'false');
            expect(button).not.to.have.attribute('aria-controls');

            opened = oneEvent(el, 'sp-opened');
            el.open = true;
            await opened;

            expect(el.open).to.be.true;
            expect(button).to.have.attribute('aria-expanded', 'true');
            expect(button).to.have.attribute('aria-controls', 'menu');

            closed = oneEvent(el, 'sp-closed');
            el.open = false;
            await closed;

            expect(el.open).to.be.false;
            expect(button).to.have.attribute('aria-expanded', 'false');
            expect(button).not.to.have.attribute('aria-controls');
        });
        it('allows submenu items to be selected', async () => {
            const root = await actionSubmenuFixture();
            const menuItem = root.querySelector('#item-with-submenu') as Menu;
            const submenu = menuItem.querySelector(
                'sp-menu[slot="submenu"]'
            ) as Menu;
            const selectedItem = submenu.querySelector(
                '#sub-selected-item'
            ) as MenuItem;

            expect(selectedItem.selected, 'item should be initially selected')
                .to.be.true;

            let opened = oneEvent(root, 'sp-opened');
            root.click();
            await opened;
            expect(root.open).to.be.true;

            opened = oneEvent(menuItem, 'sp-opened');
            menuItem.dispatchEvent(
                new PointerEvent('pointerenter', { bubbles: true })
            );
            await opened;

            await elementUpdated(submenu);
            expect(
                selectedItem.selected,
                'initially selected item should maintain selection'
            ).to.be.true;
        });
        it('does not alter submenu selection when top-level menu items are selected', async () => {
            const root = await fixture<ActionMenu>(html`
                <sp-action-menu id="actionmenu" label="More Actions">
                    <sp-menu-item id="item-1">One</sp-menu-item>
                    <sp-menu-item id="item-2">
                        Two, with B selected
                        <sp-menu slot="submenu" id="menu-2" selects="single">
                            <sp-menu-item id="item-2a" selected>A</sp-menu-item>
                            <sp-menu-item id="item-2b">B</sp-menu-item>
                        </sp-menu>
                    </sp-menu-item>
                </sp-action-menu>
            `);

            const item1 = root.querySelector('#item-1') as MenuItem;
            const item2 = root.querySelector('#item-2') as MenuItem;
            const itemA = root.querySelector('#item-2a') as MenuItem;
            const itemB = root.querySelector('#item-2b') as MenuItem;

            let opened = oneEvent(root, 'sp-opened');

            expect(item1.selected, 'before opening: item1 selected?').to.be
                .false;
            expect(item2.selected, 'before opening: item2 selected?').to.be
                .false;
            expect(itemA.selected, 'before opening: itemA selected?').to.be
                .true;
            expect(item2.selected, 'before opening: itemB selected?').to.be
                .false;
            root.click();
            await opened;

            expect(root.open, 'after clicking open: open?').to.be.true;

            let closed = oneEvent(root, 'sp-closed');
            item1.click();
            await closed;

            expect(item1.selected, 'after clicking item1: item1 selected?').to
                .be.false;
            expect(itemA.selected, 'after clicking item1: itemA selected?').to
                .be.true;
            expect(root.open, 'after clicking item1: open?').to.be.false;

            opened = oneEvent(root, 'sp-opened');
            root.click();
            await opened;

            expect(root.open, 'after reopening: open?').to.be.true;

            closed = oneEvent(root, 'sp-closed');
            itemB.click();
            root.close();
            await closed;

            expect(item1.selected, 'after clicking itemB: item1 selected?').to
                .be.false;
            expect(item2.selected, 'after clicking itemB: item2 selected?').to
                .be.false;
            expect(itemA.selected, 'after clicking itemB: itemA selected?').to
                .be.false;
            expect(itemB.selected, 'after clicking itemB: itemB selected?').to
                .be.true;
            expect(root.open, 'after clicking itemB: open?').to.be.false;

            opened = oneEvent(root, 'sp-opened');
            root.click();
            await opened;

            expect(root.open, 'after reopening: open?').to.be.true;

            closed = oneEvent(root, 'sp-closed');
            itemB.click();
            await closed;

            expect(item2.selected, 'after clicking item2: item2 selected?').to
                .be.false;
            expect(itemB.selected, 'after clicking item2: itemB selected?').to
                .be.true;
            expect(root.open, 'after clicking item2: open?').to.be.false;
        });
        it('shows tooltip', async function () {
            const openSpy = spy();
            const el = await fixture<ActionMenu>(
                tooltipDescriptionAndPlacement(
                    tooltipDescriptionAndPlacement.args
                )
            );
            const tooltip = el.querySelector('sp-tooltip') as Tooltip;
            tooltip.addEventListener('sp-opened', () => openSpy());
            await elementUpdated(tooltip);

            await nextFrame();
            await nextFrame();

            const overlay = tooltip.shadowRoot.querySelector(
                'sp-overlay'
            ) as Overlay;
            await elementUpdated(overlay);

            expect(overlay.triggerElement === el.button).to.be.true;
            let open = oneEvent(tooltip, 'sp-opened');
            await mouseMoveOver(el);
            await open;

            expect(tooltip.open).to.be.true;

            const close = oneEvent(tooltip, 'sp-closed');
            open = oneEvent(el, 'sp-opened');
            await mouseClickOn(el);
            await close;
            await open;

            expect(tooltip.open, 'tooltip still open').to.be.false;
            expect(el.open, 'menu not open').to.be.true;

            const menu = (el as unknown as TestablePicker).optionsMenu;

            await mouseMoveOver(menu);

            await aTimeout(150);

            expect(openSpy.callCount).to.equal(1);
        });
        // @TODO: skipping this test because its flaky. Will review in the migration to Spectrum 2.
        it.skip('opens, then closes, on subsequent clicks', async function () {
            const el = await actionMenuFixture();
            await elementUpdated(el);

            const open = await oneEvent(el, 'sp-opened');
            el.click();
            await elementUpdated(el);
            await open;

            expect(el.open).to.be.true;
            await aTimeout(50);
            expect(el.open).to.be.true;

            const close = await oneEvent(el, 'sp-closed');
            el.click();
            await elementUpdated(el);
            await close;

            expect(el.open).to.be.false;
            await aTimeout(50);
            expect(el.open).to.be.false;
        });
        it('should handle scroll event', async () => {
            const renderMenuItems = (): TemplateResult[] =>
                Array.from(
                    { length: 30 },
                    (_, i) => html`
                        <sp-menu-item style="width: 100%;">
                            Menu Item ${i + 1}
                        </sp-menu-item>
                    `
                );
            const handleActionMenuScroll = spy();
            const el = await fixture<ActionMenu>(html`
                <sp-action-menu @scroll=${() => handleActionMenuScroll()}>
                    <span slot="label">More Actions</span>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    ${renderMenuItems()}
                </sp-action-menu>
            `);

            await elementUpdated(el);

            expect(handleActionMenuScroll.called).to.be.false;

            el.dispatchEvent(
                new Event('scroll', { cancelable: true, composed: true })
            );
            expect(handleActionMenuScroll).to.have.been.called;
        });
    });
};
