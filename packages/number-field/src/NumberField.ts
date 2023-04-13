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
    CSSResultArray,
    html,
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import {
    LanguageResolutionController,
    languageResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';
import { streamingListener } from '@spectrum-web-components/base/src/streaming-listener.js';
import { NumberFormatter, NumberParser } from '@internationalized/number';

import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron75.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import {
    isAndroid,
    isIPhone,
} from '@spectrum-web-components/shared/src/platform.js';
import { TextfieldBase } from '@spectrum-web-components/textfield';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import styles from './number-field.css.js';

export const FRAMES_PER_CHANGE = 5;
// Debounce duration for inserting a `change` event after a batch of `wheel` originating `input` events.
export const CHANGE_DEBOUNCE_MS = 100;
export const indeterminatePlaceholder = '-';
export const remapMultiByteCharacters: Record<string, string> = {
    '１': '1',
    '２': '2',
    '３': '3',
    '４': '4',
    '５': '5',
    '６': '6',
    '７': '7',
    '８': '8',
    '９': '9',
    '０': '0',
    '、': ',',
    '，': ',',
    '。': '.',
    '．': '.',
    '％': '%',
    '＋': '+',
    ー: '-',
};

/**
 * @element sp-number-field
 * @slot help-text - default or non-negative help text to associate to your form element
 * @slot negative-help-text - negative help text to associate to your form element when `invalid`
 */
export class NumberField extends TextfieldBase {
    public static override get styles(): CSSResultArray {
        return [...super.styles, styles, chevronStyles];
    }

    @query('.buttons')
    private buttons!: HTMLDivElement;

    @property({ type: Boolean, reflect: true })
    public override focused = false;

    _forcedUnit = '';

    /**
     * An `&lt;sp-number-field&gt;` element will process its numeric value with
     * `new Intl.NumberFormat(this.resolvedLanguage, this.formatOptions).format(this.valueAsNumber)`
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

    @property({ type: Boolean, reflect: true })
    public indeterminate = false;

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

    public managedInput = false;

    @property({ type: Number, reflect: true, attribute: 'step-modifier' })
    public stepModifier = 10;

    @property({ type: Number })
    public override set value(rawValue: number) {
        const value = this.validateInput(rawValue);
        if (value === this.value) {
            return;
        }
        const oldValue = this._value;
        this._value = value;
        this.requestUpdate('value', oldValue);
    }

    public override get value(): number {
        return this._value;
    }

    private get inputValue(): string {
        return this.indeterminate
            ? this.formattedValue
            : this.inputElement.value;
    }

    public override _value = NaN;
    private _trackingValue = '';

    /**
     * Retreive the value of the element parsed to a Number.
     */
    public get valueAsString(): string {
        return this._value.toString();
    }

    public set valueAsString(value: string) {
        this.value = this.numberParser.parse(value);
    }

    public get formattedValue(): string {
        if (isNaN(this.value)) return '';
        return (
            this.numberFormatter.format(this.value) +
            (this.focused ? '' : this._forcedUnit)
        );
    }

    private convertValueToNumber(value: string): number {
        if (isIPhone() && this.inputElement.inputMode === 'decimal') {
            const parts = this.numberFormatter.formatToParts(1000.1);
            const sourceDecimal = value
                .split('')
                .find((char) => char === ',' || char === '.');
            const replacementDecimal = parts.find(
                (part) => part.type === 'decimal'
            )?.value;
            if (sourceDecimal && replacementDecimal) {
                value = value.replace(sourceDecimal, replacementDecimal);
            }
        }
        return this.numberParser.parse(value);
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
    private change!: (event: PointerEvent) => void;
    private safty!: number;
    private languageResolver = new LanguageResolutionController(this);

    private handlePointerdown(event: PointerEvent): void {
        if (event.button !== 0) {
            event.preventDefault();
            return;
        }
        this.managedInput = true;
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
                this.change = (event: PointerEvent) =>
                    this.increment(event.shiftKey ? this.stepModifier : 1);
            } else if (
                event.clientX >= stepDownRect.x &&
                event.clientY >= stepDownRect.y &&
                event.clientX <= stepDownRect.x + stepDownRect.width &&
                event.clientY <= stepDownRect.y + stepDownRect.height
            ) {
                this.change = (event: PointerEvent) =>
                    this.decrement(event.shiftKey ? this.stepModifier : 1);
            }
        };
        this.findChange(event);
        this.startChange(event);
    }

    private startChange(event: PointerEvent): void {
        this.changeCount = 0;
        this.doChange(event);
        this.safty = setTimeout(() => {
            this.doNextChange(event);
        }, 400) as unknown as number;
    }

    private doChange(event: PointerEvent): void {
        this.change(event);
    }

    private handlePointermove(event: PointerEvent): void {
        this.findChange(event);
    }

    private handlePointerup(event: PointerEvent): void {
        this.buttons.releasePointerCapture(event.pointerId);
        cancelAnimationFrame(this.nextChange);
        clearTimeout(this.safty);
        this.dispatchEvent(
            new Event('change', { bubbles: true, composed: true })
        );
        this.managedInput = false;
    }

    private doNextChange(event: PointerEvent): number {
        this.changeCount += 1;
        if (this.changeCount % FRAMES_PER_CHANGE === 0) {
            this.doChange(event);
        }
        return requestAnimationFrame(() => {
            this.nextChange = this.doNextChange(event);
        });
    }

    private stepBy(count: number): void {
        if (this.disabled || this.readonly) {
            return;
        }
        const min = typeof this.min !== 'undefined' ? this.min : 0;
        let value = this.value;
        value += count * this._step;
        if (isNaN(this.value)) {
            this.value = min;
        } else {
            this.value = value;
        }
        this.dispatchEvent(
            new Event('input', { bubbles: true, composed: true })
        );
        this.indeterminate = false;
        this.focus();
    }

    private increment(factor = 1): void {
        this.stepBy(1 * factor);
    }

    private decrement(factor = 1): void {
        this.stepBy(-1 * factor);
    }

    private handleKeydown(event: KeyboardEvent): void {
        switch (event.code) {
            case 'ArrowUp':
                event.preventDefault();
                this.increment(event.shiftKey ? this.stepModifier : 1);
                this.dispatchEvent(
                    new Event('change', { bubbles: true, composed: true })
                );
                break;
            case 'ArrowDown':
                event.preventDefault();
                this.decrement(event.shiftKey ? this.stepModifier : 1);
                this.dispatchEvent(
                    new Event('change', { bubbles: true, composed: true })
                );
                break;
        }
    }

    private queuedChangeEvent!: number;

    protected onScroll(event: WheelEvent): void {
        event.preventDefault();
        this.managedInput = true;
        const direction = event.shiftKey
            ? event.deltaX / Math.abs(event.deltaX)
            : event.deltaY / Math.abs(event.deltaY);
        if (direction !== 0 && !isNaN(direction)) {
            this.stepBy(direction * (event.shiftKey ? this.stepModifier : 1));
            clearTimeout(this.queuedChangeEvent);
            this.queuedChangeEvent = setTimeout(() => {
                this.dispatchEvent(
                    new Event('change', { bubbles: true, composed: true })
                );
            }, CHANGE_DEBOUNCE_MS) as unknown as number;
        }
        this.managedInput = false;
    }

    protected override onFocus(): void {
        super.onFocus();
        this._trackingValue = this.inputValue;
        this.keyboardFocused = !this.readonly && true;
        this.addEventListener('wheel', this.onScroll, { passive: false });
    }

    protected override onBlur(): void {
        super.onBlur();
        this.keyboardFocused = !this.readonly && false;
        this.removeEventListener('wheel', this.onScroll);
    }

    private handleFocusin(): void {
        this.focused = !this.readonly && true;
        this.keyboardFocused = !this.readonly && true;
    }

    private handleFocusout(): void {
        this.focused = !this.readonly && false;
        this.keyboardFocused = !this.readonly && false;
    }

    private wasIndeterminate = false;
    private indeterminateValue?: number;

    protected override handleChange(): void {
        const value = this.convertValueToNumber(this.inputValue);
        if (this.wasIndeterminate) {
            this.wasIndeterminate = false;
            this.indeterminateValue = undefined;
            if (isNaN(value)) {
                this.indeterminate = true;
                return;
            }
        }
        this.value = value;
        super.handleChange();
    }

    protected override handleInput(): void {
        if (this.indeterminate) {
            this.wasIndeterminate = true;
            this.indeterminateValue = this.value;
            this.inputElement.value = this.inputElement.value.replace(
                indeterminatePlaceholder,
                ''
            );
        }
        const { value: originalValue, selectionStart } = this.inputElement;
        const value = originalValue
            .split('')
            .map((char) => remapMultiByteCharacters[char] || char)
            .join('');
        if (this.numberParser.isValidPartialNumber(value)) {
            const valueAsNumber = this.convertValueToNumber(value);
            if (!value && this.indeterminateValue) {
                this.indeterminate = true;
                this._value = this.indeterminateValue;
            } else {
                this.indeterminate = false;
                this._value = this.validateInput(valueAsNumber);
            }
            this._trackingValue = value;
            this.inputElement.value = value;
            return;
        }
        const currentLength = value.length;
        const previousLength = this._trackingValue.length;
        const nextSelectStart =
            (selectionStart || currentLength) -
            (currentLength - previousLength);
        this.inputElement.value = this.indeterminate
            ? indeterminatePlaceholder
            : this._trackingValue;
        this.inputElement.setSelectionRange(nextSelectStart, nextSelectStart);
    }

    private validateInput(value: number): number {
        if (typeof this.min !== 'undefined') {
            value = Math.max(this.min, value);
        }
        if (typeof this.max !== 'undefined') {
            value = Math.min(this.max, value);
        }
        // Step shouldn't validate when 0...
        if (this.step) {
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
        return value;
    }

    protected override get displayValue(): string {
        const indeterminateValue = this.focused ? '' : indeterminatePlaceholder;
        return this.indeterminate ? indeterminateValue : this.formattedValue;
    }

    protected clearNumberFormatterCache(): void {
        this._numberFormatter = undefined;
        this._numberParser = undefined;
    }

    protected get numberFormatter(): NumberFormatter {
        if (!this._numberFormatter || !this._numberFormatterFocused) {
            const {
                style,
                unit,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                unitDisplay,
                ...formatOptionsNoUnit
            } = this.formatOptions;
            if (style !== 'unit') {
                (formatOptionsNoUnit as Intl.NumberFormatOptions).style = style;
            }
            this._numberFormatterFocused = new NumberFormatter(
                this.languageResolver.language,
                formatOptionsNoUnit
            );
            try {
                this._numberFormatter = new NumberFormatter(
                    this.languageResolver.language,
                    this.formatOptions
                );
                this._forcedUnit = '';
                this._numberFormatter.format(1);
            } catch (error) {
                if (style === 'unit') {
                    this._forcedUnit = unit as string;
                }
                this._numberFormatter = this._numberFormatterFocused;
            }
        }
        return this.focused
            ? this._numberFormatterFocused
            : this._numberFormatter;
    }

    private _numberFormatter?: NumberFormatter;
    private _numberFormatterFocused?: NumberFormatter;

    protected get numberParser(): NumberParser {
        if (!this._numberParser || !this._numberParserFocused) {
            const {
                style,
                unit,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                unitDisplay,
                ...formatOptionsNoUnit
            } = this.formatOptions;
            if (style !== 'unit') {
                (formatOptionsNoUnit as Intl.NumberFormatOptions).style = style;
            }
            this._numberParserFocused = new NumberParser(
                this.languageResolver.language,
                formatOptionsNoUnit
            );
            try {
                this._numberParser = new NumberParser(
                    this.languageResolver.language,
                    this.formatOptions
                );
                this._forcedUnit = '';
                this._numberParser.parse('0');
            } catch (error) {
                if (style === 'unit') {
                    this._forcedUnit = unit as string;
                }
                this._numberParser = this._numberParserFocused;
            }
        }
        return this.focused ? this._numberParserFocused : this._numberParser;
    }

    private _numberParser?: NumberParser;
    private _numberParserFocused?: NumberParser;

    protected override renderField(): TemplateResult {
        this.autocomplete = 'off';
        return html`
            ${super.renderField()}
            ${this.hideStepper
                ? html``
                : html`
                      <span
                          class="buttons"
                          @focusin=${this.handleFocusin}
                          @focusout=${this.handleFocusout}
                          ${streamingListener({
                              start: ['pointerdown', this.handlePointerdown],
                              streamInside: [
                                  [
                                      'pointermove',
                                      'pointerenter',
                                      'pointerleave',
                                      'pointerover',
                                      'pointerout',
                                  ],
                                  this.handlePointermove,
                              ],
                              end: [
                                  [
                                      'pointerup',
                                      'pointercancel',
                                      'pointerleave',
                                  ],
                                  this.handlePointerup,
                              ],
                          })}
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
                              ?quiet=${this.quiet}
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
                              ?quiet=${this.quiet}
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

    protected override update(changes: PropertyValues): void {
        if (changes.has('formatOptions') || changes.has('resolvedLanguage')) {
            this.clearNumberFormatterCache();
        }
        if (changes.has('value') || changes.has('max') || changes.has('min')) {
            const value = this.numberParser.parse(
                this.formattedValue.replace(this._forcedUnit, '')
            );
            this.value = value;
        }
        super.update(changes);
    }

    public override willUpdate(changes: PropertyValues): void {
        this.multiline = false;
        if (changes.has(languageResolverUpdatedSymbol)) {
            this.clearNumberFormatterCache();
        }
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.addEventListener('keydown', this.handleKeydown);
    }

    protected override updated(changes: PropertyValues<this>): void {
        if (changes.has('min') || changes.has('formatOptions')) {
            let inputMode = 'numeric';
            const hasNegative = typeof this.min !== 'undefined' && this.min < 0;
            const { maximumFractionDigits } =
                this.numberFormatter.resolvedOptions();
            const hasDecimals = maximumFractionDigits > 0;
            /* c8 ignore next 18 */
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
