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

export function OverlayNoPopover<T extends Constructor<AbstractOverlay>>(
    constructor: T
): T & Constructor<SpectrumElement> {
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
            // force the browser to paint
            document.body.offsetHeight;
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
                el.open = targetOpenState;
                if (index === 0) {
                    const event = targetOpenState
                        ? BeforetoggleOpenEvent
                        : BeforetoggleClosedEvent;
                    this.dispatchEvent(new event());
                }
                if (targetOpenState !== true) {
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
                    el.dispatchEvent(
                        new OverlayStateEvent(eventName, this, {
                            interaction: this.type,
                        })
                    );
                    if (index > 0) {
                        return;
                    }
                    const hasVirtualTrigger =
                        this.triggerElement instanceof VirtualTrigger;
                    this.dispatchEvent(
                        new OverlayStateEvent(eventName, this, {
                            interaction: this.type,
                            publish: hasVirtualTrigger,
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
