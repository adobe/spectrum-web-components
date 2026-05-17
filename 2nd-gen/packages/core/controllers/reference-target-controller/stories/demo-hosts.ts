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

import { css, html, LitElement, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import {
  type ForwardableAttribute,
  ReferenceTargetController,
} from '../index.js';

/**
 * A demo custom element wrapping a text input inside shadow DOM.
 * The `ReferenceTargetController` forwards labelling relationships
 * from light DOM to the shadow-internal `<input>`.
 *
 * Usage:
 * ```html
 * <label for="my-input">Name</label>
 * <demo-labeled-input id="my-input"></demo-labeled-input>
 * ```
 */
export class DemoLabeledInput extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
    }
    input {
      font: inherit;
      padding: 4px 8px;
      border: 1px solid #767676;
      border-radius: 4px;
    }
    input:focus {
      outline: 2px solid #0265dc;
      outline-offset: 1px;
    }
  `;

  @property({ type: String }) value = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  private refTarget = new ReferenceTargetController(this, {
    target: '#internal-input',
    forwardedAttributes: [
      'aria-labelledby',
      'aria-describedby',
      'aria-errormessage',
    ] as ForwardableAttribute[],
  });

  override connectedCallback(): void {
    super.connectedCallback();
    this.refTarget.syncLabelFor();
  }

  protected override render(): TemplateResult {
    return html`
      <input
        id="internal-input"
        type="text"
        .value=${this.value}
        ?disabled=${this.disabled}
        @input=${this.handleInput}
      />
    `;
  }

  private handleInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.dispatchEvent(
      new CustomEvent('change', { detail: this.value, bubbles: true })
    );
  }
}

/**
 * A demo element that uses `aria-describedby` forwarding.
 * The description element is in light DOM; the target input is in shadow DOM.
 */
export class DemoDescribedInput extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
    }
    input {
      font: inherit;
      padding: 4px 8px;
      border: 1px solid #767676;
      border-radius: 4px;
    }
  `;

  @property({ type: String }) value = '';

  private refTarget = new ReferenceTargetController(this, {
    target: '#described-input',
    forwardedAttributes: [
      'aria-labelledby',
      'aria-describedby',
    ] as ForwardableAttribute[],
  });

  override connectedCallback(): void {
    super.connectedCallback();
    this.refTarget.syncLabelFor();
  }

  protected override render(): TemplateResult {
    return html`
      <input
        id="described-input"
        type="text"
        .value=${this.value}
        @input=${this.handleInput}
      />
    `;
  }

  private handleInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
  }
}

customElements.define('demo-labeled-input', DemoLabeledInput);
customElements.define('demo-described-input', DemoDescribedInput);
