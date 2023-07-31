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

export function OverlayNoPopover<T extends Constructor<AbstractOverlay>>(
    constructor: T
): T & Constructor<ReactiveElement> {
    class OverlayWithNoPopover extends constructor {
        protected override async managePopoverOpen(): Promise<void> {
            await this.managePosition();
        }

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

        protected override async ensureOnDOM(
            _targetOpenState: boolean
        ): Promise<void> {
            await nextFrame();
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
    }
    return OverlayWithNoPopover;
}
