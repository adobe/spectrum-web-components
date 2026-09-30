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

import '@adobe/spectrum-wc/components/close-button/swc-close-button.js';

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

// Metadata

const meta: Meta = {
  title: 'Close Button/Close Button VRT',
  component: 'swc-close-button',
  tags: ['dev'],
};

export default meta;

// Helpers

const forceCloseButtonStates = forcePseudoStates(
  'swc-close-button[data-force-state]',
  '.swc-CloseButton'
);

// Every `--swc-close-button-*` custom property is a public contract:
// consumers override these directly, so a future CSS refactor that quietly
// drops one would be a breaking change. One row per property: a reference
// close button next to the same button with that one property overridden to
// an obviously different value, so a real difference confirms the override
// still works.
type ModPropertyCase = CustomPropertyCase<`--swc-close-button-${string}`> & {
  forceState?: ForcedPseudoState;
  disabled?: boolean;
};

const MOD_PROPERTY_CASES: readonly ModPropertyCase[] = [
  { property: '--swc-close-button-size', value: '64px' },
  { property: '--swc-close-button-icon-size', value: '40px' },
  { property: '--swc-close-button-icon-color-default', value: 'magenta' },
  {
    property: '--swc-close-button-icon-color-hover',
    value: 'magenta',
    forceState: 'hover',
  },
  {
    property: '--swc-close-button-icon-color-down',
    value: 'magenta',
    forceState: 'active',
  },
  {
    property: '--swc-close-button-icon-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: '--swc-close-button-icon-color-disabled',
    value: 'magenta',
    disabled: true,
  },
  { property: '--swc-close-button-background-color-default', value: 'magenta' },
  {
    property: '--swc-close-button-background-color-hover',
    value: 'magenta',
    forceState: 'hover',
  },
  {
    property: '--swc-close-button-background-color-down',
    value: 'magenta',
    forceState: 'active',
  },
  {
    property: '--swc-close-button-background-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: '--swc-close-button-focus-indicator-color',
    value: 'magenta',
    forceState: 'focus-visible',
  },
];

const modPropertyCloseButton = (
  { forceState, disabled }: ModPropertyCase,
  style?: string
) => html`
  <swc-close-button
    accessible-label="Close"
    ?disabled=${disabled}
    data-force-state=${forceState ?? nothing}
    style=${style ?? nothing}
  ></swc-close-button>
`;

const modPropertiesContent = () =>
  customPropertyRows(MOD_PROPERTY_CASES, modPropertyCloseButton);

const coveredCloseButtonCustomProperties =
  coveredCustomProperties(MOD_PROPERTY_CASES);

const forceStatesAndVerifyCoverage = async (
  context: Parameters<ReturnType<typeof forcePseudoStates>>[0]
) => {
  await forceCloseButtonStates(context);
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/close-button/CloseButton.ts',
    declarationName: 'CloseButton',
    coveredProperties: coveredCloseButtonCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: forceStatesAndVerifyCoverage,
};
