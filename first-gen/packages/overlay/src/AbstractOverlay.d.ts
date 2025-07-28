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
import { SpectrumElement } from '@spectrum-web-components/base';
import type { OpenableElement, OverlayOptions, OverlayOptionsV1, OverlayState, OverlayTypes, Placement, TriggerInteractionsV1 } from './overlay-types.js';
import type { Overlay } from './Overlay.js';
import type { VirtualTrigger } from './VirtualTrigger.js';
import { OverlayTimer } from './overlay-timer.js';
import type { PlacementController } from './PlacementController.js';
import type { ElementResolutionController } from '@spectrum-web-components/reactive-controllers/src/ElementResolution.js';
export declare const overlayTimer: OverlayTimer;
export declare const noop: () => void;
/**
 * Apply a "transitionend" listener to an element that may not transition but
 * guarantee the callback will be fired either way.
 *
 * @param el {HTMLElement} - Target of the "transition" listeners.
 * @param action {Function} - Method to trigger the "transition".
 * @param cb {Function} - Callback to trigger when the "transition" has ended.
 */
export declare const guaranteedAllTransitionend: (el: HTMLElement, action: () => void, cb: () => void) => void;
export declare function nextFrame(): Promise<void>;
/**
 * Abstract Overlay base class so that property tyings and imperative API
 * interfaces can be held separate from the actual class definition.
 */
export declare class AbstractOverlay extends SpectrumElement {
    protected applyFocus(_targetOpenState: boolean, _focusEl: HTMLElement | null): Promise<void>;
    get delayed(): boolean;
    set delayed(_delayed: boolean);
    dialogEl: HTMLDialogElement & {
        showPopover(): void;
        hidePopover(): void;
    };
    get disabled(): boolean;
    set disabled(_disabled: boolean);
    dispose: () => void;
    protected get elementResolver(): ElementResolutionController;
    protected set elementResolver(controller: ElementResolutionController);
    protected _elementResolver: ElementResolutionController;
    protected ensureOnDOM(_targetOpenState: boolean): Promise<void>;
    elements: OpenableElement[];
    protected makeTransition(_targetOpenState: boolean): Promise<HTMLElement | null>;
    protected manageDelay(_targetOpenState: boolean): Promise<void>;
    protected managePopoverOpen(): Promise<void>;
    protected managePosition(): void;
    protected offset: number | [number, number];
    get open(): boolean;
    set open(_open: boolean);
    placement?: Placement;
    protected get placementController(): PlacementController;
    protected set placementController(controller: PlacementController);
    protected _placementController: PlacementController;
    receivesFocus: 'true' | 'false' | 'auto';
    protected requestSlottable(): void;
    protected returnFocus(): void;
    get state(): OverlayState;
    set state(_state: OverlayState);
    protected _state: OverlayState;
    triggerElement: HTMLElement | VirtualTrigger | null;
    type: OverlayTypes;
    willPreventClose: boolean;
    manuallyKeepOpen(): void;
    static update(): void;
    /**
     * Overloaded imperative API entry point that allows for both the pre-0.37.0
     * argument signature as well as the post-0.37.0 signature. This allows for
     * consumers to continue to leverage it as they had been in previous releases
     * while also surfacing the more feature-rich API that has been made available.
     */
    static open(trigger: HTMLElement, interaction: TriggerInteractionsV1, content: HTMLElement, optionsV1: OverlayOptionsV1): Promise<() => void>;
    static open(content: HTMLElement, options?: OverlayOptions): Promise<Overlay>;
    static applyOptions(overlay: AbstractOverlay, options: OverlayOptions): void;
    disconnectedCallback(): void;
}
