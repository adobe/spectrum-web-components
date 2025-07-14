import type { ReactiveController, ReactiveElement } from 'lit';
export declare const DARK_MODE = "(prefers-color-scheme: dark)";
export declare const IS_MOBILE = "(max-width: 743px) and (hover: none) and (pointer: coarse)";
export declare class MatchMediaController implements ReactiveController {
    key: symbol;
    matches: boolean;
    protected host: ReactiveElement;
    protected media: MediaQueryList;
    constructor(host: ReactiveElement, query: string);
    hostConnected(): void;
    hostDisconnected(): void;
    protected onChange(event: MediaQueryListEvent): void;
}
