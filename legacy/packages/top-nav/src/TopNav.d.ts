import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import { TopNavItem } from './TopNavItem.js';
declare const TopNav_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-top-nav
 *
 * @slot - Nav Items to display as a group
 * @attr {Boolean} compact - The collection of tabs take up less space
 */
export declare class TopNav extends TopNav_base {
    static get styles(): CSSResultArray;
    dir: 'ltr' | 'rtl';
    label: string;
    /**
     * A space separated list of part of the URL to ignore when matching
     * for the "selected" Top Nav Item. Currently supported values are
     * `hash` and `search`, which will remove the `#hash` and
     * `?search=value` respectively.
     */
    ignoreURLParts: string;
    selectionIndicatorStyle: string;
    shouldAnimate: boolean;
    /**
     * The Top Nav is displayed without a border.
     */
    quiet: boolean;
    private onClick;
    set selected(value: string | undefined);
    get selected(): string | undefined;
    private _selected;
    private slotEl;
    protected get items(): TopNavItem[];
    protected set items(items: TopNavItem[]);
    private _items;
    protected resizeController: ResizeController<void>;
    private manageItems;
    protected render(): TemplateResult;
    protected firstUpdated(changes: PropertyValues): void;
    protected updated(changes: PropertyValues): void;
    private selectTarget;
    protected onSlotChange(): void;
    protected updateCheckedState(value: string | undefined): void;
    private updateSelectionIndicator;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
export {};
