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

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import type {
  CustomPropertyCase,
  ForcedPseudoState,
} from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  forcePseudoStates,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../dist/custom-elements.json';
import { Arrow100Icon } from '../../../icon/elements/Arrow100Icon.js';

// Metadata

const meta: Meta = {
  title: 'Button/Button VRT',
  component: 'swc-button',
  tags: ['dev'],
};

export default meta;

// Helpers

const forceButtonStates = forcePseudoStates(
  'swc-button[data-force-state]',
  '.swc-Button'
);

const arrowIcon = () => html`
  <swc-icon slot="icon" aria-hidden="true">${Arrow100Icon()}</swc-icon>
`;

// Every `--swc-button-*` custom property is a public contract: consumers
// override these directly (see the Global Element Styling guide's "Custom
// properties" section), so a future CSS refactor that quietly drops one
// would be a breaking change. One row per property: a reference button next
// to the same button with that one property overridden to an obviously
// different value, so a real difference confirms the override still works.
type ModPropertyCase = CustomPropertyCase<`--swc-button-${string}`> & {
  forceState?: ForcedPseudoState;
  disabled?: boolean;
  withIcon?: boolean;
  iconOnly?: boolean;
  label?: string;
};

const MOD_PROPERTY_CASES: readonly ModPropertyCase[] = [
  { property: '--swc-button-background-color-default', value: 'magenta' },
  { property: '--swc-button-border-color-default', value: 'magenta' },
  { property: '--swc-button-content-color-default', value: 'magenta' },
  {
    property: '--swc-button-background-color-hover',
    value: 'magenta',
    forceState: 'hover',
  },
  {
    property: '--swc-button-border-color-hover',
    value: 'magenta',
    forceState: 'hover',
  },
  {
    property: '--swc-button-content-color-hover',
    value: 'magenta',
    forceState: 'hover',
  },
  {
    property: '--swc-button-background-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: '--swc-button-border-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: '--swc-button-content-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: '--swc-button-focus-indicator-color',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: '--swc-button-background-color-down',
    value: 'magenta',
    forceState: 'active',
  },
  {
    property: '--swc-button-border-color-down',
    value: 'magenta',
    forceState: 'active',
  },
  {
    property: '--swc-button-content-color-down',
    value: 'magenta',
    forceState: 'active',
  },
  {
    property: '--swc-button-down-state-transform',
    value: 'rotate(15deg)',
    forceState: 'active',
  },
  {
    property: '--swc-button-background-color-disabled',
    value: 'magenta',
    disabled: true,
  },
  {
    property: '--swc-button-border-color-disabled',
    value: 'magenta',
    disabled: true,
  },
  {
    property: '--swc-button-content-color-disabled',
    value: 'magenta',
    disabled: true,
  },
  { property: '--swc-button-min-block-size', value: '80px' },
  { property: '--swc-button-border-radius', value: '0px' },
  { property: '--swc-button-padding-vertical', value: '24px' },
  { property: '--swc-button-edge-to-text', value: '40px' },
  {
    property: '--swc-button-max-inline-size',
    value: '80px',
    label: 'A label long enough to need wrapping',
  },
  { property: '--swc-button-gap', value: '40px', withIcon: true },
  { property: '--swc-button-edge-to-visual', value: '40px', withIcon: true },
  {
    property: '--swc-button-edge-to-visual-only',
    value: '40px',
    iconOnly: true,
  },
  { property: '--swc-button-icon-size', value: '32px', withIcon: true },
  { property: '--swc-button-icon-block-size', value: '32px', withIcon: true },
  { property: '--swc-button-icon-inline-size', value: '32px', withIcon: true },
  { property: '--swc-button-font-size', value: '24px' },
];

const modPropertyButton = (
  {
    forceState,
    disabled,
    withIcon,
    iconOnly,
    label = 'Label',
  }: ModPropertyCase,
  style?: string
) => html`
  <swc-button
    ?disabled=${disabled}
    accessible-label=${iconOnly ? label : nothing}
    data-force-state=${forceState ?? nothing}
    style=${style ?? nothing}
  >
    ${withIcon || iconOnly ? arrowIcon() : nothing}${iconOnly ? nothing : label}
  </swc-button>
`;

const modPropertiesContent = () =>
  customPropertyRows(MOD_PROPERTY_CASES, modPropertyButton);

const coveredButtonCustomProperties =
  coveredCustomProperties(MOD_PROPERTY_CASES);

const forceStatesAndVerifyCoverage = async (
  context: Parameters<ReturnType<typeof forcePseudoStates>>[0]
) => {
  await forceButtonStates(context);
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/button/Button.ts',
    declarationName: 'Button',
    coveredProperties: coveredButtonCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: forceStatesAndVerifyCoverage,
};
