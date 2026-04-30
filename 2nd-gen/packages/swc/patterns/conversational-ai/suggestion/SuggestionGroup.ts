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
import { property, queryAssignedElements } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import { uniqueId } from '../../../utils/id.js';

import styles from './suggestion-group.css';

/**
 * Groups follow-up suggestions shown below a system response.
 *
 * Provide heading content in `slot="heading"` and control semantics
 * (for example `h2`, `h3`, or `p`) from the consuming context.
 *
 * Add one or more `<swc-suggestion-item>` elements to the default slot.
 *
 * @element swc-suggestion-group
 * @slot heading - Required heading content; consumer controls semantic element.
 * @slot - Suggestion items (recommended: `<swc-suggestion-item>`)
 */
export class SuggestionGroup extends SpectrumElement {
  /** Accessible label override for the group name (takes precedence over heading slot text). */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel = '';

  @queryAssignedElements({ slot: 'heading', flatten: true })
  private _assignedHeadingElements!: HTMLElement[];

  private readonly _headingId = uniqueId('swc-suggestion-group-heading');

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _getHeadingElement(): HTMLElement | null {
    const headingElement = this._assignedHeadingElements?.[0] ?? null;
    if (!headingElement) {
      return null;
    }
    return headingElement;
  }

  private _handleHeadingSlotChange(event: Event): void {
    const slot = event.target as HTMLSlotElement;
    const headingElement = slot.assignedElements({ flatten: true })[0] as
      | HTMLElement
      | undefined;
    if (headingElement && !headingElement.id) {
      headingElement.id = this._headingId;
    }
    this.requestUpdate();
  }

  protected override render(): TemplateResult {
    const headingElement = this._getHeadingElement();
    const hasHeading = headingElement !== null;
    const accessibleLabel = this.accessibleLabel.trim();
    const hasAccessibleLabel = accessibleLabel.length > 0;

    const computedAriaLabel = hasAccessibleLabel ? accessibleLabel : undefined;
    const computedAriaLabelledby =
      hasAccessibleLabel || !hasHeading ? undefined : headingElement?.id;

    return html`
      <div class="swc-SuggestionGroup">
        <div class="swc-SuggestionGroup-title" ?hidden=${!hasHeading}>
          <slot
            name="heading"
            @slotchange=${this._handleHeadingSlotChange}
          ></slot>
        </div>
        <div
          class="swc-SuggestionGroup-items"
          role="group"
          aria-label=${ifDefined(computedAriaLabel)}
          aria-labelledby=${ifDefined(computedAriaLabelledby)}
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}
