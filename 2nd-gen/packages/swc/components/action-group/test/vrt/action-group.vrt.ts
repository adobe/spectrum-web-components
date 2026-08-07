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
  ACTION_GROUP_STATIC_COLORS,
  ACTION_GROUP_VALID_SIZES,
  type ActionGroupOrientation,
  type ActionGroupSize,
  type ActionGroupStaticColor,
} from '@adobe/spectrum-wc-core/components/action-group';

import '@adobe/spectrum-wc/components/action-group/swc-action-group.js';
import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';

import {
  createPermutations,
  forcedColorsVrtParameters,
  groupPermutationsBy,
  row,
  staticColorBackground,
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
  staticColor?: ActionGroupStaticColor;
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
  staticColor,
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
    static-color=${ifDefined(staticColor)}
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
  | 'compact-horizontal'
  | 'compact-vertical'
  | 'quiet'
  | 'quiet-compact';

const TREATMENT_LABELS: Record<Treatment, string> = {
  default: 'Default',
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

const focusMiddleChild = ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  canvasElement.querySelector<HTMLElement>('[data-vrt-focus-target]')?.focus();
};

const staticColorsContent = () =>
  ACTION_GROUP_STATIC_COLORS.map((staticColor) =>
    staticColorBackground(
      row([renderGroup({ staticColor })], `Static ${staticColor}`),
      staticColor
    )
  );

const permutationContent = () => html`
  ${treatmentRows()} ${justifiedContent()} ${disabledContent()}
  ${staticColorsContent()}
`;

// VRT stories

// Default/compact/quiet swept across every size, the quiet+compact boolean
// interaction, justified, disabled, and static colors on their contrast
// backgrounds. Rendered once in light/ltr and once in dark/rtl (single
// story, one snapshot, both axes covered).
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
