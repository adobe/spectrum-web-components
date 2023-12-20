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
} from '@open-wc/testing';
import { testForLitDevWarnings } from '../../../test/testing-helpers';

import { spy } from 'sinon';

import { ActionMenu } from '@spectrum-web-components/action-menu';
import type { Menu, MenuItem } from '@spectrum-web-components/menu';
import {
    ignoreResizeObserverLoopError,
    fixture as styledFixture,
} from '../../../test/testing-helpers.js';
import '@spectrum-web-components/dialog/sp-dialog-base.js';
import { tooltipDescriptionAndPlacement } from '../stories/action-menu.stories';
import { findDescribedNode } from '../../../test/testing-helpers-a11y.js';
import type { Tooltip } from '@spectrum-web-components/tooltip';
import { sendMouse } from '../../../test/plugins/browser.js';
import type { TestablePicker } from '../../picker/test/index.js';
import type { Overlay } from '@spectrum-web-components/overlay';

ignoreResizeObserverLoopError(before, after);

const deprecatedActionMenuFixture = async (): Promise<ActionMenu> =>
    await fixture<ActionMenu>(
        html`
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
        `
    );

const actionMenuFixture = async (): Promise<ActionMenu> =>
    await fixture<ActionMenu>(
        html`
            <sp-action-menu label="More Actions">
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-action-menu>
        `
    );

const actionSubmenuFixture = async (): Promise<ActionMenu> =>
    await fixture<ActionMenu>(
        html`
            <sp-action-menu label="More Actions">
                <sp-menu-item>One</sp-menu-item>
                <sp-menu-item selected id="root-selected-item">
                    Two
                </sp-menu-item>
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
        `
    );

export const testActionMenu = (mode: 'sync' | 'async'): void => {
    describe(`Action menu: ${mode}`, () => {
        testForLitDevWarnings(async () => await actionMenuFixture());
        it('loads', async () => {
            const el = await actionMenuFixture();
            await elementUpdated(el);

            expect(el).to.not.be.undefined;

            await expect(el).to.be.accessible();
        });
        it('loads - [slot="label"]', async () => {
            const el = await fixture<ActionMenu>(
                html`
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
                `
            );

            await elementUpdated(el);
            await nextFrame();
            await nextFrame();

            await expect(el).to.be.accessible();
        });
        it('loads - [custom icon]', async () => {
            const el = await fixture<ActionMenu>(
                html`
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
                `
            );

            await elementUpdated(el);
            await nextFrame();
            await nextFrame();

            await expect(el).to.be.accessible();
        });
        it('dispatches change events, no [href]', async () => {
            const changeSpy = spy();

            const el = await fixture<ActionMenu>(
                html`
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
                `
            );

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

            const el = await fixture<ActionMenu>(
                html`
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
                `
            );

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
        it('can be `static`', async () => {
            const el = await actionMenuFixture();

            expect(el.static == undefined).to.be.true;

            el.static = 'black';
            await elementUpdated(el);

            expect(el.static == 'black').to.be.true;

            el.static = 'white';
            await elementUpdated(el);

            expect(el.static == 'white').to.be.true;
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
        it('opens unmeasured', async () => {
            const el = await actionMenuFixture();

            const button = el.button as HTMLButtonElement;

            button.click();
            await elementUpdated(el);
            expect(el.open).to.be.true;
            expect(button).to.have.attribute('aria-haspopup', 'true');
            expect(button).to.have.attribute('aria-expanded', 'true');
            expect(button).to.have.attribute('aria-controls', 'menu');
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
        it('opens unmeasured with deprecated syntax', async () => {
            const el = await deprecatedActionMenuFixture();

            const button = el.button as HTMLButtonElement;

            button.click();
            await elementUpdated(el);
            expect(el.open).to.be.true;
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
        it('allows top-level selection state to change', async () => {
            let selected = true;
            const handleChange = (
                event: Event & { target: ActionMenu }
            ): void => {
                if (event.target.value === 'test') {
                    selected = !selected;

                    event.target.updateComplete.then(() => {
                        event.target.value = selected ? 'test' : '';
                    });
                }
            };
            const root = await styledFixture<ActionMenu>(html`
                <sp-action-menu label="More Actions" @change=${handleChange}>
                    <sp-menu-item>One</sp-menu-item>
                    <sp-menu-item selected value="test" id="root-selected-item">
                        Two
                    </sp-menu-item>
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

            const unselectedItem = root.querySelector(
                'sp-menu-item'
            ) as MenuItem;
            const selectedItem = root.querySelector(
                '#root-selected-item'
            ) as MenuItem;

            expect(unselectedItem.textContent).to.include('One');
            expect(unselectedItem.selected).to.be.false;
            expect(selectedItem.textContent).to.include('Two');
            expect(selectedItem.selected).to.be.true;

            let opened = oneEvent(root, 'sp-opened');
            root.click();
            await opened;

            // close by clicking selected
            // (with event listener: should set selected = false)
            let closed = oneEvent(root, 'sp-closed');
            selectedItem.click();
            await closed;

            expect(root.open).to.be.false;
            opened = oneEvent(root, 'sp-opened');
            root.click();
            await opened;

            // close by clicking unselected
            // (no event listener: should remain selected = false)
            closed = oneEvent(root, 'sp-closed');
            unselectedItem.click();
            await closed;

            opened = oneEvent(root, 'sp-opened');
            root.click();
            await opened;

            expect(unselectedItem.textContent).to.include('One');
            expect(unselectedItem.selected).to.be.false;
            expect(selectedItem.textContent).to.include('Two');
            expect(selectedItem.selected).to.be.false;

            // close by clicking selected
            // (with event listener: should set selected = false)
            closed = oneEvent(root, 'sp-closed');
            selectedItem.click();
            await closed;

            opened = oneEvent(root, 'sp-opened');
            root.click();
            await opened;

            expect(unselectedItem.textContent).to.include('One');
            expect(unselectedItem.selected).to.be.false;
            expect(selectedItem.textContent).to.include('Two');
            expect(selectedItem.selected).to.be.true;
        });
        it('shows tooltip', async () => {
            const openSpy = spy();
            const el = await styledFixture<ActionMenu>(
                tooltipDescriptionAndPlacement(
                    tooltipDescriptionAndPlacement.args
                )
            );
            const tooltip = el.querySelector('sp-tooltip') as Tooltip;
            const rect = el.getBoundingClientRect();
            tooltip.addEventListener('sp-opened', () => openSpy());
            await elementUpdated(tooltip);

            await nextFrame();
            await nextFrame();

            const overlay = tooltip.shadowRoot.querySelector(
                'sp-overlay'
            ) as Overlay;
            await elementUpdated(overlay);

            expect(overlay.triggerElement === el.button).to.be.true;
            const open = oneEvent(tooltip, 'sp-opened');
            sendMouse({
                steps: [
                    {
                        position: [
                            rect.left + rect.width / 2,
                            rect.top + rect.height / 2,
                        ],
                        type: 'move',
                    },
                ],
            });
            await open;

            expect(tooltip.open).to.be.true;

            const close = oneEvent(tooltip, 'sp-closed');
            await sendMouse({
                steps: [
                    {
                        position: [
                            rect.left + rect.width / 2,
                            rect.top + rect.height / 2,
                        ],
                        type: 'click',
                    },
                ],
            });
            await close;

            expect(tooltip.open).to.be.false;
            expect(el.open).to.be.true;

            const menu = (el as unknown as TestablePicker).optionsMenu;
            const menuRect = menu.getBoundingClientRect();

            await sendMouse({
                steps: [
                    {
                        position: [
                            menuRect.left + menuRect.width / 2,
                            menuRect.top + menuRect.height / 2,
                        ],
                        type: 'move',
                    },
                ],
            });

            await aTimeout(150);

            expect(openSpy.callCount).to.equal(1);
        });
        it('opens, then closes, on subsequent clicks', async () => {
            const el = await actionMenuFixture();
            const rect = el.getBoundingClientRect();

            const open = oneEvent(el, 'sp-opened');
            sendMouse({
                steps: [
                    {
                        position: [
                            rect.left + rect.width / 2,
                            rect.top + rect.height / 2,
                        ],
                        type: 'click',
                    },
                ],
            });
            await open;

            expect(el.open).to.be.true;
            await aTimeout(50);
            expect(el.open).to.be.true;

            const close = oneEvent(el, 'sp-closed');
            sendMouse({
                steps: [
                    {
                        position: [
                            rect.left + rect.width / 2,
                            rect.top + rect.height / 2,
                        ],
                        type: 'click',
                    },
                ],
            });
            await close;

            expect(el.open).to.be.false;
            await aTimeout(50);
            expect(el.open).to.be.false;
        });
    });
};
