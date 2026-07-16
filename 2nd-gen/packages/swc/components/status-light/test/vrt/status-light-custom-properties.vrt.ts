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

import '@adobe/spectrum-wc/components/status-light/swc-status-light.js';

import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../dist/custom-elements.json';

const meta: Meta = {
  title: 'Status light/Status light VRT',
  component: 'swc-status-light',
  tags: ['dev'],
};

export default meta;

type StatusLightCustomPropertyCase =
  CustomPropertyCase<`--swc-status-light-${string}`> & {
    label?: string;
  };

const CUSTOM_PROPERTY_CASES: readonly StatusLightCustomPropertyCase[] = [
  { property: '--swc-status-light-dot-size', value: '24px' },
  { property: '--swc-status-light-dot-color', value: 'magenta' },
  { property: '--swc-status-light-font-size', value: '24px' },
  { property: '--swc-status-light-line-height', value: '32px' },
  { property: '--swc-status-light-text-to-visual', value: '32px' },
  { property: '--swc-status-light-content-color', value: 'magenta' },
];

const renderStatusLightCustomProperty = (
  { label = 'Approved' }: StatusLightCustomPropertyCase,
  style?: string
) => html`
  <swc-status-light variant="positive" style=${style ?? ''}>
    ${label}
  </swc-status-light>
`;

const coveredStatusLightCustomProperties = coveredCustomProperties(
  CUSTOM_PROPERTY_CASES
);

const verifyCoverage = async () =>
  verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/status-light/StatusLight.ts',
    declarationName: 'StatusLight',
    coveredProperties: coveredStatusLightCustomProperties,
  });

const customPropertiesContent = () =>
  customPropertyRows(CUSTOM_PROPERTY_CASES, renderStatusLightCustomProperty);

export const CustomProperties: Story = {
  render: () => theme(customPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
