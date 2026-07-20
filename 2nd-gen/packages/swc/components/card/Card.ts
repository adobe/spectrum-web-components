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

import { CSSResultArray, TemplateResult } from 'lit';

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
 * @cssprop --swc-card-base-max-inline-size - Maximum inline size of the card. Defaults to 280px, overridden per size.
 * @cssprop --swc-card-base-border-radius - Corner radius of the card. Defaults to the extra-large corner-radius token, overridden per size.
 * @cssprop --swc-card-base-box-shadow - Box shadow (elevation) of the card. Defaults to the emphasized drop-shadow token; overridden by the tertiary variant, selectable focus, and title-as-link/selectable hover.
 * @cssprop --swc-card-base-background-color - Background color of the card. Defaults to the layer-2 background token; overridden by the secondary, tertiary, and quiet variants.
 * @cssprop --swc-card-base-preview-aspect-ratio - Aspect ratio of the preview slot. Defaults to 3/2.
 * @cssprop --swc-card-base-title-font-size - Font size of the title slot. Defaults to the medium font-size token, overridden per size.
 * @cssprop --swc-card-base-title-line-height - Line height of the title slot. Defaults to the medium line-height token, overridden per size.
 * @cssprop --swc-card-base-description-font-size - Font size of the description slot and default slot content. Defaults to a smaller font-size token, overridden per size.
 * @cssprop --swc-card-base-action-component-height - Height used to vertically balance slotted actions content. Defaults to the smallest component-height token, overridden per size.
 * @cssprop --swc-card-base-content-header-gap - Column gap between the title and actions slots. Defaults to the medium base-gap token, overridden per size.
 * @cssprop --swc-card-base-content-padding - Padding of the content region. Defaults to the medium container-padding token; overridden by density.
 * @cssprop --swc-card-base-content-padding-regular - Content padding used at the default (regular) density, per size.
 * @cssprop --swc-card-base-content-padding-compact - Content padding used at compact density, per size.
 * @cssprop --swc-card-base-content-padding-spacious - Content padding used at spacious density, per size.
 */
export class Card extends CardBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [sharedStyles, styles];
  }

  protected override render(): TemplateResult {
    return renderCardTemplate({ cardClass: 'Card' });
  }
}
