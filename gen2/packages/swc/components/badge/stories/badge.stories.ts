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

import { html, nothing, TemplateResult } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { Badge } from '@adobe/spectrum-wc/badge';
import {
  BADGE_VALID_SIZES,
  BADGE_VARIANTS,
  BADGE_VARIANTS_COLOR,
  BADGE_VARIANTS_SEMANTIC,
  type BadgeColorVariant,
  type BadgeSemanticVariant,
  type BadgeSize,
  FIXED_VALUES,
  type FixedValues,
} from '@adobe/spectrum-wc-core/components/badge/index.js';

import '@adobe/spectrum-wc/components/badge/swc-badge.js';
import '@adobe/spectrum-wc-icons/swc-icon-alert-triangle.js';
import '@adobe/spectrum-wc-icons/swc-icon-checkmark.js';
import '@adobe/spectrum-wc-icons/swc-icon-close.js';

import { SIZE_LABELS } from '../../../.storybook/helpers/index.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-badge');

// @todo: Carry the args table defaultValue pattern to all argTypes in all components. Explore how to get our custom types to properly reflect with this new pattern.
argTypes.variant = {
  ...argTypes.variant,
  control: { type: 'select' },
  options: Badge.VARIANTS,
  table: {
    category: 'attributes',
    defaultValue: {
      summary: 'neutral',
    },
  },
};

argTypes.fixed = {
  ...argTypes.fixed,
  control: { type: 'select' },
  options: ['', ...Badge.FIXED_VALUES],
};

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: Badge.VALID_SIZES,
  table: {
    ...argTypes.size?.table,
    category: 'attributes',
    defaultValue: { summary: 's' },
  },
};

argTypes['icon-slot'] = {
  ...argTypes['icon-slot'],
  control: { type: 'select' },
  options: [undefined, 'Checkmark', 'Cross', 'Alert'],
  description:
    'Select a named workflow icon to display in the icon slot. Each name maps to a ' +
    'per-icon custom element from the `@adobe/spectrum-wc-icons` package.',
};

argTypes.outline = {
  ...argTypes.outline,
  table: {
    ...argTypes.outline?.table,
    defaultValue: { summary: 'false' },
  },
};

argTypes.subtle = {
  ...argTypes.subtle,
  table: {
    ...argTypes.subtle?.table,
    defaultValue: { summary: 'false' },
  },
};

/**
 * Similar to [status lights](/docs/components-status-light--docs), they use color and text to convey status or category information.
 *
 * Badges come in three styles: bold fill (default), subtle fill, and outline.
 * Choose one style consistently within a product. The `outline` and `subtle`
 * attributes draw similar attention levels.
 * Reserve bold fill for high-attention badging only.
 */
const meta: Meta = {
  title: 'Badge',
  component: 'swc-badge',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: `Display small amounts of color-categorized metadata to get a user's attention.`,
    },
    stackblitz: {
      url: 'https://stackblitz.com/edit/vitejs-vite-aqp4tpvf?file=src%2Fmy-element.ts',
    },
    flexLayout: 'row-wrap',
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

// Demo workflow icons for the badge icon slot, keyed by the `icon-slot` control.
// Badge content icons are workflow icons, consumed as per-icon custom elements
// from `@adobe/spectrum-wc-icons`; each manages its own decorative semantics.
const badgeSlotIcon = (
  key: string,
  size: BadgeSize
): TemplateResult | typeof nothing => {
  switch (key) {
    case 'Checkmark':
      return html`
        <swc-icon-checkmark size=${size} slot="icon"></swc-icon-checkmark>
      `;
    case 'Cross':
      return html`
        <swc-icon-close size=${size} slot="icon"></swc-icon-close>
      `;
    case 'Alert':
      return html`
        <swc-icon-alert-triangle
          size=${size}
          slot="icon"
        ></swc-icon-alert-triangle>
      `;
    default:
      return nothing;
  }
};

const semanticLabels = {
  accent: 'New',
  informative: 'Active',
  neutral: 'Archived',
  positive: 'Approved',
  notice: 'Pending approval',
  negative: 'Rejected',
} as const satisfies Record<BadgeSemanticVariant, string>;

const nonSemanticLabels = {
  fuchsia: 'Marketing',
  indigo: 'Engineering',
  magenta: 'Design',
  purple: 'Product',
  seafoam: 'Support',
  yellow: 'Busy',
  gray: 'Available',
  red: 'Sales',
  orange: 'Research',
  chartreuse: 'Quality',
  celery: 'Documentation',
  green: 'Legal',
  cyan: 'Analytics',
  blue: 'Security',
  pink: 'Creative',
  turquoise: 'Training',
  brown: 'Facilities',
  cinnamon: 'Compliance',
  silver: 'Version 1.2.10',
} as const satisfies Record<BadgeColorVariant, string>;

const allVariantsLabels = { ...semanticLabels, ...nonSemanticLabels };

const fixedLabels = {
  'block-start': 'Block start',
  'block-end': 'Block end',
  'inline-start': 'Inline start',
  'inline-end': 'Inline end',
} as const satisfies Record<FixedValues, string>;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  render: (args) => {
    const iconKey = (args['icon-slot'] as string) || '';
    const size = (
      BADGE_VALID_SIZES.includes(args.size as BadgeSize) ? args.size : 'm'
    ) as BadgeSize;

    return html`
      <swc-badge
        variant=${args.variant ?? 'neutral'}
        size=${size}
        ?subtle=${args.subtle}
        ?outline=${args.outline}
        fixed=${args.fixed ?? nothing}
      >
        ${badgeSlotIcon(iconKey, size)} ${args['default-slot'] ?? ''}
      </swc-badge>
    `;
  },
  args: {
    'default-slot': 'Active',
    'icon-slot': undefined,
  },
  tags: ['dev'],
};

// ──────────────────────────────
//    OVERVIEW STORIES
// ──────────────────────────────

export const Overview: Story = {
  render: (args) => html`
    ${template(args)}
  `,
  tags: ['overview'],
  args: {
    'default-slot': 'Active',
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => {
    const size = args.size as BadgeSize;
    return html`
      ${template({ ...args, 'default-slot': 'Label only' })}
      <swc-badge
        variant=${args.variant}
        size=${size}
        role="img"
        aria-label="Checkmark"
      >
        <swc-icon-checkmark size=${size} slot="icon"></swc-icon-checkmark>
      </swc-badge>
      <swc-badge variant=${args.variant} size=${size}>
        <swc-icon-checkmark size=${size} slot="icon"></swc-icon-checkmark>
        Icon and label
      </swc-badge>
    `;
  },
  tags: ['anatomy'],
  args: {
    variant: 'neutral',
  },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    <div
      style="display: flex; flex-wrap: wrap; gap: var(--swc-spacing-200); align-items: center;"
    >
      ${BADGE_VALID_SIZES.map(
        (size) => html`
          <swc-badge variant=${args.variant} size=${size}>
            <swc-icon-checkmark size=${size} slot="icon"></swc-icon-checkmark>
            ${SIZE_LABELS[size]}
          </swc-badge>
        `
      )}
    </div>
    <div
      style="display: flex; flex-wrap: wrap; gap: var(--swc-spacing-200); align-items: center; margin-block-start: var(--swc-spacing-300);"
    >
      ${BADGE_VALID_SIZES.map(
        (size) => html`
          <swc-badge variant=${args.variant} size=${size}>
            ${SIZE_LABELS[size]}
          </swc-badge>
        `
      )}
    </div>
    <div
      style="display: flex; flex-wrap: wrap; gap: var(--swc-spacing-200); align-items: center; margin-block-start: var(--swc-spacing-300);"
    >
      ${BADGE_VALID_SIZES.map(
        (size) => html`
          <swc-badge
            variant=${args.variant}
            size=${size}
            role="img"
            aria-label=${SIZE_LABELS[size]}
          >
            <swc-icon-checkmark size=${size} slot="icon"></swc-icon-checkmark>
          </swc-badge>
        `
      )}
    </div>
  `,
  parameters: { flexLayout: 'column-stretch' },
  tags: ['options'],
  args: {
    variant: 'neutral',
  },
};

export const SemanticVariants: Story = {
  render: (args) => html`
    ${BADGE_VARIANTS_SEMANTIC.map((variant) =>
      template({
        ...args,
        variant,
        'default-slot': semanticLabels[variant],
      })
    )}
  `,
  tags: ['options'],
};
SemanticVariants.storyName = 'Semantic variants';

export const NonSemanticVariants: Story = {
  render: (args) => html`
    ${BADGE_VARIANTS_COLOR.map((variant) =>
      template({
        ...args,
        variant,
        'default-slot': nonSemanticLabels[variant],
      })
    )}
  `,
  tags: ['options'],
};
NonSemanticVariants.storyName = 'Non-semantic variants';

export const Outline: Story = {
  render: (args) => html`
    ${BADGE_VARIANTS_SEMANTIC.map((variant) =>
      template({
        ...args,
        variant,
        outline: true,
        'default-slot': semanticLabels[variant],
      })
    )}
  `,
  tags: ['options'],
};

export const Subtle: Story = {
  render: (args) => html`
    ${BADGE_VARIANTS.map((variant) =>
      template({
        ...args,
        variant,
        subtle: true,
        'default-slot': allVariantsLabels[variant],
      })
    )}
  `,
  tags: ['options'],
};

export const Fixed: Story = {
  render: (args) => html`
    ${FIXED_VALUES.map((fixed) =>
      template({
        ...args,
        fixed,
        variant: 'neutral',
        'default-slot': fixedLabels[fixed],
      })
    )}
  `,
  tags: ['options'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const TextWrapping: Story = {
  render: (args) => html`
    ${template({
      ...args,
      variant: 'notice',
      'default-slot': 'Document review pending approval from manager',
      style: 'max-inline-size: 120px',
    })}
  `,
  tags: ['behaviors'],
};
TextWrapping.storyName = 'Text wrapping';

export const Inline: Story = {
  render: (args) => html`
    <p>
      Design system components
      ${template({
        ...args,
        variant: 'accent',
        'default-slot': 'Beta',
        size: 's',
      })}
    </p>
    <p>
      API documentation
      ${template({
        ...args,
        variant: 'positive',
        'default-slot': 'Stable',
        size: 's',
      })}
    </p>
    <p>
      Legacy components
      ${template({
        ...args,
        variant: 'notice',
        'default-slot': 'Deprecated',
        size: 's',
      })}
    </p>
  `,
  parameters: {
    flexLayout: 'column-stretch',
  },
  tags: ['behaviors'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => html`
    ${template({
      ...args,
      variant: 'positive',
      'default-slot': 'Approved',
    })}
    ${template({
      ...args,
      variant: 'negative',
      'default-slot': 'Rejected',
    })}
    ${template({
      ...args,
      variant: 'notice',
      'default-slot': 'Pending approval',
    })}
    ${template({
      ...args,
      variant: 'informative',
      'default-slot': 'Active',
    })}
    ${template({
      ...args,
      variant: 'neutral',
      'default-slot': 'Archived',
    })}
    ${template({
      ...args,
      variant: 'celery',
      'default-slot': 'Documentation',
    })}
    ${template({
      ...args,
      variant: 'yellow',
      'default-slot': 'Busy',
    })}
    ${template({
      ...args,
      variant: 'silver',
      'default-slot': 'Version 1.2.10',
    })}

    <!-- Icon + text: icon is decorative, aria-hidden="true" hides it from assistive technology -->
    <swc-badge variant="positive" size=${args.size}>
      <swc-icon-checkmark size=${args.size} slot="icon"></swc-icon-checkmark>
      Approved
    </swc-badge>

    <!-- Icon-only: role and aria-label provides the accessible name and purpose when no visible text is present -->
    <swc-badge
      variant="positive"
      size=${args.size}
      role="img"
      aria-label="Approved"
    >
      <swc-icon-checkmark size=${args.size} slot="icon"></swc-icon-checkmark>
    </swc-badge>
  `,
  tags: ['a11y'],
};
