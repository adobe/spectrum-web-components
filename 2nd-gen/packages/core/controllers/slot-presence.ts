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
 * A reactive controller that observes whether direct-child elements matching
 * the given CSS selector(s) are present in the host's light DOM.
 *
 * Uses a `MutationObserver` on `childList` and `subtree` to detect when
 * slotted children are added or removed, then queries the host for each
 * selector via `:scope >`.
 *
 * When a single selector is provided, use the `isPresent` getter for
 * convenience. When multiple selectors are provided, use `has(selector)`.
 *
 * @example
 * ```typescript
 * // Single selector
 * class MyComponent extends SpectrumElement {
 *     private slotPresence = new SlotPresenceController(this, '[slot="icon"]');
 *
 *     protected get hasIcon(): boolean {
 *         return this.slotPresence.isPresent;
 *     }
 * }
 *
 * // Multiple selectors
 * class DialogComponent extends SpectrumElement {
 *     private slotPresence = new SlotPresenceController(this, [
 *         '[slot="hero"]',
 *         '[slot="footer"]',
 *         '[slot="button"]',
 *     ]);
 *
 *     protected get hasHero(): boolean {
 *         return this.slotPresence.has('[slot="hero"]');
 *     }
 * }
 * ```
 */
export class SlotPresenceController implements ReactiveController {
  private host: ReactiveElement;
  private selectors: string[];
  private presence: Map<string, boolean> = new Map();
  private observer = new MutationObserver(() => {
    this.update();
  });

  constructor(host: ReactiveElement, selector: string | string[]) {
    this.host = host;
    this.selectors = Array.isArray(selector) ? selector : [selector];
    this.host.addController(this);
  }

  /**
   * Convenience getter for single-selector usage. Returns whether a direct
   * child matching the selector is present.
   *
   * @throws When multiple selectors were provided — use `has(selector)` instead.
   */
  public get isPresent(): boolean {
    if (this.selectors.length === 1) {
      return this.presence.get(this.selectors[0]) || false;
    }
    throw new Error(
      'Multiple selectors provided to `SlotPresenceController` — use `has(selector)` instead.'
    );
  }

  /**
   * Returns whether a direct child matching the given selector is present.
   *
   * @param selector - One of the selectors provided at construction time
   * @throws When the selector was not registered at construction
   */
  public has(selector: string): boolean {
    if (this.presence.has(selector)) {
      return this.presence.get(selector) || false;
    }
    throw new Error(
      `The provided selector \`${selector}\` is not being observed.`
    );
  }

  public hostConnected(): void {
    this.observer.observe(this.host, {
      childList: true,
      subtree: true,
    });
    this.update();
  }

  public hostDisconnected(): void {
    this.observer.disconnect();
  }

  private update(): void {
    let changed = false;
    for (const selector of this.selectors) {
      const next = !!this.host.querySelector(`:scope > ${selector}`);
      const prev = this.presence.get(selector) || false;
      if (next !== prev) {
        changed = true;
      }
      this.presence.set(selector, next);
    }
    if (changed) {
      this.host.requestUpdate();
    }
  }
}
