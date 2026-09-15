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
  type CardDensity,
  type CardSize,
} from '@adobe/spectrum-wc-core/components/card';
import {
  USER_CARD_VARIANTS,
  type UserCardVariant,
} from '@adobe/spectrum-wc-core/components/user-card';

import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';
import '@adobe/spectrum-wc/components/user-card/swc-user-card.js';
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
  title: 'Card/User card/User card VRT',
  component: 'swc-user-card',
  tags: ['dev'],
};

export default meta;

// Helpers

// Same rationale as swc-card: `:host(...)` pseudo-states only cover
// hover/focus-visible (no `:active` treatment).
const USER_CARD_FORCED_STATES = [
  'hover',
  'focus-visible',
] as const satisfies readonly ForcedPseudoState[];

const avatarGlyph = (): ReturnType<typeof html> => html`
  <swc-avatar
    slot="avatar"
    src="./images/avatar-preview.png"
    alt="Jane Doe"
  ></swc-avatar>
`;

const previewImage = (): ReturnType<typeof html> => html`
  <img slot="preview" src="./images/card-preview.jpg" alt="" />
`;

const actionButton = (): ReturnType<typeof html> => html`
  <swc-action-button slot="actions" quiet accessible-label="More actions">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      viewBox="0 0 20 18"
      slot="icon"
    >
      <circle cx="10" cy="10" r="1.5" />
      <path d="M10 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
      <circle cx="4" cy="10" r="1.5" />
      <circle cx="16" cy="10" r="1.5" />
    </svg>
  </swc-action-button>
`;

const standardSlots = html`
  ${avatarGlyph()}
  <span slot="title">Jane Doe</span>
  <span slot="description">Product designer</span>
`;

const BASE_PERMUTATIONS = createPermutations([
  { variant: USER_CARD_VARIANTS, size: CARD_VALID_SIZES },
]);

type UserCardCase = {
  variant?: UserCardVariant;
  size?: CardSize;
  density?: CardDensity;
  selectable?: boolean;
  'title-as-link'?: boolean;
  'data-force-state'?: ForcedPseudoState;
};

const renderUserCard = (
  {
    variant = 'primary',
    size = 'm',
    density = 'regular',
    selectable = false,
    'title-as-link': titleAsLink = false,
    'data-force-state': forceState,
  }: UserCardCase,
  slots: unknown = standardSlots
) => html`
  <swc-user-card
    variant=${variant}
    size=${size}
    density=${density}
    ?selectable=${selectable}
    ?title-as-link=${titleAsLink}
    data-force-state=${forceState ?? nothing}
  >
    ${slots}
  </swc-user-card>
`;

// Anatomy: avatar-only (flush, top-inset) vs. avatar overlapping a preview
// banner (pulled up, centered on the seam), plus a footer example, at a
// single size so the differences read as structural.
const anatomyCards = [
  renderUserCard(
    {},
    html`
      ${avatarGlyph()}
      <span slot="title">Avatar only</span>
      <span slot="description">Product designer</span>
    `
  ),
  renderUserCard(
    {},
    html`
      ${previewImage()} ${avatarGlyph()}
      <span slot="title">With preview banner</span>
      <span slot="description">Product designer</span>
    `
  ),
  renderUserCard(
    {},
    html`
      ${avatarGlyph()}
      <span slot="title">With footer</span>
      <span slot="description">Product designer</span>
      <span slot="footer">Footer content</span>
    `
  ),
  renderUserCard(
    {},
    html`
      ${avatarGlyph()}
      <span slot="title">With actions</span>
      ${actionButton()}
      <span slot="description">Product designer</span>
    `
  ),
  renderUserCard(
    {},
    html`
      ${previewImage()} ${avatarGlyph()}
      <span slot="title">With preview and actions</span>
      ${actionButton()}
      <span slot="description">Product designer</span>
    `
  ),
];

// The avatar/preview overlap is size-driven (the avatar's own rendered
// height determines the split), so it needs its own dedicated row across
// every size, distinct from the plain size-scaling row below.
const overlapBySizeCards = CARD_VALID_SIZES.map((size) =>
  renderUserCard(
    { size },
    html`
      ${previewImage()} ${avatarGlyph()}
      <span slot="title">${size}</span>
      <span slot="description">Product designer</span>
    `
  )
);

// Interactive states: selectable and title-as-link change box-shadow/outline
// on hover and focus-visible, inherited from CardBase.
const linkTitle = html`
  <a slot="title" href="https://example.com/profile">Jane Doe</a>
`;

const INTERACTIVE_PERMUTATIONS = createPermutations([
  {
    selectable: [true],
    variant: ['primary', 'tertiary'] as UserCardVariant[],
    'data-force-state': USER_CARD_FORCED_STATES,
  },
  {
    'title-as-link': [true],
    variant: ['primary'] as UserCardVariant[],
    'data-force-state': USER_CARD_FORCED_STATES,
  },
]);

const renderInteractiveCard = (permutation: UserCardCase) =>
  renderUserCard(
    permutation,
    permutation['title-as-link']
      ? html`
          ${avatarGlyph()} ${linkTitle}
          <span slot="description">Product designer</span>
        `
      : standardSlots
  );

const forceCardStates = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> => {
  canvasElement
    .querySelectorAll<HTMLElement>('swc-user-card[data-force-state]')
    .forEach((host) => {
      const state = host.dataset.forceState as ForcedPseudoState | undefined;
      if (!state) {
        return;
      }
      forcePseudoState(host, state);
      host
        .querySelector<HTMLElement>('a[slot="title"]')
        ?.setAttribute(`data-forced-${state}`, '');
    });
};

const permutationContent = () => html`
  ${groupPermutationsBy(BASE_PERMUTATIONS, 'variant').map(([variant, perms]) =>
    row(
      perms.map((permutation) => renderUserCard(permutation)),
      variant
    )
  )}
  ${row(
    CARD_DENSITIES.map((density) =>
      renderUserCard(
        { density },
        html`
          ${avatarGlyph()}
          <span slot="title">${density}</span>
          <span slot="description">Product designer</span>
        `
      )
    ),
    'Density'
  )}
  ${row(anatomyCards, 'Anatomy')}
  ${row(overlapBySizeCards, 'Preview overlap by size')}
  ${groupPermutationsBy(INTERACTIVE_PERMUTATIONS, 'data-force-state').map(
    ([state, perms]) => row(perms.map(renderInteractiveCard), state)
  )}
`;

// VRT stories

export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceCardStates,
};

export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceCardStates,
};
