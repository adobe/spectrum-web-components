import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
declare const FieldGroup_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/help-text/src/manage-help-text.js").HelpTextElementInterface;
    prototype: import("@spectrum-web-components/help-text/src/manage-help-text.js").HelpTextElementInterface;
};
/**
 * @element sp-field-group
 * @slot - the form controls that make up the group
 * @slot help-text - default or non-negative help text to associate to your form element
 * @slot negative-help-text - negative help text to associate to your form element when `invalid`
 */
export declare class FieldGroup extends FieldGroup_base {
    static get styles(): CSSResultArray;
    horizontal: boolean;
    invalid: boolean;
    label: string;
    vertical: boolean;
    protected handleSlotchange(): void;
    protected render(): TemplateResult;
    protected firstUpdated(changes: PropertyValues): void;
    protected updated(changes: PropertyValues<this>): void;
}
export {};
