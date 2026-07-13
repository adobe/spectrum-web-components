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
  BUTTON_FILL_STYLES,
  BUTTON_STATIC_COLORS,
  BUTTON_VALID_SIZES,
  BUTTON_VARIANTS,
} from '@spectrum-web-components/core/components/button';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import {
  createPermutations,
  FORCED_STATES,
  forcedColorsVrtParameters,
  forcePseudoStates,
  renderStorybookPermutation,
  row,
  staticColorBackground,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import { Arrow100Icon } from '../../../icon/elements/Arrow100Icon.js';

// Metadata

const meta: Meta = {
  title: 'Button/VRT',
  component: 'swc-button',
  tags: ['dev'],
};

export default meta;

// Helpers

// Matches Arrow100Icon.ts's markup, wrapped the same way arrowIcon() below
// wraps it. This needs to be a plain string since template()'s icon-slot
// takes markup, not a lit TemplateResult.
const ICON_SLOT_MARKUP =
  '<swc-icon aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M9.60547 4.46973 6.3457 1.20996c-.29297-.29297-.76758-.29297-1.06055 0s-.29297.76758 0 1.06055l1.97949 1.97949H.9248c-.41406 0-.75.33594-.75.75s.33594.75.75.75h6.33984l-1.97949 1.97949c-.29297.29297-.29297.76758 0 1.06055.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973l3.25977-3.25977c.29297-.29297.29297-.76758 0-1.06055Z"></path></svg></swc-icon>';

// Main button permutations: variant x fill-style x size, disabled/pending,
// forced hover/focus-visible/active per variant, and icon+label anatomy.
// Static-color and icon-only anatomy are deliberately separate below.
const BUTTON_PERMUTATIONS = createPermutations([
  { variant: BUTTON_VARIANTS, size: BUTTON_VALID_SIZES },
  // Outline only ships for primary/secondary; accent/negative don't have an
  // outline style.
  {
    variant: ['primary', 'secondary'],
    'fill-style': ['outline'],
    size: BUTTON_VALID_SIZES,
  },
  { size: BUTTON_VALID_SIZES, disabled: [true] },
  { size: BUTTON_VALID_SIZES, pending: [true] },
  { variant: BUTTON_VARIANTS, 'data-force-state': FORCED_STATES },
  {
    'fill-style': BUTTON_FILL_STYLES,
    size: BUTTON_VALID_SIZES,
    'icon-slot': [ICON_SLOT_MARKUP],
  },
]);

// Static-color buttons need contrast backgrounds, so keep their permutations
// separate from the main set instead of filtering them at render time.
const STATIC_COLOR_PERMUTATION_GROUPS = BUTTON_STATIC_COLORS.map((color) => ({
  color,
  permutations: createPermutations([
    // The static-color attribute collapses semantic variants into two
    // treatments: "solid" (primary/accent/negative) and "secondary" (its own,
    // more subtle tokens).
    {
      'static-color': [color],
      variant: ['primary', 'secondary'],
      'fill-style': BUTTON_FILL_STYLES,
    },
    {
      'static-color': [color],
      variant: ['primary', 'secondary'],
      'data-force-state': FORCED_STATES,
    },
  ]),
}));

// Spreads onto the default `args` (not just `permutation`) because
// template()'s named-slot rendering (unlike default-slot) doesn't guard
// against a missing key: an omitted `icon-slot` reads as `undefined` and
// gets serialized into a literal "undefined" text node. `args` already
// carries every declared slot/attr at its real default (empty string for
// slots), so only the axes each permutation actually sets override it.
const renderButtonPermutation = renderStorybookPermutation('swc-button', {
  'default-slot': 'Button',
});

// Icon-only is the one anatomy variant `template()` can't render correctly:
// its icon-slot content goes through an extra DOM-parsing step that leaves a
// Lit child-position marker comment inside <swc-button>.
// observe-slot-text.ts's content filter doesn't special-case comment nodes,
// so it misreads that marker as label text and `iconOnly` never activates.
// button.stories.ts's own Anatomy story hits the same bug and sidesteps it
// the same way: writing the markup directly instead of going through
// template()'s icon-slot.
const ICON_ONLY_PERMUTATIONS = createPermutations([
  { 'fill-style': BUTTON_FILL_STYLES, size: BUTTON_VALID_SIZES },
]);

const renderIconOnlyPermutation = ({
  'fill-style': fillStyle,
  size,
}: (typeof ICON_ONLY_PERMUTATIONS)[number]) => html`
  <swc-button fill-style=${fillStyle} size=${size} accessible-label="Button">
    <swc-icon slot="icon" aria-hidden="true">${Arrow100Icon()}</swc-icon>
  </swc-button>
`;

const arrowIcon = () => html`
  <swc-icon slot="icon" aria-hidden="true">${Arrow100Icon()}</swc-icon>
`;

const forceButtonStates = forcePseudoStates(
  'swc-button[data-force-state]',
  '.swc-Button'
);

const permutationContent = () => html`
  ${row(BUTTON_PERMUTATIONS.map(renderButtonPermutation), 'Permutations')}
  ${row(
    ICON_ONLY_PERMUTATIONS.map(renderIconOnlyPermutation),
    'Icon-only anatomy'
  )}
  ${row(
    [
      html`
        <div style="inline-size: 240px;">
          <swc-button justified>Justified</swc-button>
        </div>
      `,
      // "min width": justified in a container narrower than the label needs,
      // to confirm the button settles at a sane minimum instead of collapsing
      // or overflowing.
      html`
        <div style="inline-size: 64px;">
          <swc-button justified>Justified narrow</swc-button>
        </div>
      `,
    ],
    'Justified'
  )}
  ${STATIC_COLOR_PERMUTATION_GROUPS.map(({ color, permutations }) =>
    staticColorBackground(
      row(permutations.map(renderButtonPermutation), `Static ${color}`),
      color
    )
  )}
  ${row(
    [
      html`
        <swc-button style="max-inline-size: 180px">
          Submit and notify all stakeholders
        </swc-button>
      `,
      html`
        <swc-button style="max-inline-size: 180px">
          ${arrowIcon()}Submit and notify all stakeholders
        </swc-button>
      `,
    ],
    'Wrapping'
  )}
  ${row(
    [
      html`
        <swc-button truncate style="max-inline-size: 200px">
          Be a premium member
        </swc-button>
      `,
      html`
        <swc-button truncate style="max-inline-size: 120px">
          Be a premium member
        </swc-button>
      `,
      html`
        <swc-button truncate style="max-inline-size: 120px">
          ${arrowIcon()}Be a premium member
        </swc-button>
      `,
    ],
    'Truncation'
  )}
  ${row(
    [
      html`
        <swc-button lang="ja" style="max-inline-size: 180px">
          承認ワークフローを開始
        </swc-button>
      `,
      html`
        <swc-button lang="ko" truncate style="max-inline-size: 140px">
          승인 워크플로 시작
        </swc-button>
      `,
      html`
        <swc-button lang="zh" style="max-inline-size: 180px">
          启动审批工作流
        </swc-button>
      `,
      html`
        <swc-button lang="ja" truncate style="max-inline-size: 160px">
          ${arrowIcon()}承認ワークフローを開始
        </swc-button>
      `,
    ],
    'CJK language'
  )}
`;

// VRT stories

// Every variant x fill-style x size combination, disabled/pending states,
// static-color variants (each with their own forced hover/focus-visible/
// active, since static-color buttons keep their own contrast rules
// regardless of app theme) on their contrast backgrounds, icon anatomy
// (label-only, icon+label, icon-only) for fill and outline, text
// wrapping/truncation behavior, and forced hover/focus-visible/active per
// variant (see the `play` function below). Rendered once in light/ltr and
// once in dark/rtl below (that combination covers both axes), all still in a
// single story so it costs one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  // Autoplay runs forced pseudo-state setup in local dev and Chromatic.
  parameters: vrtParameters,
  // :hover/:active can't be triggered by synthetic events, and static VRT
  // captures have no real pointer. See helpers/pseudo-state.ts. Applying
  // this after render (rather than baking the class into the markup above)
  // is what lets it target the real internal `.swc-Button` element inside
  // the shadow root, which the light-DOM markup above has no access to.
  play: forceButtonStates,
};

// `forced-colors` is a real browser media feature Chromatic can emulate
// directly (parameters.chromatic.forcedColors, see tooltip.test.ts's
// ForcedColorsOpenTest for the same pattern), unlike :hover/:active/
// :focus-visible above. But that also means it can't be scoped to a
// subtree the way theme()'s light/dark split is. Forced-colors mode
// replaces the whole page's palette, so it needs its own story/snapshot
// rather than folding into Permutations. Still forces hover/focus-visible/
// active (same play-function pattern) since forced-colors mode has its own
// UA-mandated focus-ring behavior worth confirming.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceButtonStates,
};
