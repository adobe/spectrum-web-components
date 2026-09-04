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

import '../../swc-suggestion-item.js';

import type { CustomPropertyCase } from '../../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../../dist/custom-elements.json';

// Metadata

const meta: Meta = {
  title: 'AI Toolkit/Suggestion group/Suggestion item/Suggestion item VRT',
  component: 'swc-suggestion-item',
  tags: ['dev'],
};

export default meta;

// Helpers

// Every `--swc-suggestion-item-*` custom property is a public contract:
// consumers override these to restyle chip geometry (they map through to
// the composed button's public properties). One row per property: a
// reference chip next to the same chip with that one property overridden
// to an obviously different value, so a real difference confirms the
// override still works. The set below must cover every property the
// manifest documents for the component; the coverage assertion in the
// `play` function enforces this.
type SuggestionItemPropertyCase =
  CustomPropertyCase<`--swc-suggestion-item-${string}`>;

const MOD_PROPERTY_CASES: readonly SuggestionItemPropertyCase[] = [
  { property: '--swc-suggestion-item-min-block-size', value: '80px' },
  {
    property: '--swc-suggestion-item-icon-margin-inline-start',
    value: '40px',
  },
  {
    property: '--swc-suggestion-item-icon-margin-inline-end',
    value: '40px',
  },
  { property: '--swc-suggestion-item-label-padding-block', value: '16px' },
  {
    property: '--swc-suggestion-item-label-padding-inline-end',
    value: '40px',
  },
];

const renderPropertyCase = (
  _testCase: SuggestionItemPropertyCase,
  style?: string
) => html`
  <swc-suggestion-item style=${style ?? nothing}>
    Create a slide deck from this
  </swc-suggestion-item>
`;

const modPropertiesContent = () =>
  customPropertyRows(MOD_PROPERTY_CASES, renderPropertyCase);

const coveredSuggestionItemCustomProperties =
  coveredCustomProperties(MOD_PROPERTY_CASES);

const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'patterns/ai-toolkit/suggestion-item/SuggestionItem.ts',
    declarationName: 'SuggestionItem',
    coveredProperties: coveredSuggestionItemCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
