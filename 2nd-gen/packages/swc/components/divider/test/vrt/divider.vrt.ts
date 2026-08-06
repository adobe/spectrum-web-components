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

import { html } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  DIVIDER_STATIC_COLORS,
  DIVIDER_VALID_SIZES,
  type DividerSize,
  type DividerStaticColor,
} from '@adobe/spectrum-wc-core/components/divider';

import '@adobe/spectrum-wc/components/divider/swc-divider.js';

import {
  forcedColorsVrtParameters,
  row,
  staticColorBackground,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Divider/Divider VRT',
  component: 'swc-divider',
  tags: ['dev'],
};

export default meta;

// Helpers

const VERTICAL_BLOCK_SIZE = { s: 16, m: 24, l: 32 } as const;

const renderHorizontal = (size: DividerSize) => html`
  <div style="inline-size: 200px;">
    <h4>Account settings</h4>
    <p>Update your personal details, password, and preferences.</p>
    <swc-divider size=${size}></swc-divider>
    <h4>Team members</h4>
    <p>Manage your team roles and access permissions.</p>
  </div>
`;

const renderVertical = (size: DividerSize) => html`
  <div
    style="display: flex; align-items: center; gap: 8px; block-size: ${VERTICAL_BLOCK_SIZE[
      size
    ]}px;"
  >
    <span>Cut</span>
    <swc-divider size=${size} vertical></swc-divider>
    <span>Copy</span>
    <swc-divider size=${size} vertical></swc-divider>
    <span>Paste</span>
  </div>
`;

const renderStaticColorSample = (staticColor: DividerStaticColor) =>
  staticColorBackground(
    html`
      ${row(
        DIVIDER_VALID_SIZES.map(
          (size) => html`
            <div style="inline-size: 200px;">
              <h4>Dashboard settings</h4>
              <p>Configure your dashboard preferences and layout options.</p>
              <swc-divider
                size=${size}
                static-color=${staticColor}
              ></swc-divider>
              <h4>Display options</h4>
              <p>Adjust your layout and theme settings.</p>
            </div>
          `
        ),
        'Horizontal'
      )}
      ${row(
        DIVIDER_VALID_SIZES.map(
          (size) => html`
            <div
              style="display: flex; align-items: center; gap: 8px; block-size: ${VERTICAL_BLOCK_SIZE[
                size
              ]}px;"
            >
              <span>Cut</span>
              <swc-divider
                size=${size}
                static-color=${staticColor}
                vertical
              ></swc-divider>
              <span>Copy</span>
              <swc-divider
                size=${size}
                static-color=${staticColor}
                vertical
              ></swc-divider>
              <span>Paste</span>
            </div>
          `
        ),
        'Vertical'
      )}
    `,
    staticColor
  );

const permutationContent = () => html`
  ${row(DIVIDER_VALID_SIZES.map(renderHorizontal), 'Horizontal')}
  ${row(DIVIDER_VALID_SIZES.map(renderVertical), 'Vertical')}
  ${DIVIDER_STATIC_COLORS.map(renderStaticColorSample)}
`;

// VRT stories

// Every size (s/m/l), horizontal and vertical, plus both static-color values
// each at all three sizes. Rendered once in light/ltr and once in dark/rtl in
// a single story so it costs one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

// `forced-colors` replaces the whole page palette and swaps
// `--swc-divider-background-color` to `CanvasText` regardless of size or
// static-color, so a single representative size covers it; size and
// static-color don't interact with forced-colors differently.
export const ForcedColors: Story = {
  render: () => html`
    ${row([renderHorizontal('m')], 'Horizontal')}
    ${row([renderVertical('m')], 'Vertical')}
  `,
  parameters: forcedColorsVrtParameters,
};
