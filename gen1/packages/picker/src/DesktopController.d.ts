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
import { InteractionController, InteractionTypes } from './InteractionController.js';
/**
 * Controller for managing picker interactions on desktop devices.
 * Handles mouse pointer events with sophisticated toggle state management
 * to properly coordinate pointerdown, pointerup, and click events.
 */
export declare class DesktopController extends InteractionController {
    /** Identifies this as a desktop interaction controller. */
    type: InteractionTypes;
    /**
     * Handles pointerdown events on the trigger button.
     * Captures the current open state and sets up cleanup handlers
     * for pointerup, pointercancel, and click events.
     * Ignores non-primary buttons and touch events (handled by MobileController).
     *
     * @param event - The pointer event
     */
    handlePointerdown(event: PointerEvent): void;
    /**
     * Handles activation of the picker (via click or keyboard).
     * Prevents double-toggling when pointerup already changed the state.
     *
     * @param event - Optional activation event (click event or undefined for pointerdown)
     */
    handleActivate(event?: Event): void;
    /**
     * Initializes desktop-specific event listeners on the trigger button.
     * Binds click, pointerdown, and focus handlers.
     * Cleans up any existing listeners before binding new ones.
     */
    init(): void;
}
