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

import { TemplateResult, html } from '@spectrum-web-components/base';
import {
    fixture,
    elementUpdated,
    expect,
    nextFrame,
    oneEvent,
} from '@open-wc/testing';
import polyfillCheck from '@formatjs/intl-numberformat/should-polyfill.js';

import {
    currency,
    decimals,
    Default,
    percents,
    units,
} from '../stories/number-field.stories.js';
import '../sp-number-field.js';
import { FRAMES_PER_CHANGE, NumberField } from '..';
import {
    executeServerCommand,
    sendKeys,
    setUserAgent,
} from '@web/test-runner-commands';
import { spy } from 'sinon';

async function getElFrom(test: TemplateResult): Promise<NumberField> {
    const wrapped = await fixture<HTMLDivElement>(html`
        <div style="--spectrum-alias-ui-icon-chevron-size-75: 20px;">
            ${test}
        </div>
    `);
    const el = wrapped.querySelector('sp-number-field') as NumberField;
    await elementUpdated(el);
    return el;
}

async function clickBySelector(
    el: NumberField,
    selector: string,
    options: { button?: 'left' | 'right' | 'middle' } = {}
): Promise<void> {
    const target = el.shadowRoot.querySelector(selector) as HTMLElement;
    const targetRect = target.getBoundingClientRect();
    await executeServerCommand('send-mouse', {
        steps: [
            {
                type: 'move',
                position: [
                    targetRect.x + targetRect.width / 2,
                    targetRect.y + targetRect.height / 2,
                ],
                options,
            },
            {
                type: 'down',
                options,
            },
        ],
    });
    await nextFrame();
    await executeServerCommand('send-mouse', {
        steps: [
            {
                type: 'up',
                options,
            },
        ],
    });
    await elementUpdated(el);
}

describe('NumberField', () => {
    before(async () => {
        if (polyfillCheck.shouldPolyfill()) {
            await import('@formatjs/intl-numberformat/polyfill.js');
        }
        if (
            ((Intl.NumberFormat as unknown) as { polyfilled: boolean })
                .polyfilled
        ) {
            await import('@formatjs/intl-numberformat/locale-data/en.js');
        }
    });
    it('loads default number-field accessibly', async () => {
        const el = await getElFrom(Default({}));
        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('receives input', async () => {
        const el = await getElFrom(Default({ value: 1337 }));
        expect(el.formattedValue).to.equal('1,337');
        expect(el.valueAsString).to.equal('1337');
        expect(el.value).to.equal(1337);
        el.focus();
        await sendKeys({ type: '7331' });
        await elementUpdated(el);
        await sendKeys({ press: 'Enter' });
        await elementUpdated(el);
        expect(el.formattedValue).to.equal('13,377,331');
        expect(el.valueAsString).to.equal('13377331');
        expect(el.value).to.equal(13377331);
    });
    describe('Increments', () => {
        let el: NumberField;
        beforeEach(async () => {
            el = await getElFrom(Default({}));
            expect(el.value).to.be.NaN;
            expect(el.formattedValue).to.equal('');
            expect(el.valueAsString).to.equal('NaN');
        });
        it('via pointer, only "left" button', async () => {
            await clickBySelector(el, '.stepUp', { button: 'middle' });
            expect(el.formattedValue).to.equal('');
            expect(el.valueAsString).to.equal('NaN');
            expect(el.value).to.be.NaN;
        });
        it('via pointer', async () => {
            await clickBySelector(el, '.stepUp');
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
            await clickBySelector(el, '.stepUp');
            expect(el.formattedValue).to.equal('1');
            expect(el.valueAsString).to.equal('1');
            expect(el.value).to.equal(1);
        });
        it('via arrow up', async () => {
            el.focus();
            await elementUpdated(el);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('1');
            expect(el.valueAsString).to.equal('1');
            expect(el.value).to.equal(1);
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
            el.dispatchEvent(new WheelEvent('wheel', { deltaY: 1 }));
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('1');
            expect(el.valueAsString).to.equal('1');
            expect(el.value).to.equal(1);
        });
    });
    describe('Decrements', () => {
        let el: NumberField;
        beforeEach(async () => {
            el = await getElFrom(Default({}));
            expect(el.value).to.be.NaN;
            expect(el.formattedValue).to.equal('');
            expect(el.valueAsString).to.equal('NaN');
        });
        it('via pointer, only "left" button', async () => {
            await clickBySelector(el, '.stepDown', { button: 'middle' });
            expect(el.formattedValue).to.equal('');
            expect(el.valueAsString).to.equal('NaN');
            expect(el.value).to.be.NaN;
        });
        it('via pointer', async () => {
            await clickBySelector(el, '.stepDown');
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
            await clickBySelector(el, '.stepDown');
            expect(el.formattedValue).to.equal('-1');
            expect(el.valueAsString).to.equal('-1');
            expect(el.value).to.equal(-1);
        });
        it('via arrow up', async () => {
            el.focus();
            await elementUpdated(el);
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('0');
            expect(el.valueAsString).to.equal('0');
            expect(el.value).to.equal(0);
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('-1');
            expect(el.valueAsString).to.equal('-1');
            expect(el.value).to.equal(-1);
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
            el.dispatchEvent(new WheelEvent('wheel', { deltaY: -1 }));
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('-1');
            expect(el.valueAsString).to.equal('-1');
            expect(el.value).to.equal(-1);
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
            await clickBySelector(el, '.stepUp');
            expect(inputSpy.callCount).to.equal(1);
            expect(changeSpy.callCount).to.equal(1);
            expect(el.value).to.equal(51);
            await clickBySelector(el, '.stepDown');
            expect(inputSpy.callCount).to.equal(2);
            expect(changeSpy.callCount).to.equal(2);
            expect(el.value).to.equal(50);
        });
        it('many input, but one change', async () => {
            const buttonUp = el.shadowRoot.querySelector(
                '.stepUp'
            ) as HTMLElement;
            const buttonUpRect = buttonUp.getBoundingClientRect();
            const buttonUpPosition = [
                buttonUpRect.x + buttonUpRect.width / 2,
                buttonUpRect.y + buttonUpRect.height / 2,
            ];
            const buttonDown = el.shadowRoot.querySelector(
                '.stepDown'
            ) as HTMLElement;
            const buttonDownRect = buttonDown.getBoundingClientRect();
            const buttonDownPosition = [
                buttonDownRect.x + buttonDownRect.width / 2,
                buttonDownRect.y + buttonDownRect.height / 2,
            ];
            executeServerCommand('send-mouse', {
                steps: [
                    {
                        type: 'move',
                        position: buttonUpPosition,
                    },
                    {
                        type: 'down',
                    },
                ],
            });
            await oneEvent(el, 'input');
            expect(el.value).to.equal(51);
            expect(inputSpy.callCount).to.equal(1);
            expect(changeSpy.callCount).to.equal(0);
            await oneEvent(el, 'input');
            expect(el.value).to.equal(52);
            expect(inputSpy.callCount).to.equal(2);
            expect(changeSpy.callCount).to.equal(0);
            executeServerCommand('send-mouse', {
                steps: [
                    {
                        type: 'move',
                        position: buttonDownPosition,
                    },
                ],
            });
            let framesToWait = FRAMES_PER_CHANGE * 2;
            while (framesToWait) {
                // input is only processed onces per FRAMES_PER_CHANGE number of frames
                framesToWait -= 1;
                await nextFrame();
            }
            expect(inputSpy.callCount).to.equal(4);
            expect(changeSpy.callCount).to.equal(0);
            await executeServerCommand('send-mouse', {
                steps: [
                    {
                        type: 'up',
                    },
                ],
            });
            expect(inputSpy.callCount).to.equal(4);
            expect(changeSpy.callCount).to.equal(1);
        });
    });
    it('accepts pointer interactions with the stepper UI', async () => {
        const el = await getElFrom(Default({ value: 50 }));
        expect(el.formattedValue).to.equal('50');
        expect(el.valueAsString).to.equal('50');
        expect(el.value).to.equal(50);
        const buttonUp = el.shadowRoot.querySelector('.stepUp') as HTMLElement;
        const buttonUpRect = buttonUp.getBoundingClientRect();
        const buttonUpPosition = [
            buttonUpRect.x + buttonUpRect.width / 2,
            buttonUpRect.y + buttonUpRect.height / 2,
        ];
        const buttonDown = el.shadowRoot.querySelector(
            '.stepDown'
        ) as HTMLElement;
        const buttonDownRect = buttonDown.getBoundingClientRect();
        const buttonDownPosition = [
            buttonDownRect.x + buttonDownRect.width / 2,
            buttonDownRect.y + buttonDownRect.height / 2,
        ];
        const outsidePosition = [
            buttonDownRect.x + buttonDownRect.width + 5,
            buttonDownRect.y + buttonDownRect.height + 5,
        ];
        let input = oneEvent(el, 'input');
        executeServerCommand('send-mouse', {
            steps: [
                {
                    type: 'move',
                    position: buttonUpPosition,
                },
                {
                    type: 'down',
                },
            ],
        });
        await input;
        await oneEvent(el, 'input');
        expect(el.formattedValue).to.equal('52');
        expect(el.valueAsString).to.equal('52');
        expect(el.value).to.equal(52);
        input = oneEvent(el, 'input');
        executeServerCommand('send-mouse', {
            steps: [
                {
                    type: 'move',
                    position: buttonDownPosition,
                },
            ],
        });
        await input;
        expect(el.formattedValue).to.equal('51');
        expect(el.valueAsString).to.equal('51');
        expect(el.value).to.equal(51);
        input = oneEvent(el, 'input');
        executeServerCommand('send-mouse', {
            steps: [
                {
                    type: 'move',
                    position: outsidePosition,
                },
            ],
        });
        await input;
        expect(el.formattedValue).to.equal('50');
        expect(el.valueAsString).to.equal('50');
        expect(el.value).to.equal(50);
        await oneEvent(el, 'input');
        expect(el.formattedValue).to.equal('49');
        expect(el.valueAsString).to.equal('49');
        expect(el.value).to.equal(49);
        await executeServerCommand('send-mouse', {
            steps: [
                {
                    type: 'up',
                },
            ],
        });
        let framesToWait = FRAMES_PER_CHANGE;
        while (framesToWait) {
            // input is only processed onces per FRAMES_PER_CHANGE number of frames
            framesToWait -= 1;
            await nextFrame();
        }
        await elementUpdated(el);
        expect(el.formattedValue).to.equal('49');
        expect(el.valueAsString).to.equal('49');
        expect(el.value).to.equal(49);
    });
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
            let thrownError!: Error;
            try {
                const el = await getElFrom(decimals({ value: 1.333333 }));
                expect(el.value).to.equal(1.33);
                expect(el.formattedValue).to.equal('+1.33');
                expect(el.valueAsString).to.equal('1.33');
            } catch (error) {
                /**
                 * Polyfilled browsers (Safari) do not support the "signDisplay" options.
                 * If they get it, update this test.
                 */
                thrownError = error;
            }
            if (
                /AppleWebKit/.test(window.navigator.userAgent) &&
                !/Chrome/.test(window.navigator.userAgent)
            ) {
                expect(thrownError).to.not.be.undefined;
            }
        });
        it('manages precents', async () => {
            const el = await getElFrom(percents({ value: 0.45 }));
            expect(el.formattedValue).to.equal('45%');
            expect(el.valueAsString).to.equal('0.45');
            expect(el.value).to.equal(0.45);
            await clickBySelector(el, '.stepDown');
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('44%');
            expect(el.valueAsString).to.equal('0.44');
            expect(el.value).to.equal(0.44);
            await clickBySelector(el, '.stepUp');
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('45%');
            expect(el.valueAsString).to.equal('0.45');
            expect(el.value).to.equal(0.45);
            el.focus();
            await sendKeys({ press: 'Shift+ArrowUp' });
            await sendKeys({ press: 'Delete' });
            await sendKeys({ press: 'Enter' });
            expect(el.formattedValue).to.equal('');
            expect(el.valueAsString).to.equal('NaN');
            expect(el.value).to.be.NaN;
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
            let thrownError!: Error;
            try {
                const el = await getElFrom(units({ value: 17 }));
                expect(el.formattedValue).to.equal('17 inches');
                expect(el.valueAsString).to.equal('17');
                expect(el.value).to.equal(17);
            } catch (error) {
                /**
                 * Polyfilled browsers (Safari) do not support "inch".
                 * If they get it, update this test.
                 */
                thrownError = error;
            }
            if (
                /AppleWebKit/.test(window.navigator.userAgent) &&
                !/Chrome/.test(window.navigator.userAgent)
            ) {
                expect(thrownError).to.not.be.undefined;
            }
        });
    });
    describe('max', () => {
        let el: NumberField;
        beforeEach(async () => {
            el = await getElFrom(Default({ max: 10, value: 10 }));
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
        it('validates on commit', async () => {
            el.focus();
            await sendKeys({ press: 'Shift+ArrowUp' });
            await sendKeys({ press: 'Delete' });
            await sendKeys({ press: 'Enter' });
            expect(el.formattedValue).to.equal('');
            expect(el.valueAsString).to.equal('NaN');
            expect(el.value).to.be.NaN;
            await sendKeys({ type: '15' });
            await sendKeys({ press: 'Enter' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
        });
        it('disabled `stepUp` button', async () => {
            await clickBySelector(el, '.stepUp');
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
    });
    describe('min', () => {
        let el: NumberField;
        beforeEach(async () => {
            el = await getElFrom(Default({ min: 10, value: 10 }));
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
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
            el.formatOptions = {
                minimumFractionDigits: 1,
                maximumFractionDigits: 2,
            };
            el.min = 0;
            await elementUpdated(el);
            expect(el.focusElement.inputMode).to.equal('decimal');
        });
        it('constrains `value`', async () => {
            el.value = 0;
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
        });
        it('validates on commit', async () => {
            el.focus();
            await sendKeys({ press: 'Shift+ArrowUp' });
            await sendKeys({ press: 'Delete' });
            await sendKeys({ press: 'Enter' });
            expect(el.formattedValue).to.equal('');
            expect(el.valueAsString).to.equal('NaN');
            expect(el.value).to.be.NaN;
            await sendKeys({ press: '0' });
            await sendKeys({ press: 'Enter' });
            await elementUpdated(el);
            expect(el.formattedValue).to.equal('10');
            expect(el.valueAsString).to.equal('10');
            expect(el.value).to.equal(10);
        });
        it('disabled `stepDown` button', async () => {
            await clickBySelector(el, '.stepDown');
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
            await clickBySelector(el, '.stepUp');
            expect(el.formattedValue).to.equal('15');
            expect(el.valueAsString).to.equal('15');
            expect(el.value).to.equal(15);
        });
        it('step down via pointer', async () => {
            await clickBySelector(el, '.stepDown');
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
        });
    });
    it('removes the stepper UI with [hide-stepper]', async () => {
        const el = await getElFrom(Default({ hideStepper: true }));
        const stepUp = el.shadowRoot.querySelector('.stepUp');
        const stepDown = el.shadowRoot.querySelector('.stepDown');
        expect(stepUp).to.be.null;
        expect(stepDown).to.be.null;
    });
    it('presents as `readonly`', async () => {
        const el = await getElFrom(Default({ readonly: true, value: 1337 }));
        expect(el.formattedValue).to.equal('1,337');
        expect(el.valueAsString).to.equal('1337');
        expect(el.value).to.equal(1337);
        el.focus();
        await sendKeys({ type: '12345' });
        await elementUpdated(el);
        await sendKeys({ press: 'Enter' });
        await elementUpdated(el);
        expect(el.formattedValue).to.equal('1,337');
        expect(el.valueAsString).to.equal('1337');
        expect(el.value).to.equal(1337);
    });
});
