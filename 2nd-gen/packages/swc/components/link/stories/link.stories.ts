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

import { Link } from '@adobe/spectrum-wc/link';

import '@adobe/spectrum-wc/link';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } = getStorybookHelpers('swc-link');

argTypes.variant = {
  ...argTypes.variant,
  control: { type: 'select' },
  options: [undefined, ...Link.VARIANTS],
};

argTypes['static-color'] = {
  ...argTypes['static-color'],
  control: { type: 'select' },
  options: [undefined, ...Link.STATIC_COLORS],
};

/**
 * A link displays a text link with Spectrum styling. Use links for navigation to
 * another page, section, or resource. Use the default (primary) style for the
 * main link in a context; use the secondary variant for lower emphasis.
 */
const meta: Meta = {
  title: 'Link',
  component: 'swc-link',
  args,
  argTypes,
  render: (args) => html`
    ${template({ ...args })}
  `,
  parameters: {
    actions: {
      handles: events,
    },
    docs: {
      subtitle: `Text link for navigation`,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Desktop?node-id=13642-334',
    },
    flexLayout: 'row-wrap',
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  args: {
    href: '#',
    'default-slot': 'Link text',
  },
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: (args) => html`
    <p>
      This is a ${template({ ...args, href: '#', 'default-slot': 'link' })} in a sentence.
    </p>
  `,
  args: {
    href: '#',
    'default-slot': 'link',
  },
  parameters: {
    flexLayout: 'column-stretch',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * The default (primary) link style uses the accent color and is underlined.
 */
export const Default: Story = {
  render: (args) => html`
    <p>
      This is a ${template({ ...args, href: '#', 'default-slot': 'link' })} in a sentence.
    </p>
  `,
  args: {
    href: '#',
    'default-slot': 'link',
  },
  parameters: {
    'section-order': 1,
  },
  tags: ['options'],
};

/**
 * Use the `quiet` attribute for a link with no underline by default;
 * the underline appears on hover and focus.
 */
export const Quiet: Story = {
  render: (args) => html`
    <p>
      This is a ${template({ ...args, href: '#', 'default-slot': 'quiet link', quiet: true })} in a sentence.
    </p>
  `,
  args: {
    href: '#',
    'default-slot': 'quiet link',
    quiet: true,
  },
  parameters: {
    'section-order': 2,
  },
  tags: ['options'],
};

/**
 * Use the `variant="secondary"` attribute for lower-emphasis links that use
 * the neutral content color.
 */
export const Secondary: Story = {
  render: (args) => html`
    <p>
      This is a ${template({ ...args, href: '#', 'default-slot': 'secondary link', variant: 'secondary' })} in a sentence.
    </p>
  `,
  args: {
    href: '#',
    'default-slot': 'secondary link',
    variant: 'secondary',
  },
  parameters: {
    'section-order': 3,
  },
  tags: ['options'],
};

/**
 * Combine `variant="secondary"` and `quiet` for a low-emphasis link without
 * a default underline.
 */
export const SecondaryQuiet: Story = {
  render: (args) => html`
    <p>
      This is a ${template({
        ...args,
        href: '#',
        'default-slot': 'secondary quiet link',
        variant: 'secondary',
        quiet: true,
      })} in a sentence.
    </p>
  `,
  args: {
    href: '#',
    'default-slot': 'secondary quiet link',
    variant: 'secondary',
    quiet: true,
  },
  parameters: {
    'section-order': 4,
  },
  tags: ['options'],
};

/**
 * Use `static-color="white"` or `static-color="black"` when the link sits on
 * a colored or image background so it remains readable.
 */
export const StaticColors: Story = {
  render: (args) => html`
    <div
      style="background-color: rgb(15, 121, 125); padding: 15px 20px; display: inline-block;"
    >
      <p style="color: rgb(240, 240, 240);">
        This
        ${template({ ...args, href: '#', 'default-slot': 'link', 'static-color': 'white' })}
        has a dark background.
      </p>
    </div>
    <div
      style="background-color: rgb(181, 209, 211); padding: 15px 20px; display: inline-block; margin-inline-start: 1rem;"
    >
      <p style="color: rgb(15, 15, 15);">
        This
        ${template({ ...args, href: '#', 'default-slot': 'link', 'static-color': 'black' })}
        has a light background.
      </p>
    </div>
  `,
  parameters: {
    'section-order': 5,
  },
  tags: ['options'],
};
StaticColors.storyName = 'Static colors';

/**
 * A disabled link is not focusable and does not respond to click. Use when the
 * navigation target is temporarily unavailable.
 */
export const Disabled: Story = {
  render: (args) => html`
    <p>
      This is a
      ${template({
        ...args,
        href: '#',
        'default-slot': 'disabled link',
        disabled: true,
      })}
      in a sentence.
    </p>
  `,
  args: {
    href: '#',
    'default-slot': 'disabled link',
    disabled: true,
  },
  parameters: {
    'section-order': 6,
  },
  tags: ['options'],
};

/**
 * Use the `download` attribute to indicate that the link target should be
 * downloaded rather than navigated to.
 */
export const Download: Story = {
  render: (args) => html`
    <p>
      This is a
      ${template({
        ...args,
        href: '#',
        'default-slot': 'downloadable file',
        download: 'example.txt',
      })}
      for you to click.
    </p>
  `,
  args: {
    href: '#',
    'default-slot': 'downloadable file',
    download: 'example.txt',
  },
  parameters: {
    'section-order': 7,
  },
  tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * - The link renders as a native `<a>` element, so it is keyboard focusable and
 *   activates with Enter.
 * - When `disabled` is true, the link has `aria-disabled="true"` and is not in
 *   the tab order.
 * - Use the `label` attribute to provide an accessible name when the visible
 *   text is not descriptive (e.g. "Read more").
 *
 * ### Best practices
 *
 * - Use descriptive link text instead of generic phrases like "click here."
 * - Ensure sufficient color contrast; use static color variants on colored
 *   backgrounds.
 */
export const Accessibility: Story = {
  render: (args) => html`
    <p>
      This is a ${template({ ...args, href: '#', 'default-slot': 'link' })} in a sentence.
    </p>
  `,
  args: {
    href: '#',
    'default-slot': 'link',
  },
  parameters: {
    flexLayout: 'column-stretch',
  },
  tags: ['a11y'],
};
