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
import { ReactiveElement } from '@spectrum-web-components/base';

const slotElementObserver = Symbol('slotElementObserver');
const startObserving = Symbol('startObserving');
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
        implements SlotPresenceObservingInterface {
        private [slotElementObserver]!: MutationObserver;

        /**
         *  @private
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

        public getSlotContentPresence(selector: string): boolean {
            if (this[slotContentIsPresent].has(selector)) {
                return this[slotContentIsPresent].get(selector) || false;
            }
            throw new Error(
                `The provided selector \`\` is not being observed.`
            );
        }

        public managePresenceObservedSlot = (): void => {
            lightDomSelectors.forEach((selector) => {
                this[slotContentIsPresent].set(
                    selector,
                    !!this.querySelector(selector)
                );
            });
            this.requestUpdate();
        };

        private [startObserving](): void {
            const config = { childList: true, subtree: true };
            if (!this[slotElementObserver]) {
                this[slotElementObserver] = new MutationObserver(
                    this.managePresenceObservedSlot
                );
            }
            this[slotElementObserver].observe(this, config);
            this.managePresenceObservedSlot();
        }

        public connectedCallback(): void {
            super.connectedCallback();
            this[startObserving]();
        }

        public disconnectedCallback(): void {
            this[slotElementObserver].disconnect();
            super.disconnectedCallback();
        }
    }
    return SlotPresenceObservingElement;
}
