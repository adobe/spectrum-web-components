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
        target: HTMLElement,
        interaction: TriggerInteractionsV1,
        content: HTMLElement,
        options: OverlayOptionsV1
    ): Promise<() => void>;
    public static async open(
        content: HTMLElement,
        options?: OverlayOptions
    ): Promise<Overlay>;
    public static async open(
        targetOrContent: HTMLElement,
        interactionOrOptions:
            | TriggerInteractionsV1
            | OverlayOptions
            | undefined,
        content?: HTMLElement,
        options?: OverlayOptionsV1
    ): Promise<Overlay | (() => void)> {
        const v2 = arguments.length === 2;
        const overlayContent = content || targetOrContent;
        const overlay = new Overlay();
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
        let restored = false;
        const restoreContent = reparentChildren([overlayContent], overlay, {
            position: 'beforeend',
            prepareCallback: (el) => {
                const slot = el.slot;
                el.removeAttribute('slot');
                return () => {
                    el.slot = slot;
                };
            },
        });
        if (v2) {
            const options = interactionOrOptions as OverlayOptions;
            overlay.append(overlayContent);
            overlay.receivesFocus = options.receivesFocus ?? 'auto';
            overlay.triggerElement = options.trigger || null;
            overlay.type = options.type || 'modal';
            overlay.offset = options.offset || 6;
            overlay.placement = options.placement;
            overlay.willPreventClose = !!options.notImmediatelyClosable;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    // Do we want to "open" this path, or leave that to the consumer?
                    overlay.open = true;
                });
            });
            return overlay;
        } else if (overlayContent && options) {
            const target = targetOrContent;
            const interaction = interactionOrOptions;
            overlay.receivesFocus = options.receivesFocus ?? 'auto';
            overlay.triggerElement = options.virtualTrigger || target;
            overlay.type =
                interaction === 'modal'
                    ? 'modal'
                    : interaction === 'hover'
                    ? 'hint'
                    : 'auto';
            overlay.offset = options.offset ?? 6;
            overlay.placement = options.placement;
            overlay.willPreventClose = !!options.notImmediatelyClosable;
            // This is super dirty...find a better way.
            // Maybe imperative open should go _at the end_ of everything?
            // Having an option is likely useful.
            // Make imperative overlays less useful?
            // Delete the imperative approach to an overlay?
            // Possibly the giving all of the responsiblities to the user is the best path.
            const parent = target.getRootNode() as Document;
            if (parent === document) {
                target.insertAdjacentElement('afterend', overlay);
            } else {
                parent.append(overlay);
            }
            await new Promise<void>((res) =>
                requestAnimationFrame(() => requestAnimationFrame(() => res()))
            );
            overlay.open = true;
            return overlay.dispose;
        }
        /* c8 ignore next 1 */
        return overlay;
    }
}
