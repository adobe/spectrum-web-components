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
import {
    aTimeout,
    elementUpdated,
    expect,
    fixtureCleanup,
    nextFrame,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import { html } from '@spectrum-web-components/base';

import {
    CHANGE_DEBOUNCE_MS,
    FRAMES_PER_CHANGE,
    indeterminatePlaceholder,
    NumberField,
} from '@spectrum-web-components/number-field';
import '@spectrum-web-components/number-field/sp-number-field.js';
import { isWebKit } from '@spectrum-web-components/shared';
import {
    a11ySnapshot,
    findAccessibilityNode,
    resetMouse,
    sendKeys,
    setUserAgent,
} from '@web/test-runner-commands';
import { SinonSpy, spy } from 'sinon';
import { sendMouse } from '../../../test/plugins/browser.js';
import {
    fixture,
    mouseClickOn,
    mouseMoveOver,
    sendTabKey,
    testForLitDevWarnings,
} from '../../../test/testing-helpers.js';
import { createLanguageContext } from '../../../tools/reactive-controllers/test/helpers.js';
import {
    currency,
    decimals,
    Default,
    germanDecimals,
    indeterminate,
    percents,
    pixels,
    units,
} from '../stories/number-field.stories.js';
import { clickBySelector, getElFrom } from './helpers.js';

// Helper function to set up input and change spies
function setupEventSpies(element: NumberField): {
    inputSpy: SinonSpy;
    changeSpy: SinonSpy;
} {
    const inputSpy = spy();
    const changeSpy = spy();
    element.addEventListener('input', () => inputSpy());
    element.addEventListener('change', () => changeSpy());
    return { inputSpy, changeSpy };
}

describe('NumberField', () => {
    before(async () => {
        const shouldPolyfillEn = shouldPolyfill('en');
        const shouldPolyfillFr = shouldPolyfill('fr');
        if (shouldPolyfillEn || shouldPolyfillFr) {
            await import('@formatjs/intl-numberformat/polyfill-force.js');
        }
        if (shouldPolyfillEn) {
            await import('@formatjs/intl-numberformat/locale-data/en.js');
        }
        if (shouldPolyfillFr) {
            await import('@formatjs/intl-numberformat/locale-data/fr.js');
        }
    });
    testForLitDevWarnings(async () => await getElFrom(Default({})));
    it('loads default number-field accessibly', async () => {
        const el = await getElFrom(Default({}));
        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    describe('receives input', () => {
        it('without language context', async () => {
            const el = await getElFrom(Default({ value: 1337 }));

            el.size = 's';
            expect(el.formattedValue).to.equal('1,337');
            expect(el.valueAsString).to.equal('1337');
            expect(el.value).to.equal(1337);
            expect(el.focusElement.value).to.equal('1,337');
            el.focus();
            await sendKeys({ type: '7331' });
            await elementUpdated(el);
            await sendKeys({ press: 'Enter' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('13,377,331');
            expect(el.valueAsString).to.equal('13377331');
            expect(el.value).to.equal(13377331);
            expect(el.focusElement.value).to.equal('13,377,331');
        });
        it('with language context', async () => {
            const [languageContext] = createLanguageContext('fr');
            const el = await getElFrom(html`
                <div @sp-language-context=${languageContext}>
                    ${Default({ value: 1337 })}
                </div>
            `);

            el.size = 'l';
            expect(el.formattedValue).to.equal('1 337');
            expect(el.valueAsString).to.equal('1337');
            expect(el.value).to.equal(1337);
            expect(el.focusElement.value).to.equal('1 337');
            el.focus();
            await sendKeys({ type: '7331' });
            await elementUpdated(el);
            await sendKeys({ press: 'Enter' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('13 377 331');
            expect(el.valueAsString).to.equal('13377331');
            expect(el.value).to.equal(13377331);
            expect(el.focusElement.value).to.equal('13 377 331');
        });
    });
    xit('correctly interprets decimal point on iPhone', async () => {
        // setUserAgent is not currently supported by Playwright
        await setUserAgent(
            'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
        );
        const el = await getElFrom(decimals({ value: 1234 }));
        expect(el.formattedValue).to.equal('1,234');

        el.focus();
        await sendKeys({ press: 'Backspace' });
        el.blur();
        expect(el.formattedValue).to.equal('123');

        el.focus();
        await sendKeys({ type: '45' });
        el.blur();
        expect(el.formattedValue).to.equal('12,345');

        el.focus();
        await sendKeys({ type: ',6' });
        el.blur();
        expect(el.formattedValue).to.equal('12,345.6');

        el.focus();
        await sendKeys({ type: ',7' });
        el.blur();
        expect(el.formattedValue).to.equal('123,456.7');

        el.focus();
        await sendKeys({ press: 'Backspace' });
        await sendKeys({ press: 'Backspace' });
        el.blur();
        expect(el.formattedValue).to.equal('123,456');
    });
    describe('Step', () => {
        it('can be 0', async () => {
            const el = await getElFrom(
                Default({
                    step: 0,
                    min: 0,
                    max: 10,
                    value: 5,
                })
            );

            el.size = 'xl';
            expect(el.value).to.equal(5);
            expect(el.formattedValue).to.equal('5');
            expect(el.valueAsString).to.equal('5');
            expect(el.focusElement.value).to.equal('5');
        });
        it('respects other locales', async () => {
            const el = await getElFrom(
                germanDecimals({
                    step: 0.01,
                })
            );
            el.value = 2.42;
            await elementUpdated(el);
            el.size = 'xl';
            expect(el.value).to.equal(2.42);
            expect(el.formattedValue).to.equal('+2,42');
            expect(el.focusElement.value).to.equal('+2,42');

            await clickBySelector(el, '.step-up');

            expect(el.value).to.equal(2.43);
            expect(el.formattedValue).to.equal('+2,43');
            expect(el.focusElement.value).to.equal('+2,43');
        });
        it('supports both positive and negative decimal values', async () => {
            const el = await getElFrom(
                Default({
                    step: 0.001,
                    min: -10,
                    max: 10,
                    value: -2.4,
                })
            );

            el.size = 'xl';
            expect(el.value).to.equal(-2.4);
            expect(el.valueAsString).to.equal('-2.4');
            expect(el.focusElement.value).to.equal('-2.4');
        });
        it('correctly handles max values greater than 1000 with step=1', async () => {
            const el = await getElFrom(
                Default({
                    step: 1,
                    min: 0,
                    max: 200000,
                    value: 999,
                })
            );

            await clickBySelector(el, '.step-up');

            expect(el.value).to.equal(1000);
            expect(el.valueAsString).to.equal('1000');
            expect(el.formattedValue).to.equal('1,000');
            expect(el.focusElement.value).to.equal('1,000');

            el.value = 15000;
            await elementUpdated(el);

            expect(el.value).to.equal(15000);
            expect(el.valueAsString).to.equal('15000');
            expect(el.formattedValue).to.equal('15,000');
            expect(el.focusElement.value).to.equal('15,000');
        });
    });
    describe('Increments', () => {
        let el: NumberField;

        beforeEach(async () => {
            el = await getElFrom(Default({}));
            expect(el.value).to.be.NaN;
            expect(el.formattedValue).to.equal('');
            expect(el.valueAsString).to.equal('NaN');
            expect(el.focusElement.value).to.equal('');
        });
        it('via pointer, only "left" button', async () => {
            await clickBySelector(el, '.step-up', { button: 'middle' });
            expect(el.formattedValue).to.equal('');
            expect(el.valueAsString).to.equal('NaN');
            expect(el.value).to.be.NaN;
            expect(el.focusElement.value).to.equal('');
        });

        it('via pointer', async () => {
            await clickBySelector(el, '.step-up');
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
            expect(el.focusElement.value).to.equal('0');
            await clickBySelector(el, '.step-up');
            expect(el.formattedValue).to.equal('1');
            expect(el.valueAsString).to.equal('1');
            expect(el.value).to.equal(1);
            expect(el.focusElement.value).to.equal('1');
        });
        it('via arrow up', async () => {
            el.focus();
            await elementUpdated(el);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
            expect(el.focusElement.value).to.equal('0');
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('1');
            expect(el.valueAsString).to.equal('1');
            expect(el.value).to.equal(1);
            expect(el.focusElement.value).to.equal('1');
        });
        it('via arrow up (shift modified)', async () => {
            el.focus();
            await elementUpdated(el);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
            expect(el.focusElement.value).to.equal('0');
            await sendKeys({ press: 'Shift+ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
            expect(el.focusElement.value).to.equal('10');
        });
        it('via arrow up (custom shift modified value)', async () => {
            el.focus();
            (el as NumberField).stepModifier = 5;
            (el as NumberField).step = 3;
            await elementUpdated(el);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
            expect(el.focusElement.value).to.equal('0');
            await sendKeys({ press: 'Shift+ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('15');
            expect(el.valueAsString).to.equal('15');
            expect(el.value).to.equal(15);
            expect(el.focusElement.value).to.equal('15');
        });
        it('via scroll', async () => {
            el.focus();
            await elementUpdated(el);
            expect(el.focused).to.be.true;
            el.dispatchEvent(new WheelEvent('wheel', { deltaY: 1 }));
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
            expect(el.focusElement.value).to.equal('0');
            el.dispatchEvent(new WheelEvent('wheel', { deltaY: 100 }));
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('1');
            expect(el.valueAsString).to.equal('1');
            expect(el.value).to.equal(1);
            expect(el.focusElement.value).to.equal('1');
        });
        it('via scroll (shift modified)', async () => {
            el.focus();
            await elementUpdated(el);
            expect(el.focused).to.be.true;
            el.dispatchEvent(
                new WheelEvent('wheel', {
                    deltaX: 1,
                    shiftKey: true,
                })
            );
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
            expect(el.focusElement.value).to.equal('0');
            el.dispatchEvent(
                new WheelEvent('wheel', {
                    deltaX: 100,
                    shiftKey: true,
                })
            );
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
            expect(el.focusElement.value).to.equal('10');
        });
    });
    describe('Decrements', () => {
        let el: NumberField;

        beforeEach(async () => {
            el = await getElFrom(Default({}));
            expect(el.value).to.be.NaN;
            expect(el.formattedValue).to.equal('');
            expect(el.valueAsString).to.equal('NaN');
            expect(el.focusElement.value).to.equal('');
        });
        it('via pointer, only "left" button', async () => {
            await clickBySelector(el, '.step-down', { button: 'middle' });
            expect(el.formattedValue).to.equal('');
            expect(el.valueAsString).to.equal('NaN');
            expect(el.value).to.be.NaN;
            expect(el.focusElement.value).to.equal('');
        });
        it('via pointer', async () => {
            await clickBySelector(el, '.step-down');
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
            expect(el.focusElement.value).to.equal('0');
            await clickBySelector(el, '.step-down');
            expect(el.formattedValue).to.equal('-1');
            expect(el.valueAsString).to.equal('-1');
            expect(el.value).to.equal(-1);
            expect(el.focusElement.value).to.equal('-1');
        });
        it('via arrow down', async () => {
            el.focus();
            await elementUpdated(el);
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
            expect(el.focusElement.value).to.equal('0');
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('-1');
            expect(el.valueAsString).to.equal('-1');
            expect(el.value).to.equal(-1);
            expect(el.focusElement.value).to.equal('-1');
        });
        it('via arrow down (shift modified)', async () => {
            el.focus();
            await elementUpdated(el);
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
            expect(el.focusElement.value).to.equal('0');
            await sendKeys({ press: 'Shift+ArrowDown' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('-10');
            expect(el.valueAsString).to.equal('-10');
            expect(el.value).to.equal(-10);
            expect(el.focusElement.value).to.equal('-10');
        });
        it('via arrow up (custom shift modified value)', async () => {
            el.focus();
            (el as NumberField).stepModifier = 5;
            (el as NumberField).step = 3;
            await elementUpdated(el);
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
            expect(el.focusElement.value).to.equal('0');
            await sendKeys({ press: 'Shift+ArrowDown' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('-15');
            expect(el.valueAsString).to.equal('-15');
            expect(el.value).to.equal(-15);
            expect(el.focusElement.value).to.equal('-15');
        });
        it('via scroll', async () => {
            el.focus();
            await elementUpdated(el);
            expect(el.focused).to.be.true;
            el.dispatchEvent(new WheelEvent('wheel', { deltaY: -1 }));
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
            expect(el.focusElement.value).to.equal('0');
            el.dispatchEvent(new WheelEvent('wheel', { deltaY: -100 }));
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('-1');
            expect(el.valueAsString).to.equal('-1');
            expect(el.value).to.equal(-1);
            expect(el.focusElement.value).to.equal('-1');
        });
        it('via scroll (shift modified)', async () => {
            el.focus();
            await elementUpdated(el);
            expect(el.focused).to.be.true;
            el.dispatchEvent(
                new WheelEvent('wheel', {
                    deltaX: -1,
                    shiftKey: true,
                })
            );
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
            expect(el.focusElement.value).to.equal('0');
            el.dispatchEvent(
                new WheelEvent('wheel', {
                    deltaX: -100,
                    shiftKey: true,
                })
            );
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('-10');
            expect(el.valueAsString).to.equal('-10');
            expect(el.value).to.equal(-10);
            expect(el.focusElement.value).to.equal('-10');
        });
    });
    describe('dispatched events', () => {
        const inputSpy = spy();
        const changeSpy = spy();
        let el: NumberField;
        beforeEach(async () => {
            inputSpy.resetHistory();
            changeSpy.resetHistory();
            el = await getElFrom(Default({ value: 50 }));
            el.addEventListener('input', (event: Event) => {
                inputSpy((event.target as NumberField)?.value);
            });
            el.addEventListener('change', (event: Event) => {
                changeSpy((event.target as NumberField)?.value);
            });
        });
        it('except when changing `value` from the outside', async () => {
            el.focus();
            await elementUpdated(el);
            expect(el.focused).to.be.true;
            el.value = 51;
            expect(changeSpy.callCount).to.equal(0);
            await elementUpdated(el);
            el.value = 52;
            expect(changeSpy.callCount).to.equal(0);
        });
        it('handles IME input correctly and dispatches change event', async () => {
            el.focus();
            el.dispatchEvent(new CompositionEvent('compositionstart'));
            // input multibyte characters
            await sendKeys({ type: '１２３' });
            await elementUpdated(el);
            el.dispatchEvent(new CompositionEvent('compositionend'));
            await elementUpdated(el);
            await sendKeys({ press: 'Enter' });
            expect(el.value).to.equal(50123);
            expect(changeSpy.callCount).to.equal(1);
        });
        it('via scroll', async () => {
            el.focus();
            await elementUpdated(el);
            expect(el.focused).to.be.true;
            el.dispatchEvent(new WheelEvent('wheel', { deltaY: 1 }));
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('51');
            expect(el.valueAsString).to.equal('51');
            expect(el.value).to.equal(51);
            expect(inputSpy.callCount).to.equal(1);
            expect(changeSpy.callCount).to.equal(0);
            el.dispatchEvent(new WheelEvent('wheel', { deltaY: 100 }));
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('52');
            expect(el.valueAsString).to.equal('52');
            expect(el.value).to.equal(52);
            expect(inputSpy.callCount).to.equal(2);
            expect(changeSpy.callCount).to.equal(0);
            await aTimeout(CHANGE_DEBOUNCE_MS + 10);
            expect(inputSpy.callCount).to.equal(2);
            expect(changeSpy.callCount).to.equal(1);
        });
        it('has a useful `value`', async () => {
            el.focus();
            await sendKeys({ type: '7' });
            await sendKeys({ press: 'Enter' });
            expect(inputSpy.calledWith(507), 'input').to.be.true;
            expect(changeSpy.calledWith(507), 'change').to.be.true;
            await sendKeys({ type: ',00' });
            await sendKeys({ press: 'Enter' });
            expect(inputSpy.calledWith(5070), 'input').to.be.true;
            expect(inputSpy.calledWith(50700), 'input').to.be.true;
            expect(changeSpy.calledWith(50700), 'change').to.be.true;
        });
        it('has a useful `value` - percent', async () => {
            el.formatOptions = { style: 'percent' };
            el.value = 0.45;
            expect(el.value).to.equal(0.45);
            el.focus();
            await sendKeys({ type: '7' }); // Visible text: 45%7
            expect(inputSpy.calledWith(4.57), 'first input').to.be.true;
            await sendKeys({ press: 'Backspace' }); // Visible text: 45%
            await sendKeys({ press: 'Backspace' }); // Visible text: 45
            await sendKeys({ press: 'Backspace' }); // Visible text: 4
            await sendKeys({ press: 'Enter' });
            expect(el.value).to.equal(0.04);
            expect(inputSpy.calledWith(0.45), 'second input').to.be.true;
            expect(inputSpy.calledWith(0.04), 'third input').to.be.true;
            expect(changeSpy.calledWith(0.04), 'change').to.be.true;
        });
        it('has a useful `value` - currency', async () => {
            el.formatOptions = {
                style: 'currency',
                currency: 'EUR',
                currencyDisplay: 'code',
                currencySign: 'accounting',
            };
            await elementUpdated(el);
            el.value = 45;
            expect(el.value).to.equal(45);
            el.focus();
            await sendKeys({ type: '7' }); // Visible text: EUR 45.007
            expect(el.value).to.equal(45.007);
            expect(inputSpy.calledWith(el.value), 'first input').to.be.true;
            await sendKeys({ press: 'ArrowLeft' }); // Visible text: EUR 45.007
            await sendKeys({ press: 'ArrowLeft' }); // Visible text: EUR 45.007
            await sendKeys({ press: 'ArrowLeft' }); // Visible text: EUR 45.007
            await sendKeys({ press: 'ArrowLeft' }); // Visible text: EUR 45.007
            await sendKeys({ press: 'ArrowLeft' }); // Visible text: EUR 45.007
            await sendKeys({ press: 'ArrowLeft' }); // Visible text: EUR 45.007
            await sendKeys({ press: 'ArrowLeft' }); // Visible text: EUR 45.007
            await sendKeys({ press: 'ArrowLeft' }); // Visible text: EUR 45.007
            await sendKeys({ press: 'ArrowLeft' }); // Visible text: EUR 45.007
            await sendKeys({ press: 'ArrowLeft' }); // Visible text: EUR 45.007
            await sendKeys({ type: '1' }); // Visible text: 1EUR 45.007
            await sendKeys({ press: 'Enter' }); // Visible text: EUR 145.01
            expect(el.value).to.equal(145.007);
            expect(inputSpy.calledWith(145.007), 'second input').to.be.true;
            expect(changeSpy.calledWith(145.007), 'change').to.be.true;
        });
        it('one input/one change for each Arrow*', async () => {
            el.focus();
            await sendKeys({ press: 'ArrowUp' });
            expect(inputSpy.callCount).to.equal(1);
            expect(changeSpy.callCount).to.equal(1);
            expect(el.value).to.equal(51);
            await sendKeys({ press: 'ArrowDown' });
            expect(inputSpy.callCount).to.equal(2);
            expect(changeSpy.callCount).to.equal(2);
            expect(el.value).to.equal(50);
        });
        it('one input/one change for each click', async () => {
            await clickBySelector(el, '.step-up');
            expect(inputSpy.callCount).to.equal(1);
            expect(changeSpy.callCount).to.equal(1);
            expect(el.value).to.equal(51);
            await clickBySelector(el, '.step-down');
            expect(inputSpy.callCount).to.equal(2);
            expect(changeSpy.callCount).to.equal(2);
            expect(el.value).to.equal(50);
        });
        it('click with modifier key', async () => {
            let target = el.shadowRoot.querySelector('.step-up') as HTMLElement;
            const stepUpRect = target.getBoundingClientRect();
            const options = {
                bubbles: true,
                composed: true,
                shiftKey: true,
                clientX: stepUpRect.x + 1,
                clientY: stepUpRect.y + 1,
            };
            (
                el as unknown as {
                    buttons: HTMLDivElement;
                }
            ).buttons.setPointerCapture = () => {
                return;
            };
            (
                el as unknown as {
                    buttons: HTMLDivElement;
                }
            ).buttons.releasePointerCapture = () => {
                return;
            };
            let input = oneEvent(el, 'input');
            target.dispatchEvent(new PointerEvent('pointerdown', options));
            await input;
            target.dispatchEvent(new PointerEvent('pointerup', options));
            expect(inputSpy.callCount).to.equal(1);
            expect(changeSpy.callCount).to.equal(1);
            expect(el.value).to.equal(60);
            target = el.shadowRoot.querySelector('.step-down') as HTMLElement;
            const stepDownRect = target.getBoundingClientRect();
            options.clientX = stepDownRect.x + 1;
            options.clientY = stepDownRect.y + 1;
            input = oneEvent(el, 'input');
            target.dispatchEvent(new PointerEvent('pointerdown', options));
            await input;
            target.dispatchEvent(new PointerEvent('pointerup', options));
            expect(inputSpy.callCount).to.equal(2);
            expect(changeSpy.callCount).to.equal(2);
            expect(el.value).to.equal(50);
        });
        it('many input, but one change', async () => {
            const buttonUp = el.shadowRoot.querySelector(
                '.step-up'
            ) as HTMLElement;
            const buttonDown = el.shadowRoot.querySelector(
                '.step-down'
            ) as HTMLElement;
            sendMouse([
                {
                    type: 'move',
                    position: [buttonUp],
                },
                {
                    type: 'down',
                },
            ]);
            await oneEvent(el, 'input');
            expect(el.value, 'initial: el.value').to.be.greaterThanOrEqual(51);
            expect(
                inputSpy.callCount,
                'initial: inputSpy.callCount'
            ).to.be.greaterThanOrEqual(1);
            expect(
                changeSpy.callCount,
                'initial: no changeSpy.callCount'
            ).to.equal(0);
            await oneEvent(el, 'input');
            expect(el.value, 'second: el.value').to.be.greaterThanOrEqual(52);
            expect(
                inputSpy.callCount,
                'second: inputSpy.callCount'
            ).to.be.greaterThanOrEqual(2);
            expect(
                changeSpy.callCount,
                'second: no changeSpy.callCount'
            ).to.equal(0);
            await oneEvent(el, 'input');
            expect(el.value, 'third: el.value').to.be.greaterThanOrEqual(53);
            expect(
                inputSpy.callCount,
                'third: inputSpy.callCount'
            ).to.be.greaterThanOrEqual(3);
            expect(
                changeSpy.callCount,
                'third: no changeSpy.callCount'
            ).to.equal(0);
            await mouseMoveOver(buttonDown);
            expect(
                inputSpy.callCount,
                'fourth: inputSpy.callCount'
            ).to.be.greaterThanOrEqual(5);
            expect(
                changeSpy.callCount,
                'fourth: no changeSpy.callCount'
            ).to.equal(0);
            await sendMouse({ type: 'up' });
            expect(
                inputSpy.callCount,
                'fifth: inputSpy.callCount'
            ).to.be.greaterThanOrEqual(5);
            expect(
                changeSpy.callCount,
                'fifth: changeSpy.callCount is fired'
            ).to.equal(1);
        });
        it('no change in committed value - using buttons', async () => {
            const buttonUp = el.shadowRoot.querySelector(
                '.step-up'
            ) as HTMLElement;
            const buttonDown = el.shadowRoot.querySelector(
                '.step-down'
            ) as HTMLElement;
            sendMouse([
                {
                    type: 'move',
                    position: [buttonUp],
                },
                {
                    type: 'down',
                },
            ]);
            await oneEvent(el, 'input');
            expect(el.value, 'first: el.value').to.be.greaterThanOrEqual(51);
            expect(
                inputSpy.callCount,
                'first: inputSpy.callCount'
            ).to.be.greaterThanOrEqual(1);
            expect(
                changeSpy.callCount,
                'first: no changeSpy.callCount'
            ).to.equal(0);
            await oneEvent(el, 'input');
            expect(el.value, 'second: el.value').to.be.greaterThanOrEqual(52);
            expect(
                inputSpy.callCount,
                'second: inputSpy.callCount'
            ).to.be.greaterThanOrEqual(2);
            expect(
                changeSpy.callCount,
                'second: no changeSpy.callCount'
            ).to.equal(0);
            await mouseMoveOver(buttonDown);
            await oneEvent(el, 'input');
            expect(
                inputSpy.callCount,
                'third: inputSpy.callCount'
            ).to.be.greaterThanOrEqual(4);
            expect(
                changeSpy.callCount,
                'third: no changeSpy.callCount'
            ).to.equal(0);
            expect(el.value, 'third: el.value').to.be.lessThanOrEqual(52);
            await mouseMoveOver(buttonDown);
            await oneEvent(el, 'input');
            expect(el.value, 'fourth: el.value').to.be.lessThanOrEqual(51);
            await waitUntil(() => el.value === 50);
            await sendMouse({ type: 'up' });
            expect(
                inputSpy.callCount,
                'fourth: inputSpy.callCount'
            ).to.be.greaterThanOrEqual(4);
            expect(el.value, 'final: el.value').to.equal(50);
            expect(
                changeSpy.callCount,
                'value does not change from initial value so no "change" event is dispatched'
            ).to.equal(0);
        });
    });

    describe('Stepper UI interactions', () => {
        let el: NumberField;
        let inputSpy: SinonSpy;
        let changeSpy: SinonSpy;

        beforeEach(async () => {
            el = await getElFrom(Default({ value: 50 }));
            const spies = setupEventSpies(el);
            inputSpy = spies.inputSpy;
            changeSpy = spies.changeSpy;
        });

        afterEach(() => {
            // Reset spies after each test to ensure isolation
            inputSpy?.resetHistory();
            changeSpy?.resetHistory();

            // Clean up fixtures to prevent test pollution
            fixtureCleanup();
            resetMouse();
        });

        it('increments value with stepper UI click', async () => {
            // Initial state
            expect(el.value).to.equal(50);

            // Get step-up button position
            const buttonUp = el.shadowRoot.querySelector(
                '.step-up'
            ) as HTMLElement;
            // Click the step-up button
            await mouseClickOn(buttonUp);

            await elementUpdated(el);

            // Verify single increment
            expect(el.value).to.equal(51);
            expect(inputSpy.callCount).to.equal(1);
            expect(changeSpy.callCount).to.equal(1);
        });

        it('decrements value with stepper UI click', async () => {
            // Initial state
            expect(el.value).to.equal(50);

            // Get step-down button position
            const buttonDown = el.shadowRoot.querySelector(
                '.step-down'
            ) as HTMLElement;
            // Click the step-down button
            await mouseClickOn(buttonDown);

            await elementUpdated(el);

            // Verify single decrement
            expect(el.value).to.equal(49);
            expect(inputSpy.callCount).to.equal(1);
            expect(changeSpy.callCount).to.equal(1);
        });

        it('continuously increments when holding down step-up button', async () => {
            // Initial state
            expect(el.value).to.equal(50);

            // Get step-up button position
            const buttonUp = el.shadowRoot.querySelector(
                '.step-up'
            ) as HTMLElement;

            // Press and hold the step-up button
            await sendMouse([
                {
                    type: 'move',
                    position: [buttonUp],
                },
                {
                    type: 'down',
                },
            ]);

            // Wait for first increment
            await oneEvent(el, 'input');
            await elementUpdated(el);
            // Note: We use range assertions (to.be.at.least) instead of exact equality here because
            // continuous increment timing is non-deterministic and depends on system performance,
            // browser event loop, and test environment. We're verifying the behavior works,
            // not the exact count of increments.
            expect(el.value).to.be.at.least(51);
            const firstIncrementValue = el.value;

            // Wait for continuous increments (at least one more)
            await oneEvent(el, 'input');
            await elementUpdated(el);
            // Verify that holding the button causes multiple increments, not just one
            expect(el.value).to.be.greaterThan(firstIncrementValue);

            // Release the button
            await sendMouse({ type: 'up' });

            // Verify no further increments after release
            const finalValue = el.value;
            // We intentionally use a timeout here to verify the ABSENCE of events.
            // After releasing the mouse, we need to ensure no more increments occur.
            // Event-based synchronization (oneEvent) can't be used because we're
            // testing that NO events should fire. This timeout gives enough time
            // for any erroneous delayed increments to occur if the bug exists.
            await aTimeout(100);
            expect(el.value).to.equal(finalValue);
        });

        it('changes from increment to decrement when dragging between buttons', async () => {
            // Get button positions
            const buttonUp = el.shadowRoot.querySelector(
                '.step-up'
            ) as HTMLElement;
            const buttonDown = el.shadowRoot.querySelector(
                '.step-down'
            ) as HTMLElement;

            // Press and hold the step-up button
            await sendMouse([
                {
                    type: 'move',
                    position: [buttonUp],
                },
                {
                    type: 'down',
                },
            ]);

            // Wait for increment to start
            await oneEvent(el, 'input');
            await elementUpdated(el);
            // Using range assertions because press-and-hold timing is non-deterministic
            expect(el.value).to.be.at.least(51);

            // Wait for another increment
            await oneEvent(el, 'input');
            await elementUpdated(el);
            const valueBeforeSwitch = el.value;
            // Ensure we've had multiple increments before testing direction change
            expect(valueBeforeSwitch).to.be.at.least(52);

            // Move to step-down button while still holding
            inputSpy.resetHistory();
            await mouseMoveOver(buttonDown);

            // input is only processed onces per FRAMES_PER_CHANGE number of frames so wait for the direction to change
            let framesToWait = FRAMES_PER_CHANGE * 2;
            while (framesToWait) {
                framesToWait -= 1;
                await nextFrame();
            }
            await elementUpdated(el);

            // Value should have decreased from the peak
            // Using lessThan because we can't predict exact decrement count during drag transition
            expect(el.value).to.be.lessThan(valueBeforeSwitch);
            // At least one decrement should have occurred after moving to step-down button
            expect(inputSpy.callCount).to.be.at.least(1);

            // Release the button
            await sendMouse({ type: 'up' });
            // Verify no further increments after release
            const finalValue = el.value;
            // We intentionally use a timeout here to verify the ABSENCE of events.
            // After releasing the mouse, we need to ensure no more increments occur.
            // Event-based synchronization (oneEvent) can't be used because we're
            // testing that NO events should fire. This timeout gives enough time
            // for any erroneous delayed increments to occur if the bug exists.
            await aTimeout(100);
            expect(el.value).to.equal(finalValue);
        });
    }); // End of Stepper UI interactions describe block

    it('surfaces `valueAsNumber`', async () => {
        const el = await getElFrom(Default({}));
        el.value = 1000;
        await elementUpdated(el);
        expect(el.formattedValue).to.equal('1,000');
        expect(el.valueAsString).to.equal('1000');
        expect(el.value).to.equal(1000);
        el.valueAsString = '2222';
        await elementUpdated(el);
        expect(el.formattedValue).to.equal('2,222');
        expect(el.valueAsString).to.equal('2222');
        expect(el.value).to.equal(2222);
    });
    describe('manages `value` with `formatOptions`', () => {
        it('manages decimals', async () => {
            const el = await getElFrom(decimals({ value: 1.333333 }));
            expect(el.value).to.equal(1.33);
            expect(el.formattedValue).to.equal('+1.33');
            expect(el.valueAsString).to.equal('1.33');
        });
        it('manages precents', async () => {
            const el = await getElFrom(percents({ value: 0.45 }));
            expect(el.formattedValue).to.equal('45%');
            expect(el.valueAsString).to.equal('0.45');
            expect(el.value).to.equal(0.45);
            await clickBySelector(el, '.step-down');
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('44%');
            expect(el.valueAsString).to.equal('0.44');
            expect(el.value).to.equal(0.44);
            await clickBySelector(el, '.step-up');
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('45%');
            expect(el.valueAsString).to.equal('0.45');
            expect(el.value).to.equal(0.45);
            el.focus();
            el.value = 0;
            await sendKeys({ type: '54' });
            await sendKeys({ press: 'Enter' });
            expect(el.formattedValue).to.equal('54%');
            expect(el.valueAsString).to.equal('0.54');
            expect(el.value).to.equal(0.54);
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('54%');
            expect(el.valueAsString).to.equal('0.54');
            expect(el.value).to.equal(0.54);
        });
        it('manages currency', async () => {
            const el = await getElFrom(currency({ value: 234.21 }));
            expect(el.formattedValue).to.equal('EUR 234.21');
            expect(el.valueAsString).to.equal('234.21');
            expect(el.value).to.equal(234.21);
        });
        it('manages units', async () => {
            const el = await getElFrom(units({ value: 17 }));
            expect(el.formattedValue).to.equal('17 inches');
            expect(el.valueAsString).to.equal('17');
            expect(el.value).to.equal(17);
        });
        it('does not select all on click based `focus`', async function () {
            const el = await getElFrom(units({ value: 17 }));
            expect(el.value).to.equal(17);

            const inputElement = el.shadowRoot?.querySelector(
                'input'
            ) as HTMLInputElement;

            await mouseClickOn(el.focusElement);
            await elementUpdated(el);
            expect(el.focused).to.be.true;

            let length: number | null = null;
            await waitUntil(
                () => {
                    if (
                        inputElement.selectionStart !== null &&
                        inputElement.selectionEnd !== null
                    ) {
                        length =
                            inputElement.selectionEnd -
                            inputElement.selectionStart;
                        return true;
                    }
                    return false;
                },
                'selection changed',
                { timeout: 400 }
            );
            expect(length, `selection length)`).to.equal(0);
        });
        it('selects all on `Tab` based `focus`', async function () {
            const el = await getElFrom(units({ value: 17 }));
            const input = document.createElement('input');
            el.insertAdjacentElement('beforebegin', input);
            input.focus();

            const inputElement = el.shadowRoot?.querySelector(
                'input'
            ) as HTMLInputElement;

            await sendTabKey();
            await elementUpdated(el);
            expect(el.focused).to.be.true;

            let length: number | null = null;
            await waitUntil(
                () => {
                    if (
                        inputElement.selectionStart !== null &&
                        inputElement.selectionEnd !== null
                    ) {
                        length =
                            inputElement.selectionEnd -
                            inputElement.selectionStart;
                        return true;
                    }
                    return false;
                },
                'selection changed',
                { timeout: 400 }
            );

            expect(length, `selection length`).to.equal(
                el.valueAsString.length
            );
        });
        it('manages units not supported by the browser', async () => {
            const el = await getElFrom(pixels({ value: 17 }));
            expect(el.formattedValue).to.equal('17px');
            expect(el.valueAsString).to.equal('17');
            expect(el.value).to.equal(17);
        });
    });
    describe('max', () => {
        let el: NumberField;
        let lastInputValue = 0;
        let lastChangeValue = 0;
        const inputSpy = spy();
        const changeSpy = spy();
        beforeEach(async () => {
            inputSpy.resetHistory();
            changeSpy.resetHistory();
            el = await getElFrom(
                Default({
                    max: 10,
                    value: 10,
                    onInput: (value: number) => {
                        inputSpy(value);
                        lastInputValue = value;
                    },
                    onChange: (value: number) => {
                        changeSpy(value);
                        lastChangeValue = value;
                    },
                })
            );
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
        });
        it('constrains input', async () => {
            el.focus();
            await sendKeys({ type: '15' });
            await sendKeys({ press: 'Enter' });
            await elementUpdated(el);
            expect(lastInputValue, 'last input value').to.equal(10);
            expect(lastChangeValue, 'last change value').to.equal(
                0,
                'value does not change from initial value so no "change" event is dispatched'
            );
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
        });
        it('constrains `value`', async () => {
            el.value = 20;
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
        });
        it('constrains ArrowUp usage', async () => {
            expect(el.value).to.equal(10);
            el.focus();
            await sendKeys({ press: 'ArrowUp' });
            expect(el.focusElement.value).to.equal('10');
            await sendKeys({ press: 'Shift+ArrowUp' });
            expect(el.focusElement.value).to.equal('10');
        });
        it('constrains pointer usage', async () => {
            expect(el.value).to.equal(10);
            const buttonUp = el.shadowRoot.querySelector(
                '.step-up'
            ) as HTMLElement;
            await mouseClickOn(buttonUp);
            expect(el.value).to.equal(10);
        });
        it('validates on commit', async () => {
            el.focus();
            await sendKeys({ type: '15' });
            await sendKeys({ press: 'Enter' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
        });
        it('disabled `stepUp` button', async () => {
            await clickBySelector(el, '.step-up');
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
        });
        it('validates late', async () => {
            el.max = 5;
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('5');
            expect(el.valueAsString).to.equal('5');
            expect(el.value).to.equal(5);
        });
        it('dispatches onchange on setting max value', async () => {
            el.value = 5;
            await elementUpdated(el);
            expect(changeSpy.callCount).to.equal(0);
            expect(el.value).to.equal(5);
            el.focus();
            await sendKeys({ press: 'Backspace' });
            await sendKeys({ press: '1' });
            await sendKeys({ press: '5' });
            await sendKeys({ press: 'Enter' });
            await elementUpdated(el);
            expect(el.value).to.equal(10);
            expect(inputSpy.callCount).to.equal(3);
            expect(changeSpy.callCount).to.equal(1);
            expect(lastChangeValue, 'last change value').to.equal(10);
        });
    });
    describe('min', () => {
        let el: NumberField;
        let lastInputValue = 0;
        let lastChangeValue = 0;
        const inputSpy = spy();
        const changeSpy = spy();
        beforeEach(async () => {
            inputSpy.resetHistory();
            changeSpy.resetHistory();
            el = await getElFrom(
                Default({
                    min: 10,
                    value: 10,
                    onInput: (value: number) => {
                        inputSpy(value);
                        lastInputValue = value;
                    },
                    onChange: (value: number) => {
                        changeSpy(value);
                        lastChangeValue = value;
                    },
                })
            );
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
        });
        it('constrains input', async () => {
            el.focus();
            await sendKeys({ press: 'Backspace' });
            await sendKeys({ press: 'Backspace' });
            await sendKeys({ type: '5' });
            await sendKeys({ press: 'Enter' });
            await elementUpdated(el);
            expect(lastInputValue, 'last input value').to.equal(10);
            expect(lastChangeValue, 'last change value').to.equal(
                0,
                'value does not change from initial value so no "change" event is dispatched'
            );
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
            el.focus();
            await sendKeys({ press: 'Backspace' });
            await sendKeys({ press: 'Backspace' });
            await sendKeys({ type: '-2000' });
            await sendKeys({ press: 'Enter' });
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
        });
        it('dispatches onchange on setting min value', async () => {
            el.value = 15;
            await elementUpdated(el);
            expect(changeSpy.callCount).to.equal(0);
            expect(el.value).to.equal(15);
            el.focus();
            await sendKeys({ press: 'Backspace' });
            await sendKeys({ press: 'Backspace' });
            await sendKeys({ press: '5' });
            await sendKeys({ press: 'Enter' });
            await elementUpdated(el);
            expect(el.value).to.equal(10);
            expect(inputSpy.callCount).to.equal(3);
            expect(changeSpy.callCount).to.equal(1);
            expect(lastChangeValue, 'last change value').to.equal(10);
        });
        xit('manages `inputMode` in iPad', async () => {
            // setUserAgent is not currently supported by Playwright
            await setUserAgent(
                'Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile15E148 Safari/604.1'
            );
            el.min = 0;
            await elementUpdated(el);
            expect(el.focusElement.inputMode).to.equal('numeric');
            el.min = -10;
            await elementUpdated(el);
            expect(el.focusElement.inputMode).to.equal('numeric');
            el.min = undefined;
            await elementUpdated(el);
            expect(el.focusElement.inputMode).to.equal('numeric');
            el.formatOptions = {
                minimumFractionDigits: 1,
                maximumFractionDigits: 2,
            };
            el.min = 0;
            await elementUpdated(el);
            expect(el.focusElement.inputMode).to.equal('decimal');
        });
        xit('manages `inputMode` in iPhone', async () => {
            // setUserAgent is not currently supported by Playwright
            await setUserAgent(
                'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
            );
            el.min = 0;
            await elementUpdated(el);
            expect(el.focusElement.inputMode).to.equal('numeric');
            el.min = -10;
            await elementUpdated(el);
            expect(el.focusElement.inputMode).to.equal('text');
            el.min = undefined;
            await elementUpdated(el);
            expect(el.focusElement.inputMode).to.equal('text');
            el.formatOptions = {
                minimumFractionDigits: 1,
                maximumFractionDigits: 2,
            };
            el.min = 0;
            await elementUpdated(el);
            expect(el.focusElement.inputMode).to.equal('decimal');
        });
        xit('manages `inputMode` in Android', async () => {
            // setUserAgent is not currently supported by Playwright
            await setUserAgent(
                'Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36'
            );
            el.min = 0;
            await elementUpdated(el);
            expect(el.focusElement.inputMode).to.equal('numeric');
            el.min = -10;
            await elementUpdated(el);
            expect(el.focusElement.inputMode).to.equal('numeric');
            el.min = undefined;
            await elementUpdated(el);
            expect(el.focusElement.inputMode).to.equal('numeric');
            el.formatOptions = {
                minimumFractionDigits: 1,
                maximumFractionDigits: 2,
            };
            el.min = 0;
            await elementUpdated(el);
            expect(el.focusElement.inputMode).to.equal('decimal');
            el.formatOptions = {
                minimumFractionDigits: 1,
                maximumFractionDigits: 2,
            };
            el.min = -10;
            await elementUpdated(el);
            expect(el.focusElement.inputMode).to.equal('numeric');
        });
        it('constrains `value`', async () => {
            el.value = 0;
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
        });
        it('constrains ArrowDown usage', async () => {
            el.min = 0;
            el.value = 0;
            expect(el.value).to.equal(0);
            el.focus();
            await sendKeys({ press: 'ArrowDown' });
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
            await sendKeys({ press: 'Shift+ArrowDown' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
        });
        it('constrains pointer usage', async () => {
            el.min = 0;
            el.value = 0;
            await elementUpdated(el);
            expect(el.value).to.equal(0);
            const buttonDown = el.shadowRoot.querySelector(
                '.step-down'
            ) as HTMLElement;
            await mouseClickOn(buttonDown);
            await elementUpdated(el);
            expect(el.value).to.equal(0);
        });
        it('validates on commit', async () => {
            el.focus();
            await sendKeys({ press: '0' });
            await sendKeys({ press: 'Enter' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('100');
            expect(el.valueAsString).to.equal('100');
            expect(el.value).to.equal(100);
        });
        it('disabled `stepDown` button', async () => {
            await clickBySelector(el, '.step-down');
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
        });
        it('validates late', async () => {
            el.min = 15;
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('15');
            expect(el.valueAsString).to.equal('15');
            expect(el.value).to.equal(15);
        });
    });
    describe('step', () => {
        let el: NumberField;
        beforeEach(async () => {
            el = await getElFrom(Default({ value: 10, step: 5 }));
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
        });
        it('via arrow up', async () => {
            el.focus();
            await elementUpdated(el);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('15');
            expect(el.valueAsString).to.equal('15');
            expect(el.value).to.equal(15);
        });
        it('via arrow down', async () => {
            el.focus();
            await elementUpdated(el);
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('5');
            expect(el.valueAsString).to.equal('5');
            expect(el.value).to.equal(5);
        });
        it('step up via pointer', async () => {
            await clickBySelector(el, '.step-up');
            expect(el.formattedValue).to.equal('15');
            expect(el.valueAsString).to.equal('15');
            expect(el.value).to.equal(15);
        });
        it('step down via pointer', async () => {
            await clickBySelector(el, '.step-down');
            expect(el.formattedValue).to.equal('5');
            expect(el.valueAsString).to.equal('5');
            expect(el.value).to.equal(5);
        });
    });
    describe('step + constraints', () => {
        let el: NumberField;
        beforeEach(async () => {
            el = await getElFrom(Default({ step: 5 }));
            expect(el.formattedValue).to.equal('');
            expect(el.valueAsString).to.equal('NaN');
            expect(el.value).to.be.NaN;
        });
        it('steps', async () => {
            el.focus();
            await elementUpdated(el);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('5');
            expect(el.valueAsString).to.equal('5');
            expect(el.value).to.equal(5);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
        });
        it('steps from min', async () => {
            el.min = 5;
            await elementUpdated(el);
            el.focus();
            await elementUpdated(el);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('5');
            expect(el.valueAsString).to.equal('5');
            expect(el.value).to.equal(5);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('15');
            expect(el.valueAsString).to.equal('15');
            expect(el.value).to.equal(15);
        });
        it('steps from mismatched min', async () => {
            el.min = 2;
            await elementUpdated(el);
            el.focus();
            await elementUpdated(el);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('2');
            expect(el.valueAsString).to.equal('2');
            expect(el.value).to.equal(2);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('7');
            expect(el.valueAsString).to.equal('7');
            expect(el.value).to.equal(7);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('12');
            expect(el.valueAsString).to.equal('12');
            expect(el.value).to.equal(12);
        });
        it('steps to mismatched max', async () => {
            el.min = 2;
            el.max = 10;
            await elementUpdated(el);
            el.focus();
            await elementUpdated(el);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('2');
            expect(el.valueAsString).to.equal('2');
            expect(el.value).to.equal(2);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('7');
            expect(el.valueAsString).to.equal('7');
            expect(el.value).to.equal(7);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('7');
            expect(el.valueAsString).to.equal('7');
            expect(el.value).to.equal(7);
        });
        it('validates max + step', async () => {
            el.value = 2;
            el.min = 2;
            el.max = 10;
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('2');
            expect(el.valueAsString).to.equal('2');
            expect(el.value).to.equal(2);
            el.value = 11;
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('7');
            expect(el.valueAsString).to.equal('7');
            expect(el.value).to.equal(7);
            el.value = 27;
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('7');
            expect(el.valueAsString).to.equal('7');
            expect(el.value).to.equal(7);
        });
    });
    describe('indeterminate', () => {
        let el: NumberField;
        beforeEach(async () => {
            el = await getElFrom(indeterminate(indeterminate.args));
            expect(el.formattedValue).to.equal('100');
            expect(el.valueAsString).to.equal('100');
            expect(el.value).to.equal(100);
            expect(
                (el as unknown as { displayValue: string }).displayValue
            ).to.equal(indeterminatePlaceholder);
        });
        it('remove "-" on focus', async () => {
            el.focus();
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('100');
            expect(el.valueAsString).to.equal('100');
            expect(el.value).to.equal(100);
            expect(
                (el as unknown as { displayValue: string }).displayValue
            ).to.equal('');
            el.blur();
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('100');
            expect(el.valueAsString).to.equal('100');
            expect(el.value).to.equal(100);
            expect(
                (el as unknown as { displayValue: string }).displayValue
            ).to.equal(indeterminatePlaceholder);
        });
        it('return to "-" after suplied value is removed', async () => {
            el.focus();
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('100');
            expect(el.valueAsString).to.equal('100');
            expect(el.value).to.equal(100);
            expect(
                (el as unknown as { displayValue: string }).displayValue
            ).to.equal('');
            await sendKeys({ type: '50' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('50');
            expect(el.valueAsString).to.equal('50');
            expect(el.value).to.equal(50);
            expect(
                (el as unknown as { displayValue: string }).displayValue
            ).to.equal('50');
            await sendKeys({ press: 'Backspace' });
            await sendKeys({ press: 'Backspace' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('100');
            expect(el.valueAsString).to.equal('100');
            expect(el.value).to.equal(100);
            expect(
                (el as unknown as { displayValue: string }).displayValue
            ).to.equal('');
            el.blur();
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('100');
            expect(el.valueAsString).to.equal('100');
            expect(el.value).to.equal(100);
            expect(
                (el as unknown as { displayValue: string }).displayValue
            ).to.equal(indeterminatePlaceholder);
        });
        it('starts from `value` on "ArrowUp" keypresses', async () => {
            el.focus();
            await elementUpdated(el);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('101');
            expect(el.valueAsString).to.equal('101');
            expect(el.value).to.equal(101);
            expect(
                (el as unknown as { displayValue: string }).displayValue
            ).to.equal('101');
            el.blur();
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('101');
            expect(el.valueAsString).to.equal('101');
            expect(el.value).to.equal(101);
            expect(
                (el as unknown as { displayValue: string }).displayValue
            ).to.equal('101');
        });
        it('starts from `value` on click `.step-up`', async () => {
            el.focus();
            await elementUpdated(el);
            await clickBySelector(el, '.step-up');
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('101');
            expect(el.valueAsString).to.equal('101');
            expect(el.value).to.equal(101);
            expect(
                (el as unknown as { displayValue: string }).displayValue
            ).to.equal('101');
            el.blur();
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('101');
            expect(el.valueAsString).to.equal('101');
            expect(el.value).to.equal(101);
            expect(
                (el as unknown as { displayValue: string }).displayValue
            ).to.equal('101');
        });
        it('starts from `value` on "ArrowDown" keypresses', async () => {
            el.focus();
            await elementUpdated(el);
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('99');
            expect(el.valueAsString).to.equal('99');
            expect(el.value).to.equal(99);
            expect(
                (el as unknown as { displayValue: string }).displayValue
            ).to.equal('99');
            el.blur();
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('99');
            expect(el.valueAsString).to.equal('99');
            expect(el.value).to.equal(99);
            expect(
                (el as unknown as { displayValue: string }).displayValue
            ).to.equal('99');
        });
        it('starts from `value` on click `.step-down`', async () => {
            el.focus();
            await elementUpdated(el);
            await clickBySelector(el, '.step-down');
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('99');
            expect(el.valueAsString).to.equal('99');
            expect(el.value).to.equal(99);
            expect(
                (el as unknown as { displayValue: string }).displayValue
            ).to.equal('99');
            el.blur();
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('99');
            expect(el.valueAsString).to.equal('99');
            expect(el.value).to.equal(99);
            expect(
                (el as unknown as { displayValue: string }).displayValue
            ).to.equal('99');
        });
    });
    it('removes the stepper UI with [hide-stepper]', async () => {
        const el = await getElFrom(Default({ hideStepper: true }));
        const stepUp = el.shadowRoot.querySelector('.step-up');
        const stepDown = el.shadowRoot.querySelector('.step-down');
        expect(stepUp).to.be.null;
        expect(stepDown).to.be.null;
    });
    describe('Disabled', () => {
        let el: NumberField;
        beforeEach(async () => {
            el = await getElFrom(Default({ disabled: true, value: 1337 }));
            expect(el.formattedValue).to.equal('1,337');
            expect(el.valueAsString).to.equal('1337');
            expect(el.value).to.equal(1337);
            el.focus();
            await elementUpdated(el);
        });
        afterEach(async () => {
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('1,337');
            expect(el.valueAsString).to.equal('1337');
            expect(el.value).to.equal(1337);
        });
        it('presents as `disabled`', async () => {
            await sendKeys({ type: '12345' });
            await elementUpdated(el);
            await sendKeys({ press: 'Enter' });
        });
        it('prevents increment via keyboard', async () => {
            await sendKeys({ press: 'ArrowUp' });
        });
        it('prevents decrement via keyboard', async () => {
            await sendKeys({ press: 'ArrowDown' });
        });
        it('prevents increment via scroll', async () => {
            el.dispatchEvent(new WheelEvent('wheel', { deltaY: 1 }));
        });
        it('prevents decrement via scroll', async () => {
            el.dispatchEvent(new WheelEvent('wheel', { deltaY: -1 }));
        });
        it('prevents increment via stepper button', async () => {
            await clickBySelector(el, '.step-up');
        });
        it('prevents decrement via stepper button', async () => {
            await clickBySelector(el, '.step-down');
        });
    });
    describe('Readonly', () => {
        let el: NumberField;
        beforeEach(async () => {
            el = await getElFrom(Default({ readonly: true, value: 1337 }));
            expect(el.formattedValue).to.equal('1,337');
            expect(el.valueAsString).to.equal('1337');
            expect(el.value).to.equal(1337);
            el.focus();
            await elementUpdated(el);
        });
        afterEach(async () => {
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('1,337');
            expect(el.valueAsString).to.equal('1337');
            expect(el.value).to.equal(1337);
        });
        it('presents as `readonly`', async () => {
            await sendKeys({ type: '12345' });
            await elementUpdated(el);
            await sendKeys({ press: 'Enter' });
        });
        it('prevents increment via keyboard', async () => {
            await sendKeys({ press: 'ArrowUp' });
        });
        it('prevents decrement via keyboard', async () => {
            await sendKeys({ press: 'ArrowDown' });
        });
        it('prevents increment via scroll', async () => {
            el.dispatchEvent(new WheelEvent('wheel', { deltaY: 1 }));
        });
        it('prevents decrement via scroll', async () => {
            el.dispatchEvent(new WheelEvent('wheel', { deltaY: -1 }));
        });
        it('prevents increment via stepper button', async () => {
            await clickBySelector(el, '.step-up');
        });
        it('prevents decrement via stepper button', async () => {
            await clickBySelector(el, '.step-down');
        });
    });
    describe('accessibility model', () => {
        it('increment and decrement buttons cannot receive keyboard focus', async () => {
            // @TODO: skipping this test because it's flaky in WebKit in CI. Will review in the migration to Spectrum 2.
            if (isWebKit()) {
                return;
            }
            await fixture<HTMLDivElement>(html`
                <div>
                    ${Default({
                        onChange: () => {
                            return;
                        },
                    })}
                </div>
            `);

            type NamedNode = { name: string };
            const snapshot = (await a11ySnapshot(
                {}
            )) as unknown as NamedNode & {
                children: NamedNode[];
            };

            expect(
                findAccessibilityNode<NamedNode>(
                    snapshot,
                    (node) => node.name === 'Increase Enter a number'
                ),
                '`name` is the label text'
            ).to.be.null;

            expect(
                findAccessibilityNode<NamedNode>(
                    snapshot,
                    (node) => node.name === 'Decrease Enter a number'
                ),
                '`name` is the label text'
            ).to.be.null;
        });
    });
});
