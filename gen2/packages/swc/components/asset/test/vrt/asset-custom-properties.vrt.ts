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
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '@adobe/spectrum-wc/components/asset/swc-asset.js';

import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../dist/custom-elements.json';

// Metadata

const meta: Meta = {
  title: 'Asset/Asset VRT',
  component: 'swc-asset',
  tags: ['dev'],
};

export default meta;

// Helpers

const LANDSCAPE_SRC = './images/landscape-asset.jpg';

// --swc-asset-background-color only resolves when `background="solid"` is
// set, and only shows against a fixed box with a mismatched image under
// `fit="contain"` (otherwise the image covers the box and no background is
// visible), so each case renders in the context where its property is
// actually live.
type AssetPropertyCase = CustomPropertyCase<`--swc-asset-${string}`> & {
  background?: 'solid';
  fit?: 'contain';
  width?: string;
  height?: string;
};

const ASSET_PROPERTY_CASES: readonly AssetPropertyCase[] = [
  { property: '--swc-asset-aspect-ratio', value: '1', width: '120px' },
  {
    property: '--swc-asset-background-color',
    value: 'cyan',
    background: 'solid',
    fit: 'contain',
    width: '120px',
    height: '120px',
  },
];

const renderPropertyCase = (
  { background, fit, width, height }: AssetPropertyCase,
  style?: string
) => html`
  <swc-asset
    background=${ifDefined(background)}
    fit=${ifDefined(fit)}
    width=${ifDefined(width)}
    height=${ifDefined(height)}
    style=${ifDefined(style)}
  >
    <img src=${LANDSCAPE_SRC} alt="Preview" />
  </swc-asset>
`;

const modPropertiesContent = () =>
  customPropertyRows(ASSET_PROPERTY_CASES, renderPropertyCase);

const coveredAssetCustomProperties =
  coveredCustomProperties(ASSET_PROPERTY_CASES);

const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/asset/Asset.ts',
    declarationName: 'Asset',
    coveredProperties: coveredAssetCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
