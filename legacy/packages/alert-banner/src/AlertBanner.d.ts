import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/button/sp-close-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
declare const VALID_VARIANTS: string[];
export type AlertBannerVariants = (typeof VALID_VARIANTS)[number];
/**
 * @element sp-alert-banner
 *
 * @slot - The alert banner text context
 * @slot action - Slot for the button element that surfaces the contextual action a user can take
 *
 * @fires close - Announces the alert banner has been closed
 */
export declare class AlertBanner extends SpectrumElement {
    static get styles(): CSSResultArray;
    /**
     * Controls the display of the alert banner
     *
     * @param {Boolean} open
     */
    open: boolean;
    /**
     * Whether to include an icon-only close button to dismiss the alert banner
     *
     * @param {Boolean} dismissible
     */
    dismissible: boolean;
    /**
     * The variant applies specific styling when set to `negative` or `info`;
     * `variant` attribute is removed when it's passed an invalid variant.
     *
     * @param {String} variant
     */
    set variant(variant: AlertBannerVariants);
    get variant(): AlertBannerVariants;
    private _variant;
    protected isValidVariant(variant: string): boolean;
    protected renderIcon(variant: string): TemplateResult;
    private shouldClose;
    close(): void;
    private handleKeydown;
    protected render(): TemplateResult;
    protected updated(changes: PropertyValues): void;
}
export {};
