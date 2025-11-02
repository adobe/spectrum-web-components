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

import { shouldPolyfill } from '@formatjs/intl-numberformat/should-polyfill.js';
import { elementUpdated, expect, nextFrame } from '@open-wc/testing';
import { html } from '@spectrum-web-components/base';
import { createLanguageContext } from '../../../tools/reactive-controllers/test/helpers.js';
import { getElFrom } from './helpers.js';

import { remapMultiByteCharacters } from '@spectrum-web-components/number-field';
import '@spectrum-web-components/number-field/sp-number-field.js';
import { sendKeys } from '@web/test-runner-commands';
import {
    currency,
    decimals,
    Default,
    minMax,
    percents,
} from '../stories/number-field.stories.js';
import { sendTabKey } from '../../../test/testing-helpers.js';

describe('NumberField - inputs', () => {
    before(async () => {
        const shouldPolyfillEn = shouldPolyfill('en');
        const shouldPolyfillEs = shouldPolyfill('es');
        const shouldPolyfillFr = shouldPolyfill('fr');
        if (shouldPolyfillEn || shouldPolyfillEs || shouldPolyfillFr) {
            await import('@formatjs/intl-numberformat/polyfill-force.js');
        }
        if (shouldPolyfillEn) {
            await import('@formatjs/intl-numberformat/locale-data/en.js');
        }
        if (shouldPolyfillEs) {
            await import('@formatjs/intl-numberformat/locale-data/es.js');
        }
        if (shouldPolyfillFr) {
            await import('@formatjs/intl-numberformat/locale-data/fr.js');
        }
    });
    describe('keystroke prevention', () => {
        it('converts 2 byte characters, default', async () => {
            const el = await getElFrom(html`
                ${Default()}
            `);
            await elementUpdated(el);

            el.focus();
            await sendKeys({ type: '３、５６７、８９０。１' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('3,567,890.1');
        });
        it('converts 2 byte characters, percents', async () => {
            const el = await getElFrom(html`
                ${percents()}
            `);
            await elementUpdated(el);

            el.focus();
            await sendKeys({ type: '２４％' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('24%');
        });
        it('prevents second "." in EN', async () => {
            const el = await getElFrom(html`
                ${Default()}
            `);
            el.formatOptions = {
                maximumFractionDigits: 2,
            };
            await elementUpdated(el);

            el.focus();
            await sendKeys({ type: '1.1.1' });
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
            await sendKeys({ type: 'D2.2' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('2.2');

            el.value = NaN;

            await sendKeys({ type: '8u23.s7' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('823.7');
        });
        it('allows "-" to start', async () => {
            const el = await getElFrom(html`
                ${Default()}
            `);
            await elementUpdated(el);

            el.focus();
            await sendKeys({ type: '-54' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('-54');
        });
        it('prevents "-" not at the start', async () => {
            const el = await getElFrom(html`
                ${Default()}
            `);
            await elementUpdated(el);

            el.focus();
            await sendKeys({ type: '54-' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('54');

            el.value = NaN;

            await sendKeys({ type: '5-4' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('54');
        });
        it('prevent "+" to start, normally', async () => {
            const el = await getElFrom(html`
                ${Default()}
            `);
            await elementUpdated(el);

            el.focus();
            await sendKeys({ type: '+54' });
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
            await sendKeys({ type: '+54' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('+54');
        });
        it('prevents "%" when when not percents', async () => {
            const el = await getElFrom(html`
                ${Default()}
            `);
            await elementUpdated(el);

            el.focus();
            await sendKeys({ type: '63%' });
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
            await sendKeys({ type: '63%' });
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
            await sendKeys({ press: 'Backspace' });
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
            await sendKeys({ type: '5.2' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('52');
            await sendKeys({ press: 'Enter' });
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
            await sendKeys({ type: '٢١' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('21');
            await sendKeys({ press: 'Enter' });
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
            await sendKeys({ type: '二一' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('21');
            await sendKeys({ press: 'Enter' });
            await elementUpdated(el);
            expect(el.value).to.equal(21);
        });
    });
    describe('user suplied large numbers', () => {
        it('do not crash the Number Field', async () => {
            const el = await getElFrom(minMax(minMax.args));
            await elementUpdated(el);

            el.focus();
            await sendKeys({ type: '12345678901234567890' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('255');
            await sendKeys({ press: 'Enter' });
            await elementUpdated(el);
            expect(el.value).to.equal(255);
        });
    });
    describe('with floating point numbers', () => {
        it('do not crash the Number Field', async () => {
            const el = await getElFrom(minMax(minMax.args));
            el.setAttribute('min', '0.1');
            el.setAttribute('step', '0.01');
            el.setAttribute('value', '0.5');
            await elementUpdated(el);

            el.focus();
            await sendKeys({ type: '6' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('0.56');
            await sendKeys({ press: 'Enter' });
            await elementUpdated(el);
            expect(el.value).to.equal(0.56);
        });
    });
    describe('locale specific', () => {
        it('can determine the group symbol', async () => {
            const [languageContext] = createLanguageContext('es-ES');
            const el = await getElFrom(html`
                <div @sp-language-context=${languageContext}>${Default()}</div>
            `);
            await elementUpdated(el);

            el.focus();
            await sendKeys({ type: '123.456.789' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('123.456.789');
            await sendTabKey();
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('123.456.789');
        });
    });
    describe('2-byte characters', () => {
        const numbers = Object.keys(remapMultiByteCharacters);
        // only `１`-`０` can be accepted as single key inputs.
        numbers.splice(10);
        numbers.forEach((input) => {
            const actual = remapMultiByteCharacters[input];
            it(`accepts "${input}" as "${actual}"`, async () => {
                const el = await getElFrom(Default());
                el.focusElement.value = input;
                el.focusElement.dispatchEvent(
                    new Event('input', {
                        bubbles: true,
                        cancelable: true,
                        composed: true,
                    })
                );
                await elementUpdated(el);

                expect(el.formattedValue).to.equal(actual);
                expect(el.value).to.equal(Number(actual));
            });
        });
        it('accepts "、" as "," and "。" as "."', async () => {
            const el = await getElFrom(Default(Default.args));
            el.focusElement.value = '１、２３４。５6';
            el.focusElement.dispatchEvent(
                new Event('input', {
                    bubbles: true,
                    cancelable: true,
                    composed: true,
                })
            );
            await elementUpdated(el);

            expect(el.formattedValue).to.equal('1,234.56');
            expect(el.value).to.equal(Number(1234.56));
        });
        it('accepts misplaced "、" and corrects them', async () => {
            const el = await getElFrom(Default(Default.args));
            const nextFocusableElement = document.createElement('input');
            el.insertAdjacentElement('afterend', nextFocusableElement);
            el.focus();
            await elementUpdated(el);

            el.focusElement.value = '１２、３４５６、７。８９';
            el.focusElement.dispatchEvent(
                new Event('input', {
                    bubbles: true,
                    cancelable: true,
                    composed: true,
                })
            );
            await elementUpdated(el);

            expect(el.focusElement.value, 'visible').to.equal('12,3456,7.89');
            expect(el.formattedValue, 'tracked').to.equal('1,234,567.89');
            expect(el.value, 'value').to.equal(Number(1234567.89));

            await sendTabKey();
            await elementUpdated(el);
            expect(el.focusElement.value, 'visible').to.equal('1,234,567.89');
            expect(el.formattedValue, 'tracked').to.equal('1,234,567.89');
            expect(el.value, 'value').to.equal(Number(1234567.89));
            nextFocusableElement.remove();
        });
        it('accepts "＋" as "+" and "ー" as "-"', async () => {
            const el = await getElFrom(decimals(decimals.args));
            el.focusElement.value = '＋９。８７';
            el.focusElement.dispatchEvent(
                new Event('input', {
                    bubbles: true,
                    cancelable: true,
                    composed: true,
                })
            );
            await elementUpdated(el);

            expect(el.formattedValue).to.equal('+9.87');
            expect(el.value).to.equal(Number(9.87));

            el.focusElement.value = 'ー９．８７';
            el.focusElement.dispatchEvent(
                new Event('input', {
                    bubbles: true,
                    cancelable: true,
                    composed: true,
                })
            );
            await elementUpdated(el);

            expect(el.formattedValue).to.equal('-9.87');
            expect(el.value).to.equal(Number(-9.87));
        });
        it('accepts "％" as "%"', async () => {
            const el = await getElFrom(percents(percents.args));
            el.focusElement.value = '１０％';
            el.focusElement.dispatchEvent(
                new Event('input', {
                    bubbles: true,
                    cancelable: true,
                    composed: true,
                })
            );
            await elementUpdated(el);

            expect(el.formattedValue).to.equal('10%');
            expect(el.value).to.equal(Number(0.1));
        });
        it('does not accept non-numeric characters', async () => {
            const el = await getElFrom(Default(Default.args));

            el.focusElement.focus();
            el.dispatchEvent(new CompositionEvent('compositionstart'));
            await sendKeys({ type: 'あい' });

            await elementUpdated(el.focusElement);
            await nextFrame();

            expect(el.focusElement.value).to.equal('100');
            el.dispatchEvent(new CompositionEvent('compositionend'));

            await nextFrame();
            expect(el.focusElement.value).to.equal('100');
        });
    });
});
