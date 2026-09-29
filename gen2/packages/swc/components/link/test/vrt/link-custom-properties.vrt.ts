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
import linkDocumentation from '../../link.mdx?raw';

// Metadata

const meta: Meta = {
  title: 'Link/Link VRT',
  tags: ['dev'],
};

export default meta;

// Helpers

// Link is CSS-only, so it has no custom-elements-manifest declaration for
// verifyCustomPropertyCoverage(). Compare these visual cases against the
// independently authored public custom-property table in link.mdx instead.

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

const verifyLinkCustomPropertyCoverage = () => {
  const documentedProperties = [
    ...linkDocumentation.matchAll(/^\|\s*`(--swc-link-[\w-]+)`\s*\|/gm),
  ]
    .map(([, property]) => property)
    .sort();

  expect(documentedProperties.length).toBeGreaterThan(0);
  expect(documentedProperties).toHaveLength(new Set(documentedProperties).size);
  expect(coveredLinkProperties).toHaveLength(
    new Set(coveredLinkProperties).size
  );
  expect(coveredLinkProperties).toEqual(documentedProperties);
};

const forceStatesAndVerifyCoverage = async (
  context: Parameters<ReturnType<typeof forcePseudoStates>>[0]
) => {
  await forcePseudoStates('.swc-Link[data-force-state]')(context);
  verifyLinkCustomPropertyCoverage();
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
