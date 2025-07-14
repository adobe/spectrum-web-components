import { Overlay } from './Overlay.js';
declare class OverlayStack {
    private get document();
    private pointerdownPath?;
    private lastOverlay?;
    private root;
    stack: Overlay[];
    constructor();
    bindEvents(): void;
    private handleScroll;
    private closeOverlay;
    /**
     * Cach the `pointerdownTarget` for later testing
     *
     * @param event {ClickEvent}
     */
    handlePointerdown: (event: Event) => void;
    /**
     * Close all overlays that are not ancestors of this click event
     *
     * @param event {ClickEvent}
     */
    handlePointerup: () => void;
    handleBeforetoggle: (event: Event) => void;
    private handleKeydown;
    /**
     * Get an array of Overlays that all share the same trigger element.
     *
     * @param triggerElement {HTMLELement}
     * @returns {Overlay[]}
     */
    overlaysByTriggerElement(triggerElement: HTMLElement): Overlay[];
    /**
     * When overlays are added manage the open state of exisiting overlays appropriately:
     * - 'modal': should close other non-'modal' and non-'manual' overlays
     * - 'page': should close other non-'modal' and non-'manual' overlays
     * - 'auto': should close other 'auto' overlays and other 'hint' overlays, but not 'manual' overlays
     * - 'manual': shouldn't close other overlays
     * - 'hint': shouldn't close other overlays and give way to all other overlays on a trigger
     */
    add(overlay: Overlay): void;
    remove(overlay: Overlay): void;
}
export declare const overlayStack: OverlayStack;
export {};
