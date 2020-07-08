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
import '../sp-textfield.js';
import { Textfield } from '../';
import { litFixture, html, elementUpdated, expect } from '@open-wc/testing';

describe('Textfield', () => {
    it('loads default textfield accessibly', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield placeholder="Enter Your Name"></sp-textfield>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads multiline textfield accessibly', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your name"
                    multiline
                ></sp-textfield>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads', async () => {
        const testPlaceholder = 'Enter your name';
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield placeholder=${testPlaceholder}></sp-textfield>
            `
        );
        expect(el).to.not.equal(undefined);
        const input = el.shadowRoot
            ? el.shadowRoot.querySelector('input')
            : null;
        expect(input).to.not.be.null;
        const placeholder = input ? input.placeholder : null;
        expect(placeholder).to.equal(testPlaceholder);
    });
    it('multiline', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your name"
                    multiline
                ></sp-textfield>
            `
        );
        expect(el).to.not.equal(undefined);
        const input = el.shadowRoot
            ? el.shadowRoot.querySelector('textarea')
            : null;
        expect(input).to.not.be.null;
    });
    it('grows', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your name"
                    multiline
                    grows
                ></sp-textfield>
            `
        );
        expect(el).to.not.equal(undefined);
        const sizer = el.shadowRoot
            ? el.shadowRoot.querySelector('#sizer')
            : null;
        expect(sizer).to.not.be.null;
    });
    it('valid', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your name"
                    value="Your name"
                    required
                ></sp-textfield>
            `
        );
        await elementUpdated(el);

        expect(el).to.not.equal(undefined);
        const input = el.shadowRoot
            ? el.shadowRoot.querySelector('#valid')
            : null;
        expect(input).to.not.be.null;
    });

    it('valid - multiline', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your number"
                    pattern="[\\d]+"
                    value="123"
                    required
                    multiline
                ></sp-textfield>
            `
        );
        await elementUpdated(el);

        expect(el).to.not.equal(undefined);
        const input = el.shadowRoot
            ? el.shadowRoot.querySelector('#valid')
            : null;
        expect(input).to.not.be.null;
    });
    it('invalid', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your name"
                    pattern="[\\d]+"
                    required
                    value="Not a valid input"
                ></sp-textfield>
            `
        );
        await elementUpdated(el);

        expect(el).to.not.equal(undefined);
        const input = el.shadowRoot
            ? el.shadowRoot.querySelector('#invalid')
            : null;
        expect(input).to.not.be.null;
    });
    it('receives focus', async () => {
        let activeElement: HTMLInputElement | null = null;
        const onFocusIn = (event: Event): void => {
            const path = event.composedPath();
            activeElement = path[0] as HTMLInputElement;
        };
        document.addEventListener('focusin', onFocusIn);
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield placeholder="Enter your name"></sp-textfield>
            `
        );
        await elementUpdated(el);

        el.focus();
        await elementUpdated(el);

        expect(activeElement === el.focusElement).to.be.true;
        document.removeEventListener('focusin', onFocusIn);
    });
    it('does not receive focus when disabled', async () => {
        let activeElement: HTMLInputElement | null = null;
        const onFocusIn = (event: Event): void => {
            const path = event.composedPath();
            activeElement = path[0] as HTMLInputElement;
        };
        document.addEventListener('focusin', onFocusIn);
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    disabled
                    placeholder="Enter your name"
                ></sp-textfield>
            `
        );
        await elementUpdated(el);

        el.focus();
        await elementUpdated(el);

        expect(activeElement === el.focusElement).to.be.false;
        expect(document.activeElement === el).to.be.false;
        document.removeEventListener('focusin', onFocusIn);
    });
    it('accepts input', async () => {
        const testValue = 'Test Name';
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield placeholder="Enter your name"></sp-textfield>
            `
        );
        await elementUpdated(el);

        el.focusElement.value = testValue;
        el.focusElement.dispatchEvent(new Event('input'));

        expect(el.value).to.equal(testValue);
    });
    it('dispatches a `change` event', async () => {
        const testValue = 'Test Name';
        let eventSource = null as Textfield | null;
        const onChange = (event: Event): void => {
            eventSource = event.composedPath()[0] as Textfield;
        };
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your name"
                    @change=${onChange}
                ></sp-textfield>
            `
        );
        await elementUpdated(el);

        el.focusElement.value = testValue;
        el.focusElement.dispatchEvent(new Event('input'));
        el.focusElement.dispatchEvent(new Event('change'));

        expect(el.value).to.equal(testValue);
        const testSource = eventSource as Textfield;
        expect(testSource.isSameNode(el)).to.be.true;
    });
    it('passes through `autocomplete` attribute', async () => {
        let el = await litFixture<Textfield>(
            html`
                <sp-textfield autocomplete="off"></sp-textfield>
            `
        );
        await elementUpdated(el);
        let input = el.shadowRoot ? el.shadowRoot.querySelector('input') : null;
        expect(input).to.exist;
        if (input) {
            expect(input.getAttribute('autocomplete')).to.equal('off');
        }

        el = await litFixture<Textfield>(
            html`
                <sp-textfield></sp-textfield>
            `
        );
        await elementUpdated(el);
        input = el.shadowRoot ? el.shadowRoot.querySelector('input') : null;
        expect(input).to.exist;
        if (input) {
            expect(input.getAttribute('autocomplete')).to.not.exist;
        }
    });
    it('tests on `required` changes', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield value=""></sp-textfield>
            `
        );
        await elementUpdated(el);
        expect(el.invalid).to.be.false;

        el.required = true;
        await elementUpdated(el);
        expect(el.invalid).to.be.true;
    });
    it('manages `allowed-keys`', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield allowed-keys="asdf"></sp-textfield>
            `
        );
        await elementUpdated(el);
        expect(el.value).to.equal('');

        const inputElement = (el.shadowRoot
            ? el.shadowRoot.querySelector('#input')
            : el.querySelector('#input')) as HTMLInputElement;

        inputElement.value = 'asdf';
        inputElement.dispatchEvent(new InputEvent('input'));

        await elementUpdated(el);
        expect(el.value).to.equal('asdf');

        inputElement.value = `asdff`;
        inputElement.setSelectionRange(1, 1);
        inputElement.dispatchEvent(new InputEvent('input'));

        await elementUpdated(el);
        expect(el.value).to.equal('asdff');
        expect(inputElement.selectionStart).to.equal(1);

        inputElement.value = `asdoff`;
        inputElement.setSelectionRange(4, 4);
        inputElement.dispatchEvent(new InputEvent('input'));

        await elementUpdated(el);
        expect(el.value).to.equal('asdff');
        expect(inputElement.selectionStart).to.equal(3);
    });
});
