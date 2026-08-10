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

import { MenuGroupBase } from '@adobe/spectrum-wc-core/components/menu';

import styles from './menu-group.css';

/**
 * A labeled group of `swc-menu-item` rows within a `swc-menu` or
 * `swc-action-menu` list.
 *
 * @element swc-menu-group
 *
 * @example
 * <swc-menu-group>
 *   <swc-menu-item>Cut</swc-menu-item>
 *   <swc-menu-item>Copy</swc-menu-item>
 * </swc-menu-group>
 */
export class MenuGroup extends MenuGroupBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-MenuGroup">
        <slot></slot>
      </div>
    `;
  }
}
