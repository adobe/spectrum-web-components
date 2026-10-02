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
import type { Args, Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { Thumbnail } from '@adobe/spectrum-wc/thumbnail';
import {
  THUMBNAIL_VALID_FITS,
  THUMBNAIL_VALID_SIZES,
} from '@adobe/spectrum-wc-core/components/thumbnail/index.js';

import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';
import '@adobe/spectrum-wc/components/thumbnail/swc-thumbnail.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-thumbnail');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: Thumbnail.VALID_SIZES.map(String),
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
      url: 'https://stackblitz.com/edit/vitejs-vite-k2bpbhqi?file=package.json',
    },
    flexLayout: 'row-wrap',
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const PLACEHOLDER_SRC = './images/avatar-preview.png';

const LANDSCAPE_SRC = './images/landscape-asset.jpg';

// Consumer-owned styles: each parent control's own state drives the
// treatment applied to the thumbnail it contains.
const consumerStateStyles = html`
  <style>
    .thumbnail-action {
      --swc-action-button-icon-size: var(--swc-thumbnail-size-100);
    }

    .thumbnail-action[disabled] swc-thumbnail {
      opacity: var(--swc-thumbnail-opacity-disabled);
    }

    .thumbnail-layers {
      display: flex;
      flex-direction: column;
      gap: var(--swc-spacing-100);
      margin: 0;
      padding: 0;
      border: 0;
    }

    .thumbnail-layers label {
      display: flex;
      align-items: center;
      gap: var(--swc-spacing-100);
    }

    .thumbnail-layers label:has(:checked) swc-thumbnail {
      border-radius: var(--swc-thumbnail-corner-radius);
      outline: var(--swc-border-width-200) solid var(--swc-accent-color-800);
    }
  </style>
`;

// The control's own text names it, so the thumbnail inside is decorative.
const controlThumbnail = (args: Args, attributes: Args = {}) =>
  template({
    ...args,
    ...attributes,
    size: 100,
    decorative: true,
    'default-slot': `<img src="${PLACEHOLDER_SRC}" alt="" />`,
  });

const thumbnailActionButton = (
  args: Args,
  label: string,
  { disabled = false } = {}
) => html`
  <swc-action-button class="thumbnail-action" ?disabled=${disabled}>
    ${controlThumbnail(args, { slot: 'icon' })} ${label}
  </swc-action-button>
`;

const thumbnailLayerOption = (
  args: Args,
  label: string,
  { checked = false } = {}
) => html`
  <label>
    <input type="radio" name="thumbnail-layer" ?checked=${checked} />
    ${controlThumbnail(args)} ${label}
  </label>
`;

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
  args: {
    'default-slot': `<img src="${PLACEHOLDER_SRC}" alt="Preview" />`,
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  args: {
    size: 1000,
    'default-slot': `<img src="${LANDSCAPE_SRC}" alt="Mountain landscape" />`,
  },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${THUMBNAIL_VALID_SIZES.map((size) =>
      template({
        ...args,
        size,
        'default-slot': `<img src="${PLACEHOLDER_SRC}" alt="Preview, size ${size}" />`,
      })
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options'],
};

export const Fit: Story = {
  render: (args) => html`
    ${THUMBNAIL_VALID_FITS.map((fit) =>
      template({
        ...args,
        size: 1000,
        fit,
        'default-slot': `<img src="${LANDSCAPE_SRC}" alt="Preview, fit ${fit}" />`,
      })
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options'],
};

// ──────────────────────────────
//    STATES STORIES
// ──────────────────────────────

export const ConsumerStyledStates: Story = {
  render: (args) => html`
    ${consumerStateStyles} ${thumbnailActionButton(args, 'Layer 1')}
    ${thumbnailActionButton(args, 'Consumer-styled focus example', { disabled: true })}
    <fieldset class="thumbnail-layers">
      <legend>Active layer</legend>
      ${thumbnailLayerOption(args, 'Option 1', { checked: true })}
      ${thumbnailLayerOption(args, 'Option 2')}
    </fieldset>
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['states'],
};
ConsumerStyledStates.storyName = 'Consumer-styled states';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => html`
    ${template({
      ...args,
      'default-slot': `<img src="${PLACEHOLDER_SRC}" alt="Preview" />`,
    })}
    ${template({
      ...args,
      decorative: true,
      'default-slot': `<img src="${PLACEHOLDER_SRC}" alt="" />`,
    })}
    ${consumerStateStyles}
    ${thumbnailActionButton(args, 'Upload file', { disabled: true })}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['a11y'],
};
