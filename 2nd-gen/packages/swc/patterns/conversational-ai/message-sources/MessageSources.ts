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
import { property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { Chevron75Icon } from '@adobe/spectrum-wc/icon/elements/index.js';
import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import { uniqueId } from '../../../utils/id.js';

import styles from './message-sources.css';

/**
 * Collapsible list of sources used to generate an AI response.
 *
 * Slot `<a>` elements into the default slot. Each anchor's **text content**
 * is used as the visible label — rich HTML inside the anchor is not preserved.
 * All attributes on the original anchor (`href`, `target`, `rel`, `data-*`,
 * etc.) are forwarded to the rendered link. Non-anchor elements are ignored.
 *
 * @element swc-message-sources
 * @slot - Anchor (`<a>`) elements projected into a numbered list when expanded
 * @fires swc-message-sources-toggle - Dispatched when the panel is toggled.
 * Detail: `{ open: boolean }`
 */
export class MessageSources extends SpectrumElement {
  private readonly panelId = uniqueId('swc-sources-panel');
  private readonly toggleId = uniqueId('swc-message-sources-toggle');

  @state()
  private sourceLinks: Array<{
    href: string;
    label: string;
    extraAttributes: Array<[string, string]>;
  }> = [];

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

  /** Optional accessible label override for assistive technologies. */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel = '';

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _handleToggle(): void {
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('swc-message-sources-toggle', {
        bubbles: true,
        composed: true,
        detail: { open: this.open },
      })
    );
  }

  private _handleSlotChange(event: Event): void {
    const slot = event.target as HTMLSlotElement;
    this.sourceLinks = slot
      .assignedElements({ flatten: true })
      .filter(
        (element): element is HTMLAnchorElement =>
          element instanceof HTMLAnchorElement
      )
      .map((anchor) => {
        const extraAttributes: Array<[string, string]> = [];
        for (const attr of Array.from(anchor.attributes)) {
          if (attr.name !== 'href' && attr.name !== 'class') {
            extraAttributes.push([attr.name, attr.value]);
          }
        }
        return {
          href: anchor.getAttribute('href') ?? '#',
          label: anchor.textContent?.trim() ?? '',
          extraAttributes,
        };
      });
  }

  protected override render(): TemplateResult {
    const isExpanded = this.open;
    const label = this.label.trim() || 'Sources';
    const accessibleLabel =
      this.accessibleLabel.trim().length > 0
        ? this.accessibleLabel.trim()
        : label;

    return html`
      <div class="swc-MessageSources">
        <button
          id=${this.toggleId}
          class="swc-MessageSources-toggle"
          aria-label=${accessibleLabel}
          aria-expanded=${isExpanded}
          aria-controls=${this.panelId}
          @click=${this._handleToggle}
        >
          <swc-icon
            class=${isExpanded
              ? 'swc-MessageSources-chevron swc-MessageSources-chevron--down'
              : 'swc-MessageSources-chevron'}
            style="--swc-icon-inline-size:10px;--swc-icon-block-size:10px;"
            aria-hidden="true"
          >
            ${Chevron75Icon()}
          </swc-icon>
          ${label}
        </button>

        <ol
          id=${this.panelId}
          class="swc-MessageSources-list"
          aria-labelledby=${this.toggleId}
          ?hidden=${!isExpanded}
        >
          ${this.sourceLinks.map(
            (link) => html`
              <li class="swc-MessageSources-item">
                <a
                  class="swc-MessageSources-link"
                  href=${link.href}
                  ${ref((el) => {
                    if (el instanceof HTMLAnchorElement) {
                      for (const [name, value] of link.extraAttributes) {
                        el.setAttribute(name, value);
                      }
                    }
                  })}
                >
                  ${link.label}
                </a>
              </li>
            `
          )}
        </ol>
        <slot hidden @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}
