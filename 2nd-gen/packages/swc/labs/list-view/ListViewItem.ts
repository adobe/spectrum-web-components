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

import { CSSResultArray, html, nothing, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { SpectrumElement } from '@spectrum-web-components/core/element';
import '@adobe/spectrum-wc/icon';
import { Chevron100Icon, Checkmark100Icon } from '@adobe/spectrum-wc/icon';

import styles from './list-view-item.css';

/**
 * A single item within a list view, representing one row.
 *
 * @element swc-list-view-item
 *
 * @slot icon - An optional icon to display before the label
 *
 * @example
 * <swc-list-view-item
 *   label="Atlantic Ocean"
 *   description="12 items"
 *   navigable
 * ></swc-list-view-item>
 */
export class ListViewItem extends SpectrumElement {
  /**
   * The primary text label for this item.
   */
  @property({ type: String, reflect: true })
  public label: string = '';

  /**
   * Secondary description text displayed below the label.
   */
  @property({ type: String, reflect: true })
  public description: string = '';

  /**
   * Whether this item is currently selected.
   */
  @property({ type: Boolean, reflect: true })
  public selected: boolean = false;

  /**
   * Whether this item is disabled.
   */
  @property({ type: Boolean, reflect: true })
  public disabled: boolean = false;

  /**
   * Whether this item shows a navigation chevron indicating it is drillable.
   */
  @property({ type: Boolean, reflect: true })
  public navigable: boolean = false;

  /**
   * Whether this item shows a selection checkbox. Defaults to true.
   */
  @property({ type: Boolean, reflect: true })
  public selectable: boolean = true;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _handleClick(): void {
    if (this.disabled) return;
    if (this.selectable) {
      this.selected = !this.selected;
      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: { selected: this.selected },
        })
      );
    }
  }

  private _renderCheckbox(): TemplateResult | typeof nothing {
    if (!this.selectable) return nothing;

    const checkboxClasses = {
      'swc-ListViewItem-checkbox': true,
      'swc-ListViewItem-checkbox--checked': this.selected,
    };

    return html`
      <span class=${classMap(checkboxClasses)} aria-hidden="true">
        ${this.selected
          ? html`<swc-icon>${Checkmark100Icon()}</swc-icon>`
          : nothing}
      </span>
    `;
  }

  private _renderChevron(): TemplateResult | typeof nothing {
    if (!this.navigable) return nothing;

    return html`
      <span class="swc-ListViewItem-chevron" aria-hidden="true">
        <swc-icon>${Chevron100Icon()}</swc-icon>
      </span>
    `;
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class="swc-ListViewItem-row"
        role="listitem"
        aria-selected=${this.selectable ? String(this.selected) : nothing}
        aria-disabled=${String(this.disabled)}
        @click=${this._handleClick}
      >
        ${this._renderCheckbox()}
        <span class="swc-ListViewItem-icon">
          <slot name="icon"></slot>
        </span>
        <span class="swc-ListViewItem-text">
          <span class="swc-ListViewItem-label">${this.label}</span>
          ${this.description
            ? html`<span class="swc-ListViewItem-description"
                >${this.description}</span
              >`
            : nothing}
        </span>
        ${this._renderChevron()}
      </div>
    `;
  }
}
