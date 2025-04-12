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
import { FocusTrap } from 'focus-trap';
import { overlayStack } from './OverlayStack.js';

/**
 * A mixin that adds dialog behavior to an overlay element.
 *
 * @template T - Constructor type extending AbstractOverlay
 * @param {T} constructor - The constructor to extend
 * @returns {T & Constructor<SpectrumElement>} - The extended constructor
 */
export function OverlayDialog<T extends Constructor<AbstractOverlay>>(
    constructor: T
): T & Constructor<SpectrumElement> {
    /**
     * @TODO Block body scroll
     * When a "modal" or "page" type dialog is open, we should prevent the page from scrolling in the background.
     */
    class OverlayWithDialog extends constructor {
        /**
         * Focus trap to keep focus within the dialog
         * @private
         */
        private _focusTrap: FocusTrap | null = null;

        /**
         * Escape key event listener for closing the dialog
         * @private
         */
        private _escListener: ((event: KeyboardEvent) => void) | null = null;

        /**
         * Manages opening and closing the dialog
         * @protected
         * @returns {Promise<void>}
         */
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
            const focusTrap = await import('focus-trap');
            this._focusTrap = focusTrap.createFocusTrap(this.dialogEl, {
                initialFocus: focusEl || undefined,
                tabbableOptions: {
                    getShadowRoot: true,
                },
                returnFocusOnDeactivate: true,
                fallbackFocus: () => this.dialogEl,
                escapeDeactivates: false,
            });

            // If the open state has changed during the delay, do not proceed.
            if (targetOpenState === this.open && !this.open) {
                // If the overlay is closing and the trigger element is still focused, return focus to the trigger element.
                if (
                    this.contains(
                        (this.getRootNode() as Document).activeElement
                    )
                ) {
                    (this.triggerElement as HTMLElement).focus();
                }
                return;
            }
            if (this.open && targetOpenState) {
                try {
                    this._focusTrap.activate();
                } catch (error) {
                    if (window.__swc.DEBUG) {
                        console.error(
                            'Error activating focus trap in dialog:',
                            error
                        );
                    }
                }
                if (this.type === 'modal') {
                    this.setupEscapeListener();
                }
            }
        }

        /**
         * Handles the transition of dialog elements when opening or closing
         *
         * @protected
         * @param {boolean} targetOpenState - Whether the dialog should open or close
         * @returns {Promise<HTMLElement | null>} - The element to focus after transition
         */
        protected async dialogMakeTransition(
            targetOpenState: boolean
        ): Promise<HTMLElement | null> {
            let focusEl = null as HTMLElement | null;
            const start =
                (el: OpenableElement, index: number) =>
                async (): Promise<void> => {
                    el.open = targetOpenState;
                    if (!targetOpenState) {
                        this.cleanupFocusTrap();
                        this.removeEscapeListener();
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

                    if (
                        this.dialogWrapper &&
                        'showPopover' in this.dialogWrapper
                    ) {
                        // Show both the wrapper popover and the dialog
                        this.dialogWrapper.showPopover();

                        /**
                         * Using show() instead of showModal() for performance reasons.
                         * showModal() is a slow operation because it makes all other elements
                         * on the page inert, which can be very expensive for complex DOMs.
                         * For more information, see: PR-5307
                         *
                         * If we ever go back to showModal(), please note that focus should be
                         * handled natively in `<dialog>` elements when leveraging `.showModal()`,
                         * but it's NOT working consistently across browsers:
                         * - Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=255507
                         * - Firefox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1828398
                         * - Recent discussion: https://github.com/whatwg/html/issues/9245
                         */
                        this.dialogEl.show();
                    }
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

                    if (
                        this.dialogWrapper &&
                        'hidePopover' in this.dialogWrapper
                    ) {
                        this.dialogWrapper.hidePopover();
                    }
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

        /**
         * Cleans up the focus trap when dialog is closing
         * @private
         */
        private cleanupFocusTrap(): void {
            if (this._focusTrap) {
                this._focusTrap.deactivate();
                this._focusTrap = null;
            }
        }

        /**
         * Handles component disconnection from the DOM
         * @override
         */
        override disconnectedCallback(): void {
            this.cleanupFocusTrap();
            this.removeEscapeListener();
            super.disconnectedCallback();
        }

        /**
         * Sets up the escape key listener for closing modal dialogs
         * @private
         */
        private setupEscapeListener(): void {
            if (this._escListener) {
                return;
            }

            this._escListener = (event: KeyboardEvent): void => {
                if (
                    event.key === 'Escape' &&
                    this.open &&
                    this.type === 'modal'
                ) {
                    // Only close if this overlay is the topmost in the stack
                    if (overlayStack.isTopmostOverlay(this)) {
                        event.preventDefault();
                        event.stopPropagation();
                        this.open = false;
                    }
                }
            };

            document.addEventListener('keydown', this._escListener, {
                capture: true,
            });
        }

        /**
         * Removes the escape key listener when dialog is closed
         * @private
         */
        private removeEscapeListener(): void {
            if (this._escListener) {
                document.removeEventListener('keydown', this._escListener, {
                    capture: true,
                });
                this._escListener = null;
            }
        }
    }
    return OverlayWithDialog;
}
