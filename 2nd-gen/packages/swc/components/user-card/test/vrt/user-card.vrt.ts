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

// Anatomy: avatar-only, avatar with a preview banner, and avatar with a
// footer, at a single size so the differences read as structural.
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
];

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
