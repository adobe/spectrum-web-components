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

export type ResponseStatusStepStatus = 'active' | 'complete' | 'stopped';

/**
 * One agentic execution step inside `<swc-response-status>`.
 *
 * Light DOM marker only. The parent renders the visible timeline from slotted content.
 *
 * @element swc-response-status-step
 * @slot label - Step title (shown in the header when `status="active"`)
 * @slot description - Step detail shown in the expanded timeline
 */
export class ResponseStatusStep extends SpectrumElement {
  /** Timeline state for connector icons. */
  @property({ type: String, reflect: true })
  public status: 'active' | 'complete' | 'stopped' = 'active';

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  /** @internal */
  private _notifyStepChange = (): void => {
    this.dispatchEvent(
      new CustomEvent('swc-response-status-step-change', {
        bubbles: true,
      })
    );
  };

  protected override updated(changed: PropertyValues): void {
    if (changed.has('status')) {
      this._notifyStepChange();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <slot name="label" hidden @slotchange=${this._notifyStepChange}></slot>
      <slot
        name="description"
        hidden
        @slotchange=${this._notifyStepChange}
      ></slot>
      <slot hidden @slotchange=${this._notifyStepChange}></slot>
    `;
  }
}
