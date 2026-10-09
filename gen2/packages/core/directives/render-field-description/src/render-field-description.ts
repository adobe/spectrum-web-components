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
import { ref } from 'lit/directives/ref.js';

/** Return type of {@link renderFieldDescription}: the field-description template, or `nothing`. */
export type RenderFieldDescriptionResult = TemplateResult | typeof nothing;

/** Options accepted by {@link renderFieldDescription}. */
export interface RenderFieldDescriptionOptions {
  /** Whether slotted `description` content is present in the host's light DOM. */
  hasDescriptionSlotContent: boolean;
  /** Whether slotted `error-text` content is present in the host's light DOM. */
  hasErrorTextSlotContent: boolean;
  /** Whether the host is currently in an invalid state. Gates the error-text element. */
  invalid: boolean;
  /** Called with the rendered description element (or `undefined` on removal). */
  onDescriptionElement: (element: Element | undefined) => void;
  /** Called with the rendered error-text element (or `undefined` on removal). */
  onErrorTextElement: (element: Element | undefined) => void;

  /**
   * Decorative icon rendered before the error message. Supplied by the consumer
   * because this `core` directive can't import a `swc` icon. Omit when the
   * control already shows its own invalid icon (e.g. a text field's input).
   * When supplied, an invalid field always shows it, even with no error text,
   * so the invalid state never relies on color alone: it appears beside the
   * description if there is one, and on its own otherwise.
   */
  errorIcon?: TemplateResult;
}

/**
 * Renders the shared description/error-text markup for form-field
 * components. Returns `nothing` when there is no description and no active
 * (`invalid`) error message, so callers can interpolate unconditionally.
 *
 * Most consumers use `FieldDescriptionMixin`'s `renderFieldDescription()` instead, which calls
 * this with its resolved state and the element callbacks that build
 * `ariaDescribedByElements`. Render-only, no design tokens: pair it with a
 * style fragment theming the `swc-FormFieldDescription` / `swc-FormFieldErrorText`
 * classes it emits.
 */
export function renderFieldDescription({
  hasDescriptionSlotContent,
  hasErrorTextSlotContent,
  invalid,
  onDescriptionElement,
  onErrorTextElement,
  errorIcon,
}: RenderFieldDescriptionOptions): RenderFieldDescriptionResult {
  const showError = invalid && hasErrorTextSlotContent;
  const showInvalidIcon =
    invalid && !hasErrorTextSlotContent && errorIcon !== undefined;
  if (!hasDescriptionSlotContent && !showError && !showInvalidIcon) {
    return nothing;
  }
  const icon = errorIcon
    ? html`
        <span class="swc-FormFieldErrorText-icon">${errorIcon}</span>
      `
    : nothing;
  return html`
    ${hasDescriptionSlotContent && !showError
      ? html`
          <span class="swc-FormFieldDescription" ${ref(onDescriptionElement)}>
            ${showInvalidIcon
              ? html`
                  ${icon}
                  <span class="swc-FormFieldErrorText-text">
                    <slot name="description"></slot>
                  </span>
                `
              : html`
                  <slot name="description"></slot>
                `}
          </span>
        `
      : nothing}
    ${showInvalidIcon && !hasDescriptionSlotContent
      ? html`
          <span class="swc-FormFieldErrorText">${icon}</span>
        `
      : nothing}
    ${showError
      ? html`
          <span class="swc-FormFieldErrorText" ${ref(onErrorTextElement)}>
            ${icon}
            <span class="swc-FormFieldErrorText-text">
              <slot name="error-text"></slot>
            </span>
          </span>
        `
      : nothing}
  `;
}
