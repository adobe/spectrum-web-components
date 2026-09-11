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
  render: () => html`
    <swc-thumbnail>
      <img src="./images/avatar-preview.png" alt="Preview" />
    </swc-thumbnail>
  `,
  tags: ['autodocs', 'dev'],
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
//    BEHAVIORS STORIES
// ──────────────────────────────

export const ConsumerStyledStates: Story = {
  render: () => html`
    <style>
      .disabled-thumbnail {
        opacity: 0.4;
      }

      .selected-thumbnail {
        outline: 2px solid #1473e6;
        outline-offset: 2px;
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
  tags: ['behaviors'],
};
