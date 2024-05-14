/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    InteractionController,
    InteractionTypes,
} from './InteractionController.js';

export class DesktopController extends InteractionController {
    override type = InteractionTypes.click;

    /**
     * An overlay with a `click` interaction should not close on click `triggerElement`.
     * When a click is initiated (`pointerdown`), apply `preventNextToggle` when the
     * overlay is `open` to prevent from toggling the overlay when the click event
     * propagates later in the interaction.
     */
    // private preventNextToggle: 'no' | 'maybe' | 'yes' = 'no';
    // private pointerdownState = false;

    protected handlePointerdown(event: PointerEvent): void {
        if (event.button !== 0) {
            return;
        }
        this.host.pointerdownState = this.open;
        // this.pointerdownState = this.open;
        // this.preventNextToggle = 'maybe';
        this.host.preventNextToggle = 'maybe';
        let cleanupAction = 0;
        const cleanup = (): void => {
            cancelAnimationFrame(cleanupAction);
            cleanupAction = requestAnimationFrame(async () => {
                document.removeEventListener('pointerup', cleanup);
                document.removeEventListener('pointercancel', cleanup);
                this.target.removeEventListener('click', cleanup);
                requestAnimationFrame(() => {
                    // Complete cleanup on the second animation frame so that `click` can go first.
                    // this.preventNextToggle = 'no';
                    this.host.preventNextToggle = 'no';
                });
            });
        };
        // Ensure that however the pointer goes up we do `cleanup()`.
        document.addEventListener('pointerup', cleanup);
        document.addEventListener('pointercancel', cleanup);
        this.target.addEventListener('click', cleanup);
        this.handleActivate();
    }

    protected handleButtonFocus(event: FocusEvent): void {
        // When focus comes from a pointer event, and the related target is the Menu,
        // we don't want to reopen the Menu.
        if (
            this.host.preventNextToggle === 'maybe' &&
            event.relatedTarget === this.host.optionsMenu
        ) {
            // this.preventNextToggle = 'yes';
            this.host.preventNextToggle = 'yes';
        }
    }

    protected handleActivate(event?: Event): void {
        if (this.enterKeydownOn && this.enterKeydownOn !== this.button) {
            return;
        }
        if (this.host.preventNextToggle === 'yes') {
            return;
        }
        if (
            event?.type === 'click' &&
            this.open !== this.host.pointerdownState
        ) {
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
            (event: PointerEvent) => this.handleActivate(event),
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
