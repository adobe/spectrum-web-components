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

const supportsPopover = 'showPopover' in document.createElement('div');

class OverlayStack {
    private get document(): Document {
        return this.root.ownerDocument /* c8 ignore next */ || document;
    }

    private pointerdownPath?: EventTarget[];

    private lastOverlay?: Overlay;

    private root: HTMLElement = document.body;

    stack: Overlay[] = [];

    constructor() {
        this.bindEvents();
    }

    bindEvents(): void {
        this.document.addEventListener('pointerdown', this.handlePointerdown);
        this.document.addEventListener('pointerup', this.handlePointerup);
        this.document.addEventListener('keydown', this.handleKeydown);
        this.document.addEventListener('scroll', this.handleScroll, {
            capture: true,
        });
    }

    private handleScroll = (event: Event): void => {
        // Only handle document/body level scrolls
        // Skip any component scrolls
        if (
            event.target !== document &&
            event.target !== document.documentElement &&
            event.target !== document.body
        ) {
            return;
        }
        // Update positions of all open overlays
        this.stack.forEach((overlay) => {
            if (overlay.open) {
                // Don't close pickers on document scroll
                if (
                    overlay.type === 'auto' &&
                    overlay.triggerElement instanceof HTMLElement &&
                    overlay.triggerElement.closest('sp-picker, sp-action-menu')
                ) {
                    event.stopPropagation();
                }
                // Update the overlay's position by dispatching the update event
                document.dispatchEvent(
                    new CustomEvent('sp-update-overlays', {
                        bubbles: true,
                        composed: true,
                        cancelable: true,
                    })
                );
            }
        });
    };

    private closeOverlay(overlay: Overlay): void {
        const overlayIndex = this.stack.indexOf(overlay);
        if (overlayIndex > -1) {
            this.stack.splice(overlayIndex, 1);
        }
        overlay.open = false;
    }

    /**
     * Cach the `pointerdownTarget` for later testing
     *
     * @param event {ClickEvent}
     */
    handlePointerdown = (event: Event): void => {
        this.pointerdownPath = event.composedPath();
        this.lastOverlay = this.stack[this.stack.length - 1];
    };

    /**
     * Close all overlays that are not ancestors of this click event
     *
     * @param event {ClickEvent}
     */
    handlePointerup = (): void => {
        // Test against the composed path in `pointerdown` in case the visitor moved their
        // pointer during the course of the interaction.
        // Ensure that this value is cleared even if the work in this method goes undone.
        const composedPath = this.pointerdownPath;
        this.pointerdownPath = undefined;
        if (!this.stack.length) return;
        if (!composedPath?.length) return;
        const lastOverlay = this.lastOverlay;
        this.lastOverlay = undefined;

        const lastIndex = this.stack.length - 1;
        const nonAncestorOverlays = this.stack.filter((overlay, i) => {
            const inStack = composedPath.find(
                (el) =>
                    // The Overlay is in the stack
                    el === overlay ||
                    // The Overlay trigger is in the stack and the Overlay is a "hint"
                    (el === overlay?.triggerElement &&
                        'hint' === overlay?.type) ||
                    // The last Overlay in the stack is not the last Overlay at `pointerdown` time and has a
                    // `triggerInteraction` of "longpress", meaning it was opened by this poitner interaction
                    (i === lastIndex &&
                        overlay !== lastOverlay &&
                        overlay.triggerInteraction === 'longpress')
            );
            return (
                !inStack &&
                !overlay.shouldPreventClose() &&
                overlay.type !== 'manual' &&
                // Don't close if this overlay is modal and not on top of the overlay stack.
                !(overlay.type === 'modal' && lastOverlay !== overlay)
            );
        }) as Overlay[];
        nonAncestorOverlays.reverse();
        nonAncestorOverlays.forEach((overlay) => {
            this.closeOverlay(overlay);
            let parentToClose = overlay.parentOverlayToForceClose;
            while (parentToClose) {
                this.closeOverlay(parentToClose);
                parentToClose = parentToClose.parentOverlayToForceClose;
            }
        });
    };

    handleBeforetoggle = (event: Event): void => {
        const { target, newState: open } = event as Event & {
            newState: string;
        };
        if (open === 'open') return;
        this.closeOverlay(target as Overlay);
    };

    private handleKeydown = (event: KeyboardEvent): void => {
        if (event.code !== 'Escape') return;
        if (!this.stack.length) return;
        const last = this.stack[this.stack.length - 1];
        if (last?.type === 'page') {
            event.preventDefault();
            return;
        }
        if (last?.type === 'manual') {
            // Manual overlays should close on "Escape" key, but not when losing focus or interacting with other parts of the page.
            this.closeOverlay(last);
            return;
        }
        if (supportsPopover) return;
        if (!last) return;
        this.closeOverlay(last);
    };

    /**
     * Get an array of Overlays that all share the same trigger element.
     *
     * @param triggerElement {HTMLELement}
     * @returns {Overlay[]}
     */
    overlaysByTriggerElement(triggerElement: HTMLElement): Overlay[] {
        return this.stack.filter(
            (overlay) => overlay.triggerElement === triggerElement
        );
    }

    /**
     * When overlays are added manage the open state of exisiting overlays appropriately:
     * - 'modal': should close other non-'modal' and non-'manual' overlays
     * - 'page': should close other non-'modal' and non-'manual' overlays
     * - 'auto': should close other 'auto' overlays and other 'hint' overlays, but not 'manual' overlays
     * - 'manual': shouldn't close other overlays
     * - 'hint': shouldn't close other overlays and give way to all other overlays on a trigger
     */
    add(overlay: Overlay): void {
        if (this.stack.includes(overlay)) {
            const overlayIndex = this.stack.indexOf(overlay);
            if (overlayIndex > -1) {
                this.stack.splice(overlayIndex, 1);
                this.stack.push(overlay);
            }
            return;
        }
        if (
            overlay.type === 'auto' ||
            overlay.type === 'modal' ||
            overlay.type === 'page'
        ) {
            // manage closing open overlays
            const queryPathEventName = 'sp-overlay-query-path';
            const queryPathEvent = new Event(queryPathEventName, {
                composed: true,
                bubbles: true,
            });
            overlay.addEventListener(
                queryPathEventName,
                (event: Event) => {
                    const path = event.composedPath();
                    this.stack.forEach((overlayEl) => {
                        const inPath = path.find((el) => el === overlayEl);
                        if (
                            !inPath &&
                            overlayEl.type !== 'manual' &&
                            overlayEl.type !== 'modal'
                        ) {
                            this.closeOverlay(overlayEl);
                        }
                    });
                },
                { once: true }
            );
            overlay.dispatchEvent(queryPathEvent);
        } else if (overlay.type === 'hint') {
            const hasPrevious = this.stack.some((overlayEl) => {
                return (
                    overlayEl.type !== 'manual' &&
                    overlayEl.triggerElement &&
                    overlayEl.triggerElement === overlay.triggerElement
                );
            });
            if (hasPrevious) {
                overlay.open = false;
                return;
            }
            this.stack.forEach((overlayEl) => {
                if (overlayEl.type === 'hint') {
                    this.closeOverlay(overlayEl);
                }
            });
        }
        requestAnimationFrame(() => {
            this.stack.push(overlay);
            overlay.addEventListener('beforetoggle', this.handleBeforetoggle, {
                once: true,
            });
        });
    }

    remove(overlay: Overlay): void {
        this.closeOverlay(overlay);
    }
}

export const overlayStack = new OverlayStack();
