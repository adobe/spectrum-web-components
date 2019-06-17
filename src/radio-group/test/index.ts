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
import { RadioGroup } from '..';
import '..';
import { Radio } from '../../radio';
import '../../radio';

function inputForRadio(radio: Radio): HTMLInputElement {
    if (!radio.shadowRoot) throw new Error('No shadowRoot');

    return radio.shadowRoot.querySelector('#input') as HTMLInputElement;
}

describe('Radio Group', () => {
    it('loads', () => {
        const radioGroup = document.querySelector(
            'sp-radio-group#test-default'
        ) as RadioGroup;
        const radioChildren = radioGroup.querySelectorAll('sp-radio');

        expect(radioGroup).to.exist;
        expect(radioChildren.length).to.equal(3);
    });

    it('reflects checked radio with selected property', () => {
        const radioGroup = document.querySelector(
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

        radioGroup.updateComplete.then(() => {
            expect(firstRadio.checked).to.be.false;
            expect(secondRadio.checked).to.be.true;
            expect(thirdRadio.checked).to.be.false;
            expect(radioGroup.selected).to.equal(secondRadio.value);
        });

        inputForRadio(thirdRadio).click();

        radioGroup.updateComplete.then(() => {
            expect(firstRadio.checked).to.be.false;
            expect(secondRadio.checked).to.be.false;
            expect(thirdRadio.checked).to.be.true;
            expect(radioGroup.selected).to.equal(thirdRadio.value);
        });
    });

    it('forces only one radio to be checked', () => {
        const radioGroup = document.querySelector(
            'sp-radio-group#test-multiple-checked'
        ) as RadioGroup;
        const checkedRadios = radioGroup.querySelectorAll('sp-radio[checked]');

        expect(radioGroup.selected).to.equal('first');
        expect(checkedRadios.length).to.equal(1);
    });

    it('respects clicking on disabled attribute causing nothing to happen', () => {
        const radioGroup = document.querySelector(
            'sp-radio-group#test-disabled'
        ) as RadioGroup;
        const checkedRadio = radioGroup.querySelector(
            'sp-radio[checked]'
        ) as Radio;
        const disabledRadio = radioGroup.querySelector(
            'sp-radio[disabled]'
        ) as Radio;

        inputForRadio(disabledRadio).click();

        radioGroup.updateComplete.then(() => {
            expect(disabledRadio.checked).to.be.false;
            expect(checkedRadio.checked).to.be.true;
            expect(radioGroup.selected).to.equal(checkedRadio.value);
        });
    });

    it('de-checks all but first checked radio if multiple checked', () => {
        const radioGroup = document.querySelector(
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

    it('ensures setting selection updates checked radio', () => {
        const radioGroup = document.querySelector(
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

        radioGroup.updateComplete.then(() => {
            expect(radioGroup.selected).to.equal('second');
            expect(radio1.checked).to.be.false;
            expect(radio2.checked).to.be.true;
            expect(radio3.checked).to.be.false;
        });

        radioGroup.selected = 'first';

        radioGroup.updateComplete.then(() => {
            expect(radioGroup.selected).to.equal('first');
            expect(radio1.checked).to.be.true;
            expect(radio2.checked).to.be.false;
            expect(radio3.checked).to.be.false;
        });
    });

    it('ensures setting selected and clicking on radio both work together', () => {
        const radioGroup = document.querySelector(
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

        expect(radioGroup.selected).to.equal('second');
        expect(radio1.checked).to.be.false;
        expect(radio2.checked).to.be.true;
        expect(radio3.checked).to.be.false;

        radioGroup.selected = 'first';

        radioGroup.updateComplete.then(() => {
            expect(radioGroup.selected).to.equal('first');
            expect(radio1.checked).to.be.true;
            expect(radio2.checked).to.be.false;
            expect(radio3.checked).to.be.false;
        });
    });

    it('prioritizes selected over checked on initialization when conflicting', () => {
        const radioGroup = document.querySelector(
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
