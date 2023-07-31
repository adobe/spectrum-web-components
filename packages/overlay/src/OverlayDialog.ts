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
import { ReactiveElement } from 'lit';
import {
    firstFocusableIn,
    firstFocusableSlottedIn,
} from '@spectrum-web-components/shared/src/first-focusable-in.js';
import { VirtualTrigger } from './VirtualTrigger.js';
import {
    Constructor,
    OpenableElement,
    OverlayOpenCloseDetail,
} from './overlay-types.js';
import {
    BeforetoggleClosedEvent,
    BeforetoggleOpenEvent,
    guaranteedAllTransitionend,
} from './AbstractOverlay.js';
import type { AbstractOverlay } from './AbstractOverlay.js';

export function OverlayDialog<T extends Constructor<AbstractOverlay>>(
    constructor: T
): T & Constructor<ReactiveElement> {
    class OverlayWithDialog extends constructor {
        protected override async manageDialogOpen(): Promise<void> {
            const targetOpenState = this.open;
            await this.managePosition();
            if (this.open !== targetOpenState) {
                return;
            }
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
                    if (typeof el.open !== 'undefined') {
                        el.open = targetOpenState;
                    }
                    if (!targetOpenState) {
                        const close = (): void => {
                            el.removeEventListener('close', close);
                            finish(el, index);
                        };
                        el.addEventListener('close', close);
                    }
                    if (index > 0 || !targetOpenState) {
                        return;
                    }
                    const event = targetOpenState
                        ? BeforetoggleOpenEvent
                        : BeforetoggleClosedEvent;
                    this.dispatchEvent(new event());
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
                        return;
                    }
                    this.dialogEl.showModal();
                };
            const finish = (el: OpenableElement, index: number) => (): void => {
                if (this.open !== targetOpenState) {
                    return;
                }
                const eventName = targetOpenState ? 'sp-opened' : 'sp-closed';
                this.isVisible = this.isVisible && targetOpenState;
                if (index > 0) {
                    el.dispatchEvent(
                        new CustomEvent<OverlayOpenCloseDetail>(eventName, {
                            bubbles: false,
                            composed: false,
                            detail: { interaction: this.type },
                        })
                    );
                    return;
                }
                if (!this.isConnected || targetOpenState !== this.open) {
                    return;
                }
                const reportChange = (): void => {
                    const hasVirtualTrigger =
                        this.triggerElement instanceof VirtualTrigger;
                    this.dispatchEvent(
                        new Event(eventName, {
                            bubbles: hasVirtualTrigger,
                            composed: hasVirtualTrigger,
                        })
                    );
                    el.dispatchEvent(
                        new Event(eventName, {
                            bubbles: false,
                            composed: false,
                        })
                    );
                    if (this.triggerElement && !hasVirtualTrigger) {
                        (this.triggerElement as HTMLElement).dispatchEvent(
                            new CustomEvent<OverlayOpenCloseDetail>(eventName, {
                                bubbles: true,
                                composed: true,
                                detail: { interaction: this.type },
                            })
                        );
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
