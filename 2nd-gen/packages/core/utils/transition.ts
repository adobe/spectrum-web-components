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

/**
 * Run `callback` once `element`'s CSS transition settles, or synchronously when
 * no transition will run (none declared, or reduced motion) since neither
 * `transitionend` nor `transitioncancel` will fire in that case. A
 * `transitioncancel` (interrupted transition) settles the callback as promptly
 * as a normal `transitionend`.
 *
 * When `fallback` is `true` (the default) a timer (the longest declared duration
 * plus a small buffer) also settles the callback, covering browsers that skip
 * both transition events for `transition-behavior: allow-discrete` properties
 * (e.g. Firefox). Pass `fallback: false` when no completion-gated work depends on
 * the callback (e.g. an open transition, where a delayed `transitionend` should
 * not be pre-empted by the timer). The listeners and the timer are mutually
 * cancelling, so the callback runs exactly once.
 *
 * @param element - The element whose transition completion is awaited.
 * @param callback - Invoked once when the transition settles.
 * @returns A cancel function that removes the listeners and clears the timer
 *   **without** running the callback. Call it to supersede a pending run (for
 *   example a new open/close cycle) or to clean up on disconnect.
 */
export function runAfterTransition(
  element: Element,
  callback: () => void,
  { fallback = true }: { fallback?: boolean } = {}
): () => void {
  if (!hasActiveTransition(element)) {
    callback();
    return () => {};
  }

  // `event` is present for the transition events and absent for the fallback
  // timer. Ignore transitions bubbling up from descendants (e.g. slotted
  // content) so only the element's own transition settles the callback.
  const settle = (event?: TransitionEvent): void => {
    if (event && event.target !== element) {
      return;
    }
    cancel();
    callback();
  };
  const cancel = (): void => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
    element.removeEventListener('transitionend', settle as EventListener);
    element.removeEventListener('transitioncancel', settle as EventListener);
  };

  const timer = fallback
    ? setTimeout(settle, maxTransitionDurationMs(element) + 100)
    : undefined;
  element.addEventListener('transitionend', settle as EventListener);
  element.addEventListener('transitioncancel', settle as EventListener);

  return cancel;
}
