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
import type { ReactiveController, ReactiveElement } from '@spectrum-web-components/base';
import { Placement } from '@floating-ui/dom';
import type { VirtualTrigger } from './VirtualTrigger.js';
import type { OpenableElement } from './overlay-types.js';
type OverlayOptionsV1 = {
    abortPromise?: Promise<boolean>;
    delayed?: boolean;
    offset?: number | [number, number];
    placement: Placement;
    notImmediatelyClosable?: boolean;
    receivesFocus?: 'auto';
    root?: HTMLElement;
    tipPadding?: number;
    trigger: HTMLElement | VirtualTrigger;
    type?: 'modal' | 'page' | 'hint' | 'auto' | 'manual';
};
/**
 * Symbol used to indicate that the placement has been updated.
 */
export declare const placementUpdatedSymbol: unique symbol;
/**
 * Controller for managing the placement of an overlay.
 *
 * This class implements the ReactiveController interface and provides methods
 * for managing the positioning and constraints of an overlay element.
 */
export declare class PlacementController implements ReactiveController {
    /**
     * Function to clean up resources when the controller is no longer needed.
     *
     * @private
     */
    private cleanup?;
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
    private host;
    /**
     * Options for configuring the overlay placement.
     *
     * @private
     * @type {OverlayOptionsV1}
     */
    private options;
    /**
     * A WeakMap to store the original placements of overlay elements.
     *
     * @private
     * @type {WeakMap<HTMLElement, Placement>}
     */
    private originalPlacements;
    /**
     * The target element for the overlay.
     *
     * @private
     * @type {HTMLElement}
     */
    private target;
    /**
     * Creates an instance of the PlacementController.
     *
     * @param {ReactiveElement & { elements: OpenableElement[] }} host - The host element that uses this controller.
     */
    constructor(host: ReactiveElement & {
        elements: OpenableElement[];
    });
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
    placeOverlay(target?: HTMLElement, options?: OverlayOptionsV1): Promise<void>;
    /**
     * Flag to allow or disallow placement updates.
     *
     * @type {boolean}
     */
    allowPlacementUpdate: boolean;
    /**
     * Closes the overlay if an ancestor element is updated.
     *
     * This method checks if placement updates are allowed and if the overlay type is not 'modal'.
     * If these conditions are met and a cleanup function is defined, it dispatches a 'close' event
     * on the target element to close the overlay.
     */
    closeForAncestorUpdate: () => void;
    /**
     * Updates the placement of the overlay.
     *
     * This method calls the computePlacement method to recalculate the overlay's position.
     *
     * @private
     */
    private updatePlacement;
    /**
     * Computes the placement of the overlay relative to the target element.
     *
     * This method calculates the necessary positioning and constraints for the overlay element
     * using various middleware functions. It updates the overlay's style and attributes based
     * on the computed position.
     *
     * @returns {Promise<void>} A promise that resolves when the placement has been computed.
     */
    computePlacement(): Promise<void>;
    /**
     * Clears the overlay's position styles.
     *
     * This method removes the max-height and max-width styles from the target element,
     * and resets the initial height and constrained state of the overlay.
     */
    clearOverlayPosition(): void;
    /**
     * Resets the overlay's position.
     *
     * This method clears the overlay's position, forces a reflow, and recomputes the placement.
     */
    resetOverlayPosition: () => void;
    /**
     * Lifecycle method called when the host element is connected to the DOM.
     *
     * This method sets up an event listener to reset the overlay's position when the 'sp-update-overlays' event is dispatched.
     */
    hostConnected(): void;
    /**
     * Lifecycle method called when the host element is updated.
     *
     * This method cleans up resources if the overlay is not open.
     */
    hostUpdated(): void;
    /**
     * Lifecycle method called when the host element is disconnected from the DOM.
     *
     * This method removes the event listener and cleans up resources.
     */
    hostDisconnected(): void;
}
export {};
