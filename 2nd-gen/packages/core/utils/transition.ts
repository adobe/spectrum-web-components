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
 * Whether the element has an active CSS transition.
 *
 * `transition-duration` is comma-separated when multiple properties transition
 * (for example `"0.2s, 0.2s, 0s"`), so this checks that **at least one** entry is
 * non-zero rather than reading only the first value (which `parseFloat` would do).
 * Returns `false` when no transition will run — none declared, or reduced motion
 * has zeroed it out — in which case `transitionend` will not fire and callers
 * should run their completion logic immediately instead of waiting for it.
 *
 * @param element - The element whose computed `transition-duration` is read.
 * @returns `true` when any transition-duration entry is greater than zero.
 */
export function hasActiveTransition(element: Element): boolean {
  return getComputedStyle(element)
    .transitionDuration.split(',')
    .some((duration) => parseFloat(duration) > 0);
}
