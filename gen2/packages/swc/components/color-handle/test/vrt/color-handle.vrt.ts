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

import '@adobe/spectrum-wc/components/color-handle/swc-color-handle.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Color handle/Color handle VRT',
  component: 'swc-color-handle',
  tags: ['dev'],
};

export default meta;

// Helpers

type HandleCase = {
  color?: string;
  open?: boolean;
  disabled?: boolean;
  focused?: boolean;
  fill?: boolean;
};

// The handle is `position: absolute` and centers itself on its coordinate via
// negative margins, so each instance needs its own `position: relative`
// anchor rather than sitting directly in the row's flex flow. Only a handle
// that actually shows its loupe (`open` and not `disabled`, which suppresses
// it) bottom-anchors to reserve headroom above it; every other case
// (including "disabled + open") centers the handle in a box just tall enough
// for the grown/focused size, so slack splits evenly above and below.
const renderSwatch = ({
  color,
  open,
  disabled,
  focused,
  fill = true,
}: HandleCase = {}) => {
  const showsLoupe = open && !disabled;
  return html`
    <div
      style="position: relative; display: flex; align-items: ${showsLoupe
        ? 'flex-end'
        : 'center'}; justify-content: center; inline-size: 48px; block-size: ${showsLoupe
        ? '96px'
        : '40px'}; padding-block-end: ${showsLoupe ? '12px' : '0'};"
    >
      <swc-color-handle
        color=${ifDefined(color)}
        ?open=${open}
        ?disabled=${disabled}
        ?focused=${focused}
        .fill=${fill}
      ></swc-color-handle>
    </div>
  `;
};

// Adds a visible per-item caption beside the swatch, centered relative to it,
// on top of `renderSwatch`. Used everywhere a state/color needs to be
// identifiable: single-item state rows pass the label here instead of to
// `row()`, so the caption sits directly next to its swatch rather than above
// the whole row.
const renderHandle = (label: string, handleCase: HandleCase = {}) => html`
  <div style="display: flex; align-items: center; gap: var(--swc-spacing-100);">
    ${renderSwatch(handleCase)}
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

// The adaptive border alpha (SWC-2295's white-first contrast strategy) is
// computed from `color`, so the spectrum's extremes and midpoint are covered
// to confirm the dark border stays legible against both bright and dark fills.
const ADAPTIVE_CONTRAST_CASES = [
  { label: 'White', color: 'rgb(255, 255, 255)' },
  { label: 'Yellow', color: 'rgb(255, 235, 0)' },
  { label: 'Mid gray', color: 'rgb(120, 120, 120)' },
  { label: 'Black', color: 'rgb(0, 0, 0)' },
] as const;

// Each state renders in its own row: the swatch itself carries no
// distinguishing visual besides its color, so folding these into one
// multi-item row (as the grouping guidance warns against for small controls
// like color handle) would make a Chromatic diff unreadable.
const STATE_CASES: ReadonlyArray<{ label: string; handleCase: HandleCase }> = [
  { label: 'Default', handleCase: { color: BASE_COLOR } },
  { label: 'Outline only', handleCase: { color: BASE_COLOR, fill: false } },
  { label: 'Focused', handleCase: { color: BASE_COLOR, focused: true } },
  {
    label: 'Focused + outline',
    handleCase: { color: BASE_COLOR, focused: true, fill: false },
  },
  { label: 'Disabled', handleCase: { color: BASE_COLOR, disabled: true } },
  { label: 'Loupe open', handleCase: { color: BASE_COLOR, open: true } },
  {
    label: 'Loupe suppressed (disabled + open)',
    handleCase: { color: BASE_COLOR, disabled: true, open: true },
  },
];

const permutationContent = () => html`
  ${STATE_CASES.map(({ label, handleCase }) =>
    row([renderHandle(label, handleCase)])
  )}
  ${row(
    COLOR_FORMATS.map(({ label, color }) => renderHandle(label, { color })),
    'Color formats'
  )}
  ${row([
    renderHandle('Transparent fill', { color: 'rgba(20, 115, 230, 0.4)' }),
  ])}
  ${row(
    ADAPTIVE_CONTRAST_CASES.map(({ label, color }) =>
      renderHandle(label, { color })
    ),
    'Adaptive contrast'
  )}
`;

// VRT stories

// Color handle is a non-interactive primitive with no `:hover`/`:focus-visible`/
// `:active` CSS rules of its own (focus is a parent-set `[focused]` attribute,
// not a real pseudo-class), so this story has no forced-pseudo-state play
// function — there is nothing to mirror. Covers every state (default,
// outline-only, focused, disabled, loupe open, and the disabled+open
// combination that proves the loupe stays suppressed), every color-format
// input, the transparent-fill checkerboard reveal, and the adaptive
// dark-border contrast across the color spectrum. Rendered once in light/ltr
// and once in dark/rtl, both in a single story so it costs one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

// Forced-colors mode replaces the whole page palette, so it can't be scoped
// to a subtree the way theme()'s light/dark split is and needs its own
// snapshot. The handle opts out of forced colors entirely except when
// disabled, which switches to Canvas/GrayText; default and outline-only
// confirm the opt-out preserves the picked color, disabled confirms the
// forced-colors override.
export const ForcedColors: Story = {
  render: () => html`
    ${row([renderHandle('Default', { color: BASE_COLOR })])}
    ${row([renderHandle('Outline only', { color: BASE_COLOR, fill: false })])}
    ${row([renderHandle('Disabled', { color: BASE_COLOR, disabled: true })])}
  `,
  parameters: forcedColorsVrtParameters,
};
