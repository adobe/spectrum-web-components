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

import '../../swc-suggestion-group.js';
import '../../../suggestion-item/swc-suggestion-item.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'AI Toolkit/Suggestion group/Suggestion group VRT',
  component: 'swc-suggestion-group',
  tags: ['dev'],
};

export default meta;

// Helpers

const HEADING = 'What would you like to do next?';
const THREE_ITEMS = [
  'Create a slide deck from this',
  'Summarize in 3 bullet points',
  'Translate to Spanish',
];
// Longer set that forces the items row to wrap at the constrained width below.
const WRAPPING_ITEMS = [
  'Refine the executive summary',
  'Add competitive analysis',
  'Shorten for a 5-minute read',
  'Export as talking points',
  'Suggest a subject line',
];
const CJK_ITEMS = ['スライドを作成', '3点で要約', 'スペイン語に翻訳'];

type GroupCase = {
  items: string[];
  heading?: string;
  lang?: string;
  // Constrain the group so multi-chip wrapping is captured deterministically
  // regardless of the snapshot viewport width.
  inlineSize?: string;
};

const renderGroup = ({ items, heading, lang, inlineSize }: GroupCase) => html`
  <swc-suggestion-group
    lang=${lang ?? nothing}
    style=${inlineSize ? `inline-size: ${inlineSize};` : nothing}
  >
    ${heading
      ? html`
          <h3 slot="heading">${heading}</h3>
        `
      : nothing}
    ${items.map(
      (label) => html`
        <swc-suggestion-item>${label}</swc-suggestion-item>
      `
    )}
  </swc-suggestion-group>
`;

// The group owns the heading typography and its hidden-when-empty rule, the
// title-over-items vertical stack, and the wrapping items row with its gap.
// Per-chip hover/focus/active/forced-colors states are covered by the
// suggestion-item VRT and deliberately not re-forced here. RTL is exercised by
// the dark/rtl pass so the wrapped layout and leading-arrow mirroring are
// captured together.
const permutationContent = () => html`
  ${row(
    [renderGroup({ heading: HEADING, items: THREE_ITEMS })],
    'Heading + items'
  )}
  ${row(
    [
      renderGroup({
        heading: HEADING,
        items: WRAPPING_ITEMS,
        inlineSize: '360px',
      }),
    ],
    'Wrapping items'
  )}
  ${row([renderGroup({ items: THREE_ITEMS })], 'No heading (title hidden)')}
  ${row(
    [renderGroup({ heading: '次の操作を選択', items: CJK_ITEMS, lang: 'ja' })],
    'CJK language'
  )}
`;

// VRT stories

// Heading composition, the hidden-title case, wrapping, and CJK rendering,
// once in light/ltr and once in dark/rtl (that pair covers both axes,
// including RTL mirroring of the wrapped chips), all in a single story so it
// costs one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

// `forced-colors` replaces the whole page palette, so it can't be scoped to a
// subtree the way theme()'s light/dark split is, and needs its own snapshot.
// Confirms the heading color and chip focus-ring behavior hold in the grouped
// layout under a UA-mandated palette.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
