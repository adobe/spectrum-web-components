import { InteractionController, InteractionTypes } from './InteractionController.js';
export declare class HoverController extends InteractionController {
    type: InteractionTypes;
    private elementIds;
    focusedin: boolean;
    private hoverTimeout?;
    pointerentered: boolean;
    handleKeyup(event: KeyboardEvent): void;
    handleTargetFocusin(): void;
    handleTargetFocusout(): void;
    handleTargetPointerenter(): void;
    handleTargetPointerleave(): void;
    handleHostPointerenter(): void;
    handleHostPointerleave(): void;
    prepareDescription(): void;
    private prepareOverlayRelativeDescription;
    private prepareContentRelativeDescription;
    protected doPointerleave(): void;
    init(): void;
    initOverlay(): void;
}
