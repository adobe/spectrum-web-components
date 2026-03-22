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
 * Learn more about [loading the expected fonts](/docs/guides-customization-fonts--readme).
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
  tags: ['autodocs', 'dev'],
};

/**
 * Type variants are applied using a base class in the format `.swc-[Variant]`, such as `.swc-Heading`.
 *
 * Each type variant defaults to sans-serif and size medium.
 */
export const Defaults: Story = {
  args: {
    showAllVariants: true,
  },
  parameters: { 'section-order': 1 },
  tags: ['options'],
};

/**
 * The following variants include a serif sub-variant, which can be used by adding the `--serif` modifier class alongside the base class.
 */
export const SerifModifier: Story = {
  args: {
    showAllVariants: true,
    serif: true,
  },
  parameters: { 'section-order': 2 },
  tags: ['options'],
};

/**
 * The following variants may use the emphasized modifier by adding `.swc-Typography--emphasized` alongside the base class.
 * It may also be applied to the serif sub-variants.
 */
export const EmphasizedModifier: Story = {
  args: {
    showAllVariants: true,
    emphasized: true,
  },
  parameters: { 'section-order': 3 },
  tags: ['options'],
};

/**
 * Heading text represents the biggest and boldest text on a page, and it draws the most attention. Only the broadest idea, such as the main page title, should use this style.
 */
export const HeadingVariant: Story = {
  args: {
    variant: 'heading',
    includeMultipleSizes: true,
  },
  parameters: {
    'section-order': 4,
  },
  tags: ['options'],
};

/**
 * Heading is also available in a `--heavy` style that sets the font weight to the heaviest of `black`.
 * Black weight text should only be used in heading type styles, and never below `18px` font-size, to ensure the text remains legible.
 */
export const HeadingHeavy: Story = {
  args: {
    variant: 'heading',
    heavy: true,
    size: 'L',
    sampleText: 'Adobe Express Uses Heavy Headings',
  },
  parameters: {
    'section-order': 5,
  },
  tags: ['options'],
};

/**
 * Title is used for essential text items on the page, such as wayfinding or context-setting.
 * While the Heading style is for the loudest, most broad message, there are still going to be other important items in an information hierarchy.
 */
export const TitleVariant: Story = {
  args: {
    variant: 'title',
    includeMultipleSizes: true,
  },
  parameters: {
    'section-order': 6,
  },
  tags: ['options'],
};

/**
 * Body is the type style that’s primarily used for longer-form text that may extend to multiple lines.
 * It's used for the text that creates the main content on a page.
 */
export const BodyVariant: Story = {
  args: {
    variant: 'body',
    includeMultipleSizes: true,
  },
  parameters: { 'section-order': 7 },
  tags: ['options'],
};

/**
 * "Detail text" is a broad term for any kind of text that communicates ideas that are even more specific than body text.
 * Text using the Detail style acts as supporting context to any other information presented, such as metadata, helper copy, or captions.
 */
export const DetailVariant: Story = {
  args: {
    variant: 'detail',
    includeMultipleSizes: true,
  },
  parameters: { 'section-order': 8 },
  tags: ['options'],
};

export const CodeVariant: Story = {
  args: {
    variant: 'code',
    includeMultipleSizes: true,
  },
  parameters: { 'section-order': 9 },
  tags: ['options'],
};

/**
 * Applies block-direction margins via the `--margins` modifier.
 */
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
        Semantic paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Donec eleifend est mollis ligula lobortis, tempus ultricies sapien
        lacinia.
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
