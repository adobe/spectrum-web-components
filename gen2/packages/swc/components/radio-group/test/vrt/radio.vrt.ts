/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * this license is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { html, nothing } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '@adobe/spectrum-wc/components/radio-group/swc-radio-group.js';
import '@adobe/spectrum-wc/components/radio-group/swc-radio.js';

import type {
  CustomPropertyCase,
  ForcedPseudoState,
} from '../../../../.storybook/helpers/index.js';
import {
  captioned,
  coveredCustomProperties,
  customPropertyRows,
  forcePseudoStates,
  row,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../dist/custom-elements.json';

// Metadata

const meta: Meta = {
  title: 'Radio group/Radio VRT',
  component: 'swc-radio',
  tags: ['dev'],
};

export default meta;

// Helpers

const SIZES = ['s', 'm', 'l', 'xl'] as const;

type RadioCase = {
  size?: (typeof SIZES)[number];
  selected?: boolean;
  emphasized?: boolean;
  disabled?: boolean;
  forceState?: ForcedPseudoState;
  label?: string;
  description?: string | null;
  lang?: string;
  inlineSize?: string;
  style?: string;
};

const renderRadio = ({
  size = 'm',
  selected = false,
  emphasized = false,
  disabled = false,
  forceState,
  label = 'Standard delivery',
  description = 'Arrives in three to five business days',
  lang,
  inlineSize,
  style,
}: RadioCase = {}) => html`
  <swc-radio-group
    size=${size}
    selected=${selected ? 'delivery' : nothing}
    ?emphasized=${emphasized}
    style=${inlineSize ? `inline-size: ${inlineSize};` : nothing}
  >
    <span slot="label">Delivery method</span>
    <swc-radio
      value="delivery"
      ?disabled=${disabled}
      data-force-state=${forceState ?? nothing}
      lang=${lang ?? nothing}
      style=${style ?? nothing}
    >
      <span slot="label">${label}</span>
      ${description
        ? html`
            <span slot="description">${description}</span>
          `
        : nothing}
    </swc-radio>
  </swc-radio-group>
`;

const forceRadioStates = forcePseudoStates('swc-radio[data-force-state]');

const permutationContent = () => html`
  ${row(
    SIZES.map((size) => captioned(renderRadio({ size }), `Size ${size}`)),
    'Sizes'
  )}
  ${row(
    [
      renderRadio({
        inlineSize: '220px',
        label:
          'A long radio label wraps across multiple lines while keeping the control aligned',
        description:
          'A long description also wraps to show the relationship between the label and its supporting text',
      }),
    ],
    'Wrapped label'
  )}
  ${row(
    [
      renderRadio({
        lang: 'ja',
        label: '標準配送',
        description: '3〜5営業日でお届け',
      }),
      renderRadio({
        lang: 'ko',
        label: '일반 배송',
        description: '영업일 기준 3~5일 소요',
      }),
      renderRadio({
        lang: 'zh',
        label: '标准配送',
        description: '三个至五个工作日送达',
      }),
    ],
    'CJK language'
  )}
  ${stateContent()}
`;

const stateCases: Array<[string, RadioCase]> = [
  ['Emphasized', { selected: true, emphasized: true }],
  ['Hover', { forceState: 'hover' }],
  ['Keyboard focus', { forceState: 'focus-visible' }],
];

const stateContent = () =>
  stateCases.map(([label, testCase]) => row([renderRadio(testCase)], label));

// Custom properties

type RadioPropertyCase = CustomPropertyCase<`--swc-radio-${string}`> & {
  forceState?: ForcedPseudoState;
  disabled?: boolean;
};

const RADIO_PROPERTY_CASES: readonly RadioPropertyCase[] = [
  { property: '--swc-radio-control-size', value: '40px' },
  { property: '--swc-radio-text-to-control', value: '32px' },
  { property: '--swc-radio-font-size', value: '24px' },
  { property: '--swc-radio-description-font-size', value: '20px' },
  { property: '--swc-radio-border-color-default', value: 'magenta' },
  {
    property: '--swc-radio-border-color-hover',
    value: 'magenta',
    forceState: 'hover',
  },
  {
    property: '--swc-radio-border-color-down',
    value: 'magenta',
    forceState: 'active',
  },
  {
    property: '--swc-radio-border-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: '--swc-radio-border-color-disabled',
    value: 'magenta',
    disabled: true,
  },
  { property: '--swc-radio-content-color-default', value: 'magenta' },
  {
    property: '--swc-radio-content-color-hover',
    value: 'magenta',
    forceState: 'hover',
  },
  {
    property: '--swc-radio-content-color-down',
    value: 'magenta',
    forceState: 'active',
  },
  {
    property: '--swc-radio-content-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: '--swc-radio-content-color-disabled',
    value: 'magenta',
    disabled: true,
  },
];

const renderRadioProperty = (
  { forceState, disabled }: RadioPropertyCase,
  style?: string
) =>
  renderRadio({
    selected: true,
    disabled,
    forceState,
    style,
  });

const coveredRadioCustomProperties =
  coveredCustomProperties(RADIO_PROPERTY_CASES);

const forceStatesAndVerifyCoverage = async (
  context: Parameters<ReturnType<typeof forcePseudoStates>>[0]
) => {
  await forceRadioStates(context);
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/radio-group/Radio.ts',
    declarationName: 'Radio',
    coveredProperties: coveredRadioCustomProperties,
  });
};

// VRT stories

export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceRadioStates,
};

export const CustomProperties: Story = {
  render: () =>
    theme(
      customPropertyRows(RADIO_PROPERTY_CASES, renderRadioProperty),
      'light',
      'ltr'
    ),
  parameters: vrtParameters,
  play: forceStatesAndVerifyCoverage,
};
