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

import '@spectrum-web-components/action-menu/sp-action-menu.js';
import { ActionMenu } from '@spectrum-web-components/action-menu';
import '@spectrum-web-components/icon/sp-icon.js';
import { SettingsIcon } from '@spectrum-web-components/icons-workflow';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import {
    fixture,
    elementUpdated,
    html,
    expect,
    waitUntil,
} from '@open-wc/testing';
import { MenuItem } from '@spectrum-web-components/menu/src/MenuItem';

const actionMenuFixture = async (): Promise<ActionMenu> =>
    await fixture<ActionMenu>(
        html`
            <sp-action-menu>
                <sp-menu>
                    <sp-menu-item>
                        Deselect
                    </sp-menu-item>
                    <sp-menu-item>
                        Select Inverse
                    </sp-menu-item>
                    <sp-menu-item>
                        Feather...
                    </sp-menu-item>
                    <sp-menu-item>
                        Select and Mask...
                    </sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>
                        Save Selection
                    </sp-menu-item>
                    <sp-menu-item disabled>
                        Make Work Path
                    </sp-menu-item>
                </sp-menu>
            </sp-action-menu>
        `
    );

describe('Action menu', () => {
    it('loads', async () => {
        const el = await actionMenuFixture();
        await elementUpdated(el);

        expect(el).to.not.be.undefined;

        await expect(el).to.be.accessible();
    });
    it('loads - [label]', async () => {
        const el = await fixture<ActionMenu>(
            html`
                <sp-action-menu label="More Actions">
                    <sp-menu>
                        <sp-menu-item>
                            Deselect
                        </sp-menu-item>
                        <sp-menu-item>
                            Select Inverse
                        </sp-menu-item>
                        <sp-menu-item>
                            Feather...
                        </sp-menu-item>
                        <sp-menu-item>
                            Select and Mask...
                        </sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>
                            Save Selection
                        </sp-menu-item>
                        <sp-menu-item disabled>
                            Make Work Path
                        </sp-menu-item>
                    </sp-menu>
                </sp-action-menu>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads - [custom icon]', async () => {
        const el = await fixture<ActionMenu>(
            html`
                <sp-action-menu label="More Actions">
                    <sp-icon slot="icon" size="s">
                        ${SettingsIcon()}
                    </sp-icon>
                    <sp-menu>
                        <sp-menu-item>
                            Deselect
                        </sp-menu-item>
                        <sp-menu-item>
                            Select Inverse
                        </sp-menu-item>
                        <sp-menu-item>
                            Feather...
                        </sp-menu-item>
                        <sp-menu-item>
                            Select and Mask...
                        </sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>
                            Save Selection
                        </sp-menu-item>
                        <sp-menu-item disabled>
                            Make Work Path
                        </sp-menu-item>
                    </sp-menu>
                </sp-action-menu>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('stays `quiet`', async () => {
        const el = await actionMenuFixture();
        await elementUpdated(el);

        expect(el.quiet).to.be.true;

        el.quiet = false;
        await elementUpdated(el);

        expect(el.quiet).to.be.true;
    });
    it('stay `valid`', async () => {
        const el = await actionMenuFixture();

        await elementUpdated(el);

        expect(el.invalid).to.be.false;

        el.invalid = true;
        await elementUpdated(el);

        expect(el.invalid).to.be.false;
    });
    it('opens unmeasured', async () => {
        const el = await actionMenuFixture();

        await elementUpdated(el);
        const button = el.button as HTMLButtonElement;

        button.click();
        await elementUpdated(el);
        expect(el.open).to.be.true;
    });
    it('prevents menu items from being [selected]', async () => {
        const el = await actionMenuFixture();

        await elementUpdated(el);
        const button = el.button as HTMLButtonElement;
        const firstItem = el.querySelector('sp-menu-item') as MenuItem;
        const beforeSelectedItems = [...el.querySelectorAll('[selected]')];
        expect(beforeSelectedItems.length).to.equal(0);

        button.click();
        await elementUpdated(el);

        firstItem.click();
        await waitUntil(
            () => [...el.querySelectorAll('[selected]')].length === 0,
            'return item to `selected=false`'
        );

        expect(el.value).to.equal('Deselect');
    });
    it('[selectable] allows menu items to be [selected]', async () => {
        const el = await actionMenuFixture();
        el.selectable = true;

        await elementUpdated(el);
        const button = el.button as HTMLButtonElement;
        const firstItem = el.querySelector('sp-menu-item') as MenuItem;
        const beforeSelectedItems = [...el.querySelectorAll('[selected]')];
        expect(beforeSelectedItems.length).to.equal(0);

        button.click();
        await elementUpdated(el);

        firstItem.click();
        await waitUntil(
            () => [...el.querySelectorAll('[selected]')].length === 1,
            'set item to `selected=true`'
        );

        expect(el.value).to.equal('Deselect');
    });
});
