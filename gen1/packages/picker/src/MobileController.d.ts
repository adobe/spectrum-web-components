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
 * Controller for managing picker interactions on mobile/touch devices.
 * Handles touch events with simplified toggle logic compared to desktop.
 * Includes workarounds for Safari focus ring visibility issues.
 */
export declare class MobileController extends InteractionController {
    /** Identifies this as a mobile interaction controller. */
    type: InteractionTypes;
    /**
     * Handles click events on the trigger button.
     * Toggles the picker unless disabled or toggle is prevented.
     * Resets the preventNextToggle state after processing.
     */
    handleClick(): void;
    /**
     * Handles pointerdown events on mobile devices.
     * Sets toggle prevention based on current open state to prevent
     * double-toggling. Applies Safari focus ring workaround class.
     */
    handlePointerdown(): void;
    /**
     * Handles focusout events on the trigger button.
     * Removes the Safari focus ring workaround class when the picker is closed.
     */
    private handleFocusOut;
    /**
     * Initializes mobile-specific event listeners on the trigger button.
     * Binds click, pointerdown, and focusout handlers.
     * Cleans up any existing listeners before binding new ones.
     */
    init(): void;
}
