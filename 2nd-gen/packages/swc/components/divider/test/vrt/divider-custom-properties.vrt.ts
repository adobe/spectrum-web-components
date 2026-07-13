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

import '@adobe/spectrum-wc/components/divider/swc-divider.js';

import customElementsManifest from '../../../../.storybook/custom-elements.json';
import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Divider/VRT',
  component: 'swc-divider',
  tags: ['dev'],
};

export default meta;

const CUSTOM_PROPERTY_CASES: readonly CustomPropertyCase<`--swc-divider-${string}`>[] =
  [
    { property: '--swc-divider-background-color', value: 'magenta' },
    { property: '--swc-divider-thickness', value: '8px' },
  ];

const renderDividerCustomProperty = (
  _: CustomPropertyCase,
  style?: string
) => html`
  <div style="inline-size: 220px;">
    <p>Account settings</p>
    <swc-divider style=${style ?? ''}></swc-divider>
    <p>Team members</p>
  </div>
`;

const coveredDividerCustomProperties = coveredCustomProperties(
  CUSTOM_PROPERTY_CASES
);

const verifyCoverage = async () =>
  verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/divider/Divider.ts',
    declarationName: 'Divider',
    coveredProperties: coveredDividerCustomProperties,
  });

const customPropertiesContent = () =>
  customPropertyRows(CUSTOM_PROPERTY_CASES, renderDividerCustomProperty);

export const CustomProperties: Story = {
  render: () => theme(customPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
