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

import { html, nothing } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '@adobe/spectrum-wc/components/thumbnail/swc-thumbnail.js';

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
  title: 'Thumbnail/Thumbnail VRT',
  component: 'swc-thumbnail',
  tags: ['dev'],
};

export default meta;

// Helpers

const SQUARE_SRC = './images/avatar-preview.png';

// 140px matches no `thumbnail-size-*` token.
const THUMBNAIL_PROPERTY_CASES: readonly CustomPropertyCase<`--swc-thumbnail-${string}`>[] =
  [{ property: '--swc-thumbnail-size', value: '140px' }];

const renderPropertyCase = (
  _case: CustomPropertyCase<`--swc-thumbnail-${string}`>,
  style?: string
) => html`
  <swc-thumbnail style=${style || nothing}>
    <img src=${SQUARE_SRC} alt="Preview" />
  </swc-thumbnail>
`;

const modPropertiesContent = () =>
  customPropertyRows(THUMBNAIL_PROPERTY_CASES, renderPropertyCase);

const coveredThumbnailCustomProperties = coveredCustomProperties(
  THUMBNAIL_PROPERTY_CASES
);

const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/thumbnail/Thumbnail.ts',
    declarationName: 'Thumbnail',
    coveredProperties: coveredThumbnailCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
