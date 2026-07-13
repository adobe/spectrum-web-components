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

import { ASSET_VARIANTS } from '@spectrum-web-components/core/components/asset';

import '@adobe/spectrum-wc/components/asset/swc-asset.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Asset/VRT',
  component: 'swc-asset',
  tags: ['dev'],
};

export default meta;

const imageAsset = html`
  <swc-asset label="User profile photo">
    <img
      src="https://picsum.photos/id/64/80/80"
      alt="Profile photo of Maria Rodriguez"
    />
  </swc-asset>
`;

const assetContent = () => html`
  ${row(
    [
      ...ASSET_VARIANTS.map(
        (variant) => html`
          <swc-asset variant=${variant} label="${variant} asset"></swc-asset>
        `
      ),
      imageAsset,
    ],
    'Variants'
  )}
  ${row(
    [
      html`
        <div style="inline-size: 48px; block-size: 96px;">${imageAsset}</div>
      `,
      html`
        <div style="inline-size: 128px; block-size: 64px;">${imageAsset}</div>
      `,
    ],
    'Image fit'
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(assetContent(), 'light', 'ltr')}
    ${theme(assetContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(assetContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
