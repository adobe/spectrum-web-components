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

import { conditionAttributeWithId } from '@spectrum-web-components/base/src/condition-attribute-with-id.js';
import { randomID } from '@spectrum-web-components/shared/src/random-id.js';
import { noop } from './AbstractOverlay.js';
import {
    InteractionController,
    InteractionTypes,
} from './InteractionController.js';

export class ClickController extends InteractionController {
    override type = InteractionTypes.click;

    private elementIds: string[] = [];

    override releaseDescription = noop;

    /**
     * An overlay with a `click` interaction should not close on click `triggerElement`.
     * When a click is initiated (`pointerdown`), apply `preventNextToggle` when the
     * overlay is `open` to prevent from toggling the overlay when the click event
     * propagates later in the interaction.
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

    /**
     * Prepares ARIA description for the trigger element.
     *
     * Establishes an accessible relationship between the trigger and overlay content
     * by setting `aria-describedby` on the trigger element. This enables screen readers
     * to announce the overlay content when the trigger receives focus.
     *
     * The method determines the appropriate ARIA strategy based on the DOM tree
     * relationship between the trigger, overlay, and content elements:
     * - If trigger and overlay share the same root: references the overlay element ID
     * - If trigger and content share the same root: references the content element IDs
     *
     * @param {HTMLElement} trigger - The trigger element that will receive the aria-describedby attribute
     * @override
     */
    override prepareDescription(trigger: HTMLElement): void {
        // Do not reapply until target is recycled
        if (this.releaseDescription !== noop) return;

        // Require "content" to apply relationship
        if (!this.overlay.elements.length) {
            return;
        }

        const triggerRoot = trigger.getRootNode();
        const contentRoot = this.overlay.elements[0].getRootNode();
        const overlayRoot = this.overlay.getRootNode();

        if (triggerRoot === overlayRoot) {
            this.prepareOverlayRelativeDescription(trigger);
        } else if (triggerRoot === contentRoot) {
            this.prepareContentRelativeDescription(trigger);
        }
    }

    private prepareOverlayRelativeDescription(trigger: HTMLElement): void {
        const releaseDescription = conditionAttributeWithId(
            trigger,
            'aria-describedby',
            [this.overlay.id]
        );

        this.releaseDescription = () => {
            releaseDescription();
            this.releaseDescription = noop;
        };
    }

    private prepareContentRelativeDescription(trigger: HTMLElement): void {
        const elementIds: string[] = [];
        const appliedIds = this.overlay.elements.map((el) => {
            elementIds.push(el.id);
            if (!el.id) {
                el.id = `${this.overlay.tagName.toLowerCase()}-helper-${randomID()}`;
            }
            return el.id;
        });
        this.elementIds = elementIds;

        const releaseDescription = conditionAttributeWithId(
            trigger,
            'aria-describedby',
            appliedIds
        );

        this.releaseDescription = () => {
            releaseDescription();
            this.overlay.elements.map((el, index) => {
                el.id = this.elementIds[index];
            });
            this.releaseDescription = noop;
        };
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
