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
import { customElement } from 'lit/decorators.js';

import { LabellingMixin } from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-labelling-host': DemoLabellingHost;
  }
}

const DEMO_STYLES = css`
  :host {
    display: inline-flex;
    flex-direction: column;
    gap: 4px;
    font: inherit;
  }

  input {
    box-sizing: border-box;
    padding: 6px 8px;
    font: inherit;
    border: 1px solid var(--swc-gray-500);
    border-radius: 4px;
  }
`;

/**
 * @internal
 *
 * Storybook-only host that consumes {@link LabellingMixin} directly, the way
 * a non-text-field component would: it renders a bare `<input>` as its role
 * element and calls `renderLabel()` in its own template.
 */
@customElement('demo-labelling-host')
export class DemoLabellingHost extends LabellingMixin(LitElement) {
  static override styles = DEMO_STYLES;

  private get _inputId(): string {
    return 'demo-labelling-host-input';
  }

  public override get roleElement(): HTMLInputElement | null {
    return this.renderRoot.querySelector('input');
  }

  protected override render(): TemplateResult {
    return html`
      ${this.renderLabel(this._inputId)}
      <input id=${this._inputId} />
    `;
  }
}
