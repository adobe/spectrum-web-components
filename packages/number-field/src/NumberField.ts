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

import {
    html,
    CSSResultArray,
    TemplateResult,
    property,
    PropertyValues,
    query,
} from '@spectrum-web-components/base';
import { streamingListener } from '@spectrum-web-components/base/src/streaming-listener.js';
import { NumberFormatter, NumberParser } from '@internationalized/number';

import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron75.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { TextfieldBase } from '@spectrum-web-components/textfield';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import styles from './number-field.css.js';

function testPlatform(re: RegExp): boolean {
    return typeof window !== 'undefined' && window.navigator != null
        ? re.test(window.navigator.platform)
        : /* c8 ignore next */
          false;
}

function testUserAgent(re: RegExp): boolean {
    return typeof window !== 'undefined' && window.navigator != null
        ? re.test(window.navigator.userAgent)
        : /* c8 ignore next */
          false;
}

function isIPhone(): boolean {
    return testPlatform(/^iPhone/);
}

function isAndroid(): boolean {
    return testUserAgent(/Android/);
}

export const FRAMES_PER_CHANGE = 5;

/**
 * @element sp-number-field
 */
export class NumberField extends TextfieldBase {
    public static get styles(): CSSResultArray {
        return [...super.styles, styles, chevronStyles];
    }

    @query('.buttons')
    private buttons!: HTMLDivElement;

    @property({ type: Boolean, reflect: true })
    public focused = false;

    /**
     * An `<sp-number-field>` element will process its numeric value with
     * `new Intl.NumberFormat(navigator.language, this.formatOptions).format(this.valueAsNumber)`
     * in order to prepare it for visual delivery in the input. In order to customize this
     * processing supply your own `Intl.NumberFormatOptions` object here.
     *
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
     */
    @property({ type: Object, attribute: 'format-options' })
    public formatOptions: Intl.NumberFormatOptions = {};

    /**
     * Whether the stepper UI is hidden or not.
     */
    @property({ type: Boolean, reflect: true, attribute: 'hide-stepper' })
    public hideStepper = false;

    @property({ type: Boolean, reflect: true, attribute: 'keyboard-focused' })
    public keyboardFocused = false;

    @property({ type: Number })
    public max?: number;

    @property({ type: Number })
    public min?: number;

    /**
     * The distance by which to alter the value of the element when taking a "step".
     *
     * When `this.formatOptions.style === 'percentage'` the default step will be
     * set to 0.01 unless otherwise supplied to the element.
     */
    @property({ type: Number })
    public step?: number;

    @property({ type: Number })
    public set value(value: number) {
        if (value === this.value) {
            return;
        }
        const oldValue = this._value;
        this._value = value;
        this.requestUpdate('value', oldValue);
    }

    public get value(): number {
        return this._value;
    }

    public _value = NaN;

    /**
     * Retreive the value of the element parsed to a Number.
     */
    public get valueAsString(): string {
        return this._value.toString();
    }

    public set valueAsString(value: string) {
        this.value = new NumberParser(
            navigator.language,
            this.formatOptions
        ).parse(value);
    }

    public get formattedValue(): string {
        if (isNaN(this.value)) return '';
        return new NumberFormatter(
            navigator.language,
            this.formatOptions
        ).format(this.value);
    }

    private convertValueToNumber(value: string): number {
        return new NumberParser(navigator.language, this.formatOptions).parse(
            value
        );
    }

    private get _step(): number {
        if (typeof this.step !== 'undefined') {
            return this.step;
        }
        if (this.formatOptions?.style === 'percent') {
            return 0.01;
        }
        return 1;
    }

    private nextChange!: number;
    private changeCount = 0;
    private findChange!: (event: PointerEvent) => void;
    private change!: () => void;
    private safty!: number;

    private handlePointerdown(event: PointerEvent): void {
        if (event.button !== 0) {
            event.preventDefault();
            return;
        }
        this.buttons.setPointerCapture(event.pointerId);
        const stepUpRect = this.buttons.children[0].getBoundingClientRect();
        const stepDownRect = this.buttons.children[1].getBoundingClientRect();
        this.findChange = (event: PointerEvent) => {
            if (
                event.clientX >= stepUpRect.x &&
                event.clientY >= stepUpRect.y &&
                event.clientX <= stepUpRect.x + stepUpRect.width &&
                event.clientY <= stepUpRect.y + stepUpRect.height
            ) {
                this.change = () => this.increment();
            } else if (
                event.clientX >= stepDownRect.x &&
                event.clientY >= stepDownRect.y &&
                event.clientX <= stepDownRect.x + stepDownRect.width &&
                event.clientY <= stepDownRect.y + stepDownRect.height
            ) {
                this.change = () => this.decrement();
            }
        };
        this.findChange(event);
        this.startChange();
    }

    private startChange(): void {
        this.changeCount = 0;
        this.doChange();
        this.safty = (setTimeout(() => {
            this.doNextChange();
        }, 400) as unknown) as number;
    }

    private doChange(): void {
        this.change();
        this.dispatchEvent(
            new Event('input', { bubbles: true, composed: true })
        );
    }

    private handlePointermove(event: PointerEvent): void {
        this.findChange(event);
    }

    private handlePointerup(event: PointerEvent): void {
        this.buttons.releasePointerCapture(event.pointerId);
        cancelAnimationFrame(this.nextChange);
        clearTimeout(this.safty);
    }

    private doNextChange(): number {
        this.changeCount += 1;
        if (this.changeCount % FRAMES_PER_CHANGE === 0) {
            this.doChange();
        }
        return requestAnimationFrame(() => {
            this.nextChange = this.doNextChange();
        });
    }

    private stepBy(count: number): void {
        const min = typeof this.min !== 'undefined' ? this.min : 0;
        let value = this.value;
        value += count * this._step;
        if (isNaN(this.value)) {
            this.value = min;
        } else {
            this.value = value;
        }
        this.focus();
    }

    private increment(): void {
        this.stepBy(1);
    }

    private decrement(): void {
        this.stepBy(-1);
    }

    private handleKeydown(event: KeyboardEvent): void {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
            // Don't do work when modifiers are present.
            return;
        }
        switch (event.code) {
            case 'ArrowUp':
                event.preventDefault();
                this.increment();
                break;
            case 'ArrowDown':
                event.preventDefault();
                this.decrement();
                break;
        }
    }

    protected onScroll(event: WheelEvent): void {
        event.preventDefault();
        this.stepBy(event.deltaY);
    }

    protected onFocus(): void {
        super.onFocus();
        this.keyboardFocused = true;
        this.addEventListener('wheel', this.onScroll);
    }

    protected onBlur(): void {
        super.onBlur();
        this.keyboardFocused = false;
        this.removeEventListener('wheel', this.onScroll);
    }

    private handleFocusin(): void {
        this.focused = true;
        this.keyboardFocused = true;
    }

    private handleFocusout(): void {
        this.focused = false;
        this.keyboardFocused = false;
    }

    protected onChange(): void {
        const value = this.convertValueToNumber(this.inputElement.value);
        this.value = value;
        super.onChange();
    }

    protected onInput(): void {
        return;
    }

    protected get displayValue(): string {
        return this.formattedValue;
    }

    protected render(): TemplateResult {
        this.autocomplete = 'off';
        return html`
            ${super.render()}
            ${this.hideStepper
                ? html``
                : html`
                      <span
                          class="buttons"
                          @focusin=${this.handleFocusin}
                          @focusout=${this.handleFocusout}
                          @manage=${streamingListener(
                              {
                                  type: 'pointerdown',
                                  fn: this.handlePointerdown,
                              },
                              {
                                  type: [
                                      'pointermove',
                                      'pointerenter',
                                      'pointerleave',
                                      'pointerover',
                                      'pointerout',
                                  ],
                                  fn: this.handlePointermove,
                              },
                              {
                                  type: ['pointerup', 'pointercancel'],
                                  fn: this.handlePointerup,
                              }
                          )}
                      >
                          <sp-action-button
                              class="stepUp"
                              label="Increment"
                              tabindex="-1"
                              ?focused=${this.focused}
                              ?disabled=${this.disabled ||
                              this.readonly ||
                              (typeof this.max !== 'undefined' &&
                                  this.value === this.max)}
                          >
                              <sp-icon-chevron75
                                  slot="icon"
                                  class="stepper-icon spectrum-UIIcon-ChevronUp75"
                              ></sp-icon-chevron75>
                          </sp-action-button>
                          <sp-action-button
                              class="stepDown"
                              label="Decrement"
                              tabindex="-1"
                              ?focused=${this.focused}
                              ?disabled=${this.disabled ||
                              this.readonly ||
                              (typeof this.min !== 'undefined' &&
                                  this.value === this.min)}
                          >
                              <sp-icon-chevron75
                                  slot="icon"
                                  class="stepper-icon spectrum-UIIcon-ChevronDown75"
                              ></sp-icon-chevron75>
                          </sp-action-button>
                      </span>
                  `}
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.multiline = false;
        this.addEventListener('keydown', this.handleKeydown);
    }

    protected updated(changes: PropertyValues<this>): void {
        if (
            changes.has('value') ||
            changes.has('max') ||
            changes.has('min') ||
            changes.has('min')
        ) {
            let value = new NumberParser(
                navigator.language,
                this.formatOptions
            ).parse(this.inputElement.value);
            if (typeof this.min !== 'undefined') {
                value = Math.max(this.min, value);
            }
            if (typeof this.step !== 'undefined') {
                const min = typeof this.min !== 'undefined' ? this.min : 0;
                const moduloStep = (value - min) % this.step;
                const fallsOnStep = moduloStep === 0;
                if (!fallsOnStep) {
                    const overUnder = Math.round(moduloStep / this.step);
                    if (overUnder === 1) {
                        value += this.step - moduloStep;
                    } else {
                        value -= moduloStep;
                    }
                }
                if (typeof this.max !== 'undefined') {
                    while (value > this.max) {
                        value -= this.step;
                    }
                }
            }
            if (typeof this.max !== 'undefined') {
                if (typeof this.step !== 'undefined') {
                    while (value > this.max) {
                        value -= this.step;
                    }
                } else {
                    value = Math.min(this.max, value);
                }
            }
            this.value = value;
        }
        if (changes.has('min') || changes.has('formatOptions')) {
            let inputMode = 'numeric';
            const hasNegative = typeof this.min !== 'undefined' && this.min < 0;
            const { maximumFractionDigits } = this.formatOptions;
            const hasDecimals =
                maximumFractionDigits && maximumFractionDigits > 0;
            if (isIPhone()) {
                // iPhone doesn't have a minus sign in either numeric or decimal.
                // Note this is only for iPhone, not iPad, which always has both
                // minus and decimal in numeric.
                if (hasNegative) {
                    inputMode = 'text';
                } else if (hasDecimals) {
                    inputMode = 'decimal';
                }
            } else if (isAndroid()) {
                // Android numeric has both a decimal point and minus key.
                // decimal does not have a minus key.
                if (hasNegative) {
                    inputMode = 'numeric';
                } else if (hasDecimals) {
                    inputMode = 'decimal';
                }
            }
            this.inputElement.inputMode = inputMode;
        }
    }
}
