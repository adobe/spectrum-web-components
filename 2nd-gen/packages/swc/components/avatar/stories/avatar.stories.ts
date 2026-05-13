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

import '@adobe/spectrum-wc/components/avatar/swc-avatar.js';

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
    // @todo Add Figma design link: design: { type: 'figma', url: '<avatar-node-url>' }
    // @todo Add Stackblitz link: stackblitz: { url: '<stackblitz-url>' }
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
//    AUTODOCS STORY
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

/**
 * Avatars come in 17 sizes from 50 to 1500, ranging from 16 px to 104 px.
 * Sizes 50–700 match 1st-gen; sizes 800–1500 are new in Spectrum 2.
 *
 * The default size is `500` (40 px).
 */
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
  parameters: { 'section-order': 2 },
  tags: ['options'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

/**
 * An avatar can be placed inside an action button to create a user-triggered
 * action tied to a specific person or entity.
 */
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

/**
 * Use the `outline` attribute to render a solid outline around the avatar
 * image. This is useful when the avatar's image border color matches the
 * surrounding background. The outline uses `--swc-avatar-outline-width`
 * (currently 1 px) for sizes 50–900 and a hardcoded 2 px for sizes 1000–1500,
 * matching the Spectrum 2 specification. Within an Avatar Group, `outline`
 * defaults to `true` to visually separate stacked avatars.
 */
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
  parameters: { 'section-order': 4 },
  tags: ['options'],
};

// ──────────────────────────────────
//    UPCOMING FEATURES STORIES
// ──────────────────────────────────

/**
 * ### Additional avatar types
 *
 * - **Gradient image**: Shows a generated colorful gradient when no photo is available
 * - **Initials**: Shows the user's initials inside the avatar circle as a photo fallback
 * - **Guest**: Shows a default guest icon when no user identity is known
 *
 * ### Avatar Group
 *
 * - Display a collection of avatars in a stacked layout with configurable overlap and overflow
 */
export const UpcomingFeatures: Story = {
  tags: ['upcoming', 'description-only'],
};
UpcomingFeatures.storyName = 'Upcoming features';

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
 * #### Non-interactive element
 *
 * - Avatars have no interactive behavior and are not focusable
 * - Screen readers announce the image using the `alt` attribute value
 * - No keyboard interaction is required or expected
 * - To make an avatar a link, wrap it in a standard `<a>` element and set `aria-label` on the anchor when the destination is not clear from surrounding context
 *
 * ### Best practices
 *
 * - Always set `alt` — omitting it causes some screen readers to announce the image URL
 * - Use `alt=""` and `decorative` attribute only when the person is identified by adjacent text
 * - Keep alt text short and descriptive: prefer `"Jane Doe"` over `"Profile photo of Jane Doe"`
 */
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
