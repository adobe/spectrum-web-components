import { CSSResultArray } from 'lit-element';
import { ButtonBase } from './ButtonBase.js';
export declare type ButtonVariants = 'cta' | 'overBackground' | 'primary' | 'secondary' | 'negative';
/**
 * A Spectrum button control.
 * @element sp-button
 */
export declare class Button extends ButtonBase {
    static get styles(): CSSResultArray;
    /**
     * The visual variant to apply to this button.
     */
    variant: ButtonVariants;
    /**
     * There is a warning in place for this control
     */
    warning: boolean;
    /**
     * Style this button to be less obvious
     */
    quiet: boolean;
}
