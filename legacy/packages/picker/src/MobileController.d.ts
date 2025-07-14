import { InteractionController, InteractionTypes } from './InteractionController.js';
export declare class MobileController extends InteractionController {
    type: InteractionTypes;
    handleClick(): void;
    handlePointerdown(): void;
    private handleFocusOut;
    init(): void;
}
