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

import { TabBase } from '@spectrum-web-components/core/components/tabs';

import styles from './tab.css';

/**
 * An individual tab placed inside a `swc-tabs` container.
 *
 * The `<label>` wrapper from 1st-gen shadow DOM has been removed. Default
 * and icon slot content render without an extra wrapper so implicit label
 * semantics do not conflict with `role="tab"` on the host. See the
 * [migration guide](../migration.md).
 *
 * @element swc-tab
 * @status unsupported
 * @since 0.0.1
 *
 * @slot - Text label of the tab
 * @slot icon - Optional icon displayed before the label
 *
 * @example
 * <swc-tab tab-id="settings">Settings</swc-tab>
 */
export class Tab extends TabBase {
  // ─────────────────────────────
  //     RENDERING & STYLING
  // ─────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-Tab">
        <slot name="icon"></slot>
        <span class="swc-Tab-label"><slot></slot></span>
      </div>
    `;
  }
}
