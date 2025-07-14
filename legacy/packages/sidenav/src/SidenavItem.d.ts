import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import { SideNav } from './Sidenav.js';
declare const SideNavItem_base: typeof Focusable & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/like-anchor.js").LikeAnchorInterface;
    prototype: import("@spectrum-web-components/shared/src/like-anchor.js").LikeAnchorInterface;
};
/**
 * @element sp-sidenav-item
 *
 * @slot - the Sidenav Items to display as children of this item
 */
export declare class SideNavItem extends SideNavItem_base {
    static get styles(): CSSResultArray;
    value: string | undefined;
    selected: boolean;
    expanded: boolean;
    protected get parentSideNav(): SideNav | undefined;
    protected _parentSidenav?: SideNav;
    protected get hasChildren(): boolean;
    protected get depth(): number;
    handleSideNavSelect(event: Event): void;
    protected handleClick(event?: Event): void;
    private announceSelected;
    click(): void;
    get focusElement(): HTMLElement;
    protected update(changes: PropertyValues): void;
    protected render(): TemplateResult;
    protected updated(changes: PropertyValues): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private startTrackingSelection;
    private stopTrackingSelection;
    protected firstUpdated(changed: PropertyValues<this>): void;
}
export {};
