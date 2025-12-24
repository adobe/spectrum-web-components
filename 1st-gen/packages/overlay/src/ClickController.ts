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

import {
    InteractionController,
    InteractionTypes,
} from './InteractionController.js';

/**
 * Manages click/tap interactions for overlay triggers.
 *
 * The ClickController handles opening and closing overlays in response to click events.
 * It implements special logic to prevent accidental toggling when the overlay is already open.
 *
 * **Behavior:**
 * - Opens overlay on click when closed
 * - Closes overlay on outside click (based on overlay `type`)
 * - Prevents toggle when clicking trigger while overlay is open
 *
 * **Event Handling:**
 * 1. `pointerdown` on trigger - Sets `preventNextToggle` flag if overlay is open
 * 2. `click` on trigger - Toggles overlay state (unless prevented)
 *
 * **Used by:**
 * - `<sp-overlay trigger="id@click">`
 * - `<overlay-trigger>` with `click-content` slot
 *
 * @extends {InteractionController}
 *
 * @example Typical usage pattern
 * ```html
 * <sp-button id="menu-btn">Menu</sp-button>
 * <sp-overlay trigger="menu-btn@click" type="auto">
 *   <sp-popover>
 *     <sp-menu>
 *       <sp-menu-item>Option 1</sp-menu-item>
 *       <sp-menu-item>Option 2</sp-menu-item>
 *     </sp-menu>
 *   </sp-popover>
 * </sp-overlay>
 * ```
 *
 * @see {@link HoverController} for hover interactions
 * @see {@link LongpressController} for longpress interactions
 * @see {@link https://opensource.adobe.com/spectrum-web-components/components/overlay/ARCHITECTURE.md#interaction-controllers | Architecture Documentation}
 */
export class ClickController extends InteractionController {
    override type = InteractionTypes.click;

    /**
     * Flag to prevent toggling the overlay when clicking the trigger while already open.
     *
     * An overlay with a `click` interaction should not close on click of the `triggerElement`.
     * When a click is initiated (`pointerdown`), apply `preventNextToggle` when the
     * overlay is `open` to prevent toggling the overlay when the click event
     * propagates later in the interaction.
     *
     * @private
     */
    private preventNextToggle = false;

    handleClick(): void {
        if (!this.preventNextToggle) {
            this.open = !this.open;
        }
        this.preventNextToggle = false;
    }

    handlePointerdown(): void {
        this.preventNextToggle = this.open;
    }

    override init(): void {
        // Clean up listeners if they've already been bound
        this.abortController?.abort();
        this.abortController = new AbortController();
        const { signal } = this.abortController;
        this.target.addEventListener('click', () => this.handleClick(), {
            signal,
        });
        this.target.addEventListener(
            'pointerdown',
            () => this.handlePointerdown(),
            { signal }
        );
    }
}
