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

import {
  ACTION_BUTTON_STATIC_COLORS,
  ACTION_BUTTON_VALID_SIZES,
} from '@adobe/spectrum-wc-core/components/action-button';

import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';

import {
  createPermutations,
  FORCED_STATES,
  forcedColorsVrtParameters,
  forcePseudoStates,
  groupPermutationsBy,
  renderStorybookPermutation,
  row,
  staticColorBackground,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Action Button/Action Button VRT',
  component: 'swc-action-button',
  tags: ['dev'],
};

export default meta;

// Helpers

// A plain <svg> assigned to the icon slot, matching how the stories file passes
// `editIconSvg`. `template()`'s named-slot rendering sets `slot="icon"` for us,
// so the markup itself carries no slot attribute.
const ICON_SLOT_MARKUP =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden="true" focusable="false"><path d="M33.567 8.2 27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945ZM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73Z"></path></svg>';

// Group labels for the `quiet` axis, since `groupPermutationsBy` would
// otherwise render raw 'true'/'false' row headings.
const QUIET_LABELS: Record<string, string> = {
  false: 'Default',
  true: 'Quiet',
};

// Main permutations: the default and quiet treatments across every size, in
// label-only and icon+label anatomy, plus disabled/pending states (which don't
// cross with the size axis above) and forced hover/focus-visible/active per
// treatment. Icon-only anatomy and static-color are deliberately separate
// below.
const ACTION_BUTTON_PERMUTATIONS = createPermutations([
  { quiet: [false, true], size: ACTION_BUTTON_VALID_SIZES },
  {
    quiet: [false, true],
    size: ACTION_BUTTON_VALID_SIZES,
    'icon-slot': [ICON_SLOT_MARKUP],
  },
  { quiet: [false, true], disabled: [true] },
  { quiet: [false, true], pending: [true] },
  { quiet: [false, true], 'data-force-state': FORCED_STATES },
]);

// Static-color action buttons need contrast backgrounds, so keep their
// permutations separate from the main set instead of filtering them at render
// time.
const STATIC_COLOR_PERMUTATION_GROUPS = ACTION_BUTTON_STATIC_COLORS.map(
  (color) => ({
    color,
    permutations: createPermutations([
      {
        'static-color': [color],
        quiet: [false, true],
        'icon-slot': [ICON_SLOT_MARKUP],
      },
      {
        'static-color': [color],
        quiet: [false, true],
        'data-force-state': FORCED_STATES,
      },
      { 'static-color': [color], quiet: [false, true], disabled: [true] },
      { 'static-color': [color], quiet: [false, true], pending: [true] },
    ]),
  })
);

// Spreads onto the default `args` (not just `permutation`) because
// template()'s named-slot rendering (unlike default-slot) doesn't guard
// against a missing key: an omitted `icon-slot` reads as `undefined` and gets
// serialized into a literal "undefined" text node. `args` already carries every
// declared slot/attr at its real default (empty string for slots), so only the
// axes each permutation actually sets override it.
const renderActionButtonPermutation = renderStorybookPermutation(
  'swc-action-button',
  { 'default-slot': 'Edit' }
);

// Icon-only is the one anatomy variant `template()` can't render correctly: its
// icon-slot content goes through an extra DOM-parsing step that leaves a Lit
// child-position marker comment inside <swc-action-button>. The slotted-text
// observer misreads that marker as label text and `iconOnly` never activates.
// The stories file's own Icon only story sidesteps it the same way: writing the
// markup directly instead of going through template()'s icon-slot.
const ICON_ONLY_PERMUTATIONS = createPermutations([
  { size: ACTION_BUTTON_VALID_SIZES },
  { quiet: [true], size: ACTION_BUTTON_VALID_SIZES },
  { disabled: [true] },
  { pending: [true] },
]);

type IconOnlyCase = {
  size?: (typeof ACTION_BUTTON_VALID_SIZES)[number];
  quiet?: boolean;
  disabled?: boolean;
  pending?: boolean;
};

const renderIconOnlyPermutation = ({
  size = 'm',
  quiet = false,
  disabled = false,
  pending = false,
}: IconOnlyCase) => html`
  <swc-action-button
    size=${size}
    ?quiet=${quiet}
    ?disabled=${disabled}
    ?pending=${pending}
    accessible-label="Edit"
  >
    <svg
      slot="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M33.567 8.2 27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945ZM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73Z"
      />
    </svg>
  </swc-action-button>
`;

const forceActionButtonStates = forcePseudoStates(
  'swc-action-button[data-force-state]',
  '.swc-ActionButton'
);

// Forced pseudo-state permutations render in their own titled row rather than
// folded into the per-treatment grouping.
const isPseudoState = (permutation: Record<string, unknown>) =>
  'data-force-state' in permutation;

const permutationContent = () => html`
  ${groupPermutationsBy(
    ACTION_BUTTON_PERMUTATIONS.filter(
      (permutation) => !isPseudoState(permutation)
    ),
    'quiet'
  ).map(([quiet, perms]) =>
    row(perms.map(renderActionButtonPermutation), QUIET_LABELS[quiet] ?? quiet)
  )}
  ${groupPermutationsBy(
    ACTION_BUTTON_PERMUTATIONS.filter(isPseudoState),
    'data-force-state'
  ).map(([state, perms]) =>
    row(perms.map(renderActionButtonPermutation), state)
  )}
  ${row(
    ICON_ONLY_PERMUTATIONS.map(renderIconOnlyPermutation),
    'Icon-only anatomy'
  )}
  ${row(
    [
      html`
        <swc-action-button lang="ja">承認ワークフローを開始</swc-action-button>
      `,
      html`
        <swc-action-button lang="ko">승인 워크플로 시작</swc-action-button>
      `,
      html`
        <swc-action-button lang="zh">启动审批工作流</swc-action-button>
      `,
    ],
    'CJK language'
  )}
  ${STATIC_COLOR_PERMUTATION_GROUPS.map(({ color, permutations }) =>
    staticColorBackground(
      [
        ...groupPermutationsBy(
          permutations.filter((permutation) => !isPseudoState(permutation)),
          'quiet'
        ).map(([quiet, perms]) =>
          row(
            perms.map(renderActionButtonPermutation),
            `Static ${color} · ${QUIET_LABELS[quiet] ?? quiet}`
          )
        ),
        ...groupPermutationsBy(
          permutations.filter(isPseudoState),
          'data-force-state'
        ).map(([state, perms]) =>
          row(
            perms.map(renderActionButtonPermutation),
            `Static ${color} · ${state}`
          )
        ),
      ],
      color
    )
  )}
`;

// VRT stories

// Every size in the default and quiet treatments, label-only and icon+label
// anatomy, disabled/pending states, icon-only anatomy across sizes, CJK label
// rendering, static-color variants (each with their own forced hover/
// focus-visible/active, since static-color buttons keep their own contrast
// rules regardless of app theme) on their contrast backgrounds, and forced
// hover/focus-visible/active per treatment (see the `play` function below).
// Rendered once in light/ltr and once in dark/rtl below (that combination
// covers both axes), all still in a single story so it costs one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  // Autoplay runs forced pseudo-state setup in local dev and Chromatic.
  parameters: vrtParameters,
  // :hover/:active can't be triggered by synthetic events, and static VRT
  // captures have no real pointer. See helpers/pseudo-state.ts. Applying this
  // after render (rather than baking the forced-state attribute into the markup
  // above) is what lets it target the real internal `.swc-ActionButton` element
  // inside the shadow root, which the light-DOM markup above has no access to.
  play: forceActionButtonStates,
};

// `forced-colors` is a real browser media feature Chromatic can emulate
// directly (parameters.chromatic.forcedColors), unlike :hover/:active/
// :focus-visible above. But that also means it can't be scoped to a subtree the
// way theme()'s light/dark split is. Forced-colors mode replaces the whole
// page's palette, so it needs its own story/snapshot rather than folding into
// Permutations. Still forces hover/focus-visible/active (same play-function
// pattern) since forced-colors mode has its own UA-mandated focus-ring behavior
// worth confirming.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceActionButtonStates,
};
