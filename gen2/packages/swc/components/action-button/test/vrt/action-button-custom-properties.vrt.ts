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
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { Icon_Edit } from '@adobe/spectrum-wc-icons/Edit.js';

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

const editIconSlot = unsafeSVG(
  Icon_Edit().replace('<svg ', '<svg slot="icon" ')
);

const iconSvg = () => html`
  ${editIconSlot}
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
  {
    property: '--swc-action-button-border-start-start-radius',
    value: '20px',
  },
  {
    property: '--swc-action-button-border-start-end-radius',
    value: '20px',
  },
  {
    property: '--swc-action-button-border-end-start-radius',
    value: '20px',
  },
  {
    property: '--swc-action-button-border-end-end-radius',
    value: '20px',
  },
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
