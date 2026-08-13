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

import {
  ASSET_VARIANTS,
  type AssetVariant,
} from '@adobe/spectrum-wc-core/components/asset';

import '@adobe/spectrum-wc/components/asset/swc-asset.js';

import {
  captionedItem,
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Asset/Asset VRT',
  component: 'swc-asset',
  tags: ['dev'],
};

export default meta;

// Helpers

// Asset has no `size` property of its own: it fills whatever box its host
// element is given (asset.css's `.swc-Asset-file`/`.swc-Asset-folder` clamp
// their own inline-size between 48px and 80px, and stretch to the host's
// full block-size). Covering "size" therefore means rendering each variant
// at a spread of host container dimensions - below, inside, and above that
// clamp range, plus non-square shapes - rather than an attribute permutation.
type ContainerSizeCase = {
  label: string;
  inlineSize: string;
  blockSize: string;
};

// Named so the image-aspect-ratio cases below can reference a specific
// shape (e.g. `CONTAINER_SIZES.tall`) instead of indexing into an array.
const CONTAINER_SIZES = {
  small: { label: 'Small (32×32)', inlineSize: '32px', blockSize: '32px' },
  medium: { label: 'Medium (64×64)', inlineSize: '64px', blockSize: '64px' },
  large: { label: 'Large (120×120)', inlineSize: '120px', blockSize: '120px' },
  wide: { label: 'Wide (160×60)', inlineSize: '160px', blockSize: '60px' },
  tall: { label: 'Tall (60×160)', inlineSize: '60px', blockSize: '160px' },
} as const satisfies Record<string, ContainerSizeCase>;

const CONTAINER_SIZE_CASES: readonly ContainerSizeCase[] =
  Object.values(CONTAINER_SIZES);

// `label` is only ever read as an `aria-label` on the file/folder icon SVGs
// (see Asset.ts), so it carries no visible weight here - a realistic value is
// still used to keep the markup representative of real usage.
const VARIANT_LABELS = {
  file: 'Project proposal.docx',
  folder: 'Design assets',
} as const satisfies Record<AssetVariant, string>;

const renderVariantAtSize = (
  variant: AssetVariant,
  { inlineSize, blockSize }: ContainerSizeCase
) => html`
  <swc-asset
    variant=${variant}
    label=${VARIANT_LABELS[variant]}
    style="inline-size: ${inlineSize}; block-size: ${blockSize};"
  ></swc-asset>
`;

// Unlike the file/folder icons, slotted image content carries its own
// accessibility via the `<img>`'s own `alt`; Asset's `label` property has no
// effect on the default slot. Shared by both the container-shape row (a
// fixed square source image across every container) and the image-aspect
// row (a fixed container across every source shape) below, so the two axes
// stay expressed as one renderer instead of two near-identical ones.
const renderImage = ({
  container,
  imageWidth = 80,
  imageHeight = 80,
  alt = 'Background preview',
}: {
  container: ContainerSizeCase;
  imageWidth?: number;
  imageHeight?: number;
  alt?: string;
}) => html`
  <swc-asset
    style="inline-size: ${container.inlineSize}; block-size: ${container.blockSize};"
  >
    <img
      src="https://picsum.photos/id/56/${imageWidth}/${imageHeight}"
      alt=${alt}
    />
  </swc-asset>
`;

type ImageAspectCase = {
  label: string;
  alt: string;
  imageWidth: number;
  imageHeight: number;
  container: ContainerSizeCase;
};

// Same-shape cases: image and container both square, or paired at the
// medium container. Confirms `object-fit: contain` centers each source
// aspect correctly. Kept in its own row (all at the same medium container,
// so a consistent height) rather than combined with the mismatched cases
// below - `row()`'s `align-items: center` centers each item's whole box
// against the tallest item on its line, so mixing this row's ~90px-tall
// items with the mismatched row's much taller "tall container" case would
// stagger every caption in the shared row for no informational gain.
const IMAGE_ASPECT_CASES: readonly ImageAspectCase[] = [
  {
    label: 'Square image',
    alt: 'Background preview, square',
    imageWidth: 80,
    imageHeight: 80,
    container: CONTAINER_SIZES.medium,
  },
  {
    label: 'Landscape image',
    alt: 'Background preview, landscape',
    imageWidth: 160,
    imageHeight: 80,
    container: CONTAINER_SIZES.medium,
  },
  {
    label: 'Portrait image',
    alt: 'Background preview, portrait',
    imageWidth: 80,
    imageHeight: 160,
    container: CONTAINER_SIZES.medium,
  },
];

// Crosses a source image against the *opposite* container shape - a
// landscape image squeezed into the Tall container, a portrait image
// squeezed into the Wide container - which is the combination most likely
// to reveal a real regression (cropping/overflow instead of letterboxing);
// the same-shape pairings above wouldn't surface it.
const IMAGE_ASPECT_MISMATCH_CASES: readonly ImageAspectCase[] = [
  {
    label: 'Landscape image · tall container',
    alt: 'Background preview, landscape',
    imageWidth: 160,
    imageHeight: 80,
    container: CONTAINER_SIZES.tall,
  },
  {
    label: 'Portrait image · wide container',
    alt: 'Background preview, portrait',
    imageWidth: 80,
    imageHeight: 160,
    container: CONTAINER_SIZES.wide,
  },
];

const permutationContent = () => html`
  ${ASSET_VARIANTS.map((variant) =>
    row(
      CONTAINER_SIZE_CASES.map((sizeCase) =>
        captionedItem(renderVariantAtSize(variant, sizeCase), sizeCase.label)
      ),
      variant
    )
  )}
  ${row(
    CONTAINER_SIZE_CASES.map((sizeCase) =>
      captionedItem(renderImage({ container: sizeCase }), sizeCase.label)
    ),
    'image'
  )}
  ${row(
    IMAGE_ASPECT_CASES.map((aspectCase) =>
      captionedItem(renderImage(aspectCase), aspectCase.label)
    ),
    'image · aspect ratio'
  )}
  ${row(
    IMAGE_ASPECT_MISMATCH_CASES.map((aspectCase) =>
      captionedItem(renderImage(aspectCase), aspectCase.label)
    ),
    'image · aspect ratio (mismatched container)'
  )}
`;

// VRT stories

// Every variant (file, folder, image) across a spread of host container
// sizes (below/inside/above the icon's clamp range, plus non-square shapes),
// and slotted-image `object-fit` behavior across source aspect ratios,
// including source/container shape mismatches. No forced pseudo-states:
// asset.css defines no :hover/:focus/:active rules,
// and the component isn't focusable. No CJK-language row: `label` is only
// ever read as an aria-label, never rendered as visible text, so there's no
// visible text metrics for CJK content to affect. Rendered once in light/ltr
// and once in dark/rtl below (that combination covers both axes; the file
// variant's background token is the one value here that actually differs
// between light and dark), all still in a single story so it costs one
// snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

// `forced-colors` is a real browser media feature Chromatic can emulate
// directly, unlike the (nonexistent, for this component) hover/focus/active
// states. Forced-colors mode replaces the whole page's palette, so it needs
// its own story/snapshot rather than folding into Permutations.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
