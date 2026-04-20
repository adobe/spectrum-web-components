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
    // @todo Add Figma design link: design: { type: 'figma', url: '<avatar-node-url>' }
    // @todo Add Stackblitz link: stackblitz: { url: '<stackblitz-url>' }
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

const PLACEHOLDER_SRC = 'https://picsum.photos/id/64/500/500';

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

// alt ?? '' guards against undefined produced by Storybook controls when
// the user clears the alt field. Explicit stories use typed args that are always defined.
export const Playground: Story = {
  render: ({ src, alt, size, outline, disabled }) => html`
    <div
      style=${outline
        ? 'padding:16px;background:linear-gradient(to right,rgb(15,23,42),rgb(51,65,85));border-radius:8px;'
        : ''}
    >
      <swc-avatar
        src=${src}
        alt=${alt ?? ''}
        size=${size}
        ?outline=${outline}
        ?disabled=${disabled}
      ></swc-avatar>
    </div>
  `,
  tags: ['autodocs', 'dev'],
  args: {
    src: PLACEHOLDER_SRC,
    alt: 'Jane Doe',
    size: '500',
    outline: false,
    disabled: false,
  },
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: ({ src, alt, size }) => html`
    <swc-avatar src=${src} alt=${alt} size=${size}></swc-avatar>
  `,
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

/**
 * An avatar consists of:
 *
 * 1. **Image** — A circular clipped profile photo
 *
 * ### Content
 *
 * - `src`: URL of the profile image
 * - `alt`: Text description for assistive technology. Pass `alt=""` to mark as decorative.
 * - `size`: Numeric size token (50–1500). Defaults to `500` (40 px).
 */
export const Anatomy: Story = {
  render: () => html`
    <swc-avatar src=${PLACEHOLDER_SRC} alt="Jane Doe" size="500"></swc-avatar>
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Avatars come in 17 sizes from 50 to 1500, ranging from 16 px to 104 px.
 * Sizes 50–700 match 1st-gen; sizes 800–1500 are new in Spectrum 2.
 *
 * The default size is `500` (40 px).
 */
export const Sizes: Story = {
  render: () => html`
    ${AVATAR_VALID_SIZES.map(
      (size) => html`
        <swc-avatar
          src=${PLACEHOLDER_SRC}
          alt="Jane Doe, size ${size}"
          size=${size}
        ></swc-avatar>
      `
    )}
  `,
  parameters: {
    flexLayout: 'row-wrap',
    'section-order': 1,
  },
  tags: ['options'],
};

/**
 * Use the `decorative` attribute and `alt=""` to treat the avatar as decorative —
 * the image is hidden from assistive technology.
 *
 * Use this **only when the surrounding context already identifies the person**
 * (e.g., their name appears next to the avatar).
 */
export const Decorative: Story = {
  render: () => html`
    <swc-avatar
      src=${PLACEHOLDER_SRC}
      alt=""
      size="500"
      decorative
    ></swc-avatar>
    Jane Doe
  `,
  parameters: { 'section-order': 2 },
  tags: ['options'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

/**
 * An avatar can be placed inside an action button to create a user-triggered
 * action tied to a specific person or entity.
 *
 * @todo Replace `<button>` with `<swc-action-button>` once that component is
 * migrated to 2nd-gen.
 */
export const InActionButton: Story = {
  render: () => html`
    <button
      type="button"
      style="display:inline-flex;align-items:center;gap:8px;padding:4px 12px;cursor:pointer;"
    >
      <swc-avatar src=${PLACEHOLDER_SRC} alt="Jane Doe" size="100"></swc-avatar>
      Jane Doe
    </button>
  `,
  tags: ['behaviors'],
};

/**
 * Use the `outline` attribute to render a solid outline around the avatar
 * image. This is useful when the avatar's image border color matches the
 * surrounding background. The outline uses `--swc-avatar-outline-width`
 * (currently 1 px) for sizes 50–900 and a hardcoded 2 px for sizes 1000–1500,
 * matching the Spectrum 2 specification. Within an Avatar Group, `outline`
 * defaults to `true` to visually separate stacked avatars.
 */
export const Outline: Story = {
  render: () => html`
    <div
      style="display:inline-flex;gap:8px;align-items:center;padding:16px;background:linear-gradient(to right,rgb(15,23,42),rgb(51,65,85));border-radius:8px;"
    >
      <swc-avatar
        src=${PLACEHOLDER_SRC}
        alt="Jane Doe"
        size="500"
        outline
      ></swc-avatar>
      <swc-avatar
        src=${PLACEHOLDER_SRC}
        alt="Jane Doe"
        size="1000"
        outline
      ></swc-avatar>
    </div>
  `,
  parameters: { 'section-order': 3 },
  tags: ['options'],
};

/**
 * A disabled avatar indicates that the entity is not currently active or
 * available. The avatar remains visible in the layout at reduced opacity,
 * communicating that it may become active later. It remains in the
 * accessibility tree — `disabled` is purely visual.
 */
export const Disabled: Story = {
  render: () => html`
    <swc-avatar
      src=${PLACEHOLDER_SRC}
      alt="Jane Doe"
      size="500"
      disabled
    ></swc-avatar>
  `,
  parameters: { 'section-order': 4 },
  tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-avatar>` element implements several accessibility features:
 *
 * #### Alt text
 *
 * - Provide a descriptive `alt` value identifying the person or entity depicted
 * - Pass `alt=""` and set the `decorative` attribute when the name already appears in context
 *
 * ### Best practices
 *
 * - Always set `alt` — omitting it causes some screen readers to announce the image URL
 * - Use `alt=""` and `decorative` attribute only when the person is identified by adjacent text
 * - Keep alt text short and descriptive: prefer `"Jane Doe"` over `"Profile photo of Jane Doe"`
 */
export const Accessibility: Story = {
  render: () => html`
    <swc-avatar src=${PLACEHOLDER_SRC} alt="Jane Doe" size="500"></swc-avatar>
    <swc-avatar src=${PLACEHOLDER_SRC} alt="" size="500"></swc-avatar>
  `,
  tags: ['a11y'],
};
