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

import '@adobe/spectrum-wc/components/meter/swc-meter.js';

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
  title: 'Meter/Meter VRT',
  component: 'swc-meter',
  tags: ['dev'],
};

export default meta;

// Helpers

// Every `--swc-linear-progress-*` custom property documented on
// `<swc-meter>` (see Meter.ts's `@cssprop` list) is a public contract that
// `<swc-meter>` shares with the not-yet-migrated `<swc-progress-bar>`. One
// row per property: a reference meter next to the same meter with that one
// property overridden to an obviously different value, so a real difference
// confirms the override still works.
type MeterPropertyCase = CustomPropertyCase<`--swc-linear-progress-${string}`>;

// One shared dark plum for all three color properties: #1a001a clears 3:1
// against both the default blue fill and the default gray track, and 4.5:1
// as text against the page background.
const DEEP_PLUM = '#1a001a';

const MOD_PROPERTY_CASES: readonly MeterPropertyCase[] = [
  { property: '--swc-linear-progress-fill-color', value: DEEP_PLUM },
  { property: '--swc-linear-progress-track-color', value: DEEP_PLUM },
  { property: '--swc-linear-progress-text-color', value: DEEP_PLUM },
  { property: '--swc-linear-progress-thickness', value: '40px' },
  { property: '--swc-linear-progress-font-size', value: '32px' },
  { property: '--swc-linear-progress-top-to-text', value: '40px' },
];

const modPropertyMeter = (_case: MeterPropertyCase, style?: string) => html`
  <swc-meter value="60" style=${style ?? nothing}>
    <span slot="label">Storage used</span>
  </swc-meter>
`;

const modPropertiesContent = () =>
  customPropertyRows(MOD_PROPERTY_CASES, modPropertyMeter);

const coveredMeterCustomProperties =
  coveredCustomProperties(MOD_PROPERTY_CASES);

const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/meter/Meter.ts',
    declarationName: 'Meter',
    coveredProperties: coveredMeterCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
