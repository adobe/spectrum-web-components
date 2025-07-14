import { InteractionController, InteractionTypes } from './InteractionController.js';
export declare const LONGPRESS_INSTRUCTIONS: {
    touch: string;
    keyboard: string;
    mouse: string;
};
export declare class LongpressController extends InteractionController {
    type: InteractionTypes;
    get activelyOpening(): boolean;
    protected longpressState: null | 'potential' | 'opening' | 'pressed';
    releaseDescription: () => void;
    private timeout;
    handleLongpress(): void;
    handlePointerdown(event: PointerEvent): void;
    private handlePointerup;
    private handleKeydown;
    private handleKeyup;
    prepareDescription(trigger: HTMLElement): void;
    shouldCompleteOpen(): void;
    init(): void;
}
