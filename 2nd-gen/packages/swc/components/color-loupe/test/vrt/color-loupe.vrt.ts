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

import '@adobe/spectrum-wc/components/color-loupe/swc-color-loupe.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Color Loupe/Color Loupe VRT',
  component: 'swc-color-loupe',
  tags: ['dev'],
};

export default meta;

const loupe = (label: string, color: string, open = true) => html`
  <div
    style="display: flex; flex-direction: column; align-items: center; gap: 4px;"
  >
    <div style="position: relative; inline-size: 48px; block-size: 64px;">
      <swc-color-loupe color=${color} ?open=${open}></swc-color-loupe>
    </div>
    <span style="font-size: 12px;">${label}</span>
  </div>
`;

const colorLoupeContent = () => html`
  ${row(
    [
      loupe('Named', 'yellow'),
      loupe('Hex', '#ff0000'),
      loupe('RGBA', 'rgba(44, 62, 224, 0.81)'),
      loupe('HSL', 'hsl(111 82% 56%)'),
    ],
    'Colors'
  )}
  ${row(
    [loupe('Open', '#1473e6'), loupe('Closed', '#1473e6', false)],
    'States'
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(colorLoupeContent(), 'light', 'ltr')}
    ${theme(colorLoupeContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(colorLoupeContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
