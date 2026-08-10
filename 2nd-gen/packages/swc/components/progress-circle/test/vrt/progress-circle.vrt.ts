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

import { html, nothing } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  PROGRESS_CIRCLE_STATIC_COLORS,
  PROGRESS_CIRCLE_VALID_SIZES,
  type ProgressCircleSize,
  type ProgressCircleStaticColor,
} from '@adobe/spectrum-wc-core/components/progress-circle';

import '@adobe/spectrum-wc/components/progress-circle/swc-progress-circle.js';

import {
  forcedColorsVrtParameters,
  row,
  staticColorBackground,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Progress circle/Progress circle VRT',
  component: 'swc-progress-circle',
  tags: ['dev'],
};

export default meta;

// Helpers

// `label` is accessibility-only (render() has no visible text), so it's
// required on every case for hygiene. Because there's no visible text,
// states that could plausibly render near-identically (see STATES below)
// each get their own labeled row rather than being combined into one.
type ProgressCircleCase = {
  size?: ProgressCircleSize;
  progress?: number | null;
  staticColor?: ProgressCircleStaticColor;
  label: string;
};

const renderProgressCircle = ({
  size,
  progress,
  staticColor,
  label,
}: ProgressCircleCase) => html`
  <swc-progress-circle
    size=${size ?? nothing}
    progress=${progress ?? nothing}
    static-color=${staticColor ?? nothing}
    label=${label}
  ></swc-progress-circle>
`;

const SIZE_LABELS: Record<ProgressCircleSize, string> = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
};

// Determinate values covering the CSS-visible range edges (0%, the
// dashoffset-98 sliver that keeps 0% perceivable instead of fully hidden),
// midpoints, and 100%.
const DETERMINATE_VALUES = [0, 25, 50, 75, 100] as const;

// Indeterminate first, then ascending determinate values.
const STATES = [null, ...DETERMINATE_VALUES] as const;

const progressLabel = (progress: number | null) =>
  progress === null ? 'Indeterminate' : `${progress}%`;

// Size only scales diameter/stroke-width, and determinate/indeterminate only
// changes fill/animation - no interaction effect between the two axes to
// cross-check (same reasoning meter.vrt.ts gives for keeping its size and
// variant rows independent), so each gets its own single-axis row instead of
// a crossed matrix.
const sizesRow = () =>
  row(
    PROGRESS_CIRCLE_VALID_SIZES.map((size) =>
      renderProgressCircle({ size, progress: 50, label: SIZE_LABELS[size] })
    ),
    'Sizes'
  );

// One row per state instead of one combined row: indeterminate's frozen
// animation frame can coincidentally match a determinate value's rendered
// output (e.g. the animation's t=0 keyframe is `rotate(-90deg)` +
// `stroke-dashoffset: 75px`, identical to the determinate 25% case's
// computed output), and with no visible label to tell them apart, a combined
// row would leave a reviewer unable to identify which item is which.
const statesRows = () =>
  STATES.map((progress) =>
    row(
      [
        renderProgressCircle({
          size: 'm',
          progress,
          label: progressLabel(progress),
        }),
      ],
      progressLabel(progress)
    )
  );

const STATIC_COLOR_LABELS: Record<ProgressCircleStaticColor, string> = {
  white: 'Static white',
  black: 'Static black',
};

// The color-token swap doesn't vary by size, so a single representative size
// is enough to confirm it renders correctly against each contrast background.
// Same one-row-per-state reasoning as statesRows above.
const staticColorSample = (staticColor: ProgressCircleStaticColor) =>
  staticColorBackground(
    STATES.map((progress) =>
      row(
        [
          renderProgressCircle({
            size: 'm',
            progress,
            staticColor,
            label: progressLabel(progress),
          }),
        ],
        `${STATIC_COLOR_LABELS[staticColor]} · ${progressLabel(progress)}`
      )
    ),
    staticColor
  );

const permutationContent = () => html`
  ${sizesRow()} ${statesRows()}
  ${PROGRESS_CIRCLE_STATIC_COLORS.map(staticColorSample)}
`;

// VRT stories

// Sizes and states as independent single-axis rows (see sizesRow/statesRows
// comment), one row per state so indeterminate can't be visually confused
// with a determinate value, static colors on their contrast backgrounds at a
// representative size. Rendered once in light/ltr and once in dark/rtl below
// (that combination covers both axes), all still in a single story so it
// costs one snapshot. No reduced-motion story: nothing in this codebase's
// Chromatic or Storybook tooling can force `prefers-reduced-motion`, and
// Chromatic already freezes the indeterminate CSS animation to a static
// frame regardless.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

// `forced-colors` is a real browser media feature Chromatic can emulate
// directly via `chromatic.forcedColors`, unlike reduced-motion above.
// progress-circle.css nests a `prefers-color-scheme` branch inside its
// `forced-colors: active` block (swapping the track color for dark vs.
// light); Chromatic's `forcedColors` parameter only exposes `'none' |
// 'active'`, with no color-scheme control, so only one of those two nested
// branches is reachable here - whichever `prefers-color-scheme` the capture
// browser reports by default.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
