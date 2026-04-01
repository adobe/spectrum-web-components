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
import { ReactiveElement } from 'lit';

import type { Constructor } from '../types.js';

const slotContentIsPresent = Symbol('slotContentIsPresent');

export interface SlotPresenceObservingInterface {
  slotContentIsPresent: boolean;
  getSlotContentPresence(selector: string): boolean;
  managePresenceObservedSlot(): void;
}

/**
 * Mixin that observes whether direct-child elements matching the given CSS
 * selector(s) are present in the host's light DOM.
 *
 * @param constructor - The base class to extend
 * @param lightDomSelector - One or more CSS selectors to observe. When a single
 *   selector is provided, the result is available via `slotContentIsPresent`.
 *   When multiple selectors are provided, use
 *   `getSlotContentPresence(selector)` to query each individually.
 * @returns A class that implements {@link SlotPresenceObservingInterface}
 */
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
    private presenceObserver = new MutationObserver(() => {
      this.managePresenceObservedSlot();
    });

    public override connectedCallback(): void {
      super.connectedCallback();
      this.presenceObserver.observe(this, {
        childList: true,
        subtree: true,
      });
      this.managePresenceObservedSlot();
    }

    public override disconnectedCallback(): void {
      this.presenceObserver.disconnect();
      super.disconnectedCallback();
    }

    /**
     *  @internal
     */
    public get slotContentIsPresent(): boolean {
      if (lightDomSelectors.length === 1) {
        return this[slotContentIsPresent].get(lightDomSelectors[0]) || false;
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
        const previousValue = this[slotContentIsPresent].get(selector) || false;
        changes = changes || previousValue !== nextValue;
        this[slotContentIsPresent].set(selector, nextValue);
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
