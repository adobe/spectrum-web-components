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
 * Options for {@link resolveTrigger}.
 */
export interface ResolveTriggerOptions {
  /** ID of the trigger element in the host's tree root. */
  for?: string;
  /** Direct trigger reference; overrides `for` when set. */
  triggerElement?: HTMLElement | null;
}

/**
 * The resolved trigger and the element that should receive ARIA wiring.
 *
 * `trigger` is the element used for positioning. `interactiveElement` is the
 * AT-facing focusable element — the inner `<button>` of an open-shadow SWC
 * component when present, otherwise the trigger itself.
 */
export interface ResolvedTrigger {
  trigger: HTMLElement | null;
  interactiveElement: HTMLElement | null;
}

/**
 * Resolve the trigger for a popover-like host and discover the AT-facing inner
 * button across shadow boundaries.
 *
 * @todo Phase 3 (API): implement `for=` resolution via
 * `host.getRootNode().getElementById()`, the `triggerElement` override, and
 * inner-button discovery (`trigger.shadowRoot?.querySelector('button')`).
 */
export function resolveTrigger(
  _host: HTMLElement,
  _options: ResolveTriggerOptions
): ResolvedTrigger {
  return { trigger: null, interactiveElement: null };
}
