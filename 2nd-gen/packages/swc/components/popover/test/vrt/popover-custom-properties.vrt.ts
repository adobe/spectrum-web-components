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
import '@adobe/spectrum-wc/components/popover/swc-popover.js';

import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../dist/custom-elements.json';
import {
  openManyPopoversForVrt,
  PROPERTY_GROUP_GAP,
  propertyCompareRow,
  vrtPage,
} from './vrt-helpers.js';

// Metadata

const meta: Meta = {
  title: 'Popover/Popover VRT',
  component: 'swc-popover',
  tags: ['dev'],
};

export default meta;

// Helpers

// Every `--swc-popover-*` custom property is a public contract (see
// Popover.ts's `@cssprop` JSDoc): one row per property, a reference popover
// next to the same popover with that one property overridden to an
// obviously different value, so a real difference confirms the override
// still works.
type ModPropertyCase = CustomPropertyCase<`--swc-popover-${string}`>;

const MOD_PROPERTY_CASES: readonly ModPropertyCase[] = [
  { property: '--swc-popover-content-padding', value: '40px' },
  { property: '--swc-popover-background-color', value: 'magenta' },
  { property: '--swc-popover-border-color', value: 'magenta' },
  { property: '--swc-popover-corner-radius', value: '0px' },
];

const idFor = (property: string, style?: string) =>
  `${property.replace(/^--/, '')}-${style ? 'override' : 'reference'}`;

const modPropertyPopover = ({ property }: ModPropertyCase, style?: string) => {
  const id = idFor(property, style);
  return html`
    <div style="display: grid; place-items: center;">
      <swc-button id=${id}>Open</swc-button>
      <swc-popover
        for=${id}
        placement="bottom"
        accessible-label="Autosave"
        style=${style ?? nothing}
      >
        Your changes are saved automatically as you edit.
      </swc-popover>
    </div>
  `;
};

// The shared `customPropertyRows()`/`row()` helpers flex-wrap the reference
// and override side by side, which works for components whose visible bounds
// stay inside their own box. Side-by-side pairs and vertical group spacing
// live in `vrt-helpers.ts` for the same top-layer reasoning as `stack()`.
const modPropertiesContent = () =>
  vrtPage(
    MOD_PROPERTY_CASES.map((testCase) =>
      propertyCompareRow(
        testCase.property,
        modPropertyPopover(testCase),
        modPropertyPopover(testCase, `${testCase.property}: ${testCase.value};`)
      )
    ),
    PROPERTY_GROUP_GAP
  );

const coveredPopoverCustomProperties =
  coveredCustomProperties(MOD_PROPERTY_CASES);

const openAndVerifyCoverage = async (
  context: Parameters<typeof openManyPopoversForVrt>[0]
) => {
  await openManyPopoversForVrt(context);
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/popover/Popover.ts',
    declarationName: 'Popover',
    coveredProperties: coveredPopoverCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: openAndVerifyCoverage,
};
