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
   * The `id` of the field's role element (e.g. the `<input>`), wired as the
   * rendered `<label for>` so the visible label gives native click-to-focus.
   */
  forId: string;
}

/**
 * Renders the shared field-label markup for labelling-capable components.
 * Returns `nothing` when there is no slotted `label` content, so callers can
 * interpolate unconditionally.
 *
 * Most consumers use `LabellingMixin`'s `renderLabel()` instead, which calls
 * this with its resolved state. Render-only, no design tokens: pair it with a
 * style fragment theming the `swc-FieldLabel` class it emits.
 */
export function renderFieldLabel({
  hasLabelSlotContent,
  forId,
}: RenderFieldLabelOptions): RenderFieldLabelResult {
  if (!hasLabelSlotContent) {
    return nothing;
  }
  return html`
    <label class="swc-FieldLabel" for=${forId}>
      <slot name="label"></slot>
    </label>
  `;
}
