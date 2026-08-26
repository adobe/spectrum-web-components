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

import '@adobe/spectrum-wc/components/divider/swc-divider.js';

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
  title: 'Divider/Divider VRT',
  component: 'swc-divider',
  tags: ['dev'],
};

export default meta;

// Helpers
type DividerPropertyCase = CustomPropertyCase<
  '--swc-divider-background-color' | '--swc-divider-thickness'
>;

const DIVIDER_PROPERTY_CASES: readonly DividerPropertyCase[] = [
  { property: '--swc-divider-background-color', value: 'magenta' },
  { property: '--swc-divider-thickness', value: '20px' },
];

const renderPropertyCase = (
  _testCase: DividerPropertyCase,
  style?: string
) => html`
  <div style="inline-size: 200px;">
    <swc-divider style=${style ?? nothing}></swc-divider>
  </div>
`;

const modPropertiesContent = () =>
  customPropertyRows(DIVIDER_PROPERTY_CASES, renderPropertyCase);

const coveredDividerCustomProperties = coveredCustomProperties(
  DIVIDER_PROPERTY_CASES
);

const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/divider/Divider.ts',
    declarationName: 'Divider',
    coveredProperties: coveredDividerCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
