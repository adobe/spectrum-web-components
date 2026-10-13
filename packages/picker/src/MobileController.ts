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
    SAFARI_FOCUS_RING_CLASS,
} from './InteractionController.js';
import { isWebKit } from '@spectrum-web-components/shared';

export class MobileController extends InteractionController {
    override type = InteractionTypes.mobile;

    // Declared without an initializer: init() runs in the base constructor.
    private lastInputWasKeyboard!: boolean;

    handleClick(): void {
        if (this.host.disabled) {
            return;
        }
        if (this.preventNextToggle == 'no') {
            this.host.toggle();
        }
        this.preventNextToggle = 'no';
    }

    public override handlePointerdown(): void {
        this.preventNextToggle = this.open ? 'yes' : 'no';
        if (isWebKit()) {
            this.target.classList.add(SAFARI_FOCUS_RING_CLASS);
        }
    }

    private handleFocusOut(): void {
        if (this.host.open) {
            return;
        }
        if (
            isWebKit() &&
            this.target.classList.contains(SAFARI_FOCUS_RING_CLASS)
        ) {
            this.target.classList.remove(SAFARI_FOCUS_RING_CLASS);
        }
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
        this.target.addEventListener('focusout', () => this.handleFocusOut(), {
            signal,
        });
        // Track the last input modality so focus returned to the button after
        // a pointer/touch selection doesn't render as keyboard focus.
        this.lastInputWasKeyboard = false;
        const root = this.target.ownerDocument;
        root.addEventListener(
            'keydown',
            (event) => this.handleModalityKeydown(event as KeyboardEvent),
            { capture: true, signal }
        );
        root.addEventListener(
            'pointerdown',
            () => (this.lastInputWasKeyboard = false),
            { capture: true, signal }
        );
        this.host.addEventListener('sp-closed', () => this.handleClosed(), {
            signal,
        });
    }

    private handleModalityKeydown(event: KeyboardEvent): void {
        if (['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) {
            return;
        }
        this.lastInputWasKeyboard = true;
        this.target.classList.remove(SAFARI_FOCUS_RING_CLASS);
    }

    // Runs before the overlay returns focus to the button.
    private handleClosed(): void {
        if (!this.lastInputWasKeyboard) {
            this.target.classList.add(SAFARI_FOCUS_RING_CLASS);
        }
    }
}
