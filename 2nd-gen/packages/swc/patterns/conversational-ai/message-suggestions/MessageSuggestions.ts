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

import { CSSResultArray, html, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import '@adobe/spectrum-wc/icon';

import { ArrowCurvedIcon } from '../utils/icons/index.js';

import styles from './message-suggestions.css';

/**
 * A row of follow-up suggestion chips rendered below an AI response.
 *
 * Add **any number** of elements as **default-slot** children (e.g. one `<span>` per chip).
 * Label text is taken from each element’s **`textContent`**. The slotted nodes stay in the
 * light DOM for your data layer; visible chips are rendered in shadow with the same labels.
 *
 * **Documentation:** three suggestions is the recommended default for readability; the
 * component does not enforce a maximum.
 *
 * @element swc-message-suggestions
 * @slot - One element per suggestion chip; label from `textContent` (order matches DOM order)
 * @fires swc-suggestion - Dispatched when a chip is clicked. Detail: `{ index: number }` (1-based)
 */
export class MessageSuggestions extends SpectrumElement {
  /**
   * When `true`, shows the section title "What would you like to do next?".
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-title' })
  public showTitle = false;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _defaultSlotRef = createRef<HTMLSlotElement>();

  /** Visible label per chip, synced from default-slot assigned elements. */
  private _chipLabels: string[] = [];

  protected override firstUpdated(_changed: PropertyValues): void {
    super.firstUpdated(_changed);
    this._syncFromSlot();
  }

  private _syncFromSlot(): void {
    const slot = this._defaultSlotRef.value;
    if (!slot) {
      return;
    }
    this._chipLabels = slot
      .assignedElements({ flatten: true })
      .map((el) => el.textContent?.trim() ?? '');
    this.requestUpdate();
  }

  private _handleChipClick(index: number): void {
    this.dispatchEvent(
      new CustomEvent('swc-suggestion', {
        bubbles: true,
        composed: true,
        detail: { index: index + 1 },
      })
    );
  }

  private _handleChipButtonClick(event: Event): void {
    const button = event.currentTarget as HTMLButtonElement;
    const index = Number(button.dataset.index);
    if (!Number.isInteger(index)) {
      return;
    }
    this._handleChipClick(index);
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-MessageSuggestions">
        ${this.showTitle
          ? html`
              <p class="swc-MessageSuggestions-title">
                What would you like to do next?
              </p>
            `
          : ''}
        <div
          class="swc-MessageSuggestions-chips"
          role="group"
          aria-label="Follow-up suggestions"
        >
          ${this._chipLabels.map(
            (label, i) => html`
              <button
                type="button"
                class="swc-MessageSuggestions-chip"
                data-index=${String(i)}
                @click=${this._handleChipButtonClick}
              >
                <swc-icon
                  style="--swc-icon-inline-size:14px;--swc-icon-block-size:14px;"
                  label=""
                >
                  ${ArrowCurvedIcon()}
                </swc-icon>
                ${label}
              </button>
            `
          )}
        </div>
        <slot
          ${ref(this._defaultSlotRef)}
          hidden
          @slotchange=${this._syncFromSlot}
        ></slot>
      </div>
    `;
  }
}
