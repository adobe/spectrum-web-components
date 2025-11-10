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

import type {
    ReactiveController,
    ReactiveElement,
} from '@spectrum-web-components/base';
import {
    arrow,
    autoUpdate,
    computePosition,
    flip,
    offset,
    Placement,
    shift,
    size,
} from '@floating-ui/dom';
import type { VirtualTrigger } from './VirtualTrigger.js';
import type { OpenableElement } from './overlay-types.js';
import type { Overlay } from './Overlay.js';

type OverlayOptionsV1 = {
    abortPromise?: Promise<boolean>;
    delayed?: boolean;
    offset?: number | [number, number]; // supporting multi-axis
    placement: Placement;
    notImmediatelyClosable?: boolean; // rename or place behind other API options
    receivesFocus?: 'auto';
    root?: HTMLElement;
    tipPadding?: number;
    trigger: HTMLElement | VirtualTrigger;
    type?: 'modal' | 'page' | 'hint' | 'auto' | 'manual';
};

/**
 * Rounds a number by the device pixel ratio (DPR).
 *
 * @param {number} [num] - The number to round.
 * @returns {number} The rounded number.
 */
function roundByDPR(num?: number): number {
    if (typeof num === 'undefined') return 0;
    const dpr = window.devicePixelRatio || 1;
    return Math.round(num * dpr) / dpr;
}

// Minimum distance required between the overlay and the edge of the container.
// See: https://spectrum.adobe.com/page/popover/#Container-padding
const REQUIRED_DISTANCE_TO_EDGE = 8;
// Minimum height for the overlay.
// See: https://github.com/adobe/spectrum-web-components/issues/910
const MIN_OVERLAY_HEIGHT = 100;

/**
 * Gets fallback placements for the overlay based on the initial placement.
 *
 * @param {Placement} placement - The initial placement of the overlay.
 * @returns {Placement[]} An array of fallback placements.
 */
const getFallbackPlacements = (placement: Placement): Placement[] => {
    const fallbacks: Record<Placement, Placement[]> = {
        left: ['right', 'bottom', 'top'],
        'left-start': ['right-start', 'bottom', 'top'],
        'left-end': ['right-end', 'bottom', 'top'],
        right: ['left', 'bottom', 'top'],
        'right-start': ['left-start', 'bottom', 'top'],
        'right-end': ['left-end', 'bottom', 'top'],
        top: ['bottom', 'left', 'right'],
        'top-start': ['bottom-start', 'left', 'right'],
        'top-end': ['bottom-end', 'left', 'right'],
        bottom: ['top', 'left', 'right'],
        'bottom-start': ['top-start', 'left', 'right'],
        'bottom-end': ['top-end', 'left', 'right'],
    };
    return fallbacks[placement] ?? [placement];
};

/**
 * Symbol used to indicate that the placement has been updated.
 */
export const placementUpdatedSymbol = Symbol('placement updated');

/**
 * Controller for managing the placement of an overlay.
 *
 * This class implements the ReactiveController interface and provides methods
 * for managing the positioning and constraints of an overlay element.
 */
export class PlacementController implements ReactiveController {
    /**
     * Function to clean up resources when the controller is no longer needed.
     *
     * @private
     */
    private cleanup?: () => void;

    /**
     * Initial height of the overlay.
     *
     * @type {number}
     */
    initialHeight?: number;

    /**
     * Indicates whether the overlay is constrained by available space.
     *
     * @type {boolean}
     */
    isConstrained?: boolean;

    /**
     * The host element that uses this controller.
     *
     * @private
     * @type {ReactiveElement & { elements: OpenableElement[] }}
     */
    private host!: ReactiveElement & { elements: OpenableElement[] };

    /**
     * Options for configuring the overlay placement.
     *
     * @private
     * @type {OverlayOptionsV1}
     */
    private options!: OverlayOptionsV1;

    /**
     * A WeakMap to store the original placements of overlay elements.
     *
     * @private
     * @type {WeakMap<HTMLElement, Placement>}
     */
    private originalPlacements = new WeakMap<HTMLElement, Placement>();

    /**
     * The target element for the overlay.
     *
     * @private
     * @type {HTMLElement}
     */
    private target!: HTMLElement;

    /**
     * Creates an instance of the PlacementController.
     *
     * @param {ReactiveElement & { elements: OpenableElement[] }} host - The host element that uses this controller.
     */
    constructor(host: ReactiveElement & { elements: OpenableElement[] }) {
        this.host = host;
        // Add the controller after the MutationObserver has been created in preparation
        // for the `hostConnected`/`hostDisconnected` callbacks to be run.
        this.host.addController(this);
    }

    /**
     * Places the overlay relative to the target element.
     *
     * This method sets up the necessary configurations and event listeners to manage the
     * positioning and constraints of the overlay element.
     *
     * @param {HTMLElement} [target=this.target] - The target element for the overlay.
     * @param {OverlayOptionsV1} [options=this.options] - The options for configuring the overlay placement.
     * @returns {Promise<void>} A promise that resolves when the overlay has been placed.
     */
    public async placeOverlay(
        target: HTMLElement = this.target,
        options: OverlayOptionsV1 = this.options
    ): Promise<void> {
        // Set the target and options for the overlay.
        this.target = target;
        this.options = options;
        if (!target || !options) return;

        // Set up auto-update for ancestor resize events.
        const cleanupAncestorResize = autoUpdate(
            options.trigger,
            target,
            this.closeForAncestorUpdate,
            {
                ancestorResize: false,
                elementResize: false,
                layoutShift: false,
            }
        );

        // Set up auto-update for element resize events.
        const cleanupElementResize = autoUpdate(
            options.trigger,
            target,
            this.updatePlacement,
            {
                ancestorScroll: false,
            }
        );

        // Define the cleanup function to remove event listeners and reset placements.
        this.cleanup = () => {
            this.host.elements?.forEach((element) => {
                element.addEventListener(
                    'sp-closed',
                    () => {
                        const placement = this.originalPlacements.get(element);

                        if (placement) {
                            element.setAttribute('placement', placement);
                        }

                        this.originalPlacements.delete(element);
                    },
                    { once: true }
                );
            });
            cleanupAncestorResize();
            cleanupElementResize();
        };
    }

    /**
     * Flag to allow or disallow placement updates.
     *
     * @type {boolean}
     */
    public allowPlacementUpdate = false;

    /**
     * Closes the overlay if an ancestor element is updated.
     *
     * This method checks if placement updates are allowed and if the overlay type is not 'modal'.
     * If these conditions are met and a cleanup function is defined, it dispatches a 'close' event
     * on the target element to close the overlay.
     */
    closeForAncestorUpdate = (): void => {
        if (
            !this.allowPlacementUpdate &&
            this.options.type !== 'modal' &&
            this.cleanup
        ) {
            // Dispatch a 'close' event to close the overlay.
            this.target.dispatchEvent(new Event('close', { bubbles: true }));
        }

        // Reset the flag to disallow placement updates.
        this.allowPlacementUpdate = false;
    };

    /**
     * Updates the placement of the overlay.
     *
     * This method calls the computePlacement method to recalculate the overlay's position.
     *
     * @private
     */
    private updatePlacement = (): void => {
        this.computePlacement();
    };

    /**
     * Computes the placement of the overlay relative to the target element.
     *
     * This method calculates the necessary positioning and constraints for the overlay element
     * using various middleware functions. It updates the overlay's style and attributes based
     * on the computed position.
     *
     * @returns {Promise<void>} A promise that resolves when the placement has been computed.
     */
    async computePlacement(): Promise<void> {
        const { options, target } = this;

        // Wait for document fonts to be ready before computing placement.
        await (document.fonts ? document.fonts.ready : Promise.resolve());

        //Safari/iOS-specific fix: Add small delay for picker menus to allow scrollIntoView to complete
        const isSafari =
            /WebKit/.test(navigator.userAgent) &&
            !/Chrome/.test(navigator.userAgent);

        // Check if this is a submenu overlay (slot="submenu")
        // Submenus need immediate positioning for hover responsiveness
        const isSubmenu = Array.from(this.host.elements).some(
            (el) => el.getAttribute?.('slot') === 'submenu'
        );

        if (isSafari && !isSubmenu) {
            const hasMenu = Array.from(this.host.elements).some(
                (el) =>
                    el.tagName === 'SP-MENU' || el.querySelector?.('sp-menu')
            );

            if (hasMenu) {
                // Wait 1 frame for Safari layout to settle after scrollIntoView
                await new Promise((resolve) => requestAnimationFrame(resolve));
            }
        }

        // Determine the flip middleware based on the type of trigger element.
        const flipMiddleware = !(options.trigger instanceof HTMLElement)
            ? flip({
                  padding: REQUIRED_DISTANCE_TO_EDGE,
                  fallbackPlacements: getFallbackPlacements(options.placement),
              })
            : flip();

        // Extract main axis and cross axis offsets from options.
        const [mainAxis = 0, crossAxis = 0] = Array.isArray(options?.offset)
            ? options.offset
            : [options.offset, 0];

        // Find the tip element within the host elements.
        const tipElement = this.host.elements.find(
            (el) => el.tipElement
        )?.tipElement;

        // Define middleware functions for positioning and constraints.
        const middleware = [
            offset({
                mainAxis,
                crossAxis,
            }),
            shift({ padding: REQUIRED_DISTANCE_TO_EDGE }),
            flipMiddleware,
            size({
                padding: REQUIRED_DISTANCE_TO_EDGE,
                apply: ({
                    availableWidth,
                    availableHeight,
                    rects: { floating },
                }) => {
                    const maxHeight = Math.max(
                        MIN_OVERLAY_HEIGHT,
                        Math.floor(availableHeight)
                    );
                    const actualHeight = floating.height;
                    this.initialHeight = !this.isConstrained // && !this.virtualTrigger
                        ? actualHeight
                        : this.initialHeight || actualHeight;
                    this.isConstrained =
                        actualHeight < this.initialHeight ||
                        maxHeight <= actualHeight;
                    const appliedHeight = this.isConstrained
                        ? `${maxHeight}px`
                        : '';
                    Object.assign(target.style, {
                        maxWidth: `${Math.floor(availableWidth)}px`,
                        maxHeight: appliedHeight,
                    });
                },
            }),
            ...(tipElement
                ? [
                      arrow({
                          element: tipElement,
                          padding:
                              options.tipPadding || REQUIRED_DISTANCE_TO_EDGE,
                      }),
                  ]
                : []),
        ];

        // Compute the position of the overlay using the defined middleware.
        const { x, y, placement, middlewareData } = await computePosition(
            options.trigger,
            target,
            {
                placement: options.placement,
                middleware,
                strategy: 'fixed',
            }
        );

        // Update the overlay's style with the computed position.
        Object.assign(target.style, {
            top: '0px',
            left: '0px',
            translate: `${roundByDPR(x)}px ${roundByDPR(y)}px`,
        });

        // Set the 'actual-placement' attribute on the target element.
        target.setAttribute('actual-placement', placement);

        // Update the placement attribute for each host element.
        this.host.elements?.forEach((element) => {
            if (!this.originalPlacements.has(element)) {
                this.originalPlacements.set(
                    element,
                    element.getAttribute('placement') as Placement
                );
            }
            element.setAttribute('placement', placement);
        });

        // Update the tip element's style with the computed arrow position.
        if (tipElement && middlewareData.arrow) {
            const { x: arrowX, y: arrowY } = middlewareData.arrow;

            Object.assign(tipElement.style, {
                top:
                    placement.startsWith('right') ||
                    placement.startsWith('left')
                        ? '0px'
                        : '',
                left:
                    placement.startsWith('bottom') ||
                    placement.startsWith('top')
                        ? '0px'
                        : '',
                translate: `${roundByDPR(arrowX)}px ${roundByDPR(arrowY)}px`,
            });
        }
    }

    /**
     * Clears the overlay's position styles.
     *
     * This method removes the max-height and max-width styles from the target element,
     * and resets the initial height and constrained state of the overlay.
     */
    public clearOverlayPosition(): void {
        if (!this.target) {
            return;
        }
        // Remove max-height and max-width styles from the target element.
        this.target.style.removeProperty('max-height');
        this.target.style.removeProperty('max-width');
        // Reset the initial height and constrained state.
        this.initialHeight = undefined;
        this.isConstrained = false;
    }

    /**
     * Resets the overlay's position.
     *
     * This method clears the overlay's position, forces a reflow, and recomputes the placement.
     */
    public resetOverlayPosition = (): void => {
        if (!this.target || !this.options) return;
        // Clear the overlay's position.
        this.clearOverlayPosition();

        // Force a reflow.
        this.host.offsetHeight;
        // Recompute the placement.
        this.computePlacement();
    };

    /**
     * Lifecycle method called when the host element is connected to the DOM.
     *
     * This method sets up an event listener to reset the overlay's position when the 'sp-update-overlays' event is dispatched.
     */
    hostConnected(): void {
        document.addEventListener(
            'sp-update-overlays',
            this.resetOverlayPosition
        );
    }

    /**
     * Lifecycle method called when the host element is updated.
     *
     * This method cleans up resources if the overlay is not open.
     */
    hostUpdated(): void {
        if (!(this.host as Overlay).open) {
            // Clean up resources if the overlay is not open.
            this.cleanup?.();
            this.cleanup = undefined;
        }
    }

    /**
     * Lifecycle method called when the host element is disconnected from the DOM.
     *
     * This method removes the event listener and cleans up resources.
     */
    hostDisconnected(): void {
        // Clean up resources.
        this.cleanup?.();
        this.cleanup = undefined;
        // Remove the event listener.
        document.removeEventListener(
            'sp-update-overlays',
            this.resetOverlayPosition
        );
    }
}
