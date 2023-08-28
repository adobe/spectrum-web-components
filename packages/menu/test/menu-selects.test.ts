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
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { Menu, MenuGroup, MenuItem } from '@spectrum-web-components/menu';
import {
    elementUpdated,
    expect,
    fixture,
    html,
    oneEvent,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';
import { sendMouse } from '../../../test/plugins/browser.js';

describe('Menu [selects]', () => {
    let el!: Menu;
    let options!: MenuItem[];
    beforeEach(async () => {
        el = await fixture<Menu>(
            html`
                <sp-menu selects="single">
                    <sp-menu-item value="1">Option 1</sp-menu-item>
                    <sp-menu-item value="2">Option 2</sp-menu-item>
                    <sp-menu-item value="3">Option 3</sp-menu-item>
                </sp-menu>
            `
        );
        options = [...el.querySelectorAll('sp-menu-item')] as MenuItem[];
    });
    describe('fires `change` events', async () => {
        it('on browser clicks', async () => {
            const item1 = options[0];
            const boundingRect = item1.getBoundingClientRect();
            const change = oneEvent(el, 'change');
            sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: [
                            boundingRect.x + boundingRect.width / 2,
                            boundingRect.y + boundingRect.height / 2,
                        ],
                    },
                    {
                        type: 'down',
                    },
                    {
                        type: 'up',
                    },
                ],
            });
            await change;
            expect(el.value).to.equal('1');
        });
        it('on JS clicks', async () => {
            const item1 = options[0];
            const change = oneEvent(el, 'change');
            item1.click();
            await change;
            expect(el.value).to.equal('1');
        });
    });
    it('manages a single selection when [selects="single"]', async () => {
        expect(el.value).to.equal('');

        let change = oneEvent(el, 'change');
        options[0].click();
        await change;

        expect(el.value).to.equal('1');

        change = oneEvent(el, 'change');
        options[1].click();
        await change;

        await elementUpdated(el);

        expect(el.value).to.equal('2');

        change = oneEvent(el, 'change');
        options[2].click();
        await change;

        await elementUpdated(el);

        expect(el.value).to.equal('3');
    });
    it('manages multiple selections when [selects="multiple"]', async () => {
        el.selects = 'multiple';

        await elementUpdated(el);

        expect(el.value).to.equal('');

        let change = oneEvent(el, 'change');
        options[0].click();
        await change;
        expect(el.value).to.equal('1');

        change = oneEvent(el, 'change');
        options[1].click();
        await change;

        await elementUpdated(el);

        expect(el.value).to.equal('1,2');

        change = oneEvent(el, 'change');
        options[2].click();
        await change;

        await elementUpdated(el);

        expect(el.value).to.equal('1,2,3');

        change = oneEvent(el, 'change');
        options[0].click();
        await change;

        expect(el.value).to.equal('2,3');

        change = oneEvent(el, 'change');
        options[1].click();
        await change;

        await elementUpdated(el);

        expect(el.value).to.equal('3');

        change = oneEvent(el, 'change');
        options[2].click();
        await change;

        await elementUpdated(el);

        expect(el.value).to.equal('');
    });
});

describe('Menu [selects] w/ group', () => {
    let el!: Menu;
    let options!: MenuItem[];
    beforeEach(async () => {
        el = await fixture<Menu>(
            html`
                <sp-menu selects="single">
                    <sp-menu-group selects="inherit">
                        <sp-menu-item value="1">Option 1</sp-menu-item>
                        <sp-menu-item value="2">Option 2</sp-menu-item>
                        <sp-menu-item value="3">Option 3</sp-menu-item>
                    </sp-menu-group>
                </sp-menu>
            `
        );
        options = [...el.querySelectorAll('sp-menu-item')] as MenuItem[];
    });
    describe('fires `change` events', async () => {
        it('on browser clicks', async () => {
            const item1 = options[0];
            const boundingRect = item1.getBoundingClientRect();
            const change = oneEvent(el, 'change');
            sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: [
                            boundingRect.x + boundingRect.width / 2,
                            boundingRect.y + boundingRect.height / 2,
                        ],
                    },
                    {
                        type: 'down',
                    },
                    {
                        type: 'up',
                    },
                ],
            });
            await change;
            expect(el.value).to.equal('1');
        });
        it('on JS clicks', async () => {
            const item1 = options[0];
            const change = oneEvent(el, 'change');
            item1.click();
            await change;
            expect(el.value).to.equal('1');
        });
    });
    it('manages a single selection when [selects="single"]', async () => {
        expect(el.value).to.equal('');
        let change = oneEvent(el, 'change');
        options[0].click();
        await change;

        expect(el.value).to.equal('1');

        change = oneEvent(el, 'change');
        options[1].click();
        await change;

        await elementUpdated(el);

        expect(el.value).to.equal('2');

        change = oneEvent(el, 'change');
        options[2].click();
        await change;

        await elementUpdated(el);

        expect(el.value).to.equal('3');
    });
    it('manages multiple selections when [selects="multiple"]', async () => {
        el.selects = 'multiple';

        await elementUpdated(el);

        expect(el.value).to.equal('');

        let change = oneEvent(el, 'change');
        options[0].click();
        await change;
        expect(el.value).to.equal('1');

        change = oneEvent(el, 'change');
        options[1].click();
        await change;

        await elementUpdated(el);

        expect(el.value).to.equal('1,2');

        change = oneEvent(el, 'change');
        options[2].click();
        await change;

        await elementUpdated(el);

        expect(el.value).to.equal('1,2,3');

        change = oneEvent(el, 'change');
        options[0].click();
        await change;

        expect(el.value).to.equal('2,3');

        change = oneEvent(el, 'change');
        options[1].click();
        await change;

        await elementUpdated(el);

        expect(el.value).to.equal('3');

        change = oneEvent(el, 'change');
        options[2].click();
        await change;

        await elementUpdated(el);

        expect(el.value).to.equal('');
    });
});

describe('Menu w/ group [selects]', () => {
    let el!: Menu;
    let group!: MenuGroup;
    let options!: MenuItem[];
    beforeEach(async () => {
        el = await fixture<Menu>(
            html`
                <sp-menu>
                    <sp-menu-group selects="single">
                        <sp-menu-item value="1">Option 1</sp-menu-item>
                        <sp-menu-item value="2">Option 2</sp-menu-item>
                        <sp-menu-item value="3">Option 3</sp-menu-item>
                    </sp-menu-group>
                </sp-menu>
            `
        );
        group = el.querySelector('sp-menu-group') as MenuGroup;
        options = [...el.querySelectorAll('sp-menu-item')] as MenuItem[];
    });
    describe('fires `change` events', async () => {
        it('on browser clicks', async () => {
            const item1 = options[0];
            const boundingRect = item1.getBoundingClientRect();
            const change = oneEvent(group, 'change');
            sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: [
                            boundingRect.x + boundingRect.width / 2,
                            boundingRect.y + boundingRect.height / 2,
                        ],
                    },
                    {
                        type: 'down',
                    },
                    {
                        type: 'up',
                    },
                ],
            });
            await change;
            expect(group.value).to.equal('1');
        });
        it('on JS clicks', async () => {
            const item1 = options[0];
            const change = oneEvent(group, 'change');
            item1.click();
            await change;
            expect(group.value).to.equal('1');
        });
    });

    it('manages a single selection when [selects="single"]', async () => {
        expect(group.value).to.equal('');

        let change = oneEvent(el, 'change');
        options[0].click();
        await change;

        expect(group.value).to.equal('1');

        change = oneEvent(el, 'change');
        options[1].click();
        await change;

        await elementUpdated(el);

        expect(group.value).to.equal('2');

        change = oneEvent(el, 'change');
        options[2].click();
        await change;

        await elementUpdated(el);

        expect(group.value).to.equal('3');
    });
    it('manages multiple selections when [selects="multiple"]', async () => {
        group.selects = 'multiple';

        await elementUpdated(group);

        expect(group.value).to.equal('');

        let change = oneEvent(el, 'change');
        options[0].click();
        await change;
        expect(group.value).to.equal('1');

        change = oneEvent(el, 'change');
        options[1].click();
        await change;

        await elementUpdated(el);

        expect(group.value).to.equal('1,2');

        change = oneEvent(el, 'change');
        options[2].click();
        await change;

        await elementUpdated(el);

        expect(group.value).to.equal('1,2,3');

        change = oneEvent(el, 'change');
        options[0].click();
        await change;

        expect(group.value).to.equal('2,3');

        change = oneEvent(el, 'change');
        options[1].click();
        await change;

        await elementUpdated(el);

        expect(group.value).to.equal('3');

        change = oneEvent(el, 'change');
        options[2].click();
        await change;

        await elementUpdated(el);

        expect(group.value).to.equal('');
    });
});

describe('Menu w/ groups [selects]', () => {
    let el!: Menu;
    let groupA!: MenuGroup;
    let groupB!: MenuGroup;
    let options!: MenuItem[];
    beforeEach(async () => {
        el = await fixture<Menu>(
            html`
                <sp-menu>
                    <sp-menu-group selects="single" id="group-1">
                        <sp-menu-item value="1a">Option 1a</sp-menu-item>
                        <sp-menu-item value="2a">Option 2a</sp-menu-item>
                        <sp-menu-item value="3a">Option 3a</sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-group selects="single" id="group-2">
                        <sp-menu-item value="1b">Option 1b</sp-menu-item>
                        <sp-menu-item value="2b">Option 2b</sp-menu-item>
                        <sp-menu-item value="3b">Option 3b</sp-menu-item>
                    </sp-menu-group>
                </sp-menu>
            `
        );
        groupA = el.querySelector('sp-menu-group:first-child') as MenuGroup;
        groupB = el.querySelector('sp-menu-group:last-child') as MenuGroup;
        options = [...el.querySelectorAll('sp-menu-item')] as MenuItem[];
    });
    describe('fires `change` events', async () => {
        it('on browser clicks', async () => {
            const item1a = options[0];
            const item1b = options[3];
            const boundingRectA = item1a.getBoundingClientRect();
            expect(groupA.value).to.equal('');
            expect(groupB.value).to.equal('');
            let change = oneEvent(el, 'change');
            sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: [
                            boundingRectA.x + boundingRectA.width / 2,
                            boundingRectA.y + boundingRectA.height / 2,
                        ],
                    },
                    {
                        type: 'down',
                    },
                    {
                        type: 'up',
                    },
                ],
            });
            await change;
            await elementUpdated(item1a);
            expect(groupA.value).to.equal('1a');
            expect(groupB.value).to.equal('');
            change = oneEvent(el, 'change');
            const boundingRectB = item1b.getBoundingClientRect();
            sendMouse({
                steps: [
                    {
                        type: 'move',
                        position: [
                            boundingRectB.x + boundingRectB.width / 2,
                            boundingRectB.y + boundingRectB.height / 2,
                        ],
                    },
                    {
                        type: 'down',
                    },
                    {
                        type: 'up',
                    },
                ],
            });
            await change;
            expect(groupA.value).to.equal('1a');
            expect(groupB.value).to.equal('1b');
        });
        it('on JS clicks', async () => {
            const item1a = options[0];
            const item1b = options[3];
            let change = oneEvent(el, 'change');
            item1a.click();
            await change;
            expect(groupA.value).to.equal('1a');
            change = oneEvent(el, 'change');
            item1b.click();
            await change;
            expect(groupB.value).to.equal('1b');
        });
        it('can have them `preventDefault()`ed', async () => {
            const preventSpy = spy();
            expect(groupA.value).to.equal('');
            expect(groupB.value).to.equal('');
            const item1a = options[0];
            const item1b = options[3];
            groupA.addEventListener('change', (event: Event) => {
                event.preventDefault();
                preventSpy();
            });
            const change = oneEvent(el, 'change');
            item1a.click();
            item1b.click();
            await change;
            expect(preventSpy.callCount).to.equal(1);
            expect(groupA.value).to.equal('');
            expect(groupB.value).to.equal('1b');
        });
    });

    it('manages a single selection when [selects="single"]', async () => {
        expect(groupA.value).to.equal('');
        expect(groupB.value).to.equal('');

        let change = oneEvent(el, 'change');
        options[0].click();
        await change;

        expect(groupA.value).to.equal('1a');

        change = oneEvent(el, 'change');
        options[3].click();
        await change;

        expect(groupB.value).to.equal('1b');

        change = oneEvent(el, 'change');
        options[1].click();
        await change;

        expect(groupA.value).to.equal('2a');

        change = oneEvent(el, 'change');
        options[4].click();
        await change;

        expect(groupB.value).to.equal('2b');

        change = oneEvent(el, 'change');
        options[2].click();
        await change;

        expect(groupA.value).to.equal('3a');

        change = oneEvent(el, 'change');
        options[5].click();
        await change;

        expect(groupB.value).to.equal('3b');
    });
    it('manages multiple selections when [selects="multiple"]', async () => {
        groupA.selects = 'multiple';
        groupB.selects = 'multiple';

        await elementUpdated(groupA);
        await elementUpdated(groupB);

        expect(groupA.value).to.equal('');
        expect(groupB.value).to.equal('');

        let change = oneEvent(el, 'change');
        options[0].click();
        await change;
        expect(groupA.value).to.equal('1a');
        expect(groupB.value).to.equal('');

        change = oneEvent(el, 'change');
        options[3].click();
        await change;
        expect(groupA.value).to.equal('1a');
        expect(groupB.value).to.equal('1b');

        change = oneEvent(el, 'change');
        options[1].click();
        await change;

        expect(groupA.value).to.equal('1a,2a');
        expect(groupB.value).to.equal('1b');

        change = oneEvent(el, 'change');
        options[4].click();
        await change;

        expect(groupA.value).to.equal('1a,2a');
        expect(groupB.value).to.equal('1b,2b');

        change = oneEvent(el, 'change');
        options[2].click();
        await change;

        expect(groupA.value).to.equal('1a,2a,3a');
        expect(groupB.value).to.equal('1b,2b');

        change = oneEvent(el, 'change');
        options[5].click();
        await change;

        expect(groupA.value).to.equal('1a,2a,3a');
        expect(groupB.value).to.equal('1b,2b,3b');

        change = oneEvent(el, 'change');
        options[0].click();
        await change;

        expect(groupA.value).to.equal('2a,3a');
        expect(groupB.value).to.equal('1b,2b,3b');

        change = oneEvent(el, 'change');
        options[3].click();
        await change;

        expect(groupA.value).to.equal('2a,3a');
        expect(groupB.value).to.equal('2b,3b');

        change = oneEvent(el, 'change');
        options[1].click();
        await change;

        expect(groupA.value).to.equal('3a');
        expect(groupB.value).to.equal('2b,3b');

        change = oneEvent(el, 'change');
        options[4].click();
        await change;

        expect(groupA.value).to.equal('3a');
        expect(groupB.value).to.equal('3b');

        change = oneEvent(el, 'change');
        options[2].click();
        await change;

        expect(groupA.value).to.equal('');
        expect(groupB.value).to.equal('3b');

        change = oneEvent(el, 'change');
        options[5].click();
        await change;

        expect(groupA.value).to.equal('');
        expect(groupB.value).to.equal('');
    });
    it('manages focus', async () => {
        await elementUpdated(groupA);
        await elementUpdated(groupB);
        const input = document.createElement('input');
        el.insertAdjacentElement('afterend', input);
        input.focus();
        expect(document.activeElement === input).to.be.true;
        await sendKeys({ press: 'Shift+Tab' });
        expect(document.activeElement === groupA).to.be.true;
        await sendKeys({ press: 'ArrowDown' });
        await sendKeys({ press: 'ArrowUp' });

        await elementUpdated(el);
        let optionCount = 0;
        for (const option of options) {
            const parentElement = option.parentElement as Menu;
            expect(document.activeElement === parentElement, 'parent focused')
                .to.be.true;
            expect(option.focused, `option ${optionCount} visually focused`).to
                .be.true;
            await sendKeys({ press: 'Space' });
            expect(parentElement.value).to.equal(option.value);
            await sendKeys({ press: 'ArrowDown' });
            optionCount += 1;
        }
    });
});
