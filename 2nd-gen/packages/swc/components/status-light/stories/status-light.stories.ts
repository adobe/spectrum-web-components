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
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { StatusLight } from '@adobe/spectrum-wc/status-light';
import {
  STATUS_LIGHT_VALID_SIZES,
  STATUS_LIGHT_VARIANTS_COLOR,
  STATUS_LIGHT_VARIANTS_SEMANTIC,
  StatusLightColorVariant,
  StatusLightSemanticVariant,
  type StatusLightSize,
} from '@adobe/spectrum-wc-core/components/status-light';

import '@adobe/spectrum-wc/components/status-light/swc-status-light.js';

import { getTranslationKey } from '../../../.storybook/helpers/get-translation-key.js';
import translations from '../../../.storybook/intl/translations.json';
type TranslationKey = keyof typeof translations;

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-status-light');

argTypes.variant = {
  ...argTypes.variant,
  control: { type: 'select' },
  options: StatusLight.VARIANTS,
  table: {
    category: 'attributes',
    defaultValue: {
      summary: 'neutral',
    },
  },
};

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: StatusLight.VALID_SIZES,
  table: {
    category: 'attributes',
    defaultValue: {
      summary: 'm',
    },
  },
};

/**
 * Status lights describe the condition of an entity. Much like [badges](../?path=/docs/components-badge--docs), they can be used to convey semantic meaning, such as statuses and categories.
 */
const meta: Meta = {
  title: 'Status light',
  component: 'swc-status-light',
  parameters: {
    docs: {
      subtitle: `Status lights convey semantic meaning through colored dots accompanied by descriptive text.`,
    },
    stackblitz: {
      url: 'https://stackblitz.com/edit/vitejs-vite-rdaytnkj?file=src%2Fmy-element.ts',
    },
    flexLayout: 'row-wrap',
  },
  args,
  argTypes,
  render: (args) => template(args),
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const semanticLabels = {
  info: 'Active',
  neutral: 'Archived',
  positive: 'Approved',
  notice: 'Pending approval',
  negative: 'Rejected',
} as const satisfies Record<StatusLightSemanticVariant, string>;

const nonSemanticLabels = {
  yellow: 'Operations',
  chartreuse: 'Quality',
  celery: 'Documentation',
  seafoam: 'Support',
  cyan: 'Analytics',
  indigo: 'Engineering',
  purple: 'Product',
  fuchsia: 'Marketing',
  magenta: 'Design',
  pink: 'Creative',
  turquoise: 'Training',
  brown: 'Facilities',
  cinnamon: 'Compliance',
  silver: 'Version 1.2.10',
} as const satisfies Record<StatusLightColorVariant, string>;

const sizeLabels = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<StatusLightSize, string>;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['dev'],
  args: {
    'default-slot': semanticLabels.neutral,
  },
};

// ────────────────────
//    OVERVIEW STORIES
// ────────────────────

export const Overview: Story = {
  tags: ['overview'],
  args: {
    'default-slot': semanticLabels.neutral,
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => html`
    ${template({
      ...args,
      variant: 'positive',
      'default-slot': 'Approved',
    })}
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${STATUS_LIGHT_VALID_SIZES.map((size) =>
      template({
        ...args,
        size,
        'default-slot': sizeLabels[size],
      })
    )}
  `,
  tags: ['options'],
};

export const SemanticVariants: Story = {
  render: (args) => html`
    ${STATUS_LIGHT_VARIANTS_SEMANTIC.map(
      (variant: StatusLightSemanticVariant) =>
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
    ${STATUS_LIGHT_VARIANTS_COLOR.map((variant: StatusLightColorVariant) =>
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

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const TextWrapping: Story = {
  render: (args) => html`
    ${template({
      ...args,
      variant: 'positive',
      'default-slot':
        'Document processing in progress - please wait while we validate your submission',
      style: 'max-inline-size: 200px',
    })}
  `,
  tags: ['behaviors'],
};
TextWrapping.storyName = 'Text wrapping';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => html`
    ${template({
      ...args,
      variant: 'positive',
      'default-slot': semanticLabels['positive'],
    })}
    ${template({
      ...args,
      variant: 'negative',
      'default-slot': semanticLabels['negative'],
    })}
    ${template({
      ...args,
      variant: 'notice',
      'default-slot': semanticLabels['notice'],
    })}
    ${template({
      ...args,
      variant: 'info',
      'default-slot': semanticLabels['info'],
    })}
    ${template({
      ...args,
      variant: 'neutral',
      'default-slot': semanticLabels['neutral'],
    })}
    ${template({
      ...args,
      variant: 'celery',
      'default-slot': nonSemanticLabels['celery'],
    })}
    ${template({
      ...args,
      variant: 'yellow',
      'default-slot': nonSemanticLabels['yellow'],
    })}
    ${template({
      ...args,
      variant: 'silver',
      'default-slot': nonSemanticLabels['silver'],
    })}
  `,
  tags: ['a11y'],
};

// ───────────────────────────────────
//    INTERNATIONALIZATION STORIES
// ───────────────────────────────────

/**
 * Wraps content in a div with the optional lang attribute and injects translated
 * textfield.value from translations.json based on context.globals.lang.
 * Used by the Fonts guide and for locale/font demos. This story is "docs-only."
 */
// @todo: a withLocaleWrapper could be pulled up into a global decorator/helper to be implemented by more components. SWC-1872
function withLocaleWrapperRender(
  args: Record<string, unknown> & { lang?: string; 'default-slot'?: string },
  context: { globals: { lang?: string } }
): ReturnType<typeof html> {
  const contextLang = context.globals?.lang;
  const lang = args.lang ?? contextLang;
  const key = getTranslationKey(lang) as TranslationKey;
  const langTranslations = translations[key] ?? translations.en;
  // Always use translated label so Language toolbar drives the visible text
  const labelText = langTranslations['fieldlabel.label'];

  return html`
    <div lang=${ifDefined(lang ?? undefined)}>
      ${template({ ...args, 'default-slot': labelText })}
    </div>
  `;
}

/**
 * Status light with label driven by the Language toolbar and translations.json.
 * Use this story in the Fonts guide to demonstrate font loading and translated copy.
 * Learn more about [loading the expected fonts](/docs/guides-customization-fonts--docs).
 */
// @todo: this story is docs-only, but we should start capturing Chromatic baselines for internationalized content in components. SWC-1871
export const WithLocaleWrapper: Story = {
  render: withLocaleWrapperRender,
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      source: { code: null },
    },
  },
  tags: ['!test'],
};
