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
 * Walks up the composed ("flat") tree from `start`, yielding each ancestor
 * element in turn. Crosses shadow-root boundaries via `getRootNode().host`,
 * and resolves a slotted node's ancestor via `assignedSlot` *before*
 * `parentElement` — per the CSS flat-tree, a slotted node's inherited
 * properties (e.g. `direction`) flow from the `<slot>` it's rendered
 * through, not from its light-DOM parent, so `parentElement` alone would
 * walk the wrong branch for a slotted element.
 */
export function* walkAncestors(start: Element): Generator<Element> {
  let node: Element = start;
  for (;;) {
    const next: Element | null =
      node.assignedSlot ||
      node.parentElement ||
      (node.getRootNode() as ShadowRoot).host ||
      null;
    if (!next) {
      break;
    }
    yield next;
    node = next;
  }
}
