/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { noop, OverlayBase } from './OverlayBase.js';
import { OverlayDialog } from './OverlayDialog.js';
import { OverlayPopover } from './OverlayPopover.js';
import { OverlayNoPopover } from './OverlayNoPopover.js';
import type {
    OverlayOptionsV1,
    TriggerInteractionsV1,
} from './overlay-types.js';
import { Placement } from '@floating-ui/dom/src/types.js';
import { VirtualTrigger } from './VirtualTrigger.js';
import { reparentChildren } from '@spectrum-web-components/shared';

const supportsPopover = 'showPopover' in document.createElement('div');

let OverlayFeatures = OverlayDialog(OverlayBase);
if (supportsPopover) {
    OverlayFeatures = OverlayPopover(OverlayFeatures);
} else {
    OverlayFeatures = OverlayNoPopover(OverlayFeatures);
}

type OverlayOptions = {
    delayed?: boolean;
    notImmediatelyClosable?: boolean;
    offset?: number | [number, number]; // supporting multi-axis
    placement?: Placement;
    receivesFocus?: 'auto' | 'true' | 'false';
    trigger?: HTMLElement | VirtualTrigger;
    type?: 'modal' | 'page' | 'hint' | 'auto' | 'manual';
};

/**
 * @element sp-overlay
 *
 * @attr {boolean} delayed - whether to wait for the warm-up timer before opening the overlay
 * @attr {boolean} disabled - whether the overlay is currently disabled
 * @attr {number | [number, number]} - the single main axis offset of the overlay or both the main and cross axis offset in pixels
 * @attr {boolean} open - whether the overlay is projected on to the "top-layer"
 * @attr {"auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end"} placement - the layout relationship between the overlay and its trigger
 * @attr {"auto" | "true" | "false"} receivesFocus - whether the specifically throw focus into the overlay or to follow the expected behavior based on the value of `type`
 * @attr {number} tipPadding - the minimum distance from the edge of the overlay that a tip can be delivered
 * @attr {string} trigger - an ID reference to the overlay's trigger element and _optionally_ the interaction with which the trigger that will open the overlay
 * @attr {HTMLElement} triggerElement - an element reference to the ovelray's trigger element
 * @attr {string} triggerInteraction - the interaction with which the trigger that will open the overlay
 * @attr {'auto' | 'hint' | 'manual' | 'modal' | 'page'} type - the type of overlay that overlay will be
 *
 * @fires sp-opened - announces that an overlay has completed any entry animations
 * @fires sp-closed - announce that an overlay has compelted any exit animations
 */
export class Overlay extends OverlayFeatures implements OverlayBase {
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
