import type { ReactiveController, ReactiveElement } from 'lit';
export declare const elementResolverUpdatedSymbol: unique symbol;
export declare class ElementResolutionController implements ReactiveController {
    get element(): HTMLElement | null;
    set element(element: HTMLElement | null);
    private _element;
    private host;
    private observer;
    get selector(): string;
    set selector(selector: string);
    private _selector;
    get selectorAsId(): string;
    get selectorIsId(): boolean;
    constructor(host: ReactiveElement, { selector }?: {
        selector: string;
    });
    protected mutationCallback: MutationCallback;
    hostConnected(): void;
    hostDisconnected(): void;
    private resolveElement;
    private releaseElement;
    private elementIsSelected;
}
