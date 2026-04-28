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
import { ifDefined } from 'lit/directives/if-defined.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import styles from './suggestion-group.css';

/**
 * Groups follow-up suggestions shown below a system response.
 *
 * Add one or more `<swc-suggestion-item>` elements to the default slot.
 *
 * @element swc-suggestion-group
 * @slot - Suggestion items (recommended: `<swc-suggestion-item>`)
 * @attr heading-level - Semantic heading level for `heading` (`2`–`6`; clamped).
 */
export class SuggestionGroup extends SpectrumElement {
  /** Optional heading shown above suggestion items. */
  @property({ type: String })
  public heading = '';

  /**
   * Semantic heading level for the optional title (`h2`–`h6`).
   */
  @property({ type: Number, reflect: true, attribute: 'heading-level' })
  public headingLevel = 3;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _getHeadingLevel(): number {
    const level = this.headingLevel ?? 3;
    return Math.max(2, Math.min(6, level));
  }

  private _renderHeading(text: string): TemplateResult {
    const level = this._getHeadingLevel();

    switch (level) {
      case 2:
        return html`
          <h2
            id="swc-suggestion-group-heading"
            class="swc-SuggestionGroup-title"
          >
            ${text}
          </h2>
        `;
      case 4:
        return html`
          <h4
            id="swc-suggestion-group-heading"
            class="swc-SuggestionGroup-title"
          >
            ${text}
          </h4>
        `;
      case 5:
        return html`
          <h5
            id="swc-suggestion-group-heading"
            class="swc-SuggestionGroup-title"
          >
            ${text}
          </h5>
        `;
      case 6:
        return html`
          <h6
            id="swc-suggestion-group-heading"
            class="swc-SuggestionGroup-title"
          >
            ${text}
          </h6>
        `;
      default:
        return html`
          <h3
            id="swc-suggestion-group-heading"
            class="swc-SuggestionGroup-title"
          >
            ${text}
          </h3>
        `;
    }
  }

  protected override render(): TemplateResult {
    const heading = this.heading.trim();
    const hasHeading = heading.length > 0;

    return html`
      <div class="swc-SuggestionGroup">
        ${hasHeading ? this._renderHeading(heading) : ''}
        <div
          class="swc-SuggestionGroup-items"
          role="group"
          aria-label=${ifDefined(
            hasHeading ? undefined : 'Follow-up suggestions'
          )}
          aria-labelledby=${ifDefined(
            hasHeading ? 'swc-suggestion-group-heading' : undefined
          )}
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}
