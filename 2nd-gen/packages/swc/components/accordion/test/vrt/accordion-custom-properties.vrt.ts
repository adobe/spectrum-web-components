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

import { html } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '@adobe/spectrum-wc/components/accordion/swc-accordion.js';
import '@adobe/spectrum-wc/components/accordion/swc-accordion-item.js';

import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  forcePseudoStates,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../dist/custom-elements.json';

const meta: Meta = {
  title: 'Accordion/Accordion VRT',
  component: 'swc-accordion',
  tags: ['dev'],
};

export default meta;

type AccordionItemCustomPropertyCase =
  CustomPropertyCase<`--swc-accordion-item-${string}`> & {
    state?: 'focus-visible';
  };

const ACCORDION_PROPERTY_CASES: readonly CustomPropertyCase<`--swc-accordion-${string}`>[] =
  [{ property: '--swc-accordion-min-inline-size', value: '520px' }];

const ITEM_PROPERTY_CASES: readonly AccordionItemCustomPropertyCase[] = [
  {
    property: '--swc-accordion-item-focus-indicator-corner-radius',
    value: '0px',
    state: 'focus-visible',
  },
  { property: '--swc-accordion-item-header-corner-radius', value: '0px' },
  { property: '--swc-accordion-item-padding-top', value: '24px' },
  { property: '--swc-accordion-item-padding-bottom', value: '24px' },
  { property: '--swc-accordion-item-disclosure-indicator-gap', value: '32px' },
  { property: '--swc-accordion-item-edge-to-content-area', value: '32px' },
  { property: '--swc-accordion-item-header-font-size', value: '24px' },
  { property: '--swc-accordion-item-content-padding-inline', value: '48px' },
  { property: '--swc-accordion-item-divider-color', value: 'magenta' },
];

const forceAccordionItemStates = forcePseudoStates(
  'swc-accordion-item',
  'button'
);

const accordionExample = (style?: string) => html`
  <swc-accordion style=${style ?? ''}>
    <swc-accordion-item open>
      <span slot="label">Personal information</span>
      <p>Manage contact details.</p>
    </swc-accordion-item>
    <swc-accordion-item>
      <span slot="label">Billing address</span>
      <p>Used for payment verification.</p>
    </swc-accordion-item>
  </swc-accordion>
`;

const accordionItemExample = (
  { state }: AccordionItemCustomPropertyCase,
  style?: string
) => html`
  <div style=${style ?? ''}>
    <swc-accordion>
      <swc-accordion-item open data-force-state=${state ?? ''}>
        <span slot="label">Personal information</span>
        <p>Manage contact details.</p>
      </swc-accordion-item>
    </swc-accordion>
  </div>
`;

const coveredAccordionProperties = coveredCustomProperties(
  ACCORDION_PROPERTY_CASES
);
const coveredItemProperties = coveredCustomProperties(ITEM_PROPERTY_CASES);

const verifyAccordionCoverage = async () =>
  verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/accordion/Accordion.ts',
    declarationName: 'Accordion',
    coveredProperties: coveredAccordionProperties,
  });

const forceStatesAndVerifyItemCoverage = async (
  context: Parameters<ReturnType<typeof forcePseudoStates>>[0]
) => {
  await forceAccordionItemStates(context);
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/accordion/AccordionItem.ts',
    declarationName: 'AccordionItem',
    coveredProperties: coveredItemProperties,
  });
};

export const AccordionCustomProperties: Story = {
  render: () =>
    theme(
      customPropertyRows(ACCORDION_PROPERTY_CASES, (_, style) =>
        accordionExample(style)
      ),
      'light',
      'ltr'
    ),
  parameters: vrtParameters,
  play: verifyAccordionCoverage,
};

export const AccordionItemCustomProperties: Story = {
  render: () =>
    theme(
      customPropertyRows(ITEM_PROPERTY_CASES, accordionItemExample),
      'light',
      'ltr'
    ),
  parameters: vrtParameters,
  play: forceStatesAndVerifyItemCoverage,
};
