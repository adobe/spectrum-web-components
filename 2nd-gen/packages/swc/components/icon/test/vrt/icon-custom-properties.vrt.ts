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

import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import customElementsManifest from '../../../../.storybook/custom-elements.json';
import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import { Chevron100Icon } from '../../../icon/elements/index.js';

const meta: Meta = {
  title: 'Icon/VRT',
  component: 'swc-icon',
  tags: ['dev'],
};

export default meta;

const CUSTOM_PROPERTY_CASES: readonly CustomPropertyCase<`--swc-icon-${string}`>[] =
  [
    { property: '--swc-icon-color', value: 'magenta' },
    { property: '--swc-icon-inline-size', value: '32px' },
    { property: '--swc-icon-block-size', value: '16px' },
  ];

const renderIconCustomProperty = (
  _: CustomPropertyCase,
  style?: string
) => html`
  <swc-icon label="Chevron" style=${style ?? ''}>${Chevron100Icon()}</swc-icon>
`;

const coveredIconCustomProperties = coveredCustomProperties(
  CUSTOM_PROPERTY_CASES
);

const verifyCoverage = async () =>
  verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/icon/Icon.ts',
    declarationName: 'Icon',
    coveredProperties: coveredIconCustomProperties,
  });

export const CustomProperties: Story = {
  render: () =>
    theme(
      customPropertyRows(CUSTOM_PROPERTY_CASES, renderIconCustomProperty),
      'light',
      'ltr'
    ),
  parameters: vrtParameters,
  play: verifyCoverage,
};
