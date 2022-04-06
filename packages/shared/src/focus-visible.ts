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

import 'focus-visible';

declare global {
    interface Window {
        applyFocusVisiblePolyfill?: (scope: Document | ShadowRoot) => void;
    }
}

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

interface OptionalLifecycleCallbacks {
    connectedCallback?(): void;
    disconnectedCallback?(): void;
    manageAutoFocus?(): void;
}

export interface FocusVisibleKeyboardActivation {
    shouldAllowKeyboardActivation(event: KeyboardEvent): boolean;
}

type FVConstructor<T extends Constructor<MixableBaseClass>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): InstanceType<T> & FocusVisibleKeyboardActivation;
    prototype: T['prototype'] & FocusVisibleKeyboardActivation;
};

type MixableBaseClass = HTMLElement & OptionalLifecycleCallbacks;

type EndPolyfillCoordinationCallback = () => void;

let hasFocusVisible = true;

try {
    document.body.querySelector(':focus-visible');
} catch (error) {
    hasFocusVisible = false;
}

/**
 * Tests if an element currently has focus-visible state
 * @param el An element to test for focus-visible state
 * @returns true if the element has focus-visible
 */
export function matchFocusVisible(el: HTMLElement): boolean {
    return (
        (hasFocusVisible && el.matches(':focus-visible')) ||
        el.matches('.focus-visible') ||
        el.hasAttribute('data-focus-visible-added')
    );
}

export class KeyboardActivationEvent extends Event {
    constructor(public keyboardEvent: KeyboardEvent) {
        super('keyboard-activation', {
            bubbles: true,
            composed: true,
            cancelable: true,
        });
    }
}

/**
 * This mixin function is designed to be applied to a class that inherits
 * from HTMLElement. It makes it easy for a custom element to coordinate with
 * the :focus-visible polyfill.
 *
 * NOTE(cdata): The code here was adapted from an example proposed with the
 * introduction of ShadowDOM support in the :focus-visible polyfill.
 *
 * @see https://github.com/WICG/focus-visible/pull/196
 * @param {Function} SuperClass The base class implementation to decorate with
 * implementation that coordinates with the :focus-visible polyfill
 */
export const FocusVisiblePolyfillMixin = <
    T extends Constructor<MixableBaseClass>
>(
    SuperClass: T
): FVConstructor<T> => {
    const coordinateWithPolyfill = (
        instance: MixableBaseClass
    ): EndPolyfillCoordinationCallback => {
        // If there is no shadow root, there is no need to coordinate with
        // the polyfill. If we already coordinated with the polyfill, we can
        // skip subsequent invokcations:
        if (
            instance.shadowRoot == null ||
            instance.hasAttribute('data-js-focus-visible')
        ) {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            return () => {};
        }

        // The polyfill might already be loaded. If so, we can apply it to
        // the shadow root immediately:
        if (self.applyFocusVisiblePolyfill) {
            self.applyFocusVisiblePolyfill(instance.shadowRoot);

            if (instance.manageAutoFocus) {
                instance.manageAutoFocus();
            }
        } else {
            const coordinationHandler = (): void => {
                if (self.applyFocusVisiblePolyfill && instance.shadowRoot) {
                    self.applyFocusVisiblePolyfill(instance.shadowRoot);
                }

                if (instance.manageAutoFocus) {
                    instance.manageAutoFocus();
                }
            };
            // Otherwise, wait for the polyfill to be loaded lazily. It might
            // never be loaded, but if it is then we can apply it to the
            // shadow root at the appropriate time by waiting for the ready
            // event:
            self.addEventListener(
                'focus-visible-polyfill-ready',
                coordinationHandler,
                { once: true }
            );

            return () => {
                self.removeEventListener(
                    'focus-visible-polyfill-ready',
                    coordinationHandler
                );
            };
        }

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {};
    };

    const $endPolyfillCoordination = Symbol('endPolyfillCoordination');
    const $receivedFocusWithVisibility = Symbol('receivedFocusWithVisibility');
    // IE11 doesn't natively support custom elements or JavaScript class
    // syntax The mixin implementation assumes that the user will take the
    // appropriate steps to support both:
    class FocusVisibleCoordinator
        extends SuperClass
        implements FocusVisibleKeyboardActivation
    {
        private [$endPolyfillCoordination]: EndPolyfillCoordinationCallback | null =
            null;

        /**
         * Set to true if focus was received with focus-visibility
         */
        private [$receivedFocusWithVisibility] = false;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(...args);

            // when we receive focus, test if we are focus-visible or not
            this.addEventListener('focus', (): void => {
                this[$receivedFocusWithVisibility] = matchFocusVisible(this);
            });
        }

        /**
         * Checks if the element had keyboard driven focus-visible state at the time it
         * received focus. If it did, then keyboard-activation event is dispatched.
         *
         * Consumers of this element may call `preventDefault()` on this event to stop
         * the activation of the control via keyboard.
         *
         * This function should be used within keyboard event handlers for dealing with
         * activation keys like Space, where we want to only activate the control if
         * it has focus-visible state.
         *
         * @returns true if the element had focus-visible at the time of focusing and
         * the keyboard-activation event was not cancelled.
         */
        public shouldAllowKeyboardActivation(event: KeyboardEvent): boolean {
            const hadVisibleFocus = this[$receivedFocusWithVisibility];
            this[$receivedFocusWithVisibility] = matchFocusVisible(this);
            if (!hadVisibleFocus) {
                const allowActivation = this.dispatchEvent(
                    new KeyboardActivationEvent(event)
                );
                return allowActivation;
            }
            return true;
        }

        // Attempt to coordinate with the polyfill when connected to the
        // document:
        connectedCallback(): void {
            super.connectedCallback && super.connectedCallback();
            if (!hasFocusVisible) {
                requestAnimationFrame(() => {
                    if (this[$endPolyfillCoordination] == null) {
                        this[$endPolyfillCoordination] =
                            coordinateWithPolyfill(this);
                    }
                });
            }
        }

        disconnectedCallback(): void {
            super.disconnectedCallback && super.disconnectedCallback();
            // It's important to remove the polyfill event listener when we
            // disconnect, otherwise we will leak the whole element via window:
            if (!hasFocusVisible) {
                requestAnimationFrame(() => {
                    if (this[$endPolyfillCoordination] != null) {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        this[$endPolyfillCoordination]!();
                        this[$endPolyfillCoordination] = null;
                    }
                });
            }
        }
    }

    return FocusVisibleCoordinator as unknown as FVConstructor<T>;
};
