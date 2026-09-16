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
 * Whether `node` is `ancestor` itself or a descendant of it, crossing shadow
 * boundaries. Walks the composed ancestor chain from `node`, hopping from a
 * `ShadowRoot` to its `host`, so a node inside a slotted custom element's shadow
 * tree is still recognised as contained. Unlike `Node.contains`, which stops at
 * shadow boundaries.
 *
 * Pair with `getActiveElement()` to answer "is focus within this element?" across
 * shadow roots.
 *
 * @param ancestor - The element to test containment against.
 * @param node - The candidate descendant (e.g. the deepest focused element);
 *   `null` returns `false`.
 */
export function deepContains(ancestor: Node, node: Node | null): boolean {
  let current: Node | null = node;
  while (current) {
    if (current === ancestor) {
      return true;
    }
    const parent: Node | null = current.parentNode;
    current = parent instanceof ShadowRoot ? parent.host : parent;
  }
  return false;
}
