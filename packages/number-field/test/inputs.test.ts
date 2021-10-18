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

import { html } from '@lliad-ui/base';
import { elementUpdated, expect } from '@open-wc/testing';
import { getElFrom, createLanguageContext } from './helpers.js';
import polyfillCheck from '@formatjs/intl-numberformat/should-polyfill.js';

import '../sp-number-field.js';
import {
    currency,
    Default,
    percents,
} from '../stories/number-field.stories.js';
import { sendKeys } from '@web/test-runner-commands';

describe('NumberField - inputs', () => {
    before(async () => {
        if (polyfillCheck.shouldPolyfill()) {
            await import('@formatjs/intl-numberformat/polyfill.js');
        }
        if (
            (Intl.NumberFormat as unknown as { polyfilled: boolean }).polyfilled
        ) {
            await import('@formatjs/intl-numberformat/locale-data/en.js');
            await import('@formatjs/intl-numberformat/locale-data/es.js');
        }
    });
    describe('keystroke prevention', () => {
        it('prevents second "." in EN', async () => {
            const el = await getElFrom(html`
                ${Default()}
            `);
            el.formatOptions = {
                maximumFractionDigits: 2,
            };
            await elementUpdated(el);

            el.focus();
            await sendKeys({
                type: '1.1.1',
            });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('1.11');
        });
        it('prevents text characters', async () => {
            const el = await getElFrom(html`
                ${Default()}
            `);
            el.formatOptions = {
                maximumFractionDigits: 1,
            };
            await elementUpdated(el);

            el.focus();
            await sendKeys({
                type: 'D2.2',
            });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('2.2');

            el.value = NaN;

            await sendKeys({
                type: '8u23.s7',
            });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('823.7');
        });
        it('allows "-" to start', async () => {
            const el = await getElFrom(html`
                ${Default()}
            `);
            await elementUpdated(el);

            el.focus();
            await sendKeys({
                type: '-54',
            });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('-54');
        });
        it('prevents "-" not at the start', async () => {
            const el = await getElFrom(html`
                ${Default()}
            `);
            await elementUpdated(el);

            el.focus();
            await sendKeys({
                type: '54-',
            });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('54');

            el.value = NaN;

            await sendKeys({
                type: '5-4',
            });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('54');
        });
        it('prevent "+" to start, normally', async () => {
            const el = await getElFrom(html`
                ${Default()}
            `);
            await elementUpdated(el);

            el.focus();
            await sendKeys({
                type: '+54',
            });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('54');
        });
        it('allow "+" to start when "signDisplay: always"', async () => {
            const el = await getElFrom(html`
                ${Default()}
            `);
            await elementUpdated(el);
            el.formatOptions = {
                signDisplay: 'always',
            };
            el.focus();
            await sendKeys({
                type: '+54',
            });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('+54');
        });
        it('prevents "%" when when not percents', async () => {
            const el = await getElFrom(html`
                ${Default()}
            `);
            await elementUpdated(el);

            el.focus();
            await sendKeys({
                type: '63%',
            });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('63');
            el.blur();
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('63');
        });
        it('allows "%" when percents, and keeps "%" on blur', async () => {
            const el = await getElFrom(html`
                ${percents()}
            `);
            await elementUpdated(el);

            el.focus();
            await sendKeys({
                type: '63%',
            });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('63%');
            el.blur();
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('63%');
        });
        it('prevents "Backspace" on curreny value text, and keeps currency value text of blur', async () => {
            const el = await getElFrom(html`
                ${currency({ value: 234.21 })}
            `);
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('EUR 234.21');

            el.focus();
            (
                el as unknown as {
                    inputElement: HTMLInputElement;
                }
            ).inputElement.setSelectionRange(2, 2);
            await sendKeys({
                press: 'Backspace',
            });
            await elementUpdated(el);
            expect(
                (el as unknown as { inputElement: HTMLInputElement })
                    .inputElement.value
            ).to.equal('EUR 234.21');
            el.blur();
            await elementUpdated(el);
            expect(
                (el as unknown as { inputElement: HTMLInputElement })
                    .inputElement.value
            ).to.equal('EUR 234.21');
        });
        it('prevents "." when `maximumFractionDigits: 0`', async () => {
            const el = await getElFrom(html`
                ${Default()}
            `);
            await elementUpdated(el);
            el.formatOptions = {
                maximumFractionDigits: 0,
            };
            el.focus();
            await elementUpdated(el);
            await sendKeys({
                type: '5.2',
            });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('52');
            await sendKeys({
                press: 'Enter',
            });
            await elementUpdated(el);
            expect(el.value).to.equal(52);
        });
        xit('allow arabic numerals entered', async () => {
            // Safari requires more polyfilling for this text
            const el = await getElFrom(html`
                ${Default()}
            `);
            await elementUpdated(el);

            el.focus();
            await elementUpdated(el);
            await sendKeys({
                type: '٢١',
            });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('21');
            await sendKeys({
                press: 'Enter',
            });
            await elementUpdated(el);
            expect(el.value).to.equal(21);
        });
        xit('allow hanidec numerals entered', async () => {
            // Safari requires more polyfilling for this text
            const el = await getElFrom(html`
                ${Default()}
            `);
            await elementUpdated(el);

            el.focus();
            await elementUpdated(el);
            await sendKeys({
                type: '二一',
            });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('21');
            await sendKeys({
                press: 'Enter',
            });
            await elementUpdated(el);
            expect(el.value).to.equal(21);
        });
    });
    describe('locale specific', () => {
        it('can determine the group symbol', async () => {
            const languageContext = createLanguageContext('es-ES');
            const el = await getElFrom(html`
                <div @sp-language-context=${languageContext}>${Default()}</div>
            `);
            await elementUpdated(el);

            el.focus();
            await sendKeys({
                type: '123.456.789',
            });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('123.456.789');
            await sendKeys({
                press: 'Tab',
            });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('123.456.789');
        });
    });
});
