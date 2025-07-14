import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
import { Focusable } from '@spectrum-web-components/shared';
import { SideNavItem } from './SidenavItem.js';
export interface SidenavSelectDetail {
    value: string;
}
/**
 * @element sp-sidenav
 *
 * @slot - the Sidenav Items to display
 * @fires change - Announces a change in the `value` property of the navigation element.
 * This change can be "canceled" via `event.preventDefault()`.
 */
export declare class SideNav extends Focusable {
    static get styles(): CSSResultArray;
    private items;
    startTrackingSelectionForItem(item: SideNavItem): void;
    stopTrackingSelectionForItem(item: SideNavItem): void;
    rovingTabindexController: RovingTabindexController<SideNavItem>;
    manageTabIndex: boolean;
    value: string | undefined;
    /**
     * The multilevel variant will have multiple layers of hierarchical navigation items.
     */
    variant?: 'multilevel';
    /**
     * An accessible label that describes the component,
     * so that the side navigation can be distinguished
     * from other navigation by screen reader users.
     * It will be applied to aria-label, but not visually rendered.
     */
    label?: string | undefined;
    private handleSelect;
    focus(): void;
    blur(): void;
    click(): void;
    get focusElement(): SideNavItem | SideNav;
    private isDisabledChild;
    private handleSlotchange;
    protected render(): TemplateResult;
    protected willUpdate(): void;
    protected updated(changes: PropertyValues): void;
}
declare global {
    interface GlobalEventHandlersEventMap {
        'sp-sidenav:select': CustomEvent<SidenavSelectDetail>;
    }
}
