import { CSSResultArray, TemplateResult } from 'lit-element';
import { ButtonBase } from './ButtonBase.js';
export declare class ClearButton extends ButtonBase {
    static get styles(): CSSResultArray;
    /**
     * The visual variant to apply to this button.
     */
    variant: 'overBackground' | '';
    protected get buttonContent(): TemplateResult[];
}
