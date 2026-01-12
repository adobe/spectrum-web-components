/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { ReactiveController, ReactiveElement } from 'lit';

export interface AutoscrollOptions {
    /**
     * Enable autoscroll on X axis
     * @default true
     */
    enableX?: boolean;

    /**
     * Enable autoscroll on Y axis
     * @default true
     */
    enableY?: boolean;

    /**
     * Distance from edge (in pixels) to start autoscrolling
     * @default 50
     */
    threshold?: number;

    /**
     * Maximum scroll speed (pixels per frame)
     * @default 10
     */
    maxSpeed?: number;

    /**
     * Speed multiplier for autoscroll
     * @default 1.0
     */
    speedMultiplier?: number;

    /**
     * Callback when autoscroll occurs
     */
    onScroll?: (delta: { x: number; y: number }) => void;

    /**
     * The scrollable container element
     * If not provided, uses the host element
     */
    container?: HTMLElement;
}

/**
 * AutoscrollController - Handles viewport edge autoscrolling during drag operations
 * 
 * PRD Requirement (P0):
 * - Autoscroll when users drag items beyond visible parent container viewport
 * - Scroll speed dynamically adjusts based on proximity to viewport edge
 * - Smooth and performant for mobile and desktop
 * - Client can configure autoscroll on/off in both X and Y axes
 * 
 * Usage:
 * ```typescript
 * class MyList extends LitElement {
 *   private autoscroll = new AutoscrollController(this, {
 *     enableX: true,
 *     enableY: true,
 *     threshold: 50,
 *     maxSpeed: 10
 *   });
 * 
 *   // AutoscrollController automatically activates during drag operations
 * }
 * ```
 */
export class AutoscrollController implements ReactiveController {
    private host: ReactiveElement;
    private options: Required<AutoscrollOptions>;
    private container: HTMLElement;
    private rafId: number | null = null;
    private isScrolling = false;
    private lastMouseX = 0;
    private lastMouseY = 0;

    private dragMoveHandler = this.handleDragMove.bind(this);
    private dragEndHandler = this.handleDragEnd.bind(this);

    constructor(host: ReactiveElement, options: AutoscrollOptions = {}) {
        this.host = host;
        this.options = {
            enableX: options.enableX ?? true,
            enableY: options.enableY ?? true,
            threshold: options.threshold ?? 50,
            maxSpeed: options.maxSpeed ?? 10,
            speedMultiplier: options.speedMultiplier ?? 1.0,
            onScroll: options.onScroll ?? (() => {}),
            container: options.container ?? (this.host as unknown as HTMLElement),
        };
        this.container = this.options.container || (this.host as unknown as HTMLElement);
        this.host.addController(this);
    }

    hostConnected(): void {
        // Listen to drag move events to detect when to autoscroll
        document.addEventListener('dragover', this.dragMoveHandler);
        document.addEventListener('sp-drag-move', this.dragMoveHandler as EventListener);
        document.addEventListener('dragend', this.dragEndHandler);
        document.addEventListener('sp-drag-end', this.dragEndHandler as EventListener);
    }

    hostDisconnected(): void {
        document.removeEventListener('dragover', this.dragMoveHandler);
        document.removeEventListener('sp-drag-move', this.dragMoveHandler as EventListener);
        document.removeEventListener('dragend', this.dragEndHandler);
        document.removeEventListener('sp-drag-end', this.dragEndHandler as EventListener);
        this.stopAutoscroll();
    }

    /**
     * Update autoscroll options dynamically
     */
    public updateOptions(options: Partial<AutoscrollOptions>): void {
        Object.assign(this.options, options);
        if (options.container) {
            this.container = options.container;
        }
    }

    /**
     * Programmatically scroll to a specific element
     * Useful for "scroll to selected item" feature from PRD
     */
    public scrollToElement(element: HTMLElement, options?: ScrollIntoViewOptions): void {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
            ...options,
        });
    }

    private handleDragMove(event: Event): void {
        const dragEvent = event as DragEvent;
        
        // Update mouse position
        if (dragEvent.clientX !== undefined && dragEvent.clientY !== undefined) {
            this.lastMouseX = dragEvent.clientX;
            this.lastMouseY = dragEvent.clientY;
        }

        // Check if we need to start/update autoscroll
        const scrollDelta = this.calculateScrollDelta(this.lastMouseX, this.lastMouseY);
        
        if (scrollDelta.x !== 0 || scrollDelta.y !== 0) {
            if (!this.isScrolling) {
                this.startAutoscroll();
            }
        } else if (this.isScrolling) {
            this.stopAutoscroll();
        }
    }

    private handleDragEnd(): void {
        this.stopAutoscroll();
    }

    private calculateScrollDelta(mouseX: number, mouseY: number): { x: number; y: number } {
        const rect = this.container.getBoundingClientRect();
        const threshold = this.options.threshold;
        const maxSpeed = this.options.maxSpeed * this.options.speedMultiplier;

        let deltaX = 0;
        let deltaY = 0;

        // Calculate X axis scroll
        if (this.options.enableX) {
            const distanceFromLeft = mouseX - rect.left;
            const distanceFromRight = rect.right - mouseX;

            if (distanceFromLeft < threshold && distanceFromLeft >= 0) {
                // Scroll left - speed increases as we get closer to edge
                const proximity = 1 - (distanceFromLeft / threshold);
                deltaX = -maxSpeed * proximity;
            } else if (distanceFromRight < threshold && distanceFromRight >= 0) {
                // Scroll right
                const proximity = 1 - (distanceFromRight / threshold);
                deltaX = maxSpeed * proximity;
            }
        }

        // Calculate Y axis scroll
        if (this.options.enableY) {
            const distanceFromTop = mouseY - rect.top;
            const distanceFromBottom = rect.bottom - mouseY;

            if (distanceFromTop < threshold && distanceFromTop >= 0) {
                // Scroll up
                const proximity = 1 - (distanceFromTop / threshold);
                deltaY = -maxSpeed * proximity;
            } else if (distanceFromBottom < threshold && distanceFromBottom >= 0) {
                // Scroll down
                const proximity = 1 - (distanceFromBottom / threshold);
                deltaY = maxSpeed * proximity;
            }
        }

        return { x: deltaX, y: deltaY };
    }

    private startAutoscroll(): void {
        if (this.isScrolling) return;

        this.isScrolling = true;
        this.autoscrollFrame();
    }

    private stopAutoscroll(): void {
        if (!this.isScrolling) return;

        this.isScrolling = false;
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    private autoscrollFrame(): void {
        if (!this.isScrolling) return;

        const delta = this.calculateScrollDelta(this.lastMouseX, this.lastMouseY);

        if (delta.x !== 0 || delta.y !== 0) {
            // Perform the scroll
            this.container.scrollBy({
                left: delta.x,
                top: delta.y,
                behavior: 'auto', // Use 'auto' for smooth per-frame scrolling
            });

            // Call callback if provided
            this.options.onScroll?.(delta);
        }

        // Continue the animation loop
        this.rafId = requestAnimationFrame(() => this.autoscrollFrame());
    }

    /**
     * Check if autoscroll is currently active
     */
    public get active(): boolean {
        return this.isScrolling;
    }

    /**
     * Get current scroll position
     */
    public getScrollPosition(): { x: number; y: number } {
        return {
            x: this.container.scrollLeft,
            y: this.container.scrollTop,
        };
    }

    /**
     * Get container dimensions
     */
    public getContainerSize(): { width: number; height: number; scrollWidth: number; scrollHeight: number } {
        return {
            width: this.container.clientWidth,
            height: this.container.clientHeight,
            scrollWidth: this.container.scrollWidth,
            scrollHeight: this.container.scrollHeight,
        };
    }
}

