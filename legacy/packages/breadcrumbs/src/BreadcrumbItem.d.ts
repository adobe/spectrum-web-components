import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
export interface BreadcrumbSelectDetail {
    value: string;
}
declare const BreadcrumbItem_base: typeof Focusable & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/like-anchor.js").LikeAnchorInterface;
    prototype: import("@spectrum-web-components/shared/src/like-anchor.js").LikeAnchorInterface;
};
export declare class BreadcrumbItem extends BreadcrumbItem_base {
    static get styles(): CSSResultArray;
    value: string | undefined;
    /**
     * @private
     * Marks this breadcrumb item as the current route.
     */
    isLastOfType: boolean;
    get focusElement(): HTMLElement;
    connectedCallback(): void;
    private announceSelected;
    protected handleClick(event?: Event): void;
    protected handleKeyDown(event: KeyboardEvent): void;
    protected renderLink(): TemplateResult;
    private renderSeparator;
    protected render(): TemplateResult;
    protected updated(changes: PropertyValues): void;
}
export {};
