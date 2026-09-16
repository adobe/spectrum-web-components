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
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import type {
  CustomPropertyCase,
  ForcedPseudoState,
} from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  forcePseudoStates,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Link/Link VRT',
  tags: ['dev'],
};

export default meta;

// Helpers

// Link is CSS-only, so it has no custom-elements-manifest declaration and the
// manifest-driven verifyCustomPropertyCoverage() (used by the component
// custom-property VRTs) can't read a documented list to check cases against.
// DOCUMENTED_LINK_PROPERTIES is the manual equivalent: it must stay in sync
// with the "CSS custom properties" table in link.mdx, and verifyLinkCustom-
// PropertyCoverage() below fails if a case is missing, duplicated, or covers a
// property that isn't in this list — the same safety net, minus the manifest.
const DOCUMENTED_LINK_PROPERTIES = [
  '--swc-link-focus-indicator-color',
  '--swc-link-text-color-default',
  '--swc-link-text-color-down',
  '--swc-link-text-color-focus',
  '--swc-link-text-color-hover',
] as const;

// Each color property only resolves in the interaction state it names, so the
// state-scoped ones carry a forceState that's applied to both the reference
// and overridden cell (see modLinkProperty). `--swc-link-focus-indicator-color`
// is the focus ring, so it also rides focus-visible.
type LinkPropertyCase = CustomPropertyCase<`--swc-link-${string}`> & {
  forceState?: ForcedPseudoState;
};

const LINK_PROPERTY_CASES: readonly LinkPropertyCase[] = [
  { property: '--swc-link-text-color-default', value: 'magenta' },
  {
    property: '--swc-link-text-color-hover',
    value: 'magenta',
    forceState: 'hover',
  },
  {
    property: '--swc-link-text-color-down',
    value: 'magenta',
    forceState: 'active',
  },
  {
    property: '--swc-link-text-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: '--swc-link-focus-indicator-color',
    value: 'magenta',
    forceState: 'focus-visible',
  },
];

const modLinkProperty = (
  { forceState }: LinkPropertyCase,
  style?: string
) => html`
  <a
    href="#"
    class="swc-Link swc-Link--standalone"
    data-force-state=${forceState ?? nothing}
    style=${style ?? nothing}
    onclick="return false;"
  >
    Account settings
  </a>
`;

const coveredLinkProperties = coveredCustomProperties(LINK_PROPERTY_CASES);

// Manual stand-in for verifyCustomPropertyCoverage(): no duplicate cases, and
// the covered set matches link.mdx's documented list exactly (both are sorted,
// so an extra or missing property trips the equality check).
const verifyLinkCustomPropertyCoverage = async () => {
  await expect(coveredLinkProperties).toHaveLength(
    new Set(coveredLinkProperties).size
  );
  await expect(coveredLinkProperties).toEqual([...DOCUMENTED_LINK_PROPERTIES]);
};

const forceStatesAndVerifyCoverage = async (
  context: Parameters<ReturnType<typeof forcePseudoStates>>[0]
) => {
  await forcePseudoStates('.swc-Link[data-force-state]')(context);
  await verifyLinkCustomPropertyCoverage();
};

// VRT stories

export const CustomProperties: Story = {
  render: () =>
    theme(
      customPropertyRows(LINK_PROPERTY_CASES, modLinkProperty),
      'light',
      'ltr'
    ),
  parameters: vrtParameters,
  play: forceStatesAndVerifyCoverage,
};
