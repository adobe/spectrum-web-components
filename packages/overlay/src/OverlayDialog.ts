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
import type { SpectrumElement } from '@spectrum-web-components/base';
import {
    firstFocusableIn,
    firstFocusableSlottedIn,
} from '@spectrum-web-components/shared/src/first-focusable-in.js';
import { VirtualTrigger } from './VirtualTrigger.js';
import { Constructor, OpenableElement } from './overlay-types.js';
import { guaranteedAllTransitionend, nextFrame } from './AbstractOverlay.js';
import {
    BeforetoggleClosedEvent,
    BeforetoggleOpenEvent,
    OverlayStateEvent,
} from './events.js';
import type { AbstractOverlay } from './AbstractOverlay.js';
import { userFocusableSelector } from '@spectrum-web-components/shared';

export function OverlayDialog<T extends Constructor<AbstractOverlay>>(
    constructor: T
): T & Constructor<SpectrumElement> {
    class OverlayWithDialog extends constructor {
        protected override async manageDialogOpen(): Promise<void> {
            const targetOpenState = this.open;
            await nextFrame();
            await this.managePosition();
            if (this.open !== targetOpenState) {
                return;
            }
            const focusEl = await this.dialogMakeTransition(targetOpenState);
            if (this.open !== targetOpenState) {
                return;
            }
            await this.dialogApplyFocus(targetOpenState, focusEl);
        }

        protected async dialogMakeTransition(
            targetOpenState: boolean
        ): Promise<HTMLElement | null> {
            let focusEl = null as HTMLElement | null;
            const start =
                (el: OpenableElement, index: number) =>
                async (): Promise<void> => {
                    el.open = targetOpenState;
                    if (!targetOpenState) {
                        const close = (): void => {
                            el.removeEventListener('close', close);
                            finish(el, index);
                        };
                        el.addEventListener('close', close);
                    }
                    if (index > 0) {
                        // Announce workflow on the first element _only_.
                        return;
                    }
                    const event = targetOpenState
                        ? BeforetoggleOpenEvent
                        : BeforetoggleClosedEvent;
                    this.dispatchEvent(new event());
                    if (!targetOpenState) {
                        // Show/focus workflow when opening _only_.
                        return;
                    }
                    if (el.matches(userFocusableSelector)) {
                        focusEl = el;
                    }
                    focusEl = focusEl || firstFocusableIn(el);
                    if (!focusEl) {
                        const childSlots = el.querySelectorAll('slot');
                        childSlots.forEach((slot) => {
                            if (!focusEl) {
                                focusEl = firstFocusableSlottedIn(slot);
                            }
                        });
                    }
                    if (!this.isConnected || this.dialogEl.open) {
                        // In both of these cases the browser will error.
                        // You can neither "reopen" a <dialog> or open one that is not on the DOM.
                        return;
                    }
                    this.dialogEl.showModal();
                };
            const finish = (el: OpenableElement, index: number) => (): void => {
                if (this.open !== targetOpenState) {
                    return;
                }
                const eventName = targetOpenState ? 'sp-opened' : 'sp-closed';
                if (index > 0) {
                    el.dispatchEvent(
                        new OverlayStateEvent(eventName, this, {
                            interaction: this.type,
                            publish: false,
                        })
                    );
                    return;
                }
                if (!this.isConnected || targetOpenState !== this.open) {
                    // Don't lead into the `.close()` workflow if not connected to the DOM.
                    // The browser will error in this case.
                    return;
                }
                const reportChange = async (): Promise<void> => {
                    const hasVirtualTrigger =
                        this.triggerElement instanceof VirtualTrigger;
                    this.dispatchEvent(
                        new OverlayStateEvent(eventName, this, {
                            interaction: this.type,
                            publish: hasVirtualTrigger,
                        })
                    );
                    el.dispatchEvent(
                        new OverlayStateEvent(eventName, this, {
                            interaction: this.type,
                            publish: false,
                        })
                    );
                    if (this.triggerElement && !hasVirtualTrigger) {
                        (this.triggerElement as HTMLElement).dispatchEvent(
                            new OverlayStateEvent(eventName, this, {
                                interaction: this.type,
                                publish: true,
                            })
                        );
                    }
                    this.state = targetOpenState ? 'opened' : 'closed';
                    this.returnFocus();
                    // Ensure layout and paint are done and the Overlay is still closed before removing the slottable request.
                    await nextFrame();
                    await nextFrame();
                    if (
                        targetOpenState === this.open &&
                        targetOpenState === false
                    ) {
                        this.requestSlottable();
                    }
                };
                if (!targetOpenState && this.dialogEl.open) {
                    this.dialogEl.addEventListener(
                        'close',
                        () => {
                            reportChange();
                        },
                        { once: true }
                    );
                    this.dialogEl.close();
                } else {
                    reportChange();
                }
            };
            this.elements.forEach((el, index) => {
                guaranteedAllTransitionend(
                    el,
                    start(el, index),
                    finish(el, index)
                );
            });
            return focusEl;
        }

        protected async dialogApplyFocus(
            targetOpenState: boolean,
            focusEl: HTMLElement | null
        ): Promise<void> {
            /**
             * Focus should be handled natively in `<dialog>` elements when leveraging `.showModal()`, but it's NOT.
             * - webkit bug: https://bugs.webkit.org/show_bug.cgi?id=255507
             * - firefox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1828398
             **/
            this.applyFocus(targetOpenState, focusEl);
        }
    }
    return OverlayWithDialog;
}
