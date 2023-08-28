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
import {
    firstFocusableIn,
    firstFocusableSlottedIn,
} from '@spectrum-web-components/shared/src/first-focusable-in.js';
import { ReactiveElement } from 'lit';
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
    nextFrame,
    overlayTimer,
} from './AbstractOverlay.js';
import type { AbstractOverlay } from './AbstractOverlay.js';

export function OverlayPopover<T extends Constructor<AbstractOverlay>>(
    constructor: T
): T & Constructor<ReactiveElement> {
    class OverlayWithPopover extends constructor {
        protected override async manageDelay(
            targetOpenState: boolean
        ): Promise<void> {
            if (targetOpenState === false || targetOpenState !== this.open) {
                overlayTimer.close(this);
                return;
            }
            if (this.delayed) {
                const cancelled = await overlayTimer.openTimer(this);
                if (cancelled) {
                    this.open = !targetOpenState;
                }
            }
        }

        private async shouldHidePopover(
            targetOpenState: boolean
        ): Promise<void> {
            if (targetOpenState && this.open !== targetOpenState) {
                return;
            }
            // When in a parent Overlay, this Overlay may need to position itself
            // while closing in due to the parent _also_ closing which means the
            // location can no longer rely on "top layer over transform" math.
            await this.placementController.resetOverlayPosition();
        }

        private async shouldShowPopover(
            targetOpenState: boolean
        ): Promise<void> {
            let popoverOpen = false;
            try {
                popoverOpen = this.dialogEl.matches(':popover-open');
                // eslint-disable-next-line no-empty
            } catch (error) {}
            let open = false;
            try {
                open = this.dialogEl.matches(':open');
                // eslint-disable-next-line no-empty
            } catch (error) {}
            if (
                targetOpenState &&
                this.open === targetOpenState &&
                !popoverOpen &&
                !open &&
                this.isConnected
            ) {
                this.dialogEl.showPopover();
                await this.managePosition();
            }
        }

        protected override async ensureOnDOM(
            targetOpenState: boolean
        ): Promise<void> {
            await nextFrame();
            await this.shouldHidePopover(targetOpenState);
            await this.shouldShowPopover(targetOpenState);
            await nextFrame();
        }

        protected override async makeTransition(
            targetOpenState: boolean
        ): Promise<HTMLElement | null> {
            if (this.open !== targetOpenState) {
                return null;
            }
            let focusEl = null as HTMLElement | null;
            const start = (el: OpenableElement, index: number) => (): void => {
                if (typeof el.open !== 'undefined') {
                    el.open = targetOpenState;
                }
                if (index === 0) {
                    const event = targetOpenState
                        ? BeforetoggleOpenEvent
                        : BeforetoggleClosedEvent;
                    this.dispatchEvent(new event());
                }
                if (!targetOpenState) {
                    return;
                }
                focusEl = focusEl || firstFocusableIn(el);
                if (focusEl) {
                    return;
                }
                const childSlots = el.querySelectorAll('slot');
                childSlots.forEach((slot) => {
                    if (!focusEl) {
                        focusEl = firstFocusableSlottedIn(slot);
                    }
                });
            };
            const finish =
                (el: OpenableElement, index: number) =>
                async (): Promise<void> => {
                    if (this.open !== targetOpenState) {
                        return;
                    }
                    const eventName = targetOpenState
                        ? 'sp-opened'
                        : 'sp-closed';
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
                    const reportChange = async (): Promise<void> => {
                        if (this.open !== targetOpenState) {
                            return;
                        }
                        await nextFrame();
                        const hasVirtualTrigger =
                            this.triggerElement instanceof VirtualTrigger;
                        this.dispatchEvent(
                            new Event(eventName, {
                                bubbles: hasVirtualTrigger,
                                composed: hasVirtualTrigger,
                            })
                        );
                        el.dispatchEvent(
                            new CustomEvent<OverlayOpenCloseDetail>(eventName, {
                                bubbles: false,
                                composed: false,
                                detail: { interaction: this.type },
                            })
                        );
                        if (this.triggerElement && !hasVirtualTrigger) {
                            (this.triggerElement as HTMLElement).dispatchEvent(
                                new CustomEvent<OverlayOpenCloseDetail>(
                                    eventName,
                                    {
                                        bubbles: true,
                                        composed: true,
                                        detail: { interaction: this.type },
                                    }
                                )
                            );
                        }
                        this.state = targetOpenState ? 'opened' : 'closed';
                    };
                    if (this.open !== targetOpenState) {
                        return;
                    }
                    let popoverOpen = false;
                    try {
                        popoverOpen = this.dialogEl.matches(':popover-open');
                        // eslint-disable-next-line no-empty
                    } catch (error) {}
                    let open = false;
                    try {
                        open = this.dialogEl.matches(':open');
                        // eslint-disable-next-line no-empty
                    } catch (error) {}
                    if (
                        targetOpenState !== true &&
                        (popoverOpen || open) &&
                        this.isConnected
                    ) {
                        this.dialogEl.addEventListener(
                            'beforetoggle',
                            () => {
                                reportChange();
                            },
                            { once: true }
                        );
                        this.dialogEl.hidePopover();
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
    }
    return OverlayWithPopover;
}
