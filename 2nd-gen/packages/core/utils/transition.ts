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
 * Parse an element's computed `transition-duration` into milliseconds per entry.
 * The value is comma-separated when multiple properties transition (for example
 * `"0.2s, 0.2s, 0s"`), so each entry is parsed independently rather than reading
 * only the first (which `parseFloat` of the whole string would do).
 */
function transitionDurationsMs(element: Element): number[] {
  return getComputedStyle(element)
    .transitionDuration.split(',')
    .map((entry) => {
      const trimmed = entry.trim();
      const value = parseFloat(trimmed);
      if (Number.isNaN(value)) {
        return 0;
      }
      return trimmed.endsWith('ms') ? value : value * 1000;
    });
}

/**
 * Whether the element has an active CSS transition — i.e. at least one
 * `transition-duration` entry is non-zero. Returns `false` when no transition
 * will run (none declared, or reduced motion has zeroed it out), in which case
 * `transitionend` will not fire and callers should run their completion logic
 * immediately instead of waiting for it.
 *
 * @param element - The element whose computed `transition-duration` is read.
 */
export function hasActiveTransition(element: Element): boolean {
  return transitionDurationsMs(element).some((ms) => ms > 0);
}

/**
 * The longest `transition-duration` on the element, in milliseconds. Useful as a
 * fallback timeout for browsers that do not fire `transitionend` for
 * `transition-behavior: allow-discrete` discrete properties.
 *
 * @param element - The element whose computed `transition-duration` is read.
 */
export function maxTransitionDurationMs(element: Element): number {
  return Math.max(0, ...transitionDurationsMs(element));
}
