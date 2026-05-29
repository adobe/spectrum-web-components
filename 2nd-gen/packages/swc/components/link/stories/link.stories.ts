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
import { styleMap } from 'lit/directives/style-map.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  CONTEXTS,
  LANGS,
  LINK_COLOR_VARIANTS,
  LINK_STATIC_VARIANTS,
  type LinkTemplateProps,
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
    variant: {
      control: 'select',
      options: VARIANTS,
      description:
        'BEM color modifiers (`secondary`, static white/black). Apply in **explicit** context — prose and link lists use typography defaults.',
    },
    context: {
      control: 'select',
      options: CONTEXTS,
      description:
        '**explicit**: `.swc-Link` modifiers from `link.css`. **prose** / **links**: typography wrapper defaults.',
    },
    standalone: {
      control: 'boolean',
      description:
        'Adds `swc-Link--standalone`. Only for explicit-context demos (pairs with quiet).',
      if: { arg: 'context', eq: 'explicit' },
    },
    quiet: {
      control: 'boolean',
      description:
        'Removes underline until hover. Implies `standalone` (pairs with `swc-Link--standalone`).',
      if: { arg: 'context', eq: 'explicit' },
    },
    lang: { control: 'select', options: LANGS },
    href: { control: 'text' },
    sampleText: { control: 'text' },
  },
  render: (args) => html`
    ${template(args)}
  `,
  tags: ['migrated', 'utility'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const staticColorLabels = {
  staticWhite: 'White link',
  staticBlack: 'Black link',
} as const satisfies Record<(typeof LINK_STATIC_VARIANTS)[number], string>;

/** Panel styles aligned with `static-colors-demo` decorator gradients. */
const staticColorPanelStyles = {
  staticWhite: {
    padding: '24px',
    color: 'white',
    background: 'linear-gradient(45deg, rgb(64 0 22), rgb(14 24 67))',
  },
  staticBlack: {
    padding: '24px',
    color: 'black',
    background: 'linear-gradient(45deg, rgb(255 241 246), rgb(238 245 255))',
  },
} as const satisfies Record<
  (typeof LINK_STATIC_VARIANTS)[number],
  Record<string, string>
>;

function isStaticLinkVariant(
  variant: LinkTemplateProps['variant']
): variant is (typeof LINK_STATIC_VARIANTS)[number] {
  return variant === 'staticWhite' || variant === 'staticBlack';
}

export const Playground: Story = {
  argTypes: {
    lang: { control: false, table: { disable: true } },
  },
  render: (args) => {
    const variant = args.variant ?? 'default';
    const content = template(
      isStaticLinkVariant(variant)
        ? { ...args, context: 'explicit', variant }
        : args
    );

    if (!isStaticLinkVariant(variant)) {
      return content;
    }

    return html`
      <div style=${styleMap(staticColorPanelStyles[variant])}>${content}</div>
    `;
  },
  args: {
    variant: 'default',
    context: 'explicit',
    standalone: false,
    quiet: false,
    href: '#',
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
 * Standalone link with explicit Spectrum typography (not inheriting a prose wrapper).
 */
export const Standalone: Story = {
  args: {
    context: 'explicit',
    standalone: true,
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
    context: 'explicit',
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
    context: 'explicit',
    standalone: true,
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

/**
 * Use `.swc-Link--staticWhite` and `.swc-Link--staticBlack` when displaying over
 * images or colored backgrounds:
 *
 * - **static white**: Use on dark or colored backgrounds for better contrast
 * - **static black**: Use on light backgrounds for better contrast
 */
export const StaticColors: Story = {
  render: (args) => html`
    ${LINK_STATIC_VARIANTS.map(
      (variant) => html`
        <div>
          ${template({
            ...args,
            variant,
            context: 'explicit',
            sampleText: staticColorLabels[variant],
          })}
        </div>
      `
    )}
  `,
  args: {
    href: '#',
  },
  tags: ['options', '!test'],
  parameters: {
    flexLayout: false,
    staticColorsDemo: true,
    'section-order': 2,
  },
};
StaticColors.storyName = 'Static colors';

/**
 * Default and secondary color treatments from `link.css` (static colors are in Static colors).
 */
export const ColorVariants: Story = {
  render: (args) => html`
    ${LINK_COLOR_VARIANTS.map((variant) =>
      template({
        ...args,
        variant,
        context: 'explicit',
        sampleText: variant === 'secondary' ? 'Learn more' : 'Link label',
      })
    )}
  `,
  args: {
    href: '#',
  },
  parameters: {
    flexLayout: 'column-stretch',
  },
  tags: ['options'],
};
