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

import { MenuSeparatorBase } from '@adobe/spectrum-wc-core/components/menu';

import styles from './menu-separator.css';

/**
 * A decorative divider between rows or groups within a `swc-menu` or
 * `swc-action-menu` list.
 *
 * @element swc-menu-separator
 *
 * @example
 * <swc-menu-separator></swc-menu-separator>
 */
export class MenuSeparator extends MenuSeparatorBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-MenuSeparator"></div>
    `;
  }
}
