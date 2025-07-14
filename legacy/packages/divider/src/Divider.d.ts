import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
declare const Divider_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-divider
 */
export declare class Divider extends Divider_base {
    static styles: CSSResultArray;
    vertical: boolean;
    protected render(): TemplateResult;
    protected firstUpdated(changed: PropertyValues<this>): void;
    protected updated(changed: PropertyValues<this>): void;
}
export {};
