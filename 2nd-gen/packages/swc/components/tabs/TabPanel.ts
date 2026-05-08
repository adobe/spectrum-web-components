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

import { TabPanelBase } from '@spectrum-web-components/core/components/tabs';

import styles from './tab-panel.css';

/**
 * A panel that displays content associated with a tab.
 *
 * The panel's visibility is managed by the parent `swc-tabs`
 * container based on which tab is selected.
 *
 * @element swc-tab-panel
 * @status unsupported
 * @since 0.0.1
 *
 * @slot - Content displayed when the associated tab is selected
 *
 * @example
 * <swc-tab-panel tab-id="settings">
 *   <p>Settings content goes here.</p>
 * </swc-tab-panel>
 */
export class TabPanel extends TabPanelBase {
  // ─────────────────────────────
  //     RENDERING & STYLING
  // ─────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <slot
        @focusin=${this.handleFocusin}
        @focusout=${this.handleFocusout}
      ></slot>
    `;
  }
}
