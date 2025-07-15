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

import { NumberFormatter } from '@internationalized/number';
import {
    CSSResultArray,
    html,
    nothing,
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { TextfieldBase } from '@spectrum-web-components/textfield';
import { LanguageResolutionController } from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';

import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron200.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron50.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron75.js';
import '@spectrum-web-components/infield-button/sp-infield-button.js';
import styles from './number-field.css.js';

// Constants needed for tests and internal use
export const FRAMES_PER_CHANGE = 5;
export const CHANGE_DEBOUNCE_MS = 100;
export const indeterminatePlaceholder = '-';

// Multi-byte character mapping for number input normalization
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
    一: '1',
    二: '2',
    三: '3',
    四: '4',
    五: '5',
    六: '6',
    七: '7',
    八: '8',
    九: '9',
    零: '0',
};

const chevronIcon: Record<string, (dir: 'Down' | 'Up') => TemplateResult> = {
    s: (dir) => html`
        <sp-icon-chevron50
            class="stepper-icon spectrum-UIIcon-Chevron${dir}50"
        ></sp-icon-chevron50>
    `,
    m: (dir) => html`
        <sp-icon-chevron75
            class="stepper-icon spectrum-UIIcon-Chevron${dir}75"
        ></sp-icon-chevron75>
    `,
    l: (dir) => html`
        <sp-icon-chevron100
            class="stepper-icon spectrum-UIIcon-Chevron${dir}100"
        ></sp-icon-chevron100>
    `,
    xl: (dir) => html`
        <sp-icon-chevron200
            class="stepper-icon spectrum-UIIcon-Chevron${dir}200"
        ></sp-icon-chevron200>
    `,
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

    @property({ type: Number })
    public max?: number;

    @property({ type: Number })
    public min?: number;

    @property({ type: Number })
    public step?: number;

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

    @property({ type: Number, reflect: true, attribute: 'step-modifier' })
    public stepModifier = 10;

    /**
     * Whether the input is being managed by the stepper UI
     */
    public managedInput = false;

    @property({ type: Number })
    public override set value(value: number) {
        if (value === this.value) {
            return;
        }
        const oldValue = this._value;
        this._value = this.validateInput(value);
        this.requestUpdate('value', oldValue);
    }

    public override get value(): number {
        return this._value;
    }

    protected override _value = NaN;

    private languageResolver = new LanguageResolutionController(this);

    private validateInput(value: number): number {
        if (typeof this.min !== 'undefined') {
            value = Math.max(this.min, value);
        }
        if (typeof this.max !== 'undefined') {
            value = Math.min(this.max, value);
        }
        return value;
    }

    protected get numberFormatter(): NumberFormatter {
        if (!this._numberFormatter) {
            this._numberFormatter = new NumberFormatter(
                this.languageResolver.language,
                this.formatOptions
            );
        }
        return this._numberFormatter;
    }

    private _numberFormatter?: NumberFormatter;

    private _forcedUnit = '';

    /**
     * Get the value as a string representation
     */
    public get valueAsString(): string {
        return this._value.toString();
    }

    /**
     * Set the value by parsing a string input
     */
    public set valueAsString(value: string) {
        const parsedValue = Number(value);
        this.value = isNaN(parsedValue) ? NaN : parsedValue;
    }

    /**
     * Get the formatted value with proper locale formatting and unit handling
     */
    public get formattedValue(): string {
        if (isNaN(this.value)) return '';
        return (
            this.numberFormatter.format(this.value) +
            (this.focused ? '' : this._forcedUnit)
        );
    }

    protected override get displayValue(): string {
        if (this.indeterminate) {
            return this.focused ? '' : '-';
        }
        return this.formattedValue;
    }

    protected override handleInput(event: Event): void {
        const inputValue = (event.target as HTMLInputElement).value;
        const newValue = inputValue === '' ? NaN : Number(inputValue);

        if (!isNaN(newValue) || inputValue === '') {
            this.value = newValue;
            this.indeterminate = false;
        }

        this.dispatchEvent(
            new Event('input', {
                bubbles: true,
                composed: true,
            })
        );
    }

    protected override handleChange(): void {
        this.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: true,
            })
        );
    }

    private handleStepperClick(direction: 'up' | 'down', event: Event): void {
        event.preventDefault();
        if (this.disabled || this.readonly) return;

        this.managedInput = true;
        const step = this.step ?? 1;
        const factor = (event as MouseEvent).shiftKey ? this.stepModifier : 1;
        const delta = direction === 'up' ? step * factor : -step * factor;

        const currentValue = isNaN(this.value) ? (this.min ?? 0) : this.value;
        this.value = currentValue + delta;
        this.indeterminate = false;

        this.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: true,
            })
        );
        this.managedInput = false;
    }

    protected override renderField(): TemplateResult {
        return html`
            ${this.renderStateIcons()}
            <input
                type="number"
                name=${ifDefined(this.name)}
                aria-describedby=${ifDefined(this.helpTextId)}
                aria-label=${ifDefined(
                    this.label || this.appliedLabel || this.placeholder
                )}
                aria-invalid=${ifDefined(this.invalid ? 'true' : undefined)}
                class="input"
                title=${ifDefined(this.invalid ? '' : undefined)}
                min=${ifDefined(this.min)}
                max=${ifDefined(this.max)}
                step=${ifDefined(this.step)}
                placeholder=${this.placeholder}
                .value=${this.displayValue}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
                autocomplete="off"
            />
            ${this.hideStepper
                ? nothing
                : html`
                      <span class="buttons">
                          <sp-infield-button
                              inline="end"
                              block="start"
                              class="button step-up"
                              aria-hidden="true"
                              label=${'Increase ' + this.appliedLabel}
                              size=${this.size}
                              tabindex="-1"
                              ?focused=${this.focused}
                              ?disabled=${this.disabled ||
                              this.readonly ||
                              (typeof this.max !== 'undefined' &&
                                  this.value === this.max)}
                              ?quiet=${this.quiet}
                              @click=${(event: Event) =>
                                  this.handleStepperClick('up', event)}
                          >
                              ${chevronIcon[this.size]('Up')}
                          </sp-infield-button>
                          <sp-infield-button
                              inline="end"
                              block="end"
                              class="button step-down"
                              aria-hidden="true"
                              label=${'Decrease ' + this.appliedLabel}
                              size=${this.size}
                              tabindex="-1"
                              ?focused=${this.focused}
                              ?disabled=${this.disabled ||
                              this.readonly ||
                              (typeof this.min !== 'undefined' &&
                                  this.value === this.min)}
                              ?quiet=${this.quiet}
                              @click=${(event: Event) =>
                                  this.handleStepperClick('down', event)}
                          >
                              ${chevronIcon[this.size]('Down')}
                          </sp-infield-button>
                      </span>
                  `}
        `;
    }

    protected override update(changes: PropertyValues): void {
        if (changes.has('formatOptions')) {
            this._numberFormatter = undefined;
        }
        super.update(changes);
    }

    protected override willUpdate(changes: PropertyValues): void {
        super.willUpdate(changes);
        this.setAttribute('type', 'number');
        this.multiline = false;
    }
}
