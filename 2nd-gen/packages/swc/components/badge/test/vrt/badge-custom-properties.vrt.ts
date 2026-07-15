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

import '@adobe/spectrum-wc/components/badge/swc-badge.js';
import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import customElementsManifest from '../../../../.storybook/custom-elements.json';
import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import { Arrow100Icon } from '../../../icon/elements/Arrow100Icon.js';

const meta: Meta = {
  title: 'Badge/Badge VRT',
  component: 'swc-badge',
  tags: ['dev'],
};

export default meta;

type BadgeCustomPropertyCase = CustomPropertyCase<`--swc-badge-${string}`> & {
  outline?: boolean;
  icon?: boolean;
  iconOnly?: boolean;
  label?: string;
};

const CUSTOM_PROPERTY_CASES: readonly BadgeCustomPropertyCase[] = [
  { property: '--swc-badge-height', value: '40px' },
  { property: '--swc-badge-corner-radius', value: '0px' },
  { property: '--swc-badge-gap', value: '24px', icon: true },
  { property: '--swc-badge-padding-block', value: '16px' },
  { property: '--swc-badge-padding-inline', value: '32px' },
  { property: '--swc-badge-padding-inline-start', value: '32px' },
  { property: '--swc-badge-font-size', value: '24px' },
  { property: '--swc-badge-line-height', value: '32px' },
  { property: '--swc-badge-icon-size', value: '24px', icon: true },
  { property: '--swc-badge-label-icon-color', value: 'magenta' },
  { property: '--swc-badge-background-color', value: 'magenta' },
  { property: '--swc-badge-border-color', value: 'magenta', outline: true },
  {
    property: '--swc-badge-with-icon-padding-inline',
    value: '32px',
    icon: true,
  },
  {
    property: '--swc-badge-with-icon-only-padding-inline',
    value: '32px',
    iconOnly: true,
  },
  {
    property: '--swc-badge-with-icon-only-padding-block',
    value: '16px',
    iconOnly: true,
  },
  {
    property: '--swc-badge-outline-background-color',
    value: 'magenta',
    outline: true,
  },
  {
    property: '--swc-badge-outline-label-icon-color',
    value: 'magenta',
    outline: true,
  },
];

const arrowIcon = () => html`
  <swc-icon slot="icon" aria-hidden="true">${Arrow100Icon()}</swc-icon>
`;

const renderBadgeCustomProperty = (
  { outline, icon, iconOnly, label = 'Label' }: BadgeCustomPropertyCase,
  style?: string
) => html`
  <swc-badge
    ?outline=${outline}
    aria-label=${iconOnly ? label : nothing}
    style=${style ?? nothing}
  >
    ${icon || iconOnly ? arrowIcon() : nothing}${iconOnly ? nothing : label}
  </swc-badge>
`;

const coveredBadgeCustomProperties = coveredCustomProperties(
  CUSTOM_PROPERTY_CASES
);

const verifyCoverage = async () =>
  verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/badge/Badge.ts',
    declarationName: 'Badge',
    coveredProperties: coveredBadgeCustomProperties,
  });

const customPropertiesContent = () =>
  customPropertyRows(CUSTOM_PROPERTY_CASES, renderBadgeCustomProperty);

export const CustomProperties: Story = {
  render: () => theme(customPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
