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
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { IllustratedMessage } from '@adobe/spectrum-wc/illustrated-message';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers(
  'swc-illustrated-message'
);

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: IllustratedMessage.VALID_SIZES,
};

argTypes.orientation = {
  ...argTypes.orientation,
  control: { type: 'select' },
  options: IllustratedMessage.VALID_ORIENTATIONS,
};

/**
 * An illustrated message displays an illustration alongside a heading and
 * description, typically used in empty states or on error pages.
 *
 * ### Heading level
 *
 * Provide the appropriate `<h2>`–`<h6>` element directly in the `heading` slot
 * to match the document outline. The component validates the slot content in
 * development but does not control the heading level.
 *
 * ### Migration from 1st-gen
 *
 * The `heading` and `description` plain-text attributes from 1st-gen
 * (`sp-illustrated-message`) have been removed. All content must be provided
 * via slots.
 */
export const meta: Meta = {
  title: 'Illustrated Message',
  component: 'swc-illustrated-message',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'Display an illustration with a heading and description.',
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=20032-601&p=f&t=v3YDUMXflgtF0NtJ-0',
    },
    // @todo SWC-1992 Add Stackblitz link: stackblitz: { url: '<stackblitz-url>' }
  },
  tags: ['migrated'],
};

export default {
  ...meta,
  title: 'Illustrated Message',
  excludeStories: ['meta'],
} as Meta;

// ────────────────────
//    HELPERS
// ────────────────────

const cloudPath = `<path d="M89.3301 28.5C108.54 28.5001 124.013 43.9629 125.408 63.2666C140.627 66.0007 152 79.7946 152 96.1348C152 114.396 137.782 129.5 119.883 129.5C119.845 129.5 119.81 129.499 119.78 129.498C119.762 129.498 119.744 129.5 119.726 129.5H31.8809C31.7135 129.5 31.5486 129.489 31.3867 129.469C18.2497 129.009 8.00002 117.812 8 104.385C8 94.2106 13.8624 85.3674 22.4043 81.4414C22.3044 80.4799 22.2481 79.4992 22.248 78.5C22.248 62.9098 34.3925 49.9717 49.7344 49.9717C51.9927 49.9717 54.1852 50.2598 56.2822 50.7949C61.8951 37.7322 74.5088 28.5 89.3301 28.5ZM89.3301 36.5C76.8952 36.5 66.2004 45.0053 62.5117 57.0029C62.1777 58.0892 61.397 58.9825 60.3652 59.459C59.3335 59.9354 58.148 59.95 57.1045 59.5C54.8246 58.5167 52.3407 57.9717 49.7344 57.9717C39.1347 57.9717 30.248 66.997 30.248 78.5C30.2481 80.0858 30.4383 81.6436 30.7773 83.1748C31.2346 85.2397 30.006 87.3041 27.9727 87.8857C21.1679 89.8324 16 96.3956 16 104.385C16 113.898 23.2731 121.333 31.9502 121.482C32.0505 121.484 32.1497 121.491 32.248 121.5H119.548C119.614 121.497 119.681 121.496 119.747 121.496C119.805 121.496 119.854 121.497 119.889 121.498C119.901 121.498 119.912 121.499 119.923 121.499C133.063 121.477 144 110.295 144 96.1348C144 82.4618 133.788 71.5543 121.259 70.8145C119.114 70.6878 117.452 68.8891 117.495 66.7412C117.504 66.2932 117.512 66.3311 117.512 66.1104C117.512 49.5915 104.732 36.5001 89.3301 36.5Z" fill="currentColor"/>`;

const cloudSvg = (a11yAttrs: string) =>
  `<svg slot="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" ${a11yAttrs}>\n${cloudPath}\n</svg>`;

const defaultSlots = html`
  ${unsafeHTML(cloudSvg('aria-hidden="true"'))}
  <h2 slot="heading">Illustrated message title</h2>
  <span slot="description">Supporting description text.</span>
`;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => template(args, defaultSlots),
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: (args) => template(args, defaultSlots),
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * An illustrated message consists of three slots:
 *
 * 1. **Default slot**: Decorative or informative SVG illustration displayed
 *    above (vertical) or beside (horizontal) the heading and description.
 *    Decorative SVGs must have `aria-hidden="true"`. Informative SVGs must have
 *    `role="img"` and `aria-label`.
 * 2. **`heading` slot**: Consumer-provided `<h2>`–`<h6>` element. The component
 *    does not own the heading tag; the consumer chooses the level to match the
 *    document outline. The component warns in development if a non-heading element
 *    is used.
 * 3. **`description` slot** (optional): Supporting text that elaborates on the
 *    heading. May contain phrasing content, links, or action elements.
 */
export const Anatomy: Story = {
  render: (args) => html`
    ${template(
      args,
      html`
        ${unsafeHTML(cloudSvg('aria-hidden="true"'))}
        <h2 slot="heading">Heading only</h2>
      `
    )}
    ${template(
      args,
      html`
        ${unsafeHTML(cloudSvg('aria-hidden="true"'))}
        <h2 slot="heading">Heading and description</h2>
        <span slot="description">Optional supporting description.</span>
      `
    )}
  `,
  tags: ['anatomy'],
  parameters: {
    styles: { display: 'flex', 'flex-direction': 'column', gap: '3rem' },
  },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Illustrated messages come in three sizes to fit various contexts:
 *
 * - **Small (`s`)**: 96px illustration, compact spacing, for space-constrained contexts
 * - **Medium (`m`)**: 96px illustration, standard spacing, the default
 * - **Large (`l`)**: 160px illustration, reduced spacing, for prominent empty states
 */
export const Sizes: Story = {
  render: (args) => html`
    ${template(
      { ...args, size: 's' },
      html`
        ${unsafeHTML(cloudSvg('aria-hidden="true"'))}
        <h2 slot="heading">Small</h2>
        <span slot="description">Size s, 96px illustration</span>
      `
    )}
    ${template(
      { ...args, size: 'm' },
      html`
        ${unsafeHTML(cloudSvg('aria-hidden="true"'))}
        <h2 slot="heading">Medium</h2>
        <span slot="description">Size m, 96px illustration (default)</span>
      `
    )}
    ${template(
      { ...args, size: 'l' },
      html`
        ${unsafeHTML(cloudSvg('aria-hidden="true"'))}
        <h2 slot="heading">Large</h2>
        <span slot="description">Size l, 160px illustration</span>
      `
    )}
  `,
  tags: ['options'],
  parameters: {
    flexLayout: true,
    'section-order': 1,
  },
};

/**
 * Illustrated messages support two layout orientations:
 *
 * - **Vertical** (default): illustration stacked above the heading and description,
 *   centered. Use for full-page or centered empty states.
 * - **Horizontal**: illustration beside the heading and description in a row,
 *   left-aligned. Use for inline or sidebar empty states.
 */
export const Orientation: Story = {
  render: (args) => html`
    ${template(
      { ...args, orientation: 'vertical' },
      html`
        ${unsafeHTML(cloudSvg('aria-hidden="true"'))}
        <h2 slot="heading">Vertical (default)</h2>
        <span slot="description">Illustration stacked above the content.</span>
      `
    )}
    ${template(
      { ...args, orientation: 'horizontal' },
      html`
        ${unsafeHTML(cloudSvg('aria-hidden="true"'))}
        <h2 slot="heading">Horizontal</h2>
        <span slot="description">Illustration beside the content.</span>
      `
    )}
  `,
  tags: ['options'],
  parameters: {
    styles: { display: 'flex', 'flex-direction': 'column', gap: '2rem' },
    'section-order': 2,
  },
};

/**
 * The `heading` slot accepts any `<h2>`–`<h6>` element. Choose the level that
 * fits the surrounding document outline. The component validates but does not
 * restrict the heading level.
 *
 * Common patterns:
 *
 * - `<h2>` for page-level empty states with no other headings in scope
 * - `<h3>` for empty states nested inside a page section with its own `<h2>`
 * - `<h4>` or deeper for empty states inside nested panels or cards
 */
export const HeadingLevels: Story = {
  render: (args) => html`
    ${template(
      args,
      html`
        ${unsafeHTML(cloudSvg('aria-hidden="true"'))}
        <h2 slot="heading">Heading h2</h2>
        <span slot="description">Can be used for full-page empty states.</span>
      `
    )}
    ${template(
      args,
      html`
        ${unsafeHTML(cloudSvg('aria-hidden="true"'))}
        <h3 slot="heading">Heading h3</h3>
        <span slot="description">Can be used inside a page section.</span>
      `
    )}
    ${template(
      args,
      html`
        ${unsafeHTML(cloudSvg('aria-hidden="true"'))}
        <h4 slot="heading">Heading h4</h4>
        <span slot="description">Can be used inside a panel or card.</span>
      `
    )}
  `,
  tags: ['options'],
  parameters: {
    styles: { display: 'flex', 'flex-direction': 'column', gap: '3rem' },
    'section-order': 3,
  },
};
HeadingLevels.storyName = 'Heading levels';

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

/**
 * Place an `<a>` element inside the `description` slot to provide a
 * call-to-action link alongside the supporting text.
 */
export const DescriptionWithLink: Story = {
  render: (args) => html`
    ${template(
      args,
      html`
        ${unsafeHTML(cloudSvg('aria-hidden="true"'))}
        <h2 slot="heading">Upload your files</h2>
        <span slot="description">
          <a href="#">Select a file</a>
          from your computer to get started.
        </span>
      `
    )}
  `,
  tags: ['behaviors'],
};
DescriptionWithLink.storyName = 'Description with link';

// ────────────────────────────────
//    UPCOMING FEATURES STORIES
// ────────────────────────────────

/**
 * ### Button group slot
 *
 * An upcoming button group slot will let you add action buttons alongside the heading and description.
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
 * The `<swc-illustrated-message>` element implements the following
 * accessibility features:
 *
 * 1. **Heading ownership**: The consumer provides the `<h2>`–`<h6>` element
 *    directly in the `heading` slot, preserving full control over heading
 *    level and ensuring it participates in the document outline.
 * 2. **Illustration intent**: SVGs in the default slot must declare their
 *    accessibility intent explicitly via `aria-hidden` or `role="img"`.
 * 3. **No redundant ARIA**: The component adds no `role` or `aria-*`
 *    attributes of its own; semantics come entirely from slotted content.
 *
 * ### Best practices
 *
 * - Decorative illustrations (most common): add `aria-hidden="true"` so
 *   screen readers skip the graphic and move directly to the heading.
 * - Informative illustrations: add `role="img"` and `aria-label` (or an
 *   inline `<title>`) so screen readers announce the illustration's meaning
 *   before reading the heading and description.
 * - Choose the heading level (`h2`–`h6`) that fits the surrounding document
 *   outline, not based on visual size.
 */
export const IllustrationAccessibility: Story = {
  render: (args) => html`
    ${template(
      args,
      html`
        ${unsafeHTML(cloudSvg('aria-hidden="true"'))}
        <h2 slot="heading">Illustrated message title</h2>
        <span slot="description">
          The icon above uses
          <code>aria-hidden="true"</code>
          so screen readers skip the illustration entirely and move on to the
          heading and description.
        </span>
      `
    )}
    ${template(
      args,
      html`
        ${unsafeHTML(
          cloudSvg('role="img" aria-label="Cloud storage illustration"')
        )}
        <h2 slot="heading">Illustrated message title</h2>
        <span slot="description">
          The icon above uses
          <code>role="img"</code>
          and
          <code>aria-label</code>
          so screen readers announce its meaning before reading the heading and
          description.
        </span>
      `
    )}
  `,
  tags: ['a11y'],
};
