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

// For watching a custom element's *own* attributes, prefer the native
// `static observedAttributes` + `attributeChangedCallback` idiom (see
// Tooltip.ts) instead of this module; no observer object is needed for that
// case. This module is for watching *other* elements (ancestors,
// `document.documentElement`, etc.), which that native callback can't reach.

type AttributeChangeListener = () => void;

// One shared `MutationObserver` for every (target, attribute) pair registered
// through `observeAttribute()`, regardless of caller. `MutationObserver` has
// no `unobserve()` API, so removing a target/attribute requires
// `disconnect()`-ing and re-`observe()`-ing everything that's left; that only
// happens on registration changes (component mount/unmount), not per-mutation.
const registry = new Map<Element, Map<string, Set<AttributeChangeListener>>>();
let sharedObserver: MutationObserver | undefined;

function processRecords(records: MutationRecord[]): void {
  for (const record of records) {
    const listeners = registry
      .get(record.target as Element)
      ?.get(record.attributeName as string);
    listeners?.forEach((listener) => listener());
  }
}

// Adds or updates the observation for a single target. Calling `observe()`
// again on a target the observer already watches replaces that target's
// filter in place; it has no effect on any other target's observation, so
// this never needs to touch the rest of the registry.
function observeTarget(
  target: Element,
  attributes: Map<string, Set<AttributeChangeListener>>
): void {
  if (!sharedObserver) {
    sharedObserver = new MutationObserver(processRecords);
  }
  sharedObserver.observe(target, {
    attributes: true,
    attributeFilter: Array.from(attributes.keys()),
  });
}

// `MutationObserver` has no per-target `unobserve()`, so fully dropping a
// target/attribute requires disconnecting and re-observing everything that's
// left. Only removal needs this; adding a target/attribute can reuse the
// existing observer via `observeTarget()` above.
function reconnectAll(): void {
  if (sharedObserver) {
    // `disconnect()` discards any records already queued but not yet
    // delivered to the callback, so a mutation that lands right before an
    // unrelated component's unmount triggers `reconnectAll()` would
    // otherwise be silently dropped. Drain and process them first.
    processRecords(sharedObserver.takeRecords());
    sharedObserver.disconnect();
  }

  if (registry.size === 0) {
    sharedObserver = undefined;
    return;
  }

  sharedObserver = new MutationObserver(processRecords);
  for (const [target, attributes] of registry) {
    sharedObserver.observe(target, {
      attributes: true,
      attributeFilter: Array.from(attributes.keys()),
    });
  }
}

/**
 * Notifies `listener` whenever `attribute` changes on `target`, sharing a
 * single `MutationObserver` across every caller/target/attribute combination
 * rather than allocating one observer per caller. Returns an unsubscribe
 * function; call it (e.g. from `disconnectedCallback`) to stop listening.
 */
export function observeAttribute(
  target: Element,
  attribute: string,
  listener: AttributeChangeListener
): () => void {
  let attributes = registry.get(target);
  const isNewTarget = !attributes;
  if (!attributes) {
    attributes = new Map();
    registry.set(target, attributes);
  }

  let listeners = attributes.get(attribute);
  const isNewAttribute = !listeners;
  if (!listeners) {
    listeners = new Set();
    attributes.set(attribute, listeners);
  }

  listeners.add(listener);
  // A target/attribute pair already being observed just gets another
  // listener added to its existing `Set`; no observer change needed.
  if (isNewTarget || isNewAttribute) {
    observeTarget(target, attributes);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      attributes.delete(attribute);
      if (attributes.size === 0) {
        registry.delete(target);
      }
      reconnectAll();
    }
  };
}
