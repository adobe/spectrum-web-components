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

import { TabBase } from '@adobe/spectrum-wc-core/components/tabs';

import styles from './tab.css';

/**
 * An individual tab placed inside a `swc-tabs` container.
 *
 * The `<label>` wrapper from 1st-gen shadow DOM has been removed. Default
 * and icon slot content render without an extra wrapper so implicit label
 * semantics do not conflict with `role="tab"` on the host. See the
 * [migration guide](?path=/docs/components-tabs-migration-guide--docs).
 *
 * @element swc-tab
 * @since 2.0.0-beta.2
 *
 * @slot - Text label of the tab
 * @slot icon - Optional icon displayed before the label
 *
 * @cssprop --swc-tab-height - Block size of the tab.
 * @cssprop --swc-tab-padding-block - Block padding of the tab.
 * @cssprop --swc-tab-padding-block-end - Block-end padding of the tab.
 * @cssprop --swc-tab-text-color - Color of the tab label text.
 *
 * @example
 * <swc-tab tab-id="settings">Settings</swc-tab>
 *
 * @cssprop --swc-tab-text-color - Text color of the tab label.
 * @cssprop --swc-tab-height - Block size of the tab.
 * @cssprop --swc-tab-padding-block - Block-start padding of the tab.
 * @cssprop --swc-tab-padding-block-end - Block-end padding of the tab.
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
