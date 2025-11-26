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
import {
    firstFocusableIn,
    firstFocusableSlottedIn,
} from '@spectrum-web-components/shared/src/first-focusable-in.js';
import type { SpectrumElement } from '@spectrum-web-components/base';
import { VirtualTrigger } from './VirtualTrigger.js';
import { Constructor, OpenableElement } from './overlay-types.js';
import {
    guaranteedAllTransitionend,
    nextFrame,
    overlayTimer,
} from './AbstractOverlay.js';
import {
    BeforetoggleClosedEvent,
    BeforetoggleOpenEvent,
    OverlayStateEvent,
} from './events.js';
import type { AbstractOverlay } from './AbstractOverlay.js';
import { userFocusableSelector } from '@spectrum-web-components/shared';

const supportsOverlayAuto = CSS.supports('(overlay: auto)');

function isOpen(el: HTMLElement): boolean {
    let popoverOpen = false;
    try {
        popoverOpen = el.matches(':popover-open');
        // eslint-disable-next-line no-empty
    } catch (error) {}
    let open = false;
    try {
        open = el.matches(':open');
        // eslint-disable-next-line no-empty
    } catch (error) {}
    return popoverOpen || open;
}

export function OverlayPopover<T extends Constructor<AbstractOverlay>>(
    constructor: T
): T & Constructor<SpectrumElement> {
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

        /**
         * A popover should be hidden _after_ it is no longer on top-layer because
         * the position metrics will have changed from when it was originally positioned.
         */
        private async shouldHidePopover(
            targetOpenState: boolean
        ): Promise<void> {
            if (targetOpenState && this.open !== targetOpenState) {
                return;
            }
            const update = async ({
                newState,
            }: { newState?: string } = {}): Promise<void> => {
                if (newState === 'open') {
                    return;
                }
                // When in a parent Overlay, this Overlay may need to position itself
                // while closing in due to the parent _also_ closing which means the
                // location can no longer rely on "top layer over transform" math.
                await this.placementController.resetOverlayPosition();
            };
            if (!isOpen(this.dialogEl)) {
                // The means the Overlay was closed from the outside, it is already off of top-layer
                // so we need to position it in regards to this new state.
                update();
                return;
            }
            // `toggle` is an async event, so it's possible for this handler to run a frame late
            this.dialogEl.addEventListener('toggle', update as EventListener, {
                once: true,
            });
        }

        private shouldShowPopover(targetOpenState: boolean): void {
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
                this.managePosition();
            }
        }

        protected override async ensureOnDOM(
            targetOpenState: boolean
        ): Promise<void> {
            if (!supportsOverlayAuto) {
                await this.shouldHidePopover(targetOpenState);
            }
            this.shouldShowPopover(targetOpenState);
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
                el.open = targetOpenState;
                if (index === 0) {
                    const event = targetOpenState
                        ? BeforetoggleOpenEvent
                        : BeforetoggleClosedEvent;
                    this.dispatchEvent(new event());
                }
                if (!targetOpenState) {
                    return;
                }
                if (el.matches(userFocusableSelector)) {
                    focusEl = el;
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
                            new OverlayStateEvent(eventName, this, {
                                interaction: this.type,
                                publish: false,
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
                    if (this.open !== targetOpenState) {
                        return;
                    }
                    const open = isOpen(this.dialogEl);
                    if (targetOpenState !== true && open && this.isConnected) {
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
