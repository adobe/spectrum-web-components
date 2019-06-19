/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { RadioGroup } from '../src/radio-group';
import '../src/radio-group';
import { Radio } from '../src/radio';
import '../src/radio';
import { fixture, elementUpdated } from '@open-wc/testing-helpers';
import { html } from 'lit-html';

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
                    <sp-radio-group id="test-multiple-checked">
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
});
