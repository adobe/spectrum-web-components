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

import type { ReactiveController } from '@spectrum-web-components/base';
import { AbstractOverlay } from './AbstractOverlay.js';

export enum InteractionTypes {
    click = 'click',
    hover = 'hover',
    longpress = 'longpress',
}

export const lastInteractionType = Symbol('lastInteractionType');
export const SAFARI_FOCUS_RING_CLASS = 'remove-focus-ring-safari-hack';

export type ControllerOptions = {
    overlay?: AbstractOverlay;
    handleOverlayReady?: (overlay: AbstractOverlay) => void;
    isPersistent?: boolean;
};

type InteractionTarget = HTMLElement & {
    [lastInteractionType]?: InteractionTypes;
};

export class InteractionController implements ReactiveController {
    abortController!: AbortController;

    get activelyOpening(): boolean {
        return false;
    }

    private handleOverlayReady?: (overlay: AbstractOverlay) => void;

    // Holds optimistic open state when an Overlay is not yet present
    private isLazilyOpen = false;

    public get open(): boolean {
        return this.overlay?.open ?? this.isLazilyOpen;
    }

    /**
     * Set `open` against the associated Overlay lazily.
     */
    public set open(open: boolean) {
        if (open === this.open) return;
        this.isLazilyOpen = open;
        if (this.overlay) {
            // If there already is an Overlay, apply the value of `open` directly.
            this.overlay.open = open;
            this.target[lastInteractionType] = this.type;
            return;
        }
        if (!open) {
            // When `open` moves to `false` and there is not yet an Overlay,
            // assume that no Overlay and a closed Overlay are the same and return early.
            return;
        }
        // When there is no Overlay and `open` is moving to `true`, lazily import/create
        // an Overlay and apply that state to it.
        customElements
            .whenDefined('sp-overlay')
            .then(async (): Promise<void> => {
                const { Overlay } = await import('./Overlay.js');
                this.overlay = new Overlay();
                this.overlay.open = true;
                this.target[lastInteractionType] = this.type;
            });
        import('../sp-overlay.js');
    }

    public get overlay(): AbstractOverlay {
        return this._overlay;
    }

    public set overlay(overlay: AbstractOverlay | undefined) {
        if (!overlay) return;
        if (this.overlay === overlay) return;
        if (this.overlay) {
            this.overlay.removeController(this);
        }
        this._overlay = overlay;
        this.overlay.addController(this);
        this.initOverlay();
        this.prepareDescription(this.target);
        this.handleOverlayReady?.(this.overlay);
    }

    private _overlay!: AbstractOverlay;

    protected isPersistent = false;

    type!: InteractionTypes;

    constructor(
        public target: InteractionTarget,
        { overlay, isPersistent, handleOverlayReady }: ControllerOptions
    ) {
        this.isPersistent = !!isPersistent;
        this.handleOverlayReady = handleOverlayReady;
        if (this.isPersistent) {
            this.init();
        }
        this.overlay = overlay;
    }

    prepareDescription(_: HTMLElement): void {}

    releaseDescription(): void {}

    shouldCompleteOpen(): void {}

    /* c8 ignore next 3 */
    init(): void {
        // Abstract init() method.
    }

    /* c8 ignore next 3 */
    initOverlay(): void {
        // Abstract initOverlay() method.
    }

    abort(): void {
        this.releaseDescription();
        this.abortController?.abort();
    }

    hostConnected(): void {
        this.init();
    }

    hostDisconnected(): void {
        if (!this.isPersistent) {
            this.abort();
        }
    }
}
