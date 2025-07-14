import { Iconset } from './iconset.js';
export interface IconsetAddedDetail {
    name: string;
    iconset: Iconset;
}
export interface IconsetRemovedDetail {
    name: string;
}
export declare class IconsetRegistry {
    static getInstance(): IconsetRegistry;
    private static instance;
    private iconsetMap;
    addIconset(name: string, iconset: Iconset): void;
    removeIconset(name: string): void;
    getIconset(name: string): Iconset | undefined;
}
declare global {
    interface GlobalEventHandlersEventMap {
        'sp-iconset-added': CustomEvent<IconsetAddedDetail>;
        'sp-iconset-removed': CustomEvent<IconsetRemovedDetail>;
    }
}
