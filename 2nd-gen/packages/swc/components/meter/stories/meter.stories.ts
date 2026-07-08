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

import { Meter } from '@adobe/spectrum-wc/meter';
import {
  METER_VARIANTS,
  type MeterVariant,
} from '@spectrum-web-components/core/components/meter';
import {
  LINEAR_PROGRESS_LABEL_POSITIONS,
  LINEAR_PROGRESS_STATIC_COLORS,
  LINEAR_PROGRESS_VALID_SIZES,
  type LinearProgressLabelPosition,
  type LinearProgressSize,
  type LinearProgressStaticColor,
} from '@spectrum-web-components/core/mixins/index.js';

import '@adobe/spectrum-wc/components/meter/swc-meter.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-meter');

argTypes.variant = {
  ...argTypes.variant,
  control: { type: 'select' },
  options: Meter.VARIANTS,
  table: {
    category: 'attributes',
    defaultValue: { summary: 'informative' },
  },
};

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: LINEAR_PROGRESS_VALID_SIZES,
  table: {
    ...argTypes.size?.table,
    category: 'attributes',
    defaultValue: { summary: 'm' },
  },
};

argTypes['label-position'] = {
  ...argTypes['label-position'],
  control: { type: 'inline-radio' },
  options: LINEAR_PROGRESS_LABEL_POSITIONS,
  table: {
    ...argTypes['label-position']?.table,
    defaultValue: { summary: 'top' },
  },
};

argTypes['static-color'] = {
  ...argTypes['static-color'],
  control: { type: 'select' },
  options: [undefined, ...LINEAR_PROGRESS_STATIC_COLORS],
};

argTypes.value = {
  ...argTypes.value,
  control: { type: 'number', min: 0, max: 100, step: 1 },
  table: {
    ...argTypes.value?.table,
    defaultValue: { summary: '0' },
  },
};

/**
 * A `<swc-meter>` is a non-focusable, read-only bar that shows a value inside a
 * fixed range, such as storage used or tasks completed. Its value is driven by
 * user actions rather than system progress. The accessible `meter` role and its
 * `aria-value*` attributes live on the internal bar wrapper; the host carries no
 * ARIA role.
 *
 * To show the progression of a system operation such as downloading or processing,
 * see [Progress Bar](../?path=/docs/components-progress-bar--docs).
 */
const meta: Meta = {
  title: 'Meter',
  component: 'swc-meter',
  parameters: {
    docs: {
      subtitle: `Non-focusable, read-only bar that shows a value inside a fixed range.`,
    },
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

const sizeLabels = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<LinearProgressSize, string>;

const variantLabels = {
  informative: 'Informative',
  positive: 'Positive',
  notice: 'Notice',
  negative: 'Negative',
} as const satisfies Record<MeterVariant, string>;

const labelPositionLabels = {
  top: 'Top label',
  side: 'Side label',
} as const satisfies Record<LinearProgressLabelPosition, string>;

const staticColorLabels = {
  white: 'Static white',
  black: 'Static black',
} as const satisfies Record<LinearProgressStaticColor, string>;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['dev'],
  args: {
    variant: 'informative',
    size: 'm',
    value: 60,
    'label-slot': 'Storage used',
  },
};

// ──────────────────────────────
//    OVERVIEW STORIES
// ──────────────────────────────

export const Overview: Story = {
  tags: ['overview'],
  args: {
    variant: 'informative',
    size: 'm',
    value: 80,
    'label-slot': 'Profile completeness',
    'description-slot': 'Add a photo to reach 100%',
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => html`
    ${template({ ...args, 'label-slot': 'Label only' })}
    ${template({
      ...args,
      'label-slot': 'Label and description',
      'description-slot': 'Additional context below the bar',
    })}
    ${template({
      ...args,
      'accessible-label': 'Screen-reader-only label',
    })}
    ${template({
      ...args,
      'label-slot': 'Custom value text',
      'value-label': '1 of 4',
    })}
  `,
  tags: ['anatomy'],
  args: {
    variant: 'informative',
    size: 'm',
    value: 40,
  },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${LINEAR_PROGRESS_VALID_SIZES.map((size) =>
      template({
        ...args,
        size,
        'label-slot': sizeLabels[size],
      })
    )}
  `,
  tags: ['options'],
  args: { value: 50 },
};

export const Variants: Story = {
  render: (args) => html`
    ${METER_VARIANTS.map((variant) =>
      template({
        ...args,
        variant,
        'label-slot': variantLabels[variant],
      })
    )}
  `,
  tags: ['options'],
  args: { value: 50 },
};

export const LabelPosition: Story = {
  render: (args) => html`
    ${LINEAR_PROGRESS_LABEL_POSITIONS.map((labelPosition) =>
      template({
        ...args,
        'label-position': labelPosition,
        'label-slot': labelPositionLabels[labelPosition],
      })
    )}
  `,
  parameters: {
    flexLayout: 'column-stretch',
    styles: {
      gap: 'var(--swc-spacing-300)',
    },
  },
  tags: ['options'],
  args: { value: 50 },
};
LabelPosition.storyName = 'Label position';

export const StaticColors: Story = {
  render: (args) => html`
    ${LINEAR_PROGRESS_STATIC_COLORS.map((staticColor) =>
      template({
        ...args,
        'static-color': staticColor,
        'label-slot': staticColorLabels[staticColor],
      })
    )}
  `,
  parameters: { staticColorsDemo: true },
  tags: ['options', '!test'],
  args: { value: 50 },
};
StaticColors.storyName = 'Static colors';

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

// Meter is read-only and has no interactive states. The values below
// exercise the CSS-visible range edges (0 %, midpoint, 100 %) so the
// fill / track contrast can be verified at the boundaries.
export const Values: Story = {
  render: (args) => html`
    ${template({ ...args, value: 0, 'label-slot': '0 %' })}
    ${template({ ...args, value: 25, 'label-slot': '25 %' })}
    ${template({ ...args, value: 50, 'label-slot': '50 %' })}
    ${template({ ...args, value: 75, 'label-slot': '75 %' })}
    ${template({ ...args, value: 100, 'label-slot': '100 %' })}
  `,
  tags: ['states'],
  args: { variant: 'informative', size: 'm' },
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

// Custom min / max range. Arbitrary numeric ranges are supported; the
// rendered fill and aria-valuetext use the sanitized range.
export const CustomRange: Story = {
  render: (args) => html`
    ${template({
      ...args,
      'min-value': 0,
      'max-value': 10,
      value: 3,
      'label-slot': 'Inputs filled',
      'value-label': '3 of 10',
    })}
  `,
  tags: ['behaviors'],
  args: { variant: 'informative', size: 'm' },
};
CustomRange.storyName = 'Custom range';

// `value-label` overrides the auto-formatted percentage in both the
// rendered value cell and aria-valuetext.
export const ValueLabel: Story = {
  render: (args) => html`
    ${template({
      ...args,
      value: 2.4,
      'max-value': 5,
      'label-slot': 'Storage used',
      'value-label': '2.4 GB / 5 GB',
    })}
  `,
  tags: ['behaviors'],
  args: { variant: 'informative', size: 'm' },
};
ValueLabel.storyName = 'Value label';

// `formatOptions` is a JS-only property (no attribute). It accepts any
// `Intl.NumberFormatOptions`; the default style is percent.
export const FormatOptions: Story = {
  render: (args) => html`
    ${template({
      ...args,
      value: 42,
      'max-value': 100,
      'label-slot': 'Amount due',
      formatOptions: { style: 'currency', currency: 'USD' },
    })}
  `,
  tags: ['behaviors'],
  args: { variant: 'informative', size: 'm' },
};
FormatOptions.storyName = 'Format options';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  tags: ['a11y'],
  args: {
    variant: 'informative',
    size: 'm',
    value: 2,
    'max-value': 5,
    'label-slot': 'Storage used',
    'description-slot': 'Backed up 2 hours ago',
  },
};
