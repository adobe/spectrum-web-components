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

export class DesktopController extends InteractionController {
    override type = InteractionTypes.desktop;

    public override handlePointerdown(event: PointerEvent): void {
        if (event.button !== 0 || event.pointerType === 'touch') {
            return;
        }
        this.pointerdownState = this.open;
        this.preventNextToggle = 'maybe';
        let cleanupAction = 0;
        const cleanup = (): void => {
            cancelAnimationFrame(cleanupAction);
            cleanupAction = requestAnimationFrame(async () => {
                document.removeEventListener('pointerup', cleanup);
                document.removeEventListener('pointercancel', cleanup);
                this.target.removeEventListener('click', cleanup);
                requestAnimationFrame(() => {
                    // Complete cleanup on the second animation frame so that `click` can go first.
                    this.preventNextToggle = 'no';
                });
            });
        };
        // Ensure that however the pointer goes up we do `cleanup()`.
        document.addEventListener('pointerup', cleanup);
        document.addEventListener('pointercancel', cleanup);
        this.target.addEventListener('click', cleanup);
        this.handleActivate();
    }

    public override handleActivate(event?: Event): void {
        if (this.enterKeydownOn && this.enterKeydownOn !== this.target) {
            return;
        }
        if (this.preventNextToggle === 'yes') {
            return;
        }
        if (event?.type === 'click' && this.open !== this.pointerdownState) {
            // When activation comes from a `click` event ensure that the `pointerup`
            // event didn't already toggle the Picker state before doing so.
            return;
        }
        this.host.toggle();
    }

    override init(): void {
        // Clean up listeners if they've already been bound
        this.abortController?.abort();
        this.abortController = new AbortController();
        const { signal } = this.abortController;
        this.target.addEventListener(
            'click',
            (event: Event) => this.handleActivate(event),
            {
                signal,
            }
        );
        this.target.addEventListener(
            'pointerdown',
            (event: PointerEvent) => this.handlePointerdown(event),
            { signal }
        );
        this.target.addEventListener(
            'focus',
            (event: FocusEvent) => this.handleButtonFocus(event),
            {
                signal,
            }
        );
    }
}
