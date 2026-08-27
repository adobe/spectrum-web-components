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

import type { ReactiveController, ReactiveElement } from 'lit';

/**
 * A reactive controller that observes whether slotted content matching
 * given CSS selectors is present in the host's light DOM.
 *
 * Replaces the `ObserveSlotPresence` mixin with a composition-based approach.
 *
 * @example
 * ```typescript
 * class MyComponent extends SpectrumElement {
 *   private slotPresence = new SlotPresenceController(this, '[slot="icon"]');
 *
 *   get hasIcon(): boolean {
 *     return this.slotPresence.isPresent;
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Observing multiple selectors
 * class MyComponent extends SpectrumElement {
 *   private slotPresence = new SlotPresenceController(this, [
 *     '[slot="icon"]',
 *     '[slot="description"]',
 *   ]);
 *
 *   get hasIcon(): boolean {
 *     return this.slotPresence.getPresence('[slot="icon"]');
 *   }
 *
 *   get hasDescription(): boolean {
 *     return this.slotPresence.getPresence('[slot="description"]');
 *   }
 * }
 * ```
 */
export class SlotPresenceController implements ReactiveController {
  private host: ReactiveElement;
  private selectors: string[];
  private presenceMap = new Map<string, boolean>();
  private observer: MutationObserver;

  constructor(host: ReactiveElement, selectors: string | string[]) {
    this.host = host;
    this.selectors = Array.isArray(selectors) ? selectors : [selectors];
    this.host.addController(this);

    this.observer = new MutationObserver(() => {
      this.checkPresence();
    });

    // Check initial state synchronously
    this.checkPresence();
  }

  /**
   * Whether slotted content is present. Use this when observing a single
   * selector. Throws if multiple selectors were provided — use
   * `getPresence(selector)` instead.
   */
  get isPresent(): boolean {
    if (this.selectors.length === 1) {
      return this.presenceMap.get(this.selectors[0]) ?? false;
    }
    throw new Error(
      'Multiple selectors provided to SlotPresenceController — use getPresence(selector) instead.'
    );
  }

  /**
   * Returns whether content matching the given selector is present.
   */
  getPresence(selector: string): boolean {
    if (this.presenceMap.has(selector)) {
      return this.presenceMap.get(selector) ?? false;
    }
    throw new Error(
      `The provided selector \`${selector}\` is not being observed.`
    );
  }

  private checkPresence(): void {
    let changed = false;
    for (const selector of this.selectors) {
      const nextValue = !!this.host.querySelector(`:scope > ${selector}`);
      const previousValue = this.presenceMap.get(selector) ?? false;
      if (previousValue !== nextValue) {
        changed = true;
      }
      this.presenceMap.set(selector, nextValue);
    }
    if (changed) {
      // The `ObserveSlotPresence` mixin this controller replaces deferred the
      // re-render with `this.updateComplete.then(() => this.requestUpdate())`.
      // The controller requests the update synchronously instead. This is
      // safe because `checkPresence` only runs from the constructor, the
      // `MutationObserver` callback, and `hostConnected` — never from inside
      // the host's own `update()`/`render()` — so there is no re-entrant
      // update. Lit batches `requestUpdate()` calls into the next microtask,
      // so multiple presence changes in one tick still coalesce into a single
      // render. See the controller stories for the behavioral test.
      this.host.requestUpdate();
    }
  }

  hostConnected(): void {
    this.observer.observe(this.host, {
      childList: true,
      subtree: true,
    });
    this.checkPresence();
  }

  hostDisconnected(): void {
    this.observer.disconnect();
  }
}
