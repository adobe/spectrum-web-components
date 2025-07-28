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
import { NumberFormatter, NumberParser } from '@internationalized/number';
import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron200.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron50.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron75.js';
import '@spectrum-web-components/infield-button/sp-infield-button.js';
import { TextfieldBase } from '@spectrum-web-components/textfield';
export declare const FRAMES_PER_CHANGE = 5;
export declare const CHANGE_DEBOUNCE_MS = 100;
export declare const indeterminatePlaceholder = "-";
export declare const remapMultiByteCharacters: Record<string, string>;
/**
 * @element sp-number-field
 * @slot help-text - default or non-negative help text to associate to your form element
 * @slot negative-help-text - negative help text to associate to your form element when `invalid`
 */
export declare class NumberField extends TextfieldBase {
    static get styles(): CSSResultArray;
    private buttons;
    focused: boolean;
    _forcedUnit: string;
    /**
     * An `&lt;sp-number-field&gt;` element will process its numeric value with
     * `new Intl.NumberFormat(this.resolvedLanguage, this.formatOptions).format(this.valueAsNumber)`
     * in order to prepare it for visual delivery in the input. In order to customize this
     * processing supply your own `Intl.NumberFormatOptions` object here.
     *
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
     */
    formatOptions: Intl.NumberFormatOptions;
    /**
     * Whether the stepper UI is hidden or not.
     */
    hideStepper: boolean;
    indeterminate: boolean;
    keyboardFocused: boolean;
    max?: number;
    min?: number;
    /**
     * The distance by which to alter the value of the element when taking a "step".
     *
     * When `this.formatOptions.style === 'percentage'` the default step will be
     * set to 0.01 unless otherwise supplied to the element.
     */
    step?: number;
    managedInput: boolean;
    stepModifier: number;
    set value(rawValue: number);
    get value(): number;
    private get inputValue();
    _value: number;
    private _trackingValue;
    private lastCommitedValue?;
    private setValue;
    /**
     * Retreive the value of the element parsed to a Number.
     */
    get valueAsString(): string;
    set valueAsString(value: string);
    get formattedValue(): string;
    private decimalsChars;
    private valueBeforeFocus;
    private isIntentDecimal;
    private convertValueToNumber;
    private get _step();
    private nextChange;
    private changeCount;
    private findChange;
    private change;
    private safty;
    private languageResolver;
    private handlePointerdown;
    private startChange;
    private doChange;
    private handlePointermove;
    private handlePointerup;
    private doNextChange;
    private stepBy;
    private increment;
    private decrement;
    private handleKeydown;
    private queuedChangeEvent;
    protected onScroll(event: WheelEvent): void;
    protected onFocus(): void;
    protected onBlur(_event: FocusEvent): void;
    private handleFocusin;
    private handleFocusout;
    private wasIndeterminate;
    private indeterminateValue?;
    protected handleChange(): void;
    protected handleCompositionStart(): void;
    protected handleCompositionEnd(): void;
    private hasRecentlyReceivedPointerDown;
    protected handleInputElementPointerdown(): void;
    protected handleInput(event: InputEvent): void;
    private valueWithLimits;
    private validateInput;
    protected get displayValue(): string;
    protected clearNumberFormatterCache(): void;
    protected get numberFormatter(): NumberFormatter;
    protected clearValueFormatterCache(): void;
    protected get valueFormatter(): NumberFormatter;
    private _numberFormatter?;
    private _numberFormatterFocused?;
    private _valueFormatter?;
    protected get numberParser(): NumberParser;
    applyFocusElementLabel: (value?: string) => void;
    private _numberParser?;
    private _numberParserFocused?;
    protected renderField(): TemplateResult;
    protected update(changes: PropertyValues): void;
    willUpdate(changes: PropertyValues): void;
    private isComposing;
    protected firstUpdated(changes: PropertyValues): void;
    protected updated(changes: PropertyValues<this>): void;
}
