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

import '@adobe/spectrum-wc/components/button-group/swc-button-group.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';

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
  title: 'Button Group/VRT',
  component: 'swc-button-group',
  tags: ['dev'],
};

export default meta;

const CUSTOM_PROPERTY_CASES: readonly CustomPropertyCase<`--swc-button-group-${string}`>[] =
  [
    { property: '--swc-button-group-gap', value: '32px' },
    { property: '--swc-button-group-justify-content', value: 'center' },
  ];

const renderButtonGroupCustomProperty = (
  _: CustomPropertyCase,
  style?: string
) => html`
  <swc-button-group style=${style ?? ''}>
    <swc-button>Save</swc-button>
    <swc-button>Cancel</swc-button>
    <swc-button>Reset</swc-button>
  </swc-button-group>
`;

const coveredButtonGroupCustomProperties = coveredCustomProperties(
  CUSTOM_PROPERTY_CASES
);

const verifyCoverage = async () =>
  verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/button-group/ButtonGroup.ts',
    declarationName: 'ButtonGroup',
    coveredProperties: coveredButtonGroupCustomProperties,
  });

const customPropertiesContent = () =>
  customPropertyRows(CUSTOM_PROPERTY_CASES, renderButtonGroupCustomProperty);

export const CustomProperties: Story = {
  render: () => theme(customPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
