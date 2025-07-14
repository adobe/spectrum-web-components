import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { Focusable } from '@spectrum-web-components/shared';
declare const TopNavItem_base: typeof Focusable & {
    new (...args: any[]): import("@spectrum-web-components/shared").LikeAnchorInterface;
    prototype: import("@spectrum-web-components/shared").LikeAnchorInterface;
};
/**
 * @element sp-top-nav-item
 *
 * @slot - text label of the Top Nav Item
 */
export declare class TopNavItem extends TopNavItem_base {
    static get styles(): CSSResultArray;
    private anchor;
    selected: boolean;
    value: string;
    get focusElement(): HTMLAnchorElement;
    click(): void;
    protected render(): TemplateResult;
    protected updated(changes: PropertyValues): void;
}
export {};
