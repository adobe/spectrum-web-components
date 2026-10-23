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
import '@adobe/spectrum-wc/components/asset/swc-asset.js';

import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  row,
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
// quietly dropped one would be a breaking change. One row per property: a
// reference card beside the same card with that one property overridden to an
// obviously different value, so a real visual difference confirms the
// override still works. verifyCustomPropertyCoverage() (play function) asserts
// this list stays a superset of the API-table properties in the CEM.
type CardPropertyCase = CustomPropertyCase<`--swc-card-${string}`> & {
  // Density selects which content-padding indirection variable is live, so the
  // `-compact` / `-spacious` cases must render at the matching density.
  density?: CardDensity;
  withActions?: boolean;
  withCollection?: boolean;
  // The gallery preview aspect ratio only applies in the gallery layout, which
  // is triggered by a preview-only card (no title/description/actions/footer).
  gallery?: boolean;
  // Renders preview/collection content as swc-asset instead of a plain <img>.
  asset?: boolean;
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
  {
    property: '--swc-card-gallery-preview-aspect-ratio',
    value: '3 / 1',
    gallery: true,
  },
];

// The same three aspect-ratio properties, driven through swc-asset's
// `--swc-asset-aspect-ratio` weak-sync instead of a plain <img>'s literal
// `aspect-ratio`, so both content types stay covered independently.
const CARD_ASSET_PROPERTY_CASES: readonly CardPropertyCase[] = [
  {
    property: '--swc-card-base-preview-aspect-ratio',
    value: '1',
    asset: true,
  },
  {
    property: '--swc-card-collection-item-aspect-ratio',
    value: '2',
    withCollection: true,
    asset: true,
  },
  {
    property: '--swc-card-gallery-preview-aspect-ratio',
    value: '3 / 1',
    gallery: true,
    asset: true,
  },
];

const previewImage = (slot = 'preview'): ReturnType<typeof html> => html`
  <img slot=${slot} src="./images/card-preview.jpg" alt="" />
`;

const assetPreview = (slot = 'preview'): ReturnType<typeof html> => html`
  <swc-asset slot=${slot}>
    <img src="./images/card-preview.jpg" alt="" />
  </swc-asset>
`;

const modPropertyCard = (
  {
    density = 'regular',
    withActions,
    withCollection,
    gallery,
    asset,
  }: CardPropertyCase,
  style?: string
) => {
  const preview = asset ? assetPreview : previewImage;
  return gallery
    ? // Gallery layout: preview only, no content slots, so
      // `--swc-card-gallery-preview-aspect-ratio` governs the preview.
      html`
        <swc-card style=${style ?? ''}>${preview()}</swc-card>
      `
    : html`
        <swc-card density=${density} style=${style ?? ''}>
          ${preview()}
          ${withCollection
            ? html`
                ${preview('collection')} ${preview('collection')}
                ${preview('collection')}
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
};

// customPropertyRows() labels rows by property name, which would collide with
// the plain-<img> rows above for these same three properties, so these get
// their own local row helper with a distinguishing label instead.
const assetPropertyRows = (cases: readonly CardPropertyCase[]) =>
  cases.map((testCase) =>
    row(
      [
        modPropertyCard(testCase),
        modPropertyCard(testCase, `${testCase.property}: ${testCase.value};`),
      ],
      `${testCase.property} (asset)`
    )
  );

const modPropertiesContent = () => [
  ...customPropertyRows(CARD_PROPERTY_CASES, modPropertyCard),
  ...assetPropertyRows(CARD_ASSET_PROPERTY_CASES),
];

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
