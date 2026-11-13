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

import '@adobe/spectrum-wc/components/checkbox/swc-checkbox.js';

import type {
  CustomPropertyCase,
  ForcedPseudoState,
} from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  forcePseudoState,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../dist/custom-elements.json';

// ────────────────
//    METADATA
// ────────────────

const meta: Meta = {
  title: 'Checkbox/Checkbox VRT',
  component: 'swc-checkbox',
  tags: ['dev'],
};

export default meta;

// ────────────────
//    HELPERS
// ────────────────

type CheckboxPropertyCase =
  CustomPropertyCase<`--swc-${'checkbox' | 'form-field'}-${string}`> & {
    checked?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    forceState?: ForcedPseudoState;
  };

const CHECKBOX_PROPERTY_CASES: readonly CheckboxPropertyCase[] = [
  { property: '--swc-checkbox-control-size', value: '32px' },
  { property: '--swc-checkbox-corner-radius', value: '0px' },
  { property: '--swc-checkbox-text-to-control', value: '32px' },
  { property: '--swc-checkbox-border-color-default', value: 'magenta' },
  {
    property: '--swc-checkbox-border-color-hover',
    value: 'magenta',
    forceState: 'hover',
  },
  {
    property: '--swc-checkbox-border-color-down',
    value: 'magenta',
    forceState: 'active',
  },
  {
    property: '--swc-checkbox-border-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: '--swc-checkbox-border-color-disabled',
    value: 'magenta',
    disabled: true,
  },
  {
    property: '--swc-checkbox-selected-color-default',
    value: 'magenta',
    checked: true,
  },
  {
    property: '--swc-checkbox-selected-color-hover',
    value: 'magenta',
    checked: true,
    forceState: 'hover',
  },
  {
    property: '--swc-checkbox-selected-color-down',
    value: 'magenta',
    checked: true,
    forceState: 'active',
  },
  {
    property: '--swc-checkbox-selected-color-focus',
    value: 'magenta',
    checked: true,
    forceState: 'focus-visible',
  },
  { property: '--swc-checkbox-content-color-default', value: 'magenta' },
  {
    property: '--swc-checkbox-content-color-hover',
    value: 'magenta',
    forceState: 'hover',
  },
  {
    property: '--swc-checkbox-content-color-down',
    value: 'magenta',
    forceState: 'active',
  },
  {
    property: '--swc-checkbox-content-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: '--swc-checkbox-content-color-disabled',
    value: 'magenta',
    disabled: true,
  },
  { property: '--swc-form-field-label-font-size', value: '24px' },
  { property: '--swc-form-field-description-font-size', value: '20px' },
  { property: '--swc-form-field-row-gap', value: '32px' },
  {
    property: '--swc-form-field-invalid-icon-gap',
    value: '32px',
    invalid: true,
  },
];

const FORCED_STATE_TARGETS: Record<ForcedPseudoState, string> = {
  hover: '.swc-Checkbox-control',
  active: '.swc-Checkbox-control',
  'focus-visible': '.swc-Checkbox-input',
  'focus-within': '.swc-Checkbox-control',
};

const renderCheckboxProperty = (
  { checked, disabled, invalid, forceState }: CheckboxPropertyCase,
  style?: string
) => html`
  <swc-checkbox
    ?checked=${checked}
    field-status=${disabled ? 'disabled' : invalid ? 'invalid' : nothing}
    data-force-state=${forceState ?? nothing}
    style=${style ?? nothing}
  >
    <span slot="label">Send me product updates</span>
    ${invalid
      ? html`
          <span slot="error-text">Check this box to continue.</span>
        `
      : html`
          <span slot="description">We send one email a month.</span>
        `}
  </swc-checkbox>
`;

const forceStatesAndVerifyCoverage = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> => {
  canvasElement
    .querySelectorAll<HTMLElement>('swc-checkbox[data-force-state]')
    .forEach((checkbox) => {
      const state = checkbox.dataset.forceState as ForcedPseudoState;
      forcePseudoState(checkbox, state, FORCED_STATE_TARGETS[state]);
    });
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/checkbox/Checkbox.ts',
    declarationName: 'Checkbox',
    coveredProperties: coveredCustomProperties(CHECKBOX_PROPERTY_CASES),
  });
};

// ────────────────
//    VRT STORIES
// ────────────────

export const CustomProperties: Story = {
  render: () =>
    theme(
      customPropertyRows(CHECKBOX_PROPERTY_CASES, renderCheckboxProperty),
      'light',
      'ltr'
    ),
  parameters: vrtParameters,
  play: forceStatesAndVerifyCoverage,
};
