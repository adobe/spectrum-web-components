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

/** Consumer-provided copy for the text necessity indicator. */
export interface NecessityLabels {
  required: string;
  optional: string;
}

/** Options accepted by {@link renderFieldLabel}. */
export interface RenderFieldLabelOptions {
  /** Whether slotted `label` content is present in the host's light DOM. */
  hasLabelSlotContent: boolean;

  /**
   * The role element's `id` (e.g. the `<input>`), wired as the rendered
   * `<label for>` so the label gives native click-to-focus.
   */
  forId: string;

  /**
   * Whether the field is required. The indicator it appends is `aria-hidden`;
   * the requirement is conveyed to AT by the role element's own `required` state.
   */
  required?: boolean;

  /**
   * How necessity is marked. `'icon'` (default) shows `necessityIcon` only when
   * required; `'label'` appends consumer-provided text, marking both states.
   */
  necessityIndicator?: 'icon' | 'label';

  /** Copy for the required and optional text in `'label'` mode. */
  necessityLabels?: NecessityLabels;

  /**
   * The asterisk glyph for `'icon'` mode, supplied by the consumer because this
   * `core` directive can't import a `swc` icon.
   */
  necessityIcon?: TemplateResult;
}

/**
 * Renders the shared field-label markup for labelling-capable components.
 * Returns `nothing` when there is no slotted `label` content, so callers can
 * interpolate unconditionally.
 *
 * Most consumers use `LabellingMixin`'s `renderLabel()` instead, which calls
 * this with its resolved state. Render-only, no design tokens: pair it with a
 * style fragment theming the `swc-FormFieldLabel` class it emits.
 */
export function renderFieldLabel({
  hasLabelSlotContent,
  forId,
  required = false,
  necessityIndicator = 'icon',
  necessityLabels,
  necessityIcon,
}: RenderFieldLabelOptions): RenderFieldLabelResult {
  if (!hasLabelSlotContent) {
    return nothing;
  }
  return html`
    <label class="swc-FormFieldLabel" for=${forId}>
      <slot name="label"></slot>
      ${renderNecessityIndicator({
        indicator: necessityIndicator,
        required,
        labels: necessityLabels,
        icon: necessityIcon,
      })}
    </label>
  `;
}

/**
 * The `aria-hidden` necessity indicator span; see `necessityIndicator` for the
 * icon-vs-label behavior. The leading `&nbsp;` sets the gap from the label text.
 */
function renderNecessityIndicator({
  indicator,
  required,
  labels,
  icon,
}: {
  indicator: 'icon' | 'label';
  required: boolean;
  labels: NecessityLabels | undefined;
  icon: TemplateResult | undefined;
}): RenderFieldLabelResult {
  if (indicator === 'label' && labels) {
    return html`
      <span class="swc-FormFieldLabel-necessityLabel" aria-hidden="true">
        &nbsp;${required ? labels.required : labels.optional}
      </span>
    `;
  }
  if (!required || !icon) {
    return nothing;
  }
  return html`
    <span class="swc-FormFieldLabel-requiredIndicator" aria-hidden="true">
      &nbsp;${icon}
    </span>
  `;
}
