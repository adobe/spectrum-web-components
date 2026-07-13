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
} from '@spectrum-web-components/core/components/divider';

import '@adobe/spectrum-wc/components/divider/swc-divider.js';

import {
  forcedColorsVrtParameters,
  row,
  staticColorBackground,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Divider/VRT',
  component: 'swc-divider',
  tags: ['dev'],
};

export default meta;

const horizontalDivider = (size: (typeof DIVIDER_VALID_SIZES)[number]) => html`
  <div style="inline-size: 220px;">
    <p>Account settings</p>
    <swc-divider size=${size}></swc-divider>
    <p>Team members</p>
  </div>
`;

const verticalDivider = (size: (typeof DIVIDER_VALID_SIZES)[number]) => html`
  <div style="display: flex; align-items: center; gap: 8px; block-size: 32px;">
    <span>Cut</span>
    <swc-divider size=${size} vertical></swc-divider>
    <span>Copy</span>
    <swc-divider size=${size} vertical></swc-divider>
    <span>Paste</span>
  </div>
`;

const dividerContent = () => html`
  ${row(DIVIDER_VALID_SIZES.map(horizontalDivider), 'Horizontal sizes')}
  ${row(DIVIDER_VALID_SIZES.map(verticalDivider), 'Vertical sizes')}
  ${DIVIDER_STATIC_COLORS.map((color) =>
    staticColorBackground(
      row(
        [
          html`
            <div style="inline-size: 220px;">
              <p>Dashboard settings</p>
              <swc-divider static-color=${color}></swc-divider>
              <p>Display options</p>
            </div>
          `,
          html`
            <div
              style="display: flex; align-items: center; gap: 8px; block-size: 32px;"
            >
              <span>Overview</span>
              <swc-divider static-color=${color} vertical></swc-divider>
              <span>Files</span>
            </div>
          `,
        ],
        `Static ${color}`
      ),
      color
    )
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(dividerContent(), 'light', 'ltr')}
    ${theme(dividerContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(dividerContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
