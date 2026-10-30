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

import { CSSResultArray, html, TemplateResult } from 'lit';

import { SlotAttributePropagationController } from '@adobe/spectrum-wc-core/controllers/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';

import styles from './citation-card.css';

/**
 * Thumbnail size, in `swc-thumbnail`'s numeric scale, applied to the slotted
 * thumbnail (20px at desktop scale).
 */
export const CITATION_CARD_THUMBNAIL_SIZE = '75';

/**
 * Card describing one source cited by an AI response: a source lockup
 * (thumbnail and domain), a title link, and a short description.
 *
 * Semantics come from native slotted elements rather than ARIA: an `<a href>`
 * wrapping a heading for the title, and a `<blockquote cite>` for the quoted
 * snippet. The consumer owns the link. Its hit area is stretched over the
 * whole card, so clicking anywhere on the card follows it. Place the element
 * inside a native `<li>`; use `<swc-citation-listitem-card>` to place it
 * directly in a `<ul>` or `<ol>`.
 *
 * @element swc-citation-card
 * @since 2.0.0
 *
 * @slot thumbnail - An `<swc-thumbnail>` for the source. Its `size` is set to 75 and it is marked `decorative`, since the source text names the source.
 * @slot source - Source name or domain text.
 * @slot citation-link - An `<a href>` wrapping the citation title heading (`<h2>`–`<h6>`, matching the page outline). Its hit area covers the card.
 * @slot citation-description - The quoted snippet, preferably a `<blockquote cite>`. The card grows to fit it; keep it to about 150 characters.
 *
 * @cssprop --swc-citation-card-background-color - Background color of the card.
 * @cssprop --swc-citation-card-background-color-hover - Background color of the card on hover.
 *
 * @example
 * <li>
 *   <swc-citation-card>
 *     <swc-thumbnail slot="thumbnail"><img src="favicon.png" alt="" /></swc-thumbnail>
 *     <span slot="source">Adobe.com</span>
 *     <a slot="citation-link" href="https://adobe.com">
 *       <h3 class="swc-Title swc-Title--sizeM">How do we do in-line sources?</h3>
 *     </a>
 *     <blockquote slot="citation-description" cite="https://adobe.com">
 *       In-line sources allow for integrated citations…
 *     </blockquote>
 *   </swc-citation-card>
 * </li>
 */
export class CitationCard extends SpectrumElement {
  private readonly _thumbnailSize = new SlotAttributePropagationController(
    this,
    {
      attribute: 'size',
      getValue: () => CITATION_CARD_THUMBNAIL_SIZE,
      slotName: 'thumbnail',
      selector: 'swc-thumbnail',
    }
  );

  // The `source` text already names the source, so the thumbnail is
  // redundant for assistive technology.
  private readonly _thumbnailDecorative =
    new SlotAttributePropagationController(this, {
      attribute: 'decorative',
      getValue: () => '',
      slotName: 'thumbnail',
      selector: 'swc-thumbnail',
    });

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private readonly _handleThumbnailSlotChange = (): void => {
    this._thumbnailSize.propagate();
    this._thumbnailDecorative.propagate();
  };

  protected override render(): TemplateResult {
    return html`
      <div class="swc-CitationCard">
        <div class="swc-CitationCard-lockup">
          <slot
            name="thumbnail"
            @slotchange=${this._handleThumbnailSlotChange}
          ></slot>
          <slot name="source"></slot>
        </div>
        <div class="swc-CitationCard-content">
          <slot name="citation-link"></slot>
          <slot name="citation-description"></slot>
        </div>
      </div>
    `;
  }
}
