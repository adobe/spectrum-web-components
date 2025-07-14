import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/button/sp-clear-button.js';
declare const Tag_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-tag
 *
 * @slot - text content for labeling the tag
 * @slot avatar - an avatar element to display within the Tag
 * @slot icon - an icon element to display within the Tag
 */
export declare class Tag extends Tag_base {
    static get styles(): CSSResultArray;
    deletable: boolean;
    disabled: boolean;
    readonly: boolean;
    constructor();
    private handleFocusin;
    private handleFocusout;
    private handleKeydown;
    private delete;
    protected render(): TemplateResult;
    protected firstUpdated(changes: PropertyValues): void;
    protected updated(changes: PropertyValues): void;
}
export {};
