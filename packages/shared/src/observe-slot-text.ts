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
import { PropertyValues, ReactiveElement } from '@spectrum-web-components/base';
import {
    property,
    queryAssignedNodes,
} from '@spectrum-web-components/base/src/decorators.js';
import { MutationController } from '@lit-labs/observers/mutation_controller.js';

const assignedNodesList = Symbol('assignedNodes');

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export interface SlotTextObservingInterface {
    slotHasContent: boolean;
    manageTextObservedSlot(): void;
}

export function ObserveSlotText<T extends Constructor<ReactiveElement>>(
    constructor: T,
    slotName?: string
): T & Constructor<SlotTextObservingInterface> {
    class SlotTextObservingElement
        extends constructor
        implements SlotTextObservingInterface
    {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(args);

            new MutationController(this, {
                config: {
                    characterData: true,
                    subtree: true,
                },
                callback: (mutationsList: Array<MutationRecord>) => {
                    for (const mutation of mutationsList) {
                        if (mutation.type === 'characterData') {
                            this.manageTextObservedSlot();
                            return;
                        }
                    }
                },
            });
        }

        @property({ type: Boolean, attribute: false })
        public slotHasContent = false;

        @queryAssignedNodes(slotName, true)
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

        protected override update(changedProperties: PropertyValues): void {
            if (!this.hasUpdated) {
                const { childNodes } = this;
                const textNodes = [...childNodes].filter((node) => {
                    if ((node as HTMLElement).tagName) {
                        return slotName
                            ? (node as HTMLElement).getAttribute('slot') ===
                                  slotName
                            : !(node as HTMLElement).hasAttribute('slot');
                    }
                    return node.textContent ? node.textContent.trim() : false;
                });
                this.slotHasContent = textNodes.length > 0;
            }
            super.update(changedProperties);
        }

        protected override firstUpdated(
            changedProperties: PropertyValues
        ): void {
            super.firstUpdated(changedProperties);
            this.manageTextObservedSlot();
        }
    }
    return SlotTextObservingElement;
}
