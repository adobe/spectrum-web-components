import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { ButtonBase } from './ButtonBase.js';
import { PendingStateController } from '@spectrum-web-components/reactive-controllers/src/PendingState.js';
export type DeprecatedButtonVariants = 'cta' | 'overBackground';
export type ButtonStaticColors = 'white' | 'black';
export type ButtonVariants = 'accent' | 'primary' | 'secondary' | 'negative' | ButtonStaticColors | DeprecatedButtonVariants;
export declare const VALID_VARIANTS: string[];
export declare const VALID_STATIC_COLORS: string[];
export type ButtonTreatments = 'fill' | 'outline';
declare const Button_base: typeof ButtonBase & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-button
 *
 * @slot - text label of the Button
 * @slot icon - The icon to use for Button
 */
export declare class Button extends Button_base {
    static get styles(): CSSResultArray;
    pendingLabel: string;
    pending: boolean;
    pendingStateController: PendingStateController<this>;
    /**
     * Initializes the `PendingStateController` for the Button component.
     * The `PendingStateController` manages the pending state of the Button.
     */
    constructor();
    click(): void;
    /**
     * The visual variant to apply to this button.
     */
    get variant(): ButtonVariants;
    set variant(variant: ButtonVariants);
    private _variant;
    /**
     * The static color variant to use for this button.
     */
    staticColor?: 'black' | 'white';
    /**
     * The visual treatment to apply to this button.
     */
    treatment: ButtonTreatments;
    /**
     * Style this button to be less obvious
     */
    set quiet(quiet: boolean);
    /**
     * Disables text wrapping within the button component's label.
     * Please note that this option is not a part of the design specification
     * and should be used carefully, with consideration of this overflow behavior
     * and the readability of the button's content.
     */
    noWrap: boolean;
    get quiet(): boolean;
    protected firstUpdated(changes: PropertyValues<this>): void;
    protected renderButton(): TemplateResult;
}
export {};
