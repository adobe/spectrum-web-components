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
 * A menu is a full menu-button host: an externally-referenced trigger opens a
 * `PlacementController`-anchored surface containing a `role="menu"` list of
 * `swc-menu-item` rows (`swc-menu-group` and `swc-divider` as a separator
 * join in a later migration phase).
 *
 * @element swc-menu
 *
 * @example
 * <swc-menu>
 *   <swc-menu-item>Cut</swc-menu-item>
 *   <swc-menu-item>Copy</swc-menu-item>
 *   <swc-menu-item>Paste</swc-menu-item>
 * </swc-menu>
 */
export class Menu extends MenuBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-Menu">
        <slot></slot>
      </div>
    `;
  }
}
