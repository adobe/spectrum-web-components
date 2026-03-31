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
 * Extracts a text label from a slot's assigned nodes.
 *
 * When `label` is already provided (non-empty string), returns `null` so that
 * an explicit label always takes precedence over slotted content.
 *
 * @param label - An existing label value. If truthy, the function short-circuits
 *   and returns `null`.
 * @param slotEl - The `<slot>` element whose assigned nodes to read
 * @returns The trimmed concatenated text content, or `null` when no text is
 *   found or when `label` already has a value
 */
export const getLabelFromSlot = (
  label: string,
  slotEl: HTMLSlotElement
): string | null => {
  if (label) {
    return null;
  }
  const textContent = slotEl
    .assignedNodes()
    .reduce((accumulator: string, node: Node) => {
      if (node.textContent) {
        return accumulator + node.textContent;
      } else {
        return accumulator;
      }
    }, '');
  if (textContent) {
    return textContent.trim();
  } else {
    return null;
  }
};
