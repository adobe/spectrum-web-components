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

import '@adobe/spectrum-wc/components/ui-icons/swc-ui-icon.js';

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
  title: 'UI icons/UI icons VRT',
  component: 'swc-ui-icon',
  tags: ['dev'],
};

export default meta;

// Helpers

type UiIconPropertyCase = CustomPropertyCase<`--swc-icon-${string}`>;

const MOD_PROPERTY_CASES: readonly UiIconPropertyCase[] = [
  { property: '--swc-icon-color', value: 'magenta' },
];

const modPropertyIcon = (_testCase: UiIconPropertyCase, style?: string) => html`
  <swc-ui-icon
    icon="chevron"
    accessible-label="Chevron"
    style=${ifDefined(style)}
  ></swc-ui-icon>
`;

const modPropertiesContent = () =>
  customPropertyRows(MOD_PROPERTY_CASES, modPropertyIcon);

const coveredUiIconCustomProperties =
  coveredCustomProperties(MOD_PROPERTY_CASES);

const verifyUiIconCustomPropertyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/ui-icons/UiIcon.ts',
    declarationName: 'UiIcon',
    coveredProperties: coveredUiIconCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyUiIconCustomPropertyCoverage,
};
