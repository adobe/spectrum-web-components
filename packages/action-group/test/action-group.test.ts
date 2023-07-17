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
    waitUntil,
} from '@open-wc/testing';

import { ActionButton } from '@spectrum-web-components/action-button';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { LitElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { ActionGroup } from '@spectrum-web-components/action-group';
import {
    arrowDownEvent,
    arrowLeftEvent,
    arrowRightEvent,
    arrowUpEvent,
    endEvent,
    homeEvent,
    testForLitDevWarnings,
} from '../../../test/testing-helpers';
import { sendKeys } from '@web/test-runner-commands';
import '@spectrum-web-components/action-group/sp-action-group.js';

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
    const el = await fixture<ActionGroup>(
        html`
            <sp-action-group
                label="Selects User-Chosen Buttons"
                selects="single"
                .selected=${selected}
            >
                <sp-action-button value="first" class="first">
                    First
                </sp-action-button>
                <sp-action-button value="second" class="second">
                    Second
                </sp-action-button>
            </sp-action-group>
        `
    );
    return el;
}

async function multipleSelectedActionGroup(
    selected: string[]
): Promise<ActionGroup> {
    const el = await fixture<ActionGroup>(
        html`
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
        `
    );
    return el;
}

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
    testForLitDevWarnings(
        async () =>
            await fixture<ActionGroup>(
                html`
                    <sp-action-group aria-label="Default Group">
                        <sp-action-button>First</sp-action-button>
                        <sp-action-button>Second</sp-action-button>
                        <sp-action-button>Third</sp-action-button>
                    </sp-action-group>
                `
            )
    );
    it('loads default action-group accessibly', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group aria-label="Default Group">
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button>Second</sp-action-button>
                    <sp-action-button>Third</sp-action-button>
                </sp-action-group>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
        expect(el.getAttribute('aria-label')).to.equal('Default Group');
        expect(el.getAttribute('role')).to.equal('toolbar');
        expect(el.children[0].getAttribute('role')).to.equal('button');
    });
    it('applies `quiet` attribute to its children', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group quiet>
                    <sp-action-button id="first">First</sp-action-button>
                    <sp-action-button id="second">Second</sp-action-button>
                </sp-action-group>
            `
        );
        const firstButton = el.querySelector('#first') as ActionButton;
        const secondButton = el.querySelector('#second') as ActionButton;

        await elementUpdated(el);

        expect(firstButton.hasAttribute('quiet')).to.be.true;
        expect(firstButton.quiet).to.be.true;
        expect(secondButton.hasAttribute('quiet')).to.be.true;
        expect(secondButton.quiet).to.be.true;
    });
    it('applies `quiet` attribute to its slotted children', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <quiet-action-group>
                    <sp-action-button slot="first" id="first">
                        First
                    </sp-action-button>
                    <sp-action-button slot="second" id="second">
                        Second
                    </sp-action-button>
                </quiet-action-group>
            `
        );
        const firstButton = el.querySelector('#first') as ActionButton;
        const secondButton = el.querySelector('#second') as ActionButton;

        await elementUpdated(el);

        expect(firstButton.hasAttribute('quiet')).to.be.true;
        expect(firstButton.quiet).to.be.true;
        expect(secondButton.hasAttribute('quiet')).to.be.true;
        expect(secondButton.quiet).to.be.true;
    });
    it('applies `emphasized` attribute to its slotted children', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <emphasized-action-group>
                    <sp-action-button slot="first" id="first">
                        First
                    </sp-action-button>
                    <sp-action-button slot="second" id="second">
                        Second
                    </sp-action-button>
                </emphasized-action-group>
            `
        );
        const firstButton = el.querySelector('#first') as ActionButton;
        const secondButton = el.querySelector('#second') as ActionButton;

        await elementUpdated(el);

        expect(firstButton.hasAttribute('emphasized')).to.be.true;
        expect(firstButton.emphasized).to.be.true;
        expect(secondButton.hasAttribute('emphasized')).to.be.true;
        expect(secondButton.emphasized).to.be.true;
    });
    it('applies `quiet` attribute to slotted children with overlays', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <quiet-action-group>
                    <overlay-trigger slot="first">
                        <sp-action-button slot="trigger" id="first">
                            First
                        </sp-action-button>
                    </overlay-trigger>
                    <overlay-trigger slot="second">
                        <sp-action-button slot="trigger" id="second">
                            Second
                        </sp-action-button>
                    </overlay-trigger>
                </quiet-action-group>
            `
        );
        const firstButton = el.querySelector('#first') as ActionButton;
        const secondButton = el.querySelector('#second') as ActionButton;

        await elementUpdated(el);

        expect(firstButton.hasAttribute('quiet')).to.be.true;
        expect(firstButton.quiet).to.be.true;
        expect(secondButton.hasAttribute('quiet')).to.be.true;
        expect(secondButton.quiet).to.be.true;
    });
    it('applies `emphasized` attribute to slotted children with overlays', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <emphasized-action-group>
                    <overlay-trigger slot="first">
                        <sp-action-button slot="trigger" id="first">
                            First
                        </sp-action-button>
                    </overlay-trigger>
                    <overlay-trigger slot="second">
                        <sp-action-button slot="trigger" id="second">
                            Second
                        </sp-action-button>
                    </overlay-trigger>
                </emphasized-action-group>
            `
        );
        const firstButton = el.querySelector('#first') as ActionButton;
        const secondButton = el.querySelector('#second') as ActionButton;

        await elementUpdated(el);

        expect(firstButton.hasAttribute('emphasized')).to.be.true;
        expect(firstButton.emphasized).to.be.true;
        expect(secondButton.hasAttribute('emphasized')).to.be.true;
        expect(secondButton.emphasized).to.be.true;
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
        expect(el.getAttribute('aria-label')).to.equal('Selects Single Group');
        expect(el.getAttribute('role')).to.equal('radiogroup');
        expect(el.children[0].getAttribute('role')).to.equal('radio');
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
        expect(el.getAttribute('aria-label')).to.equal(
            'Selects Multiple Group'
        );
        expect(el.getAttribute('role')).to.equal('toolbar');
        expect(el.children[0].getAttribute('role')).to.equal('checkbox');
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
        expect(el.selected.length).to.equal(1);

        thirdElement.click();

        await elementUpdated(el);

        expect(el.selected.length).to.equal(1);
    });
    it('selects via `click` while [selects="single"]', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="Selects Single Group" selects="single">
                    <sp-action-button value="first">First</sp-action-button>
                    <sp-action-button value="second" selected>
                        Second
                    </sp-action-button>
                    <sp-action-button value="third" class="third">
                        Third
                    </sp-action-button>
                </sp-action-group>
            `
        );
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

    it('selects user-passed value while [selects="multiple"]', async () => {
        const el = await fixture<ActionGroup>(
            html`
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
            `
        );

        await elementUpdated(el);

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
        const el = await fixture<ActionGroup>(
            html`
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
            `
        );

        await elementUpdated(el);

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
        const el = await fixture<ActionGroup>(
            html`
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
            `
        );

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
        const el = await fixture<ActionGroup>(
            html`
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
            `
        );

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
        const el = await fixture<ActionGroup>(
            html`
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
            `
        );

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
        const el = await fixture<ActionGroup>(
            html`
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
            `
        );
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
        const el = await fixture<ActionGroup>(
            html`
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
            `
        );
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
        const el = await fixture<ActionGroup>(
            html`
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
            `
        );
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

    it('maintains a `size` attribute', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group>
                    <sp-action-button>Button</sp-action-button>
                </sp-action-group>
            `
        );

        await elementUpdated(el);
        expect(el.size).to.equal('m');
        expect(el.getAttribute('size')).to.equal('m');
        el.removeAttribute('size');
        await elementUpdated(el);
        expect(el.size).to.equal('m');
        expect(el.getAttribute('size')).to.equal('m');
    });

    it('will accept selected as a JSON string', async () => {
        const el = await fixture<ActionGroup>(
            html`
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
            `
        );
        // checking if the first element is selected
        await elementUpdated(el);
        const firstElement = el.querySelector('.first') as ActionButton;
        const secondElement = el.querySelector('.second') as ActionButton;

        expect(el.selected.length).to.equal(1);
        expect(firstElement.selected, 'first child selected').to.be.true;
        expect(secondElement.selected, 'second child selected').to.be.false;
    });

    it('accepts role attribute override', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group role="group">
                    <sp-action-button>Button</sp-action-button>
                </sp-action-group>
            `
        );

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
});
