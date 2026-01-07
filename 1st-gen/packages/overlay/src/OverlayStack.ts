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

    private originalBodyOverflow = '';

    private bodyScrollBlocked = false;

    private modalBackdrop: HTMLElement | null = null;

    constructor() {
        this.bindEvents();
    }

    bindEvents(): void {
        this.document.addEventListener('pointerdown', this.handlePointerdown, {
            capture: true,
        });
        this.document.addEventListener('pointerup', this.handlePointerup);
        this.document.addEventListener('click', this.handleClick, {
            capture: true,
        });
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

        this.manageBodyScroll();
        this.manageModalBackdrop();
    }

    /**
     * Manage body scroll blocking based on modal/page overlays
     */
    private manageBodyScroll(): void {
        const shouldBlock = this.stack.some(
            (overlay) => overlay.type === 'modal' || overlay.type === 'page'
        );
        if (shouldBlock && !this.bodyScrollBlocked) {
            this.originalBodyOverflow = document.body.style.overflow || '';
            document.body.style.overflow = 'hidden';
            this.bodyScrollBlocked = true;
        } else if (!shouldBlock && this.bodyScrollBlocked) {
            document.body.style.overflow = this.originalBodyOverflow;
            this.bodyScrollBlocked = false;
        }
    }

    /**
     * Get all open modal/page overlays from the stack.
     * Cached to avoid repeated filtering.
     */
    private getModalOverlays(): Overlay[] {
        return this.stack.filter(
            (overlay) =>
                overlay.open &&
                (overlay.type === 'modal' || overlay.type === 'page')
        );
    }

    /**
     * Check if an event path intersects with any modal overlay dialog.
     * This is the core logic for determining if a click/pointer event is inside a modal.
     *
     * @param eventPath {EventTarget[]} The composed path from the event
     * @param modalOverlays {Overlay[]} The modal overlays to check against
     * @returns {boolean} True if the event is inside any modal overlay
     */
    private isEventInsideModal(
        eventPath: EventTarget[],
        modalOverlays: Overlay[]
    ): boolean {
        for (const overlay of modalOverlays) {
            // Check if overlay element itself is in the path
            if (eventPath.includes(overlay)) {
                return true;
            }

            try {
                let dialogEl: HTMLElement | null = overlay.dialogEl;
                if (!dialogEl) {
                    // Try to get it from the shadow root if not available via query
                    const shadowRoot = overlay.shadowRoot;
                    if (shadowRoot) {
                        dialogEl = shadowRoot.querySelector('.dialog');
                        if (!dialogEl) {
                            continue;
                        }
                    } else {
                        continue;
                    }
                }

                // When clicking inside a popover dialog, the dialog element
                // should be in the composedPath even though it's in the top layer
                if (eventPath.includes(dialogEl)) {
                    return true;
                }

                // Check if any element in the path is contained by dialog
                for (const element of eventPath) {
                    if (element instanceof Node && dialogEl.contains(element)) {
                        return true;
                    }
                }
            } catch {
                // dialogEl might not be accessible yet, ignore
                continue;
            }
        }
        return false;
    }

    /**
     * Manage backdrop element for modal/page overlays to block clicks outside.
     * The backdrop intercepts pointer events that might bypass capture phase listeners.
     */
    private manageModalBackdrop(): void {
        const hasModalOverlay = this.stack.some(
            (overlay) =>
                overlay.open &&
                (overlay.type === 'modal' || overlay.type === 'page')
        );

        if (hasModalOverlay && !this.modalBackdrop) {
            this.modalBackdrop = document.createElement('div');
            this.modalBackdrop.style.cssText = `
                position: fixed;
                inset: 0;
                z-index: 999998;
                background: transparent;
                pointer-events: auto;
            `;
            document.body.appendChild(this.modalBackdrop);
        } else if (!hasModalOverlay && this.modalBackdrop) {
            this.modalBackdrop.remove();
            this.modalBackdrop = null;
        }
    }

    /**
     * Cache the `pointerdownTarget` for later testing and prevent clicks outside modal overlays
     *
     * @param event {PointerEvent}
     */
    handlePointerdown = (event: Event): void => {
        // Cache pointerdown path and last overlay for valid interactions (used by handlePointerup)
        // Also block pointerdown outside modal overlays to prevent click handlers from running
        if (!this.stack.length) {
            this.pointerdownPath = event.composedPath();
            this.lastOverlay = this.stack[this.stack.length - 1];
            return;
        }

        const modalOverlays = this.getModalOverlays();
        const pointerPath = event.composedPath();

        if (!modalOverlays.length) {
            // No modal overlays, cache path for handlePointerup
            this.pointerdownPath = pointerPath;
            this.lastOverlay = this.stack[this.stack.length - 1];
            return;
        }

        if (!this.isEventInsideModal(pointerPath, modalOverlays)) {
            // Block pointerdown outside modal overlays
            // Don't cache path/lastOverlay for blocked interactions
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            // Also cancel the pointer event to prevent click from firing
            if (event instanceof PointerEvent) {
                (event.target as HTMLElement)?.releasePointerCapture?.(
                    event.pointerId
                );
            }
            return;
        }

        // Event is inside a modal overlay, cache path for handlePointerup
        this.pointerdownPath = pointerPath;
        this.lastOverlay = this.stack[this.stack.length - 1];
    };

    /**
     * Prevent clicks outside modal overlays from reaching external elements.
     * This replicates the behavior of dialog.showModal() which was removed
     * in favor of showPopover() for performance reasons.
     *
     * @param event {MouseEvent}
     */
    handleClick = (event: MouseEvent): void => {
        if (!this.stack.length) return;

        const modalOverlays = this.getModalOverlays();
        if (!modalOverlays.length) return;

        // If click is on the backdrop, block it
        if (event.target === this.modalBackdrop) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            return;
        }

        // Check if the click is inside any modal dialog
        // When a popover dialog is open, clicking inside it will have the dialog
        // element in the composedPath. Clicking outside won't.
        const clickPath = event.composedPath();
        if (!this.isEventInsideModal(clickPath, modalOverlays)) {
            // If click is outside all modal overlays, prevent it from reaching the target
            // This replicates the behavior that showModal() provided automatically
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }
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
        if (last?.type === 'hint') {
            // Close hint/tooltip overlays on "Escape" key and prevent further handling of the event.
            event.preventDefault();
            event.stopPropagation();
            this.closeOverlay(last);
            return;
        }
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
            this.manageBodyScroll();
            this.manageModalBackdrop();
        });
    }

    remove(overlay: Overlay): void {
        this.closeOverlay(overlay);
    }
}

export const overlayStack = new OverlayStack();
