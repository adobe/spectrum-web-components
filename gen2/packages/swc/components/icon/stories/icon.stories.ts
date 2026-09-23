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
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import {
  ICON_VALID_SIZES,
  type IconSize,
} from '@adobe/spectrum-wc-core/components/icon';
import { Icon_ChevronDown } from '@adobe/spectrum-wc-icons/ChevronDown.js';

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

// A Spectrum workflow icon's SVG string, slotted in to stand in for a consumer's
// own SVG. Its fill resolves through `var(--swc-icon-color, currentColor)`,
// matching the custom-icon contract documented on this page.
const iconSvg = html`
  ${unsafeSVG(Icon_ChevronDown())}
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
  render: (args) => template(args, iconSvg),
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
  render: (args) => template(args, iconSvg),
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
      iconSvg
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
        iconSvg
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
      iconSvg
    )}
    <div style="color: #d7373f">
      ${template(
        { ...args, size: 'l', 'accessible-label': 'Colored via CSS color' },
        iconSvg
      )}
    </div>
    <div style="--swc-icon-color: #0d66d0">
      ${template(
        {
          ...args,
          size: 'l',
          'accessible-label': 'Colored via --swc-icon-color',
        },
        iconSvg
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
  render: (args) => template(args, iconSvg),
  tags: ['a11y'],
  args: {
    'accessible-label': 'Favorite',
    size: 'm',
  },
};
