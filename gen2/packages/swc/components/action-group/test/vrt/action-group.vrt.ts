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
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  ACTION_GROUP_VALID_SIZES,
  type ActionGroupOrientation,
  type ActionGroupSize,
} from '@adobe/spectrum-wc-core/components/action-group';

import '@adobe/spectrum-wc/components/action-group/swc-action-group.js';
import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';

import {
  createPermutations,
  forcedColorsVrtParameters,
  groupPermutationsBy,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Action Group/Action Group VRT',
  component: 'swc-action-group',
  tags: ['dev'],
};

export default meta;

// Helpers

const LABELS = ['Cut', 'Copy', 'Paste'] as const;

type GroupCase = {
  size?: ActionGroupSize;
  orientation?: ActionGroupOrientation;
  compact?: boolean;
  quiet?: boolean;
  justified?: boolean;
  disabled?: boolean;
  accessibleLabel?: string;
  labels?: readonly string[];
  focusTargetIndex?: number;
  style?: string;
};

const renderGroup = ({
  size,
  orientation = 'horizontal',
  compact = false,
  quiet = false,
  justified = false,
  disabled = false,
  accessibleLabel = 'Edit actions',
  labels = LABELS,
  focusTargetIndex,
  style,
}: GroupCase) => html`
  <swc-action-group
    accessible-label=${accessibleLabel}
    size=${ifDefined(size)}
    orientation=${orientation}
    ?compact=${compact}
    ?quiet=${quiet}
    ?justified=${justified}
    ?disabled=${disabled}
    style=${ifDefined(style)}
  >
    ${labels.map(
      (label, index) => html`
        <swc-action-button
          data-vrt-focus-target=${index === focusTargetIndex ? '' : nothing}
        >
          ${label}
        </swc-action-button>
      `
    )}
  </swc-action-group>
`;

// Row-per-treatment, each swept across every size — matches Action Button
// VRT's Default/Quiet grouping shape. Every set below declares the same keys
// so the permutation objects share one uniform shape.
type Treatment =
  | 'default'
  | 'default-vertical'
  | 'compact-horizontal'
  | 'compact-vertical'
  | 'quiet'
  | 'quiet-compact';

const TREATMENT_LABELS: Record<Treatment, string> = {
  default: 'Default',
  'default-vertical': 'Default (vertical)',
  'compact-horizontal': 'Compact (horizontal)',
  'compact-vertical': 'Compact (vertical)',
  quiet: 'Quiet',
  'quiet-compact': 'Quiet + compact (compact join inactive)',
};

const GROUP_PERMUTATIONS = createPermutations([
  {
    treatment: ['default'],
    size: ACTION_GROUP_VALID_SIZES,
    compact: [false],
    quiet: [false],
    orientation: ['horizontal'],
  },
  {
    treatment: ['default-vertical'],
    size: ACTION_GROUP_VALID_SIZES,
    compact: [false],
    quiet: [false],
    orientation: ['vertical'],
  },
  {
    treatment: ['compact-horizontal'],
    size: ACTION_GROUP_VALID_SIZES,
    compact: [true],
    quiet: [false],
    orientation: ['horizontal'],
  },
  {
    treatment: ['compact-vertical'],
    size: ACTION_GROUP_VALID_SIZES,
    compact: [true],
    quiet: [false],
    orientation: ['vertical'],
  },
  {
    treatment: ['quiet'],
    size: ACTION_GROUP_VALID_SIZES,
    compact: [false],
    quiet: [true],
    orientation: ['horizontal'],
  },
  {
    treatment: ['quiet-compact'],
    size: ['m'],
    compact: [true],
    quiet: [true],
    orientation: ['horizontal'],
  },
] as const);

const renderGroupPermutation = (permutation: {
  size: ActionGroupSize;
  compact: boolean;
  quiet: boolean;
  orientation: ActionGroupOrientation;
}) =>
  renderGroup({
    size: permutation.size,
    compact: permutation.compact,
    quiet: permutation.quiet,
    orientation: permutation.orientation,
  });

const treatmentRows = () =>
  groupPermutationsBy(GROUP_PERMUTATIONS, 'treatment').map(
    ([treatment, perms]) =>
      row(
        perms.map(renderGroupPermutation),
        TREATMENT_LABELS[treatment as Treatment]
      )
  );

// Compact's corner-rounding CSS has three distinct selector paths
// (`::slotted(:first-child:not(:last-child))`, `:last-child:not(:first-child)`,
// and `:not(:first-child, :last-child)`), and a lone child matches none of
// them. One size is enough here since the count, not the size, is what
// exercises the different selectors:
// - 1 button: matches none of the three selectors, keeps its full natural
//   radius on every corner.
// - 2 buttons: only the first/last selectors ever match; there is no
//   "middle" case with two children.
// - 4 buttons: exercises the middle-child selector against two children at
//   once, not just one.
const COMPACT_BUTTON_COUNT_LABELS: Record<number, readonly string[]> = {
  1: ['Cut'],
  2: ['Cut', 'Copy'],
  4: ['Cut', 'Copy', 'Paste', 'Delete'],
};

const compactButtonCountContent = () =>
  row(
    [1, 2, 4].map((count) =>
      renderGroup({ compact: true, labels: COMPACT_BUTTON_COUNT_LABELS[count] })
    ),
    'Compact (1, 2, 4 buttons)'
  );

// `justified` stretches each action-button to fill leftover width
// (`::slotted(*) { flex: 1 1 0%; }`), but only if the host is wider than its
// buttons' combined natural width plus gaps.
//
// The second item uses uneven label lengths so the stretch is visible; equal
// widths would look identical whether justified or not.
const justifiedContent = () =>
  row(
    [
      renderGroup({ justified: true, style: 'inline-size: 320px;' }),
      renderGroup({
        justified: true,
        style: 'inline-size: 320px;',
        labels: ['Cut', 'Copy to clipboard', 'Paste'],
      }),
      renderGroup({
        justified: true,
        orientation: 'vertical',
        style: 'inline-size: 320px;',
      }),
    ],
    'Justified'
  );

// Action button's own VRT already covers its disabled color treatment in
// depth; this just confirms the group-level `disabled` propagation still
// composes correctly in the group's layout.
const disabledContent = () =>
  row([renderGroup({ disabled: true })], 'Disabled');

const focusRingContent = () =>
  row(
    [renderGroup({ compact: true, focusTargetIndex: 1 })],
    'Focus ring (compact, not clipped by neighbors)'
  );

// `inline-size: fit-content` shrinks the wrapper to its widest child's
// content width without forcing overflow if the row is narrower.
// `align-items: stretch` then makes the shorter group match, together with
// the group's own `min-inline-size: 100%`. The second group uses a longer
// label so a hug regression (uneven right edges) is visible.
const toolbarContent = () =>
  row(
    html`
      <div
        role="toolbar"
        aria-label="Document actions"
        aria-orientation="vertical"
        style="display: flex; flex-direction: column; gap: var(--swc-spacing-400); inline-size: fit-content;"
      >
        ${renderGroup({
          orientation: 'vertical',
          accessibleLabel: 'Edit actions',
        })}
        ${renderGroup({
          orientation: 'vertical',
          accessibleLabel: 'View actions',
          labels: ['Zoom in', 'Zoom out', 'Zoom to fit'],
        })}
      </div>
    `,
    'Toolbar (vertical)'
  );

const focusMiddleChild = ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  canvasElement.querySelector<HTMLElement>('[data-vrt-focus-target]')?.focus();
};

const permutationContent = () => html`
  ${treatmentRows()} ${compactButtonCountContent()} ${justifiedContent()}
  ${disabledContent()} ${toolbarContent()}
`;

// VRT stories

// Default/compact/quiet swept across every size, the quiet+compact boolean
// interaction, justified, disabled, and a vertical toolbar.
// Rendered once in light/ltr and once
// in dark/rtl (single story, one snapshot, both axes covered).
//
// Static-color rendering is intentionally not covered here: `static-color`
// only ever propagates through to slotted `swc-action-button` children —
// action-group has no static-color-specific CSS of its own, so this would
// only re-verify action-button's own static-color VRT coverage under a
// layout that doesn't affect it. See `.ai/skills/vrt-authoring/SKILL.md`.
//
// The focus-ring row is appended once, separately, rather than folded into
// the content above: real DOM focus is exclusive to a single element, so
// duplicating that row into both theme copies (the way everything else here
// is duplicated) would only ever let one copy show the effect while the
// other silently renders the unfocused default — implying both were
// verified when only one was.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
    ${theme(focusRingContent(), 'light', 'ltr')}
  `,
  parameters: vrtParameters,
  play: focusMiddleChild,
};

// action-group.css has no `@media (forced-colors: active)` block itself, but
// its action-button children do; this confirms the composite still renders
// correctly (borders, focus ring, layout) under forced-colors.
export const ForcedColors: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(focusRingContent(), 'light', 'ltr')}
  `,
  parameters: forcedColorsVrtParameters,
  play: focusMiddleChild,
};
