/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { PropertyValues, ReactiveElement } from 'lit';
import { property, queryAssignedNodes } from 'lit/decorators.js';
import { MutationController } from '@lit-labs/observers/mutation-controller.js';

import type { Constructor } from '../types.js';

const assignedNodesList = Symbol('assignedNodes');

export interface SlotTextObservingInterface {
  slotHasContent: boolean;
  manageTextObservedSlot(): void;
}

/**
 * Mixin that observes whether a slot contains meaningful text content,
 * exposing the result via the `slotHasContent` property.
 *
 * @param constructor - The base class to extend
 * @param slotName - The named slot to observe. When omitted, the default slot
 *   is observed.
 * @param excludedSelectors - CSS selectors for child elements that should be
 *   ignored when determining whether the slot has content.
 * @returns A class that implements {@link SlotTextObservingInterface}
 */
export function ObserveSlotText<T extends Constructor<ReactiveElement>>(
  constructor: T,
  slotName?: string,
  excludedSelectors: string[] = []
): T & Constructor<SlotTextObservingInterface> {
  const matchesExclusion = (el: HTMLElement) => (selector: string) => {
    return el.matches(selector);
  };

  class SlotTextObservingElement
    extends constructor
    implements SlotTextObservingInterface
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);

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

    /**
     * @internal
     */
    @property({ type: Boolean, attribute: false })
    public slotHasContent = false;

    @queryAssignedNodes({
      slot: slotName,
      flatten: true,
    })
    private [assignedNodesList]!: NodeListOf<HTMLElement>;

    /**
     * @internal
     */
    public manageTextObservedSlot(): void {
      if (!this[assignedNodesList]) {
        return;
      }
      const assignedNodes = [...this[assignedNodesList]].filter(
        (currentNode) => {
          const node = currentNode as HTMLElement;
          if (node.tagName) {
            return !excludedSelectors.some(matchesExclusion(node));
          }
          return node.textContent ? node.textContent.trim() : false;
        }
      );
      this.slotHasContent = assignedNodes.length > 0;
    }

    protected override update(changedProperties: PropertyValues): void {
      if (!this.hasUpdated) {
        const { childNodes } = this;
        const textNodes = [...childNodes].filter((currentNode) => {
          const node = currentNode as HTMLElement;
          if (node.tagName) {
            const excluded = excludedSelectors.some(matchesExclusion(node));
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
        this.slotHasContent = textNodes.length > 0;
      }
      super.update(changedProperties);
    }

    protected override firstUpdated(changedProperties: PropertyValues): void {
      super.firstUpdated(changedProperties);
      this.updateComplete.then(() => {
        this.manageTextObservedSlot();
      });
    }
  }
  return SlotTextObservingElement;
}
