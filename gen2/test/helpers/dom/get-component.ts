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
 * Helper to query a single component from the canvas and await its update.
 *
 * @example
 * ```ts
 * const badge = await getComponent<Badge>(canvasElement, 'swc-badge');
 * ```
 *
 * @param canvasElement - The Storybook canvas root element
 * @param selector - CSS selector for the component
 * @returns Promise that resolves to the queried element after its update completes
 */
export async function getComponent<T extends HTMLElement>(
  canvasElement: HTMLElement,
  selector: string
): Promise<T> {
  const el = canvasElement.querySelector(selector) as T;
  if ('updateComplete' in el) {
    await (el as { updateComplete: Promise<boolean> }).updateComplete;
  }
  return el;
}
