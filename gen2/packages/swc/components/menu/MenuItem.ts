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

import { MenuItemBase } from '@adobe/spectrum-wc-core/components/menu';

import styles from './menu-item.css';

/**
 * A row of actions or options inside a menu. Rows are slotted into
 * `swc-menu`, which owns opening and closing the surface and moving focus
 * between rows.
 *
 * The behavior (role, disabled semantics, and size) lives in `MenuItemBase`;
 * this class supplies the styles and the render template.
 *
 * @element swc-menu-item
 * @since 2.0.0-beta.7
 *
 * @example
 * <swc-button id="edit">Edit</swc-button>
 * <swc-menu for="edit">
 *   <swc-menu-item><span slot="label">Cut</span></swc-menu-item>
 *   <swc-menu-item disabled><span slot="label">Paste</span></swc-menu-item>
 *   <swc-menu-item>
 *     <span slot="label">Paste special</span>
 *     <span slot="description">Keeps the source formatting</span>
 *   </swc-menu-item>
 * </swc-menu>
 *
 * @slot label - Required text of the row; provides its accessible name.
 * @slot visual - Optional leading icon or thumbnail.
 * @slot description - Optional secondary text; provides the accessible description.
 *
 * @cssprop --swc-menu-item-min-block-size - Minimum height of the row. Defaults to the medium component height token.
 * @cssprop --swc-menu-item-padding-block - Block padding of the row. Defaults to the medium vertical padding token.
 * @cssprop --swc-menu-item-padding-inline - Inline padding of the row. Defaults to the medium horizontal padding token.
 * @cssprop --swc-menu-item-gap - Gap between the visual and the text. Defaults to the medium gap token.
 * @cssprop --swc-menu-item-corner-radius - Corner radius of the row. Defaults to the medium corner radius token.
 * @cssprop --swc-menu-item-background-color - Fill of the row. Unset, the row is flat; the hover, focus, and down states set it to the menu item background token.
 * @cssprop --swc-menu-item-label-color - Color of the label. Defaults to the neutral content color token.
 * @cssprop --swc-menu-item-label-font-size - Font size of the label. Defaults to the 100 font-size token.
 * @cssprop --swc-menu-item-label-line-height - Line height of the label. Defaults to the 100 line-height token.
 * @cssprop --swc-menu-item-text-gap - Gap between the label and the description. Defaults to the medium text-gap token.
 * @cssprop --swc-menu-item-description-color - Color of the description. Defaults to the neutral subdued content color token.
 * @cssprop --swc-menu-item-description-font-size - Font size of the description. Defaults to the 75 font-size token.
 * @cssprop --swc-menu-item-description-line-height - Line height of the description. Defaults to the 75 line-height token.
 * @cssprop --swc-menu-item-visual-size - Size of the slotted visual on both axes. Defaults to the medium workflow icon token.
 */
export class MenuItem extends MenuItemBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-MenuItem">
        <slot name="visual"></slot>
        <div class="swc-MenuItem-text">
          <slot name="label" @slotchange=${this.handleTextSlotChange}></slot>
          <slot
            name="description"
            @slotchange=${this.handleTextSlotChange}
          ></slot>
        </div>
      </div>
    `;
  }
}
