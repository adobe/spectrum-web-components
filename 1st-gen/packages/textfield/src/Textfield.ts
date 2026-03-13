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

import {
    CSSResultArray,
    html,
    nothing,
    PropertyValues,
    SizedMixin,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    ifDefined,
    live,
} from '@spectrum-web-components/base/src/directives.js';
import {
    property,
    query,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import { isWebKit } from '@spectrum-web-components/shared';

import { ManageHelpText } from '@spectrum-web-components/help-text/src/manage-help-text.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';

import textfieldStyles from './textfield.css.js';
import checkmarkStyles from '@spectrum-web-components/icon/src/spectrum-icon-checkmark.css.js';

const textfieldTypes = ['text', 'url', 'tel', 'email', 'password'] as const;
export type TextfieldType = (typeof textfieldTypes)[number];

/**
 * @fires input - The value of the element has changed.
 * @fires change - An alteration to the value of the element has been committed by the user.
 */
export class TextfieldBase extends ManageHelpText(
    SizedMixin(Focusable, {
        noDefaultSize: true,
    })
) {
    public static override get styles(): CSSResultArray {
        return [textfieldStyles, checkmarkStyles];
    }

    @state()
    protected appliedLabel?: string;

    private _firstUpdateAfterConnected = true;

    private _inputRef?: HTMLInputElement | HTMLTextAreaElement;
    private _formRef?: HTMLFormElement;

    @query('#form-wrapper')
    protected formElement!: HTMLFormElement;

    /**
     * A regular expression outlining the keys that will be allowed to update the value of the form control.
     */
    @property({ attribute: 'allowed-keys' })
    allowedKeys = '';

    /**
     * @private
     */
    @property({ type: Boolean, reflect: true })
    public focused = false;

    @query('input, input.input:not(#sizer), textarea.input:not(#sizer)')
    protected inputElement!: HTMLInputElement | HTMLTextAreaElement;

    /**
     * Whether the `value` held by the form control is invalid.
     */
    @property({ type: Boolean, reflect: true })
    public invalid = false;

    /**
     * A string applied via `aria-label` to the form control when a user visible label is not provided.
     */
    @property()
    public label = '';

    /**
     * Name of the form control.
     */
    @property({ type: String, reflect: true })
    public name: string | undefined;

    /**
     * Text that appears in the form control when it has no value set
     */
    @property()
    public placeholder = '';

    @state()
    set type(val: TextfieldType) {
        const prev = this._type;
        this._type = val;
        this.requestUpdate('type', prev);
    }

    get type(): TextfieldType {
        return textfieldTypes.find((t) => t === this._type) ?? 'text';
    }

    /**
     * @private
     * This binding allows for invalid value for `type` to still be reflected to the DOM
     */
    @property({ attribute: 'type', reflect: true })
    private _type: TextfieldType = 'text';

    /**
     * Pattern the `value` must match to be valid
     */
    @property()
    public pattern?: string;

    /**
     * Whether a form control delivered with the `multiline` attribute will change size
     * vertically to accomodate longer input
     */
    @property({ type: Boolean, reflect: true })
    public grows = false;

    /**
     * Defines the maximum string length that the user can enter
     */
    @property({ type: Number })
    public maxlength = -1;

    /**
     * Defines the minimum string length that the user can enter
     */
    @property({ type: Number })
    public minlength = -1;

    /**
     * Whether the form control should accept a value longer than one line
     */
    @property({ type: Boolean, reflect: true })
    public multiline = false;

    /**
     * Whether a user can interact with the value of the form control
     */
    @property({ type: Boolean, reflect: true })
    public readonly = false;

    /**
     * The specific number of rows the form control should provide in the user interface
     */
    @property({ type: Number })
    public rows = -1;

    /**
     * Whether the `value` held by the form control is valid.
     */
    @property({ type: Boolean, reflect: true })
    public valid = false;

    /**
     * The value held by the form control
     */
    @property({ type: String })
    public set value(value: string | number) {
        if (value === this.value) {
            return;
        }
        const oldValue = this._value;
        this._value = value;
        this.requestUpdate('value', oldValue);
    }

    public get value(): string | number {
        return this._value;
    }

    protected _value: string | number = '';

    /**
     * Whether to display the form control with no visible background
     */
    @property({ type: Boolean, reflect: true })
    public quiet = false;

    /**
     * Whether the form control will be found to be invalid when it holds no `value`
     */
    @property({ type: Boolean, reflect: true })
    public required = false;

    /**
     * What form of assistance should be provided when attempting to supply a value to the form control
     */
    @property({ type: String, reflect: true })
    public autocomplete?:
        | 'list'
        | 'none'
        | HTMLInputElement['autocomplete']
        | HTMLTextAreaElement['autocomplete'];

    public override get focusElement(): HTMLInputElement | HTMLTextAreaElement {
        if (isWebKit()) {
            return this._inputRef ?? this.inputElement;
        }
        return this.inputElement;
    }

    /**
     * Sets the start and end positions of the current selection.
     *
     * @param selectionStart The 0-based index of the first selected character. An index greater than the length of the
     *  element's value is treated as pointing to the end of the value.
     * @param selectionEnd The 0-based index of the character after the last selected character. An index greater than
     *  the length of the element's value is treated as pointing to the end of the value.
     * @param [selectionDirection="none"] A string indicating the direction in which the selection is considered to
     *  have been performed.
     */
    public setSelectionRange(
        selectionStart: number,
        selectionEnd: number,
        selectionDirection: 'forward' | 'backward' | 'none' = 'none'
    ): void {
        this.inputElement.setSelectionRange(
            selectionStart,
            selectionEnd,
            selectionDirection
        );
    }

    /**
     * Selects all the text.
     */
    public select(): void {
        this.inputElement.select();
    }

    protected handleInput(_event: Event): void {
        if (this.allowedKeys && this.inputElement.value) {
            const regExp = new RegExp(`^[${this.allowedKeys}]*$`, 'u');
            if (!regExp.test(this.inputElement.value)) {
                const selectionStart = this.inputElement
                    .selectionStart as number;
                const nextSelectStart = selectionStart - 1;
                this.inputElement.value = this.value.toString();
                this.inputElement.setSelectionRange(
                    nextSelectStart,
                    nextSelectStart
                );
                return;
            }
        }
        this.value = this.inputElement.value;
    }

    protected handleChange(): void {
        this.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: true,
            })
        );
    }

    protected onFocus(): void {
        this.focused = !this.readonly && true;
    }

    protected onBlur(_event: FocusEvent): void {
        this.focused = !this.readonly && false;
    }

    protected handleInputElementPointerdown(): void {}

    protected handleInputSubmit(event: Event): void {
        this.dispatchEvent(
            new Event('submit', {
                cancelable: true,
                bubbles: true,
            })
        );
        event.preventDefault();
    }

    private _eventHandlers = {
        input: this.handleInput.bind(this),
        change: this.handleChange.bind(this),
        focus: this.onFocus.bind(this),
        blur: this.onBlur.bind(this),
        submit: this.handleInputSubmit.bind(this),
    };

    protected firstUpdateAfterConnected(): void {
        this._inputRef = this.inputElement;
        if (this.formElement) {
            this._formRef = this.formElement;
            this.formElement.addEventListener(
                'submit',
                this._eventHandlers.submit
            );
            this.inputElement.addEventListener(
                'change',
                this._eventHandlers['change']
            );
            this.inputElement.addEventListener(
                'input',
                this._eventHandlers['input']
            );
            this.inputElement.addEventListener(
                'focus',
                this._eventHandlers['focus']
            );
            this.inputElement.addEventListener(
                'blur',
                this._eventHandlers['blur'] as EventListener
            );
        }
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (isWebKit() && this._firstUpdateAfterConnected) {
            this._firstUpdateAfterConnected = false;
            this.firstUpdateAfterConnected();
        }
    }

    override connectedCallback(): void {
        super.connectedCallback();
        if (isWebKit()) {
            this._firstUpdateAfterConnected = true;
            if (this._formRef) {
                const formContainer =
                    this.shadowRoot.querySelector('#form-container');
                if (formContainer) {
                    formContainer.appendChild(this._formRef);
                    this.requestUpdate();
                }
                this._formRef = undefined;
            }
        }
    }

    override disconnectedCallback(): void {
        if (isWebKit()) {
            this._inputRef?.removeEventListener(
                'change',
                this._eventHandlers['change']
            );
            this._inputRef?.removeEventListener(
                'input',
                this._eventHandlers['input']
            );
            this._inputRef?.removeEventListener(
                'focus',
                this._eventHandlers['focus']
            );
            this._inputRef?.removeEventListener(
                'blur',
                this._eventHandlers['blur'] as EventListener
            );
            if (this._formRef) {
                this._formRef.remove();
                this._formRef.removeEventListener(
                    'submit',
                    this._eventHandlers.submit
                );
            }
        }
        super.disconnectedCallback();
    }

    protected renderStateIcons(): TemplateResult | typeof nothing {
        if (this.invalid) {
            return html`
                <sp-icon-alert id="invalid" class="icon"></sp-icon-alert>
            `;
        } else if (this.valid) {
            return html`
                <sp-icon-checkmark100
                    id="valid"
                    class="icon spectrum-UIIcon-Checkmark100"
                ></sp-icon-checkmark100>
            `;
        }
        return nothing;
    }

    protected get displayValue(): string {
        return this.value.toString();
    }

    // prettier-ignore
    private get renderMultiline(): TemplateResult {
        return html`
            ${this.multiline && this.grows && this.rows === -1
                ? html`
                      <div id="sizer" class="input" aria-hidden="true">${this.value}&#8203;
                      </div>
                  `
                : nothing}
            <!-- @ts-ignore -->
            <textarea
                name=${ifDefined(this.name || undefined)}
                aria-describedby=${this.helpTextId}
                aria-label=${this.label ||
                this.appliedLabel ||
                this.placeholder}
                aria-invalid=${ifDefined(this.invalid || undefined)}
                class="input"
                maxlength=${ifDefined(
                    this.maxlength > -1 ? this.maxlength : undefined
                )}
                minlength=${ifDefined(
                    this.minlength > -1 ? this.minlength : undefined
                )}
                title=${this.invalid ? '' : nothing}
                pattern=${ifDefined(this.pattern)}
                placeholder=${this.placeholder}
                .value=${this.displayValue}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
                rows=${ifDefined(this.rows > -1 ? this.rows : undefined)}
                autocomplete=${ifDefined(this.autocomplete)}
            ></textarea>
        `;
    }

    private get renderInput(): TemplateResult {
        if (isWebKit()) {
            return html`
                <!-- @ts-ignore -->
                <div id="form-container" class="input">
                    <form id="form-wrapper" class="input">
                        <input
                            name=${ifDefined(this.name || undefined)}
                            type=${this.type}
                            aria-describedby=${this.helpTextId}
                            aria-label=${this.label || this.placeholder}
                            aria-invalid=${ifDefined(this.invalid || undefined)}
                            class="input"
                            maxlength=${ifDefined(
                                this.maxlength > -1 ? this.maxlength : undefined
                            )}
                            minlength=${ifDefined(
                                this.minlength > -1 ? this.minlength : undefined
                            )}
                            pattern=${ifDefined(this.pattern)}
                            placeholder=${this.placeholder}
                            .value=${live(this.displayValue)}
                            ?disabled=${this.disabled}
                            ?required=${this.required}
                            ?readonly=${this.readonly}
                            autocomplete=${ifDefined(this.autocomplete)}
                        />
                    </form>
                </div>
            `;
        }
        return html`
            <!-- @ts-ignore -->
            <input
                name=${ifDefined(this.name || undefined)}
                type=${this.type}
                aria-describedby=${this.helpTextId}
                aria-label=${this.label ||
                this.appliedLabel ||
                this.placeholder}
                aria-invalid=${ifDefined(this.invalid || undefined)}
                class="input"
                title=${this.invalid ? '' : nothing}
                maxlength=${ifDefined(
                    this.maxlength > -1 ? this.maxlength : undefined
                )}
                minlength=${ifDefined(
                    this.minlength > -1 ? this.minlength : undefined
                )}
                pattern=${ifDefined(this.pattern)}
                placeholder=${this.placeholder}
                .value=${live(this.displayValue)}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @pointerdown=${this.handleInputElementPointerdown}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
                autocomplete=${ifDefined(this.autocomplete)}
            />
        `;
    }

    protected renderField(): TemplateResult {
        return html`
            ${this.renderStateIcons()}
            ${this.multiline ? this.renderMultiline : this.renderInput}
        `;
    }

    protected override render(): TemplateResult {
        return html`
            <div id="textfield">${this.renderField()}</div>
            ${this.renderHelpText(this.invalid)}
        `;
    }

    protected override update(changedProperties: PropertyValues): void {
        if (
            changedProperties.has('value') ||
            (changedProperties.has('required') && this.required)
        ) {
            this.updateComplete.then(() => {
                this.checkValidity();
            });
        }
        super.update(changedProperties);
    }

    public checkValidity(): boolean {
        let validity = this.inputElement.checkValidity();
        if (this.required || (this.value && this.pattern)) {
            if ((this.disabled || this.multiline) && this.pattern) {
                const regex = new RegExp(`^${this.pattern}$`, 'u');
                validity = regex.test(this.value.toString());
            }
            if (typeof this.minlength !== 'undefined') {
                validity =
                    validity && this.value.toString().length >= this.minlength;
            }
            this.valid = validity;
            this.invalid = !validity;
        }
        return validity;
    }
}

/**
 * @element sp-textfield
 * @slot help-text - default or non-negative help text to associate to your form element
 * @slot negative-help-text - negative help text to associate to your form element when `invalid`
 */
export class Textfield extends TextfieldBase {
    @property({ type: String })
    public override set value(value: string) {
        if (value === this.value) {
            return;
        }
        const oldValue = this._value;
        this._value = value;
        this.requestUpdate('value', oldValue);
    }

    public override get value(): string {
        return this._value;
    }

    protected override _value = '';
}
