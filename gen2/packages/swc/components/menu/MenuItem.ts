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
import { classMap } from 'lit/directives/class-map.js';

import { MenuItemBase } from '@adobe/spectrum-wc-core/components/menu';
import { SlotPresenceController } from '@adobe/spectrum-wc-core/controllers/slot-presence-controller/index.js';

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
 * @slot description - Optional supporting text below the label; provides the accessible description.
 * @slot secondary - Optional trailing text, such as a keyboard shortcut; appended to the accessible description after `description`.
 * @slot visual - Optional leading icon or thumbnail.
 *
 * @cssprop --swc-menu-item-min-block-size - Minimum height of the row.
 * @cssprop --swc-menu-item-padding-block - Block padding of the row.
 * @cssprop --swc-menu-item-padding-inline - Inline padding of the row.
 * @cssprop --swc-menu-item-gap - Horizontal gap between menu item elements.
 * @cssprop --swc-menu-item-corner-radius - Corner radius of the row.
 * @cssprop --swc-menu-item-background-color - Background color of the row at rest. The hover, keyboard focus, and pressed states set their own.
 * @cssprop --swc-menu-item-label-color - Color of the label.
 * @cssprop --swc-menu-item-label-font-size - Font size of the label.
 * @cssprop --swc-menu-item-label-line-height - Line height of the label.
 * @cssprop --swc-menu-item-text-gap - Gap between the label and the description.
 * @cssprop --swc-menu-item-description-color - Color of the description.
 * @cssprop --swc-menu-item-description-font-size - Font size of the description.
 * @cssprop --swc-menu-item-description-line-height - Line height of the description.
 * @cssprop --swc-menu-item-secondary-color - Color of the secondary text.
 * @cssprop --swc-menu-item-icon-size - Size of a slotted icon, inline and block.
 * @cssprop --swc-menu-item-thumbnail-size - Size of a slotted `swc-thumbnail`, inline and block.
 */
export class MenuItem extends MenuItemBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  // Matched by tag as well as slot, since a thumbnail needs different layout
  // from an icon in the same slot.
  private static readonly THUMBNAIL_SELECTOR = 'swc-thumbnail[slot="visual"]';

  private static readonly DESCRIPTION_SELECTOR = '[slot="description"]';

  private readonly slotPresence = new SlotPresenceController(this, [
    MenuItem.THUMBNAIL_SELECTOR,
    MenuItem.DESCRIPTION_SELECTOR,
  ]);

  protected override render(): TemplateResult {
    return html`
      <div class="swc-MenuItem">
        <div
          class=${classMap({
            'swc-MenuItem-content': true,
            'swc-MenuItem-content--hasThumbnail': this.slotPresence.getPresence(
              MenuItem.THUMBNAIL_SELECTOR
            ),
            'swc-MenuItem-content--hasDescription':
              this.slotPresence.getPresence(MenuItem.DESCRIPTION_SELECTOR),
          })}
        >
          <slot name="visual"></slot>
          <slot name="label" @slotchange=${this.handleTextSlotChange}></slot>
          <slot
            name="description"
            @slotchange=${this.handleTextSlotChange}
          ></slot>
          <slot
            name="secondary"
            @slotchange=${this.handleTextSlotChange}
          ></slot>
        </div>
      </div>
    `;
  }
}
