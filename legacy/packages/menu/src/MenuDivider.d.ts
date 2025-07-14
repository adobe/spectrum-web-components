import { CSSResultArray, PropertyValues, SpectrumElement } from '@spectrum-web-components/base';
declare const MenuDivider_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-menu-divider
 */
export declare class MenuDivider extends MenuDivider_base {
    static get styles(): CSSResultArray;
    protected firstUpdated(changed: PropertyValues<this>): void;
}
export {};
