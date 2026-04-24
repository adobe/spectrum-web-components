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

import { Badge } from '@adobe/spectrum-wc/badge';

import '@adobe/spectrum-wc/badge';

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
} from '../../../../core/components/badge/Badge.types.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-badge');

// @todo: Carry the args table defaultValue pattern to all argTypes in all components. Explore how to get our custom types to properly reflect with this new pattern.
argTypes.variant = {
  ...argTypes.variant,
  control: { type: 'select' },
  options: Badge.VARIANTS,
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
};

export const meta: Meta = {
  title: 'Badge',
  component: 'swc-badge',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Desktop?node-id=36806-6551',
    },
    stackblitz: {
      url: 'https://stackblitz.com/edit/vitejs-vite-4glrpeeb?file=package.json',
    },
    flexLayout: 'row-wrap',
  },
  tags: ['migrated'],
};

export default {
  ...meta,
  title: 'Badge',
  excludeStories: ['meta'],
} as Meta;

// ────────────────────
//    HELPERS
// ────────────────────

const sizeLabels = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<BadgeSize, string>;

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
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  render: (args) => template(args),
  args: {
    size: 'm',
    variant: 'informative',
    'default-slot': 'Active',
  },
  tags: ['autodocs', 'dev'],
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
    size: 'm',
    variant: 'informative',
    'default-slot': 'Active',
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Label only' })}
    ${template({ ...args, 'icon-slot': '✓', 'aria-label': 'Icon only' })}
    ${template({
      ...args,
      'icon-slot': '✓',
      'default-slot': 'Icon and label',
    })}
  `,
  tags: ['anatomy'],
  args: {
    variant: 'informative',
    size: 'm',
  },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${BADGE_VALID_SIZES.map((size) =>
      template({
        ...args,
        size,
        'default-slot': sizeLabels[size],
      })
    )}
  `,
  parameters: { 'section-order': 1 },
  tags: ['options'],
  args: {
    variant: 'informative',
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
  parameters: { 'section-order': 2 },
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
  parameters: { 'section-order': 3 },
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
  parameters: { 'section-order': 4 },
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
  parameters: { 'section-order': 5 },
  tags: ['options'],
};

export const Fixed: Story = {
  render: (args) => html`
    ${FIXED_VALUES.map((fixed) =>
      template({
        ...args,
        fixed,
        'default-slot': fixedLabels[fixed],
      })
    )}
  `,
  parameters: { 'section-order': 6 },
  tags: ['options'],
  args: {
    variant: 'informative',
    size: 'm',
  },
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const TextWrapping: Story = {
  render: (args) => html`
    ${template({
      ...args,
      variant: 'informative',
      'default-slot': 'Document review pending approval from manager',
      style: 'max-inline-size: 120px',
    })}
  `,
  tags: ['behaviors'],
  args: {
    variant: 'informative',
    size: 'm',
  },
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
  `,
  tags: ['a11y'],
  args: {
    size: 'm',
  },
};
