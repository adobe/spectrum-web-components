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

import { AvatarLink } from '@adobe/spectrum-wc/avatar-link';

import '@adobe/spectrum-wc/avatar-link';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-avatar-link');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: AvatarLink.VALID_SIZES,
  table: {
    category: 'attributes',
    defaultValue: { summary: '100' },
  },
};

/**
 * An avatar link wraps a circular profile image in a navigable anchor element.
 * Use `<swc-avatar>` when no navigation is needed.
 */
export const meta: Meta = {
  title: 'Avatar Link',
  component: 'swc-avatar-link',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle:
        'A circular profile image that navigates to a URL when activated.',
    },
    flexLayout: 'row-wrap',
  },
  tags: ['migrated'],
};

export default {
  ...meta,
  title: 'Avatar Link',
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
    label: 'Jane Doe',
    href: '#',
    size: 100,
  },
};

export const Disabled: Story = {
  render: () => html`
    <swc-avatar-link
      src=${PLACEHOLDER_SRC}
      label="Jane Doe"
      href="#"
      disabled
      size="100"
    ></swc-avatar-link>
  `,
};

export const Sizes: Story = {
  render: () => html`
    ${([50, 75, 100, 200, 300, 400, 500, 600, 700] as const).map(
      (size) => html`
        <swc-avatar-link
          src=${PLACEHOLDER_SRC}
          label="Jane Doe, size ${size}"
          href="#"
          size=${size}
        ></swc-avatar-link>
      `
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
};
