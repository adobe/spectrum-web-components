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

import {
  css,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { ColorController } from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-color-playground': DemoColorPlayground;
    'demo-color-formats': DemoColorFormats;
  }
}

const sharedStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    padding: 24px;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-block-end: 8px;
  }

  .swatch {
    inline-size: 40px;
    block-size: 40px;
    border-radius: 4px;
    border: 1px solid currentcolor;
    flex: none;
  }

  code {
    font-family: monospace;
  }

  dl {
    margin: 0;
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 4px 12px;
  }

  dt {
    font-weight: 700;
  }

  dd {
    margin: 0;
  }

  .arrow {
    opacity: 0.6;
  }
`;

/** CSS-renderable hex (with optional alpha) for the swatch background. */
function toSwatchColor(controller: ColorController): string {
  return (controller.color.to('srgb') as typeof controller.color).toString({
    format: 'hex',
  });
}

/** Renders the controller's normalized `colorValue` as a string for display. */
function formatColorValue(controller: ColorController): string {
  const value = controller.colorValue;
  return typeof value === 'string' ? value : JSON.stringify(value);
}

/**
 * Single-input playground: feeds `value` (and optional `manage-as` space) into a
 * `ColorController` and reports the resolved swatch, normalized `colorValue`, HSL
 * string, and hue.
 */
@customElement('demo-color-playground')
export class DemoColorPlayground extends LitElement {
  static override styles = sharedStyles;

  @property({ type: String })
  value = 'rgb(120, 180, 240)';

  @property({ type: String, attribute: 'manage-as' })
  manageAs?: string;

  @state()
  private controller = new ColorController(this);

  protected override willUpdate(changed: PropertyValues<this>): void {
    // `manageAs` is fixed at construction, so rebuild the controller when it changes.
    if (changed.has('manageAs')) {
      this.controller = new ColorController(this, {
        manageAs: this.manageAs || undefined,
      });
    }
    if (changed.has('value') || changed.has('manageAs')) {
      this.controller.color = this.value;
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="row">
        <span
          class="swatch"
          style="background:${toSwatchColor(this.controller)}"
        ></span>
        <dl>
          <dt>Input</dt>
          <dd><code>${this.value}</code></dd>
          <dt>colorValue</dt>
          <dd><code>${formatColorValue(this.controller)}</code></dd>
          <dt>HSL string</dt>
          <dd><code>${this.controller.getHslString()}</code></dd>
          <dt>hue</dt>
          <dd><code>${Math.round(this.controller.hue)}</code></dd>
        </dl>
      </div>
    `;
  }
}

const FORMAT_EXAMPLES = [
  'rgb(120, 180, 240)',
  'rgba(255, 87, 51, 0.6)',
  'rgb(50%, 25%, 75%)',
  'hsl(200, 80%, 60%)',
  'hsla(120, 100%, 50%, 0.5)',
  'hsv(280, 70%, 90%)',
  '#ff5733',
  '#ff573380',
];

/**
 * Shows that `colorValue` round-trips each supported input format back to the
 * same notation (comma/percent/alpha preserved), alongside the resolved swatch.
 */
@customElement('demo-color-formats')
export class DemoColorFormats extends LitElement {
  static override styles = sharedStyles;

  protected override render(): TemplateResult {
    return html`
      ${FORMAT_EXAMPLES.map((input) => {
        const controller = new ColorController(this);
        controller.color = input;
        return html`
          <div class="row">
            <span
              class="swatch"
              style="background:${toSwatchColor(controller)}"
            ></span>
            <code>${input}</code>
            <span class="arrow">→</span>
            <code>${formatColorValue(controller)}</code>
          </div>
        `;
      })}
    `;
  }
}
