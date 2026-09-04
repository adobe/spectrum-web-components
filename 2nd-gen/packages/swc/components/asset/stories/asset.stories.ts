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
  ASSET_BACKGROUND_VALUES,
  ASSET_FIT_VALUES,
  type AssetBackground,
  type AssetFit,
} from '@adobe/spectrum-wc-core/components/asset';

import '@adobe/spectrum-wc/components/asset/swc-asset.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-asset');

argTypes.fit = {
  ...argTypes.fit,
  control: { type: 'select' },
  options: ASSET_FIT_VALUES,
};

argTypes.background = {
  ...argTypes.background,
  control: { type: 'select' },
  options: ASSET_BACKGROUND_VALUES,
};

/**
 * A general image/media primitive that displays a single slotted `<img>` or
 * `<svg>` element, sized and fit to the space provided.
 */
const meta: Meta = {
  title: 'Asset',
  component: 'swc-asset',
  args,
  argTypes,
  parameters: {
    docs: {
      subtitle: `Visually represent an image or media asset in your application`,
    },
    flexLayout: 'row-nowrap',
  },
  render: (args) => template(args),
};

export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: {
    background: 'checkerboard',
    'aspect-ratio': '4/3',
    fit: 'contain',
    'default-slot': `<img src="./images/portrait-asset.jpg" alt="preview of background" />`,
  },
  tags: ['dev'],
};

// ────────────────────
//    OVERVIEW STORY
// ────────────────────

export const Overview: Story = {
  args: {
    width: '160px',
    'default-slot': `<img src="./images/card-preview.jpg" alt="preview of background" />`,
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => html`
    ${template({
      ...args,
      width: '160px',
      'aspect-ratio': '4/3',
      'default-slot': `<img src="./images/card-preview.jpg" alt="preview of background" />`,
    })}
    ${template({
      ...args,
      width: '160px',
      'aspect-ratio': '4/3',
      background: 'checkerboard',
      'default-slot': `<svg role="img" aria-label="Download icon" xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
  <path d="M12 68.74C13.1046 68.74 14 69.6354 14 70.74V74.24C14 75.0684 14.6716 75.74 15.5 75.74H19C20.1046 75.74 21 76.6354 21 77.74C21 78.8446 20.1046 79.74 19 79.74H15.5C12.4624 79.74 10 77.2776 10 74.24V70.74C10 69.6354 10.8954 68.74 12 68.74ZM34.5 75.74C35.6046 75.74 36.5 76.6354 36.5 77.74C36.5 78.8446 35.6046 79.74 34.5 79.74H27C25.8954 79.74 25 78.8446 25 77.74C25 76.6354 25.8954 75.74 27 75.74H34.5ZM51.5 75.74C52.6046 75.74 53.5 76.6354 53.5 77.74C53.5 78.8446 52.6046 79.74 51.5 79.74H44C42.8954 79.74 42 78.8446 42 77.74C42 76.6354 42.8954 75.74 44 75.74H51.5ZM68.5 75.74C69.6046 75.74 70.5 76.6354 70.5 77.74C70.5 78.8446 69.6046 79.74 68.5 79.74H61C59.8954 79.74 59 78.8446 59 77.74C59 76.6354 59.8954 75.74 61 75.74H68.5ZM84 68.74C85.1046 68.74 86 69.6354 86 70.74V74.24C86 77.2776 83.5376 79.74 80.5 79.74H77C75.8954 79.74 75 78.8446 75 77.74C75 76.6354 75.8954 75.74 77 75.74H80.5C81.3284 75.74 82 75.0684 82 74.24V70.74C82 69.6354 82.8954 68.74 84 68.74ZM47.5586 15.74C49.5319 15.74 51.4273 16.5191 52.8262 17.9099L67.8125 32.8103C69.2118 34.2015 70 36.0908 70 38.0632V59.3171C69.9999 63.4274 66.6517 66.7398 62.5459 66.74H33.4541C29.3483 66.7397 26.0001 63.4274 26 59.3171V23.1628C26.0001 19.0525 29.3483 15.7402 33.4541 15.74H47.5586ZM84 55.24C85.1046 55.24 86 56.1354 86 57.24V64.74C86 65.8446 85.1046 66.74 84 66.74C82.8954 66.74 82 65.8446 82 64.74V57.24C82 56.1354 82.8954 55.24 84 55.24ZM12 54.74C13.1046 54.74 14 55.6354 14 56.74V64.24C14 65.3446 13.1046 66.24 12 66.24C10.8954 66.24 10 65.3446 10 64.24V56.74C10 55.6354 10.8954 54.74 12 54.74ZM33.4541 19.74C31.5356 19.7402 30.0001 21.2835 30 23.1628V59.3171C30.0001 61.1965 31.5356 62.7398 33.4541 62.74H62.5459C64.4644 62.7398 65.9999 61.1965 66 59.3171V38.0632C66 37.1592 65.6387 36.2901 64.9922 35.6472L50.0059 20.7468C49.3589 20.1036 48.4785 19.74 47.5586 19.74H33.4541ZM47.0479 31.74C48.1523 31.7424 49.0461 32.6395 49.0439 33.7439L49.0088 49.5251L54.2227 45.2009C55.0727 44.4958 56.3338 44.6128 57.0391 45.4626C57.7442 46.3127 57.6272 47.5737 56.7773 48.2791L48.3389 55.2791C47.9599 55.5934 47.4936 55.7454 47.0293 55.738C47.0182 55.7382 47.0072 55.74 46.9961 55.74C46.376 55.7386 45.8221 55.4553 45.4561 55.0115L37.2344 48.2888C36.3793 47.5898 36.2524 46.3295 36.9512 45.4744C37.6502 44.6193 38.9105 44.4924 39.7656 45.1912L45.0088 49.4773L45.0439 33.7361C45.0464 32.6316 45.9434 31.7377 47.0479 31.74ZM19 40.74C20.1046 40.74 21 41.6354 21 42.74C21 43.8446 20.1046 44.74 19 44.74H15.5C14.6716 44.74 14 45.4116 14 46.24V49.74C14 50.8446 13.1046 51.74 12 51.74C10.8954 51.74 10 50.8446 10 49.74V46.24C10 43.2024 12.4624 40.74 15.5 40.74H19ZM80.5 40.74C83.5376 40.74 86 43.2024 86 46.24V49.74C86 50.8446 85.1046 51.74 84 51.74C82.8954 51.74 82 50.8446 82 49.74V46.24C82 45.4116 81.3284 44.74 80.5 44.74H77C75.8954 44.74 75 43.8446 75 42.74C75 41.6354 75.8954 40.74 77 40.74H80.5Z" fill="#292929"/>
</svg>`,
    })}
  `,
  tags: ['anatomy'],
  parameters: { flexLayout: 'row-wrap' },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Fit: Story = {
  render: (args) => html`
    ${ASSET_FIT_VALUES.map(
      (fit: AssetFit) => html`
        ${template({
          ...args,
          fit,
          width: '160px',
          height: '160px',
          background: 'checkerboard',
          'default-slot': `<img src="./images/portrait-asset.jpg" alt="Fit: ${fit}" />`,
        })}
      `
    )}
    ${template({
      ...args,
      fit: 'contain',
      width: '160px',
      height: '160px',
      background: 'checkerboard',
      'default-slot': `<img src="./images/landscape-asset.jpg" alt="Fit: contain, landscape" />`,
    })}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

export const Background: Story = {
  render: (args) => html`
    ${ASSET_BACKGROUND_VALUES.map(
      (background: AssetBackground) => html`
        ${template({
          ...args,
          background,
          width: '160px',
          height: '160px',
          fit: 'contain',
          'default-slot': `<img src="./images/card-preview.jpg" alt="Background: ${background}" />`,
        })}
      `
    )}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const Sizing: Story = {
  render: (args) => html`
    ${template({
      ...args,
      'aspect-ratio': '16/9',
      width: '160px',
      'default-slot': `<img src="./images/card-preview.jpg" alt="16/9 aspect ratio" />`,
    })}
    ${template({
      ...args,
      width: '100px',
      height: '160px',
      'default-slot': `<img src="./images/card-preview.jpg" alt="Explicit width and height" />`,
    })}
  `,
  tags: ['behaviors'],
  parameters: { flexLayout: 'row-wrap' },
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => html`
    ${template({
      ...args,
      width: '160px',
      'default-slot': `<img src="./images/card-preview.jpg" alt="preview of background" />`,
    })}
    ${template({
      ...args,
      width: '160px',
      'aspect-ratio': '4/3',
      background: 'checkerboard',
      'default-slot': `<svg role="img" aria-label="Spectrum logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" fill="none">
  <g clip-path="url(#clip0_10659_40433)">
    <path d="M50.0058 33.7987C50.6615 34.2078 50.6604 35.1631 50.0036 35.5706L31.1003 47.3001C30.4264 47.7183 29.5736 47.7183 28.8997 47.3001L9.99643 35.5706C9.33964 35.1631 9.33846 34.2078 9.99424 33.7987L15.1071 30.6086L28.9058 39.1051C29.5767 39.5183 30.4232 39.5183 31.0942 39.1051L44.8929 30.6086L50.0058 33.7987Z" fill="#DADADA"/>
    <path d="M39.2427 22.2825L31.1018 27.3221C30.429 27.7386 29.5785 27.7387 28.9055 27.3225L20.7573 22.2825L16.5548 24.8686C15.8927 25.276 15.8926 26.2384 16.5546 26.6459L28.9068 34.25C29.5792 34.664 30.4277 34.663 31.0991 34.2474L43.3911 26.6397C44.0492 26.2324 44.0505 25.2756 43.3935 24.8666L39.2427 22.2825Z" fill="#8F8F8F"/>
    <path d="M31.0974 12.4704C30.4251 12.051 29.5733 12.0484 28.8985 12.4638L22.1493 16.6187C21.4883 17.0257 21.4872 17.9862 22.1473 18.3946L28.8519 22.5437C29.5257 22.9606 30.3775 22.96 31.0507 22.5422L37.7415 18.3893C38.3981 17.9817 38.3992 17.0265 37.7435 16.6174L31.0974 12.4704Z" fill="#505050"/>
  </g>
  <defs>
    <clipPath id="clip0_10659_40433">
      <rect width="60" height="60" fill="white"/>
    </clipPath>
  </defs>
</svg>`,
    })}
  `,
  tags: ['a11y'],
  parameters: { flexLayout: 'row-wrap' },
};
