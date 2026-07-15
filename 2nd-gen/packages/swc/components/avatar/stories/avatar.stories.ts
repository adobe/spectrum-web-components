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
import { AVATAR_VALID_SIZES } from '@spectrum-web-components/core/components/avatar/index.js';

import '@adobe/spectrum-wc/components/avatar/swc-avatar.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-avatar');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: Avatar.VALID_SIZES.map(String),
};

argTypes.outline = {
  ...argTypes.outline,
  control: { type: 'boolean' },
};

argTypes.disabled = {
  ...argTypes.disabled,
  control: { type: 'boolean' },
};

argTypes.decorative = {
  ...argTypes.decorative,
  control: { type: 'boolean' },
};

/**
 * An avatar displays a circular profile image representing a person or entity.
 */
const meta: Meta = {
  title: 'Avatar',
  component: 'swc-avatar',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'A circular profile image for identifying a person or entity.',
    },
    stackblitz: {
      url: 'https://stackblitz.com/edit/vitejs-vite-bfsrbyma?file=src%2Fmy-element.ts',
    },
    flexLayout: 'row-wrap',
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const PLACEHOLDER_SRC = 'https://picsum.photos/id/64/500/500';

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

// alt ?? '' guards against undefined produced by Storybook controls when
// the user clears the alt field. Explicit stories use typed args that are always defined.
export const Playground: Story = {
  render: (args) => html`
    <div
      style=${args.outline
        ? 'padding:16px;background:linear-gradient(to right,rgb(15,23,42),rgb(51,65,85));border-radius:8px;'
        : ''}
    >
      <swc-avatar
        src=${args.src}
        alt=${args.alt ?? ''}
        size=${args.size}
        ?outline=${args.outline}
        ?disabled=${args.disabled}
      ></swc-avatar>
    </div>
  `,
  tags: ['dev'],
  args: {
    src: PLACEHOLDER_SRC,
    alt: 'Jane Doe',
    size: '500',
    outline: false,
    disabled: false,
  },
};

// ──────────────────────────
//    OVERVIEW STORIES
// ──────────────────────────

export const Overview: Story = {
  render: (args) => template({ ...args }),
  tags: ['overview'],
  args: {
    src: PLACEHOLDER_SRC,
    alt: 'Jane Doe',
    size: '500',
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => html`
    <swc-avatar src=${args.src} alt=${args.alt} size=${args.size}></swc-avatar>
  `,
  args: {
    src: PLACEHOLDER_SRC,
    alt: 'Jane Doe',
    size: '500',
  },
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${AVATAR_VALID_SIZES.map(
      (size) => html`
        <swc-avatar
          src=${args.src}
          alt="Jane Doe, size ${size}"
          size=${size}
        ></swc-avatar>
      `
    )}
  `,
  args: {
    src: PLACEHOLDER_SRC,
  },
  parameters: {
    flexLayout: 'row-wrap',
  },
  tags: ['options'],
};

export const Decorative: Story = {
  render: (args) => html`
    <swc-avatar
      src=${args.src}
      alt=""
      size=${args.size}
      decorative
    ></swc-avatar>
    Jane Doe
  `,
  args: {
    src: PLACEHOLDER_SRC,
    size: '500',
  },
  tags: ['options'],
};

export const Outline: Story = {
  render: (args) => html`
    <div
      style="display:inline-flex;gap:8px;align-items:center;padding:16px;background:linear-gradient(to right,rgb(15,23,42),rgb(51,65,85));border-radius:8px;"
    >
      <swc-avatar
        src=${args.src}
        alt=${args.alt}
        size="500"
        outline
      ></swc-avatar>
      <swc-avatar
        src=${args.src}
        alt=${args.alt}
        size="1000"
        outline
      ></swc-avatar>
    </div>
  `,
  args: {
    src: PLACEHOLDER_SRC,
    alt: 'Jane Doe',
  },
  tags: ['options'],
};

export const Disabled: Story = {
  render: (args) => html`
    <swc-avatar
      src=${args.src}
      alt=${args.alt}
      size=${args.size}
      disabled
    ></swc-avatar>
  `,
  args: {
    src: PLACEHOLDER_SRC,
    alt: 'Jane Doe',
    size: '500',
  },
  tags: ['options'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const InActionButton: Story = {
  // TODO: Replace <button> with <swc-action-button> once that component is migrated to 2nd-gen.
  render: (args) => html`
    <button
      type="button"
      style="display:inline-flex;align-items:center;gap:8px;padding:4px 12px;cursor:pointer;"
    >
      <swc-avatar
        src=${args.src}
        alt=${args.alt}
        size=${args.size}
      ></swc-avatar>
      Jane Doe
    </button>
  `,
  args: {
    src: PLACEHOLDER_SRC,
    alt: 'Jane Doe',
    size: '100',
  },
  tags: ['behaviors'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => html`
    <swc-avatar src=${args.src} alt="Jane Doe" size=${args.size}></swc-avatar>
    <swc-avatar src=${args.src} alt="" size=${args.size}></swc-avatar>
  `,
  args: {
    src: PLACEHOLDER_SRC,
    size: '500',
  },
  tags: ['a11y'],
};
