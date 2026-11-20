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
  | '--swc-divider-background-color'
  | '--swc-divider-minimum-block-size'
  | '--swc-divider-minimum-inline-size'
  | '--swc-divider-thickness'
>;

const DIVIDER_PROPERTY_CASES: readonly DividerPropertyCase[] = [
  { property: '--swc-divider-background-color', value: 'magenta' },
  { property: '--swc-divider-minimum-block-size', value: '40px' },
  { property: '--swc-divider-minimum-inline-size', value: '40px' },
  { property: '--swc-divider-thickness', value: '20px' },
];

const CONTAINER_STYLE =
  'box-sizing: border-box; border: 1px dashed var(--swc-gray-500, #909090);';
const SIBLING_STYLE =
  'flex: none; inline-size: 200px; block-size: 16px; background: var(--swc-gray-400, #b0b0b0);';

// The inline minimum is the floor a horizontal divider can shrink to, so it
// goes in a flex row with a sibling that leaves less room than the default
// minimum. The reference cell holds the default floor and overflows the
// container; the override lets the divider shrink to fit. The block minimum
// only applies when the container gives a vertical divider no height, so it
// goes in plain flow, where the reference falls back to one line of text. Both
// are centered so the divider itself is easy to see.
const renderPropertyCase = (testCase: DividerPropertyCase, style?: string) => {
  switch (testCase.property) {
    case '--swc-divider-minimum-inline-size':
      return html`
        <div
          style="display: flex; align-items: center; overflow: hidden; inline-size: 240px; block-size: 48px; ${CONTAINER_STYLE}"
        >
          <swc-divider style=${style ?? nothing}></swc-divider>
          <div style=${SIBLING_STYLE}></div>
        </div>
      `;
    case '--swc-divider-minimum-block-size':
      return html`
        <div
          style="display: flex; align-items: center; justify-content: center; inline-size: 240px; block-size: 64px; ${CONTAINER_STYLE}"
        >
          <div style="outline: 1px dashed magenta;">
            <swc-divider vertical style=${style ?? nothing}></swc-divider>
          </div>
        </div>
      `;
    default:
      return html`
        <div style="inline-size: 200px;">
          <swc-divider style=${style ?? nothing}></swc-divider>
        </div>
      `;
  }
};

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
