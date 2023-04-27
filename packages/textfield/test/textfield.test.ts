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
import { Textfield, TextfieldType } from '../';
import { elementUpdated, expect, html, litFixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { sendMouse } from '../../../test/plugins/browser.js';
import { findDescribedNode } from '../../../test/testing-helpers-a11y.js';
import { HelpText } from '@spectrum-web-components/help-text';
import '@spectrum-web-components/help-text/sp-help-text.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { isFirefox } from '@spectrum-web-components/shared/src/platform.js';

describe('Textfield', () => {
    testForLitDevWarnings(
        async () =>
            await litFixture<Textfield>(
                html`
                    <sp-textfield label="Enter Your Name"></sp-textfield>
                `
            )
    );
    it('loads default textfield accessibly', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield label="Enter Your Name"></sp-textfield>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads multiline textfield accessibly', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield label="Enter your name" multiline></sp-textfield>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('manages tabIndex while disabled', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield placeholder="Enter Your Name"></sp-textfield>
            `
        );

        await elementUpdated(el);

        expect(el.tabIndex).to.equal(0);

        el.disabled = true;
        await elementUpdated(el);

        expect(el.tabIndex).to.equal(-1);

        el.tabIndex = 2;
        await elementUpdated(el);

        expect(el.tabIndex).to.equal(-1);

        el.disabled = false;
        await elementUpdated(el);

        expect(el.tabIndex).to.equal(2);
    });

    it('manages tabIndex before first render', async () => {
        const el = document.createElement('sp-textfield') as Textfield;

        expect(el.focusElement).to.be.null;
        expect(el.tabIndex).to.equal(0);

        el.remove();
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
    it('resizes by default', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    multiline
                    label="No resize control"
                    placeholder="No resize control"
                ></sp-textfield>
            `
        );
        const startBounds = el.getBoundingClientRect();

        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [startBounds.right - 2, startBounds.bottom - 2],
                },
                {
                    type: 'down',
                },
                {
                    type: 'move',
                    position: [startBounds.right + 50, startBounds.bottom + 50],
                },
                {
                    type: 'up',
                },
            ],
        });

        const endBounds = el.getBoundingClientRect();
        expect(endBounds.width).to.be.greaterThan(startBounds.width);
        expect(endBounds.height).to.be.greaterThan(startBounds.height);
    });
    it('accepts resize styling', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    multiline
                    style="resize: none;"
                    label="No resize control"
                    placeholder="No resize control"
                ></sp-textfield>
            `
        );
        const startBounds = el.getBoundingClientRect();

        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [startBounds.right - 2, startBounds.bottom - 2],
                },
                {
                    type: 'down',
                },
                {
                    type: 'move',
                    position: [startBounds.right + 50, startBounds.bottom + 50],
                },
                {
                    type: 'up',
                },
            ],
        });

        const endBounds = el.getBoundingClientRect();
        expect(endBounds.width).equals(startBounds.width);
        expect(endBounds.height).equals(startBounds.height);
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
                    placeholder="Enter your number"
                    pattern="[\\d]+"
                    value="123"
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
    it('valid - required', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your number"
                    value="123"
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
    it('valid - multiline - required', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your number"
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
    it('valid - boundary-type assertions', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your number"
                    pattern="^[\\d]+$"
                    value="123"
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
    it('valid - multiline - boundary-type assertions', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your number"
                    pattern="^[\\d]+$"
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
    it('valid - unicode', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your name"
                    pattern="\\p{L}{4,8}"
                    value="你的名字"
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
    it('valid - multiline - unicode', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your name"
                    pattern="\\p{L}{4,8}"
                    value="你的名字"
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
                    placeholder="Enter your number"
                    pattern="[\\d]+"
                    value="123 not valid"
                    required
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
    it('invalid - multiline', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your number"
                    pattern="[\\d]+"
                    value="123 not valid"
                    required
                    multiline
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
    it('invalid - required', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your number"
                    value=""
                    required
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
    it('invalid - multiline - required', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your number"
                    value=""
                    required
                    multiline
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
    it('invalid - unicode', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your number"
                    pattern="\\p{N}+"
                    value="123 not valid"
                    required
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
    it('invalid - multiline - unicode', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your number"
                    pattern="\\p{N}+"
                    value="123 not valid"
                    required
                    multiline
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
    it('invalid - boundary-type assertions', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your number"
                    pattern="^\\p{N}+$"
                    value="123 not valid"
                    required
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
    it('invalid - multiline - boundary-type assertions', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your number"
                    pattern="^\\p{N}+$"
                    value="123 not valid"
                    required
                    multiline
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

        el.click();
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
    it('selects', async () => {
        const testValue = 'Test Name';
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield value=${testValue}></sp-textfield>
            `
        );
        await elementUpdated(el);
        expect(el.value).to.equal(testValue);

        el.focus();
        el.select();
        await sendKeys({ press: 'Backspace' });
        expect(el.value).to.equal('');
    });
    it('setSelectionRange', async () => {
        const testValue = 'Test Name';
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield value=${testValue}></sp-textfield>
            `
        );
        await elementUpdated(el);
        expect(el.value).to.equal(testValue);

        el.focus();
        el.setSelectionRange(0, 'Test '.length);
        await sendKeys({ press: 'Backspace' });
        expect(el.value).to.equal('Name');
    });
    it('handles minlength with required', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield required minlength="3"></sp-textfield>
            `
        );
        el.focus();
        await sendKeys({
            type: 'ab',
        });
        await elementUpdated(el);

        expect(el.value).to.equal('ab');
        expect(el.checkValidity()).to.be.false;

        await sendKeys({
            type: 'c',
        });
        await elementUpdated(el);

        expect(el.value).to.equal('abc');
        expect(el.checkValidity()).to.be.true;
    });
    it('accepts maxlength', async () => {
        const el = await litFixture<Textfield>(
            html`
                <sp-textfield
                    placeholder="Enter your name"
                    maxlength="3"
                    minlength="2"
                    required
                ></sp-textfield>
            `
        );
        await elementUpdated(el);
        el.focus();

        await sendKeys({
            type: 'a',
        });
        await elementUpdated(el);
        expect(el.value).to.equal('a');
        expect(el.checkValidity()).to.be.false;

        await sendKeys({
            type: 'b',
        });
        await elementUpdated(el);
        expect(el.value).to.equal('ab');
        expect(el.checkValidity());

        await sendKeys({
            type: 'c',
        });
        await elementUpdated(el);
        expect(el.value).to.equal('abc');
        expect(el.checkValidity());

        await sendKeys({
            type: 'd',
        });
        await elementUpdated(el);
        expect(el.value).to.equal('abc');
        expect(el.checkValidity());

        await sendKeys({
            press: 'Backspace',
        });
        await elementUpdated(el);
        expect(el.value).to.equal('ab');
        expect(el.checkValidity());

        await sendKeys({
            press: 'Backspace',
        });
        await elementUpdated(el);
        expect(el.value).to.equal('a');
        expect(el.checkValidity()).to.be.false;
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
        expect(testSource).to.equal(el);
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

        const inputElement = el.focusElement;

        el.focusElement.value = 'asdf';
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
    describe('type attribute', () => {
        // references:
        // https://developer.mozilla.org/en-US/docs/Glossary/IDL#content_versus_idl_attributes
        // https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes
        // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#keywords-and-enumerated-attributes

        it('assigns valid attributes to the property', async () => {
            const types: TextfieldType[] = [
                'text',
                'url',
                'tel',
                'email',
                'password',
            ];
            for await (const t of types) {
                const el = await litFixture<Textfield>(
                    html`
                        <sp-textfield type=${t}></sp-textfield>
                    `
                );
                expect(el.type).equals(t);

                el.setAttribute('type', 'url');
                expect(el.type).equals('url');
            }
        });
        it('represents invalid and missing attributes as "text"', async () => {
            const el1 = await litFixture<Textfield>(
                html`
                    <sp-textfield></sp-textfield>
                `
            );

            const el2 = await litFixture<Textfield>(
                html`
                    <sp-textfield type="time"></sp-textfield>
                `
            );
            expect(el1.type).equals('text');
            expect(el2.type).equals('text');

            el1.setAttribute('type', 'submit');
            expect(el1.type).equals('text');
        });
        it('reflects valid property assignments', async () => {
            const el = await litFixture<Textfield>(
                html`
                    <sp-textfield type="url"></sp-textfield>
                `
            );

            el.type = 'email';
            await elementUpdated(el);

            expect(el.getAttribute('type')).equals('email');
            expect(el.type).equals('email');
        });
        it('reflects invalid assignments but sets state to "text"', async () => {
            const el = await litFixture<Textfield>(
                html`
                    <sp-textfield type="url"></sp-textfield>
                `
            );

            // eslint-disable-next-line
            // @ts-ignore
            el.type = 'range';
            await elementUpdated(el);

            expect(el.getAttribute('type')).equals('range');
            expect(el.type).equals('text');
        });
    });
    describe('help text', () => {
        const name = 'This is a textfield';
        const description = 'This text helps you fill it out';
        const descriptionNegative = 'This text helps you when invalid';
        it('accepts help text in `slot="help-text"`', async () => {
            const el = await litFixture(html`
                <sp-textfield label=${name}>
                    <sp-help-text slot="help-text">${description}</sp-help-text>
                </sp-textfield>
            `);

            await elementUpdated(el);

            await findDescribedNode(name, description);
        });
        it('accepts help text in `slot="help-text"` w/ own ID', async () => {
            const el = await litFixture(html`
                <sp-textfield label=${name}>
                    <sp-help-text slot="help-text" id="help-text-id-1">
                        ${description}
                    </sp-help-text>
                </sp-textfield>
            `);

            await elementUpdated(el);

            await findDescribedNode(name, description);
        });
        it('manages neutral/negative help text pairs', async () => {
            const el = await litFixture<Textfield>(html`
                <sp-textfield label=${name}>
                    <sp-help-text slot="help-text">${description}</sp-help-text>
                    <sp-help-text slot="negative-help-text">
                        ${descriptionNegative}
                    </sp-help-text>
                </sp-textfield>
            `);
            const negativeHelpText = el.querySelector(
                '[slot="negative-help-text"]'
            ) as HelpText;

            await elementUpdated(el);

            expect(negativeHelpText.variant).to.equal('neutral');
            await findDescribedNode(name, description);

            el.invalid = true;
            await elementUpdated(el);

            expect(negativeHelpText.variant).to.equal('negative');
            // There's an issue in the way Firefox processes the a11y tree for
            // elements with an `invalid` attribute/property. The following try/catch
            // wrapping preps the code to pass in that context regardless and error
            // when our tooling no longer runs into this error.
            try {
                await findDescribedNode(name, descriptionNegative);
                if (isFirefox()) {
                    throw new Error('this does not fail anymore...');
                }
            } catch (error) {
                if (!isFirefox()) {
                    throw error;
                }
            }
        });
        it('manages neutral/negative help text pairs w/ own IDs', async () => {
            const el = await litFixture<Textfield>(html`
                <sp-textfield label=${name}>
                    <sp-help-text slot="help-text" id="help-text-id-2">
                        ${description}
                    </sp-help-text>
                    <sp-help-text slot="negative-help-text" id="help-text-id-3">
                        ${descriptionNegative}
                    </sp-help-text>
                </sp-textfield>
            `);
            const negativeHelpText = el.querySelector(
                '[slot="negative-help-text"]'
            ) as HelpText;

            await elementUpdated(el);

            expect(negativeHelpText.variant).to.equal('neutral');
            await findDescribedNode(name, description);

            el.invalid = true;
            await elementUpdated(el);

            expect(negativeHelpText.variant).to.equal('negative');
            // There's an issue in the way Firefox processes the a11y tree for
            // elements with an `invalid` attribute/property. The following try/catch
            // wrapping preps the code to pass in that context regardless and error
            // when our tooling no longer runs into this error.
            try {
                await findDescribedNode(name, descriptionNegative);
                if (isFirefox()) {
                    throw new Error('this does not fail anymore...');
                }
            } catch (error) {
                if (!isFirefox()) {
                    throw error;
                }
            }
        });
    });
});
