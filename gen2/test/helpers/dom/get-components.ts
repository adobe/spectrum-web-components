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
 * Helper to query multiple components from the canvas and await all their updates.
 *
 * @example
 * ```ts
 * const badges = await getComponents<Badge>(canvasElement, 'swc-badge');
 * ```
 *
 * @param canvasElement - The Storybook canvas root element
 * @param selector - CSS selector for the components
 * @returns Promise that resolves to an array of queried elements after all updates complete
 */
export async function getComponents<T extends HTMLElement>(
  canvasElement: HTMLElement,
  selector: string
): Promise<T[]> {
  const elements = Array.from(canvasElement.querySelectorAll(selector)) as T[];
  await Promise.all(
    elements.map((el) =>
      'updateComplete' in el
        ? (el as { updateComplete: Promise<boolean> }).updateComplete
        : Promise.resolve()
    )
  );
  return elements;
}
