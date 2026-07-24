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

import { CardBase } from '@adobe/spectrum-wc-core/components/card';

import { renderCardTemplate } from './card-template.js';

import sharedStyles from '../../stylesheets/_lit-styles/card-template.css';
import styles from './card.css';

/**
 * @element swc-card
 * @since 2.0.0
 *
 * @example
 * <swc-card>
 *   <img slot="preview" src="preview.jpg" alt="" />
 *   <span slot="title">Card title</span>
 *   <span slot="description">Supporting description text.</span>
 * </swc-card>
 *
 * @example
 * <swc-card variant="quiet" density="compact">
 *   <img slot="preview" src="preview.jpg" alt="" />
 *   <span slot="title">Card title</span>
 *   <span slot="description">Supporting description text.</span>
 *   <swc-action-button slot="actions" quiet>
 *     Edit
 *   </swc-action-button>
 * </swc-card>
 *
 * @slot collection - Optional collection images. Assign each image to the slot.
 * @slot media - Optional overlay content (e.g. a badge or avatar) layered over the preview/collection media region.
 *
 * @cssprop --swc-card-collection-item-aspect-ratio - Aspect ratio of each collection image. Defaults to 1 (square).
 * @cssprop --swc-card-collection-gap - Gap between collection images, and between the preview and the collection row. Defaults to a extra-small group-gap token, overridden at size="xs".
 */
export class Card extends CardBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [sharedStyles, styles];
  }

  protected override render(): TemplateResult {
    return renderCardTemplate({
      cardClass: 'Card',
      hasDefaultSlotContent: this.slotHasContent,
      onDefaultSlotChange: this.slotText.handleSlotChange,
      renderCollection: () => html`
        <div class="swc-Card-collection"><slot name="collection"></slot></div>
      `,
      renderMedia: () => html`
        <slot name="media"></slot>
      `,
    });
  }
}
