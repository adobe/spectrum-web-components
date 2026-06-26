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

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import styles from './response-status-step.css';

export type ResponseStatusStepStatus =
  | 'pending'
  | 'active'
  | 'complete'
  | 'stopped';

/**
 * One agentic execution step inside `<swc-response-status>`.
 *
 * Light DOM marker only — the parent renders the visible timeline from slotted content.
 *
 * @element swc-response-status-step
 * @slot label - Step title (shown in the header when `status="active"`)
 * @slot - Step detail shown in the expanded timeline
 */
export class ResponseStatusStep extends SpectrumElement {
  /** @deprecated Use the `label` slot. */
  @property({ type: String, reflect: true })
  public override title = '';

  /** @deprecated Use the default slot. */
  @property({ type: String, reflect: true })
  public detail = '';

  /** Timeline state for connector icons. */
  @property({ type: String, reflect: true })
  public status: ResponseStatusStepStatus = 'pending';

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _handleSlotChange = (): void => {
    this.dispatchEvent(
      new CustomEvent('swc-response-status-step-change', {
        bubbles: true,
      })
    );
  };

  protected override updated(changed: PropertyValues): void {
    if (
      changed.has('title') ||
      changed.has('detail') ||
      changed.has('status')
    ) {
      this._handleSlotChange();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <slot name="label" hidden @slotchange=${this._handleSlotChange}></slot>
      <slot hidden @slotchange=${this._handleSlotChange}></slot>
    `;
  }
}
