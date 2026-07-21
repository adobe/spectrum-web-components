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
import { reparentChildren } from '@spectrum-web-components/shared/src/reparent-children.js';

import type {
    OpenableElement,
    OverlayOptions,
    OverlayOptionsV1,
    OverlayState,
    OverlayTypes,
    Placement,
    TriggerInteractionsV1,
} from './overlay-types.js';
import type { Overlay } from './Overlay.js';
import type { VirtualTrigger } from './VirtualTrigger.js';
import { OverlayTimer } from './overlay-timer.js';
import type { PlacementController } from './PlacementController.js';
import type { ElementResolutionController } from '@spectrum-web-components/reactive-controllers/src/ElementResolution.js';

export const overlayTimer = new OverlayTimer();

export const noop = (): void => {
    return;
};

/**
 * Apply a "transitionend" listener to an element that may not transition but
 * guarantee the callback will be fired either way.
 *
 * @param el {HTMLElement} - Target of the "transition" listeners.
 * @param action {Function} - Method to trigger the "transition".
 * @param cb {Function} - Callback to trigger when the "transition" has ended.
 */
export const guaranteedAllTransitionend = (
    el: HTMLElement,
    action: () => void,
    cb: () => void
): void => {
    const abortController = new AbortController();
    const runningTransitions = new Map<string, number>();
    const cleanup = (): void => {
        abortController.abort();
        cb();
    };
    let guarantee2: number;
    let guarantee3: number;
    // WebKit fires `transitionrun` a little earlier, the multiple guarantees here
    // allow WebKit to be caught, but doesn't remove the animation listener until
    // after it would have fired in Chromium.
    const guarantee1 = requestAnimationFrame(() => {
        guarantee2 = requestAnimationFrame(() => {
            guarantee3 = requestAnimationFrame(() => {
                cleanup();
            });
        });
    });
    const handleTransitionend = (event: TransitionEvent): void => {
        if (event.target !== el) {
            return;
        }
        runningTransitions.set(
            event.propertyName,
            (runningTransitions.get(event.propertyName) as number) - 1
        );
        if (!runningTransitions.get(event.propertyName)) {
            runningTransitions.delete(event.propertyName);
        }
        if (runningTransitions.size === 0) {
            cleanup();
        }
    };
    const handleTransitionrun = (event: TransitionEvent): void => {
        if (event.target !== el) {
            return;
        }
        if (!runningTransitions.has(event.propertyName)) {
            runningTransitions.set(event.propertyName, 0);
        }
        runningTransitions.set(
            event.propertyName,
            (runningTransitions.get(event.propertyName) as number) + 1
        );
        cancelAnimationFrame(guarantee1);
        cancelAnimationFrame(guarantee2);
        cancelAnimationFrame(guarantee3);
    };
    el.addEventListener('transitionrun', handleTransitionrun, {
        signal: abortController.signal,
    });
    el.addEventListener('transitionend', handleTransitionend, {
        signal: abortController.signal,
    });
    el.addEventListener('transitioncancel', handleTransitionend, {
        signal: abortController.signal,
    });
    action();
};

export function nextFrame(): Promise<void> {
    return new Promise((res) => requestAnimationFrame(() => res()));
}

/**
 * Abstract Overlay base class so that property tyings and imperative API
 * interfaces can be held separate from the actual class definition.
 */
export class AbstractOverlay extends SpectrumElement {
    protected async applyFocus(
        _targetOpenState: boolean,
        _focusEl: HTMLElement | null
    ): Promise<void> {
        return;
    }
    /* c8 ignore next 6 */
    get delayed(): boolean {
        return false;
    }
    set delayed(_delayed: boolean) {
        return;
    }
    dialogEl!: HTMLDialogElement & {
        showPopover(): void;
        hidePopover(): void;
    };
    /* c8 ignore next 6 */
    get disabled(): boolean {
        return false;
    }
    set disabled(_disabled: boolean) {
        return;
    }
    dispose = noop;
    protected get elementResolver(): ElementResolutionController {
        return this._elementResolver;
    }
    protected set elementResolver(controller) {
        this._elementResolver = controller;
    }
    protected _elementResolver!: ElementResolutionController;
    /* c8 ignore next 3 */
    protected async ensureOnDOM(_targetOpenState: boolean): Promise<void> {
        return;
    }
    elements!: OpenableElement[];
    /* c8 ignore next 5 */
    protected async makeTransition(
        _targetOpenState: boolean
    ): Promise<HTMLElement | null> {
        return null;
    }
    protected async manageDelay(_targetOpenState: boolean): Promise<void> {
        return;
    }
    /* c8 ignore next 3 */
    protected async manageDialogOpen(): Promise<void> {
        return;
    }
    /* c8 ignore next 3 */
    protected async managePopoverOpen(): Promise<void> {
        return;
    }
    /* c8 ignore next 3 */
    protected managePosition(): void {
        return;
    }
    protected offset: number | [number, number] = 0;
    /* c8 ignore next 6 */
    get open(): boolean {
        return false;
    }
    set open(_open: boolean) {
        return;
    }
    placement?: Placement;
    protected get placementController(): PlacementController {
        return this._placementController;
    }
    protected set placementController(controller) {
        this._placementController = controller;
    }
    protected _placementController!: PlacementController;
    receivesFocus!: 'true' | 'false' | 'auto';
    protected requestSlottable(): void {}
    protected returnFocus(): void {
        return;
    }
    /* c8 ignore next 6 */
    get state(): OverlayState {
        return 'closed';
    }
    set state(_state: OverlayState) {
        return;
    }
    protected _state!: OverlayState;
    triggerElement!: HTMLElement | VirtualTrigger | null;
    type!: OverlayTypes;
    willPreventClose = false;
    /* c8 ignore next 3 */
    public manuallyKeepOpen(): void {
        return;
    }

    public static update(): void {
        const overlayUpdateEvent = new CustomEvent('sp-update-overlays', {
            bubbles: true,
            composed: true,
            cancelable: true,
        });
        document.dispatchEvent(overlayUpdateEvent);
    }

    // @TODO remove this long standing legacy API
    /**
     * Overloaded imperative API entry point that allows for both the pre-0.37.0
     * argument signature as well as the post-0.37.0 signature. This allows for
     * consumers to continue to leverage it as they had been in previous releases
     * while also surfacing the more feature-rich API that has been made available.
     */
    public static async open(
        trigger: HTMLElement,
        interaction: TriggerInteractionsV1,
        content: HTMLElement,
        optionsV1: OverlayOptionsV1
    ): Promise<() => void>;
    public static async open(
        content: HTMLElement,
        options?: OverlayOptions
    ): Promise<Overlay>;
    public static async open(
        triggerOrContent: HTMLElement,
        interactionOrOptions:
            | TriggerInteractionsV1
            | OverlayOptions
            | undefined,
        content?: HTMLElement,
        optionsV1?: OverlayOptionsV1
    ): Promise<Overlay | (() => void)> {
        // eslint-disable-next-line import/no-extraneous-dependencies
        await import('@spectrum-web-components/overlay/sp-overlay.js');
        const v2 = arguments.length === 2;
        const overlayContent = content || triggerOrContent;
        // Use the `this` from the `static` method context rather than a
        // specific imported constructor to prevent opening a circular dependency.
        const overlay = new this() as Overlay;
        let restored = false;
        overlay.dispose = () => {
            overlay.addEventListener('sp-closed', () => {
                if (!restored) {
                    restoreContent();
                    restored = true;
                }
                requestAnimationFrame(() => {
                    overlay.remove();
                });
            });
            overlay.open = false;
            overlay.dispose = noop;
        };
        /**
         * Since content must exist in an <sp-overlay>, we need a way to get it there.
         * The best & most-direct way is to declaratively use an <sp-overlay> element,
         * but for imperative users, we'll reparent content into an overlay that we've created for them.
         **/
        const restoreContent = reparentChildren([overlayContent], overlay, {
            position: 'beforeend',
            prepareCallback: (el) => {
                // Ensure that content to be overlaid is no longer targetted to a specific `slot`.
                // This allow for it to be visible in the overlaid context.
                const slot = el.slot;
                el.removeAttribute('slot');
                return () => {
                    el.slot = slot;
                };
            },
        });

        const v1 = !v2 && overlayContent && optionsV1;
        if (v1) {
            if (window.__swc.DEBUG) {
                window.__swc.warn(
                    overlay,
                    `You are interacting with an ${overlay.localName} element via a deprecated imperative API. This API will be removed in a future version of the SWC library. Consider leveraging an ${overlay.localName} directly.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/overlay/',
                    { level: 'deprecation' }
                );
            }
            const trigger = triggerOrContent;
            const interaction = interactionOrOptions;
            const options = optionsV1;
            AbstractOverlay.applyOptions(overlay, {
                ...options,
                delayed:
                    options.delayed || overlayContent.hasAttribute('delayed'),
                trigger: options.virtualTrigger || trigger,
                type:
                    interaction === 'modal'
                        ? 'modal'
                        : interaction === 'hover'
                          ? 'hint'
                          : 'auto',
            });
            trigger.insertAdjacentElement('afterend', overlay);
            await overlay.updateComplete;
            overlay.open = true;
            return overlay.dispose;
        }

        const options = interactionOrOptions as OverlayOptions;
        overlay.append(overlayContent);
        AbstractOverlay.applyOptions(overlay, {
            ...options,
            delayed: options.delayed || overlayContent.hasAttribute('delayed'),
        });
        overlay.updateComplete.then(() => {
            // Do we want to "open" this path, or leave that to the consumer?
            overlay.open = true;
        });
        return overlay;
    }

    static applyOptions(
        overlay: AbstractOverlay,
        options: OverlayOptions
    ): void {
        overlay.delayed = !!options.delayed;
        overlay.receivesFocus = options.receivesFocus ?? 'auto';
        overlay.triggerElement = options.trigger || null;
        overlay.type = options.type || 'modal';
        overlay.offset = options.offset ?? 0;
        overlay.placement = options.placement;
        overlay.willPreventClose = !!options.notImmediatelyClosable;
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();
    }
}
