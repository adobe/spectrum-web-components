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

import { CSSResultArray, PropertyValues } from 'lit';

import { CitationCard } from './CitationCard.js';

import listitemStyles from './citation-listitem-card.css';

/**
 * A citation card that is itself a list item, for placing directly in a
 * `<ul>` or `<ol>` without a wrapping `<li>`. A custom element has no native
 * list semantics, so the host gets `role="listitem"` (unless the consumer
 * sets a role) and renders as `display: list-item` so `<ol>` numbering
 * applies. Prefer `<swc-citation-card>` inside a native `<li>` where markup
 * allows; this is the only form that relies on ARIA.
 *
 * Shares its anatomy, slots, and styles with `<swc-citation-card>`.
 *
 * @element swc-citation-listitem-card
 * @since 2.0.0
 *
 * @slot thumbnail - An `<swc-thumbnail>` for the source. Its `size` is set to 75 and it is marked `decorative`, since the source text names the source.
 * @slot source - Source name or domain text.
 * @slot citation-link - An `<a href>` wrapping the citation title heading (`<h2>`–`<h6>`, matching the page outline). Its hit area covers the card.
 * @slot citation-description - The quoted snippet, preferably a `<blockquote cite>`; clamped to two lines.
 *
 * @example
 * <ol>
 *   <swc-citation-listitem-card>
 *     <swc-thumbnail slot="thumbnail"><img src="favicon.png" alt="" /></swc-thumbnail>
 *     <span slot="source">Adobe.com</span>
 *     <a slot="citation-link" href="https://adobe.com">
 *       <h3 class="swc-Title swc-Title--sizeM">How do we do in-line sources?</h3>
 *     </a>
 *     <blockquote slot="citation-description" cite="https://adobe.com">
 *       In-line sources allow for integrated citations…
 *     </blockquote>
 *   </swc-citation-listitem-card>
 * </ol>
 */
export class CitationListitemCard extends CitationCard {
  public static override get styles(): CSSResultArray {
    return [...super.styles, listitemStyles];
  }

  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
  }
}
