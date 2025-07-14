import { CSSResultArray, TemplateResult } from '@spectrum-web-components/base';
import { TextfieldBase } from '@spectrum-web-components/textfield';
/**
 * @element sp-color-field
 * @fires input - The value of the color-field has changed.
 * @fires change - An alteration to the value of the color-field has been committed by the user.
 */
export declare class ColorField extends TextfieldBase {
    static get styles(): CSSResultArray;
    viewColor: boolean;
    private colorController;
    constructor();
    set value(value: string);
    get value(): string;
    protected _value: string;
    private renderColorHandle;
    getColorValue(): string;
    protected render(): TemplateResult;
    checkValidity(): boolean;
}
