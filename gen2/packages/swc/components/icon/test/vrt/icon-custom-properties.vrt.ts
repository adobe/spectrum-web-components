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

import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../dist/custom-elements.json';
import { Chevron100Icon } from '../../elements/Chevron100Icon.js';

// Metadata

const meta: Meta = {
  title: 'Icon/Icon VRT',
  component: 'swc-icon',
  tags: ['dev'],
};

export default meta;

// Helpers

const iconSvg = Chevron100Icon();

// Every `--swc-icon-*` property documented via `@cssprop` in Icon.ts is a
// public contract: one row per property, a reference icon next to the same
// icon with that one property overridden to an obviously different value.
type IconPropertyCase = CustomPropertyCase<`--swc-icon-${string}`>;

const MOD_PROPERTY_CASES: readonly IconPropertyCase[] = [
  { property: '--swc-icon-color', value: 'magenta' },
  { property: '--swc-icon-inline-size', value: '48px' },
  { property: '--swc-icon-block-size', value: '48px' },
];

const modPropertyIcon = (_testCase: IconPropertyCase, style?: string) => html`
  <swc-icon accessible-label="Chevron icon" style=${style ?? nothing}>
    ${iconSvg}
  </swc-icon>
`;

const modPropertiesContent = () =>
  customPropertyRows(MOD_PROPERTY_CASES, modPropertyIcon);

const coveredIconCustomProperties = coveredCustomProperties(MOD_PROPERTY_CASES);

const verifyIconCustomPropertyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/icon/Icon.ts',
    declarationName: 'Icon',
    coveredProperties: coveredIconCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyIconCustomPropertyCoverage,
};
