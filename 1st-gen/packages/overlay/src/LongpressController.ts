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
    isAndroid,
    isIOS,
} from '@spectrum-web-components/shared/src/platform.js';
import { conditionAttributeWithId } from '@spectrum-web-components/base/src/condition-attribute-with-id.js';
import { randomID } from '@spectrum-web-components/shared/src/random-id.js';

import { noop } from './AbstractOverlay.js';
import {
    InteractionController,
    InteractionTypes,
} from './InteractionController.js';

/**
 * Duration (in milliseconds) to hold pointer before triggering longpress.
 * @constant {number}
 */
const LONGPRESS_DURATION = 300;

/**
 * Instructional text for longpress affordance, displayed via `aria-describedby`.
 * Different messages for touch, keyboard, and mouse interactions.
 *
 * @constant {Object}
 */
export const LONGPRESS_INSTRUCTIONS = {
    touch: 'Double tap and long press for additional options',
    keyboard: 'Press Space or Alt+Down Arrow for additional options',
    mouse: 'Click and hold for additional options',
};

type LongpressEvent = {
    source: 'pointer' | 'keyboard';
};

/**
 * Manages longpress gesture interactions for overlay triggers.
 *
 * The LongpressController handles opening overlays after a 300ms hold gesture,
 * or via keyboard shortcuts (Space or Alt+Down Arrow). It implements special
 * "shadow state" logic to prevent immediate closing after the overlay opens.
 *
 * **Behavior:**
 * - Opens on 300ms pointer hold or Space/Alt+Down keyboard shortcut
 * - Prevents immediate closing from `pointerup` event (shadow state)
 * - Automatically adds `aria-describedby` with platform-appropriate instructions
 * - Works with `hold-affordance` attribute on trigger elements
 *
 * **Longpress States:**
 * - `null` - No longpress in progress
 * - `potential` - Pointer down, timer started (before 300ms)
 * - `opening` - Overlay opening animation in progress
 * - `pressed` - User released pointer while overlay opening
 *
 * **Keyboard Shortcuts:**
 * - **Space** - Opens longpress overlay
 * - **Alt+Down Arrow** - Opens longpress overlay
 *
 * **Event Handling:**
 * - Trigger: `longpress` custom event, `pointerdown`, `keydown`, `keyup`
 * - Document: `pointerup`, `pointercancel` (for cleanup)
 *
 * **Used by:**
 * - `<sp-overlay trigger="id@longpress">`
 * - `<overlay-trigger>` with `longpress-content` slot
 * - Elements with `hold-affordance` attribute (e.g., `<sp-action-button>`)
 *
 * @extends {InteractionController}
 *
 * @example Basic longpress menu
 * ```html
 * <sp-action-button id="actions-btn" hold-affordance>
 *   <sp-icon-more slot="icon"></sp-icon-more>
 * </sp-action-button>
 * <sp-overlay trigger="actions-btn@longpress" type="auto">
 *   <sp-popover>
 *     <sp-menu>
 *       <sp-menu-item>Advanced Option 1</sp-menu-item>
 *       <sp-menu-item>Advanced Option 2</sp-menu-item>
 *     </sp-menu>
 *   </sp-popover>
 * </sp-overlay>
 * ```
 *
 * @example Combined with hover and click
 * ```html
 * <overlay-trigger triggered-by="click hover longpress">
 *   <sp-action-button slot="trigger" hold-affordance>Actions</sp-action-button>
 *   <sp-tooltip slot="hover-content">Quick actions</sp-tooltip>
 *   <sp-popover slot="click-content">
 *     <sp-menu>
 *       <sp-menu-item>Copy</sp-menu-item>
 *       <sp-menu-item>Paste</sp-menu-item>
 *     </sp-menu>
 *   </sp-popover>
 *   <sp-popover slot="longpress-content">
 *     <sp-menu>
 *       <sp-menu-item>Advanced Options...</sp-menu-item>
 *     </sp-menu>
 *   </sp-popover>
 * </overlay-trigger>
 * ```
 *
 * @see {@link ClickController} for click interactions
 * @see {@link HoverController} for hover interactions
 * @see {@link LONGPRESS_INSTRUCTIONS} for accessibility messages
 * @see {@link https://opensource.adobe.com/spectrum-web-components/components/overlay/ARCHITECTURE.md#interaction-controllers | Architecture Documentation}
 */
export class LongpressController extends InteractionController {
    override type = InteractionTypes.longpress;

    /**
     * Indicates whether the overlay is in the process of opening.
     * During this state, attempts to close the overlay are prevented
     * to avoid immediate dismissal from the `pointerup` event.
     *
     * @returns {boolean} True if longpressState is 'opening' or 'pressed'
     */
    override get activelyOpening(): boolean {
        return (
            this.longpressState === 'opening' ||
            this.longpressState === 'pressed'
        );
    }

    /**
     * Tracks the current state of the longpress gesture.
     *
     * **States:**
     * - `null` - No longpress in progress
     * - `potential` - Pointer is down, timer started
     * - `opening` - Overlay is opening (triggered after 300ms)
     * - `pressed` - User released pointer during opening animation
     *
     * @protected
     */
    protected longpressState: null | 'potential' | 'opening' | 'pressed' = null;

    /**
     * Function to release `aria-describedby` relationship.
     * @override
     */
    override releaseDescription = noop;

    /**
     * Timeout handle for 300ms longpress detection.
     * @private
     */
    private timeout!: ReturnType<typeof setTimeout>;

    handleLongpress(): void {
        this.open = true;
        this.longpressState =
            this.longpressState === 'potential' ? 'opening' : 'pressed';
    }

    handlePointerdown(event: PointerEvent): void {
        if (!this.target) return;
        if (event.button !== 0) return;
        this.longpressState = 'potential';
        document.addEventListener('pointerup', this.handlePointerup);
        document.addEventListener('pointercancel', this.handlePointerup);
        // Only dispatch longpress event if the trigger element isn't doing it for us.
        const triggerHandlesLongpress = 'holdAffordance' in this.target;
        if (triggerHandlesLongpress) return;
        this.timeout = setTimeout(() => {
            if (!this.target) return;
            this.target.dispatchEvent(
                new CustomEvent<LongpressEvent>('longpress', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        source: 'pointer',
                    },
                })
            );
        }, LONGPRESS_DURATION);
    }

    private handlePointerup = (): void => {
        clearTimeout(this.timeout);
        if (!this.target) return;
        // When triggered by the pointer, the last of `opened`
        // or `pointerup` should move the `longpressState` to
        // `null` so that the earlier event can void the "light
        // dismiss" and keep the Overlay open.
        this.longpressState =
            this.overlay?.state === 'opening' ? 'pressed' : null;
        document.removeEventListener('pointerup', this.handlePointerup);
        document.removeEventListener('pointercancel', this.handlePointerup);
    };

    private handleKeydown(event: KeyboardEvent): void {
        const { code, altKey } = event;
        if (altKey && code === 'ArrowDown') {
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
    }

    private handleKeyup(event: KeyboardEvent): void {
        const { code, altKey } = event;
        if (code === 'Space' || (altKey && code === 'ArrowDown')) {
            if (!this.target) {
                return;
            }
            event.stopPropagation();
            this.target.dispatchEvent(
                new CustomEvent<LongpressEvent>('longpress', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        source: 'keyboard',
                    },
                })
            );
            setTimeout(() => {
                this.longpressState = null;
            });
        }
    }

    override prepareDescription(trigger: HTMLElement): void {
        if (
            // do not reapply until target is recycled
            this.releaseDescription !== noop ||
            // require "longpress content" to apply relationship
            !this.overlay.elements.length
        ) {
            return;
        }

        const longpressDescription = document.createElement('div');
        longpressDescription.id = `longpress-describedby-descriptor-${randomID()}`;
        const messageType = isIOS() || isAndroid() ? 'touch' : 'keyboard';
        longpressDescription.textContent = LONGPRESS_INSTRUCTIONS[messageType];
        longpressDescription.slot = 'longpress-describedby-descriptor';
        const triggerParent = trigger.getRootNode() as HTMLElement;
        const overlayParent = this.overlay.getRootNode() as HTMLElement;
        // Manage the placement of the helper element in an accessible place with
        // the lowest chance of negatively affecting the layout of the page.
        if (triggerParent === overlayParent) {
            // Trigger and Overlay in same DOM tree...
            // Append helper element to Overlay.
            this.overlay.append(longpressDescription);
        } else {
            // If Trigger in <body>, hide helper
            longpressDescription.hidden = !('host' in triggerParent);
            // Trigger and Overlay in different DOM tree, Trigger in shadow tree...
            // Insert helper element after Trigger.
            trigger.insertAdjacentElement('afterend', longpressDescription);
        }

        const releaseDescription = conditionAttributeWithId(
            trigger,
            'aria-describedby',
            [longpressDescription.id]
        );
        this.releaseDescription = () => {
            releaseDescription();
            longpressDescription.remove();
            this.releaseDescription = noop;
        };
    }

    override shouldCompleteOpen(): void {
        // When triggered by the pointer, the last of `opened`
        // or `pointerup` should move the `longpressState` to
        // `null` so that the earlier event can void the "light
        // dismiss" and keep the Overlay open.
        this.longpressState =
            this.longpressState === 'pressed' ? null : this.longpressState;
    }

    override init(): void {
        // Clean up listeners if they've already been bound
        this.abortController?.abort();
        this.abortController = new AbortController();
        const { signal } = this.abortController;
        this.target.addEventListener(
            'longpress',
            () => this.handleLongpress(),
            { signal }
        );
        this.target.addEventListener(
            'pointerdown',
            (event: PointerEvent) => this.handlePointerdown(event),
            { signal }
        );

        this.prepareDescription(this.target);
        if (
            (this.target as HTMLElement & { holdAffordance: boolean })
                .holdAffordance
        ) {
            // Only bind keyboard events when the trigger element isn't doing it for us.
            return;
        }
        this.target.addEventListener(
            'keydown',
            (event: KeyboardEvent) => this.handleKeydown(event),
            { signal }
        );
        this.target.addEventListener(
            'keyup',
            (event: KeyboardEvent) => this.handleKeyup(event),
            { signal }
        );
    }
}
