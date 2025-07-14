export declare class SlottableRequestEvent extends Event {
    readonly data: unknown;
    readonly name: string;
    readonly slotName: string;
    constructor(name: string, data: unknown, key?: string);
}
export declare const removeSlottableRequest: unique symbol;
declare global {
    interface GlobalEventHandlersEventMap {
        'slottable-request': SlottableRequestEvent;
    }
}
