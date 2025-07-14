import { CSSResultArray, nothing, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
declare const textfieldTypes: readonly ["text", "url", "tel", "email", "password"];
export type TextfieldType = (typeof textfieldTypes)[number];
declare const TextfieldBase_base: typeof Focusable & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/help-text/src/manage-help-text.js").HelpTextElementInterface;
    prototype: import("@spectrum-web-components/help-text/src/manage-help-text.js").HelpTextElementInterface;
};
/**
 * @fires input - The value of the element has changed.
 * @fires change - An alteration to the value of the element has been committed by the user.
 */
export declare class TextfieldBase extends TextfieldBase_base {
    static get styles(): CSSResultArray;
    protected appliedLabel?: string;
    /**
     * A regular expression outlining the keys that will be allowed to update the value of the form control.
     */
    allowedKeys: string;
    /**
     * @private
     */
    focused: boolean;
    protected inputElement: HTMLInputElement | HTMLTextAreaElement;
    /**
     * Whether the `value` held by the form control is invalid.
     */
    invalid: boolean;
    /**
     * A string applied via `aria-label` to the form control when a user visible label is not provided.
     */
    label: string;
    /**
     * Name of the form control.
     */
    name: string | undefined;
    /**
     * Text that appears in the form control when it has no value set
     */
    placeholder: string;
    set type(val: TextfieldType);
    get type(): TextfieldType;
    /**
     * @private
     * This binding allows for invalid value for `type` to still be reflected to the DOM
     */
    private _type;
    /**
     * Pattern the `value` must match to be valid
     */
    pattern?: string;
    /**
     * Whether a form control delivered with the `multiline` attribute will change size
     * vertically to accomodate longer input
     */
    grows: boolean;
    /**
     * Defines the maximum string length that the user can enter
     */
    maxlength: number;
    /**
     * Defines the minimum string length that the user can enter
     */
    minlength: number;
    /**
     * Whether the form control should accept a value longer than one line
     */
    multiline: boolean;
    /**
     * Whether a user can interact with the value of the form control
     */
    readonly: boolean;
    /**
     * The specific number of rows the form control should provide in the user interface
     */
    rows: number;
    /**
     * Whether the `value` held by the form control is valid.
     */
    valid: boolean;
    /**
     * The value held by the form control
     */
    set value(value: string | number);
    get value(): string | number;
    protected _value: string | number;
    /**
     * Whether to display the form control with no visible background
     */
    quiet: boolean;
    /**
     * Whether the form control will be found to be invalid when it holds no `value`
     */
    required: boolean;
    /**
     * What form of assistance should be provided when attempting to supply a value to the form control
     */
    autocomplete?: 'list' | 'none' | HTMLInputElement['autocomplete'] | HTMLTextAreaElement['autocomplete'];
    get focusElement(): HTMLInputElement | HTMLTextAreaElement;
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
    setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection?: 'forward' | 'backward' | 'none'): void;
    /**
     * Selects all the text.
     */
    select(): void;
    protected handleInput(_event: Event): void;
    protected handleChange(): void;
    protected onFocus(): void;
    protected onBlur(_event: FocusEvent): void;
    protected handleInputElementPointerdown(): void;
    protected renderStateIcons(): TemplateResult | typeof nothing;
    protected get displayValue(): string;
    private get renderMultiline();
    private get renderInput();
    protected renderField(): TemplateResult;
    protected render(): TemplateResult;
    protected update(changedProperties: PropertyValues): void;
    checkValidity(): boolean;
}
/**
 * @element sp-textfield
 * @slot help-text - default or non-negative help text to associate to your form element
 * @slot negative-help-text - negative help text to associate to your form element when `invalid`
 */
export declare class Textfield extends TextfieldBase {
    set value(value: string);
    get value(): string;
    protected _value: string;
}
export {};
