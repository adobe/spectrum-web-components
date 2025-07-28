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
import { ReactiveController, TemplateResult } from '@spectrum-web-components/base';
import { AbstractOverlay } from '@spectrum-web-components/overlay/src/AbstractOverlay';
import { Overlay } from '@spectrum-web-components/overlay/src/Overlay.js';
import { PickerBase } from './Picker.js';
export declare enum InteractionTypes {
    'desktop' = 0,
    'mobile' = 1
}
export declare const SAFARI_FOCUS_RING_CLASS = "remove-focus-ring-safari-hack";
export declare class InteractionController implements ReactiveController {
    target: HTMLElement;
    host: PickerBase;
    abortController: AbortController;
    preventNextToggle: 'no' | 'maybe' | 'yes';
    pointerdownState: boolean;
    enterKeydownOn: EventTarget | null;
    container: TemplateResult;
    get activelyOpening(): boolean;
    private _open;
    get open(): boolean;
    /**
     * Set `open`
     */
    set open(open: boolean);
    private _overlay;
    get overlay(): AbstractOverlay;
    set overlay(overlay: AbstractOverlay | undefined);
    type: InteractionTypes;
    constructor(target: HTMLElement, host: PickerBase);
    releaseDescription(): void;
    protected handleBeforetoggle(event: Event & {
        target: Overlay;
        newState: 'open' | 'closed';
    }): void;
    initOverlay(): void;
    handlePointerdown(_event: PointerEvent): void;
    handleButtonFocus(event: FocusEvent): void;
    handleActivate(_event: Event): void;
    init(): void;
    abort(): void;
    hostConnected(): void;
    hostDisconnected(): void;
    hostUpdated(): void;
}
