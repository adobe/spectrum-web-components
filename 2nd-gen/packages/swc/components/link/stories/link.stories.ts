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

import {
  CONTEXTS,
  LANGS,
  type LinkTemplateProps,
  SIZES,
  template,
  VARIANTS,
} from './link.template.js';

/**
 * Link presentation uses native `<a href>` with BEM classes from `link.css`.
 *
 * Default anchor appearance inside prose and link lists ships with
 * `typography.css` — see [Typography / Prose container](../typography/stories/typography.stories.ts)
 * and [Typography / Link list](../typography/stories/typography.stories.ts).
 */
const meta: Meta<LinkTemplateProps> = {
  title: 'Link',
  parameters: {
    docs: {
      subtitle:
        'Native anchors with `.swc-Link` modifier classes. Import `@adobe/spectrum-wc/link.css`.',
    },
  },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    context: { control: 'select', options: CONTEXTS },
    size: {
      control: 'select',
      options: SIZES,
      description:
        'Prose and link lists: `swc-Body--size*`. Standalone: `--swc-link-font-size`.',
    },
    quiet: {
      control: 'boolean',
      description:
        'Removes underline until hover. Only applies with standalone context (pairs with `swc-Link--standalone`).',
    },
    inline: {
      control: 'boolean',
      description:
        'Uses regular font weight on standalone links (S2 inline behavior).',
    },
    lang: { control: 'select', options: LANGS },
    href: { control: 'text' },
    sampleText: { control: 'text' },
    showAllVariants: { control: 'boolean' },
  },
  render: (args) => html`
    ${template(args)}
  `,
  tags: ['migrated', 'utility'],
};

export default meta;

export const Playground: Story = {
  args: {
    variant: 'default',
    context: 'standalone',
    size: 'M',
    quiet: false,
    inline: false,
    lang: undefined,
    href: '#',
    sampleText: '',
    showAllVariants: false,
  },
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
  tags: ['autodocs', 'dev'],
};

/**
 * Standalone link with explicit Spectrum typography (not inheriting a prose wrapper).
 */
export const Standalone: Story = {
  args: {
    context: 'standalone',
    variant: 'default',
    sampleText: 'Account settings',
  },
  tags: ['options'],
};

/**
 * Secondary color treatment (replaces `sp-link variant="secondary"`).
 */
export const Secondary: Story = {
  args: {
    context: 'standalone',
    variant: 'secondary',
    sampleText: 'Learn more',
  },
  tags: ['options'],
};

/**
 * Quiet + standalone removes the default underline until hover — use in footers
 * and other section-scoped patterns, not undifferentiated body copy.
 */
export const QuietStandalone: Story = {
  args: {
    context: 'standalone',
    variant: 'default',
    quiet: true,
    sampleText: 'Privacy policy',
  },
  tags: ['options'],
};

export const InProse: Story = {
  args: {
    context: 'prose',
    variant: 'default',
    size: 'M',
  },
  tags: ['options'],
};

export const LinkList: Story = {
  args: {
    context: 'links',
    variant: 'default',
  },
  tags: ['options'],
};

export const StaticWhite: Story = {
  args: {
    context: 'standalone',
    variant: 'staticWhite',
    sampleText: 'white link',
  },
  tags: ['options'],
};

export const StaticBlack: Story = {
  args: {
    context: 'standalone',
    variant: 'staticBlack',
    sampleText: 'black link',
  },
  tags: ['options'],
};

/**
 * All color variants for side-by-side comparison.
 */
export const AllVariants: Story = {
  args: {
    context: 'standalone',
    showAllVariants: true,
    sampleText: 'Link label',
  },
  tags: ['options'],
};
