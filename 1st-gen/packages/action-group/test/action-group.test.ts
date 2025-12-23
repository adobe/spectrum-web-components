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
    fixture,
    html,
    nextFrame,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';

import { ActionButton } from '@spectrum-web-components/action-button';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { ActionGroup } from '@spectrum-web-components/action-group';
import '@spectrum-web-components/action-group/sp-action-group.js';
import { ActionMenu } from '@spectrum-web-components/action-menu';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import {
    LitElement,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { MenuItem } from '@spectrum-web-components/menu';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/picker/sp-picker.js';
import { isWebKit } from '@spectrum-web-components/shared';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { sendKeys } from '@web/test-runner-commands';
import sinon, { spy } from 'sinon';
import {
    arrowDownEvent,
    arrowLeftEvent,
    arrowRightEvent,
    arrowUpEvent,
    endEvent,
    homeEvent,
    mouseClickAway,
    mouseClickOn,
    sendTabKey,
    testForLitDevWarnings,
} from '../../../test/testing-helpers.js';
import { controlled } from '../stories/action-group-tooltip.stories.js';
import '../stories/action-group.stories.js';
import { HasActionMenuAsChild } from '../stories/action-group.stories.js';

class QuietActionGroup extends LitElement {
    protected override render(): TemplateResult {
        return html`
            <sp-action-group quiet>
                <slot name="first"></slot>
                <slot name="second"></slot>
            </sp-action-group>
        `;
    }
}
customElements.define('quiet-action-group', QuietActionGroup);

class EmphasizedActionGroup extends LitElement {
    protected override render(): TemplateResult {
        return html`
            <sp-action-group emphasized>
                <slot name="first"></slot>
                <slot name="second"></slot>
            </sp-action-group>
        `;
    }
}
customElements.define('emphasized-action-group', EmphasizedActionGroup);

async function singleSelectedActionGroup(
    selected: string[]
): Promise<ActionGroup> {
    const el = await fixture<ActionGroup>(html`
        <sp-action-group
            label="Selects User-Chosen Buttons"
            selects="single"
            .selected=${selected}
        >
            <sp-action-button value="first" class="first">
                First
            </sp-action-button>
            <sp-action-button value="second" class="second">
                <div slot="icon" style="width: 10px; height: 10px;"></div>
                Second
            </sp-action-button>
        </sp-action-group>
    `);
    return el;
}

async function multipleSelectedActionGroup(
    selected: string[]
): Promise<ActionGroup> {
    const el = await fixture<ActionGroup>(html`
        <sp-action-group
            label="Selects User-Chosen Buttons"
            selects="multiple"
            .selected=${selected}
        >
            <sp-action-button value="first" class="first">
                First
            </sp-action-button>
            <sp-action-button value="second" class="second">
                Second
            </sp-action-button>
        </sp-action-group>
    `);
    return el;
}

describe('ActionGroup', () => {
    it('does not throw an error if slotElement is null', async () => {
        // To verify that this test is not evergreen, you can temporarily disable the safeguard
        // clause in `manageButtons` by commenting out the following lines:
        // if (!this.slotElement) { return; }

        const el = await fixture<ActionGroup>(html`
            <sp-action-group>
                <sp-action-button value="first">First</sp-action-button>
                <sp-action-button value="second">Second</sp-action-button>
            </sp-action-group>
        `);

        // Stub the slotElement getter to return null
        const slotElementStub = sinon.stub(el, 'slotElement').get(() => null);
        await elementUpdated(el);

        // trigger a slotchange event
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
        await elementUpdated(el);
        expect(el.children.length).to.equal(0);
        slotElementStub.restore();
    });

    it('loads empty action-group accessibly', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group></sp-action-group>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('loads action-group with action-menu accessibly', async () => {
        const el = await fixture<ActionGroup>(
            HasActionMenuAsChild({ label: 'Action Group' })
        );

        await elementUpdated(el);

        await nextFrame();
        await nextFrame();
        await nextFrame();
        await nextFrame();

        await expect(el).to.be.accessible();
    });

    it('action-group with action-menu manages tabIndex correctly while using keyboard', async () => {
        const el = await fixture<ActionGroup>(
            HasActionMenuAsChild({ label: 'Action Group' })
        );

        await elementUpdated(el);
        await waitUntil(() => el.children.length === 4);

        // press Tab to focus into the action-group
        await sendTabKey();

        await elementUpdated(el);

        // expect the first button to be focused
        expect(
            document.activeElement?.id,
            'should be focused on the first button'
        ).to.equal('first');

        // expect all the elements of the focus group to have a tabIndex of -1 except the first button because it is focused using Tab
        expect(
            (el.children[0] as ActionButton)?.tabIndex,
            'should be focused on the first button'
        ).to.equal(0);
        expect(
            (el.children[1] as ActionButton)?.tabIndex,
            'should not be focused on the second button'
        ).to.equal(-1);
        expect(
            (el.children[2] as ActionButton)?.tabIndex,
            'should not be focused on the third button'
        ).to.equal(-1);
        expect(
            (el.children[3] as ActionMenu)?.tabIndex,
            'should not be focused on the fourth button'
        ).to.equal(-1);

        // navigate to the action-menu using the arrow keys
        await sendKeys({ press: 'ArrowRight' });
        await sendKeys({ press: 'ArrowRight' });
        await sendKeys({ press: 'ArrowRight' });

        await elementUpdated(el);

        // expect the action-menu to be focused
        expect(el.children[3]).to.equal(document.activeElement);

        // press Enter to open the action-menu
        await sendKeys({ press: 'Enter' });

        let opened = oneEvent(el.children[3] as ActionMenu, 'sp-opened');
        await elementUpdated(el.children[3]);
        await opened;

        // expect the first menu item to be focused
        const firstMenuItem = el.querySelector('#first-menu-item');
        const fourthMenuItem = el.querySelector('#fourth-menu-item');
        expect(firstMenuItem).to.equal(document.activeElement);
        // navigate to the fourth menu item using the arrow keys
        await sendKeys({ press: 'ArrowDown' });
        await sendKeys({ press: 'ArrowDown' });
        await sendKeys({ press: 'ArrowDown' });

        opened = oneEvent(fourthMenuItem as MenuItem, 'sp-opened');

        // press Enter to select the fourth menu item
        await sendKeys({ press: 'Enter' });
        await opened;

        // expect the second submenu item to be focused
        const secondSubMenuItem = el.querySelector(
            '#second-sub-menu-item'
        ) as MenuItem;
        expect(secondSubMenuItem).to.equal(document.activeElement);

        // press Enter to select the second submenu item
        await sendKeys({ press: 'Enter' });

        const closed = oneEvent(el.children[3] as ActionMenu, 'sp-closed');
        await elementUpdated(el.children[3]);

        await closed;

        // expect the action-menu to be focused
        expect(el.children[3]).to.equal(document.activeElement);
    });

    it.skip('action-group with action-menu manages tabIndex correctly while using mouse', async () => {
        const el = await fixture<ActionGroup>(
            HasActionMenuAsChild({ label: 'Action Group' })
        );

        await elementUpdated(el);

        await aTimeout(100);

        // get the bounding box of the first button
        const firstButton = el.querySelector('#first') as ActionButton;
        await mouseClickOn(firstButton);

        await elementUpdated(firstButton);

        // expect all the elements of the focus group to have a tabIndex of -1 except the first button because it is focused using mouse
        expect(
            (el.children[0] as ActionButton)?.tabIndex,
            'mouse1: should be focused on the first button'
        ).to.equal(0);
        expect(
            (el.children[1] as ActionButton)?.tabIndex,
            'mouse1: should not be focused on the second button'
        ).to.equal(-1);
        expect(
            (el.children[2] as ActionButton)?.tabIndex,
            'mouse1: should not be focused on the third button'
        ).to.equal(-1);
        expect(
            (el.children[3] as ActionMenu)?.tabIndex,
            'mouse1: should not be focused on the fourth button'
        ).to.equal(-1);

        // click outside the action-group and it should loose focus and update the tabIndexes
        await mouseClickAway(el);

        await elementUpdated(el);

        // expect the first button to have a tabIndex of 0 and everything else to have a tabIndex of -1
        expect(
            (el.children[0] as ActionButton)?.tabIndex,
            'mouse2: should be focused on the first button'
        ).to.equal(0);
        expect(
            (el.children[1] as ActionButton)?.tabIndex,
            'mouse2: should not be focused on the second button'
        ).to.equal(-1);
        expect(
            (el.children[2] as ActionButton)?.tabIndex,
            'mouse2: should not be focused on the third button'
        ).to.equal(-1);
        expect(
            (el.children[3] as ActionMenu)?.tabIndex,
            'mouse2: should not be focused on the fourth button'
        ).to.equal(-1);

        await elementUpdated(el);

        // get the bounding box of the action-menu
        const actionMenu = el.querySelector('#action-menu') as ActionMenu;

        await mouseClickOn(actionMenu);
        await waitUntil(
            () => actionMenu?.strategy?.overlay?.state === 'opened',
            `action-menu opened (status ${actionMenu?.strategy?.overlay?.state})`,
            { timeout: 300 }
        );

        expect(actionMenu).to.equal(document.activeElement);
        const closed = oneEvent(el.children[3] as ActionMenu, 'sp-closed');

        // @TODO: handling browser differences in keyboard navigation. Will review in the migration to Spectrum 2.
        if (isWebKit()) {
            // focus on the first menu item as not all items are keyboard focusable in Safari by default
            // https://www.scottohara.me/blog/2014/10/03/link-tabbing-firefox-osx.html
            actionMenu.optionsMenu.focus();
        } else {
            // use keyboard to navigate to the second menu item and select it
            await sendKeys({ press: 'ArrowDown' });
        }
        expect(actionMenu.children[0]).to.equal(document.activeElement);
        await sendKeys({ press: 'Enter' });
        await elementUpdated(el);

        await closed;

        expect(
            (el.children[0] as ActionButton)?.tabIndex,
            'final: should NOT be focused on the first button'
        ).to.equal(-1);
        expect(
            (el.children[1] as ActionButton)?.tabIndex,
            'final: should not be focused on the second button'
        ).to.equal(-1);
        expect(
            (el.children[2] as ActionButton)?.tabIndex,
            'final: should not be focused on the third button'
        ).to.equal(-1);
        expect(
            (el.children[3] as ActionMenu)?.tabIndex,
            'final: should be be focused on the fourth button'
        ).to.equal(0);
    });

    testForLitDevWarnings(
        async () =>
            await fixture<ActionGroup>(html`
                <sp-action-group aria-label="Default Group">
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button>Second</sp-action-button>
                    <sp-action-button>Third</sp-action-button>
                </sp-action-group>
            `)
    );
    it('loads default action-group accessibly', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group aria-label="Default Group">
                <sp-action-button>First</sp-action-button>
                <sp-action-button>Second</sp-action-button>
                <sp-action-button>Third</sp-action-button>
            </sp-action-group>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
        expect(el.getAttribute('aria-label')).to.equal('Default Group');
        expect(el.getAttribute('role')).to.equal('toolbar');
        expect(el.children[0].getAttribute('role')).to.equal('button');
    });
    it('applies `static-color` attribute to its children', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group static-color="white">
                <sp-action-button id="first">First</sp-action-button>
                <sp-action-button id="second">Second</sp-action-button>
            </sp-action-group>
        `);
        const firstButton = el.querySelector('#first') as ActionButton;
        const secondButton = el.querySelector('#second') as ActionButton;

        await elementUpdated(el);

        expect(firstButton.staticColor).to.equal('white');
        expect(secondButton.staticColor).to.equal('white');

        el.staticColor = undefined;

        await elementUpdated(el);

        expect(firstButton.staticColor).to.be.undefined;
        expect(secondButton.staticColor).to.be.undefined;
    });
    it('manages "label"', async () => {
        const testLabel = 'Testable action group';
        const el = await fixture<ActionGroup>(html`
            <sp-action-group label=${testLabel}>
                <sp-action-button id="first">First</sp-action-button>
                <sp-action-button id="second">Second</sp-action-button>
            </sp-action-group>
        `);

        expect(el.getAttribute('aria-label')).to.equal(testLabel);

        el.label = '';

        await elementUpdated(el);

        expect(el.hasAttribute('aria-label')).to.be.false;
    });
    it('applies `quiet` attribute to its children', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group quiet>
                <sp-action-button id="first">First</sp-action-button>
                <sp-action-button id="second">Second</sp-action-button>
            </sp-action-group>
        `);
        const firstButton = el.querySelector('#first') as ActionButton;
        const secondButton = el.querySelector('#second') as ActionButton;

        await elementUpdated(el);

        expect(firstButton.hasAttribute('quiet')).to.be.true;
        expect(firstButton.quiet).to.be.true;
        expect(secondButton.hasAttribute('quiet')).to.be.true;
        expect(secondButton.quiet).to.be.true;
    });
    it('applies `quiet` attribute to its slotted children', async () => {
        const el = await fixture<ActionGroup>(html`
            <quiet-action-group>
                <sp-action-button slot="first" id="first">
                    First
                </sp-action-button>
                <sp-action-button slot="second" id="second">
                    Second
                </sp-action-button>
            </quiet-action-group>
        `);
        const firstButton = el.querySelector('#first') as ActionButton;
        const secondButton = el.querySelector('#second') as ActionButton;

        await elementUpdated(el);

        expect(firstButton.hasAttribute('quiet')).to.be.true;
        expect(firstButton.quiet).to.be.true;
        expect(secondButton.hasAttribute('quiet')).to.be.true;
        expect(secondButton.quiet).to.be.true;
    });
    it('applies `emphasized` attribute to its slotted children', async () => {
        const el = await fixture<ActionGroup>(html`
            <emphasized-action-group>
                <sp-action-button slot="first" id="first">
                    First
                </sp-action-button>
                <sp-action-button slot="second" id="second">
                    Second
                </sp-action-button>
            </emphasized-action-group>
        `);
        const firstButton = el.querySelector('#first') as ActionButton;
        const secondButton = el.querySelector('#second') as ActionButton;

        await elementUpdated(el);

        expect(firstButton.hasAttribute('emphasized')).to.be.true;
        expect(firstButton.emphasized).to.be.true;
        expect(secondButton.hasAttribute('emphasized')).to.be.true;
        expect(secondButton.emphasized).to.be.true;
    });
    it('applies `quiet` attribute to slotted children with overlays', async () => {
        const el = await fixture<ActionGroup>(html`
            <quiet-action-group>
                <overlay-trigger slot="first" triggered-by="click">
                    <sp-action-button slot="trigger" id="first">
                        First
                    </sp-action-button>
                </overlay-trigger>
                <overlay-trigger slot="second" triggered-by="click">
                    <sp-action-button slot="trigger" id="second">
                        Second
                    </sp-action-button>
                </overlay-trigger>
            </quiet-action-group>
        `);
        const firstButton = el.querySelector('#first') as ActionButton;
        const secondButton = el.querySelector('#second') as ActionButton;

        await elementUpdated(el);

        expect(firstButton.hasAttribute('quiet')).to.be.true;
        expect(firstButton.quiet).to.be.true;
        expect(secondButton.hasAttribute('quiet')).to.be.true;
        expect(secondButton.quiet).to.be.true;
    });
    it('applies `emphasized` attribute to slotted children with overlays', async () => {
        const el = await fixture<ActionGroup>(html`
            <emphasized-action-group>
                <overlay-trigger slot="first" triggered-by="click">
                    <sp-action-button slot="trigger" id="first">
                        First
                    </sp-action-button>
                </overlay-trigger>
                <overlay-trigger slot="second" triggered-by="click">
                    <sp-action-button slot="trigger" id="second">
                        Second
                    </sp-action-button>
                </overlay-trigger>
            </emphasized-action-group>
        `);
        const firstButton = el.querySelector('#first') as ActionButton;
        const secondButton = el.querySelector('#second') as ActionButton;

        await elementUpdated(el);

        expect(firstButton.hasAttribute('emphasized')).to.be.true;
        expect(firstButton.emphasized).to.be.true;
        expect(secondButton.hasAttribute('emphasized')).to.be.true;
        expect(secondButton.emphasized).to.be.true;
    });
    it('loads [selects="single"] action-group accessibly', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group label="Selects Single Group" selects="single">
                <sp-action-button>First</sp-action-button>
                <sp-action-button>Second</sp-action-button>
                <sp-action-button>Third</sp-action-button>
            </sp-action-group>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
        expect(el.getAttribute('aria-label')).to.equal('Selects Single Group');
        expect(el.getAttribute('role')).to.equal('radiogroup');
        expect(el.children[0].getAttribute('role')).to.equal('radio');
    });
    it('loads [selects="single"] action-group w/ selection accessibly', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group label="Selects Single Group" selects="single">
                <sp-action-button>First</sp-action-button>
                <sp-action-button>Second</sp-action-button>
                <sp-action-button selected>Third</sp-action-button>
            </sp-action-group>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads [selects="multiple"] action-group accessibly', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group label="Selects Multiple Group" selects="multiple">
                <sp-action-button>First</sp-action-button>
                <sp-action-button>Second</sp-action-button>
                <sp-action-button>Third</sp-action-button>
            </sp-action-group>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
        expect(el.getAttribute('aria-label')).to.equal(
            'Selects Multiple Group'
        );
        expect(el.getAttribute('role')).to.equal('toolbar');
        expect(el.children[0].getAttribute('role')).to.equal('checkbox');
    });
    it('loads [selects="multiple"] action-group w/ selection accessibly', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group label="Selects Multiple Group" selects="multiple">
                <sp-action-button>First</sp-action-button>
                <sp-action-button selected>Second</sp-action-button>
                <sp-action-button selected>Third</sp-action-button>
            </sp-action-group>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('sets tab stop when [selects="single"] and the initial button is [disabled]', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group label="Selects Single Group" selects="single">
                <sp-action-button disabled>First</sp-action-button>
                <sp-action-button class="second">Second</sp-action-button>
                <sp-action-button>Third</sp-action-button>
            </sp-action-group>
        `);
        const secondButton = el.querySelector('.second') as ActionButton;

        await elementUpdated(el);

        expect(secondButton.hasAttribute('tabindex'));
        expect(secondButton.getAttribute('tabindex')).to.equal('0');
    });
    it('surfaces [selects="single"] selection', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group label="Selects Single Group" selects="single">
                <sp-action-button>First</sp-action-button>
                <sp-action-button>Second</sp-action-button>
                <sp-action-button selected>Third</sp-action-button>
            </sp-action-group>
        `);

        await elementUpdated(el);

        expect(el.selected, '"Third" selected').to.deep.equal(['Third']);
    });
    it('manages [selects="single"] selection through multiple slots', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>
                <sp-action-button>First</sp-action-button>
                <sp-action-button>Second</sp-action-button>
                <sp-action-button selected>Third</sp-action-button>
            </div>
        `);

        const firstItem = test.querySelector(
            'sp-action-button'
        ) as ActionButton;
        const thirdItem = test.querySelector(
            'sp-action-button[selected]'
        ) as ActionButton;

        const shadowRoot = test.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <sp-action-group label="Selects Single Group" selects="single">
                <slot></slot>
            </sp-action-group>
        `;

        const el = shadowRoot.querySelector('sp-action-group') as ActionGroup;
        await elementUpdated(el);

        expect(el.selected, '"Third" selected').to.deep.equal(['Third']);
        expect(firstItem.selected).to.be.false;
        expect(thirdItem.selected).to.be.true;

        firstItem.click();
        await elementUpdated(el);

        expect(el.selected, '"First" selected').to.deep.equal(['First']);
        expect(firstItem.selected).to.be.true;
        expect(thirdItem.selected).to.be.false;
    });
    it('surfaces [selects="multiple"] selection', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group label="Selects Multiple Group" selects="multiple">
                <sp-action-button>First</sp-action-button>
                <sp-action-button selected>Second</sp-action-button>
                <sp-action-button selected>Third</sp-action-button>
            </sp-action-group>
        `);

        await elementUpdated(el);

        expect(el.selected, '"Second" and "Third" selected').to.deep.equal([
            'Second',
            'Third',
        ]);
    });
    it('does not select without [selects]', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group label="No Selects Group">
                <sp-action-button>First</sp-action-button>
                <sp-action-button selected>Second</sp-action-button>
                <sp-action-button class="third">Third</sp-action-button>
            </sp-action-group>
        `);
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length).to.equal(1);

        thirdElement.click();

        await elementUpdated(el);

        expect(el.selected.length).to.equal(1);
    });
    it('selects via `click` while [selects="single"]', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group label="Selects Single Group" selects="single">
                <sp-action-button value="first">First</sp-action-button>
                <sp-action-button value="second" selected>
                    Second
                </sp-action-button>
                <sp-action-button value="third" class="third">
                    Third
                </sp-action-button>
            </sp-action-group>
        `);
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length).to.equal(1);
        expect(el.selected.includes('second'));

        thirdElement.click();

        await elementUpdated(el);

        expect(thirdElement.selected, 'third child selected').to.be.true;

        await waitUntil(
            () => el.selected.length === 1 && el.selected.includes('third'),
            'Updates value of `selected`'
        );
    });
    it('selects via `click` while  [selects="multiple"] selection', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group label="Selects Multiple Group" selects="multiple">
                <sp-action-button selected class="first">
                    First
                </sp-action-button>
                <sp-action-button class="second">Second</sp-action-button>
                <sp-action-button class="third">Third</sp-action-button>
            </sp-action-group>
        `);
        const firstElement = el.querySelector('.first') as ActionButton;
        const secondElement = el.querySelector('.second') as ActionButton;
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length).to.equal(1);
        expect(el.selected.includes('First'));

        firstElement.click();
        secondElement.click();
        thirdElement.click();

        await elementUpdated(el);

        expect(secondElement.selected, 'second child selected').to.be.true;
        expect(thirdElement.selected, 'third child selected').to.be.true;

        await waitUntil(
            () =>
                el.selected.length === 2 &&
                el.selected.includes('Second') &&
                el.selected.includes('Third'),
            'Updates value of `selected`'
        );
    });
    it('consumes descendant `change` events when `[selects]`', async () => {
        const changeSpy = spy();
        const el = await fixture<ActionGroup>(html`
            <sp-action-group
                @change=${() => changeSpy()}
                label="Selects Single Group"
                selects="single"
            >
                <sp-action-button toggles value="first">First</sp-action-button>
                <sp-action-button toggles value="second" selected>
                    Second
                </sp-action-button>
                <sp-action-button toggles value="third" class="third">
                    Third
                </sp-action-button>
            </sp-action-group>
        `);
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length).to.equal(1);
        expect(el.selected.includes('second'));
        expect(changeSpy.callCount).to.equal(0);

        thirdElement.click();

        await elementUpdated(el);

        expect(thirdElement.selected, 'third child selected').to.be.true;
        expect(changeSpy.callCount).to.equal(1);

        await waitUntil(
            () => el.selected.length === 1 && el.selected.includes('third'),
            'Updates value of `selected`'
        );
    });
    it('does not respond to clicks on itself', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group label="Selects Single Group" selects="single">
                <sp-action-button>First</sp-action-button>
                <sp-action-button>Second</sp-action-button>
                <sp-action-button class="third">Third</sp-action-button>
            </sp-action-group>
        `);
        await elementUpdated(el);
        expect(el.selected.length).to.equal(0);

        el.click();

        await elementUpdated(el);

        expect(el.selected.length).to.equal(0);
    });
    it('selection can be prevented', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group
                label="Selects Single Group"
                selects="single"
                @change=${(event: Event): void => {
                    event.preventDefault();
                }}
            >
                <sp-action-button>First</sp-action-button>
                <sp-action-button>Second</sp-action-button>
                <sp-action-button class="third">Third</sp-action-button>
            </sp-action-group>
        `);
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length).to.equal(0);

        thirdElement.click();

        await elementUpdated(el);

        expect(thirdElement.selected, 'third child not selected').to.be.false;
        expect(el.selected.length).to.equal(0);
    });

    it('selects user-passed value while [selects="single"]', async () => {
        const el = await singleSelectedActionGroup(['first']);
        await elementUpdated(el);
        expect(el.selected.length).to.equal(1);

        const firstButton = el.querySelector('.first') as ActionButton;
        const secondButton = el.querySelector('.second') as ActionButton;
        expect(firstButton.selected, 'first button selected').to.be.true;
        expect(secondButton.selected, 'second button not selected').to.be.false;

        secondButton.click();
        await elementUpdated(el);

        expect(el.selected.length).to.equal(1);
        expect(firstButton.selected, 'first button not selected').to.be.false;
        expect(secondButton.selected, 'second button selected').to.be.true;
    });

    it('selects can be updated while [selects="single"]', async () => {
        const el = await singleSelectedActionGroup(['first']);
        await elementUpdated(el);
        expect(el.selected.length).to.equal(1);

        const firstButton = el.querySelector('.first') as ActionButton;
        const secondButton = el.querySelector('.second') as ActionButton;
        expect(firstButton.selected, 'first button selected').to.be.true;
        expect(secondButton.selected, 'second button not selected').to.be.false;

        el.selected = ['second'];
        await elementUpdated(el);

        expect(el.selected.length).to.equal(1);
        expect(firstButton.selected, 'first button not selected').to.be.false;
        expect(secondButton.selected, 'second button selected').to.be.true;
    });

    it('does not allow interaction with child content to interrupt the selection mechanism', async () => {
        const el = await singleSelectedActionGroup([]);
        await elementUpdated(el);
        expect(el.selected.length).to.equal(0);

        const firstButton = el.querySelector('.first') as ActionButton;
        const secondButton = el.querySelector('.second') as ActionButton;
        const icon = secondButton.querySelector('[slot=icon]') as HTMLElement;
        expect(firstButton.selected, 'first button selected').to.be.false;
        expect(secondButton.selected, 'second button not selected').to.be.false;

        secondButton.click();
        await elementUpdated(el);

        expect(el.selected.length).to.equal(1);
        expect(el.selected).to.deep.equal(['second']);
        expect(firstButton.selected, 'first button not selected').to.be.false;
        expect(secondButton.selected, 'second button selected').to.be.true;

        firstButton.click();
        await elementUpdated(el);

        expect(el.selected.length).to.equal(1);
        expect(el.selected).to.deep.equal(['first']);
        expect(firstButton.selected, 'first button selected').to.be.true;
        expect(secondButton.selected, 'second button not selected').to.be.false;

        await mouseClickOn(icon);
        icon.click();
        await elementUpdated(el);

        expect(el.selected.length).to.equal(1);
        expect(el.selected).to.deep.equal(['second']);
        expect(firstButton.selected, 'first button not selected').to.be.false;
        expect(secondButton.selected, 'second button selected').to.be.true;
    });

    it('selects user-passed value while [selects="multiple"]', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group
                label="Selects Multiple Group"
                selects="multiple"
                .selected=${['first', 'second']}
            >
                <sp-action-button class="first" value="first">
                    First
                </sp-action-button>
                <sp-action-button class="second" value="second">
                    Second
                </sp-action-button>
                <sp-action-button class="third " value="third">
                    Third
                </sp-action-button>
            </sp-action-group>
        `);

        await elementUpdated(el);

        await Promise.all(el.buttons.map((button) => elementUpdated(button)));

        const firstButton = el.querySelector('.first') as ActionButton;
        const secondButton = el.querySelector('.second') as ActionButton;
        const thirdButton = el.querySelector('.third') as ActionButton;

        expect(el.selected.length).to.equal(2);
        expect(firstButton.selected, 'first button selected').to.be.true;
        expect(secondButton.selected, 'second button selected').to.be.true;
        expect(thirdButton.selected, 'third button not selected').to.be.false;

        thirdButton.click();
        await elementUpdated(el);

        expect(el.selected.length).to.equal(3);
        expect(firstButton.selected, 'first button selected').to.be.true;
        expect(secondButton.selected, 'second button selected').to.be.true;
        expect(thirdButton.selected, 'third button selected').to.be.true;

        firstButton.click();
        await elementUpdated(el);

        expect(el.selected.length).to.equal(2);
        expect(firstButton.selected, 'first button not selected').to.be.false;
        expect(secondButton.selected, 'second button selected').to.be.true;
        expect(thirdButton.selected, 'third button selected').to.be.true;
    });

    it('selects can be updated while [selects="multiple"]', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group
                label="Selects Multiple Group"
                selects="multiple"
                .selected=${['first', 'second']}
            >
                <sp-action-button class="first" value="first">
                    First
                </sp-action-button>
                <sp-action-button class="second" value="second">
                    Second
                </sp-action-button>
                <sp-action-button class="third " value="third">
                    Third
                </sp-action-button>
            </sp-action-group>
        `);

        await elementUpdated(el);

        await Promise.all(el.buttons.map((button) => elementUpdated(button)));

        const firstButton = el.querySelector('.first') as ActionButton;
        const secondButton = el.querySelector('.second') as ActionButton;
        const thirdButton = el.querySelector('.third') as ActionButton;

        expect(el.selected.length).to.equal(2);
        expect(firstButton.selected, 'first button selected').to.be.true;
        expect(secondButton.selected, 'second button selected').to.be.true;
        expect(thirdButton.selected, 'third button not selected').to.be.false;

        el.selected = ['first', 'second', 'third'];
        await elementUpdated(el);

        expect(el.selected.length).to.equal(3);
        expect(firstButton.selected, 'first button selected').to.be.true;
        expect(secondButton.selected, 'second button selected').to.be.true;
        expect(thirdButton.selected, 'third button selected').to.be.true;

        el.selected = ['second', 'third'];
        await elementUpdated(el);

        expect(el.selected.length, JSON.stringify(el.selected)).to.equal(2);
        expect(firstButton.selected, 'first button not selected').to.be.false;
        expect(secondButton.selected, 'second button selected').to.be.true;
        expect(thirdButton.selected, 'third button selected').to.be.true;
    });

    it('selects multiple user-passed values while [selects="single"], but then proceeds with radio-button style functionality', async () => {
        const el = await singleSelectedActionGroup(['first', 'second']);
        await elementUpdated(el);
        expect(el.selected.length).to.equal(2);

        const firstButton = el.querySelector('.first') as ActionButton;
        const secondButton = el.querySelector('.second') as ActionButton;
        expect(firstButton.selected, 'first button selected').to.be.true;
        expect(secondButton.selected, 'second button selected').to.be.true;

        secondButton.click();
        await elementUpdated(el);

        expect(el.selected.length).to.equal(1);
        expect(firstButton.selected, 'first button selected').to.be.false;
        expect(secondButton.selected, 'second button selected').to.be.true;
    });

    it('Clicking button event should bubble up from inner label to outer button element', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group
                label="Selects Multiple Group"
                selects="multiple"
                .selected=${['first', 'second']}
            >
                <sp-action-button class="first" value="first">
                    First
                </sp-action-button>
                <sp-action-button class="second" value="second">
                    Second
                </sp-action-button>
            </sp-action-group>
        `);

        await elementUpdated(el);
        expect(el.selected.length).to.equal(2);

        const firstButtonEl = el.querySelector('.first') as ActionButton;
        const firstSpanEl = firstButtonEl.shadowRoot.querySelector(
            '#label'
        ) as HTMLSpanElement;
        const secondButtonEl = el.querySelector('.second') as ActionButton;

        expect(firstButtonEl.selected, 'first button selected').to.be.true;
        expect(secondButtonEl.selected, 'second button selected').to.be.true;

        firstSpanEl.click(); // clicking inner span bubbles up and fires outer button click
        await elementUpdated(el);

        expect(firstButtonEl.selected, 'first button selected').to.be.false;
        expect(secondButtonEl.selected, 'second button selected').to.be.true;

        firstButtonEl.click(); // clicking outer action-button element fires own click event
        await elementUpdated(el);

        expect(firstButtonEl.selected, 'first button selected').to.be.true;
        expect(secondButtonEl.selected, 'second button selected').to.be.true;
    });

    it('only selects user-passed buttons if present in action-group while [selects="multiple"]', async () => {
        const el = await multipleSelectedActionGroup(['second', 'fourth']);

        await elementUpdated(el);
        expect(el.selected.length).to.equal(1);
        const secondButton = el.querySelector('.second') as ActionButton;
        expect(secondButton.selected, 'second button selected').to.be.true;

        const firstButton = el.querySelector('.first') as ActionButton;
        expect(firstButton.selected, 'first button selected').to.be.false;
    });

    it('selects user-passed values with no .selects value, but does not allow interaction afterwards', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group
                label="Selects User-Chosen Buttons"
                .selected=${['first']}
            >
                <sp-action-button value="first" class="first">
                    First
                </sp-action-button>
                <sp-action-button value="second" class="second">
                    Second
                </sp-action-button>
            </sp-action-group>
        `);

        await elementUpdated(el);
        expect(el.selected.length).to.equal(1);
        const firstButton = el.querySelector('.first') as ActionButton;
        const secondButton = el.querySelector('.second') as ActionButton;
        expect(firstButton.selected, 'first button selected').to.be.true;
        expect(secondButton.selected, 'second button selected').to.be.false;

        secondButton.click();
        await elementUpdated(el);

        expect(el.selected.length).to.equal(1);
        expect(firstButton.selected, 'first button selected').to.be.true;
        expect(secondButton.selected, 'second button selected').to.be.false;
    });

    it('selects multiple buttons if .selected is passed in, but does not allow further interaction afterwards', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group
                label="Selects User-Chosen Buttons"
                .selected=${['first', 'second']}
            >
                <sp-action-button class="first" value="first">
                    First
                </sp-action-button>
                <sp-action-button class="second" value="second">
                    Second
                </sp-action-button>
            </sp-action-group>
        `);

        await elementUpdated(el);
        expect(el.getAttribute('role')).to.equal('toolbar');
        expect(el.selected.length).to.equal(2);

        const firstButton = el.querySelector('.first') as ActionButton;
        expect(firstButton.selected, 'first button selected').to.be.true;
        expect(firstButton.hasAttribute('aria-checked')).to.be.false;
        expect(
            firstButton.getAttribute('aria-pressed'),
            'first button aria-pressed'
        ).to.eq('true');
        expect(firstButton.getAttribute('role'), 'first button role').to.eq(
            'button'
        );

        const secondButton = el.querySelector('.second') as ActionButton;
        expect(secondButton.selected, 'second button selected').to.be.true;
        expect(secondButton.hasAttribute('aria-checked')).to.be.false;
        expect(
            secondButton.getAttribute('aria-pressed'),
            'second button aria-pressed'
        ).to.eq('true');
        expect(secondButton.getAttribute('role'), 'first button role').to.eq(
            'button'
        );

        firstButton.click();
        await elementUpdated(el);

        expect(el.selected.length).to.equal(2);
        expect(firstButton.selected, 'first button selected').to.be.true;
        expect(firstButton.hasAttribute('aria-checked')).to.be.false;
        expect(
            firstButton.getAttribute('aria-pressed'),
            'first button aria-pressed'
        ).to.eq('true');
        expect(firstButton.getAttribute('role'), 'first button role').to.eq(
            'button'
        );

        expect(secondButton.selected, 'second button selected').to.be.true;
        expect(secondButton.hasAttribute('aria-checked')).to.be.false;
        expect(
            secondButton.getAttribute('aria-pressed'),
            'second button aria-pressed'
        ).to.eq('true');
        expect(secondButton.getAttribute('role'), 'first button role').to.eq(
            'button'
        );
    });

    it('will not change .selected state if event is prevented while [selects="multiple"]', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group
                label="Selects Multiple Group"
                selects="multiple"
                .selected=${['first', 'second']}
                @change=${(event: Event): void => {
                    event.preventDefault();
                }}
            >
                <sp-action-button class="first" value="first">
                    First
                </sp-action-button>
                <sp-action-button class="second" value="second">
                    Second
                </sp-action-button>
                <sp-action-button class="third " value="third">
                    Third
                </sp-action-button>
            </sp-action-group>
        `);
        const firstElement = el.querySelector('.first') as ActionButton;
        const secondElement = el.querySelector('.second') as ActionButton;
        const thirdElement = el.querySelector('.third') as ActionButton;

        // checking if the first and second are selected
        await elementUpdated(el);
        expect(el.selected.length).to.equal(2);
        expect(firstElement.selected, 'first child selected').to.be.true;
        expect(secondElement.selected, 'second child selected').to.be.true;

        // making sure third element isn't selected
        thirdElement.click();
        await elementUpdated(el);
        expect(thirdElement.selected, 'third child not selected').to.be.false;
        expect(el.selected.length).to.equal(2);

        // making sure already-selected elements are not de-selected
        secondElement.click();
        await elementUpdated(el);

        expect(secondElement.selected, 'second element still selected').to.be
            .true;
    });

    it('will not change .selected state if event is prevented while [selects="single"]', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group
                label="Selects Single Group"
                selects="single"
                .selected=${['first']}
                @change=${(event: Event): void => {
                    event.preventDefault();
                }}
            >
                <sp-action-button class="first" value="first">
                    First
                </sp-action-button>
                <sp-action-button class="second" value="second">
                    Second
                </sp-action-button>
            </sp-action-group>
        `);
        const firstElement = el.querySelector('.first') as ActionButton;
        const secondElement = el.querySelector('.second') as ActionButton;

        // checking if the first element is selected
        await elementUpdated(el);
        expect(el.selected.length).to.equal(1);
        expect(firstElement.selected, 'first child selected').to.be.true;

        // making sure third element isn't selected
        secondElement.click();

        await elementUpdated(el);

        expect(secondElement.selected, 'second child not selected').to.be.false;
        expect(el.selected.length).to.equal(1);

        // making sure already-selected elements are not de-selected
        firstElement.click();
        await elementUpdated(el);

        expect(firstElement.selected, 'first element still selected').to.be
            .true;
    });

    it('will not change .selected state if event is prevented while selects is undefined', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group
                label="Selects Single Group"
                .selected=${['first']}
                @change=${(event: Event): void => {
                    event.preventDefault();
                }}
            >
                <sp-action-button class="first" value="first">
                    First
                </sp-action-button>
                <sp-action-button class="second" value="second">
                    Second
                </sp-action-button>
            </sp-action-group>
        `);
        const firstElement = el.querySelector('.first') as ActionButton;
        const secondElement = el.querySelector('.second') as ActionButton;

        // checking if the first element is selected
        await elementUpdated(el);
        expect(el.selected.length).to.equal(1);
        expect(firstElement.selected, 'first child selected').to.be.true;

        secondElement.click();
        await elementUpdated(el);

        // state should be exactly the same
        expect(el.selected.length).to.equal(1);
        expect(firstElement.selected, 'first child selected').to.be.true;
        expect(secondElement.selected, 'second child not selected').to.be.false;
    });

    it('manages a `size` attribute', async () => {
        const el = await fixture<ActionButton>(html`
            <sp-action-group size="xl">
                <sp-action-button>Button</sp-action-button>
            </sp-action-group>
        `);

        const button = el.querySelector('sp-action-button') as ActionButton;

        await elementUpdated(el);
        expect(el.size).to.equal('xl');
        expect(button.size).to.equal('xl');
        expect(el.getAttribute('size')).to.equal('xl');
        expect(button.getAttribute('size')).to.equal('xl');
        el.removeAttribute('size');
        await elementUpdated(el);
        expect(el.size).to.equal('m');
        expect(el.hasAttribute('size')).to.be.false;
        expect(button.size).to.equal('m');
        expect(button.getAttribute('size')).to.equal('m');
    });

    it('does not apply a default `size` attribute', async () => {
        const el = await fixture<ActionButton>(html`
            <sp-action-group>
                <sp-action-button>Button</sp-action-button>
            </sp-action-group>
        `);

        const button = el.querySelector('sp-action-button') as ActionButton;

        await elementUpdated(el);
        expect(el.size).to.equal('m');
        expect(button.size).to.equal('m');
        expect(el.hasAttribute('size')).to.be.false;
        expect(button.hasAttribute('size')).to.be.false;
    });

    it('will accept selected as a JSON string', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group
                label="Selects Single Group"
                selects="single"
                selected='["first"]'
            >
                <sp-action-button class="first" value="first">
                    First
                </sp-action-button>
                <sp-action-button class="second" value="second">
                    Second
                </sp-action-button>
            </sp-action-group>
        `);
        // checking if the first element is selected
        await elementUpdated(el);
        const firstElement = el.querySelector('.first') as ActionButton;
        const secondElement = el.querySelector('.second') as ActionButton;

        expect(el.selected.length).to.equal(1);
        expect(firstElement.selected, 'first child selected').to.be.true;
        expect(secondElement.selected, 'second child selected').to.be.false;
    });

    it('accepts role attribute override', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group role="group">
                <sp-action-button>Button</sp-action-button>
            </sp-action-group>
        `);

        // with a role of group, the role should not be overridden
        await elementUpdated(el);
        expect(el.getAttribute('role')).to.equal('group');

        // setting selects to single should override role to radiogroup
        el.setAttribute('selects', 'single');
        await elementUpdated(el);
        expect(el.getAttribute('role')).to.equal('radiogroup');

        // setting selects to multiple should override role to toolbar
        el.setAttribute('selects', 'multiple');
        await elementUpdated(el);
        expect(el.getAttribute('role')).to.equal('toolbar');

        // by default, role should be toolbar
        el.removeAttribute('role');
        el.removeAttribute('selects');
        await elementUpdated(el);
        expect(el.getAttribute('role')).to.equal('toolbar');
    });

    const acceptKeyboardInput = async (el: ActionGroup): Promise<void> => {
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('Second');

        thirdElement.focus();
        thirdElement.click();

        await elementUpdated(el);

        expect(thirdElement.selected, 'third child selected').to.be.true;
        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('Third');

        el.dispatchEvent(arrowRightEvent());
        await sendKeys({ press: 'Enter' });

        await elementUpdated(el);

        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('First');

        el.dispatchEvent(arrowLeftEvent());
        el.dispatchEvent(arrowUpEvent());
        await sendKeys({ press: 'Enter' });

        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('Second');

        el.dispatchEvent(endEvent());
        await sendKeys({ press: 'Enter' });

        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('Third');

        await sendKeys({ press: 'Enter' });

        el.dispatchEvent(homeEvent());
        await sendKeys({ press: 'Enter' });

        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('First');

        el.dispatchEvent(arrowDownEvent());
        await sendKeys({ press: 'Enter' });

        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('Second');
    };
    it('accepts keybord input', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group label="Selects Single Group" selects="single">
                <sp-action-button>First</sp-action-button>
                <sp-action-button selected>Second</sp-action-button>
                <sp-action-button class="third">Third</sp-action-button>
            </sp-action-group>
        `);
        await acceptKeyboardInput(el);
    });
    it('accepts keybord input with tooltip', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group label="Selects Single Group" selects="single">
                <overlay-trigger triggered-by="click hover">
                    <sp-action-button slot="trigger">First</sp-action-button>
                    <sp-tooltip slot="hover-content">
                        Definitely the first one.
                    </sp-tooltip>
                </overlay-trigger>
                <overlay-trigger triggered-by="click hover">
                    <sp-action-button slot="trigger" selected>
                        Second
                    </sp-action-button>
                    <sp-tooltip slot="hover-content">
                        Not the first, not the last.
                    </sp-tooltip>
                </overlay-trigger>
                <overlay-trigger triggered-by="click hover">
                    <sp-action-button slot="trigger" class="third">
                        Third
                    </sp-action-button>
                    <sp-tooltip slot="hover-content">Select me.</sp-tooltip>
                </overlay-trigger>
            </sp-action-group>
        `);
        await acceptKeyboardInput(el);
    });
    it('accepts keybord input when in left-to-right direction', async () => {
        const el = await fixture<ActionGroup>(html`
            <sp-action-group
                label="Selects Single Group"
                selects="single"
                dir="ltr"
            >
                <sp-action-button>First</sp-action-button>
                <sp-action-button disabled>Second</sp-action-button>
                <sp-action-button class="third">Third</sp-action-button>
            </sp-action-group>
        `);
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length).to.equal(0);

        thirdElement.focus();
        thirdElement.click();

        await elementUpdated(el);

        expect(thirdElement.selected, 'third child selected').to.be.true;
        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('Third');

        el.dispatchEvent(arrowRightEvent());
        await sendKeys({ press: 'Enter' });

        await elementUpdated(el);

        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('First');

        el.dispatchEvent(arrowUpEvent());
        await sendKeys({ press: 'Enter' });

        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('Third');
    });
    it('processes `selects` correctly when mutations occur (because Overlays/Tooltips)', async () => {
        const test = await fixture<SpectrumElement>(controlled());
        const actionButtons = [
            ...test.shadowRoot.querySelectorAll('sp-action-button'),
        ] as ActionButton[];

        expect(actionButtons[0].selected).to.be.true;
        expect(actionButtons[1].selected).to.be.false;
        expect(actionButtons[2].selected).to.be.false;

        const changeSpy = spy();
        test.addEventListener('change', () => changeSpy());
        await mouseClickOn(actionButtons[1]);

        await aTimeout(500);

        expect(actionButtons[0].selected).to.be.false;
        expect(actionButtons[1].selected).to.be.true;
        expect(actionButtons[2].selected).to.be.false;
    });
});
