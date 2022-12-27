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
import {
    BeforetoggleClosedEvent,
    BeforetoggleOpenEvent,
    OpenableElement,
    OverlayBase,
} from './OverlayBase.js';

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export function OverlayNoPopover<T extends Constructor<OverlayBase>>(
    constructor: T
): T & Constructor<ReactiveElement> {
    class OverlayWithNoPopover extends constructor {
        protected override async managePopoverOpen(): Promise<void> {
            const doClose = (
                cb = () => {
                    return;
                }
            ): void => {
                this.elements[0]?.addEventListener('transitionend', cb, {
                    once: true,
                });
                this.manageChildren(false);
                this.dispatchEvent(new BeforetoggleClosedEvent());
            };
            if (this.open) {
                await this.managePosition();
                // we can acquire overlay position
                requestAnimationFrame(() => {
                    requestAnimationFrame(async () => {
                        let focusEl = null as HTMLElement | null;
                        this.elements.forEach(
                            (element: OpenableElement): void => {
                                if (typeof element.open !== 'undefined') {
                                    element.open = true;
                                }
                                if (!focusEl) {
                                    focusEl = firstFocusableIn(element);
                                }
                                if (!focusEl) {
                                    const childSlots =
                                        element.querySelectorAll('slot');
                                    childSlots.forEach((slot) => {
                                        if (!focusEl) {
                                            focusEl =
                                                firstFocusableSlottedIn(slot);
                                        }
                                    });
                                }
                            }
                        );
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                this.manageChildren(true);
                                if (focusEl) focusEl.focus();
                                this.dispatchEvent(new BeforetoggleOpenEvent());
                            });
                        });
                    });
                });
            } else {
                doClose();
            }
        }
    }
    return OverlayWithNoPopover;
}
