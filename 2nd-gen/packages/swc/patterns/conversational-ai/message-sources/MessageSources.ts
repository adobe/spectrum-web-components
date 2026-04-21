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
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import '@adobe/spectrum-wc/icon';

import { Chevron75Icon } from '../../../components/icon/elements/index.js';

import styles from './message-sources.css';

/**
 * Collapsible list of sources used to generate an AI response.
 *
 * Slot source items as `<li>` elements, typically containing links.
 * Each slotted list item will be wrapped with a numbered badge automatically via CSS counters.
 *
 * @element swc-message-sources
 * @slot - Source link items (rendered as a numbered list when expanded)
 * @fires swc-sources-toggle - Dispatched when the panel is toggled.
 * Detail: `{ open: boolean }`
 */
export class MessageSources extends SpectrumElement {
  private static panelIdCounter = 0;

  private readonly panelId = `swc-sources-panel-${++MessageSources.panelIdCounter}`;

  /**
   * Whether the sources list is open.
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /**
   * Label shown in the disclosure button and applied to list ARIA labelling.
   */
  @property({ type: String })
  public label = 'Sources';

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _handleToggle(): void {
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('swc-sources-toggle', {
        bubbles: true,
        composed: true,
        detail: { open: this.open },
      })
    );
  }

  protected override render(): TemplateResult {
    const isExpanded = this.open;
    const label = this.label.trim() || 'Sources';

    return html`
      <div class="swc-MessageSources">
        <button
          class="swc-MessageSources-toggle"
          aria-expanded=${isExpanded}
          aria-controls=${this.panelId}
          @click=${this._handleToggle}
        >
          <swc-icon
            class=${isExpanded
              ? 'swc-MessageSources-chevron swc-MessageSources-chevron--down'
              : 'swc-MessageSources-chevron'}
            style="--swc-icon-inline-size:10px;--swc-icon-block-size:10px;"
            label=${isExpanded ? `Collapse ${label}` : `Expand ${label}`}
          >
            ${Chevron75Icon()}
          </swc-icon>
          ${label}
        </button>

        <ol
          id=${this.panelId}
          class="swc-MessageSources-list"
          role="list"
          aria-label=${label}
          ?hidden=${!isExpanded}
        >
          <slot></slot>
        </ol>
      </div>
    `;
  }
}
