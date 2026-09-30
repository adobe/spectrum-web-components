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

import '@adobe/spectrum-wc/components/tabs/swc-tabs.js';
import '@adobe/spectrum-wc/components/tabs/swc-tab.js';
import '@adobe/spectrum-wc/components/tabs/swc-tab-panel.js';

import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../dist/custom-elements.json';

// Metadata

const meta: Meta = {
  title: 'Tabs/Tabs VRT',
  component: 'swc-tabs',
  tags: ['dev'],
};

export default meta;

// Helpers

// One row per public custom property: a reference element beside the same
// element with that one property overridden to an obviously different
// value, so a real difference confirms the override still applies. Split
// into two groups (Tabs, Tab) since the three-element architecture documents
// custom properties on separate classes (Tabs.ts, Tab.ts), each verified
// against its own manifest entry below. TabPanel.ts has no documented
// `@cssprop` (its CSS only uses the private `--_swc-tab-panel-padding-top`),
// so there's nothing to verify coverage for there.

const TABS_CUSTOM_PROPERTY_CASES: readonly CustomPropertyCase<`--swc-tabs-${string}`>[] =
  [{ property: '--swc-tabs-indicator-color', value: 'magenta' }];

const renderTabsCase = (_testCase: CustomPropertyCase, style?: string) => html`
  <swc-tabs
    selected="1"
    accessible-label="Product details"
    style=${style ?? ''}
  >
    <swc-tab tab-id="1">Overview</swc-tab>
    <swc-tab tab-id="2">Specifications</swc-tab>
    <swc-tab-panel tab-id="1">
      <p>Overview content.</p>
    </swc-tab-panel>
    <swc-tab-panel tab-id="2">
      <p>Specifications content.</p>
    </swc-tab-panel>
  </swc-tabs>
`;

// Tab renders meaningfully as a standalone custom element (its template has
// no dependency on a parent `swc-tabs`), so these properties are tested
// directly on `<swc-tab>` rather than wrapped in a full tab group - the same
// granularity button-custom-properties.vrt.ts uses for `<swc-button>` outside
// of button-group.
const TAB_CUSTOM_PROPERTY_CASES: readonly CustomPropertyCase<`--swc-tab-${string}`>[] =
  [
    { property: '--swc-tab-height', value: '80px' },
    { property: '--swc-tab-padding-block', value: '40px' },
    { property: '--swc-tab-padding-block-end', value: '40px' },
    { property: '--swc-tab-text-color', value: 'magenta' },
  ];

const renderTabCase = (_testCase: CustomPropertyCase, style?: string) => html`
  <swc-tab tab-id="1" style=${style ?? ''}>Overview</swc-tab>
`;

// A plain heading, not `row()`: `customPropertyRows()` already returns one
// fully-built `row()` per property (its own caption plus a flex-wrap line of
// items), so wrapping that array in another `row()` would flex-wrap those
// pre-built blocks together as if they were plain items, corrupting the
// per-property layout instead of stacking them.
const sectionHeading = (label: string) => html`
  <span class="swc-Detail swc-Detail--sizeM" style="font-weight: bold;">
    ${label}
  </span>
`;

const customPropertiesContent = () => html`
  ${sectionHeading('Tabs')}
  ${customPropertyRows(TABS_CUSTOM_PROPERTY_CASES, renderTabsCase)}
  ${sectionHeading('Tab')}
  ${customPropertyRows(TAB_CUSTOM_PROPERTY_CASES, renderTabCase)}
`;

const coveredTabsCustomProperties = coveredCustomProperties(
  TABS_CUSTOM_PROPERTY_CASES
);
const coveredTabCustomProperties = coveredCustomProperties(
  TAB_CUSTOM_PROPERTY_CASES
);

const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/tabs/Tabs.ts',
    declarationName: 'Tabs',
    coveredProperties: coveredTabsCustomProperties,
  });
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/tabs/Tab.ts',
    declarationName: 'Tab',
    coveredProperties: coveredTabCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(customPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
