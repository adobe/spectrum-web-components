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

import '@adobe/spectrum-wc/components/meter/swc-meter.js';

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
  title: 'Meter/Meter VRT',
  component: 'swc-meter',
  tags: ['dev'],
};

export default meta;

const CUSTOM_PROPERTY_CASES: readonly CustomPropertyCase<`--swc-linear-progress-${string}`>[] =
  [
    { property: '--swc-linear-progress-fill-color', value: 'magenta' },
    { property: '--swc-linear-progress-track-color', value: 'magenta' },
    { property: '--swc-linear-progress-text-color', value: 'magenta' },
    { property: '--swc-linear-progress-thickness', value: '16px' },
    { property: '--swc-linear-progress-font-size', value: '24px' },
    { property: '--swc-linear-progress-top-to-text', value: '32px' },
  ];

const renderMeterCustomProperty = (
  _: CustomPropertyCase,
  style?: string
) => html`
  <swc-meter value="60" style="inline-size: 220px; ${style ?? ''}">
    <span slot="label">Storage used</span>
    <span slot="description">Add details to reach 100%.</span>
  </swc-meter>
`;

const coveredMeterCustomProperties = coveredCustomProperties(
  CUSTOM_PROPERTY_CASES
);

const verifyCoverage = async () =>
  verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/meter/Meter.ts',
    declarationName: 'Meter',
    coveredProperties: coveredMeterCustomProperties,
  });

export const CustomProperties: Story = {
  render: () =>
    theme(
      customPropertyRows(CUSTOM_PROPERTY_CASES, renderMeterCustomProperty),
      'light',
      'ltr'
    ),
  parameters: vrtParameters,
  play: verifyCoverage,
};
