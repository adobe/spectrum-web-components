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
 * **Breaking change (B8):** The `<label>` wrapper from 1st-gen
 * shadow DOM has been removed. The default slot content renders
 * directly inside a `<span>` to avoid conflicting semantics with
 * `role="tab"` on the host.
 *
 * @element swc-tab
 * @status preview
 * @since 0.0.1
 *
 * @slot - Text label of the tab
 * @slot icon - Optional icon displayed before the label
 *
 * @example
 * <swc-tab value="settings">Settings</swc-tab>
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
      <slot name="icon"></slot>
      <slot></slot>
    `;
  }
}
