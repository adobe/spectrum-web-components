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
import { classMap } from 'lit/directives/class-map.js';

import { ButtonGroupBase } from '@spectrum-web-components/core/components/button-group';
import { capitalize } from '@spectrum-web-components/core/utils/index.js';

import styles from './button-group.css';

/**
 * A button group clusters related actions together, providing consistent
 * spacing, sizing, and orientation.
 *
 * @element swc-button-group
 * @since 2.0.0
 *
 * @slot - One or more `swc-button` elements.
 *
 * @cssprop --swc-button-group-gap - Space between buttons in the group.
 * @cssprop --swc-button-group-justify-content - Alignment of buttons within the group along the main axis.
 */
export class ButtonGroup extends ButtonGroupBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class=${classMap({
          ['swc-ButtonGroup']: true,
          ['swc-ButtonGroup--vertical']: this.orientation === 'vertical',
          [`swc-ButtonGroup--size${this.size?.toUpperCase()}`]:
            this.size != null,
          [`swc-ButtonGroup--align${capitalize(this.align)}`]:
            this.align !== 'start',
        })}
      >
        <slot @slotchange=${this.handleSlotchange}></slot>
      </div>
    `;
  }
}
