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
import { customElement, property } from 'lit/decorators.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

import opacityCheckerboardStyles from '../../../../stylesheets/_lit-styles/opacity-checkerboard.css';

@customElement('demo-opacity-checkerboard-vrt-swatch')
class DemoOpacityCheckerboardVrtSwatch extends LitElement {
  static override styles = [
    opacityCheckerboardStyles,
    css`
      .swatch {
        position: relative;
        inline-size: 120px;
        block-size: 120px;
        border: 1px solid var(--swc-gray-300, #ccc);
        border-radius: 4px;
        overflow: hidden;
      }
      .swc-OpacityCheckerboard,
      .fill {
        position: absolute;
        inset: 0;
      }
      .fill {
        background: var(--demo-fill, transparent);
      }
    `,
  ];

  @property()
  public color = 'transparent';

  @property({ reflect: true })
  public size: 'm' | 's' = 'm';

  protected override render(): TemplateResult {
    return html`
      <div class="swatch" style="--demo-fill: ${this.color}">
        <span
          class="swc-OpacityCheckerboard ${this.size === 's'
            ? 'swc-OpacityCheckerboard--sizeS'
            : ''}"
          aria-hidden="true"
        ></span>
        <span class="fill" aria-hidden="true"></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'demo-opacity-checkerboard-vrt-swatch': DemoOpacityCheckerboardVrtSwatch;
  }
}

const meta: Meta = {
  title: 'Opacity Checkerboard/Opacity Checkerboard VRT',
  component: 'demo-opacity-checkerboard-vrt-swatch',
  tags: ['dev'],
};

export default meta;

const swatch = (size: 'm' | 's', color: string) => html`
  <demo-opacity-checkerboard-vrt-swatch
    size=${size}
    color=${color}
  ></demo-opacity-checkerboard-vrt-swatch>
`;

export const Permutations: Story = {
  render: () =>
    theme(
      html`
        ${row(
          [
            swatch('m', 'transparent'),
            swatch('m', 'rgba(255 0 0 / 0.4)'),
            swatch('s', 'transparent'),
            swatch('s', 'rgba(20 115 230 / 0.5)'),
          ],
          'Sizes and opacity'
        )}
      `,
      'light',
      'ltr'
    ),
  parameters: vrtParameters,
};
