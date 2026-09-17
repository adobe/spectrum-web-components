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
  ICON_VALID_SIZES,
  type IconSize,
} from '@adobe/spectrum-wc-core/components/icon';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-icon');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: ICON_VALID_SIZES,
};

/**
 * The `<swc-icon>` frame renders a custom, non-Spectrum SVG that you slot in,
 * giving it the same size box, color, and accessibility handling as a Spectrum
 * icon. Reach for it only when the drawing is your own: for Spectrum's own art,
 * use a workflow icon from `@adobe/spectrum-wc-icons`, and inside a control, a
 * [UI icon](../?path=/docs/components-ui-icons--docs).
 */
const meta: Meta = {
  title: 'Icon',
  component: 'swc-icon',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: `Frame for a custom SVG: size box, color, and accessibility.`,
    },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

// A stand-in for a consumer's own SVG: a single <svg> with a viewBox and a
// currentColor fill, matching the custom-icon contract documented on this page.
const customSvg = html`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.82 6.2 20.86l1.11-6.46-4.7-4.58 6.49-.94z"
      fill="currentColor"
    />
  </svg>
`;

const sizeLabels = {
  xs: 'Extra small',
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra large',
} as const satisfies Record<IconSize, string>;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['dev'],
  render: (args) => template(args, customSvg),
  args: {
    'accessible-label': 'Favorite',
    size: 'm',
  },
};

// ────────────────────
//    OVERVIEW STORY
// ────────────────────

export const Overview: Story = {
  tags: ['overview'],
  render: (args) => template(args, customSvg),
  args: {
    'accessible-label': 'Favorite',
    size: 'm',
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) =>
    template(
      {
        ...args,
        'accessible-label': args['accessible-label'] || 'Favorite',
      },
      customSvg
    ),
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${ICON_VALID_SIZES.map((size) =>
      template(
        {
          ...args,
          'accessible-label': args['accessible-label'] || sizeLabels[size],
          size,
        },
        customSvg
      )
    )}
  `,
  tags: ['options'],
  parameters: {
    flexLayout: 'row-wrap',
  },
};

export const Color: Story = {
  render: (args) => html`
    ${template(
      { ...args, size: 'l', 'accessible-label': 'Inherits text color' },
      customSvg
    )}
    <div style="color: #d7373f">
      ${template(
        { ...args, size: 'l', 'accessible-label': 'Colored via CSS color' },
        customSvg
      )}
    </div>
    <div style="--swc-icon-color: #0d66d0">
      ${template(
        {
          ...args,
          size: 'l',
          'accessible-label': 'Colored via --swc-icon-color',
        },
        customSvg
      )}
    </div>
  `,
  tags: ['options'],
  parameters: {
    flexLayout: 'row-wrap',
  },
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => template(args, customSvg),
  tags: ['a11y'],
  args: {
    'accessible-label': 'Favorite',
    size: 'm',
  },
};
