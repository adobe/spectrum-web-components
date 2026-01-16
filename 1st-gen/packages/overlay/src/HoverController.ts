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
    lastInteractionType,
} from './InteractionController.js';

export class HoverController extends InteractionController {
    override type = InteractionTypes.hover;

    private elementIds: string[] = [];

    private targetFocused = false;

    private hoverTimeout?: ReturnType<typeof setTimeout>;

    private hovering = false;

    private overlayFocused = false;

    handleKeyup(event: KeyboardEvent): void {
        if (event.code === 'Tab') {
            this.open = true;
        } else if (event.code === 'Escape') {
            if (this.open) {
                event.preventDefault();
                event.stopPropagation();
                this.open = false;
                // Return focus to trigger element
                if (this.target) {
                    this.target.focus();
                }
            }
        }
    }

    handleTargetFocusin(): void {
        if (!this.target.matches(':focus-visible')) {
            return;
        }

        // Don't open hover overlay if the last interaction was a click.
        // This prevents hover from opening when focus returns to trigger
        // after closing a modal overlay via Escape key.
        // Previously this check was WebKit-only, but Chromium also needs it
        // because it reports :focus-visible=true for programmatic focus after keyboard events.
        if (this.target[lastInteractionType] === InteractionTypes.click) {
            return;
        }

        this.open = true;
        this.targetFocused = true;
    }

    handleTargetFocusout(): void {
        this.targetFocused = false;
        // Don't close immediately if pointer is over the content
        if (this.hovering) return;
        // Use delay to allow focus to move into overlay content
        this.doFocusleave();
    }

    private clearCloseTimeout(): void {
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
            this.hoverTimeout = undefined;
        }
    }

    handleTargetPointerenter(): void {
        this.clearCloseTimeout();
        if (this.overlay?.disabled) return;
        this.open = true;
        this.hovering = true;
    }

    handleTargetPointerleave(): void {
        this.doPointerleave();
    }

    // set a timeout once the pointer enters and the overlay is shown
    // give the user time to enter the overlay
    handleHostPointerenter(): void {
        this.clearCloseTimeout();
    }

    handleHostPointerleave(): void {
        this.doPointerleave();
    }

    handleOverlayFocusin(): void {
        this.overlayFocused = true;
        // Clear any pending close timeout when focus enters overlay
        this.clearCloseTimeout();
    }

    handleOverlayFocusout(): void {
        this.overlayFocused = false;
        // Don't close immediately if pointer is over the content or trigger has focus
        if (this.hovering) return;
        if (this.targetFocused && this.target.matches(':focus-visible')) return;
        // Use delay before closing
        this.doFocusleave();
    }

    override prepareDescription(): void {
        // require "content" to apply relationship
        if (!this.overlay.elements.length) return;

        const triggerRoot = this.target.getRootNode();
        const contentRoot = this.overlay.elements[0].getRootNode();
        const overlayRoot = this.overlay.getRootNode();
        if (triggerRoot === overlayRoot) {
            this.prepareOverlayRelativeDescription();
        } else if (triggerRoot === contentRoot) {
            this.prepareContentRelativeDescription();
        }
    }

    private prepareOverlayRelativeDescription(): void {
        const releaseDescription = conditionAttributeWithId(
            this.target,
            'aria-describedby',
            [this.overlay.id]
        );
        this.releaseDescription = () => {
            releaseDescription();
            this.releaseDescription = noop;
        };
    }

    private prepareContentRelativeDescription(): void {
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
            this.target,
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

    private scheduleClose(): void {
        this.hoverTimeout = setTimeout(() => {
            this.open = false;
        }, 300);
    }

    private doPointerleave(): void {
        this.hovering = false;
        const triggerElement = this.target as HTMLElement;
        if (this.targetFocused && triggerElement.matches(':focus-visible'))
            return;
        // Don't close if focus is within overlay content
        if (this.overlayFocused) return;

        this.scheduleClose();
    }

    private doFocusleave(): void {
        // Clear any existing timeout
        this.clearCloseTimeout();

        // Use same delay as pointer interactions for consistency
        if (!this.targetFocused && !this.overlayFocused && !this.hovering) {
            this.scheduleClose();
        }
    }

    override init(): void {
        // Clean up listeners if they've already been bound
        this.abortController?.abort();
        this.abortController = new AbortController();
        const { signal } = this.abortController;
        this.target.addEventListener(
            'keyup',
            (event) => this.handleKeyup(event),
            { signal }
        );
        this.target.addEventListener(
            'focusin',
            () => this.handleTargetFocusin(),
            { signal }
        );
        this.target.addEventListener(
            'focusout',
            () => this.handleTargetFocusout(),
            { signal }
        );
        this.target.addEventListener(
            'pointerenter',
            () => this.handleTargetPointerenter(),
            { signal }
        );
        this.target.addEventListener(
            'pointerleave',
            () => this.handleTargetPointerleave(),
            { signal }
        );
        if (this.overlay) {
            this.initOverlay();
        }
    }

    override initOverlay(): void {
        if (!this.abortController) {
            return;
        }
        const { signal } = this.abortController;
        this.overlay.addEventListener(
            'pointerenter',
            () => this.handleHostPointerenter(),
            { signal }
        );
        this.overlay.addEventListener(
            'pointerleave',
            () => this.handleHostPointerleave(),
            { signal }
        );
        this.overlay.addEventListener(
            'focusin',
            () => this.handleOverlayFocusin(),
            { signal }
        );
        this.overlay.addEventListener(
            'focusout',
            () => this.handleOverlayFocusout(),
            { signal }
        );
        this.overlay.addEventListener(
            'keyup',
            (event) => this.handleKeyup(event),
            { signal }
        );
    }
}
