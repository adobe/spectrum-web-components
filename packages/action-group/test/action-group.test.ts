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
    fixture,
    elementUpdated,
    expect,
    html,
    waitUntil,
} from '@open-wc/testing';

import { ActionButton } from '@spectrum-web-components/action-button';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { ActionGroup } from '..';
import {
    arrowDownEvent,
    arrowLeftEvent,
    arrowRightEvent,
    arrowUpEvent,
    endEvent,
    enterEvent,
    homeEvent,
    pageDownEvent,
    pageUpEvent,
} from '../../../test/testing-helpers';
import '../sp-action-group.js';

describe('ActionGroup', () => {
    it('loads empty action-group accessibly', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group></sp-action-group>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads default action-group accessibly', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="Default Group">
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button>Second</sp-action-button>
                    <sp-action-button>Third</sp-action-button>
                </sp-action-group>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads [selects="single"] action-group accessibly', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="Selects Single Group" selects="single">
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button>Second</sp-action-button>
                    <sp-action-button>Third</sp-action-button>
                </sp-action-group>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads [selects="single"] action-group w/ selection accessibly', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="Selects Single Group" selects="single">
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button>Second</sp-action-button>
                    <sp-action-button selected>Third</sp-action-button>
                </sp-action-group>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads [selects="multiple"] action-group accessibly', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group
                    label="Selects Multiple Group"
                    selects="multiple"
                >
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button>Second</sp-action-button>
                    <sp-action-button>Third</sp-action-button>
                </sp-action-group>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads [selects="multiple"] action-group w/ selection accessibly', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group
                    label="Selects Multiple Group"
                    selects="multiple"
                >
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button selected>Second</sp-action-button>
                    <sp-action-button selected>Third</sp-action-button>
                </sp-action-group>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('sets tab stop when [selects="single"] and the initial button is [disabled]', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="Selects Single Group" selects="single">
                    <sp-action-button disabled>First</sp-action-button>
                    <sp-action-button class="second">Second</sp-action-button>
                    <sp-action-button>Third</sp-action-button>
                </sp-action-group>
            `
        );
        const secondButton = el.querySelector('.second') as ActionButton;

        await elementUpdated(el);

        expect(secondButton.hasAttribute('tabindex'));
        expect(secondButton.getAttribute('tabindex')).to.equal('0');
    });
    it('surfaces [selects="single"] selection', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="Selects Single Group" selects="single">
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button>Second</sp-action-button>
                    <sp-action-button selected>Third</sp-action-button>
                </sp-action-group>
            `
        );

        await elementUpdated(el);

        expect(el.selected, '"Third" selected').to.deep.equal(['Third']);
    });
    it('surfaces [selects="multiple"] selection', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group
                    label="Selects Multiple Group"
                    selects="multiple"
                >
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button selected>Second</sp-action-button>
                    <sp-action-button selected>Third</sp-action-button>
                </sp-action-group>
            `
        );

        await elementUpdated(el);

        expect(el.selected, '"Second" and "Third" selected').to.deep.equal([
            'Second',
            'Third',
        ]);
    });
    it('does not select without [selects]', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="No Selects Group">
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button selected>Second</sp-action-button>
                    <sp-action-button class="third">Third</sp-action-button>
                </sp-action-group>
            `
        );
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length === 0);

        thirdElement.click();

        await elementUpdated(el);

        expect(el.selected.length === 0);
    });
    it('selects via `click` while [selects="single"]', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="Selects Single Group" selects="single">
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button selected>Second</sp-action-button>
                    <sp-action-button class="third">Third</sp-action-button>
                </sp-action-group>
            `
        );
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length === 1);
        expect(el.selected.includes('Second'));

        thirdElement.click();

        await elementUpdated(el);

        expect(thirdElement.selected, 'third child selected');

        await waitUntil(
            () => el.selected.length === 1 && el.selected.includes('Third'),
            'Updates value of `selected`'
        );
    });
    it('selects via `click` while  [selects="multiple"] selection', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group
                    label="Selects Multiple Group"
                    selects="multiple"
                >
                    <sp-action-button selected class="first">
                        First
                    </sp-action-button>
                    <sp-action-button class="second">Second</sp-action-button>
                    <sp-action-button class="third">Third</sp-action-button>
                </sp-action-group>
            `
        );
        const firstElement = el.querySelector('.first') as ActionButton;
        const secondElement = el.querySelector('.second') as ActionButton;
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length === 1);
        expect(el.selected.includes('First'));

        firstElement.click();
        secondElement.click();
        thirdElement.click();

        await elementUpdated(el);

        expect(secondElement.selected, 'second child selected');
        expect(thirdElement.selected, 'third child selected');

        await waitUntil(
            () =>
                el.selected.length === 2 &&
                el.selected.includes('Second') &&
                el.selected.includes('Third'),
            'Updates value of `selected`'
        );
    });
    it('does not respond to clicks on itself', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="Selects Single Group" selects="single">
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button>Second</sp-action-button>
                    <sp-action-button class="third">Third</sp-action-button>
                </sp-action-group>
            `
        );
        await elementUpdated(el);
        expect(el.selected.length).to.equal(0);

        el.click();

        await elementUpdated(el);

        expect(el.selected.length).to.equal(0);
    });
    it('selection can be prevented', async () => {
        const el = await fixture<ActionGroup>(
            html`
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
            `
        );
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length).to.equal(0);

        thirdElement.click();

        await elementUpdated(el);

        expect(!thirdElement.selected, 'third child not selected');
        expect(el.selected.length).to.equal(0);
    });
    const acceptKeyboardInput = async (el: ActionGroup): Promise<void> => {
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length === 1);
        expect(el.selected.includes('Second'));

        thirdElement.click();

        await elementUpdated(el);

        expect(thirdElement.selected, 'third child selected');
        expect(el.selected.length === 1);
        expect(el.selected.includes('Third'));

        el.dispatchEvent(arrowRightEvent);
        let activeElement = document.activeElement as ActionButton;
        activeElement.dispatchEvent(enterEvent);

        await elementUpdated(el);

        expect(el.selected.length === 1);
        expect(el.selected.includes('First'));

        el.dispatchEvent(arrowLeftEvent);
        el.dispatchEvent(arrowUpEvent);
        activeElement = document.activeElement as ActionButton;
        activeElement.dispatchEvent(enterEvent);

        expect(el.selected.length === 1);
        expect(el.selected.includes('Second'));

        el.dispatchEvent(endEvent);
        activeElement = document.activeElement as ActionButton;
        activeElement.dispatchEvent(enterEvent);

        expect(el.selected.length === 1);
        expect(el.selected.includes('Third'));

        activeElement.dispatchEvent(pageUpEvent);
        activeElement = document.activeElement as ActionButton;
        expect(activeElement === thirdElement);

        el.dispatchEvent(homeEvent);
        activeElement = document.activeElement as ActionButton;
        activeElement.dispatchEvent(enterEvent);

        expect(el.selected.length === 1);
        expect(el.selected.includes('First'));

        el.dispatchEvent(arrowDownEvent);
        activeElement = document.activeElement as ActionButton;
        activeElement.dispatchEvent(enterEvent);

        expect(el.selected.length === 1);
        expect(el.selected.includes('Second'));
    };
    it('accepts keybord input', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="Selects Single Group" selects="single">
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button selected>Second</sp-action-button>
                    <sp-action-button class="third">Third</sp-action-button>
                </sp-action-group>
            `
        );
        await acceptKeyboardInput(el);
    });
    it('accepts keybord input with tooltip', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="Selects Single Group" selects="single">
                    <overlay-trigger>
                        <sp-action-button slot="trigger">
                            First
                        </sp-action-button>
                        <sp-tooltip slot="hover-content">
                            Definitely the first one.
                        </sp-tooltip>
                    </overlay-trigger>
                    <overlay-trigger>
                        <sp-action-button slot="trigger" selected>
                            Second
                        </sp-action-button>
                        <sp-tooltip slot="hover-content">
                            Not the first, not the last.
                        </sp-tooltip>
                    </overlay-trigger>
                    <overlay-trigger>
                        <sp-action-button slot="trigger" class="third">
                            Third
                        </sp-action-button>
                        <sp-tooltip slot="hover-content">Select me.</sp-tooltip>
                    </overlay-trigger>
                </sp-action-group>
            `
        );
        await acceptKeyboardInput(el);
    });
    it('accepts keybord input when [dir="ltr"]', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group
                    label="Selects Single Group"
                    selects="single"
                    dir="ltr"
                >
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button disabled>Second</sp-action-button>
                    <sp-action-button class="third">Third</sp-action-button>
                </sp-action-group>
            `
        );
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length === 1);
        expect(el.selected.includes('Second'));

        thirdElement.click();

        await elementUpdated(el);

        expect(thirdElement.selected, 'third child selected');
        expect(el.selected.length === 1);
        expect(el.selected.includes('Third'));

        el.dispatchEvent(arrowRightEvent);
        let activeElement = document.activeElement as ActionButton;
        activeElement.dispatchEvent(enterEvent);

        await elementUpdated(el);

        expect(el.selected.length === 1);
        expect(el.selected.includes('First'));

        el.dispatchEvent(arrowLeftEvent);
        el.dispatchEvent(arrowUpEvent);
        activeElement = document.activeElement as ActionButton;
        activeElement.dispatchEvent(enterEvent);

        expect(el.selected.length === 1);
        expect(el.selected.includes('Third'));
    });
    it('accepts "PageUp" and "PageUp"', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <div>
                    <sp-action-group
                        label="Selects Single Group"
                        selects="single"
                    >
                        <sp-action-button>First</sp-action-button>
                        <sp-action-button class="first">
                            Second
                        </sp-action-button>
                        <sp-action-button>Third</sp-action-button>
                    </sp-action-group>
                    <sp-action-group
                        label="Selects Single Group"
                        selects="multiple"
                    >
                        <sp-action-button>First</sp-action-button>
                        <sp-action-button selected class="second">
                            Second
                        </sp-action-button>
                        <sp-action-button>Third</sp-action-button>
                    </sp-action-group>
                    <sp-action-group></sp-action-group>
                </div>
            `
        );
        const firstElement = el.querySelector('.first') as ActionButton;
        const secondElement = el.querySelector('.second') as ActionButton;

        await elementUpdated(firstElement);
        await elementUpdated(secondElement);

        firstElement.click();

        let activeElement = document.activeElement as ActionButton;
        activeElement.dispatchEvent(pageDownEvent);

        activeElement = document.activeElement as ActionButton;
        expect(activeElement === secondElement);

        activeElement.dispatchEvent(pageUpEvent);

        activeElement = document.activeElement as ActionButton;
        expect(activeElement === firstElement);

        activeElement = document.activeElement as ActionButton;
        activeElement.dispatchEvent(pageDownEvent);

        activeElement = document.activeElement as ActionButton;
        expect(activeElement === firstElement);

        activeElement.dispatchEvent(pageUpEvent);

        activeElement = document.activeElement as ActionButton;
        expect(activeElement === secondElement);
    });
});
