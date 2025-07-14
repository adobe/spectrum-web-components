import type { ReactiveController, ReactiveElement } from 'lit';
type DirectionTypes = 'horizontal' | 'vertical' | 'both' | 'grid';
export type FocusGroupConfig<T> = {
    hostDelegatesFocus?: boolean;
    focusInIndex?: (_elements: T[]) => number;
    direction?: DirectionTypes | (() => DirectionTypes);
    elementEnterAction?: (el: T) => void;
    elements: () => T[];
    isFocusableElement?: (el: T) => boolean;
    listenerScope?: HTMLElement | (() => HTMLElement);
};
export declare class FocusGroupController<T extends HTMLElement> implements ReactiveController {
    protected cachedElements?: T[];
    private mutationObserver;
    get currentIndex(): number;
    set currentIndex(currentIndex: number);
    private _currentIndex;
    private prevIndex;
    get direction(): DirectionTypes;
    _direction: () => DirectionTypes;
    directionLength: number;
    hostDelegatesFocus: boolean;
    elementEnterAction: (_el: T) => void;
    get elements(): T[];
    private _elements;
    protected set focused(focused: boolean);
    protected get focused(): boolean;
    private _focused;
    get focusInElement(): T;
    get focusInIndex(): number;
    _focusInIndex: (_elements: T[]) => number;
    host: ReactiveElement;
    isFocusableElement: (_el: T) => boolean;
    isEventWithinListenerScope(event: Event): boolean;
    _listenerScope: () => HTMLElement;
    offset: number;
    recentlyConnected: boolean;
    constructor(host: ReactiveElement, { hostDelegatesFocus, direction, elementEnterAction, elements, focusInIndex, isFocusableElement, listenerScope, }?: FocusGroupConfig<T>);
    handleItemMutation(): void;
    update({ elements }?: FocusGroupConfig<T>): void;
    /**
     * resets the focusedItem to initial item
     */
    reset(): void;
    focusOnItem(item?: T, options?: FocusOptions): void;
    focus(options?: FocusOptions): void;
    clearElementCache(offset?: number): void;
    setCurrentIndexCircularly(diff: number): void;
    hostContainsFocus(): void;
    hostNoLongerContainsFocus(): void;
    isRelatedTargetOrContainAnElement(event: FocusEvent): boolean;
    handleFocusin: (event: FocusEvent) => void;
    /**
     * handleClick - Finds the element that was clicked and sets the tabindex to 0
     * @returns void
     */
    handleClick: () => void;
    handleFocusout: (event: FocusEvent) => void;
    acceptsEventKey(key: string): boolean;
    handleKeydown: (event: KeyboardEvent) => void;
    manage(): void;
    unmanage(): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    hostConnected(): void;
    hostDisconnected(): void;
    hostUpdated(): void;
}
export {};
