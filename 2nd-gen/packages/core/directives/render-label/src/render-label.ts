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

import { html, nothing, type TemplateResult } from 'lit';

/** Return type of {@link renderFieldLabel}: the label template, or `nothing`. */
export type RenderFieldLabelResult = TemplateResult | typeof nothing;

/** Options accepted by {@link renderFieldLabel}. */
export interface RenderFieldLabelOptions {
  /** Whether slotted `label` content is present in the host's light DOM. */
  hasLabelSlotContent: boolean;

  /**
   * The `id` of the field's role element (e.g. the `<input>`). When set, the
   * slotted label is the field's active accessible-name source and renders as
   * a real `<label for>`, giving native click-to-focus. When `null` (a
   * higher-precedence source, `accessible-labelledby` or `accessible-label`,
   * is active instead), the label renders as a plain, non-`for` `<span>`:
   * still visible, but excluded from the accessible-name computation so it
   * doesn't create a conflicting second name.
   */
  forId: string | null;
}

/**
 * Renders the shared field-label markup used by labelling-capable components.
 * Returns `nothing` when there is no slotted `label` content, so callers can
 * interpolate unconditionally: `${renderFieldLabel({ hasLabelSlotContent, forId })}`.
 *
 * Most consumers do not call this directly: `LabellingMixin` exposes
 * `renderLabel()`, which calls this with the mixin's own resolved state. Use
 * this directive directly only for stateless label rendering without the mixin.
 *
 * This is render-only and carries no design-token dependency. Pair it with a
 * shared field-label style fragment that themes the `swc-FieldLabel` class
 * this emits.
 */
export function renderFieldLabel({
  hasLabelSlotContent,
  forId,
}: RenderFieldLabelOptions): RenderFieldLabelResult {
  if (!hasLabelSlotContent) {
    return nothing;
  }
  if (forId) {
    return html`
      <label class="swc-FieldLabel" for=${forId}>
        <slot name="label"></slot>
      </label>
    `;
  }
  return html`
    <span class="swc-FieldLabel"><slot name="label"></slot></span>
  `;
}
