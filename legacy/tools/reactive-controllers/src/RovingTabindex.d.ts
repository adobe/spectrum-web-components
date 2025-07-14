import { FocusGroupConfig, FocusGroupController } from './FocusGroup.js';
export type RovingTabindexConfig<T> = FocusGroupConfig<T>;
interface UpdateTabIndexes {
    tabIndex: number;
    removeTabIndex?: boolean;
}
export declare class RovingTabindexController<T extends HTMLElement> extends FocusGroupController<T> {
    protected set focused(focused: boolean);
    protected get focused(): boolean;
    private managed;
    private manageIndexesAnimationFrame;
    clearElementCache(offset?: number): void;
    manageTabindexes(): void;
    updateTabindexes(getTabIndex: (el: HTMLElement) => UpdateTabIndexes): void;
    manage(): void;
    unmanage(): void;
    hostUpdated(): void;
}
export {};
