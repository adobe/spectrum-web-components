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
import { UpdatingElement, property } from '@spectrum-web-components/base';

const slotElementObserver = Symbol('slotElementObserver');
const startObserving = Symbol('startObserving');

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export interface SlotPresenceObservingInterface {
    slotContentIsPresent: boolean;
    managePresenceObservedSlot(): void;
}

export function ObserveSlotPresence<T extends Constructor<UpdatingElement>>(
    constructor: T,
    lightDomSelector: string
): T & Constructor<SlotPresenceObservingInterface> {
    class SlotPresenceObservingElement extends constructor
        implements SlotPresenceObservingInterface {
        private [slotElementObserver]!: MutationObserver;

        @property({ type: Boolean, attribute: false })
        public slotContentIsPresent = false;

        public managePresenceObservedSlot = (): void => {
            this.slotContentIsPresent = !!this.querySelector(lightDomSelector);
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
