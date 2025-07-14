import type { ReactiveController, ReactiveElement } from 'lit';
import type { SystemVariant } from '@spectrum-web-components/theme';
export declare const systemResolverUpdatedSymbol: unique symbol;
export type ProvideSystem = {
    callback: (system: SystemVariant, unsubscribe: () => void) => void;
};
export declare class SystemResolutionController implements ReactiveController {
    private host;
    system: SystemVariant;
    private unsubscribe?;
    constructor(host: ReactiveElement);
    hostConnected(): void;
    hostDisconnected(): void;
    private resolveSystem;
}
