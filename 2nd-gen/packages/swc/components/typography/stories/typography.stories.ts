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
  LANGS,
  SIZES,
  template,
  type TypographyTemplateProps,
  VARIANTS,
} from './typography.template.js';

/**
 * Variants default to Adobe Clean Spectrum VF, a sans-serif font family.
 * Modifiers are available to use the serif font stack, and other sub-variants.
 * CJK adjustments are applied based on the `:lang()` selector.
 *
 * Learn more about [loading the expected fonts](/docs/guides-customization-fonts--docs).
 */
const meta: Meta<TypographyTemplateProps> = {
  title: 'Typography',
  parameters: {
    docs: {
      subtitle: `Typography variant styles are available via CSS classes.`,
      canvas: {
        sourceState: 'hidden',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: SIZES },
    serif: { control: 'boolean' },
    heavy: { control: 'boolean' },
    emphasized: { control: 'boolean' },
    margins: { control: 'boolean' },
    prose: { control: 'boolean' },
    lang: { control: 'select', options: LANGS },
    includeMultipleSizes: { control: 'boolean' },
    showAllVariants: { control: 'boolean' },
    sampleText: { control: 'text' },
  },
  render: (args) => html`
    ${template(args)}
  `,
  tags: ['migrated', 'utility'],
};

export default meta;

export const Playground: Story = {
  args: {
    variant: 'heading',
    size: 'M',
    serif: false,
    heavy: false,
    emphasized: false,
    margins: false,
    prose: false,
    lang: undefined,
    includeMultipleSizes: false,
    showAllVariants: false,
    sampleText: '',
  },
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
  tags: ['dev'],
};

export const Defaults: Story = {
  args: {
    showAllVariants: true,
  },
  tags: ['options'],
};

export const SerifModifier: Story = {
  args: {
    showAllVariants: true,
    serif: true,
  },
  tags: ['options'],
};

export const EmphasizedModifier: Story = {
  args: {
    showAllVariants: true,
    emphasized: true,
  },
  tags: ['options'],
};

export const HeadingVariant: Story = {
  args: {
    variant: 'heading',
    includeMultipleSizes: true,
  },
  tags: ['options'],
};

export const HeadingHeavy: Story = {
  args: {
    variant: 'heading',
    heavy: true,
    size: 'L',
    sampleText: 'Adobe Express Uses Heavy Headings',
  },
  tags: ['options'],
};

export const TitleVariant: Story = {
  args: {
    variant: 'title',
    includeMultipleSizes: true,
  },
  tags: ['options'],
};

export const BodyVariant: Story = {
  args: {
    variant: 'body',
    includeMultipleSizes: true,
  },
  tags: ['options'],
};

export const DetailVariant: Story = {
  args: {
    variant: 'detail',
    includeMultipleSizes: true,
  },
  tags: ['options'],
};

export const CodeVariant: Story = {
  args: {
    variant: 'code',
    includeMultipleSizes: true,
  },
  tags: ['options'],
};

export const MarginsModifier: Story = {
  args: {
    variant: 'body',
    margins: true,
    sampleText:
      'This paragraph should receive margins when the `--margins` modifier is applied.',
  },
  tags: ['options'],
};

/**
 * Applies block-direction margins to all type variants within a container with the `.swc-Typography--prose` class applied.
 *
 * This also applies foundational type properties based on heading, title and body styles to common semantic typography elements including:
 * - `h1` - Heading, size M
 * - `h2` - Title, size XL
 * - `h3` - Title, size L
 * - `h4` - Title, size M
 * - `p, li` - Body, size M
 * - `a` - inherits font styles, such as Body, size M from paragraphs
 */
export const ProseContainer: Story = {
  args: {
    variant: 'body',
    prose: true,
  },
  tags: ['options'],
  render: () => html`
    <div
      class="swc-Typography--prose typography-samples typography-samples--nogrid"
    >
      <h1>Semantic H1</h1>
      <h2>Semantic H2</h2>
      <p>
        Semantic paragraph with an
        <a href="#">inline link</a>
        that inherits body typography. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Donec eleifend est mollis ligula lobortis, tempus
        ultricies sapien lacinia.
      </p>
      <h3>Semantic H3</h3>
      <p>
        Semantic paragraph. Nulla ut turpis velit. Sed finibus dapibus diam et
        sollicitudin.
      </p>
      <h4>Semantic H4</h4>
      <p>
        Semantic paragraph. Donec scelerisque orci sit amet venenatis luctus.
      </p>
      <h2 class="swc-Heading">Heading default variant H2</h2>
      <p class="swc-Body">
        Body default variant paragraph. Phasellus in ipsum nec ante elementum
        congue eget in leo. Morbi eleifend justo non rutrum venenatis. Fusce
        cursus et lectus eu facilisis. Ut laoreet felis in magna dignissim
        feugiat.
      </p>
      <ul>
        <li>Semantic list item 1</li>
        <li>Semantic list item 2</li>
        <li>Semantic list item 3</li>
      </ul>
    </div>
  `,
};

/**
 * Link lists in footers, sidebars, and navigation regions use
 * `.swc-Typography--links` so child `<a href>` elements receive default link
 * styling without per-link classes. See [Link migration guide](/docs/link-migration-guide--docs)
 * for modifier classes on individual anchors.
 */
export const LinkList: Story = {
  tags: ['options'],
  render: () => html`
    <ul
      class="swc-Typography--links"
      style="list-style: none; padding: 0; margin: 0;"
    >
      <li><a href="#">Privacy policy</a></li>
      <li><a href="#">Terms of use</a></li>
      <li><a href="#">Contact support</a></li>
    </ul>
  `,
};
