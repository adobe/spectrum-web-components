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

import { MenuBase } from '@adobe/spectrum-wc-core/components/menu';

import styles from './menu.css';

/**
 * A menu is a list of actions or options anchored to an externally-referenced
 * trigger, following the menu-button pattern. `swc-menu-item` rows
 * (`swc-menu-group` and `swc-divider` as a separator join in a later
 * migration phase) render in a shadow-internal `role="menu"` surface.
 *
 * The behavior (trigger and ARIA wiring, positioning, keyboard navigation,
 * and event dispatch) lives in `MenuBase`; this class supplies only the
 * styles, the render template, and the shadow-DOM element getter it
 * overrides.
 *
 * @element swc-menu
 *
 * @example
 * <swc-menu>
 *   <swc-menu-item>Cut</swc-menu-item>
 *   <swc-menu-item>Copy</swc-menu-item>
 *   <swc-menu-item>Paste</swc-menu-item>
 * </swc-menu>
 *
 * @slot - `swc-menu-item` elements.
 *
 * @fires swc-open - Dispatched when the menu begins to open.
 * @fires swc-after-open - Dispatched after the menu finishes opening.
 * @fires swc-close - Dispatched when the menu begins to close.
 * @fires swc-after-close - Dispatched after the menu finishes closing.
 */
export class Menu extends MenuBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  // Plain querySelector, not a cached @query, so it resolves fresh each read.
  protected override get surfaceElement(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.swc-Menu') ?? null;
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class="swc-Menu"
        popover="auto"
        role="menu"
        @beforetoggle=${this._onBeforeToggle}
      >
        <slot @slotchange=${this.handleDefaultSlotChange}></slot>
      </div>
    `;
  }
}
