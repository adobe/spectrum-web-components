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
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { RADIO_VALID_SIZES } from '@adobe/spectrum-wc-core/components/radio-group/index.js';

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
  forcedColorsVrtParameters,
  forcePseudoStates,
  row,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../dist/custom-elements.json';

// Metadata

const meta: Meta = {
  title: 'Radio group/Radio group VRT',
  component: 'swc-radio-group',
  tags: ['dev'],
};

export default meta;

// Helpers

type LabelPosition = 'side' | 'top';
type Orientation = 'vertical' | 'horizontal';

type GroupCase = {
  size?: (typeof RADIO_VALID_SIZES)[number];
  labelPosition?: LabelPosition;
  orientation?: Orientation;
  necessityIndicator?: 'icon' | 'label';
  selected?: boolean | 'express';
  emphasized?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  description?: string | null;
  errorText?: string | null;
  itemDescription?: string | null;
  secondItemDescription?: string | null;
  forceState?: ForcedPseudoState;
  secondForceState?: ForcedPseudoState;
  inlineSize?: string;
  style?: string;
};

const renderGroup = ({
  size = 'm',
  labelPosition = 'top',
  orientation = 'vertical',
  necessityIndicator,
  selected = false,
  emphasized = false,
  invalid = false,
  disabled = false,
  readonly = false,
  required = false,
  description = 'Choose a delivery option.',
  errorText = invalid ? 'Select an available option.' : null,
  itemDescription = 'Arrives in three to five business days',
  secondItemDescription = null,
  forceState,
  secondForceState,
  inlineSize,
  style,
}: GroupCase) => html`
  <swc-radio-group
    size=${size}
    label-position=${labelPosition}
    orientation=${orientation}
    necessity-indicator=${ifDefined(necessityIndicator)}
    selected=${ifDefined(
      selected ? (selected === true ? 'standard' : selected) : undefined
    )}
    ?emphasized=${emphasized}
    field-status=${ifDefined(
      invalid
        ? 'invalid'
        : disabled
          ? 'disabled'
          : readonly
            ? 'readonly'
            : undefined
    )}
    ?required=${required}
    style=${ifDefined(
      inlineSize ? `inline-size: ${inlineSize}; ${style ?? ''}` : style
    )}
  >
    <span slot="label">Shipping method</span>
    ${description
      ? html`
          <span slot="description">${description}</span>
        `
      : nothing}
    ${errorText
      ? html`
          <span slot="error-text">${errorText}</span>
        `
      : nothing}
    <swc-radio value="standard" data-force-state=${forceState ?? nothing}>
      <span slot="label">Standard shipping</span>
      ${itemDescription
        ? html`
            <span slot="description">${itemDescription}</span>
          `
        : nothing}
    </swc-radio>
    <swc-radio value="express" data-force-state=${secondForceState ?? nothing}>
      <span slot="label">Express shipping</span>
      ${secondItemDescription
        ? html`
            <span slot="description">${secondItemDescription}</span>
          `
        : nothing}
    </swc-radio>
  </swc-radio-group>
`;

const forceRadioStates = forcePseudoStates('swc-radio[data-force-state]');

const permutationContent = () => html`
  ${row(
    RADIO_VALID_SIZES.map((size) =>
      captioned(renderGroup({ selected: true, size }), `Size ${size}`)
    ),
    'Sizes'
  )}
  ${row(
    [
      renderGroup({
        labelPosition: 'side',
        orientation: 'vertical',
        selected: true,
      }),
    ],
    'Side label, vertical'
  )}
  ${row(
    [
      renderGroup({
        labelPosition: 'top',
        orientation: 'horizontal',
        selected: true,
      }),
    ],
    'Top label, horizontal'
  )}
  ${row(
    [
      renderGroup({
        labelPosition: 'side',
        orientation: 'horizontal',
        selected: true,
      }),
    ],
    'Side label, horizontal'
  )}
  ${row(
    [
      captioned(
        renderGroup({ description: null, selected: true }),
        'Without group description'
      ),
      captioned(
        renderGroup({
          description: null,
          itemDescription: null,
          selected: true,
        }),
        'Without group or item descriptions'
      ),
      captioned(
        renderGroup({
          secondItemDescription: null,
          selected: true,
        }),
        'One item without description'
      ),
    ],
    'No description'
  )}
  ${stateContent()}
`;

const stateCases: Array<[string, GroupCase]> = [
  ['Default', {}],
  ['Selected', { selected: true }],
  ['Emphasized', { selected: true, emphasized: true }],
  ['Invalid', { selected: true, invalid: true }],
  [
    'Invalid with help text only',
    { selected: true, invalid: true, errorText: null },
  ],
  [
    'Invalid without help or error text',
    { selected: true, invalid: true, description: null, errorText: null },
  ],
  ['Disabled', { selected: true, disabled: true }],
  ['Read-only', { selected: true, readonly: true }],
  [
    'Keyboard focus on Express',
    { selected: 'express', secondForceState: 'focus-visible' },
  ],
  ['Required', { selected: true, required: true }],
  [
    'Required text indicator',
    { selected: true, required: true, necessityIndicator: 'label' },
  ],
  ['Optional text indicator', { necessityIndicator: 'label' }],
];

const stateContent = () =>
  stateCases.map(([label, testCase]) => row([renderGroup(testCase)], label));

// Custom properties

type GroupPropertyCase = CustomPropertyCase<`--swc-${string}`> & {
  labelPosition?: LabelPosition;
  invalid?: boolean;
  required?: boolean;
};

const GROUP_PROPERTY_CASES: readonly GroupPropertyCase[] = [
  { property: '--swc-radio-group-item-gap', value: '48px' },
  {
    property: '--swc-radio-group-side-label-gap',
    value: '40px',
    labelPosition: 'side',
  },
  { property: '--swc-radio-group-row-gap', value: '40px' },
  {
    property: '--swc-field-label-max-inline-size',
    value: '10ch',
    labelPosition: 'side',
  },
  { property: '--swc-form-field-label-font-size', value: '28px' },
  { property: '--swc-form-field-description-font-size', value: '20px' },
  {
    property: '--swc-form-field-necessity-gap',
    value: '32px',
    required: true,
  },
  {
    property: '--swc-form-field-invalid-icon-gap',
    value: '32px',
    invalid: true,
  },
];

const renderGroupProperty = (
  { labelPosition, invalid, required }: GroupPropertyCase,
  style?: string
) =>
  renderGroup({
    selected: true,
    labelPosition,
    invalid,
    required,
    style,
  });

const coveredGroupCustomProperties =
  coveredCustomProperties(GROUP_PROPERTY_CASES);

const forceStatesAndVerifyCoverage = async (
  context: Parameters<ReturnType<typeof forcePseudoStates>>[0]
) => {
  await forceRadioStates(context);
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/radio-group/RadioGroup.ts',
    declarationName: 'RadioGroup',
    coveredProperties: coveredGroupCustomProperties,
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

export const ForcedColors: Story = {
  render: () =>
    theme(
      html`
        ${row([renderGroup({ selected: true })], 'Selected')}
        ${row([renderGroup({ invalid: true, selected: true })], 'Invalid')}
        ${row([renderGroup({ disabled: true, selected: true })], 'Disabled')}
        ${row([renderGroup({ readonly: true, selected: true })], 'Read-only')}
        ${row(
          [renderGroup({ selected: true, secondForceState: 'hover' })],
          'Hover'
        )}
        ${row(
          [
            renderGroup({
              forceState: 'focus-visible',
              selected: true,
            }),
          ],
          'Keyboard focus'
        )}
      `,
      'light',
      'ltr'
    ),
  parameters: forcedColorsVrtParameters,
  play: forceRadioStates,
};

export const CustomProperties: Story = {
  render: () =>
    theme(
      customPropertyRows(GROUP_PROPERTY_CASES, renderGroupProperty),
      'light',
      'ltr'
    ),
  parameters: vrtParameters,
  play: forceStatesAndVerifyCoverage,
};
