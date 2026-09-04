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

import '../../swc-suggestion-item.js';

import type { ForcedPseudoState } from '../../../../../.storybook/helpers/index.js';
import {
  FORCED_STATES,
  forcedColorsVrtParameters,
  forcePseudoState,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'AI Toolkit/Suggestion group/Suggestion item/Suggestion item VRT',
  component: 'swc-suggestion-item',
  tags: ['dev'],
};

export default meta;

// Helpers

const SHORT_LABEL = 'Create a slide deck from this';
const LONG_LABEL = 'Create a year-over-year growth chart for the next decade';

type ItemCase = {
  label: string;
  forceState?: ForcedPseudoState;
  lang?: string;
};

const renderItem = ({ label, forceState, lang }: ItemCase) => html`
  <swc-suggestion-item
    data-force-state=${forceState ?? nothing}
    lang=${lang ?? nothing}
  >
    ${label}
  </swc-suggestion-item>
`;

// Hover/focus/active colors live on the composed `swc-button`'s inner
// `.swc-Button`, not on `swc-suggestion-item` itself (the chip only restyles
// geometry through the button's public custom properties). Force the state
// on that inner element so the pill shape, icon, and secondary-variant
// state colors are captured together.
const forceSuggestionItemStates = ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  canvasElement
    .querySelectorAll<HTMLElement>('swc-suggestion-item[data-force-state]')
    .forEach((host) => {
      const state = host.dataset.forceState as ForcedPseudoState | undefined;
      const button = host.shadowRoot?.querySelector('swc-button');
      if (state && button) {
        forcePseudoState(button, state, '.swc-Button');
      }
    });
};

// Anatomy is always icon + label (the curved-arrow glyph is baked in, not
// a slot). There is no size, variant, disabled, static-color, or wrapping
// axis: the chip is a restyled secondary `swc-button` (`inline-size:
// fit-content`) and suggestion-item does not expose those attributes.
// Label length is the only content axis that changes the chip's geometry.
const permutationContent = () => html`
  ${row(
    [renderItem({ label: 'Short action' }), renderItem({ label: LONG_LABEL })],
    'Labels'
  )}
  ${FORCED_STATES.map((state) =>
    row([renderItem({ label: SHORT_LABEL, forceState: state })], state)
  )}
  ${row(
    [
      renderItem({ label: '承認ワークフローを開始', lang: 'ja' }),
      renderItem({ label: '승인 워크플로 시작', lang: 'ko' }),
      renderItem({ label: '启动审批工作流', lang: 'zh' }),
    ],
    'CJK language'
  )}
`;

// VRT stories

// Short and long labels, forced hover/focus-visible/active on the composed
// secondary button (chip geometry plus those states is what this pattern
// owns; the state colors themselves come from `swc-button`), and CJK
// rendering. Rendered once in light/ltr and once in dark/rtl (that pair
// covers both axes, including the leading icon's RTL mirroring), all in a
// single story so it costs one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceSuggestionItemStates,
};

// `forced-colors` replaces the whole page palette, so it can't be scoped to a
// subtree the way theme()'s light/dark split is, and needs its own snapshot
// rather than folding into Permutations. Still forces hover/focus-visible/
// active since forced-colors mode has its own UA-mandated focus-ring
// behavior worth confirming on the pill-shaped chip.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceSuggestionItemStates,
};
