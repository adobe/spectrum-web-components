import { LitElement, TemplateResult } from 'lit-element';
/**
 * Banner component
 *
 * @attr type - Determines the style, can be "info", "warning", or "error". Default is "info"
 * @attr corner - Determines if banner sets position at upper right corner or not.
 *
 * @slot header - Primary message of the banner.
 * @slot content - Secondary message of the banner. Used to provide a description.
 */
export declare class Banner extends LitElement {
    type: 'info' | 'warning' | 'error';
    corner: boolean;
    static styles: import('lit-element').CSSResult[];
    protected render(): TemplateResult;
}
