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

export interface DropIndicatorOptions {
    /**
     * Orientation of the drop indicator
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';

    /**
     * Color of the drop indicator
     * @default 'var(--spectrum-global-color-blue-500)'
     */
    color?: string;

    /**
     * Thickness of the drop indicator line (in pixels)
     * @default 3
     */
    thickness?: number;

    /**
     * Whether to show a dot/circle at the start
     * @default true
     */
    showDot?: boolean;

    /**
     * Custom CSS class for the indicator
     */
    customClass?: string;
}

/**
 * DropIndicatorController - Manages visual drop zone indicators
 *
 * PRD Requirement (P0):
 * - "Need visual drop zones shown"
 * - "Need visual drop target (specific area of current drop decision) shown"
 * - Custom styling ability required
 *
 * Shows a visual line indicator between items to show where the dragged item will drop.
 *
 * Usage:
 * ```typescript
 * class MyList extends LitElement {
 *   private dropIndicator = new DropIndicatorController(this, {
 *     orientation: 'vertical',
 *     color: 'blue',
 *     thickness: 3
 *   });
 *
 *   // Show indicator between items
 *   showDropIndicator(targetElement) {
 *     this.dropIndicator.show(targetElement, 'before');
 *   }
 *
 *   // Hide indicator
 *   hideDropIndicator() {
 *     this.dropIndicator.hide();
 *   }
 * }
 * ```
 */
export class DropIndicatorController implements ReactiveController {
    private host: ReactiveElement;
    private options: Required<DropIndicatorOptions>;
    private indicatorElement: HTMLElement | null = null;
    private isVisible = false;

    constructor(host: ReactiveElement, options: DropIndicatorOptions = {}) {
        this.host = host;
        this.options = {
            orientation: options.orientation ?? 'horizontal',
            color: options.color ?? 'var(--spectrum-global-color-blue-500)',
            thickness: options.thickness ?? 3,
            showDot: options.showDot ?? true,
            customClass: options.customClass ?? '',
        };
        this.host.addController(this);
    }

    hostConnected(): void {
        this.createIndicatorElement();
    }

    hostDisconnected(): void {
        this.removeIndicatorElement();
    }

    /**
     * Update indicator options
     */
    public updateOptions(options: Partial<DropIndicatorOptions>): void {
        Object.assign(this.options, options);
        if (this.indicatorElement) {
            this.applyStyles();
        }
    }

    /**
     * Show the drop indicator at a specific position
     * @param targetElement - The element to show the indicator near
     * @param position - Show indicator 'before' or 'after' the target element
     */
    public show(
        targetElement: HTMLElement,
        position: 'before' | 'after' = 'after'
    ): void {
        if (!this.indicatorElement || !targetElement) return;

        const rect = targetElement.getBoundingClientRect();
        const isHorizontal = this.options.orientation === 'horizontal';

        // Position the indicator
        if (isHorizontal) {
            // Vertical line between items (for horizontal lists)
            const x = position === 'before' ? rect.left : rect.right;
            const y = rect.top;
            const height = rect.height;

            this.indicatorElement.style.left = `${x - this.options.thickness / 2}px`;
            this.indicatorElement.style.top = `${y}px`;
            this.indicatorElement.style.height = `${height}px`;
            this.indicatorElement.style.width = `${this.options.thickness}px`;
        } else {
            // Horizontal line between items (for vertical lists)
            const x = rect.left;
            const y = position === 'before' ? rect.top : rect.bottom;
            const width = rect.width;

            this.indicatorElement.style.left = `${x}px`;
            this.indicatorElement.style.top = `${y - this.options.thickness / 2}px`;
            this.indicatorElement.style.width = `${width}px`;
            this.indicatorElement.style.height = `${this.options.thickness}px`;
        }

        this.indicatorElement.style.display = 'block';
        this.isVisible = true;
    }

    /**
     * Hide the drop indicator
     */
    public hide(): void {
        if (this.indicatorElement) {
            this.indicatorElement.style.display = 'none';
            this.isVisible = false;
        }
    }

    /**
     * Check if indicator is currently visible
     */
    public get visible(): boolean {
        return this.isVisible;
    }

    private createIndicatorElement(): void {
        if (this.indicatorElement) return;

        this.indicatorElement = document.createElement('div');
        this.indicatorElement.className = `drop-indicator ${this.options.customClass}`;
        this.applyStyles();
        this.indicatorElement.style.display = 'none';

        // Append to body for proper positioning
        document.body.appendChild(this.indicatorElement);
    }

    private applyStyles(): void {
        if (!this.indicatorElement) return;

        // Base styles
        Object.assign(this.indicatorElement.style, {
            position: 'fixed',
            backgroundColor: this.options.color,
            pointerEvents: 'none',
            zIndex: '10000',
            borderRadius: `${this.options.thickness}px`,
            transition: 'all 0.15s ease-out',
            boxShadow: `0 0 ${this.options.thickness * 2}px ${this.options.color}`,
        });

        // Add dot indicator if enabled
        if (this.options.showDot) {
            const dotSize = this.options.thickness * 3;

            // Create pseudo-element for dot via inline style
            this.indicatorElement.setAttribute('data-show-dot', 'true');

            // Inject styles for pseudo-element
            if (!document.getElementById('drop-indicator-styles')) {
                const style = document.createElement('style');
                style.id = 'drop-indicator-styles';
                style.textContent = `
                    .drop-indicator[data-show-dot="true"]::before,
                    .drop-indicator[data-show-dot="true"]::after {
                        content: '';
                        position: absolute;
                        width: ${dotSize}px;
                        height: ${dotSize}px;
                        border-radius: 50%;
                        background-color: ${this.options.color};
                        box-shadow: 0 0 ${dotSize}px ${this.options.color};
                    }
                    .drop-indicator[data-orientation="horizontal"]::before {
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                    .drop-indicator[data-orientation="vertical"]::before {
                        left: 0;
                        top: 50%;
                        transform: translate(-50%, -50%);
                    }
                `;
                document.head.appendChild(style);
            }

            this.indicatorElement.setAttribute(
                'data-orientation',
                this.options.orientation
            );
        }
    }

    private removeIndicatorElement(): void {
        if (this.indicatorElement && this.indicatorElement.parentNode) {
            this.indicatorElement.parentNode.removeChild(this.indicatorElement);
            this.indicatorElement = null;
        }
    }
}
