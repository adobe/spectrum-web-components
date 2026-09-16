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
 * Returns the deepest focused element by traversing shadow DOM boundaries.
 *
 * `document.activeElement` stops at shadow hosts — this utility follows
 * `shadowRoot.activeElement` chains to find the leaf-level focused element.
 *
 * @param root - The document or shadow root to start traversal from.
 *               Defaults to `document`.
 * @returns The deepest focused element, or `null` if nothing is focused.
 *
 * @example
 * ```typescript
 * // Get the truly focused element across all shadow boundaries
 * const active = getActiveElement();
 *
 * // Start traversal from a specific root
 * const active = getActiveElement(el.getRootNode() as Document);
 * ```
 */
export function getActiveElement(
  root: Document | ShadowRoot = document
): HTMLElement | null {
  let current = root.activeElement as HTMLElement | null;
  while (current?.shadowRoot?.activeElement) {
    current = current.shadowRoot.activeElement as HTMLElement;
  }
  return current;
}
