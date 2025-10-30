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

import type { PropertyValues, ReactiveElement } from 'lit';

import { property, queryAssignedNodes } from 'lit/decorators.js';
import { MutationController } from '@lit-labs/observers/mutation-controller.js';

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

/**
 * Helper function to check if an element matches excluded selectors.
 */
const notExcluded = (el: HTMLElement) => (selector: string) => {
    return el.matches(selector);
};

/**
 * Filters assigned nodes based on excluded selectors and text content.
 */
function filterAssignedNodes(
    nodes: NodeListOf<HTMLElement>,
    excludedSelectors: string[]
): HTMLElement[] {
    return [...nodes].filter((currentNode) => {
        const node = currentNode as HTMLElement;
        if (node.tagName) {
            return !excludedSelectors.some(notExcluded(node));
        }
        return node.textContent ? node.textContent.trim() : false;
    });
}

/**
 * Filters text nodes from child nodes based on excluded selectors and slot name.
 */
function filterTextNodes(
    childNodes: NodeListOf<ChildNode>,
    excludedSelectors: string[],
    slotName?: string
): Node[] {
    return [...childNodes].filter((currentNode) => {
        const node = currentNode as HTMLElement;
        if (node.tagName) {
            const excluded = excludedSelectors.some(notExcluded(node));
            return !excluded
                ? // This pass happens at element upgrade and before slot rendering.
                  // Confirm it would exist in a targeted slot if there was one supplied.
                  slotName
                    ? node.getAttribute('slot') === slotName
                    : !node.hasAttribute('slot')
                : false;
        }
        return node.textContent ? node.textContent.trim() : false;
    });
}

/**
 * Creates a MutationController to observe character data changes.
 */
function createTextObserver(host: ReactiveElement, callback: () => void): void {
    new MutationController(host, {
        config: { characterData: true, subtree: true },
        callback: (mutationsList: Array<MutationRecord>) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'characterData') {
                    callback();
                    return;
                }
            }
        },
    });
}

export function ObserveSlotText<T extends Constructor<ReactiveElement>>(
    constructor: T,
    slotName?: string,
    excludedSelectors: string[] = []
): T & Constructor<SlotTextObservingInterface> {
    class SlotTextObservingElement
        extends constructor
        implements SlotTextObservingInterface
    {
        @property({ type: Boolean, attribute: false })
        public slotHasContent = false;

        @queryAssignedNodes({ slot: slotName, flatten: true })
        private [assignedNodesList]!: NodeListOf<HTMLElement>;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(args);
            createTextObserver(this, () => this.manageTextObservedSlot());
        }

        public manageTextObservedSlot(): void {
            if (!this[assignedNodesList]) {
                return;
            }
            const assignedNodes = filterAssignedNodes(
                this[assignedNodesList],
                excludedSelectors
            );
            this.slotHasContent = assignedNodes.length > 0;
        }

        protected override update(changedProperties: PropertyValues): void {
            if (!this.hasUpdated) {
                const textNodes = filterTextNodes(
                    this.childNodes,
                    excludedSelectors,
                    slotName
                );
                this.slotHasContent = textNodes.length > 0;
            }
            super.update(changedProperties);
        }

        protected override firstUpdated(
            changedProperties: PropertyValues
        ): void {
            super.firstUpdated(changedProperties);
            void this.updateComplete.then(() => this.manageTextObservedSlot());
        }
    }
    return SlotTextObservingElement;
}
