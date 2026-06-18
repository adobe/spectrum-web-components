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
} from '@spectrum-web-components/core/components/icon';

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
 * Icons represent symbols, objects, or actions. `<swc-icon>` renders SVG markup
 * from the default slot. Bring your own SVG. Spectrum 2 does not ship iconsets
 * or a `name` registry.
 */
const meta: Meta = {
  title: 'Icon',
  component: 'swc-icon',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: `Slot your own SVG to render an icon at a Spectrum size.`,
    },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

// SVG copied from `elements/Chevron100Icon.ts` for docs examples (BYO slot content).
const chevronIconSvg = html`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
    <path
      d="M2.83789 9.8252c-.19238 0-.38379-.07324-.53027-.21973-.29297-.29297-.29297-.76758 0-1.06055l3.54395-3.54492L2.30762 1.45508c-.29297-.29297-.29297-.76758 0-1.06055s.76758-.29297 1.06055 0l4.07422 4.0752c.29297.29297.29297.76758 0 1.06055l-4.07422 4.0752c-.14648.14648-.33789.21973-.53027.21973Z"
    />
  </svg>
`;

const sizeLabels = {
  xs: 'Extra-small',
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<IconSize, string>;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['dev'],
  render: (args) => template(args, chevronIconSvg),
  args: {
    label: 'Expand',
    size: 'm',
  },
};

// ────────────────────
//    OVERVIEW STORY
// ────────────────────

export const Overview: Story = {
  tags: ['overview'],
  render: (args) => template(args, chevronIconSvg),
  args: {
    label: 'Expand',
    size: 'm',
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) =>
    template({ ...args, label: args.label || 'Chevron icon' }, chevronIconSvg),
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${ICON_VALID_SIZES.map((size) =>
      template(
        { ...args, label: args.label || sizeLabels[size], size },
        chevronIconSvg
      )
    )}
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
  render: (args) => template(args, chevronIconSvg),
  tags: ['a11y'],
};
