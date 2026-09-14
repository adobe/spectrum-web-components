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
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import {
  CARD_DENSITIES,
  CARD_VALID_SIZES,
  type CardDensity,
  type CardSize,
} from '@adobe/spectrum-wc-core/components/card';
import type { UserCardVariant } from '@adobe/spectrum-wc-core/components/user-card';
import { USER_CARD_VARIANTS } from '@adobe/spectrum-wc-core/components/user-card';

import '@adobe/spectrum-wc/components/user-card/swc-user-card.js';
import '../../avatar/swc-avatar';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-user-card');

argTypes.variant = {
  ...argTypes.variant,
  control: { type: 'select' },
  options: USER_CARD_VARIANTS,
};

argTypes.density = {
  ...argTypes.density,
  control: { type: 'select' },
  options: CARD_DENSITIES,
};

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: CARD_VALID_SIZES,
};

/**
 * A `<swc-user-card>` is a [Card](../?path=/docs/components-card--docs)
 * variant that identifies a person: an avatar glyph alongside a name and
 * supporting text, with an optional wide preview banner.
 */
const meta: Meta = {
  title: 'Card/User card',
  component: 'swc-user-card',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'Card variant that identifies a person.',
    },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const sizeLabels = {
  xs: 'Extra-small',
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<CardSize, string>;

const variantLabels = {
  primary: 'Primary',
  secondary: 'Secondary',
  tertiary: 'Tertiary',
} as const satisfies Record<UserCardVariant, string>;

const densityLabels = {
  compact: 'Compact',
  regular: 'Regular',
  spacious: 'Spacious',
} as const satisfies Record<CardDensity, string>;

const avatarGlyph = (size = '300') => html`
  <swc-avatar
    slot="avatar"
    size=${size}
    src="./images/avatar-preview.png"
    alt="Jane Doe"
  ></swc-avatar>
`;

const basicSlots = html`
  ${avatarGlyph()}
  <span slot="title">Jane Doe</span>
  <span slot="description">Product designer</span>
`;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: {
    variant: 'primary',
    density: 'regular',
    size: 'm',
    'preview-slot':
      '<img slot="preview" src="./images/card-preview.jpg" alt="" />',
    'avatar-slot':
      '<swc-avatar slot="avatar" size="300" src="./images/avatar-preview.png" alt="Jane Doe"></swc-avatar>',
    'title-slot': 'Jane Doe',
    'description-slot': 'Product designer',
  },
  render: (args) => template(args),
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: (args) => html`
    ${template(
      args,
      html`
        <img slot="preview" src="./images/card-preview.jpg" alt="" />
        ${avatarGlyph()}
        <span slot="title">Jane Doe</span>
        <span slot="description">Product designer</span>
      `
    )}
  `,
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => html`
    ${template(args, basicSlots)}
    ${template(
      args,
      html`
        <img slot="preview" src="./images/card-preview.jpg" alt="" />
        ${avatarGlyph()}
        <span slot="title">Jane Doe</span>
        <span slot="description">Product designer</span>
      `
    )}
  `,
  tags: ['anatomy'],
  parameters: { flexLayout: 'row-wrap' },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${CARD_VALID_SIZES.map((size) =>
      template(
        { ...args, size },
        html`
          ${avatarGlyph()}
          <span slot="title">${sizeLabels[size]}</span>
          <span slot="description">Product designer</span>
        `
      )
    )}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'column-center' },
};

export const Variants: Story = {
  render: (args) => html`
    ${USER_CARD_VARIANTS.map((variant) =>
      template(
        { ...args, variant },
        html`
          ${avatarGlyph()}
          <span slot="title">${variantLabels[variant]}</span>
          <span slot="description">Product designer</span>
        `
      )
    )}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'column-center' },
};

export const Density: Story = {
  render: (args) => html`
    ${CARD_DENSITIES.map((density) =>
      template(
        { ...args, density },
        html`
          ${avatarGlyph()}
          <span slot="title">${densityLabels[density]}</span>
          <span slot="description">Product designer</span>
        `
      )
    )}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'column-center' },
};

export const WithPreview: Story = {
  render: (args) => html`
    ${template(
      args,
      html`
        <img slot="preview" src="./images/card-preview.jpg" alt="" />
        ${avatarGlyph()}
        <span slot="title">Jane Doe</span>
        <span slot="description">Product designer</span>
      `
    )}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'column-center' },
};
WithPreview.storyName = 'With preview';

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const TitleAsLink: Story = {
  render: (args) => html`
    ${template(
      { ...args, 'title-as-link': true },
      html`
        ${avatarGlyph()}
        <a slot="title" href="#">Jane Doe</a>
        <span slot="description">
          Clicking anywhere on the card activates this link.
        </span>
      `
    )}
  `,
  tags: ['behaviors'],
};
TitleAsLink.storyName = 'Title as link';

export const Selectable: Story = {
  render: (args) => html`
    ${template({ ...args, selectable: true }, basicSlots)}
  `,
  tags: ['behaviors'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => template(args, basicSlots),
  tags: ['a11y'],
};
