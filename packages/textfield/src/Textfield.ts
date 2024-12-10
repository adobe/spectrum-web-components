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

import { ManageHelpText } from '@spectrum-web-components/help-text/src/manage-help-text.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';

import textfieldStyles from './textfield.css.js';
import checkmarkStyles from '@spectrum-web-components/icon/src/spectrum-icon-checkmark.css.js';
import checkmarkSmallOverrides from '@spectrum-web-components/icon/src/icon-checkmark-overrides.css.js';

/**
 * Array of valid types for the textfield component.
 */
const textfieldTypes = ['text', 'url', 'tel', 'email', 'password'] as const;

/**
 * Type representing the valid types for the textfield component.
 */
export type TextfieldType = (typeof textfieldTypes)[number];

/**
 * The `TextfieldBase` component is a custom web component that provides a base class for textfield elements.
 * It includes properties and methods to manage the state and behavior of the textfield.
 *
 * @fires input - The value of the element has changed.
 * @fires change - An alteration to the value of the element has been committed by the user.
 */
export class TextfieldBase extends ManageHelpText(
    SizedMixin(Focusable, {
        noDefaultSize: true,
    })
) {
    /**
     * Returns the styles to be applied to the component.
     */
    public static override get styles(): CSSResultArray {
        return [textfieldStyles, checkmarkStyles, checkmarkSmallOverrides];
    }

    /**
     * State property to store the applied label.
     */
    @state()
    protected appliedLabel?: string;

    /**
     * A regular expression outlining the keys that will be allowed to update the value of the form control.
     *
     * This property specifies which keys are permitted for input in the textfield.
     */
    @property({ attribute: 'allowed-keys' })
    allowedKeys = '';

    /**
     * Indicates whether the textfield is focused.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: Boolean, reflect: true })
    public focused = false;

    /**
     * Query to select the input element within the textfield component.
     */
    @query('.input:not(#sizer)')
    protected inputElement!: HTMLInputElement | HTMLTextAreaElement;

    /**
     * Indicates whether the `value` held by the form control is invalid.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: Boolean, reflect: true })
    public invalid = false;

    /**
     * A string applied via `aria-label` to the form control when a user-visible label is not provided.
     *
     * This property provides an accessible name for the form control.
     */
    @property()
    public label = '';

    /**
     * Name of the form control.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: String, reflect: true })
    public name: string | undefined;

    /**
     * Text that appears in the form control when it has no value set.
     *
     * This property provides a hint to the user about what to enter in the form control.
     */
    @property()
    public placeholder = '';

    /**
     * Sets the type of the textfield.
     *
     * Updates the internal `_type` property and requests an update if the type changes.
     */
    @state()
    set type(val: TextfieldType) {
        const prev = this._type;
        this._type = val;
        this.requestUpdate('type', prev);
    }

    /**
     * Gets the type of the textfield.
     *
     * Returns the type if it is valid, otherwise returns 'text'.
     */
    get type(): TextfieldType {
        return textfieldTypes.find((t) => t === this._type) ?? 'text';
    }

    /**
     * Internal property to store the type of the textfield.
     *
     * This binding allows for invalid values for `type` to still be reflected to the DOM.
     */
    @property({ attribute: 'type', reflect: true })
    private _type: TextfieldType = 'text';

    /**
     * Pattern the `value` must match to be valid.
     *
     * This property specifies a regular expression that the value of the textfield must match.
     */
    @property()
    public pattern?: string;

    /**
     * Whether a form control delivered with the `multiline` attribute will change size
     * vertically to accommodate longer input.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: Boolean, reflect: true })
    public grows = false;

    /**
     * Defines the maximum string length that the user can enter.
     */
    @property({ type: Number })
    public maxlength = -1;

    /**
     * Defines the minimum string length that the user can enter.
     */
    @property({ type: Number })
    public minlength = -1;

    /**
     * Whether the form control should accept a value longer than one line.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: Boolean, reflect: true })
    public multiline = false;

    /**
     * Whether a user can interact with the value of the form control.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: Boolean, reflect: true })
    public readonly = false;

    /**
     * The specific number of rows the form control should provide in the user interface.
     */
    @property({ type: Number })
    public rows = -1;

    /**
     * Whether the `value` held by the form control is valid.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: Boolean, reflect: true })
    public valid = false;

    /**
     * The value held by the form control.
     *
     * Updates the internal `_value` property and requests an update if the value changes.
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

    /**
     * Gets the value held by the form control.
     */
    public get value(): string | number {
        return this._value;
    }

    /**
     * Internal property to store the value of the form control.
     */
    protected _value: string | number = '';

    /**
     * Whether to display the form control with no visible background.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: Boolean, reflect: true })
    public quiet = false;

    /**
     * Whether the form control will be found to be invalid when it holds no `value`.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: Boolean, reflect: true })
    public required = false;

    /**
     * What form of assistance should be provided when attempting to supply a value to the form control.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: String, reflect: true })
    public autocomplete?:
        | 'list'
        | 'none'
        | HTMLInputElement['autocomplete']
        | HTMLTextAreaElement['autocomplete'];

    /**
     * Gets the focusable element within the textfield component.
     */
    public override get focusElement(): HTMLInputElement | HTMLTextAreaElement {
        return this.inputElement;
    }

    /**
     * Sets the start and end positions of the current selection.
     *
     * @param selectionStart — The 0-based index of the first selected character. An index greater than the length of the
     *  element's value is treated as pointing to the end of the value.
     * @param selectionEnd — The 0-based index of the character after the last selected character. An index greater than
     *  the length of the element's value is treated as pointing to the end of the value.
     * @param selectionDirection — A string indicating the direction in which the selection is considered to
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
     * Selects all the text in the input element.
     */
    public select(): void {
        this.inputElement.select();
    }

    /**
     * Handles the input event.
     *
     * Validates the input against the allowed keys and updates the value if valid.
     */
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

    /**
     * Handles the change event.
     *
     * Dispatches a 'change' event when the value of the input element changes.
     */
    protected handleChange(): void {
        this.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: true,
            })
        );
    }

    /**
     * Handles the focus event.
     *
     * Sets the focused state to true if the input element is not readonly.
     */
    protected onFocus(): void {
        this.focused = !this.readonly && true;
    }

    /**
     * Handles the blur event.
     *
     * Sets the focused state to false if the input element is not readonly.
     */
    protected onBlur(_event: FocusEvent): void {
        this.focused = !this.readonly && false;
    }

    /**
     * Handles the pointerdown event on the input element.
     *
     * This method is currently empty and can be overridden by subclasses.
     */
    protected handleInputElementPointerdown(): void {}

    /**
     * Renders the state icons for the textfield component.
     *
     * Displays an alert icon if the textfield is invalid, a checkmark icon if it is valid, or nothing if neither.
     */
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

    /**
     * Gets the display value of the textfield.
     *
     * Converts the value to a string for display purposes.
     */
    protected get displayValue(): string {
        return this.value.toString();
    }

    /**
     * Renders the multiline textarea element if the `multiline` property is true.
     *
     * If the `grows` property is also true and `rows` is -1, it includes a sizer element to adjust the height.
     */
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

    /**
     * Renders the input element if the `multiline` property is false.
     */
    private get renderInput(): TemplateResult {
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

    /**
     * Renders the field of the textfield component.
     *
     * This method returns a template result containing the state icons and either the multiline textarea or the input element.
     */
    protected renderField(): TemplateResult {
        return html`
            ${this.renderStateIcons()}
            ${this.multiline ? this.renderMultiline : this.renderInput}
        `;
    }

    /**
     * Renders the content of the textfield component.
     *
     * This method returns a template result containing the textfield and help text.
     */
    protected override render(): TemplateResult {
        return html`
            <div id="textfield">${this.renderField()}</div>
            ${this.renderHelpText(this.invalid)}
        `;
    }

    /**
     * Lifecycle method called when the component updates.
     *
     * This method checks the validity of the value if the value or required properties have changed.
     */
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

    /**
     * Checks the validity of the textfield's value.
     *
     * This method validates the value against the required, pattern, and minlength properties.
     */
    public checkValidity(): boolean {
        let validity = this.inputElement.checkValidity();

        // Validate against the pattern if required or if a pattern is provided.
        if (this.required || (this.value && this.pattern)) {
            // Validate against the pattern if the textfield is disabled or multiline and a pattern is provided.
            if ((this.disabled || this.multiline) && this.pattern) {
                const regex = new RegExp(`^${this.pattern}$`, 'u');
                validity = regex.test(this.value.toString());
            }

            // Validate against the minlength property.
            if (typeof this.minlength !== 'undefined') {
                validity =
                    validity && this.value.toString().length >= this.minlength;
            }

            // Update the valid and invalid properties based on the validity.
            this.valid = validity;
            this.invalid = !validity;
        }
        return validity;
    }
}

/**
 * @element sp-textfield
 *
 * The `Textfield` component is a custom web component that provides a text input field.
 *
 * @slot help-text - Default or non-negative help text to associate with your form element.
 * @slot negative-help-text - Negative help text to associate with your form element when `invalid`.
 */
export class Textfield extends TextfieldBase {
    /**
     * Sets the value of the textfield.
     *
     * Updates the internal `_value` property and requests an update if the value changes.
     */
    @property({ type: String })
    public override set value(value: string) {
        if (value === this.value) {
            return;
        }

        const oldValue = this._value;
        this._value = value;
        this.requestUpdate('value', oldValue);
    }

    /**
     * Gets the value of the textfield.
     */
    public override get value(): string {
        return this._value;
    }

    /**
     * Internal property to store the value of the textfield.
     */
    protected override _value = '';
}
