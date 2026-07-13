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

import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';
import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import customElementsManifest from '../../../../.storybook/custom-elements.json';
import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  forcePseudoStates,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import { Arrow100Icon } from '../../../icon/elements/Arrow100Icon.js';

const meta: Meta = {
  title: 'Action Button/VRT',
  component: 'swc-action-button',
  tags: ['dev'],
};

export default meta;

type ActionButtonCustomPropertyCase =
  CustomPropertyCase<`--swc-action-button-${string}`> & {
    state?: 'hover' | 'focus-visible' | 'active';
    disabled?: boolean;
    iconOnly?: boolean;
  };

const CUSTOM_PROPERTY_CASES: readonly ActionButtonCustomPropertyCase[] = [
  { property: '--swc-action-button-min-block-size', value: '56px' },
  { property: '--swc-action-button-border-radius', value: '0px' },
  { property: '--swc-action-button-font-size', value: '24px' },
  { property: '--swc-action-button-gap', value: '24px' },
  { property: '--swc-action-button-edge-to-text', value: '32px' },
  { property: '--swc-action-button-edge-to-visual', value: '32px' },
  {
    property: '--swc-action-button-edge-to-visual-only',
    value: '32px',
    iconOnly: true,
  },
  { property: '--swc-action-button-icon-size', value: '24px' },
  { property: '--swc-action-button-icon-inline-size', value: '32px' },
  { property: '--swc-action-button-icon-block-size', value: '16px' },
  {
    property: '--swc-action-button-focus-indicator-color',
    value: 'magenta',
    state: 'focus-visible',
  },
  {
    property: '--swc-action-button-background-color-default',
    value: 'magenta',
  },
  { property: '--swc-action-button-border-color-default', value: 'magenta' },
  { property: '--swc-action-button-content-color-default', value: 'magenta' },
  {
    property: '--swc-action-button-background-color-hover',
    value: 'magenta',
    state: 'hover',
  },
  {
    property: '--swc-action-button-border-color-hover',
    value: 'magenta',
    state: 'hover',
  },
  {
    property: '--swc-action-button-content-color-hover',
    value: 'magenta',
    state: 'hover',
  },
  {
    property: '--swc-action-button-background-color-focus',
    value: 'magenta',
    state: 'focus-visible',
  },
  {
    property: '--swc-action-button-border-color-focus',
    value: 'magenta',
    state: 'focus-visible',
  },
  {
    property: '--swc-action-button-content-color-focus',
    value: 'magenta',
    state: 'focus-visible',
  },
  {
    property: '--swc-action-button-background-color-down',
    value: 'magenta',
    state: 'active',
  },
  {
    property: '--swc-action-button-border-color-down',
    value: 'magenta',
    state: 'active',
  },
  {
    property: '--swc-action-button-content-color-down',
    value: 'magenta',
    state: 'active',
  },
  {
    property: '--swc-action-button-background-color-disabled',
    value: 'magenta',
    disabled: true,
  },
  {
    property: '--swc-action-button-border-color-disabled',
    value: 'magenta',
    disabled: true,
  },
  {
    property: '--swc-action-button-content-color-disabled',
    value: 'magenta',
    disabled: true,
  },
];

const forceActionButtonStates = forcePseudoStates(
  'swc-action-button',
  'button'
);

const icon = () => html`
  <swc-icon slot="icon" aria-hidden="true">${Arrow100Icon()}</swc-icon>
`;

const renderActionButtonCustomProperty = (
  { state, disabled, iconOnly }: ActionButtonCustomPropertyCase,
  style?: string
) => html`
  <swc-action-button
    data-force-state=${state ?? nothing}
    accessible-label=${iconOnly ? 'Edit' : nothing}
    ?disabled=${disabled}
    style=${style ?? nothing}
  >
    ${icon()}${iconOnly ? nothing : 'Edit'}
  </swc-action-button>
`;

const coveredActionButtonCustomProperties = coveredCustomProperties(
  CUSTOM_PROPERTY_CASES
);

const forceStatesAndVerifyCoverage = async (
  context: Parameters<ReturnType<typeof forcePseudoStates>>[0]
) => {
  await forceActionButtonStates(context);
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/action-button/ActionButton.ts',
    declarationName: 'ActionButton',
    coveredProperties: coveredActionButtonCustomProperties,
  });
};

const customPropertiesContent = () =>
  customPropertyRows(CUSTOM_PROPERTY_CASES, renderActionButtonCustomProperty);

export const CustomProperties: Story = {
  render: () => theme(customPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: forceStatesAndVerifyCoverage,
};
