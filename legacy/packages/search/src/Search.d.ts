import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { Textfield } from '@spectrum-web-components/textfield';
import '@spectrum-web-components/button/sp-clear-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-search.js';
/**
 * @element sp-search
 * @slot help-text - default or non-negative help text to associate to your form element
 * @slot negative-help-text - negative help text to associate to your form element when `invalid`
 *
 * @fires submit - The search form has been submitted.
 */
export declare class Search extends Textfield {
    static get styles(): CSSResultArray;
    action: string;
    label: string;
    method?: 'get' | 'post' | 'dialog';
    placeholder: string;
    holdValueOnEscape: boolean;
    form: HTMLFormElement;
    private handleSubmit;
    private handleKeydown;
    reset(): Promise<void>;
    protected renderField(): TemplateResult;
    firstUpdated(changedProperties: PropertyValues): void;
    willUpdate(): void;
}
