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

import { ReactiveController } from '@spectrum-web-components/base';
import type { ComputePositionConfig, Placement } from '@floating-ui/dom';
import {
    autoUpdate,
    computePosition,
    flip,
    offset,
    shift,
    size,
} from '@floating-ui/dom';
import { PickerBase } from './Picker.js';

export enum InteractionTypes {
    'desktop',
    'mobile',
}
export const SAFARI_FOCUS_RING_CLASS = 'remove-focus-ring-safari-hack';

/**
 * InteractionController manages dropdown positioning using Floating UI
 * and handles open/close state for the Picker.
 */
export class InteractionController implements ReactiveController {
    abortController!: AbortController;

    public preventNextToggle: 'no' | 'maybe' | 'yes' = 'no';
    public pointerdownState = false;
    public enterKeydownOn: EventTarget | null = null;

    private autoUpdateCleanup?: () => void;

    get activelyOpening(): boolean {
        return false;
    }

    private _open = false;

    public get open(): boolean {
        return this._open;
    }

    /**
     * Set `open` - manages dropdown visibility and positioning
     */
    public set open(open: boolean) {
        if (this._open === open) return;
        this._open = open;
        this.host.open = open;

        if (open) {
            this.showDropdown();
        } else {
            this.hideDropdown();
        }
    }

    type!: InteractionTypes;

    constructor(
        public target: HTMLElement,
        public host: PickerBase
    ) {
        this.target = target;
        this.host = host;
        this.host.addController(this);
        this.init();
    }

    /**
     * Show the dropdown and start position tracking
     */
    private async showDropdown(): Promise<void> {
        // Wait for render to complete so dropdown element exists
        await this.host.updateComplete;

        const dropdown = this.host.dropdownElement;
        if (!dropdown) return;

        // Start auto-updating position on scroll/resize
        this.autoUpdateCleanup = autoUpdate(
            this.target,
            dropdown,
            () => this.updatePosition(),
            {
                ancestorScroll: true,
                ancestorResize: true,
                elementResize: true,
                layoutShift: true,
            }
        );

        // Initial position calculation, then show
        await this.updatePosition();
        dropdown.setAttribute('open', '');

        // Add click-outside listener after a frame to avoid immediate close
        requestAnimationFrame(() => {
            document.addEventListener('click', this.handleClickOutside, true);
        });

        // Dispatch opened event
        this.host.dispatchEvent(
            new Event('sp-opened', { bubbles: true, composed: true })
        );
    }

    /**
     * Hide the dropdown and stop position tracking
     */
    private hideDropdown(): void {
        const dropdown = this.host.dropdownElement;
        if (!dropdown) return;

        dropdown.removeAttribute('open');
        this.autoUpdateCleanup?.();
        this.autoUpdateCleanup = undefined;

        document.removeEventListener('click', this.handleClickOutside, true);

        // Update menu state
        this.host.optionsMenu?.updateSelectedItemIndex();
        this.host.optionsMenu?.closeDescendentOverlays();

        // Return focus to button if focus is within dropdown
        if (
            this.host.optionsMenu?.matches(':focus-within') &&
            !this.host.button.matches(':focus')
        ) {
            this.host.button.focus();
        }

        // Dispatch closed event
        this.host.dispatchEvent(
            new Event('sp-closed', { bubbles: true, composed: true })
        );
    }

    /**
     * Update dropdown position using Floating UI
     */
    private async updatePosition(): Promise<void> {
        const dropdown = this.host.dropdownElement;
        if (!dropdown) return;

        const middleware: ComputePositionConfig['middleware'] = [
            offset(4),
            flip({
                fallbackPlacements: ['top-start', 'top-end', 'bottom-end'],
                padding: 8,
            }),
            shift({ padding: 8 }),
            size({
                apply({ availableHeight, elements }) {
                    Object.assign(elements.floating.style, {
                        maxHeight: `${Math.min(availableHeight - 16, 400)}px`,
                    });
                },
                padding: 8,
            }),
        ];

        const { x, y, placement } = await computePosition(
            this.target,
            dropdown,
            {
                placement: this.host.placement as Placement,
                middleware,
            }
        );

        Object.assign(dropdown.style, {
            left: `${x}px`,
            top: `${y}px`,
        });

        dropdown.dataset.placement = placement;
    }

    /**
     * Handle clicks outside the picker to close
     */
    private handleClickOutside = (event: MouseEvent): void => {
        const path = event.composedPath();
        const clickedInside =
            path.includes(this.host) ||
            path.includes(this.host.dropdownElement as EventTarget);

        if (!clickedInside && this.preventNextToggle === 'no') {
            this.open = false;
        }
    };

    releaseDescription(): void {}

    public handlePointerdown(_event: PointerEvent): void {}

    public handleButtonFocus(event: FocusEvent): void {
        // When focus comes from a pointer event, and the related target is the Menu,
        // we don't want to reopen the Menu.
        if (
            this.preventNextToggle === 'maybe' &&
            event.relatedTarget === this.host.optionsMenu
        ) {
            this.preventNextToggle = 'yes';
        }
        if (this.preventNextToggle === 'no') this.host.close();
    }

    public handleActivate(_event: Event): void {}

    /* c8 ignore next 3 */
    init(): void {}

    abort(): void {
        this.releaseDescription();
        this.abortController?.abort();
        this.autoUpdateCleanup?.();
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    hostConnected(): void {
        this.init();
    }

    hostDisconnected(): void {
        this.abort();
    }

    public hostUpdated(): void {
        // Sync open state if changed externally
        if (this.host.open !== this._open) {
            this.open = this.host.open;
        }
    }
}
