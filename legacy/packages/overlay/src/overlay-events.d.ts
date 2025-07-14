export declare class OverlayCloseEvent extends Event {
    root?: HTMLElement;
    constructor({ root }: {
        root?: HTMLElement;
    });
}
declare global {
    interface GlobalEventHandlersEventMap {
        'sp-overlay-close': CustomEvent<OverlayCloseEvent>;
    }
}
