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

import { elementUpdated, expect, oneEvent } from '@open-wc/testing';
import { fixture } from '../../../test/testing-helpers.js';
import { sendKeys } from '@web/test-runner-commands';

import { groupsWithSelects } from '../stories/action-menu.stories.js';
import { ActionMenu } from '@spectrum-web-components/action-menu';
import { MenuItem } from '@spectrum-web-components/menu';

describe('Action Menu - Groups', () => {
    it('throws focus into the Menu when opened', async function () {
        const el = await fixture<ActionMenu>(
            groupsWithSelects({ onChange: () => {} })
        );

        const firstItem = el.querySelector('sp-menu-item') as MenuItem;

        expect(firstItem.focused).to.be.false;
        expect(document.activeElement === firstItem).to.be.false;

        const opened = oneEvent(el, 'sp-opened');
        el.focus();
        await sendKeys({ press: 'ArrowDown' });
        await opened;

        expect(firstItem.focused).to.be.true;
        expect(
            document.activeElement === firstItem,
            document.activeElement?.localName
        ).to.be.true;
    });

    it('toggles child group with `selects="multiple"`', async function () {
        this.retries(0);
        const el = await fixture<ActionMenu>(
            groupsWithSelects({ onChange: () => {} })
        );

        const multipleGroup = el.querySelector(
            '[selects="multiple"]'
        ) as HTMLElement;
        const firstItem = multipleGroup.querySelector(
            'sp-menu-item'
        ) as MenuItem;

        expect(firstItem.selected, 'before opening: first item selected?').to.be
            .false;

        let opened = oneEvent(el, 'sp-opened');
        el.focus();
        await sendKeys({ press: 'ArrowDown' });
        await opened;
        expect(el.open, 'first opened: open?').to.be.true;

        await sendKeys({ press: 'ArrowUp' });
        await elementUpdated(el);

        let closed = oneEvent(el, 'sp-closed');
        await sendKeys({ press: 'Enter' });
        await closed;

        await elementUpdated(el);
        await elementUpdated(firstItem);

        expect(el.open, 'first closed: open?').to.be.false;
        expect(firstItem.selected, 'after select: first item selected?').to.be
            .true;
        expect(document.activeElement === el, document.activeElement?.localName)
            .to.be.true;

        opened = oneEvent(el, 'sp-opened');
        await sendKeys({ press: 'ArrowDown' });
        await opened;
        expect(el.open, 'reopened: open?').to.be.true;

        closed = oneEvent(el, 'sp-closed');
        await sendKeys({ press: 'Enter' });
        await closed;

        await elementUpdated(el);
        await elementUpdated(firstItem);

        expect(el.open, 'reclosed: open?').to.be.false;
        expect(firstItem.selected, 'after deselect: first item selected?').to.be
            .false;
    });
});
