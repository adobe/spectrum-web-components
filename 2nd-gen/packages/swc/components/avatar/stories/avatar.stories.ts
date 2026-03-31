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

import { Avatar } from '@adobe/spectrum-wc/avatar';

import '@adobe/spectrum-wc/avatar';

import { AVATAR_VALID_SIZES } from '../../../../core/components/avatar/Avatar.types.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-avatar');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: Avatar.VALID_SIZES,
  table: {
    category: 'attributes',
    defaultValue: { summary: '500' },
  },
};

/**
 * An avatar displays a circular profile image representing a person or entity.
 *
 * Provide `alt` with a description of who is depicted. Pass `alt=""` to treat
 * the image as decorative and hide it from assistive technology.
 */
export const meta: Meta = {
  title: 'Avatar',
  component: 'swc-avatar',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'A circular profile image for identifying a person or entity.',
    },
    flexLayout: 'row-wrap',
  },
  tags: ['migrated'],
};

export default {
  ...meta,
  title: 'Avatar',
  excludeStories: ['meta'],
} as Meta;

// ────────────────
//    STORIES
// ────────────────

const PLACEHOLDER_SRC = 'https://i.imgur.com/kQAoOf9.jpg';

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
  args: {
    src: PLACEHOLDER_SRC,
    alt: 'Jane Doe',
    size: 500,
  },
};

export const Sizes: Story = {
  render: () => html`
    ${AVATAR_VALID_SIZES.filter((s) => s <= 700).map(
      (size) => html`
        <swc-avatar
          src=${PLACEHOLDER_SRC}
          alt="Jane Doe, size ${size}"
          size=${size}
        ></swc-avatar>
      `
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
};

export const Decorative: Story = {
  render: () => html`
    <swc-avatar src=${PLACEHOLDER_SRC} alt="" size="500"></swc-avatar>
  `,
};

/**
 * An avatar can be placed inside an action button to create a user-triggered
 * action tied to a specific person or entity.
 *
 * @todo Replace `<button>` with `<swc-action-button>` once that component is
 * migrated to 2nd-gen.
 */
export const InActionButton: Story = {
  render: () => html`
    <button type="button" style="display:inline-flex;align-items:center;gap:8px;padding:4px 12px;cursor:pointer;">
      <swc-avatar src=${PLACEHOLDER_SRC} alt="Jane Doe" size="100"></swc-avatar>
      Jane Doe
    </button>
  `,
};
