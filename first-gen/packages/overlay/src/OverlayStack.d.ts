/**
 * Copyright 2025 Adobe. All rights reserved.
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
