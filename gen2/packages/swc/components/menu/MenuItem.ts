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
 * @since 2.0.0-beta.5
 *
 * @example
 * <swc-button id="edit">Edit</swc-button>
 * <swc-menu for="edit">
 *   <swc-menu-item>Cut</swc-menu-item>
 *   <swc-menu-item disabled>Paste</swc-menu-item>
 * </swc-menu>
 *
 * @slot - Text of the row.
 * @slot visual - Optional leading icon.
 */
export class MenuItem extends MenuItemBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <slot name="visual"></slot>
      <slot></slot>
    `;
  }
}
