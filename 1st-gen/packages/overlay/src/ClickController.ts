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

export class ClickController extends InteractionController {
    override type = InteractionTypes.click;

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
