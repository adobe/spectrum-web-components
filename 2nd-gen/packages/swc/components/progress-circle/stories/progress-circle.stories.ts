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

import { ProgressCircle } from '@adobe/spectrum-wc/progress-circle';
import {
  PROGRESS_CIRCLE_STATIC_COLORS,
  PROGRESS_CIRCLE_VALID_SIZES,
  type ProgressCircleSize,
} from '@spectrum-web-components/core/components/progress-circle';

import '@adobe/spectrum-wc/progress-circle';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-progress-circle');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: ProgressCircle.VALID_SIZES,
  table: {
    category: 'attributes',
    defaultValue: {
      summary: 'm',
    },
  },
};

argTypes['static-color'] = {
  ...argTypes['static-color'],
  control: { type: 'select' },
  options: [undefined, ...ProgressCircle.STATIC_COLORS],
};

/**
 * They can represent determinate or indeterminate progress.
 */
const meta: Meta = {
  title: 'Progress circle',
  component: 'swc-progress-circle',
  parameters: {
    docs: {
      subtitle: `Progress circles show the progression of a system operation such as downloading, uploading, processing, etc. in a visual way.`,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=13061-181&p=f&t=l8WhfseyuepkVXrl-0',
    },
    stackblitz: {
      url: 'https://stackblitz.com/edit/vitejs-vite-xx1plot6?file=package.json',
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

const sizeLabels = {
  s: 'Processing small item',
  m: 'Processing medium item',
  l: 'Processing large item',
} as const satisfies Record<ProgressCircleSize, string>;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
  args: {
    size: 'm',
    label: 'Processing request',
  },
};

// ──────────────────────────
//    OVERVIEW STORIES
// ──────────────────────────

export const Overview: Story = {
  tags: ['overview'],
  args: {
    label: 'Processing request',
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * A progress circle consists of:
 *
 * 1. **Track** - Background ring showing the full progress range
 * 2. **Fill** - Colored ring segment showing current progress
 * 3. **Label** - Accessible text describing the operation (not visually rendered).
 *
 * > **A11y Note:** Light DOM children are not projected into the shadow tree, so content between the opening and closing tags does not supply an accessible name. Use the `label` attribute or property, or `aria-label` / `aria-labelledby` on the host.
 */
export const Anatomy: Story = {
  render: () => html`
    <swc-progress-circle
      progress="0"
      label="Starting upload"
    ></swc-progress-circle>
    <swc-progress-circle
      progress="50"
      label="Uploading document"
    ></swc-progress-circle>
    <swc-progress-circle
      progress="100"
      label="Upload complete"
    ></swc-progress-circle>
  `,
  tags: ['anatomy'],
  args: {
    size: 'l',
  },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Progress circles come in three sizes to fit various contexts:
 *
 * - **Small (`s`)**: Used for inline indicators or space-constrained areas, such as in tables or alongside small text
 * - **Medium (`m`)**: Default size, used for typical loading states in cards, forms, or content areas
 * - **Large (`l`)**: Used for prominent loading states, primary content areas, or full-page loading indicators
 */
export const Sizes: Story = {
  render: (args) => html`
    ${PROGRESS_CIRCLE_VALID_SIZES.map(
      (size) => html`
        ${template({
          ...args,
          size,
          label: sizeLabels[size],
        })}
      `
    )}
  `,
  tags: ['options'],
};

/**
 * Use the `static-color` attribute when displaying over images or colored backgrounds:
 *
 * - **white**: Use on dark or colored backgrounds for better contrast
 * - **black**: Use on light backgrounds for better contrast
 */
// @todo: capture the Chromatic VRTs for all sizes of progress circles for both static color options and WHCM. SWC-1848
export const StaticColors: Story = {
  render: (args) => html`
    ${PROGRESS_CIRCLE_STATIC_COLORS.map(
      (color) => html`
        ${template({ ...args, 'static-color': color })}
      `
    )}
  `,
  args: {
    label: 'Processing media',
  },
  tags: ['options'],
  parameters: {
    staticColorsDemo: true,
    'section-order': 2,
  },
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

/**
 * Progress circles can show specific progress values from 0% to 100%.
 * Set the `progress` attribute to a value between 0 and 100 to represent determinate progress.
 * This automatically sets `aria-valuenow` to the provided value for screen readers.
 */
export const ProgressValues: Story = {
  render: (args) => html`
    ${template({ ...args, progress: 0, label: 'Starting download' })}
    ${template({ ...args, progress: 25, label: 'Downloading (25%)' })}
    ${template({ ...args, progress: 50, label: 'Downloading (50%)' })}
    ${template({ ...args, progress: 75, label: 'Downloading (75%)' })}
    ${template({ ...args, progress: 100, label: 'Download complete' })}
  `,
  tags: ['states'],
  args: {
    size: 'm',
  },
  parameters: {
    'section-order': 2,
  },
};
ProgressValues.storyName = 'Progress values';

/**
 * The default state — when `progress` is not set, the component displays an animated
 * loading indicator. The `aria-valuenow` attribute is omitted, signaling to assistive
 * technologies that the operation duration is unknown.
 *
 * Use the default (no `progress`) when:
 * - The operation duration is unknown
 * - Progress cannot be accurately measured
 * - Multiple sub-operations are running in parallel
 */
export const Indeterminate: Story = {
  tags: ['states'],
  args: {
    label: 'Processing request',
  },
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-progress-circle>` element implements several accessibility features:
 *
 * #### ARIA implementation
 *
 * 1. **ARIA role**: Automatically sets `role="progressbar"` for proper semantic meaning
 * 2. **Labeling**: Uses the `label` attribute value as `aria-label`, or rely on `aria-label` / `aria-labelledby` you set on the host
 * 3. **Progress state** (determinate):
 *     - Sets `aria-valuenow` with the current `progress` value
 * 4. **Loading state** (indeterminate — default when `progress` is unset):
 *     - When no `progress` value is set, `aria-valuenow` is omitted
 *     - Screen readers understand this as an ongoing operation with unknown duration
 * 5. **Status communication**: Screen readers announce progress updates as values change
 *
 * #### Visual accessibility
 *
 * - Progress is shown visually through the fill amount, not relying solely on color
 * - High contrast mode is supported with appropriate color overrides
 * - Static color variants ensure sufficient contrast on different backgrounds
 * - At `progress="0"`, a small amount of fill is still rendered intentionally. A fully empty circle
 *   would fail WCAG 1.4.11 (non-text contrast) because the track alone may not meet the required
 *   3:1 contrast ratio against the background. The `aria-valuenow` attribute still reflects 0
 *
 * #### Non-interactive element
 *
 * - Progress circles have no interactive behavior and are not focusable
 * - Screen readers will announce the progress circle content as static text
 * - No keyboard interaction is required or expected
 *
 * > Important: In focus mode, only interactive elements and their associated labels/descriptions are announced. If content is not a label or description for a focusable element, it will not be read. For non-interactive content, screen reader users must [switch to Browse mode](https://swcpreviews.z13.web.core.windows.net/pr-6122/docs/second-gen-storybook/?path=/docs/guides-accessibility-guides-screen-reader-testing--readme#screen-reader-modes). This is expected behavior, not a bug — ensure you test both modes when evaluating component accessibility.
 * ### Best practices
 *
 * - Always provide a descriptive `label` that explains what the progress represents
 * - Use specific, meaningful labels (e.g., "Uploading profile photo" instead of "Loading")
 * - Use determinate progress (`progress="50"`) when possible to give users a clear sense of completion
 * - For determinate progress, ensure the `progress` value accurately reflects the actual progress
 * - Use indeterminate progress only when duration is truly unknown or when the wait is less than 3 seconds.
 * - Consider using `size="l"` for primary loading states to improve visibility
 * - Ensure sufficient color contrast between the progress circle and its background
 * - Use `static-color="white"` on dark backgrounds or `static-color="black"` on light backgrounds
 * - Test with screen readers to verify progress announcements are clear and timely
 * - Avoid updating progress values more frequently than every 1-2 seconds to prevent announcement overload
 * - Do not force live region announcements for progress durations that are 3 seconds or less.  Instead, consider status messages when progress is complete or there is an error
 */
export const Accessibility: Story = {
  tags: ['a11y'],
  args: {
    size: 'l',
    label: 'Syncing files',
  },
};
