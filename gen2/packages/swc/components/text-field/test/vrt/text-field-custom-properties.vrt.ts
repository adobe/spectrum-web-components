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

import '@adobe/spectrum-wc/components/text-field/swc-text-field.js';

import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../dist/custom-elements.json';

// ────────────────
//    METADATA
// ────────────────

const meta: Meta = {
  title: 'Text field/Text field VRT',
  component: 'swc-text-field',
  tags: ['dev'],
};

export default meta;

// ────────────────
//    HELPERS
// ────────────────

type TextFieldPropertyCase =
  CustomPropertyCase<`--swc-${'field' | 'text-field' | 'form-field'}-${string}`>;

const MOD_PROPERTY_CASES: readonly TextFieldPropertyCase[] = [
  { property: '--swc-field-label-max-inline-size', value: '80px' },
  { property: '--swc-field-input-min-inline-size', value: '260px' },
  { property: '--swc-field-input-max-inline-size', value: '120px' },
  { property: '--swc-text-field-padding-block', value: '24px' },
  { property: '--swc-text-field-padding-inline', value: '24px' },
  { property: '--swc-text-field-affix-gap', value: '24px' },
  { property: '--swc-form-field-row-gap', value: '24px' },
  { property: '--swc-text-field-font-size', value: '24px' },
  { property: '--swc-text-field-line-height', value: '2.5' },
  { property: '--swc-text-field-border-radius', value: '20px' },
  { property: '--swc-text-field-validation-icon-size', value: '32px' },
  { property: '--swc-form-field-label-font-size', value: '24px' },
  { property: '--swc-form-field-description-font-size', value: '20px' },
];

// Two properties need extra context to be visible: the affix-gap needs a
// slotted prefix, and the validation-icon-size needs the invalid state.
// A long label makes the label-max-inline-size wrap visibly.
const renderModPropertyCase = (
  { property }: TextFieldPropertyCase,
  overrideStyle?: string
) => {
  const style = overrideStyle
    ? `inline-size: 240px; ${overrideStyle}`
    : 'inline-size: 240px;';
  const showsPrefix = property === '--swc-text-field-affix-gap';
  const showsError = property === '--swc-text-field-validation-icon-size';
  const label =
    property === '--swc-field-label-max-inline-size'
      ? 'A long label wraps sooner when the label column is tightly capped'
      : 'Field label';
  return html`
    <div style=${style}>
      <swc-text-field value="Sample value" ?invalid=${showsError}>
        <span slot="label">${label}</span>
        ${showsPrefix
          ? html`
              <span slot="prefix">https://</span>
            `
          : nothing}
        <span slot="description">Description text</span>
        ${showsError
          ? html`
              <span slot="error-text">Fix this field</span>
            `
          : nothing}
      </swc-text-field>
    </div>
  `;
};

const modPropertiesContent = () =>
  customPropertyRows(MOD_PROPERTY_CASES, renderModPropertyCase);

const coveredTextFieldCustomProperties =
  coveredCustomProperties(MOD_PROPERTY_CASES);

const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/text-field/TextField.ts',
    declarationName: 'TextField',
    coveredProperties: coveredTextFieldCustomProperties,
  });
};

// ────────────────
//    VRT STORIES
// ────────────────

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
