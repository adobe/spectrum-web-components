import type { ReactiveController, ReactiveElement } from 'lit';
export declare const languageResolverUpdatedSymbol: unique symbol;
export declare class LanguageResolutionController implements ReactiveController {
    private host;
    language: string;
    private unsubscribe?;
    constructor(host: ReactiveElement);
    hostConnected(): void;
    hostDisconnected(): void;
    private resolveLanguage;
}
