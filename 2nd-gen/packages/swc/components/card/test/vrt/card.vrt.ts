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
// only for hover/focus-visible — it has no `:active` treatment — so the
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
  // Default content only — no preview, title, or other named slots.
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
  <img slot="preview" src="https://picsum.photos/id/56/280/186/" alt="" />
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
        src="https://picsum.photos/id/823/80/80"
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
      // anchor itself rather than the host — so force the state there too. A
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
  ${row(xsCollectionCards, 'Collection · xs merge')}
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
// a subtree the way theme()'s light/dark split is — it needs its own snapshot.
// Card draws a 1px CanvasText border in forced colors for non-quiet variants.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceCardStates,
};
