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

import { ICON_VALID_SIZES } from '@spectrum-web-components/core/components/icon';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import {
  Arrow100Icon,
  Chevron100Icon,
  Cross100Icon,
} from '../../../icon/elements/index.js';

const meta: Meta = {
  title: 'Icon/VRT',
  component: 'swc-icon',
  tags: ['dev'],
};

export default meta;

const icon = (
  label: string,
  size: (typeof ICON_VALID_SIZES)[number],
  svg = Chevron100Icon()
) => html`
  <swc-icon label=${label} size=${size}>${svg}</swc-icon>
`;

const iconContent = () => html`
  ${row(
    ICON_VALID_SIZES.map((size) => icon(`Size ${size}`, size)),
    'Sizes'
  )}
  ${row(
    [
      icon('Chevron', 'm', Chevron100Icon()),
      icon('Arrow', 'm', Arrow100Icon()),
      icon('Cross', 'm', Cross100Icon()),
    ],
    'Sources'
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(iconContent(), 'light', 'ltr')}
    ${theme(iconContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(iconContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
