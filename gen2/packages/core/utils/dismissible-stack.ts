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

/**
 * A LIFO stack of currently-open dismissible top-layer components, used to
 * coordinate Escape handling across mechanisms that don't natively order with
 * each other (e.g. an `popover="auto"` element open while a `<dialog>` is also
 * open).
 *
 * Usage convention for consumers:
 *
 * - `registerDismissible(this)` on open.
 * - `unregisterDismissible(this)` on close and in `disconnectedCallback`.
 * - Check `isTopDismissible(this)` before processing any custom Escape handling.
 *
 * State is module-level and in-memory only; it resets on page reload, which is
 * correct for this coordination use case.
 *
 */
const dismissibleStack: object[] = [];

/**
 * Register a dismissible as the topmost entry when it opens. Any existing entry
 * for the same key is removed first, so re-registering moves the key to the top
 * and the stack never holds duplicates.
 */
export function registerDismissible(key: object): void {
  unregisterDismissible(key);
  dismissibleStack.push(key);
}

/**
 * Remove the most-recent entry matching the key when it closes. Idempotent: a
 * key that is not present is a no-op (safe to call from `disconnectedCallback`).
 */
export function unregisterDismissible(key: object): void {
  const index = dismissibleStack.lastIndexOf(key);
  if (index !== -1) {
    dismissibleStack.splice(index, 1);
  }
}

/**
 * Whether the key is the topmost (most-recently-registered) dismissible.
 */
export function isTopDismissible(key: object): boolean {
  // Index access rather than `Array.prototype.at()`: core's TS lib target does
  // not include `at`. On an empty stack `length - 1` is `-1`, which reads as
  // `undefined` and never equals a (non-null) key.
  return dismissibleStack[dismissibleStack.length - 1] === key;
}
