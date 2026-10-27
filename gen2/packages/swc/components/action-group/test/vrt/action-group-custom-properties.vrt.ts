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

import '@adobe/spectrum-wc/components/action-group/swc-action-group.js';
import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';

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
  title: 'Action Group/Action Group VRT',
  component: 'swc-action-group',
  tags: ['dev'],
};

export default meta;

// Helpers

// `--swc-action-group-gap` is the only public custom property this component
// exposes; the coverage assertion in `play` still enforces that this list
// stays in sync with whatever the manifest documents, so a future added
// property doesn't silently go untested.
type ModPropertyCase = CustomPropertyCase<'--swc-action-group-gap'>;

const MOD_PROPERTY_CASES: readonly ModPropertyCase[] = [
  { property: '--swc-action-group-gap', value: '40px' },
];

const modPropertyGroup = (_testCase: ModPropertyCase, style?: string) => html`
  <swc-action-group accessible-label="Edit actions" style=${style ?? ''}>
    <swc-action-button>Cut</swc-action-button>
    <swc-action-button>Copy</swc-action-button>
    <swc-action-button>Paste</swc-action-button>
  </swc-action-group>
`;

const modPropertiesContent = () =>
  customPropertyRows(MOD_PROPERTY_CASES, modPropertyGroup);

const coveredActionGroupCustomProperties =
  coveredCustomProperties(MOD_PROPERTY_CASES);

const verifyCoverage = () =>
  verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/action-group/ActionGroup.ts',
    declarationName: 'ActionGroup',
    coveredProperties: coveredActionGroupCustomProperties,
  });

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
