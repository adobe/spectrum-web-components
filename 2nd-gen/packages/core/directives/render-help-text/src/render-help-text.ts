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

/** Return type of {@link renderFieldHelpText}: the help-text template, or `nothing`. */
export type RenderFieldHelpTextResult = TemplateResult | typeof nothing;

/** Options accepted by {@link renderFieldHelpText}. */
export interface RenderFieldHelpTextOptions {
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
}

/**
 * Renders the shared description/error-text markup used by
 * help-text-capable components. Returns `nothing` when neither the
 * description nor an active (`invalid`) error message has content, so callers
 * can interpolate unconditionally.
 *
 * Most consumers do not call this directly: `HelpTextMixin` exposes
 * `renderHelpText()`, which calls this with the mixin's own resolved state and
 * uses the element callbacks to build `ariaDescribedByElements` /
 * `ariaErrorMessageElements`. Use this directive directly only for stateless
 * rendering without the mixin.
 *
 * This is render-only and carries no design-token dependency. Pair it with a
 * shared style fragment that themes the `swc-FieldDescription` /
 * `swc-FieldErrorText` classes this emits.
 */
export function renderFieldHelpText({
  hasDescriptionSlotContent,
  hasErrorTextSlotContent,
  invalid,
  onDescriptionElement,
  onErrorTextElement,
}: RenderFieldHelpTextOptions): RenderFieldHelpTextResult {
  const showError = invalid && hasErrorTextSlotContent;
  if (!hasDescriptionSlotContent && !showError) {
    return nothing;
  }
  return html`
    ${hasDescriptionSlotContent
      ? html`
          <span class="swc-FieldDescription" ${ref(onDescriptionElement)}>
            <slot name="description"></slot>
          </span>
        `
      : nothing}
    ${showError
      ? html`
          <span class="swc-FieldErrorText" ${ref(onErrorTextElement)}>
            <slot name="error-text"></slot>
          </span>
        `
      : nothing}
  `;
}
