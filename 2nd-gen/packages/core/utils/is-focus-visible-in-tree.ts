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

import { getActiveElement } from './get-active-element.js';

/**
 * Returns whether the deepest focused element in a tree is matched by
 * `:focus-visible` (i.e. the platform would show a focus ring).
 *
 * Traverses shadow DOM boundaries via {@link getActiveElement} before testing
 * the pseudo-class, so it reports the truly focused element rather than stopping
 * at a shadow host.
 *
 * @param root - The document or shadow root to start traversal from. Pass a
 *               component's root node (`el.getRootNode()`) to scope the check to
 *               that tree. Defaults to `document`.
 * @returns `true` if the active element matches `:focus-visible`, otherwise `false`.
 *
 * @example
 * ```typescript
 * // Inside a component, mirror focus-visible state to a reactive property.
 * this.focused = isFocusVisibleInTree(
 *   this.getRootNode() as Document | ShadowRoot
 * );
 * ```
 */
export function isFocusVisibleInTree(
  root: Document | ShadowRoot = document
): boolean {
  const active = getActiveElement(root);
  return active?.matches(':focus-visible') ?? false;
}
