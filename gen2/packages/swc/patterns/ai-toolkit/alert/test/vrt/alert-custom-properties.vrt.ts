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

import '../../swc-alert.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/close-button/swc-close-button.js';

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
  title: 'AI Toolkit/Alert/Alert VRT',
  component: 'swc-alert',
  tags: ['dev'],
};

export default meta;

// Helpers

type AlertPropertyCase = CustomPropertyCase<`--swc-alert-${string}`>;

const PROPERTY_CASES: readonly AlertPropertyCase[] = [
  { property: '--swc-alert-background-color', value: '#ffe600' },
  { property: '--swc-alert-border-color', value: 'magenta' },
  { property: '--swc-alert-border-width', value: '5px' },
  { property: '--swc-alert-border-radius', value: '0px' },
  { property: '--swc-alert-content-color', value: 'rebeccapurple' },
  { property: '--swc-alert-icon-color', value: 'rebeccapurple' },
  { property: '--swc-alert-icon-size', value: '36px' },
  { property: '--swc-alert-min-block-size', value: '64px' },
  { property: '--swc-alert-gap', value: '48px' },
  { property: '--swc-alert-padding-block', value: '24px' },
  { property: '--swc-alert-padding-inline-start', value: '48px' },
  { property: '--swc-alert-padding-inline-end', value: '48px' },
  { property: '--swc-alert-trailing-gap', value: '56px' },
  { property: '--swc-alert-font-family', value: 'monospace' },
  { property: '--swc-alert-font-size', value: '24px' },
  { property: '--swc-alert-font-weight', value: '900' },
  { property: '--swc-alert-line-height', value: '48px' },
];

const renderPropertyCase = (_case: AlertPropertyCase, style?: string) => html`
  <swc-alert variant="notice" style="inline-size: 280px; ${style ?? ''}">
    <span>Message text</span>
    <swc-button slot="actions" size="s">Try again</swc-button>
    <swc-close-button
      slot="dismiss"
      size="s"
      accessible-label="Dismiss message"
    ></swc-close-button>
  </swc-alert>
`;

const coveredProperties = coveredCustomProperties(PROPERTY_CASES);
const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'patterns/ai-toolkit/alert/Alert.ts',
    declarationName: 'Alert',
    coveredProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () =>
    theme(
      customPropertyRows(PROPERTY_CASES, renderPropertyCase),
      'light',
      'ltr'
    ),
  parameters: vrtParameters,
  play: verifyCoverage,
};
