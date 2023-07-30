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
    overlayTimer,
} from './AbstractOverlay.js';
import type { AbstractOverlay } from './AbstractOverlay.js';

function nextFrame(): Promise<void> {
    return new Promise((res) => requestAnimationFrame(() => res()));
}

export function OverlayNoPopover<T extends Constructor<AbstractOverlay>>(
    constructor: T
): T & Constructor<ReactiveElement> {
    class OverlayWithNoPopover extends constructor {
        protected override async managePopoverOpen(): Promise<void> {
            const targetOpenState = this.open;
            await this.managePosition();
            if (this.open !== targetOpenState) {
                return;
            }
            await this.manageDelay(targetOpenState);
            if (this.open !== targetOpenState) {
                return;
            }
            await this.ensureOnDOM();
            if (this.open !== targetOpenState) {
                return;
            }
            const focusEl = await this.makeTransition(targetOpenState);
            if (this.open !== targetOpenState) {
                return;
            }
            await this.applyFocus(targetOpenState, focusEl);
        }

        private async manageDelay(targetOpenState: boolean): Promise<void> {
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

        private async ensureOnDOM(): Promise<void> {
            await nextFrame();
            await nextFrame();
        }

        private async makeTransition(
            targetOpenState: boolean
        ): Promise<HTMLElement | null> {
            if (this.open !== targetOpenState) {
                return null;
            }
            let focusEl = null as HTMLElement | null;
            const start = (el: OpenableElement, index: number) => (): void => {
                if (targetOpenState !== this.open) {
                    return;
                }
                if (typeof el.open !== 'undefined') {
                    el.open = targetOpenState;
                }
                if (index === 0) {
                    const event = targetOpenState
                        ? BeforetoggleOpenEvent
                        : BeforetoggleClosedEvent;
                    this.dispatchEvent(new event());
                }
                if (targetOpenState !== true) {
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
            const finish = (el: OpenableElement, index: number) => (): void => {
                if (this.open !== targetOpenState) {
                    return;
                }
                const eventName = targetOpenState ? 'sp-opened' : 'sp-closed';
                this.isVisible = this.isVisible && targetOpenState;
                el.dispatchEvent(
                    new CustomEvent<OverlayOpenCloseDetail>(eventName, {
                        bubbles: false,
                        composed: false,
                        detail: { interaction: this.type },
                    })
                );
                if (index > 0) {
                    return;
                }
                const hasVirtualTrigger =
                    this.triggerElement instanceof VirtualTrigger;
                this.dispatchEvent(
                    new Event(eventName, {
                        bubbles: hasVirtualTrigger,
                        composed: hasVirtualTrigger,
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
            this.elements.forEach((el, index) => {
                guaranteedAllTransitionend(
                    el,
                    start(el, index),
                    finish(el, index)
                );
            });
            return focusEl;
        }

        private async applyFocus(
            targetOpenState: boolean,
            focusEl: HTMLElement | null
        ): Promise<void> {
            // Do not move focus when explicitly told not to
            // and when the Overlay is a "hint"
            if (this.receivesFocus === 'false' || this.type === 'hint') {
                return;
            }

            await nextFrame();
            await nextFrame();
            if (targetOpenState === this.open && !this.open) {
                if (
                    // Only return focus when the trigger is not "virtual"
                    this.triggerElement &&
                    !(this.triggerElement instanceof VirtualTrigger)
                ) {
                    if (
                        this.contains(
                            (this.getRootNode() as Document).activeElement
                        )
                    ) {
                        this.triggerElement.focus();
                    }
                }
                return;
            }

            focusEl?.focus();
        }
    }
    return OverlayWithNoPopover;
}
