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

import '@adobe/spectrum-wc/illustrated-message';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers(
  'swc-illustrated-message'
);

/**
 * An illustrated message displays an illustration and a message, typically
 * used in empty states or error pages.
 *
 * ### Heading level
 *
 * Provide the appropriate `<h2>`–`<h6>` element directly in the `heading`
 * slot to match the document outline. The component does not control the heading level.
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

const cloudIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="95" height="95" viewBox="0 0 160 160" fill="none">
<path d="M89.3301 28.5C108.54 28.5001 124.013 43.9629 125.408 63.2666C140.627 66.0007 152 79.7946 152 96.1348C152 114.396 137.782 129.5 119.883 129.5C119.845 129.5 119.81 129.499 119.78 129.498C119.762 129.498 119.744 129.5 119.726 129.5H31.8809C31.7135 129.5 31.5486 129.489 31.3867 129.469C18.2497 129.009 8.00002 117.812 8 104.385C8 94.2106 13.8624 85.3674 22.4043 81.4414C22.3044 80.4799 22.2481 79.4992 22.248 78.5C22.248 62.9098 34.3925 49.9717 49.7344 49.9717C51.9927 49.9717 54.1852 50.2598 56.2822 50.7949C61.8951 37.7322 74.5088 28.5 89.3301 28.5ZM89.3301 36.5C76.8952 36.5 66.2004 45.0053 62.5117 57.0029C62.1777 58.0892 61.397 58.9825 60.3652 59.459C59.3335 59.9354 58.148 59.95 57.1045 59.5C54.8246 58.5167 52.3407 57.9717 49.7344 57.9717C39.1347 57.9717 30.248 66.997 30.248 78.5C30.2481 80.0858 30.4383 81.6436 30.7773 83.1748C31.2346 85.2397 30.006 87.3041 27.9727 87.8857C21.1679 89.8324 16 96.3956 16 104.385C16 113.898 23.2731 121.333 31.9502 121.482C32.0505 121.484 32.1497 121.491 32.248 121.5H119.548C119.614 121.497 119.681 121.496 119.747 121.496C119.805 121.496 119.854 121.497 119.889 121.498C119.901 121.498 119.912 121.499 119.923 121.499C133.063 121.477 144 110.295 144 96.1348C144 82.4618 133.788 71.5543 121.259 70.8145C119.114 70.6878 117.452 68.8891 117.495 66.7412C117.504 66.2932 117.512 66.3311 117.512 66.1104C117.512 49.5915 104.732 36.5001 89.3301 36.5Z" fill="#292929"/>
</svg>`;

// ────────────────────
//    STORIES
// ────────────────────

const defaultSlots = html`
  <span slot="">${unsafeHTML(cloudIcon)}</span>
  <h2 slot="heading">Illustrated message title</h2>
  <span slot="description">
    Illustrated message description. Give more information about what a user can
    do, expect, or how to make items appear.
  </span>
`;

export const Playground: Story = {
  render: (args) => template(args, defaultSlots),
  tags: ['autodocs', 'dev'],
};

export const Overview: Story = {
  render: (args) => template(args, defaultSlots),
  tags: ['overview'],
};

/**
 * SVGs slotted into the illustration slot should declare their accessibility
 * intent explicitly:
 *
 * - **Decorative** (most common): add `aria-hidden="true"` so screen readers
 *   skip the graphic entirely.
 * - **Informative**: add `role="img"` and `aria-label` (or an inline `<title>`)
 *   so screen readers announce the illustration's meaning.
 */
export const IllustrationAccessibility: Story = {
  render: (args) => html`
    ${template(
      args,
      html`
        <span slot="">${unsafeHTML(cloudIcon)}</span>
        <h2 slot="heading">Illustrated message title</h2>
        <span slot="description">
          The icon above uses
          <code>aria-hidden="true"</code>
          — screen readers skip the illustration entirely and move on to the
          heading and description.
        </span>
      `
    )}
    ${template(
      args,
      html`
        <span slot="">${unsafeHTML(cloudIcon)}</span>
        <h2 slot="heading">Illustrated message title</h2>
        <span slot="description">
          The icon above uses
          <code>role="img"</code>
          and
          <code>aria-label</code>
          — screen readers announce its meaning before reading the heading and
          description.
        </span>
      `
    )}
  `,
  tags: ['a11y'],
};
