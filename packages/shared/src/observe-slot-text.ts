/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { PropertyValues, UpdatingElement } from 'lit-element';

const observedSlotElement = Symbol('observedSlotElement');
const slotElementObserver = Symbol('slotElementObserver');
const startObserving = Symbol('startObserving');

type Constructor<T = object> = {
    new (...args: any[]): T;
    prototype: T;
};

export interface SlotTextObservingInterface {
    slotHasContent: boolean;
    manageObservedSlot(): void;
}

export function ObserveSlotText<T extends Constructor<UpdatingElement>>(
    constructor: T,
    slotSelector = '#slot'
): T & Constructor<SlotTextObservingInterface> {
    return class SlotTextObservingElement extends constructor
        implements SlotTextObservingInterface {
        private [observedSlotElement]: HTMLSlotElement | undefined;

        private [slotElementObserver]: MutationObserver;

        public slotHasContent = false;

        public manageObservedSlot(): void {
            this[observedSlotElement] = (this[observedSlotElement] ||
                (this.shadowRoot
                    ? this.shadowRoot.querySelector(slotSelector)
                    : undefined)) as HTMLSlotElement | undefined;
            if (!this[observedSlotElement]) {
                return;
            }
            const slot = this[observedSlotElement] as HTMLSlotElement;
            let assignedNodes = slot.assignedNodes
                ? slot.assignedNodes()
                : [...this.childNodes].filter((node) => {
                      const el = node as HTMLElement;
                      return !el.hasAttribute('slot');
                  });
            assignedNodes = assignedNodes.filter((node) => {
                if ((node as HTMLElement).tagName) {
                    return true;
                }
                return node.textContent ? node.textContent.trim() : false;
            });
            this.slotHasContent = assignedNodes.length > 0;
            this.requestUpdate();
        }

        protected firstUpdated(changedProperties: PropertyValues): void {
            super.firstUpdated(changedProperties);
            this.manageObservedSlot();
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
                            this.manageObservedSlot();
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
    };
}
