import type { ReactiveController } from '@spectrum-web-components/base';
import { AbstractOverlay } from './AbstractOverlay.js';
export declare enum InteractionTypes {
    click = "click",
    hover = "hover",
    longpress = "longpress"
}
export declare const lastInteractionType: unique symbol;
export type ControllerOptions = {
    overlay?: AbstractOverlay;
    handleOverlayReady?: (overlay: AbstractOverlay) => void;
    isPersistent?: boolean;
};
type InteractionTarget = HTMLElement & {
    [lastInteractionType]?: InteractionTypes;
};
export declare class InteractionController implements ReactiveController {
    target: InteractionTarget;
    abortController: AbortController;
    get activelyOpening(): boolean;
    private handleOverlayReady?;
    private isLazilyOpen;
    get open(): boolean;
    /**
     * Set `open` against the associated Overlay lazily.
     */
    set open(open: boolean);
    get overlay(): AbstractOverlay;
    set overlay(overlay: AbstractOverlay | undefined);
    private _overlay;
    protected isPersistent: boolean;
    type: InteractionTypes;
    constructor(target: InteractionTarget, { overlay, isPersistent, handleOverlayReady }: ControllerOptions);
    prepareDescription(_: HTMLElement): void;
    releaseDescription(): void;
    shouldCompleteOpen(): void;
    init(): void;
    initOverlay(): void;
    abort(): void;
    hostConnected(): void;
    hostDisconnected(): void;
}
export {};
