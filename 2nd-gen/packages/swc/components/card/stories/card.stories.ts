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
  CARD_VARIANTS,
  type CardDensity,
  type CardSize,
  type CardVariant,
} from '@adobe/spectrum-wc-core/components/card';

import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';
import '@adobe/spectrum-wc/components/card/swc-card.js';
import '../../status-light/swc-status-light';
import '../../badge/swc-badge';
import '../../avatar/swc-avatar';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-card');

argTypes.variant = {
  ...argTypes.variant,
  control: { type: 'select' },
  options: CARD_VARIANTS,
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
 * A card represents a rectangular container for a preview image, title,
 * description, and actions. Regular, collection, and gallery layouts are
 * driven entirely by which slots are populated — see the card family plan
 * for the exact trigger rules. Collection and gallery are covered in
 * follow-up tickets and are not yet exercised here.
 */
const meta: Meta = {
  title: 'Card',
  component: 'swc-card',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'Rectangular container for a preview, title, and description.',
    },
    // design: { type: 'figma', url: 'https://www.figma.com/...' },
    // stackblitz: { url: 'https://stackblitz.com/...' },
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
  quiet: 'Quiet',
} as const satisfies Record<CardVariant, string>;

const densityLabels = {
  compact: 'Compact',
  regular: 'Regular',
  spacious: 'Spacious',
} as const satisfies Record<CardDensity, string>;

const mediaImage = (slot = 'preview', alt = '') => html`
  <img slot=${slot} src="./images/card-preview.jpg" alt=${alt} />
`;

const basicSlots = html`
  ${mediaImage()}
  <span slot="title">Card title</span>
  <span slot="description">Supporting description text.</span>
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
    'title-slot': 'Card title',
    'description-slot': 'Supporting description text.',
    'actions-slot': `<swc-action-button quiet accessible-label="More actions"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      viewBox="0 0 20 18" slot="icon">
      <circle cx="10" cy="10" r="1.5" />
      <path d="M10 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
      <circle cx="4" cy="10" r="1.5" />
      <circle cx="4" cy="10" r="1.5" />
      <circle cx="16" cy="10" r="1.5" />
      <circle cx="16" cy="10" r="1.5" />
    </svg></swc-action-button>`,
  },
  render: (args) => template(args),
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: (args) => template(args, basicSlots),
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => html`
    ${template(
      args,
      html`
        ${mediaImage()} ${mediaImage('collection')} ${mediaImage('collection')}
        ${mediaImage('collection')}
        <span slot="title">Collection slots filled</span>
        <p slot="description">Supporting description text.</p>
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
            <circle cx="4" cy="10" r="1.5" />
            <circle cx="16" cy="10" r="1.5" />
            <circle cx="16" cy="10" r="1.5" />
          </svg>
        </swc-action-button>
        <swc-status-light slot="footer" variant="positive" size="s">
          Published
        </swc-status-light>
      `
    )}
    ${template(
      args,
      html`
        ${mediaImage()}
        <span slot="title">Preview only</span>
        <p slot="description">Supporting description text.</p>
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
            <circle cx="4" cy="10" r="1.5" />
            <circle cx="16" cy="10" r="1.5" />
            <circle cx="16" cy="10" r="1.5" />
          </svg>
        </swc-action-button>
        <swc-status-light slot="footer" variant="positive" size="s">
          Published
        </swc-status-light>
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
          ${mediaImage()}
          <span slot="title">${sizeLabels[size]}</span>
          <span slot="description">Supporting description text.</span>
        `
      )
    )}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'column-center' },
};

export const Variants: Story = {
  render: (args) => html`
    ${CARD_VARIANTS.map((variant) =>
      template(
        { ...args, variant },
        html`
          ${mediaImage()}
          <span slot="title">${variantLabels[variant]}</span>
          <span slot="description">Supporting description text.</span>
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
          ${mediaImage()}
          <span slot="title">${densityLabels[density]}</span>
          <span slot="description">Supporting description text.</span>
        `
      )
    )}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'column-center' },
};

export const WithCollection: Story = {
  render: (args) => html`
    ${template(
      { ...args, size: 'xs' },
      html`
        <img slot="preview" src="https://picsum.photos/id/56/280/186/" alt="" />
        ${mediaImage('collection')} ${mediaImage('collection')}
        ${mediaImage('collection')}
        <span slot="title">Extra Small</span>
        <span slot="description">
          Preview slot placed in first row position.
        </span>
      `
    )}
    ${template(
      { ...args, size: 'm' },
      html`
        <img slot="preview" src="https://picsum.photos/id/56/280/186/" alt="" />
        ${mediaImage('collection')} ${mediaImage('collection')}
        ${mediaImage('collection')}
        <span slot="title">Filled Collection Card</span>
        <span slot="description">Preview and collection slots are full.</span>
      `
    )}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'column-center' },
};

export const Gallery: Story = {
  render: (args) => html`
    ${template(
      { ...args },
      html`
        ${mediaImage('preview', 'Gallery image example')}
      `
    )}
    ${template(
      { ...args },
      html`
        ${mediaImage()} ${mediaImage('collection')} ${mediaImage('collection')}
        ${mediaImage('collection')}
      `
    )}
    ${template(
      { ...args },
      html`
        ${mediaImage('preview', 'Media overlay example')}
        <swc-badge
          slot="media"
          variant="yellow"
          size="s"
          style="
        justify-self: end;
        margin-block-start: var(--swc-spacing-300);
        margin-inline-end: var(--swc-spacing-300);
    "
        >
          Free
        </swc-badge>
        <swc-avatar
          slot="media"
          src="https://picsum.photos/id/64/500/500"
          alt="Credit: Jane Doe"
          size="100"
          outline
          style="
        align-self: end;
        margin-block-end: var(--swc-spacing-300);
        margin-inline-start: var(--swc-spacing-300);
        "
        ></swc-avatar>
      `
    )}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const TitleAsLink: Story = {
  render: (args) => html`
    ${template(
      { ...args, 'title-as-link': true },
      html`
        ${mediaImage()}
        <a slot="title" href="#">Linked card title</a>
        <span slot="description">
          Clicking anywhere on the card activates this link.
        </span>
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
            <circle cx="4" cy="10" r="1.5" />
            <circle cx="16" cy="10" r="1.5" />
            <circle cx="16" cy="10" r="1.5" />
          </svg>
        </swc-action-button>
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

// TODO: will complete in separate documentation pass of phase 7
