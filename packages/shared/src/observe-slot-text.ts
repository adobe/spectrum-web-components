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
    PropertyValues,
    UpdatingElement,
    queryAssignedNodes,
    property,
} from '@spectrum-web-components/base';

const slotElementObserver = Symbol('slotElementObserver');
const assignedNodesList = Symbol('assinedNodes');
const startObserving = Symbol('startObserving');

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export interface SlotTextObservingInterface {
    slotHasContent: boolean;
    manageTextObservedSlot(): void;
}

export function ObserveSlotText<T extends Constructor<UpdatingElement>>(
    constructor: T,
    slotSelector?: string
): T & Constructor<SlotTextObservingInterface> {
    class SlotTextObservingElement extends constructor
        implements SlotTextObservingInterface {
        private [slotElementObserver]: MutationObserver;

        @property({ type: Boolean, attribute: false })
        public slotHasContent = false;

        @queryAssignedNodes(slotSelector)
        private [assignedNodesList]!: NodeListOf<HTMLElement>;

        public manageTextObservedSlot(): void {
            if (!this[assignedNodesList]) return;
            const assignedNodes = [...this[assignedNodesList]].filter(
                (node) => {
                    if ((node as HTMLElement).tagName) {
                        return true;
                    }
                    return node.textContent ? node.textContent.trim() : false;
                }
            );
            this.slotHasContent = assignedNodes.length > 0;
        }

        protected firstUpdated(changedProperties: PropertyValues): void {
            super.firstUpdated(changedProperties);
            this.manageTextObservedSlot();
        }

        private [startObserving](): void {
            const config = { characterData: true, subtree: true };
            if (!this[slotElementObserver]) {
                const callback = (
                    mutationsList: Array<MutationRecord>
                ): void => {
                    for (const mutation of mutationsList) {
                        /* istanbul ignore else */
                        if (mutation.type === 'characterData') {
                            this.manageTextObservedSlot();
                        }
                    }
                };
                this[slotElementObserver] = new MutationObserver(callback);
            }
            this[slotElementObserver].observe(this, config);
        }

        public connectedCallback(): void {
            super.connectedCallback();
            this[startObserving]();
        }

        public disconnectedCallback(): void {
            /* istanbul ignore else */
            if (this[slotElementObserver]) {
                this[slotElementObserver].disconnect();
            }
            super.disconnectedCallback();
        }
    }
    return SlotTextObservingElement;
}
