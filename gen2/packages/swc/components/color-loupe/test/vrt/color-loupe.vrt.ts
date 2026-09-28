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

import '@adobe/spectrum-wc/components/color-loupe/swc-color-loupe.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Color loupe/Color loupe VRT',
  component: 'swc-color-loupe',
  tags: ['dev'],
};

export default meta;

// Helpers

type LoupeCase = {
  color: string;
  open?: boolean;
};

// The loupe is `position: absolute` and floats above its containing block via
// `inset-block-end`/`inset-inline-end` (offset for where a color handle would
// sit below it), not centered layout flow, so every instance needs its own
// `position: relative` anchor sized to fit the loupe (48x64) plus the fixed
// handle-gap offset it floats above — a box too short would clip the loupe
// regardless of `open`, since the host itself is always sized 48x64 and only
// its opacity/transform toggle with `open`.
const renderSwatch = ({ color, open = true }: LoupeCase) => html`
  <div style="position: relative; inline-size: 48px; block-size: 100px;">
    <swc-color-loupe color=${color} ?open=${open}></swc-color-loupe>
  </div>
`;

const renderLoupe = (label: string, loupeCase: LoupeCase) => html`
  <div style="display: flex; align-items: center; gap: var(--swc-spacing-100);">
    ${renderSwatch(loupeCase)}
    <span class="swc-Detail swc-Detail--sizeM">${label}</span>
  </div>
`;

const BASE_COLOR = 'rgb(20, 115, 230)';

const COLOR_FORMATS = [
  { label: 'Named', color: 'tomato' },
  { label: 'Hex', color: '#1473e6' },
  { label: 'RGBA', color: 'rgba(44, 62, 224, 0.81)' },
  { label: 'HSL', color: 'hsl(111, 82%, 56%)' },
] as const;

// The adaptive inner-border alpha (shared white-first contrast strategy with
// color-handle) is computed from `color`, so the spectrum's extremes and
// midpoint are covered to confirm the dark border stays legible against both
// bright and dark fills.
const ADAPTIVE_CONTRAST_CASES = [
  { label: 'White', color: 'rgb(255, 255, 255)' },
  { label: 'Yellow', color: 'rgb(255, 235, 0)' },
  { label: 'Mid gray', color: 'rgb(120, 120, 120)' },
  { label: 'Black', color: 'rgb(0, 0, 0)' },
] as const;

// Each state renders in its own row: the swatch carries no distinguishing
// visual besides its color/visibility, so folding these into one multi-item
// row (as the grouping guidance warns against for small controls like the
// loupe) would make a Chromatic diff unreadable.
const STATE_CASES: ReadonlyArray<{ label: string; loupeCase: LoupeCase }> = [
  { label: 'Open', loupeCase: { color: BASE_COLOR, open: true } },
  { label: 'Closed', loupeCase: { color: BASE_COLOR, open: false } },
];

const permutationContent = () => html`
  ${STATE_CASES.map(({ label, loupeCase }) =>
    row([renderLoupe(label, loupeCase)])
  )}
  ${row(
    COLOR_FORMATS.map(({ label, color }) => renderLoupe(label, { color })),
    'Color formats'
  )}
  ${row([
    renderLoupe('Transparent fill', { color: 'rgba(20, 115, 230, 0.4)' }),
  ])}
  ${row(
    ADAPTIVE_CONTRAST_CASES.map(({ label, color }) =>
      renderLoupe(label, { color })
    ),
    'Adaptive contrast'
  )}
`;

// VRT stories

// Color loupe is a non-interactive, visual-only primitive with no
// `:hover`/`:focus-visible`/`:active` CSS rules of its own (visibility is
// driven entirely by the parent-set `open` property), so this story has no
// forced-pseudo-state play function — there is nothing to mirror. Covers
// open/closed visibility, every color-format input, the transparent-fill
// checkerboard reveal, and the adaptive dark-border contrast across the color
// spectrum. Rendered once in light/ltr and once in dark/rtl (the CSS applies
// a sub-pixel rounding correction to `inset-inline-end` under `:dir(rtl)`),
// both in a single story so it costs one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

// Forced-colors mode replaces the whole page palette, so it can't be scoped
// to a subtree the way theme()'s light/dark split is and needs its own
// snapshot. The color fill opts out of forced colors to keep showing the
// picked color (including through the checkerboard, which also opts out),
// while the outer border switches to CanvasText.
export const ForcedColors: Story = {
  render: () => html`
    ${row([renderLoupe('Default', { color: BASE_COLOR })])}
    ${row([
      renderLoupe('Transparent fill', { color: 'rgba(20, 115, 230, 0.4)' }),
    ])}
  `,
  parameters: forcedColorsVrtParameters,
};
