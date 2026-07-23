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
import { property } from 'lit/decorators.js';
import { MutationController } from '@lit-labs/observers/mutation-controller.js';

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
  slotName?: string,
  excludedSelectors: string[] = []
): T & Constructor<SlotTextObservingInterface> {
  const notExcluded = (el: HTMLElement) => (selector: string) => {
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
          childList: true,
          subtree: true,
        },
        callback: (mutationsList: Array<MutationRecord>) => {
          for (const mutation of mutationsList) {
            if (
              mutation.type === 'characterData' ||
              mutation.type === 'childList'
            ) {
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

    /**
     * @internal
     *
     * Reads the observed slot's assigned nodes directly from the rendered
     * `<slot>` element, rather than via the `@queryAssignedNodes` decorator
     * — that decorator doesn't resolve correctly against a computed
     * (`Symbol`-keyed) class field, always returning `undefined`.
     */
    private getAssignedNodes(): Node[] {
      const slotSelector = `slot${slotName ? `[name=${slotName}]` : ':not([name])'}`;
      const slotEl =
        this.renderRoot?.querySelector<HTMLSlotElement>(slotSelector);
      return slotEl ? slotEl.assignedNodes({ flatten: true }) : [];
    }

    /**
     * @internal
     */
    public manageTextObservedSlot(): void {
      const assignedNodes = this.getAssignedNodes().filter((currentNode) => {
        const node = currentNode as HTMLElement;
        if (node.tagName) {
          return !excludedSelectors.some(notExcluded(node));
        }
        return node.textContent ? node.textContent.trim() : false;
      });
      this.slotHasContent = assignedNodes.length > 0;
    }

    protected override update(changedProperties: PropertyValues): void {
      if (!this.hasUpdated) {
        const { childNodes } = this;
        const textNodes = [...childNodes].filter((currentNode) => {
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
