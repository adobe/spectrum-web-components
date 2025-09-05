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
    fixture,
    html,
    waitUntil,
} from '@open-wc/testing';
import { ActionMenu } from '@spectrum-web-components/action-menu';
import '@spectrum-web-components/action-menu/sync/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { Popover } from '@spectrum-web-components/popover';
import { Tray } from '@spectrum-web-components/tray/src/Tray.js';
import { spreadProps } from '../../../test/lit-helpers.js';
import { mouseClickOn } from '../../../test/testing-helpers.js';

describe('ActionMenu, responsive', () => {
    let el: ActionMenu;
    const actionMenuFixture = async (args?: {
        forcePopover: boolean;
    }): Promise<ActionMenu> => {
        const test = await fixture<HTMLDivElement>(html`
            <div>
                <sp-action-menu id="action-menu" ${spreadProps(args || {})}>
                    <span slot="label">Action Menu</span>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
            </div>
        `);

        return test.querySelector('sp-action-menu') as ActionMenu;
    };

    describe('container', () => {
        beforeEach(async () => {
            el = await actionMenuFixture();
            await elementUpdated(el);
        });

        it('is a Tray in mobile', async () => {
            /**
             * This is a hack to set the `isMobile` property to true so that we can test the MobileController
             */
            el.isMobile.matches = true;
            el.bindEvents();

            await mouseClickOn(el.button);

            // in this test we only need to wait to see if a tray opens
            let tray: Tray | null = null;
            await waitUntil(
                () => {
                    tray = el.shadowRoot.querySelector('sp-tray') as Tray;
                    return !!tray;
                },
                `tray appeared (el.open: ${el.open})`,
                { timeout: 300 }
            );

            const popover = el.shadowRoot.querySelector('sp-popover');

            expect(tray).to.not.be.null;
            expect(popover).to.be.null;
        });

        it('is a Popover in desktop', async () => {
            el.open = true;

            // in this test we only need to wait to see if a popover opens
            let popover: Popover | null = null;
            await waitUntil(
                () => {
                    popover = el.shadowRoot.querySelector(
                        'sp-popover'
                    ) as Popover;
                    return !!popover && popover.open;
                },
                `popover appeared (el.open: ${el.open})`,
                { timeout: 300 }
            );

            const tray = el.shadowRoot.querySelector('sp-tray');

            expect(popover).to.not.be.null;
            expect(tray).to.be.null;
        });
    });

    describe('forcePopover', () => {
        beforeEach(async () => {
            el = await actionMenuFixture({ forcePopover: true });
            await elementUpdated(el);
        });

        it('is a Popover in mobile', async () => {
            /**
             * This is a hack to set the `isMobile` property to true so that we can test the MobileController
             */
            el.isMobile.matches = true;
            el.bindEvents();

            el.open = true;

            // in this test we only need to wait to see if a popover opens
            let popover: Popover | null = null;
            await waitUntil(
                () => {
                    popover = el.shadowRoot.querySelector(
                        'sp-popover'
                    ) as Popover;
                    return !!popover && popover.open;
                },
                `popover appeared (el.open: ${el.open})`,
                { timeout: 300 }
            );

            const tray = el.shadowRoot.querySelector('sp-tray');

            expect(tray).to.be.null;
            expect(popover).to.not.be.null;
        });

        it('is a Popover in desktop', async () => {
            el.open = true;

            // in this test we only need to wait to see if a popover opens
            let popover: Popover | null = null;
            await waitUntil(
                () => {
                    popover = el.shadowRoot.querySelector(
                        'sp-popover'
                    ) as Popover;
                    return !!popover && popover.open;
                },
                `popover appeared (el.open: ${el.open})`,
                { timeout: 300 }
            );

            const tray = el.shadowRoot.querySelector('sp-tray');

            expect(popover).to.not.be.null;
            expect(tray).to.be.null;
        });
    });
});
