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

import { html, nothing, TemplateResult } from 'lit';

/**
 * Options for {@link renderCardTemplate}.
 */
export interface CardTemplateOptions {
  /** Per-component class root (e.g. `UserCard`), prefixed with `swc-`. */
  cardClass: string;

  /** Renders the collection slot in addition to the preview. Default: none. */
  renderCollection?: () => TemplateResult | typeof nothing;

  /** Renders the avatar/thumbnail glyph. Default: none. */
  renderGlyph?: () => TemplateResult | typeof nothing;
}

/**
 * Shared card anatomy: preview with an optional collection slot, an
 * optional avatar/thumbnail glyph, title/actions/description/default
 * content, and a footer. Called from each concrete card's `render()`
 * (swc-card, swc-user-card, swc-product-card).
 */
export function renderCardTemplate({
  cardClass,
  renderCollection = () => nothing,
  renderGlyph = () => nothing,
}: CardTemplateOptions): TemplateResult {
  return html`
    <div class="card swc-${cardClass}">
      <div class="card-media swc-${cardClass}-media">
        <slot name="preview"></slot>
        ${renderCollection()}
      </div>
      ${renderGlyph()}
      <div class="card-content swc-${cardClass}-content">
        <slot name="title"></slot>
        <slot name="actions"></slot>
        <slot name="description"></slot>
        <slot></slot>
      </div>
      <footer class="card-footer swc-${cardClass}-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  `;
}
