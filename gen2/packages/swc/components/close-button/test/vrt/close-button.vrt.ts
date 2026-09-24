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
  BUTTON_STATIC_COLORS,
  BUTTON_VALID_SIZES,
} from '@adobe/spectrum-wc-core/components/button';

import '@adobe/spectrum-wc/components/close-button/swc-close-button.js';

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
  title: 'Close Button/Close Button VRT',
  component: 'swc-close-button',
  tags: ['dev'],
};

export default meta;

// Helpers

const renderCloseButtonPermutation = renderStorybookPermutation(
  'swc-close-button',
  { 'accessible-label': 'Close' }
);

// One snapshot per size: the cross icon renders via the internal
// <swc-ui-icon>, which selects a discrete art asset per size step rather than
// scaling one asset (icon-rfc.md, section 7), so each size needs its own
// coverage to catch a regression in that per-step art.
const SIZE_PERMUTATIONS = createPermutations([{ size: BUTTON_VALID_SIZES }]);

const DISABLED_PERMUTATIONS = [{ disabled: true }];

const FORCED_STATE_PERMUTATIONS = createPermutations([
  { 'data-force-state': FORCED_STATES },
]);

const STATIC_COLOR_PERMUTATION_GROUPS = BUTTON_STATIC_COLORS.map((color) => ({
  color,
  sizes: createPermutations([
    { 'static-color': [color], size: BUTTON_VALID_SIZES },
  ]),
  disabled: [{ 'static-color': color, disabled: true }],
  forcedStates: createPermutations([
    { 'static-color': [color], 'data-force-state': FORCED_STATES },
  ]),
}));

const forceCloseButtonStates = forcePseudoStates(
  'swc-close-button[data-force-state]',
  '.swc-CloseButton'
);

const permutationContent = () => html`
  ${row(SIZE_PERMUTATIONS.map(renderCloseButtonPermutation), 'Sizes')}
  ${row(DISABLED_PERMUTATIONS.map(renderCloseButtonPermutation), 'Disabled')}
  ${groupPermutationsBy(FORCED_STATE_PERMUTATIONS, 'data-force-state').map(
    ([state, perms]) => row(perms.map(renderCloseButtonPermutation), state)
  )}
  ${STATIC_COLOR_PERMUTATION_GROUPS.map(
    ({ color, sizes, disabled, forcedStates }) =>
      staticColorBackground(
        [
          row(sizes.map(renderCloseButtonPermutation), `Static ${color}`),
          row(
            disabled.map(renderCloseButtonPermutation),
            `Static ${color} · disabled`
          ),
          ...groupPermutationsBy(forcedStates, 'data-force-state').map(
            ([state, perms]) =>
              row(
                perms.map(renderCloseButtonPermutation),
                `Static ${color} · ${state}`
              )
          ),
        ],
        color
      )
  )}
`;

// VRT stories

// Every size (to catch a regression in the internal cross icon's per-step
// art), disabled, forced hover/focus-visible/active, and static-color
// variants on their contrast backgrounds with their own forced states.
// Rendered once in light/ltr and once in dark/rtl below (that combination
// covers both axes), all in a single story so it costs one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  // :hover/:active can't be triggered by synthetic events, and static VRT
  // captures have no real pointer. See helpers/pseudo-state.ts. Applying this
  // after render (rather than baking the forced-state attribute into the
  // markup above) is what lets it target the real internal `.swc-CloseButton`
  // element inside the shadow root, which the light-DOM markup above has no
  // access to.
  play: forceCloseButtonStates,
};

export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceCloseButtonStates,
};
