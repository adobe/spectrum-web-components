import type { TriggerInteractions } from './overlay-types.js';
export declare class BeforetoggleClosedEvent extends Event {
    currentState: string;
    newState: string;
    constructor();
}
export declare class BeforetoggleOpenEvent extends Event {
    currentState: string;
    newState: string;
    constructor();
}
export declare class OverlayStateEvent extends Event {
    overlay: HTMLElement;
    detail: {
        interaction: string;
        reason?: 'external-click';
    };
    constructor(type: string, overlay: HTMLElement, { publish, interaction, reason, }: {
        publish?: boolean;
        interaction: TriggerInteractions;
        reason?: 'external-click';
    });
}
