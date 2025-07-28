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
export declare enum InteractionTypes {
    click = "click",
    hover = "hover",
    longpress = "longpress"
}
export declare const lastInteractionType: unique symbol;
export type ControllerOptions = {
    overlay?: AbstractOverlay;
    handleOverlayReady?: (overlay: AbstractOverlay) => void;
    isPersistent?: boolean;
};
type InteractionTarget = HTMLElement & {
    [lastInteractionType]?: InteractionTypes;
};
export declare class InteractionController implements ReactiveController {
    target: InteractionTarget;
    abortController: AbortController;
    get activelyOpening(): boolean;
    private handleOverlayReady?;
    private isLazilyOpen;
    get open(): boolean;
    /**
     * Set `open` against the associated Overlay lazily.
     */
    set open(open: boolean);
    get overlay(): AbstractOverlay;
    set overlay(overlay: AbstractOverlay | undefined);
    private _overlay;
    protected isPersistent: boolean;
    type: InteractionTypes;
    constructor(target: InteractionTarget, { overlay, isPersistent, handleOverlayReady }: ControllerOptions);
    prepareDescription(_: HTMLElement): void;
    releaseDescription(): void;
    shouldCompleteOpen(): void;
    init(): void;
    initOverlay(): void;
    abort(): void;
    hostConnected(): void;
    hostDisconnected(): void;
}
export {};
