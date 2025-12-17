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
import { ReactiveElement } from 'lit';
import { MutationController } from '@lit-labs/observers/mutation-controller.js';

const slotContentIsPresent = Symbol('slotContentIsPresent');

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export interface SlotPresenceObservingInterface {
    slotContentIsPresent: boolean;
    getSlotContentPresence(selector: string): boolean;
    managePresenceObservedSlot(): void;
}

export function ObserveSlotPresence<T extends Constructor<ReactiveElement>>(
    constructor: T,
    lightDomSelector: string | string[]
): T & Constructor<SlotPresenceObservingInterface> {
    const lightDomSelectors = Array.isArray(lightDomSelector)
        ? lightDomSelector
        : [lightDomSelector];
    class SlotPresenceObservingElement
        extends constructor
        implements SlotPresenceObservingInterface
    {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(args);

            new MutationController(this, {
                config: {
                    childList: true,
                    subtree: true,
                },
                callback: () => {
                    this.managePresenceObservedSlot();
                },
            });

            this.managePresenceObservedSlot();
        }

        /**
         *  @internal
         */
        public get slotContentIsPresent(): boolean {
            if (lightDomSelectors.length === 1) {
                return (
                    this[slotContentIsPresent].get(lightDomSelectors[0]) ||
                    false
                );
            } else {
                throw new Error(
                    'Multiple selectors provided to `ObserveSlotPresence` use `getSlotContentPresence(selector: string)` instead.'
                );
            }
        }
        private [slotContentIsPresent]: Map<string, boolean> = new Map();

        /**
         * @internal
         */
        public getSlotContentPresence(selector: string): boolean {
            if (this[slotContentIsPresent].has(selector)) {
                return this[slotContentIsPresent].get(selector) || false;
            }
            throw new Error(
                `The provided selector \`${selector}\` is not being observed.`
            );
        }

        /**
         * @internal
         */
        public managePresenceObservedSlot = (): void => {
            let changes = false;
            lightDomSelectors.forEach((selector) => {
                const nextValue = !!this.querySelector(`:scope > ${selector}`);
                const previousValue =
                    this[slotContentIsPresent].get(selector) || false;
                changes = changes || previousValue !== nextValue;
                this[slotContentIsPresent].set(
                    selector,
                    !!this.querySelector(`:scope > ${selector}`)
                );
            });
            if (changes) {
                this.updateComplete.then(() => {
                    this.requestUpdate();
                });
            }
        };
    }
    return SlotPresenceObservingElement;
}
