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

import '@adobe/spectrum-wc/components/accordion/swc-accordion.js';
import '@adobe/spectrum-wc/components/accordion/swc-accordion-item.js';

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
  title: 'Accordion/Accordion VRT',
  component: 'swc-accordion',
  tags: ['dev'],
};

export default meta;

// Helpers

// swc-accordion and swc-accordion-item are two separate custom-elements-
// manifest declarations, each with its own `cssProperties` list (Accordion:
// 1, AccordionItem: 9). `tabs` (Tabs + Tab) has the identical two-declaration
// shape and will need this same pattern once it gets VRT coverage: one
// case list + render function per declaration, folded into a single story,
// with the shared `play` function below calling `verifyCustomPropertyCoverage`
// once per declaration.

const forceAccordionItemStates = forcePseudoStates(
  'swc-accordion-item[data-force-state]',
  '.swc-AccordionItem-header'
);

// ────────────────────────────────
//    swc-accordion CUSTOM PROPERTIES
// ────────────────────────────────

type AccordionPropertyCase =
  CustomPropertyCase<'--swc-accordion-min-inline-size'>;

const ACCORDION_PROPERTY_CASES: readonly AccordionPropertyCase[] = [
  { property: '--swc-accordion-min-inline-size', value: '600px' },
];

// Short labels keep the reference case's natural width well under the 600px
// override, so the override cell visibly widens instead of collapsing back
// to the same footprint.
const modAccordionProperty = (
  _case: AccordionPropertyCase,
  style?: string
) => html`
  <swc-accordion style=${style ?? nothing}>
    <swc-accordion-item open>
      <span slot="label">Info</span>
      <p>Panel content.</p>
    </swc-accordion-item>
    <swc-accordion-item>
      <span slot="label">Files</span>
      <p>Panel content.</p>
    </swc-accordion-item>
  </swc-accordion>
`;

const coveredAccordionProperties = coveredCustomProperties(
  ACCORDION_PROPERTY_CASES
);

// ─────────────────────────────────────
//    swc-accordion-item CUSTOM PROPERTIES
// ─────────────────────────────────────

type AccordionItemPropertyCase =
  CustomPropertyCase<`--swc-accordion-item-${string}`> & {
    forceState?: ForcedPseudoState;
    open?: boolean;
  };

const ACCORDION_ITEM_PROPERTY_CASES: readonly AccordionItemPropertyCase[] = [
  {
    property: '--swc-accordion-item-focus-indicator-corner-radius',
    value: '24px',
    forceState: 'focus-visible',
  },
  {
    property: '--swc-accordion-item-header-corner-radius',
    value: '24px',
    forceState: 'hover',
  },
  { property: '--swc-accordion-item-padding-top', value: '48px' },
  { property: '--swc-accordion-item-padding-bottom', value: '48px' },
  {
    property: '--swc-accordion-item-disclosure-indicator-gap',
    value: '48px',
  },
  { property: '--swc-accordion-item-edge-to-content-area', value: '48px' },
  { property: '--swc-accordion-item-header-font-size', value: '32px' },
  {
    property: '--swc-accordion-item-content-padding-inline',
    value: '48px',
    open: true,
  },
  { property: '--swc-accordion-item-divider-color', value: 'magenta' },
];

const modAccordionItemProperty = (
  { forceState, open }: AccordionItemPropertyCase,
  style?: string
) => html`
  <swc-accordion style="max-inline-size: 280px;">
    <swc-accordion-item
      ?open=${open}
      data-force-state=${forceState ?? nothing}
      style=${style ?? nothing}
    >
      <span slot="label">Label</span>
      <p>Panel content.</p>
    </swc-accordion-item>
  </swc-accordion>
`;

const coveredAccordionItemProperties = coveredCustomProperties(
  ACCORDION_ITEM_PROPERTY_CASES
);

// ────────────────────
//    PLAY FUNCTION
// ────────────────────

const modPropertiesContent = () => html`
  ${customPropertyRows(ACCORDION_PROPERTY_CASES, modAccordionProperty)}
  ${customPropertyRows(ACCORDION_ITEM_PROPERTY_CASES, modAccordionItemProperty)}
`;

// Copy both `verifyCustomPropertyCoverage` calls (with the module/declaration
// names and covered-properties list swapped) when porting this file's pattern
// to a future two-declaration component.
const forceStatesAndVerifyCoverage = async (
  context: Parameters<ReturnType<typeof forcePseudoStates>>[0]
) => {
  await forceAccordionItemStates(context);
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/accordion/Accordion.ts',
    declarationName: 'Accordion',
    coveredProperties: coveredAccordionProperties,
  });
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/accordion/AccordionItem.ts',
    declarationName: 'AccordionItem',
    coveredProperties: coveredAccordionItemProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: forceStatesAndVerifyCoverage,
};
