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
import { classMap } from 'lit/directives/class-map.js';

import { SpectrumElement } from '@spectrum-web-components/core/element';

import styles from './list-view.css';

/**
 * A list view container that displays a vertical list of items.
 *
 * @element swc-list-view
 *
 * @slot - List view items (`swc-list-view-item`) to display
 *
 * @example
 * <swc-list-view>
 *   <swc-list-view-item label="Document A" description="PDF file"></swc-list-view-item>
 *   <swc-list-view-item label="Document B" description="Word file"></swc-list-view-item>
 * </swc-list-view>
 */
export class ListView extends SpectrumElement {
  /**
   * When true, removes the outer border and background for a quieter appearance.
   */
  @property({ type: Boolean, reflect: true })
  public quiet: boolean = false;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    const classes = {
      'swc-ListView': true,
      'swc-ListView--quiet': this.quiet,
    };

    return html`
      <div class=${classMap(classes)} role="list">
        <slot></slot>
      </div>
    `;
  }
}
