import { LitElement } from '@spectrum-web-components/base';
export declare abstract class Iconset extends LitElement {
    protected registered: boolean;
    private _name;
    protected firstUpdated(): void;
    /**
     * Name of the iconset, used by the IconsetRegistry to serve this icon set
     * to consuming icons.
     */
    set name(value: string);
    get name(): string;
    /**
     * Applies an icon to the given element
     */
    abstract applyIconToElement(el: HTMLElement, icon: string, size: string, label: string): void;
    /**
     * Returns a list of all icons in this iconset.
     */
    abstract getIconList(): string[];
    private handleRemoved;
    /**
     * On updated we register the iconset if we're not already registered
     */
    connectedCallback(): void;
    /**
     * On disconnected we remove the iconset
     */
    disconnectedCallback(): void;
    private addIconset;
    private removeIconset;
}
