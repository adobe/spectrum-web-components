/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { Overlay } from './Overlay.js';
declare class OverlayStack {
    private get document();
    private pointerdownPath?;
    private lastOverlay?;
    private root;
    stack: Overlay[];
    private originalBodyOverflow;
    private bodyScrollBlocked;
    constructor();
    bindEvents(): void;
    private handleScroll;
    private closeOverlay;
    /**
     * Manage body scroll blocking based on modal/page overlays
     */
    private manageBodyScroll;
    /**
     * Get all open modal/page overlays from the stack.
     * Cached to avoid repeated filtering.
     */
    private getModalOverlays;
    /**
     * Check if an event path intersects with any modal overlay dialog.
     * This is the core logic for determining if a click/pointer event is inside a modal.
     *
     * @param eventPath {EventTarget[]} The composed path from the event
     * @param modalOverlays {Overlay[]} The modal overlays to check against
     * @returns {boolean} True if the event is inside any modal overlay
     */
    private isEventInsideModal;
    /**
     * Cache the `pointerdownTarget` for later testing and prevent clicks outside page overlays
     *
     * @param event {PointerEvent}
     */
    handlePointerdown: (event: Event) => void;
    /**
     * Prevent clicks outside modal overlays from reaching external elements.
     * This replicates the behavior of dialog.showModal() which was removed
     * in favor of showPopover() for performance reasons.
     *
     * @param event {MouseEvent}
     */
    handleClick: (event: MouseEvent) => void;
    /**
     * Close all overlays that are not ancestors of this click event
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
