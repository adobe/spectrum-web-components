/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { SpectrumElement } from '@spectrum-web-components/base';
import { reparentChildren } from '@spectrum-web-components/shared/src/reparent-children.js';

import type {
    OpenableElement,
    OverlayOptions,
    OverlayOptionsV1,
    OverlayTypes,
    TriggerInteractionsV1,
} from './overlay-types.js';
import { Overlay } from './Overlay.js';
import type { VirtualTrigger } from './VirtualTrigger.js';
import { OverlayTimer } from './overlay-timer.js';

export const overlayTimer = new OverlayTimer();

export const noop = (): void => {
    return;
};

export class BeforetoggleClosedEvent extends Event {
    currentState = 'open';
    newState = 'closed';
    constructor() {
        super('beforetoggle', {
            bubbles: false,
            composed: false,
        });
    }
}

export class BeforetoggleOpenEvent extends Event {
    currentState = 'closed';
    newState = 'open';
    constructor() {
        super('beforetoggle', {
            bubbles: false,
            composed: false,
        });
    }
}

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
    const runningTransitions = new Map<string, number>();
    const cleanup = (): void => {
        el.removeEventListener('transitionrun', handleTransitionrun);
        el.removeEventListener('transitionend', handleTransitionend);
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
    el.addEventListener('transitionrun', handleTransitionrun);
    el.addEventListener('transitionend', handleTransitionend);
    action();
};

export class AbstractOverlay extends SpectrumElement {
    delayed!: boolean;
    dialogEl!: HTMLDialogElement & {
        showPopover(): void;
        hidePopover(): void;
    };
    dispose = noop;
    elements!: OpenableElement[];
    protected async manageDialogOpen(): Promise<void> {
        return;
    }
    protected async managePopoverOpen(): Promise<void> {
        return;
    }
    protected managePosition(): void {
        return;
    }
    get open(): boolean {
        return false;
    }
    set open(_open: boolean) {
        return;
    }
    receivesFocus!: 'true' | 'false' | 'auto';
    triggerElement!: HTMLElement | VirtualTrigger | null;
    type!: OverlayTypes;

    public static update(): void {
        const overlayUpdateEvent = new CustomEvent('sp-update-overlays', {
            bubbles: true,
            composed: true,
            cancelable: true,
        });
        document.dispatchEvent(overlayUpdateEvent);
    }

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
        const v2 = arguments.length === 2;
        const overlayContent = content || triggerOrContent;
        const overlay = new Overlay();
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
            overlay.receivesFocus = options.receivesFocus ?? 'auto';
            overlay.triggerElement = options.virtualTrigger || trigger;
            overlay.type =
                interaction === 'modal'
                    ? 'modal'
                    : interaction === 'hover'
                    ? 'hint'
                    : 'auto';
            overlay.offset = options.offset ?? 6;
            overlay.placement = options.placement;
            overlay.willPreventClose = !!options.notImmediatelyClosable;
            trigger.insertAdjacentElement('afterend', overlay);
            await overlay.updateComplete;
            overlay.open = true;
            return overlay.dispose;
        }

        const options = interactionOrOptions as OverlayOptions;
        overlay.append(overlayContent);
        overlay.receivesFocus = options.receivesFocus ?? 'auto';
        overlay.triggerElement = options.trigger || null;
        overlay.type = options.type || 'modal';
        overlay.offset = options.offset ?? 6;
        overlay.placement = options.placement;
        overlay.willPreventClose = !!options.notImmediatelyClosable;
        overlay.updateComplete.then(() => {
            // Do we want to "open" this path, or leave that to the consumer?
            overlay.open = true;
        });
        return overlay;
    }
}
