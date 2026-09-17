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
  THUMBNAIL_VALID_FITS,
  THUMBNAIL_VALID_SIZES,
} from '@adobe/spectrum-wc-core/components/thumbnail/index.js';

import '@adobe/spectrum-wc/components/thumbnail/swc-thumbnail.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-thumbnail');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: THUMBNAIL_VALID_SIZES.map(String),
};

argTypes.fit = {
  ...argTypes.fit,
  control: { type: 'select' },
  options: THUMBNAIL_VALID_FITS,
};

/**
 * Wraps a slotted image, such as an asset preview or a layer in a layers
 * panel, in a consistent checkerboard-backed frame.
 */
const meta: Meta = {
  title: 'Thumbnail',
  component: 'swc-thumbnail',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: `Displays a small preview of an image, such as a layer or asset thumbnail.`,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/xHBWBBIe2eo5vwoCeNrC4Q/S2---Web?node-id=9392-43644&p=f&t=l3GqsDFoOZJvv8ZC-0',
    },
    stackblitz: {
      url: 'https://stackblitz.com/edit/vitejs-vite-p4qyy5j2?file=package.json',
    },
    flexLayout: 'row-wrap',
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const PLACEHOLDER_SRC = 'https://picsum.photos/id/56/80/80';

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: {
    'default-slot': `<img src="${PLACEHOLDER_SRC}" alt="Preview" />`,
  },
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: () => html`
    <swc-thumbnail>
      <img src=${PLACEHOLDER_SRC} alt="Preview" />
    </swc-thumbnail>
  `,
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: () => html`
    <swc-thumbnail>
      <img src=${PLACEHOLDER_SRC} alt="Preview" />
    </swc-thumbnail>
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: () => html`
    ${THUMBNAIL_VALID_SIZES.map(
      (size) => html`
        <swc-thumbnail size=${size}>
          <img src=${PLACEHOLDER_SRC} alt="Preview, size ${size}" />
        </swc-thumbnail>
      `
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options'],
};

export const Fit: Story = {
  render: () => html`
    ${THUMBNAIL_VALID_FITS.map(
      (fit) => html`
        <swc-thumbnail size="1000" fit=${fit}>
          <img
            src="https://picsum.photos/id/823/160/80"
            alt="Preview, fit ${fit}"
          />
        </swc-thumbnail>
      `
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options'],
};

// ──────────────────────────────
//    STATES STORIES
// ──────────────────────────────

export const ConsumerStyledStates: Story = {
  render: () => html`
    <style>
      .disabled-thumbnail {
        opacity: var(--swc-thumbnail-opacity-disabled);
      }

      .selected-thumbnail {
        outline: var(--swc-focus-indicator-thickness) solid
          var(--swc-focus-indicator-color);
        outline-offset: var(--swc-focus-ring-gap);
        border-radius: var(--swc-corner-radius-75);
      }
    </style>
    <swc-thumbnail class="disabled-thumbnail">
      <img src=${PLACEHOLDER_SRC} alt="Disabled preview" />
    </swc-thumbnail>
    <swc-thumbnail class="selected-thumbnail">
      <img src=${PLACEHOLDER_SRC} alt="Selected preview" />
    </swc-thumbnail>
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['states'],
};
ConsumerStyledStates.storyName = 'Consumer-styled states';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <swc-thumbnail>
      <img src=${PLACEHOLDER_SRC} alt="Preview" />
    </swc-thumbnail>
    <swc-thumbnail decorative>
      <img src=${PLACEHOLDER_SRC} alt="" />
    </swc-thumbnail>
    <button disabled>
      <swc-thumbnail>
        <img src=${PLACEHOLDER_SRC} alt="File preview" />
      </swc-thumbnail>
      Upload file
    </button>
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['a11y'],
};
