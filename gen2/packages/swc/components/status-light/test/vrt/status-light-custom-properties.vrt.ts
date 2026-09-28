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

// Metadata

const meta: Meta = {
  title: 'Status light/Status light VRT',
  component: 'swc-status-light',
  tags: ['dev'],
};

export default meta;

// Helpers

// --swc-status-light-line-height only becomes visibly distinct once the
// label wraps to more than one line, so that case renders at a constrained
// width with a multi-word label instead of the plain default.
type StatusLightPropertyCase =
  CustomPropertyCase<`--swc-status-light-${string}`> & {
    wrap?: boolean;
  };

const STATUS_LIGHT_PROPERTY_CASES: readonly StatusLightPropertyCase[] = [
  { property: '--swc-status-light-dot-size', value: '32px' },
  { property: '--swc-status-light-dot-color', value: 'magenta' },
  { property: '--swc-status-light-font-size', value: '24px' },
  { property: '--swc-status-light-line-height', value: '32px', wrap: true },
  { property: '--swc-status-light-text-to-visual', value: '32px' },
  { property: '--swc-status-light-content-color', value: 'magenta' },
];

const renderPropertyCase = (
  { wrap }: StatusLightPropertyCase,
  style?: string
) => {
  const wrapStyle = wrap ? 'max-inline-size: 140px;' : '';
  const combinedStyle = `${wrapStyle}${style ?? ''}`;
  const label = wrap ? 'Document review pending approval' : 'Archived';

  return html`
    <swc-status-light style=${combinedStyle || nothing}>
      ${label}
    </swc-status-light>
  `;
};

const modPropertiesContent = () =>
  customPropertyRows(STATUS_LIGHT_PROPERTY_CASES, renderPropertyCase);

const coveredStatusLightCustomProperties = coveredCustomProperties(
  STATUS_LIGHT_PROPERTY_CASES
);

const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/status-light/StatusLight.ts',
    declarationName: 'StatusLight',
    coveredProperties: coveredStatusLightCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
