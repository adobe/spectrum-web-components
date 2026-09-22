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

import {
  CARD_DENSITIES,
  CARD_VALID_SIZES,
  CARD_VARIANTS,
  type CardDensity,
  type CardSize,
  type CardVariant,
} from '@adobe/spectrum-wc-core/components/card';

import '@adobe/spectrum-wc/components/card/swc-card.js';
import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';
import '@adobe/spectrum-wc/components/asset/swc-asset.js';
import '@adobe/spectrum-wc/components/badge/swc-badge.js';
import '@adobe/spectrum-wc/components/avatar/swc-avatar.js';

import type { ForcedPseudoState } from '../../../../.storybook/helpers/index.js';
import {
  createPermutations,
  forcedColorsVrtParameters,
  forcePseudoState,
  groupPermutationsBy,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Card/Card VRT',
  component: 'swc-card',
  tags: ['dev'],
};

export default meta;

// Helpers

// Card styles pseudo-states on `:host(...)` (not an internal element), and
// only for hover/focus-visible (it has no `:active` treatment), so the
// forced-state axis is limited to those two.
const CARD_FORCED_STATES = [
  'hover',
  'focus-visible',
] as const satisfies readonly ForcedPseudoState[];

const previewImage = (slot = 'preview'): ReturnType<typeof html> => html`
  <img slot=${slot} src="./images/card-preview.jpg" alt="" />
`;

// Standard "regular layout" anatomy reused across the size/variant/density
// matrices, so those rows isolate the attribute under test rather than mixing
// in slot differences.
const standardSlots = html`
  ${previewImage()}
  <span slot="title">Card title</span>
  <span slot="description">Supporting description text.</span>
`;

const actionButton = () => html`
  <swc-action-button slot="actions" quiet>Edit</swc-action-button>
`;

// Base matrix: variant x size, standard regular-layout anatomy. Actions are
// covered in the Anatomy row instead, since xs suppresses them and would make
// this matrix inconsistent across its size axis.
const BASE_PERMUTATIONS = createPermutations([
  { variant: CARD_VARIANTS, size: CARD_VALID_SIZES },
]);

type CardCase = {
  variant?: CardVariant;
  size?: CardSize;
  density?: CardDensity;
  selectable?: boolean;
  'title-as-link'?: boolean;
  'data-force-state'?: ForcedPseudoState;
};

const renderCard = (
  {
    variant = 'primary',
    size = 'm',
    density = 'regular',
    selectable = false,
    'title-as-link': titleAsLink = false,
    'data-force-state': forceState,
  }: CardCase,
  slots: unknown = standardSlots
) => html`
  <swc-card
    variant=${variant}
    size=${size}
    density=${density}
    ?selectable=${selectable}
    ?title-as-link=${titleAsLink}
    data-force-state=${forceState ?? nothing}
  >
    ${slots}
  </swc-card>
`;

// Anatomy: slot combinations that change the rendered structure, at a single
// size so the differences read as structural rather than scale.
const anatomyCards = [
  // Preview + title.
  renderCard(
    {},
    html`
      ${previewImage()}
      <span slot="title">Preview and title</span>
    `
  ),
  // Preview + title + description + actions.
  renderCard(
    {},
    html`
      ${previewImage()}
      <span slot="title">With actions</span>
      <span slot="description">Supporting description text.</span>
      ${actionButton()}
    `
  ),
  // Preview + title + description + footer.
  renderCard(
    {},
    html`
      ${previewImage()}
      <span slot="title">With footer</span>
      <span slot="description">Supporting description text.</span>
      <span slot="footer">Footer content</span>
    `
  ),
  // Preview + title + default-slot body content.
  renderCard(
    {},
    html`
      ${previewImage()}
      <span slot="title">With body</span>
      <span>Default slot body content sits below the header.</span>
    `
  ),
  // Full anatomy (every shared slot except the media overlay).
  renderCard(
    {},
    html`
      ${previewImage()}
      <span slot="title">Full anatomy</span>
      ${actionButton()}
      <span slot="description">Supporting description text.</span>
      <span>Default slot body content.</span>
      <span slot="footer">Footer content</span>
    `
  ),
];

const contentOnlyCards = [
  // Title-only, no preview.
  renderCard(
    {},
    html`
      <span slot="title">Title only</span>
    `
  ),
  // Title + actions only.
  renderCard(
    {},
    html`
      <span slot="title">Title and actions</span>
      ${actionButton()}
    `
  ),
  // Title + footer only.
  renderCard(
    {},
    html`
      <span slot="title">Title and footer</span>
      <span slot="footer">Footer content</span>
    `
  ),
  // Default content only, no preview, title, or other named slots.
  renderCard(
    {},
    html`
      <span>Default content only, with no other slots populated.</span>
    `
  ),
  renderCard(
    {},
    html`
      <span slot="title">Full content anatomy</span>
      ${actionButton()}
      <span slot="description">Supporting description text.</span>
      <span>Default slot body content.</span>
      <span slot="footer">Footer content</span>
    `
  ),
];

// Collection: 1–3 items show; a 4th is hidden. Independently optional from
// preview (collection-only renders with no preview above it).
const collectionPreviewImage = html`
  <img slot="preview" src="./images/card-preview.jpg" alt="" />
`;
const collectionCards = [
  renderCard(
    {},
    html`
      ${collectionPreviewImage} ${previewImage('collection')}
      <span slot="title">One collection item</span>
    `
  ),
  renderCard(
    {},
    html`
      ${collectionPreviewImage} ${previewImage('collection')}
      ${previewImage('collection')}
      <span slot="title">Two collection items</span>
    `
  ),
  renderCard(
    {},
    html`
      ${collectionPreviewImage} ${previewImage('collection')}
      ${previewImage('collection')} ${previewImage('collection')}
      <span slot="title">Three collection items</span>
    `
  ),
  renderCard(
    {},
    html`
      ${collectionPreviewImage} ${previewImage('collection')}
      ${previewImage('collection')} ${previewImage('collection')}
      ${previewImage('collection')}
      <span slot="title">Four items, one hidden</span>
    `
  ),
  renderCard(
    {},
    html`
      ${previewImage('collection')} ${previewImage('collection')}
      ${previewImage('collection')}
      <span slot="title">Collection, no preview</span>
    `
  ),
];

// Asset: swc-asset as preview/collection content instead of a plain <img>,
// covering fit, background, and an explicit aspect-ratio override.
const assetCards = [
  renderCard(
    {},
    html`
      <swc-asset slot="preview">
        <img src="./images/landscape-asset.jpg" alt="" />
      </swc-asset>
      <span slot="title">Default asset</span>
    `
  ),
  renderCard(
    {},
    html`
      <swc-asset slot="preview" fit="contain" background="solid">
        <img src="./images/portrait-asset.jpg" alt="" />
      </swc-asset>
      <span slot="title">Contain · solid background</span>
    `
  ),
  renderCard(
    {},
    html`
      <swc-asset
        slot="preview"
        fit="contain"
        background="checkerboard"
        aspect-ratio="square"
      >
        <img src="./images/portrait-asset.jpg" alt="" />
      </swc-asset>
      <span slot="title">Checkerboard · square</span>
    `
  ),
  renderCard(
    {},
    html`
      <swc-asset slot="preview">
        <img src="./images/landscape-asset.jpg" alt="" />
      </swc-asset>
      <swc-asset slot="collection">
        <img src="./images/portrait-asset.jpg" alt="" />
      </swc-asset>
      <swc-asset slot="collection" fit="contain" background="checkerboard">
        <img src="./images/portrait-asset.jpg" alt="" />
      </swc-asset>
      <swc-asset
        decorative
        slot="collection"
        fit="contain"
        background="checkerboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="96"
          viewBox="0 0 96 96"
        >
          <defs>
            <linearGradient
              id="5ed56c__d"
              x1="65.566"
              x2="25.102"
              y1="11.636"
              y2="67.288"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FF4885"></stop>
              <stop offset="1" stop-color="#FF4885" stop-opacity="0"></stop>
            </linearGradient>
            <linearGradient
              id="5ed56c__e"
              x1="38.978"
              x2="46.479"
              y1="-12.921"
              y2="38.007"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.156" stop-color="#7A6AFD"></stop>
              <stop offset="1" stop-color="#7A6AFD" stop-opacity="0"></stop>
            </linearGradient>
            <linearGradient
              id="5ed56c__f"
              x1="-58.165"
              x2="82.825"
              y1="89.197"
              y2="59.638"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#30A7FE" stop-opacity="0"></stop>
              <stop
                offset="0.432"
                stop-color="#30A7FE"
                stop-opacity="0.995"
              ></stop>
              <stop offset="0.609" stop-color="#30A7FE"></stop>
              <stop offset="1" stop-color="#30A7FE" stop-opacity="0"></stop>
            </linearGradient>
            <radialGradient
              id="5ed56c__c"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(0 102.569 -108.806 0 78.212 60.623)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.089" stop-color="#EB1000"></stop>
              <stop offset="1" stop-color="#EB1000" stop-opacity="0"></stop>
            </radialGradient>
            <clipPath id="5ed56c__b">
              <rect
                width="75.36"
                height="71.04"
                x="11.039"
                y="13.92"
                fill="#fff"
                rx="10"
              ></rect>
            </clipPath>
          </defs>
          <clipPath id="5ed56c__a">
            <path
              fill="#fff"
              d="M42.927 26H12v-3.48c0-3.049 2.493-5.52 5.568-5.52h15.42c1.691 0 3.291.762 4.348 2.072zM75.692 30.8H12v40.235c0 4.617 3.723 8.365 8.308 8.365h55.384c4.586 0 8.308-3.748 8.308-8.365v-31.87c0-4.617-3.722-8.365-8.308-8.365"
            ></path>
            <path
              stroke="#fff"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="4.8"
              d="M42.927 26H12v-3.48c0-3.049 2.493-5.52 5.568-5.52h15.42c1.691 0 3.291.762 4.348 2.072zM75.692 30.8H12v40.235c0 4.617 3.723 8.365 8.308 8.365h55.384c4.586 0 8.308-3.748 8.308-8.365v-31.87c0-4.617-3.722-8.365-8.308-8.365Z"
            ></path>
          </clipPath>
          <g clip-path="url(#5ed56c__a)">
            <g clip-path="url(#5ed56c__b)">
              <rect
                width="75.36"
                height="71.04"
                x="11.039"
                y="13.92"
                fill="#D9F4FD"
                rx="10"
              ></rect>
              <ellipse
                cx="78.212"
                cy="60.623"
                fill="url(#5ed56c__c)"
                rx="108.806"
                ry="102.569"
              ></ellipse>
              <path
                fill="url(#5ed56c__d)"
                d="M4.256 36.171C3.046 11.616 23.182-9.213 49.23-10.353s48.144 17.84 49.353 42.395S79.658 77.426 53.61 78.566 5.466 60.726 4.256 36.171"
              ></path>
              <path
                fill="url(#5ed56c__e)"
                d="M30.078-35.238c-5.876-3.427-13.321-3.448-19.219-.054L-48.13-1.34c-5.777 3.326-5.787 11.174-.017 14.512l58.599 33.904c5.889 3.407 13.334 3.403 19.218-.012l58.478-33.936c5.74-3.33 5.75-11.135.018-14.479z"
              ></path>
              <path
                fill="url(#5ed56c__f)"
                d="M-26.528 47.9c12.159 0 23.172 4.638 31.146 12.122 15.948 14.993 29.17 15.005 45.118.038 7.974-7.522 19-12.173 31.173-12.173 24.33.013 44.04 18.542 44.04 41.415 0 22.874-19.71 41.391-44.04 41.391-12.2 0-23.227-4.665-31.2-12.187-15.935-14.941-29.143-14.928-45.09.064-7.975 7.497-18.988 12.123-31.147 12.123-24.317 0-44.026-18.53-44.026-41.39 0-22.861 19.71-41.403 44.026-41.403"
              ></path>
            </g>
          </g>
        </svg>
      </swc-asset>
      <span slot="title">Asset preview + collection</span>
    `
  ),
];

// size="xs" merges preview into the collection row (the `3col` layout) and
// caps the collection at two items.
const xsCollectionCards = [
  renderCard(
    { size: 'xs' },
    html`
      ${collectionPreviewImage} ${previewImage('collection')}
      ${previewImage('collection')} ${previewImage('collection')}
      <span slot="title">Extra-small merged</span>
    `
  ),
];

// Gallery: no title/description/actions/footer/default content, so the media
// fills the card. Includes the media overlay slot (a badge and an avatar
// layered over the preview).
const galleryCards = [
  renderCard(
    {},
    html`
      ${previewImage()}
    `
  ),
  renderCard(
    {},
    html`
      ${previewImage('collection')} ${previewImage('collection')}
      ${previewImage('collection')}
    `
  ),
  renderCard(
    {},
    html`
      ${previewImage()} ${previewImage('collection')}
      ${previewImage('collection')} ${previewImage('collection')}
    `
  ),
  renderCard(
    {},
    html`
      ${previewImage()}
      <swc-badge
        slot="media"
        variant="yellow"
        size="s"
        style="justify-self: end; margin-block-start: var(--swc-spacing-300); margin-inline-end: var(--swc-spacing-300);"
      >
        Free
      </swc-badge>
      <swc-avatar
        slot="media"
        src="./images/avatar-preview.png"
        alt="Credit: Jane Doe"
        size="100"
        outline
        style="align-self: end; margin-block-end: var(--swc-spacing-300); margin-inline-start: var(--swc-spacing-300);"
      ></swc-avatar>
    `
  ),
];

// Interactive states: selectable and title-as-link change box-shadow/outline
// on hover and focus-visible. Quiet is included separately because its focus
// treatment moves the outline onto the media region instead of the host.
const linkTitle = html`
  <a slot="title" href="https://example.com/profile">Linked card title</a>
`;

const INTERACTIVE_PERMUTATIONS = createPermutations([
  {
    selectable: [true],
    variant: ['primary', 'tertiary', 'quiet'] as CardVariant[],
    'data-force-state': CARD_FORCED_STATES,
  },
  {
    'title-as-link': [true],
    variant: ['primary', 'quiet'] as CardVariant[],
    'data-force-state': CARD_FORCED_STATES,
  },
]);

const renderInteractiveCard = (permutation: CardCase) =>
  renderCard(
    permutation,
    permutation['title-as-link']
      ? html`
          ${previewImage()} ${linkTitle}
          <span slot="description">Supporting description text.</span>
        `
      : standardSlots
  );

const forceCardStates = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> => {
  canvasElement
    .querySelectorAll<HTMLElement>('swc-card[data-force-state]')
    .forEach((host) => {
      const state = host.dataset.forceState as ForcedPseudoState | undefined;
      if (!state) {
        return;
      }
      // Host-level rules (`:host([selectable]…:hover/:focus-visible)`, and the
      // quiet variant's `::after` focus ring) match on the host's own forced
      // attribute; this call also installs the shadow-root mirror sheet.
      forcePseudoState(host, state);
      // The title-as-link underline and focus outline are `::slotted(a:hover)`
      // / `::slotted(a:focus-visible)` rules, which match on the light-DOM
      // anchor itself rather than the host, so force the state there too. A
      // `data-forced-*` attribute (not a class) is used so the anchor still
      // satisfies the title typography's `:not([class])` guard.
      host
        .querySelector<HTMLElement>('a[slot="title"]')
        ?.setAttribute(`data-forced-${state}`, '');
    });
};

const permutationContent = () => html`
  ${groupPermutationsBy(BASE_PERMUTATIONS, 'variant').map(([variant, perms]) =>
    row(
      perms.map((permutation) => renderCard(permutation)),
      variant
    )
  )}
  ${row(
    CARD_DENSITIES.map((density) =>
      renderCard(
        { density },
        html`
          ${previewImage()}
          <span slot="title">${density}</span>
          <span slot="description">Supporting description text.</span>
          ${actionButton()}
        `
      )
    ),
    'Density'
  )}
  ${row(anatomyCards, 'Anatomy')} ${row(contentOnlyCards, 'Content-only')}
  ${row(collectionCards, 'Collection')}
  ${row(xsCollectionCards, 'Collection · xs merge')} ${row(assetCards, 'Asset')}
  ${row(galleryCards, 'Gallery & media overlay')}
  ${groupPermutationsBy(INTERACTIVE_PERMUTATIONS, 'data-force-state').map(
    ([state, perms]) => row(perms.map(renderInteractiveCard), state)
  )}
  ${row(
    [
      renderCard(
        {},
        html`
          ${previewImage()}
          <span slot="title">
            A card title long enough to wrap onto multiple lines within the
            card's max inline size
          </span>
          <span slot="description">
            Supporting description text that also spans more than a single line
            so wrapping is visible.
          </span>
        `
      ),
      renderCard(
        {},
        html`
          ${previewImage()}
          <span slot="title" lang="ja">承認ワークフローを開始するカード</span>
          <span slot="description" lang="ja">
            補足説明のテキストがここに表示されます。
          </span>
        `
      ),
    ],
    'Title wrapping & CJK'
  )}
`;

// VRT stories

// The full card surface: variant x size, densities, slot anatomy, the
// collection layout (including the size="xs" merge and overflow), the gallery
// layout with its media overlay, and the interactive selectable/title-as-link
// hover and focus-visible states (forced via the play function below).
// Rendered once light/ltr and once dark/rtl in a single story so the theme
// and direction axes cost one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceCardStates,
};

// Forced-colors mode replaces the whole page palette, so it can't be scoped to
// a subtree the way theme()'s light/dark split is, so it needs its own snapshot.
// Card draws a 1px CanvasText border in forced colors for non-quiet variants.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceCardStates,
};
