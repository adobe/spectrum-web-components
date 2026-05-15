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
import { property, queryAssignedElements } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import { uniqueId } from '../../../utils/id.js';

import styles from './suggestion-group.css';

/**
 * Groups follow-up suggestions shown below a system response.
 *
 * Provide heading content in `slot="heading"` and control semantics
 * (for example `h2`, `h3`, or `p`) from the consuming context. The heading
 * slot is required. The host exposes **`role="group"`** with **`aria-labelledby`**
 * pointing at the slotted heading so the accessible name resolves (labeling
 * is not applied to an inner shadow node, which cannot reference light DOM ids).
 *
 * Add one or more `<swc-suggestion-item>` elements to the default slot.
 *
 * @element swc-suggestion-group
 * @slot heading - Required heading content; consumer controls semantic element.
 * @slot - Suggestion items (recommended: `<swc-suggestion-item>`)
 */
export class SuggestionGroup extends SpectrumElement {
  /**
   * Accessible name override for the host `role="group"`. When set, it takes
   * precedence over `aria-labelledby` from the heading slot.
   */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel = '';

  @queryAssignedElements({ slot: 'heading', flatten: true })
  private _assignedHeadings: HTMLElement[] = [];

  private readonly _headingId = uniqueId('swc-suggestion-group-heading');

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  /**
   * Assigns a stable id to the slotted heading (when it lacks one) and
   * synchronises host ARIA attributes. Called on every `slotchange` so
   * the accessible name is always current after light-DOM mutations.
   */
  private _handleHeadingSlotChange(): void {
    const heading = this._assignedHeadings[0];
    if (heading && !heading.id) {
      heading.id = this._headingId;
    }
    this._syncHostGroupSemantics();
  }

  /**
   * `aria-labelledby` on nodes inside the shadow root cannot reliably
   * reference slotted light-DOM headings. Expose `role="group"` and
   * labeling on the host so the heading id resolves and assistive tech
   * gets a proper group name.
   */
  private _syncHostGroupSemantics(): void {
    const heading = this._assignedHeadings[0];
    const accessibleLabel = this.accessibleLabel.trim();

    if (!heading && !accessibleLabel) {
      this.removeAttribute('role');
      this.removeAttribute('aria-label');
      this.removeAttribute('aria-labelledby');
      return;
    }

    this.setAttribute('role', 'group');

    if (accessibleLabel) {
      this.setAttribute('aria-label', accessibleLabel);
      this.removeAttribute('aria-labelledby');
      return;
    }

    if (heading?.id) {
      this.setAttribute('aria-labelledby', heading.id);
      this.removeAttribute('aria-label');
      return;
    }

    this.removeAttribute('aria-label');
    this.removeAttribute('aria-labelledby');
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    if (changed.has('accessibleLabel')) {
      this._syncHostGroupSemantics();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-SuggestionGroup">
        <div class="swc-SuggestionGroup-title">
          <slot
            name="heading"
            @slotchange=${this._handleHeadingSlotChange}
          ></slot>
        </div>
        <div class="swc-SuggestionGroup-items">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
