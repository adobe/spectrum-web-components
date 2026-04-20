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

import { FocusgroupNavigationController } from '@spectrum-web-components/core/controllers/index.js';
import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import '@adobe/spectrum-wc/icon';

import { ThumbDownIcon, ThumbUpIcon } from '../utils/icons/index.js';

import styles from './message-feedback.css';

/**
 * Binary positive / negative feedback control for AI responses.
 *
 * Arrow keys use `FocusgroupNavigationController` (horizontal) so focus and selection
 * follow the radiogroup pattern (roving `tabindex` on the two buttons).
 *
 * @element swc-message-feedback
 * @fires swc-feedback - Dispatched when the user selects positive or negative feedback.
 * Detail: `{ status: 'positive' | 'negative' }`
 */
export class MessageFeedback extends SpectrumElement {
  /**
   * The currently selected feedback status.
   * - `positive`: positive feedback selected
   * - `negative`: negative feedback selected
   *
   * This is controlled by the consumer. The component dispatches `swc-feedback`
   * on click and expects the parent to update `status`.
   */
  @property({ type: String, reflect: true })
  public status?: 'positive' | 'negative';

  private focusgroupNavigationController = new FocusgroupNavigationController(
    this,
    {
      direction: 'horizontal',
      wrap: true,
      getItems: () => this._feedbackButtons(),
    }
  );

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  public override focus(options?: FocusOptions): void {
    this._syncRovingFocusTarget();
    this.focusgroupNavigationController.getActiveItem()?.focus(options);
  }

  private _feedbackButtons(): HTMLButtonElement[] {
    const root = this.renderRoot as ShadowRoot | undefined;
    if (!root) {
      return [];
    }
    return Array.from(
      root.querySelectorAll<HTMLButtonElement>('.swc-MessageFeedback-button')
    );
  }

  protected override firstUpdated(
    changedProperties: PropertyValues<this>
  ): void {
    super.firstUpdated(changedProperties);
    this._syncRovingFocusTarget();
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    if (changedProperties.has('status')) {
      this._syncRovingFocusTarget();
    }
  }

  private _syncRovingFocusTarget(): void {
    this.focusgroupNavigationController.refresh();
    const buttons = this._feedbackButtons();
    if (!buttons.length) {
      return;
    }

    const selectedButton =
      this.status === 'negative' && buttons.length > 1
        ? buttons[1]
        : buttons[0];
    this.focusgroupNavigationController.setActiveItem(selectedButton);
  }

  private _handlePositive(): void {
    this.dispatchEvent(
      new CustomEvent('swc-feedback', {
        bubbles: true,
        composed: true,
        detail: { status: 'positive' as const },
      })
    );
  }

  private _handleNegative(): void {
    this.dispatchEvent(
      new CustomEvent('swc-feedback', {
        bubbles: true,
        composed: true,
        detail: { status: 'negative' as const },
      })
    );
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class="swc-MessageFeedback"
        role="radiogroup"
        aria-label="Response feedback"
      >
        <button
          class="swc-MessageFeedback-button"
          role="radio"
          ?data-selected=${this.status === 'positive'}
          aria-label="Positive response"
          aria-checked=${this.status === 'positive'}
          @click=${this._handlePositive}
        >
          <swc-icon
            label="Positive response"
            style="--swc-icon-inline-size:16px;--swc-icon-block-size:16px;"
          >
            ${ThumbUpIcon()}
          </swc-icon>
        </button>
        <button
          class="swc-MessageFeedback-button"
          role="radio"
          ?data-selected=${this.status === 'negative'}
          aria-label="Negative response"
          aria-checked=${this.status === 'negative'}
          @click=${this._handleNegative}
        >
          <swc-icon
            label="Negative response"
            style="--swc-icon-inline-size:16px;--swc-icon-block-size:16px;"
          >
            ${ThumbDownIcon()}
          </swc-icon>
        </button>
      </div>
    `;
  }
}
