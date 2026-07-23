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

import type { CardDensity } from '@adobe/spectrum-wc-core/components/card';

import '@adobe/spectrum-wc/components/card/swc-card.js';
import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';

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
  title: 'Card/Card VRT',
  component: 'swc-card',
  tags: ['dev'],
};

export default meta;

// Helpers

// Every `--swc-card-*` custom property documented on the Card element is a
// public contract: consumers override these directly, so a CSS refactor that
// quietly dropped one would be a breaking change. One row per property — a
// reference card beside the same card with that one property overridden to an
// obviously different value — so a real visual difference confirms the
// override still works. verifyCustomPropertyCoverage() (play function) asserts
// this list stays a superset of the API-table properties in the CEM.
type CardPropertyCase = CustomPropertyCase<`--swc-card-${string}`> & {
  // Density selects which content-padding indirection variable is live, so the
  // `-compact` / `-spacious` cases must render at the matching density.
  density?: CardDensity;
  withActions?: boolean;
  withCollection?: boolean;
};

const CARD_PROPERTY_CASES: readonly CardPropertyCase[] = [
  { property: '--swc-card-base-max-inline-size', value: '160px' },
  { property: '--swc-card-base-border-radius', value: '30px' },
  { property: '--swc-card-base-box-shadow', value: '0 0 0 3px magenta' },
  { property: '--swc-card-base-background-color', value: 'magenta' },
  { property: '--swc-card-base-preview-aspect-ratio', value: '1' },
  { property: '--swc-card-base-title-font-size', value: '32px' },
  { property: '--swc-card-base-title-line-height', value: '3' },
  { property: '--swc-card-base-description-font-size', value: '24px' },
  {
    property: '--swc-card-base-action-component-height',
    value: '10px',
    withActions: true,
  },
  {
    property: '--swc-card-base-content-header-gap',
    value: '80px',
    withActions: true,
  },
  { property: '--swc-card-base-content-padding', value: '48px' },
  { property: '--swc-card-base-content-padding-regular', value: '48px' },
  {
    property: '--swc-card-base-content-padding-compact',
    value: '48px',
    density: 'compact',
  },
  {
    property: '--swc-card-base-content-padding-spacious',
    value: '48px',
    density: 'spacious',
  },
  {
    property: '--swc-card-collection-item-aspect-ratio',
    value: '2',
    withCollection: true,
  },
  {
    property: '--swc-card-collection-gap',
    value: '40px',
    withCollection: true,
  },
];

const previewImage = (slot = 'preview'): ReturnType<typeof html> => html`
  <img slot=${slot} src="./images/card-preview.jpg" alt="" />
`;

const modPropertyCard = (
  { density = 'regular', withActions, withCollection }: CardPropertyCase,
  style?: string
) => html`
  <swc-card density=${density} style=${style ?? nothing}>
    ${previewImage()}
    ${withCollection
      ? html`
          ${previewImage('collection')} ${previewImage('collection')}
          ${previewImage('collection')}
        `
      : nothing}
    <span slot="title">This is the card title</span>
    <span slot="description">Supporting description text.</span>
    ${withActions
      ? html`
          <swc-action-button slot="actions" quiet>Edit</swc-action-button>
        `
      : nothing}
  </swc-card>
`;

const modPropertiesContent = () =>
  customPropertyRows(CARD_PROPERTY_CASES, modPropertyCard);

const coveredCardCustomProperties =
  coveredCustomProperties(CARD_PROPERTY_CASES);

const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/card/Card.ts',
    declarationName: 'Card',
    coveredProperties: coveredCardCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
