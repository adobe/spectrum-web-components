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
 * CSS selector strings for matching focusable and tabbable DOM elements
 * per the HTML specification.
 *
 * These selectors use standard HTML focusability rules only — the 1st-gen
 * custom `[focusable]` attribute selector is intentionally not included,
 * as native `delegatesFocus` replaces that workaround.
 */

/**
 * Matches elements that can receive focus programmatically (via `.focus()`).
 *
 * Includes elements with `tabindex="-1"` which are focusable via script
 * but not reachable via the Tab key.
 *
 * @example
 * ```typescript
 * const firstFocusable = shadowRoot.querySelector(focusableSelector);
 * ```
 */
export const focusableSelector = [
  'input:not([inert]):not([disabled])',
  'select:not([inert]):not([disabled])',
  'textarea:not([inert]):not([disabled])',
  'a[href]:not([inert])',
  'button:not([inert]):not([disabled])',
  '[tabindex]:not([inert])',
  'audio[controls]:not([inert])',
  'video[controls]:not([inert])',
  '[contenteditable]:not([contenteditable="false"]):not([inert])',
  'details>summary:first-of-type:not([inert])',
  'details:not([inert])',
].join(',');

/**
 * Matches elements reachable via the Tab key.
 *
 * This is a subset of {@link focusableSelector} that excludes elements
 * with `tabindex="-1"` (which are focusable via script but not tabbable).
 *
 * @example
 * ```typescript
 * const tabbableElements = [...container.querySelectorAll(tabbableSelector)];
 * ```
 */
export const tabbableSelector = focusableSelector
  .split(',')
  .map((s) => s + ':not([tabindex="-1"])')
  .join(',');
