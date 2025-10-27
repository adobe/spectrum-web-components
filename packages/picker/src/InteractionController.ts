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
    ReactiveController,
    TemplateResult,
} from '@spectrum-web-components/base';
import { AbstractOverlay } from '@spectrum-web-components/overlay/src/AbstractOverlay.js';
import { Overlay } from '@spectrum-web-components/overlay/src/Overlay.js';
import { PickerBase } from './Picker.js';

export enum InteractionTypes {
    'desktop',
    'mobile',
}
export const SAFARI_FOCUS_RING_CLASS = 'remove-focus-ring-safari-hack';

export class InteractionController implements ReactiveController {
    abortController!: AbortController;

    public preventNextToggle: 'no' | 'maybe' | 'yes' = 'no';
    public pointerdownState = false;
    public enterKeydownOn: EventTarget | null = null;

    public container!: TemplateResult;

    get activelyOpening(): boolean {
        return false;
    }

    private _open = false;

    public get open(): boolean {
        return this._open;
    }

    /**
     * Set `open`
     */
    public set open(open: boolean) {
        if (this._open === open) return;
        this._open = open;

        if (this.overlay) {
            this.host.open = open;
            return;
        }

        // When there is no Overlay and `open` is moving to `true`, lazily import/create
        // an Overlay and apply that state to it.
        customElements
            .whenDefined('sp-overlay')
            .then(async (): Promise<void> => {
                const { Overlay } = await import(
                    '@spectrum-web-components/overlay/src/Overlay.js'
                );
                this.overlay = new Overlay();
                this.host.open = true;
                this.host.requestUpdate();
            });
        import('@spectrum-web-components/overlay/sp-overlay.js');
    }

    private _overlay!: AbstractOverlay;

    public get overlay(): AbstractOverlay {
        return this._overlay;
    }

    public set overlay(overlay: AbstractOverlay | undefined) {
        if (!overlay) return;
        if (this.overlay === overlay) return;
        this._overlay = overlay;
        this.initOverlay();
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

    releaseDescription(): void {}

    protected handleBeforetoggle(
        event: Event & {
            target: Overlay;
            newState: 'open' | 'closed';
        }
    ): void {
        if (event.composedPath()[0] !== event.target) {
            return;
        }
        if (event.newState === 'closed') {
            if (this.preventNextToggle === 'no') {
                this.open = false;
            } else if (!this.pointerdownState) {
                // Prevent browser driven closure while opening the Picker
                // and the expected event series has not completed.
                this.overlay?.manuallyKeepOpen();
            }
        }
        if (!this.open) {
            this.host.optionsMenu.updateSelectedItemIndex();
            this.host.optionsMenu.closeDescendentOverlays();
        }
    }

    initOverlay(): void {
        if (this.overlay) {
            this.overlay.addEventListener('beforetoggle', (event: Event) => {
                this.handleBeforetoggle(
                    event as Event & {
                        target: Overlay;
                        newState: 'open' | 'closed';
                    }
                );
            });
            this.overlay.type = this.host.isMobile.matches ? 'modal' : 'auto';
            this.overlay.triggerElement = this.host as HTMLElement;
            this.overlay.placement =
                this.host.isMobile.matches && !this.host.forcePopover
                    ? undefined
                    : this.host.placement;
            // We should not be applying open is set programmatically via the picker's open.property.
            // Focus should only be applied if a user action causes the menu to open. Otherwise,
            // we could be pulling focus from a user when an picker with an open menu loads.
            this.overlay.receivesFocus = 'false';
            this.overlay.willPreventClose =
                this.preventNextToggle !== 'no' && this.open;
            this.overlay.addEventListener(
                'slottable-request',
                this.host.handleSlottableRequest
            );
        }
    }

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
    }

    hostConnected(): void {
        this.init();
        this.host.addEventListener('sp-opened', () => {
            /**
             * set shouldSupportDragAndSelect to false for mobile
             * to prevent click event being captured behind the menu-tray
             * we do this here because the menu gets reinitialized on overlay open
             */
            this.host.optionsMenu.shouldSupportDragAndSelect =
                !this.host.isMobile.matches;
        });
        this.host.addEventListener('sp-closed', () => {
            if (
                !this.open &&
                this.host.optionsMenu.matches(':focus-within') &&
                !this.host.button.matches(':focus')
            ) {
                this.host.button.focus();
            }
        });
    }

    hostDisconnected(): void {
        this.abortController?.abort();
    }

    public hostUpdated(): void {
        if (
            this.overlay &&
            this.host.dependencyManager.loaded &&
            this.host.open !== this.overlay.open
        ) {
            this.overlay.willPreventClose = this.preventNextToggle !== 'no';
            this.overlay.open = this.host.open;
        }
    }
}
