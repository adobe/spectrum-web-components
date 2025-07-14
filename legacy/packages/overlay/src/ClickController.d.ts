import { InteractionController, InteractionTypes } from './InteractionController.js';
export declare class ClickController extends InteractionController {
    type: InteractionTypes;
    /**
     * An overlay with a `click` interaction should not close on click `triggerElement`.
     * When a click is initiated (`pointerdown`), apply `preventNextToggle` when the
     * overlay is `open` to prevent from toggling the overlay when the click event
     * propagates later in the interaction.
     */
    private preventNextToggle;
    handleClick(): void;
    handlePointerdown(): void;
    init(): void;
}
