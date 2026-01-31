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
    nextFrame,
} from '@open-wc/testing';
import { Radio, RadioGroup } from '@spectrum-web-components/radio';
import '@spectrum-web-components/radio/sp-radio-group.js';
import '@spectrum-web-components/radio/sp-radio.js';
import {
    a11ySnapshot,
    findAccessibilityNode,
    sendKeys,
} from '@web/test-runner-commands';
import { spy, stub } from 'sinon';
import { sendMouse } from '../../../test/plugins/browser.js';
import {
    arrowDownEvent,
    arrowLeftEvent,
    arrowRightEvent,
    arrowUpEvent,
    endEvent,
    enterEvent,
    homeEvent,
} from '../../../test/testing-helpers.js';

describe('Radio Group - focus control', () => {
    it('does not accept focus when empty', async () => {
        const el = await fixture<RadioGroup>(html`
            <sp-radio-group></sp-radio-group>
        `);

        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;
    });
    it('focuses selected before first', async () => {
        const values = ['first', 'second', 'third'];
        const el = await fixture<RadioGroup>(html`
            <sp-radio-group selected="second">
                <sp-radio value=${values[0]}>Option 1</sp-radio>
                <sp-radio value=${values[1]}>Option 2</sp-radio>
                <sp-radio value=${values[2]}>Option 3</sp-radio>
            </sp-radio-group>
        `);

        await elementUpdated(el);
        const selected = el.querySelector('[value="second"]') as Radio;

        expect(document.activeElement === el).to.be.false;

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement === selected).to.be.true;
    });
    it('focuses the child input not the root when [tabindex=-1]', async () => {
        const values = ['first', 'second', 'third'];
        const el = await fixture<RadioGroup>(html`
            <sp-radio-group selected="second">
                <sp-radio value=${values[0]}>Option 1</sp-radio>
                <sp-radio value=${values[1]}>Option 2</sp-radio>
                <sp-radio value=${values[2]}>Option 3</sp-radio>
            </sp-radio-group>
        `);

        await elementUpdated(el);
        const first = el.querySelector('[value="first"]') as Radio;
        const selected = el.querySelector('[value="second"]') as Radio;
        expect(selected.tabIndex).to.equal(0);
        expect(first.tabIndex).to.equal(-1);

        await sendMouse([
            {
                type: 'move',
                position: [first, 'top-left'],
            },
            {
                type: 'down',
            },
        ]);
        await elementUpdated(el);

        // Safari can have a situation where it thinks the root is focused, but really something inside of the
        // element is focused instead, this tests for both no focus on the root or focus inside of the element.
        expect(
            !first.matches(':focus') || first.matches(':focus-within'),
            'root should not'
        ).to.be.true;
    });
    it('does not select on focus', async () => {
        const el = await fixture<RadioGroup>(html`
            <sp-radio-group>
                <sp-radio value="1">Options 1</sp-radio>
                <sp-radio value="2">Options 2</sp-radio>
                <sp-radio value="3">Options 3</sp-radio>
                <sp-radio value="4">Options 4</sp-radio>
                <sp-radio value="5">Options 5</sp-radio>
            </sp-radio-group>
        `);

        await elementUpdated(el);

        const radio1 = el.querySelector('sp-radio:nth-child(1)') as Radio;
        const radio2 = el.querySelector('sp-radio:nth-child(2)') as Radio;

        expect(el.selected).to.equal('');

        radio1.focus();
        await elementUpdated(el);

        expect(el.selected).to.equal('');
        el.selected = '1';
        await elementUpdated(el);

        expect(el.selected).to.equal('1');
        expect(radio1.checked).to.be.true;
        radio2.focus();
        await elementUpdated(el);

        expect(el.selected).to.equal('1');
        expect(radio1.checked).to.be.true;
    });
    it('loads accepts keyboard events while focused', async () => {
        const el = await fixture<RadioGroup>(html`
            <sp-radio-group>
                <sp-radio>Options 1</sp-radio>
                <sp-radio>Options 2</sp-radio>
                <sp-radio>Options 3</sp-radio>
                <sp-radio>Options 4</sp-radio>
                <sp-radio>Options 5</sp-radio>
            </sp-radio-group>
        `);

        await elementUpdated(el);

        const radio1 = el.querySelector('sp-radio:nth-child(1)') as Radio;
        const radio2 = el.querySelector('sp-radio:nth-child(2)') as Radio;
        const radio3 = el.querySelector('sp-radio:nth-child(3)') as Radio;
        const radio4 = el.querySelector('sp-radio:nth-child(4)') as Radio;
        const radio5 = el.querySelector('sp-radio:nth-child(5)') as Radio;

        radio1.focus();
        await elementUpdated(el);

        el.dispatchEvent(arrowRightEvent());
        await elementUpdated(el);

        expect(document.activeElement === radio2).to.be.true;

        el.dispatchEvent(arrowDownEvent());
        await elementUpdated(el);

        expect(document.activeElement === radio3).to.be.true;

        el.dispatchEvent(endEvent());
        await elementUpdated(el);

        expect(document.activeElement === radio5).to.be.true;

        el.dispatchEvent(arrowLeftEvent());
        await elementUpdated(el);

        expect(document.activeElement === radio4).to.be.true;

        el.dispatchEvent(arrowUpEvent());
        await elementUpdated(el);

        expect(document.activeElement === radio3).to.be.true;

        el.dispatchEvent(homeEvent());
        await elementUpdated(el);

        expect(document.activeElement === radio1).to.be.true;

        radio1.blur();
    });
    it('accepts keyboard interactions where `checked` and `calculateFocusInIndex` might conflict', async () => {
        const el = await fixture<RadioGroup>(html`
            <sp-radio-group>
                <sp-radio>Options 1</sp-radio>
                <sp-radio>Options 2</sp-radio>
                <sp-radio>Options 3</sp-radio>
                <sp-radio>Options 4</sp-radio>
                <sp-radio>Options 5</sp-radio>
            </sp-radio-group>
        `);

        await elementUpdated(el);

        const radio1 = el.querySelector('sp-radio:nth-child(1)') as Radio;
        const radio5 = el.querySelector('sp-radio:nth-child(5)') as Radio;

        radio5.focus();
        await elementUpdated(el);
        expect(document.activeElement === radio5).to.be.true;
        expect(radio5.checked).to.be.true;

        await sendKeys({ press: 'ArrowRight' });
        await elementUpdated(el);

        expect(document.activeElement === radio1).to.be.true;
        expect(radio1.checked).to.be.true;
    });
    it('acknowledges `disabled` and accepts keyboard events while focused', async () => {
        const el = await fixture<RadioGroup>(html`
            <sp-radio-group>
                <sp-radio value="1" disabled>Option 1</sp-radio>
                <sp-radio value="2">Option 2</sp-radio>
                <sp-radio value="3">Option 3</sp-radio>
                <sp-radio value="4">Option 4</sp-radio>
                <sp-radio value="5" disabled>Option 5</sp-radio>
            </sp-radio-group>
        `);

        await elementUpdated(el);

        const radio2 = el.querySelector('sp-radio:nth-child(2)') as Radio;
        const radio4 = el.querySelector('sp-radio:nth-child(4)') as Radio;

        radio2.focus();
        await elementUpdated(el);
        expect(document.activeElement === radio2, 'start 2').to.be.true;
        expect(el.selected).to.equal('');

        el.dispatchEvent(enterEvent());
        el.dispatchEvent(endEvent());
        await elementUpdated(el);
        expect(document.activeElement === radio4, 'first 4').to.be.true;
        expect(el.selected).to.equal('4');

        el.dispatchEvent(homeEvent());
        await elementUpdated(el);

        expect(document.activeElement === radio2, 'second 2').to.be.true;

        el.dispatchEvent(arrowUpEvent());
        await elementUpdated(el);

        expect(document.activeElement === radio4, 'third 4').to.be.true;

        el.dispatchEvent(arrowDownEvent());
        await elementUpdated(el);

        expect(document.activeElement === radio2, 'fourth 2').to.be.true;
    });
});

describe('Group Accessibility', () => {
    it('created the expected accessibility tree', async () => {
        await fixture(html`
            <sp-radio-group label="Testing Label" tabindex="0">
                <sp-radio value="first">Option 1</sp-radio>
                <sp-radio value="second" checked>Option 2</sp-radio>
                <sp-radio value="third">Option 3</sp-radio>
            </sp-radio-group>
        `);

        type NamedRoledAndCheckedNode = {
            name: string;
            role: string;
            checked: boolean;
        };
        const snapshot = (await a11ySnapshot(
            {}
        )) as unknown as NamedRoledAndCheckedNode & {
            children: NamedRoledAndCheckedNode[];
        };

        expect(
            findAccessibilityNode<NamedRoledAndCheckedNode>(
                snapshot,
                (
                    node // Firefox uses 'group' instead of 'radiogroup' here.
                ) =>
                    (node.role === 'radiogroup' || node.role === 'group') &&
                    node.name === 'Testing Label'
            ),
            'Has a "radiogroup" with the supplied name'
        ).to.not.be.null;
        expect(
            findAccessibilityNode<NamedRoledAndCheckedNode>(
                snapshot,
                (node) =>
                    node.role === 'radio' &&
                    node.checked &&
                    node.name === 'Option 2'
            ),
            'Has a named and checked "radio" element'
        ).to.not.be.null;
        expect(
            findAccessibilityNode<NamedRoledAndCheckedNode>(
                snapshot,
                (node) =>
                    node.name === 'Option 2' && node.role.startsWith('text')
            ),
            'Does not have a text leaf named like the "radio" element'
        ).to.be.null;
    });
});

describe('dev mode', () => {
    let consoleWarnStub!: ReturnType<typeof stub>;
    before(() => {
        window.__swc.verbose = true;
        consoleWarnStub = stub(console, 'warn');
    });
    afterEach(() => {
        consoleWarnStub.resetHistory();
    });
    after(() => {
        window.__swc.verbose = false;
        consoleWarnStub.restore();
    });
    it('warns when [invalid] is used on children and updates group invalid state', async () => {
        const el = await fixture<RadioGroup>(html`
            <sp-radio-group>
                <sp-radio value="first" invalid>Option 1</sp-radio>
                <sp-radio value="second">Option 2</sp-radio>
            </sp-radio-group>
        `);
        await elementUpdated(el);

        expect(el.invalid).to.be.true;
        expect(el.hasAttribute('aria-invalid')).to.be.true;
        expect(consoleWarnStub.called).to.be.true;
    });
});

describe('Radio Group', () => {
    let testDiv!: HTMLDivElement;
    beforeEach(async () => {
        testDiv = await fixture<HTMLDivElement>(html`
            <div id="test-radio-group">
                <sp-radio-group id="test-default">
                    <sp-radio value="first" checked>Option 1</sp-radio>
                    <sp-radio value="second">Option 2</sp-radio>
                    <sp-radio value="third">Option 3</sp-radio>
                </sp-radio-group>
                <sp-radio-group id="test-multiple-checked">
                    <sp-radio value="first" checked>Option 1</sp-radio>
                    <sp-radio value="second" checked>Option 2</sp-radio>
                    <sp-radio value="third">Option 3</sp-radio>
                </sp-radio-group>
                <sp-radio-group id="test-disabled">
                    <sp-radio value="first" checked>Option 1</sp-radio>
                    <sp-radio value="second" disabled>Option 2</sp-radio>
                </sp-radio-group>
                <sp-radio-group id="test-all-checked">
                    <sp-radio value="first" checked>Option 1</sp-radio>
                    <sp-radio value="second" checked>Option 2</sp-radio>
                </sp-radio-group>
                <sp-radio-group id="test-selected" selected="third">
                    <sp-radio value="first">Option 1</sp-radio>
                    <sp-radio value="second">Option 2</sp-radio>
                    <sp-radio value="third">Option 3</sp-radio>
                </sp-radio-group>
                <sp-radio-group id="test-selected-click" selected="third">
                    <sp-radio value="first">Option 1</sp-radio>
                    <sp-radio value="second">Option 2</sp-radio>
                    <sp-radio value="third">Option 3</sp-radio>
                </sp-radio-group>
                <sp-radio-group id="test-checked-prioritized" selected="second">
                    <sp-radio value="first" checked>Option 1</sp-radio>
                    <sp-radio value="second">Option 2</sp-radio>
                </sp-radio-group>
                <sp-radio-group id="test-integer-value" selected="5">
                    <sp-radio value="5" checked>Option 5</sp-radio>
                    <sp-radio value="7">Option 7</sp-radio>
                </sp-radio-group>
                <sp-radio-group id="test-none-selected">
                    <sp-radio value="first">Option 1</sp-radio>
                    <sp-radio value="second">Option 2</sp-radio>
                    <sp-radio value="third">Option 3</sp-radio>
                </sp-radio-group>
            </div>
        `);
    });

    it('loads', () => {
        const radioGroup = testDiv.querySelector(
            'sp-radio-group#test-default'
        ) as RadioGroup;
        const radioChildren = radioGroup.querySelectorAll('sp-radio');

        expect(radioGroup).to.exist;
        expect(radioChildren.length).to.equal(3);
    });

    it('loads accessibly', async () => {
        await expect(testDiv).to.be.accessible();
    });

    it('validates selection', async () => {
        const radioGroup = testDiv.querySelector(
            'sp-radio-group#test-none-selected'
        ) as RadioGroup;
        expect(radioGroup.selected).to.equal('');

        radioGroup.selected = 'missing';
        await elementUpdated(radioGroup);

        expect(radioGroup.selected).to.equal('');
    });

    it('can have selection prevented', async () => {
        const el = testDiv.querySelector(
            'sp-radio-group#test-default'
        ) as RadioGroup;
        const secondRadio = el.querySelector('sp-radio[value=second]') as Radio;
        const thirdRadio = el.querySelector('sp-radio[value=third]') as Radio;

        await elementUpdated(el);
        expect(el.selected).to.equal('first');

        secondRadio.click();

        await elementUpdated(el);
        expect(el.selected).to.equal('second');

        el.addEventListener('change', (event) => event.preventDefault());

        thirdRadio.click();

        await elementUpdated(el);
        expect(el.selected).to.equal('second');
    });

    it('reflects checked radio with selected property', async () => {
        const radioGroup = testDiv.querySelector(
            'sp-radio-group#test-default'
        ) as RadioGroup;
        const firstRadio = radioGroup.querySelector(
            'sp-radio[value=first]'
        ) as Radio;
        const secondRadio = radioGroup.querySelector(
            'sp-radio[value=second]'
        ) as Radio;
        const thirdRadio = radioGroup.querySelector(
            'sp-radio[value=third]'
        ) as Radio;

        expect(firstRadio.checked).to.be.true;
        expect(secondRadio.checked).to.be.false;
        expect(thirdRadio.checked).to.be.false;
        expect(radioGroup.selected).to.equal(firstRadio.value);

        secondRadio.click();
        await elementUpdated(radioGroup);

        expect(firstRadio.checked).to.be.false;
        expect(secondRadio.checked).to.be.true;
        expect(thirdRadio.checked).to.be.false;
        expect(radioGroup.selected).to.equal(secondRadio.value);

        thirdRadio.click();
        await elementUpdated(radioGroup);

        expect(firstRadio.checked).to.be.false;
        expect(secondRadio.checked).to.be.false;
        expect(thirdRadio.checked).to.be.true;
        expect(radioGroup.selected).to.equal(thirdRadio.value);
    });

    it('forces only one radio to be checked', () => {
        const radioGroup = testDiv.querySelector(
            'sp-radio-group#test-multiple-checked'
        ) as RadioGroup;
        const checkedRadios = radioGroup.querySelectorAll('sp-radio[checked]');

        expect(radioGroup.selected).to.equal('first');
        expect(checkedRadios.length).to.equal(1);
    });

    it('respects clicking on disabled attribute causing nothing to happen', async () => {
        const radioGroup = testDiv.querySelector(
            'sp-radio-group#test-disabled'
        ) as RadioGroup;
        const checkedRadio = radioGroup.querySelector(
            'sp-radio[checked]'
        ) as Radio;
        const disabledRadio = radioGroup.querySelector(
            'sp-radio[disabled]'
        ) as Radio;

        disabledRadio.click();
        await elementUpdated(radioGroup);

        expect(disabledRadio.checked).to.be.false;
        expect(checkedRadio.checked).to.be.true;
        expect(radioGroup.selected).to.equal(checkedRadio.value);
    });

    it('de-checks all but first checked radio if multiple checked', () => {
        const radioGroup = testDiv.querySelector(
            'sp-radio-group#test-multiple-checked'
        ) as RadioGroup;
        const radio1 = radioGroup.querySelector(
            'sp-radio[value=first]'
        ) as Radio;
        const radio2 = radioGroup.querySelector(
            'sp-radio[value=second]'
        ) as Radio;

        expect(radioGroup.selected).to.equal('first');
        expect(radio1.checked).to.be.true;
        expect(radio2.checked).to.be.false;
    });

    it('ensures setting selection updates checked radio', async () => {
        const radioGroup = testDiv.querySelector(
            'sp-radio-group#test-selected'
        ) as RadioGroup;
        const radio1 = radioGroup.querySelector(
            'sp-radio[value=first]'
        ) as Radio;
        const radio2 = radioGroup.querySelector(
            'sp-radio[value=second]'
        ) as Radio;
        const radio3 = radioGroup.querySelector(
            'sp-radio[value=third]'
        ) as Radio;

        expect(radioGroup.selected).to.equal('third');
        expect(radio1.checked).to.be.false;
        expect(radio2.checked).to.be.false;
        expect(radio3.checked, 'initial').to.be.true;

        radioGroup.selected = 'second';
        await elementUpdated(radioGroup);

        expect(radioGroup.selected).to.equal('second');
        expect(radio1.checked).to.be.false;
        expect(radio2.checked, 'second').to.be.true;
        expect(radio3.checked).to.be.false;

        radioGroup.selected = 'first';
        await elementUpdated(radioGroup);

        expect(radioGroup.selected).to.equal('first');
        expect(radio1.checked, 'third').to.be.true;
        expect(radio2.checked).to.be.false;
        expect(radio3.checked).to.be.false;
    });

    it('ensures setting selected and clicking on radio both work together', async () => {
        const radioGroup = testDiv.querySelector(
            'sp-radio-group#test-selected-click'
        ) as RadioGroup;
        const radio1 = radioGroup.querySelector(
            'sp-radio[value=first]'
        ) as Radio;
        const radio2 = radioGroup.querySelector(
            'sp-radio[value=second]'
        ) as Radio;
        const radio3 = radioGroup.querySelector(
            'sp-radio[value=third]'
        ) as Radio;

        expect(radioGroup.selected).to.equal('third');
        radio2.click();
        await elementUpdated(radioGroup);

        expect(radioGroup.selected).to.equal('second');
        expect(radio1.checked).to.be.false;
        expect(radio2.checked).to.be.true;
        expect(radio3.checked).to.be.false;

        radioGroup.selected = 'first';
        await elementUpdated(radioGroup);

        expect(radioGroup.selected).to.equal('first');
        expect(radio1.checked, 'moved to checked').to.be.true;
        expect(radio2.checked).to.be.false;
        expect(radio3.checked).to.be.false;
    });

    it('prioritizes checked over selected on initialization when conflicting', () => {
        const radioGroup = testDiv.querySelector(
            'sp-radio-group#test-checked-prioritized'
        ) as RadioGroup;
        const radio1 = radioGroup.querySelector(
            'sp-radio[value=first]'
        ) as Radio;
        const radio2 = radioGroup.querySelector(
            'sp-radio[value=second]'
        ) as Radio;

        expect(radioGroup.selected).to.equal('first');
        expect(radio1.checked).to.be.true;
        expect(radio2.checked).to.be.false;
    });

    it('handles integer values for radio buttons', () => {
        const radioGroup = testDiv.querySelector(
            'sp-radio-group#test-integer-value'
        ) as RadioGroup;
        expect(radioGroup.selected).to.equal('5');
    });

    it('prevents `change` events from radio buttons', async () => {
        const changeSpy = spy();
        const onChange = (event: Event & { target: RadioGroup }): void => {
            changeSpy(event.target.selected);
        };
        const el = await fixture(html`
            <sp-radio-group @change=${onChange}>
                <sp-radio value="bulbasaur">Bulbasaur</sp-radio>
                <sp-radio value="squirtle">Squirtle</sp-radio>
                <sp-radio value="charmander">Charmander</sp-radio>
            </sp-radio-group>
        `);

        const bulbasaur = el.querySelector('[value="bulbasaur"]') as Radio;
        const charmander = el.querySelector('[value="charmander"]') as Radio;
        bulbasaur.click();
        bulbasaur.click();
        charmander.click();

        expect(changeSpy.calledWith(undefined)).to.be.false;
    });

    it('updates [aria-invalid] when [invalid] changes', async () => {
        const el = await fixture<RadioGroup>(html`
            <sp-radio-group invalid>
                <sp-radio value="first">Option 1</sp-radio>
                <sp-radio value="second">Option 2</sp-radio>
            </sp-radio-group>
        `);
        await elementUpdated(el);
        expect(el.hasAttribute('aria-invalid')).to.be.true;
        expect(el.getAttribute('aria-invalid')).to.equal('true');
        el.invalid = false;
        await elementUpdated(el);
        expect(el.hasAttribute('aria-invalid')).to.be.false;
        el.invalid = true;
        await elementUpdated(el);
        expect(el.hasAttribute('aria-invalid')).to.be.true;
        expect(el.getAttribute('aria-invalid')).to.equal('true');
    });

    it('should not have invalid state when children do not have invalid attribute', async () => {
        const swcWarnSpy = spy(window.__swc, 'warn');
        const el = await fixture<RadioGroup>(html`
            <sp-radio-group>
                <sp-radio value="first">Option 1</sp-radio>
                <sp-radio value="second">Option 2</sp-radio>
            </sp-radio-group>
        `);
        await elementUpdated(el);

        expect(el.invalid).to.be.false;
        expect(el.hasAttribute('aria-invalid')).to.be.false;
        expect(swcWarnSpy.called).to.be.false;
        swcWarnSpy.restore();
    });

    it('should update group invalid state when child radio has invalid attribute and then remove it', async () => {
        const el = await fixture<RadioGroup>(html`
            <sp-radio-group>
                <sp-radio value="first" checked>Option 1</sp-radio>
                <sp-radio value="second">Option 2</sp-radio>
            </sp-radio-group>
        `);
        await elementUpdated(el);

        const childRadio = el.querySelector('sp-radio') as Radio;
        childRadio.setAttribute('invalid', 'true');

        await elementUpdated(el);
        expect(el.invalid).to.be.true;
        expect(el.hasAttribute('aria-invalid')).to.be.true;

        childRadio.removeAttribute('invalid');
        await elementUpdated(el);
        expect(el.invalid).to.be.false;
        expect(el.hasAttribute('aria-invalid')).to.be.false;
    });
});

describe('Radio Group - late children', () => {
    it('accepts frame late children', async () => {
        /**
         * In some cases (e.g. when wrapped in React components) will cause otherwise standard looking
         * DOM structures to add `<sp-radio>` children to `<sp-radio-group>` parents in a non-syncronous manner.
         *
         * This test emulates that render process to ensure that validation will still work as expect in that context.
         */
        const test = await fixture(html`
            <div>
                <sp-radio value="first">Bulbasaur</sp-radio>
                <sp-radio value="second">Squirtle</sp-radio>
                <sp-radio value="third">Charmander</sp-radio>
                <sp-radio value="fourth">Other</sp-radio>
            </div>
        `);
        const group = document.createElement('sp-radio-group');
        const buttons = [...test.querySelectorAll('sp-radio')] as Radio[];

        test.append(group);
        group.selected = 'first';
        Promise.resolve().then(function () {
            group.append(...buttons);
        });
        await nextFrame();
        await nextFrame();

        expect(group.buttons.length).to.equal(4);
        expect(group.selected).to.equal('first');
    });
    it('emits change events on arrow key events', async () => {
        const changeSpy = spy();
        const onChange = (event: Event & { target: RadioGroup }): void => {
            changeSpy(event.target.selected);
        };
        const el = await fixture<RadioGroup>(html`
            <sp-radio-group @change=${onChange}>
                <sp-radio value="bulbasaur">Bulbasaur</sp-radio>
                <sp-radio value="squirtle">Squirtle</sp-radio>
                <sp-radio value="charmander">Charmander</sp-radio>
            </sp-radio-group>
        `);
        const bulbasaur = el.querySelector('[value="bulbasaur"]') as Radio;
        const squirtle = el.querySelector('[value="squirtle"]') as Radio;

        bulbasaur.focus();
        await elementUpdated(el);
        expect(changeSpy.callCount).to.equal(0);

        el.dispatchEvent(arrowRightEvent());
        await elementUpdated(el);
        expect(changeSpy.callCount).to.equal(1);
        expect(document.activeElement === squirtle).to.be.true;

        el.dispatchEvent(arrowLeftEvent());
        await elementUpdated(el);
        expect(changeSpy.callCount).to.equal(2);
        expect(document.activeElement === bulbasaur).to.be.true;
    });
});
