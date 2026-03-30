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
import { property, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { SpectrumElement } from '@spectrum-web-components/core/element';
import '@adobe/spectrum-wc/icon';
import { Cross100Icon } from '@adobe/spectrum-wc/icon';

import styles from './tag-field.css';

/**
 * A tag field component for adding and editing multiple tags.
 * Users can type text and press Enter or comma to add tags,
 * and click the dismiss button to remove them.
 *
 * @element swc-tag-field
 *
 * @example
 * <swc-tag-field label="Tags" .tags=${['Design', 'Code']}></swc-tag-field>
 */
export class TagField extends SpectrumElement {
  /**
   * The label text displayed above the field.
   */
  @property({ type: String })
  public label: string = '';

  /**
   * The list of tag strings currently in the field.
   */
  @property({ type: Array })
  public tags: string[] = [];

  /**
   * When true, disables the entire field.
   */
  @property({ type: Boolean, reflect: true })
  public disabled: boolean = false;

  /**
   * Placeholder text shown when no tags are present and the input is empty.
   */
  @property({ type: String })
  public placeholder: string = '';

  @query('input')
  private inputEl!: HTMLInputElement;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      const value = this.inputEl.value.trim();
      if (value) {
        this.tags = [...this.tags, value];
        this.inputEl.value = '';
        this.dispatchChange();
      }
    } else if (
      event.key === 'Backspace' &&
      this.inputEl.value === '' &&
      this.tags.length > 0
    ) {
      this.tags = this.tags.slice(0, -1);
      this.dispatchChange();
    }
  }

  private removeTag(index: number): void {
    if (this.disabled) return;
    this.tags = this.tags.filter((_, i) => i !== index);
    this.dispatchChange();
  }

  private handleContainerClick(): void {
    if (!this.disabled) {
      this.inputEl.focus();
    }
  }

  private dispatchChange(): void {
    this.dispatchEvent(
      new Event('change', { bubbles: true, composed: true })
    );
  }

  protected override render(): TemplateResult {
    return html`
      ${this.label
        ? html`<label class="swc-TagField-label">${this.label}</label>`
        : nothing}
      <div
        class="swc-TagField-container"
        @click=${this.handleContainerClick}
      >
        ${repeat(
          this.tags,
          (tag, index) => `${tag}-${index}`,
          (tag, index) => html`
            <span class="swc-TagField-tag">
              <span class="swc-TagField-tagText">${tag}</span>
              <button
                class="swc-TagField-tagDismiss"
                aria-label="Remove ${tag}"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this.removeTag(index);
                }}
              >
                <swc-icon size="xs">${Cross100Icon()}</swc-icon>
              </button>
            </span>
          `
        )}
        <input
          class="swc-TagField-input"
          type="text"
          placeholder=${this.tags.length === 0 ? this.placeholder : ''}
          ?disabled=${this.disabled}
          @keydown=${this.handleKeyDown}
        />
      </div>
    `;
  }
}
