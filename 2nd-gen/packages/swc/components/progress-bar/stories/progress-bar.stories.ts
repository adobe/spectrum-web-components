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
  LINEAR_PROGRESS_LABEL_POSITIONS,
  LINEAR_PROGRESS_STATIC_COLORS,
  LINEAR_PROGRESS_VALID_SIZES,
  type LinearProgressLabelPosition,
  type LinearProgressSize,
  type LinearProgressStaticColor,
} from '@spectrum-web-components/core/mixins/index.js';

import '@adobe/spectrum-wc/components/progress-bar/swc-progress-bar.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-progress-bar');

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
 * A `<swc-progress-bar>` shows the progression of a system operation such as
 * downloading, uploading, or processing. Use a determinate bar when progress
 * can be calculated against a known total; set `indeterminate` when the
 * completion time cannot be determined.
 *
 * For circular progress indicators, see
 * [Progress Circle](../?path=/docs/components-progress-circle--docs) and for read-only
 * values use [Meter](../?path=/docs/components-meter--docs).
 */
const meta: Meta = {
  title: 'Progress Bar',
  component: 'swc-progress-bar',
  parameters: {
    docs: {
      subtitle: `Shows the progress of a task or an indeterminate loading state.`,
    },
    styles: { 'min-inline-size': '250px' },
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
    size: 'm',
    value: 60,
    'label-slot': 'Uploading file',
  },
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  tags: ['overview'],
  args: {
    size: 'm',
    value: 75,
    'label-slot': 'Uploading file',
    'description-slot': 'Step 3 of 4 complete',
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
      'value-label': '3 of 4 steps',
    })}
  `,
  tags: ['anatomy'],
  parameters: {
    styles: {
      display: 'flex',
      'flex-direction': 'column',
      gap: 'var(--swc-spacing-200)',
      margin: '0 auto',
    },
  },
  args: {
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
  parameters: {
    styles: {
      display: 'flex',
      'flex-direction': 'column',
      gap: 'var(--swc-spacing-200)',
      margin: '0 auto',
    },
  },
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
    styles: {
      display: 'flex',
      'flex-direction': 'column',
      gap: '20px',
      margin: '0 auto',
    },
  },
  tags: ['options'],
  args: { value: 50 },
};

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

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

// The value stories exercise the CSS-visible range edges (0 %, midpoint, 100 %)
// so the fill / track contrast can be verified at the boundaries (WCAG 1.4.11).
export const Values: Story = {
  render: (args) => html`
    ${template({ ...args, value: 0, 'label-slot': '0 %' })}
    ${template({ ...args, value: 25, 'label-slot': '25 %' })}
    ${template({ ...args, value: 50, 'label-slot': '50 %' })}
    ${template({ ...args, value: 75, 'label-slot': '75 %' })}
    ${template({ ...args, value: 100, 'label-slot': '100 %' })}
  `,
  tags: ['states'],
  parameters: {
    styles: {
      display: 'flex',
      'flex-direction': 'column',
      gap: 'var(--swc-spacing-200)',
      margin: '0 auto',
    },
  },
  args: { size: 'm' },
};

// Indeterminate suppresses all aria-value* attributes and the visible
// value text, and runs the sliding fill animation.
export const Indeterminate: Story = {
  tags: ['states'],
  args: {
    indeterminate: true,
    'accessible-label': 'Loading content',
  },
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
      'label-slot': 'Steps completed',
      'value-label': '3 of 10',
    })}
  `,
  tags: ['behaviors'],
  args: { size: 'm' },
};
CustomRange.storyName = 'Custom range';

// `value-label` overrides the auto-formatted percentage in both the
// rendered value cell and aria-valuetext.
export const ValueLabel: Story = {
  render: (args) => html`
    ${template({
      ...args,
      value: 2,
      'max-value': 5,
      'label-slot': 'Files uploaded',
      'value-label': '2 of 5',
    })}
  `,
  tags: ['behaviors'],
  args: { size: 'm' },
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
      'label-slot': 'Amount processed',
      formatOptions: { style: 'decimal', maximumFractionDigits: 0 },
    })}
  `,
  tags: ['behaviors'],
  args: { size: 'm' },
};
FormatOptions.storyName = 'Format options';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

// TODO (Phase 7): add accessibility prose to progress-bar.mdx § Accessibility
export const Accessibility: Story = {
  tags: ['a11y'],
  args: {
    size: 'm',
    value: 2,
    'max-value': 5,
    'label-slot': 'Files uploaded',
    'description-slot': 'Upload will complete shortly',
  },
};
