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
  title: 'Action Button/Action Button VRT',
  component: 'swc-action-button',
  tags: ['dev'],
};

export default meta;

// Helpers

const forceActionButtonStates = forcePseudoStates(
  'swc-action-button[data-force-state]',
  '.swc-ActionButton'
);

const iconSvg = () => html`
  <svg
    slot="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 36 36"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M33.567 8.2 27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945ZM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73Z"
    />
  </svg>
`;

// Every `--swc-action-button-*` custom property is a public contract: consumers
// override these directly (see the Global Element Styling guide's "Custom
// properties" section), so a future CSS refactor that quietly drops one would
// be a breaking change. One row per property: a reference button next to the
// same button with that one property overridden to an obviously different
// value, so a real difference confirms the override still works. The set below
// must cover every property the manifest documents for the component; the
// coverage assertion in the `play` function enforces this.
type ModPropertyCase = CustomPropertyCase<`--swc-action-button-${string}`> & {
  forceState?: ForcedPseudoState;
  disabled?: boolean;
  withIcon?: boolean;
  iconOnly?: boolean;
};

const MOD_PROPERTY_CASES: readonly ModPropertyCase[] = [
  { property: '--swc-action-button-min-block-size', value: '80px' },
  { property: '--swc-action-button-border-radius', value: '0px' },
  { property: '--swc-action-button-font-size', value: '24px' },
  { property: '--swc-action-button-gap', value: '40px', withIcon: true },
  { property: '--swc-action-button-edge-to-text', value: '40px' },
  {
    property: '--swc-action-button-edge-to-visual',
    value: '40px',
    withIcon: true,
  },
  {
    property: '--swc-action-button-edge-to-visual-only',
    value: '40px',
    iconOnly: true,
  },
  { property: '--swc-action-button-icon-size', value: '32px', withIcon: true },
  {
    property: '--swc-action-button-icon-inline-size',
    value: '32px',
    withIcon: true,
  },
  {
    property: '--swc-action-button-icon-block-size',
    value: '32px',
    withIcon: true,
  },
  {
    property: '--swc-action-button-focus-indicator-color',
    value: 'magenta',
    forceState: 'focus-visible',
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
    forceState: 'hover',
  },
  {
    property: '--swc-action-button-border-color-hover',
    value: 'magenta',
    forceState: 'hover',
  },
  {
    property: '--swc-action-button-content-color-hover',
    value: 'magenta',
    forceState: 'hover',
  },
  {
    property: '--swc-action-button-background-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: '--swc-action-button-border-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: '--swc-action-button-content-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: '--swc-action-button-background-color-down',
    value: 'magenta',
    forceState: 'active',
  },
  {
    property: '--swc-action-button-border-color-down',
    value: 'magenta',
    forceState: 'active',
  },
  {
    property: '--swc-action-button-content-color-down',
    value: 'magenta',
    forceState: 'active',
  },
  {
    property: '--swc-action-button-down-state-transform',
    value: 'rotate(15deg)',
    forceState: 'active',
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

const modPropertyButton = (
  { forceState, disabled, withIcon, iconOnly }: ModPropertyCase,
  style?: string
) => html`
  <swc-action-button
    ?disabled=${disabled}
    accessible-label=${iconOnly ? 'Edit' : nothing}
    data-force-state=${forceState ?? nothing}
    style=${style ?? nothing}
  >
    ${withIcon || iconOnly ? iconSvg() : nothing}${iconOnly ? nothing : 'Edit'}
  </swc-action-button>
`;

const modPropertiesContent = () =>
  customPropertyRows(MOD_PROPERTY_CASES, modPropertyButton);

const coveredActionButtonCustomProperties =
  coveredCustomProperties(MOD_PROPERTY_CASES);

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

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: forceStatesAndVerifyCoverage,
};
