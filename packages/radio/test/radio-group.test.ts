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

import '../sp-radio-group.js';
import { RadioGroup } from '../';
import '@spectrum-web-components/radio/sp-radio.js';
import { Radio } from '@spectrum-web-components/radio';
import { fixture, elementUpdated, html, expect } from '@open-wc/testing';
import {
    arrowUpEvent,
    arrowDownEvent,
    arrowLeftEvent,
    arrowRightEvent,
    endEvent,
    homeEvent,
    pageUpEvent,
    pageDownEvent,
    enterEvent,
} from '../../../test/testing-helpers.js';

describe('Radio Group - focus control', () => {
    it('does not accept focus when empty', async () => {
        const el = await fixture<RadioGroup>(
            html`
                <sp-radio-group></sp-radio-group>
            `
        );

        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;
    });
    it('focuses selected before first', async () => {
        const el = await fixture<RadioGroup>(
            html`
                <sp-radio-group selected="second">
                    <sp-radio value="first">Option 1</sp-radio>
                    <sp-radio value="second">Option 2</sp-radio>
                    <sp-radio value="third">Option 3</sp-radio>
                </sp-radio-group>
            `
        );

        await elementUpdated(el);
        const selected = el.querySelector('[value="second"]') as Radio;

        expect(document.activeElement === el).to.be.false;

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement === selected).to.be.true;
    });
    it('loads accepts keyboard events while focused', async () => {
        const el = await fixture<RadioGroup>(
            html`
                <sp-radio-group>
                    <sp-radio>Options 1</sp-radio>
                    <sp-radio>Options 2</sp-radio>
                    <sp-radio>Options 3</sp-radio>
                    <sp-radio>Options 4</sp-radio>
                    <sp-radio>Options 5</sp-radio>
                </sp-radio-group>
            `
        );

        await elementUpdated(el);

        const radio1 = el.querySelector('sp-radio:nth-child(1)') as Radio;
        const radio2 = el.querySelector('sp-radio:nth-child(2)') as Radio;
        const radio3 = el.querySelector('sp-radio:nth-child(3)') as Radio;
        const radio4 = el.querySelector('sp-radio:nth-child(4)') as Radio;
        const radio5 = el.querySelector('sp-radio:nth-child(5)') as Radio;

        radio1.focus();
        await elementUpdated(el);

        el.dispatchEvent(pageUpEvent);
        el.dispatchEvent(arrowRightEvent);
        await elementUpdated(el);

        expect(document.activeElement === radio2).to.be.true;

        el.dispatchEvent(arrowDownEvent);
        await elementUpdated(el);

        expect(document.activeElement === radio3).to.be.true;

        el.dispatchEvent(endEvent);
        await elementUpdated(el);

        expect(document.activeElement === radio5).to.be.true;

        el.dispatchEvent(arrowLeftEvent);
        await elementUpdated(el);

        expect(document.activeElement === radio4).to.be.true;

        el.dispatchEvent(arrowUpEvent);
        await elementUpdated(el);

        expect(document.activeElement === radio3).to.be.true;

        el.dispatchEvent(homeEvent);
        await elementUpdated(el);

        expect(document.activeElement === radio1).to.be.true;

        radio1.blur();
    });
    it('loads accepts keyboard events while focused', async () => {
        const el = await fixture<RadioGroup>(
            html`
                <sp-radio-group>
                    <sp-radio disabled>Option 1</sp-radio>
                    <sp-radio>Option 2</sp-radio>
                    <sp-radio>Option 3</sp-radio>
                    <sp-radio>Option 4</sp-radio>
                    <sp-radio disabled>Option 5</sp-radio>
                </sp-radio-group>
            `
        );

        await elementUpdated(el);

        const radio2 = el.querySelector('sp-radio:nth-child(2)') as Radio;
        const radio4 = el.querySelector('sp-radio:nth-child(4)') as Radio;

        radio2.focus();
        await elementUpdated(el);

        el.dispatchEvent(enterEvent);
        el.dispatchEvent(endEvent);
        await elementUpdated(el);

        expect(document.activeElement === radio4).to.be.true;

        el.dispatchEvent(homeEvent);
        await elementUpdated(el);

        expect(document.activeElement === radio2).to.be.true;

        el.dispatchEvent(arrowUpEvent);
        await elementUpdated(el);

        expect(document.activeElement === radio4).to.be.true;

        el.dispatchEvent(arrowDownEvent);
        await elementUpdated(el);

        expect(document.activeElement === radio2).to.be.true;
    });
    it('loads accepts "PageUp" and "PageDown" keys', async () => {
        const el = await fixture<HTMLDivElement>(
            html`
                <div>
                    <sp-radio-group>
                        <sp-radio>Option 1</sp-radio>
                    </sp-radio-group>
                    <sp-radio-group>
                        <sp-radio>Option 2</sp-radio>
                    </sp-radio-group>
                    <sp-radio-group></sp-radio-group>
                    <sp-radio-group>
                        <sp-radio disabled>Option 3</sp-radio>
                        <sp-radio>Option 4</sp-radio>
                    </sp-radio-group>
                </div>
            `
        );

        const radioGroup1 = el.querySelector(
            'sp-radio-group:nth-child(1)'
        ) as RadioGroup;
        const radioGroup2 = el.querySelector(
            'sp-radio-group:nth-child(2)'
        ) as RadioGroup;
        const radioGroup4 = el.querySelector(
            'sp-radio-group:nth-child(4)'
        ) as RadioGroup;

        const radio1 = radioGroup1.querySelector('sp-radio') as Radio;
        const radio2 = radioGroup2.querySelector('sp-radio') as Radio;
        const radio4 = radioGroup4.querySelector(
            'sp-radio:not([disabled])'
        ) as Radio;

        radio1.focus();
        radio1.dispatchEvent(pageUpEvent);

        expect(document.activeElement === radio4).to.be.true;

        radio4.dispatchEvent(pageDownEvent);

        expect(document.activeElement === radio1).to.be.true;

        radio1.dispatchEvent(pageDownEvent);

        expect(document.activeElement === radio2).to.be.true;

        radio2.dispatchEvent(pageDownEvent);

        expect(document.activeElement === radio4, 'Focuses `radio4`').to.be
            .true;
    });
});

function inputForRadio(radio: Radio): HTMLInputElement {
    if (!radio.shadowRoot) throw new Error('No shadowRoot');

    return radio.shadowRoot.querySelector('#input') as HTMLInputElement;
}

describe('Radio Group', () => {
    let testDiv!: HTMLDivElement;

    beforeEach(async () => {
        testDiv = await fixture<HTMLDivElement>(
            html`
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
                    <sp-radio-group
                        id="test-selected-prioritized"
                        selected="second"
                    >
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
            `
        );
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

    it('validates selection', () => {
        const radioGroup = testDiv.querySelector(
            'sp-radio-group#test-none-selected'
        ) as RadioGroup;
        expect(radioGroup.selected).to.equal('');

        radioGroup.selected = 'missing';

        expect(radioGroup.selected).to.equal('');
    });

    it('can have selection prevented', async () => {
        const el = testDiv.querySelector(
            'sp-radio-group#test-default'
        ) as RadioGroup;

        await elementUpdated(el);
        expect(el.selected).to.equal('first');

        el.selected = 'second';

        await elementUpdated(el);
        expect(el.selected).to.equal('second');

        el.addEventListener('change', (event) => event.preventDefault());

        el.selected = 'third';

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

        inputForRadio(secondRadio).click();
        await elementUpdated(radioGroup);

        expect(firstRadio.checked).to.be.false;
        expect(secondRadio.checked).to.be.true;
        expect(thirdRadio.checked).to.be.false;
        expect(radioGroup.selected).to.equal(secondRadio.value);

        inputForRadio(thirdRadio).click();
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

        inputForRadio(disabledRadio).click();
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
        expect(radio3.checked).to.be.true;

        radioGroup.selected = 'second';
        await elementUpdated(radioGroup);

        expect(radioGroup.selected).to.equal('second');
        expect(radio1.checked).to.be.false;
        expect(radio2.checked).to.be.true;
        expect(radio3.checked).to.be.false;

        radioGroup.selected = 'first';

        expect(radioGroup.selected).to.equal('first');
        expect(radio1.checked).to.be.true;
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

        inputForRadio(radio2).click();
        await elementUpdated(radioGroup);

        expect(radioGroup.selected).to.equal('second');
        expect(radio1.checked).to.be.false;
        expect(radio2.checked).to.be.true;
        expect(radio3.checked).to.be.false;

        radioGroup.selected = 'first';
        await elementUpdated(radioGroup);

        expect(radioGroup.selected).to.equal('first');
        expect(radio1.checked).to.be.true;
        expect(radio2.checked).to.be.false;
        expect(radio3.checked).to.be.false;
    });

    it('prioritizes selected over checked on initialization when conflicting', () => {
        const radioGroup = testDiv.querySelector(
            'sp-radio-group#test-selected-prioritized'
        ) as RadioGroup;
        const radio1 = radioGroup.querySelector(
            'sp-radio[value=first]'
        ) as Radio;
        const radio2 = radioGroup.querySelector(
            'sp-radio[value=second]'
        ) as Radio;

        expect(radioGroup.selected).to.equal('second');
        expect(radio1.checked).to.be.false;
        expect(radio2.checked).to.be.true;
    });

    it('handles integer values for radio buttons', () => {
        const radioGroup = testDiv.querySelector(
            'sp-radio-group#test-integer-value'
        ) as RadioGroup;
        expect(radioGroup.selected).to.equal('5');
    });
});
