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
import { createRef, ref } from 'lit/directives/ref.js';
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
import '@adobe/spectrum-wc/components/asset/swc-asset.js';
import '@adobe/spectrum-wc/components/card/swc-card.js';
import '@adobe/spectrum-wc/components/progress-circle/swc-progress-circle.js';
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
 * A `<swc-card>` is a flexible container that groups a preview image,
 * title, description, actions, and footer content. Its regular, collection,
 * and gallery layouts are driven entirely by which slots are populated, with
 * no explicit layout attribute.
 */
const meta: Meta = {
  title: 'Card',
  component: 'swc-card',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'Flexible container that summarizes an object.',
    },
    // design: { type: 'figma', url: 'https://www.figma.com/...' },
    stackblitz: { url: 'https://stackblitz.com/edit/vitejs-vite-wn1hrzqo' },
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
  <swc-asset slot=${slot}>
    <img src="./images/card-preview.jpg" alt=${alt} />
  </swc-asset>
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
      '<swc-asset slot="preview"><img src="./images/card-preview.jpg" alt="" /></swc-asset>',
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
  tags: ['dev'],
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
        ${mediaImage()} ${mediaImage('collection')} ${mediaImage('collection')}
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
        ${mediaImage()} ${mediaImage('collection')} ${mediaImage('collection')}
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
          src="./images/avatar-preview.png"
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

export const AssetCard: Story = {
  render: (args) => html`
    ${template(
      { ...args },
      html`
        <swc-asset
          slot="preview"
          aspect-ratio="square"
          fit="contain"
          background="solid"
        >
          <img src="./images/landscape-asset.jpg" alt="asset card preview" />
        </swc-asset>
        <span slot="title">Landscape asset</span>
        <span slot="description">JPG • 2/3/2024</span>
      `
    )}
    ${template(
      { ...args },
      html`
        <swc-asset
          slot="preview"
          aspect-ratio="square"
          fit="contain"
          background="checkerboard"
          decorative
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
            <defs>
              <linearGradient
                id="d"
                x1="65.6"
                x2="25.1"
                y1="11.6"
                y2="67.3"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#ff4885" />
                <stop offset="1" stop-color="#ff4885" stop-opacity="0" />
              </linearGradient>
              <linearGradient
                id="e"
                x1="39"
                x2="46.5"
                y1="-12.9"
                y2="38"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".2" stop-color="#7a6afd" />
                <stop offset="1" stop-color="#7a6afd" stop-opacity="0" />
              </linearGradient>
              <linearGradient
                id="f"
                x1="-58.2"
                x2="82.8"
                y1="89.2"
                y2="59.6"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#30a7fe" stop-opacity="0" />
                <stop offset=".4" stop-color="#30a7fe" />
                <stop offset=".6" stop-color="#30a7fe" />
                <stop offset="1" stop-color="#30a7fe" stop-opacity="0" />
              </linearGradient>
              <radialGradient
                id="c"
                cx="0"
                cy="0"
                r="1"
                gradientTransform="matrix(0 102.6 -108.8 0 78.2 60.6)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".1" stop-color="#eb1000" />
                <stop offset="1" stop-color="#eb1000" stop-opacity="0" />
              </radialGradient>
              <clipPath id="b">
                <rect
                  width="75.4"
                  height="71"
                  x="11"
                  y="13.9"
                  fill="#fff"
                  rx="10"
                />
              </clipPath>
            </defs>
            <clipPath id="a">
              <path
                fill="#fff"
                d="M43 26H12v-3.5c0-3 2.5-5.5 5.6-5.5H33q2.7.1 4.3 2zm32.7 4.8H12V71c0 4.7 3.7 8.4 8.3 8.4h55.4c4.6 0 8.3-3.7 8.3-8.4V39.2c0-4.7-3.7-8.4-8.3-8.4"
              />
              <path
                stroke="#fff"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="4.8"
                d="M43 26H12v-3.5c0-3 2.5-5.5 5.6-5.5H33q2.7.1 4.3 2zm32.7 4.8H12V71c0 4.7 3.7 8.4 8.3 8.4h55.4c4.6 0 8.3-3.7 8.3-8.4V39.2c0-4.7-3.7-8.4-8.3-8.4Z"
              />
            </clipPath>
            <g clip-path="url(#a)">
              <g clip-path="url(#b)">
                <rect
                  width="75.4"
                  height="71"
                  x="11"
                  y="13.9"
                  fill="#d9f4fd"
                  rx="10"
                />
                <ellipse
                  cx="78.2"
                  cy="60.6"
                  fill="url(#c)"
                  rx="108.8"
                  ry="102.6"
                />
                <path
                  fill="url(#d)"
                  d="M4.3 36.2C3 11.6 23.2-9.2 49.3-10.4S97.2 7.5 98.5 32s-19 45.4-45 46.6S5.5 60.7 4.3 36.2"
                />
                <path
                  fill="url(#e)"
                  d="M30-35.2a19 19 0 0 0-19.1 0l-59 33.9a8.2 8.2 0 0 0 0 14.5L10.5 47a19 19 0 0 0 19.2 0L88 13a8.2 8.2 0 0 0 0-14.5z"
                />
                <path
                  fill="url(#f)"
                  d="M-26.5 47.9c12.1 0 23.1 4.6 31.1 12.1 16 15 29.2 15 45.1 0 8-7.5 19-12.1 31.2-12.1 24.3 0 44 18.5 44 41.4s-19.7 41.4-44 41.4a45 45 0 0 1-31.2-12.2c-16-15-29.1-15-45 0-8 7.6-19 12.2-31.2 12.2-24.3 0-44-18.5-44-41.4s19.7-41.4 44-41.4"
                />
              </g>
            </g>
          </svg>
        </swc-asset>
        <span slot="title">SVG asset</span>
        <span slot="description">2/3/2024</span>
      `
    )}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const LoadingState: Story = {
  render: (args) => {
    const progressRef = createRef<HTMLElement>();
    const handleAssetLoad = () => {
      progressRef.value?.remove();
    };
    return html`
      <div style="inline-size: min(280px, 100vw - 2rem);">
        ${template(
          { ...args, size: 'm' },
          html`
            <swc-asset
              slot="preview"
              background="solid"
              @swc-asset-load=${handleAssetLoad}
            >
              <img src="./images/landscape-art.jpg" alt="" />
            </swc-asset>
            <swc-progress-circle
              ${ref(progressRef)}
              slot="media"
              label="Loading preview"
            ></swc-progress-circle>
            <a
              slot="title"
              href="https://unsplash.com/photos/rugged-coastline-with-crashing-waves-and-stormy-skies-CZy5qMP6X7A"
            >
              A Rocky Coast
            </a>
            <span slot="description">Artist: William Trost Richards</span>
          `
        )}
      </div>
    `;
  },
  tags: ['behaviors'],
};
LoadingState.storyName = 'Loading state';

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

export const Accessibility: Story = {
  render: (args) => template(args, basicSlots),
  tags: ['a11y'],
};
