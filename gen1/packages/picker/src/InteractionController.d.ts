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
import { ReactiveController, TemplateResult } from '@spectrum-web-components/base';
import { AbstractOverlay } from '@spectrum-web-components/overlay/src/AbstractOverlay.js';
import { ExpandableElement } from './Picker.js';
/**
 * Enum representing the interaction strategy types.
 */
export declare enum InteractionTypes {
    'desktop' = 0,
    'mobile' = 1
}
/** CSS class applied to Safari to manage focus ring visibility. */
export declare const SAFARI_FOCUS_RING_CLASS = "remove-focus-ring-safari-hack";
/**
 * Base controller class for managing host element interactions.
 * Handles overlay state, toggle prevention, and focus management.
 * Extended by DesktopController and MobileController for device-specific behavior.
 */
export declare class InteractionController implements ReactiveController {
    target: HTMLElement;
    host: ExpandableElement;
    /** AbortController for cleaning up event listeners. */
    abortController: AbortController;
    /**
     * Controls whether the next toggle action should be prevented.
     * - `'no'`: Allow toggle
     * - `'maybe'`: May prevent based on additional conditions
     * - `'yes'`: Prevent the next toggle
     */
    preventNextToggle: 'no' | 'maybe' | 'yes';
    /** Tracks the open state at the time of pointerdown for toggle logic. */
    pointerdownState: boolean;
    /** Tracks the target of an active Enter keydown to prevent double-activation. */
    enterKeydownOn: EventTarget | null;
    /** The rendered overlay container template. */
    container: TemplateResult;
    /**
     * Indicates whether the host element is actively in the process of opening.
     * Always returns false in the base class; may be overridden in subclasses.
     */
    get activelyOpening(): boolean;
    private _open;
    /**
     * Whether the host element overlay is currently open.
     */
    get open(): boolean;
    /**
     * Sets the open state and synchronizes with the host element.
     * Also initializes the overlay reference if not already set.
     */
    set open(open: boolean);
    private _overlay;
    /**
     * Reference to the overlay element managing the host element's dropdown.
     */
    get overlay(): AbstractOverlay;
    /**
     * Sets the overlay reference and initializes overlay configuration.
     */
    set overlay(overlay: AbstractOverlay | undefined);
    /** The interaction type (desktop or mobile) for this controller. */
    type: InteractionTypes;
    /**
     * Creates an interaction controller for the given host element.
     *
     * @param target - The trigger button element
     * @param host - The host element this controller manages
     */
    constructor(target: HTMLElement, host: ExpandableElement);
    /**
     * Releases any description resources.
     * Override in subclasses if cleanup is needed.
     */
    releaseDescription(): void;
    /**
     * Initializes the overlay with appropriate configuration.
     * Sets up event listeners, type, placement, and focus behavior.
     */
    initOverlay(): void;
    /**
     * Handles pointerdown events on the trigger button.
     * Override in subclasses for device-specific behavior.
     *
     * @param _event - The pointer event
     */
    handlePointerdown(_event: PointerEvent): void;
    /**
     * Handles focus events on the trigger button.
     * Prevents reopening the menu when focus returns from the menu itself.
     *
     * @param event - The focus event
     */
    handleButtonFocus(event: FocusEvent): void;
    /**
     * Handles activation events (click, Enter, Space) on the trigger.
     * Override in subclasses for device-specific behavior.
     *
     * @param _event - The activation event
     */
    handleActivate(_event: Event): void;
    /**
     * Initializes event listeners for the controller.
     * Override in subclasses to bind device-specific events.
     */
    init(): void;
    /**
     * Cleans up the controller by releasing resources and aborting event listeners.
     */
    abort(): void;
    /**
     * Lifecycle callback when the host element is connected to the DOM.
     * Initializes event listeners.
     */
    hostConnected(): void;
    /**
     * Lifecycle callback when the host element is disconnected from the DOM.
     * Cleans up event listeners.
     */
    hostDisconnected(): void;
    /**
     * Lifecycle callback after the host element updates.
     * Ensures overlay reference is set and updates willPreventClose state.
     */
    hostUpdated(): void;
}
