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
 * AT-facing focusable element: the inner `<button>` of an open-shadow SWC
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
 * Resolution order: a direct `triggerElement` reference wins; otherwise `for`
 * is resolved by ID within the host's tree root (`getRootNode().getElementById`,
 * strictly same-root). When the resolved trigger exposes an open shadow root,
 * its inner `<button>` becomes the `interactiveElement` that receives ARIA;
 * otherwise ARIA is wired on the trigger itself.
 */
export function resolveTrigger(
  host: HTMLElement,
  options: ResolveTriggerOptions
): ResolvedTrigger {
  let trigger: HTMLElement | null = options.triggerElement ?? null;

  if (!trigger && options.for) {
    // `getRootNode()` returns the Document or the host's ShadowRoot; both expose
    // `getElementById`, keeping resolution strictly within the same tree root.
    const root = host.getRootNode() as Document | ShadowRoot;
    trigger = root.getElementById?.(options.for) ?? null;
  }

  if (!trigger) {
    return { trigger: null, interactiveElement: null };
  }

  // Inner-button discovery: for a 2nd-gen component trigger with an open shadow
  // root, wire ARIA on the AT-facing inner <button>. Closed-shadow or native
  // triggers fall back to the trigger host itself.
  const innerButton = trigger.shadowRoot?.querySelector('button') ?? null;

  return { trigger, interactiveElement: innerButton ?? trigger };
}
