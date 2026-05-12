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
import { property, queryAll } from 'lit/decorators.js';

import { FocusgroupNavigationController } from '@spectrum-web-components/core/controllers/index.js';
import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import { ThumbDownIcon, ThumbUpIcon } from '../utils/icons/index.js';

import styles from './message-feedback.css';

/**
 * Binary positive / negative feedback control for AI responses.
 *
 * Arrow keys use `FocusgroupNavigationController` (horizontal) for roving focus
 * between options. Selection is activation-based (click, Enter, or Space).
 *
 * @element swc-message-feedback
 * @fires swc-message-feedback-change - Dispatched when the user toggles feedback selection.
 * Detail: `{ status: 'positive' | 'negative' | undefined }`
 */
export class MessageFeedback extends SpectrumElement {
  /**
   * The currently selected feedback status.
   * - `positive`: positive feedback selected
   * - `negative`: negative feedback selected
   * - `undefined`: no feedback selected
   *
   * This is controlled by the consumer. The component dispatches `swc-message-feedback-change`
   * on click and expects the parent to update `status`.
   */
  @property({ type: String, reflect: true })
  public status?: 'positive' | 'negative';

  /** Accessible label for the feedback button group. */
  @property({ type: String, attribute: 'group-label' })
  public groupLabel = 'Response feedback';

  /** Accessible label for the positive feedback button. */
  @property({ type: String, attribute: 'positive-label' })
  public positiveLabel = 'Positive response';

  /** Accessible label for the negative feedback button. */
  @property({ type: String, attribute: 'negative-label' })
  public negativeLabel = 'Negative response';

  @queryAll('.swc-MessageFeedback-button')
  private _feedbackButtonNodes!: NodeListOf<HTMLButtonElement>;

  private focusgroupNavigationController = new FocusgroupNavigationController(
    this,
    {
      direction: 'both',
      wrap: true,
      getItems: () => this._feedbackButtons(),
    }
  );

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _feedbackButtons(): HTMLButtonElement[] {
    return Array.from(this._feedbackButtonNodes ?? []);
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    this._syncRovingFocusTarget();
  }

  private _syncRovingFocusTarget(): void {
    this.focusgroupNavigationController.refresh();
    const buttons = this._feedbackButtons();
    if (!buttons.length) {
      return;
    }

    const selectedButton = this.status === 'negative' ? buttons[1] : buttons[0];
    this.focusgroupNavigationController.setActiveItem(selectedButton);
  }

  private _toggleStatus(next: 'positive' | 'negative'): void {
    const status = this.status === next ? undefined : next;
    this.dispatchEvent(
      new CustomEvent('swc-message-feedback-change', {
        bubbles: true,
        composed: true,
        detail: { status },
      })
    );
  }

  private _handlePositiveClick(): void {
    this._toggleStatus('positive');
  }

  private _handleNegativeClick(): void {
    this._toggleStatus('negative');
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class="swc-MessageFeedback"
        role="group"
        aria-label=${this.groupLabel}
      >
        <button
          type="button"
          class="swc-MessageFeedback-button"
          aria-label=${this.positiveLabel}
          aria-pressed=${this.status === 'positive'}
          @click=${this._handlePositiveClick}
        >
          <swc-icon aria-hidden="true">${ThumbUpIcon()}</swc-icon>
        </button>
        <button
          type="button"
          class="swc-MessageFeedback-button"
          aria-label=${this.negativeLabel}
          aria-pressed=${this.status === 'negative'}
          @click=${this._handleNegativeClick}
        >
          <swc-icon aria-hidden="true">${ThumbDownIcon()}</swc-icon>
        </button>
      </div>
    `;
  }
}
