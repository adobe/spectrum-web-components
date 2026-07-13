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

import type { ForcedPseudoState } from '../../../../.storybook/helpers/index.js';
import {
  forcePseudoStates,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import { Arrow100Icon } from '../../../icon/elements/Arrow100Icon.js';

// Metadata

const meta: Meta = {
  title: 'Button/VRT',
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
type ModPropertyCase = {
  property: string;
  value: string;
  forceState?: ForcedPseudoState;
  disabled?: boolean;
  withIcon?: boolean;
  label?: string;
};

const MOD_PROPERTY_CASES: readonly ModPropertyCase[] = [
  { property: 'background-color-default', value: 'magenta' },
  { property: 'border-color-default', value: 'magenta' },
  { property: 'content-color-default', value: 'magenta' },
  { property: 'background-color-hover', value: 'magenta', forceState: 'hover' },
  { property: 'border-color-hover', value: 'magenta', forceState: 'hover' },
  { property: 'content-color-hover', value: 'magenta', forceState: 'hover' },
  { property: 'background-color-down', value: 'magenta', forceState: 'active' },
  { property: 'border-color-down', value: 'magenta', forceState: 'active' },
  { property: 'content-color-down', value: 'magenta', forceState: 'active' },
  { property: 'down-state-transform', value: 'none', forceState: 'active' },
  {
    property: 'background-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: 'border-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: 'content-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: 'focus-indicator-color',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  { property: 'background-color-disabled', value: 'magenta', disabled: true },
  { property: 'border-color-disabled', value: 'magenta', disabled: true },
  { property: 'content-color-disabled', value: 'magenta', disabled: true },
  { property: 'border-radius', value: '0px' },
  { property: 'font-size', value: '24px' },
  { property: 'gap', value: '40px', withIcon: true },
  { property: 'edge-to-text', value: '40px' },
  { property: 'edge-to-visual', value: '40px', withIcon: true },
  { property: 'icon-size', value: '32px', withIcon: true },
  { property: 'icon-block-size', value: '32px', withIcon: true },
  { property: 'icon-inline-size', value: '32px', withIcon: true },
  {
    property: 'max-inline-size',
    value: '80px',
    label: 'A label long enough to need wrapping',
  },
  { property: 'min-block-size', value: '80px' },
  { property: 'padding-vertical', value: '24px' },
];

const modPropertyButton = (
  { forceState, disabled, withIcon, label = 'Label' }: ModPropertyCase,
  style?: string
) => html`
  <swc-button
    ?disabled=${disabled}
    data-force-state=${forceState ?? nothing}
    style=${style ?? nothing}
  >
    ${withIcon ? arrowIcon() : nothing}${label}
  </swc-button>
`;

// edge-to-visual-only is icon-only-specific padding, so it needs its own
// markup rather than modPropertyButton's icon+label shape. Written inline,
// not via arrowIcon() substituted as the button's only child, for the same
// reason as the icon-only case in Button/VRT.
const edgeToVisualOnlyRow = row([
  html`
    <swc-button accessible-label="Label">
      <swc-icon slot="icon" aria-hidden="true">${Arrow100Icon()}</swc-icon>
    </swc-button>
  `,
  html`
    <swc-button
      accessible-label="Label"
      style="--swc-button-edge-to-visual-only: 40px;"
    >
      <swc-icon slot="icon" aria-hidden="true">${Arrow100Icon()}</swc-icon>
    </swc-button>
  `,
]);

const modPropertiesContent = () => html`
  ${MOD_PROPERTY_CASES.map(
    (testCase) => html`
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <span style="font-size: 12px;">--swc-button-${testCase.property}</span>
        ${row([
          modPropertyButton(testCase),
          modPropertyButton(
            testCase,
            `--swc-button-${testCase.property}: ${testCase.value};`
          ),
        ])}
      </div>
    `
  )}
  <div style="display: flex; flex-direction: column; gap: 4px;">
    <span style="font-size: 12px;">--swc-button-edge-to-visual-only</span>
    ${edgeToVisualOnlyRow}
  </div>
`;

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: forceButtonStates,
};
