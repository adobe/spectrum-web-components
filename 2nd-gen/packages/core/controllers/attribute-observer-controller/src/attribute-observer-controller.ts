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

import { isDebug } from '@adobe/spectrum-wc-core/utils/index.js';

/**
 * Options for {@link AttributeObserverController}.
 */
export interface AttributeObserverControllerOptions {
  /**
   * When `true`, the observer is only attached while dev-mode validation is
   * active (`isDebug()`), so it costs nothing in production. Use this when the
   * only reason to watch the attributes is to re-run a dev warning. Default:
   * `false` (always observe).
   */
  debugOnly?: boolean;
}

/**
 * A reactive controller that watches a set of host attributes and requests a
 * host re-render whenever one of them changes. It exists for state that lives
 * in plain HTML attributes rather than reactive properties, for example
 * `aria-label` / `aria-labelledby`: because those are not declared as Lit
 * `@property`s, mutating them does not trigger Lit's update cycle, so any
 * `updated()` logic that reads them would otherwise go stale.
 *
 * Like {@link SlotPresenceController}, it observes with a `MutationObserver` and
 * calls `host.requestUpdate()` on change; the host's own `updated()` then
 * re-runs and re-reads the attributes. The controller intentionally holds no
 * state and makes no decisions about the attributes it watches.
 *
 * @example
 * ```typescript
 * // Re-run a dev-only accessible-name warning when the aria attributes change.
 * class MyComponent extends SpectrumElement {
 *   private nameObserver = new AttributeObserverController(
 *     this,
 *     ['aria-label', 'aria-labelledby'],
 *     { debugOnly: true }
 *   );
 *
 *   protected override updated(changes: PropertyValues): void {
 *     super.updated(changes);
 *     if (isDebug()) {
 *       this.warnIfMissingAccessibleName();
 *     }
 *   }
 * }
 * ```
 */
export class AttributeObserverController implements ReactiveController {
  private host: ReactiveElement;
  private attributeFilter: string[];
  private debugOnly: boolean;
  private observer: MutationObserver;

  constructor(
    host: ReactiveElement,
    attributes: string | string[],
    options: AttributeObserverControllerOptions = {}
  ) {
    this.host = host;
    this.attributeFilter = Array.isArray(attributes)
      ? attributes
      : [attributes];
    this.debugOnly = options.debugOnly ?? false;
    this.host.addController(this);

    this.observer = new MutationObserver(() => {
      // Lit batches `requestUpdate()` into the next microtask, so several
      // attribute changes in one tick still coalesce into a single re-render.
      this.host.requestUpdate();
    });
  }

  hostConnected(): void {
    // When only used to drive a dev warning, skip observing entirely in
    // production (and SSR) so there is zero runtime cost there.
    if (this.debugOnly && !isDebug()) {
      return;
    }
    this.observer.observe(this.host, {
      attributes: true,
      attributeFilter: this.attributeFilter,
    });
  }

  hostDisconnected(): void {
    this.observer.disconnect();
  }
}
