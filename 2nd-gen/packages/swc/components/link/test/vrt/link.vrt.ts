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

import type { ForcedPseudoState } from '../../../../.storybook/helpers/index.js';
import {
  FORCED_STATES,
  forcedColorsVrtParameters,
  forcePseudoStates,
  row,
  staticColorBackground,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Link/Link VRT',
  tags: ['dev'],
};

export default meta;

// Helpers

// Link is a CSS-only utility: a native <a> styled by link.css's `.swc-Link`
// BEM modifiers (imported page-level in preview.ts, so no custom-element
// import is needed and there's no shadow root). These raw anchors mirror how
// an author uses the explicit-context API directly, rather than going through
// the story template's derived class logic. The prose/links typography
// contexts (bare anchors inside `.swc-Typography--prose`/`--links`) are styled
// by typography.css, not link.css, so they belong to typography's own VRT and
// are intentionally out of scope here.
const link = (
  modifiers: string,
  text: string,
  { forceState, lang }: { forceState?: ForcedPseudoState; lang?: string } = {}
) => html`
  <a
    href="#"
    class=${`swc-Link ${modifiers}`.trim()}
    data-force-state=${forceState ?? nothing}
    lang=${lang ?? nothing}
    onclick="return false;"
  >
    ${text}
  </a>
`;

// Rest plus each forced pseudo-state, for a given set of modifiers. `active`
// and `hover` can't be triggered synthetically in a static snapshot, so the
// play function mirrors link.css's `:hover`/`:active`/`:focus-visible` rules
// onto `data-forced-*` attributes — see helpers/pseudo-state.ts.
const stateCells = (modifiers: string) => [
  link(modifiers, 'Rest'),
  ...FORCED_STATES.map((state) =>
    link(modifiers, state, { forceState: state })
  ),
];

// Every axis link.css owns: the two color variants (default/secondary), the
// standalone modifier (medium weight) and quiet standalone (underline dropped
// until hover, so it's shown both at rest and forced-hovered), all four
// interaction states for both color variants (secondary overrides every
// state's color token, so it can't share the default's state row), the CJK
// line-height override, and the two static-color variants on their matching
// contrast backgrounds (each with its own state coverage, since the static
// tokens flatten hover/active/focus to a single color and only the focus
// indicator color changes).
const permutationContent = () => html`
  ${row(
    [link('', 'Default'), link('swc-Link--secondary', 'Secondary')],
    'Variants (inline)'
  )}
  ${row(
    [
      link('swc-Link--standalone', 'Default standalone'),
      link('swc-Link--standalone swc-Link--secondary', 'Secondary standalone'),
    ],
    'Standalone'
  )}
  ${row(
    [
      link(
        'swc-Link--standalone swc-Link--quiet',
        'Quiet · rest (no underline)'
      ),
      link(
        'swc-Link--standalone swc-Link--quiet',
        'Quiet · hover (underline)',
        {
          forceState: 'hover',
        }
      ),
    ],
    'Quiet standalone'
  )}
  ${row(stateCells(''), 'States · default')}
  ${row(stateCells('swc-Link--secondary'), 'States · secondary')}
  ${row(
    [
      link('swc-Link--standalone', 'ワークフローを開始', { lang: 'ja' }),
      link('swc-Link--standalone', '워크플로 시작', { lang: 'ko' }),
      link('swc-Link--standalone', '启动工作流', { lang: 'zh' }),
    ],
    'CJK line height'
  )}
  ${staticColorBackground(
    html`
      ${row(
        [
          link('swc-Link--staticWhite', 'Static white'),
          link('swc-Link--staticWhite swc-Link--secondary', 'Secondary'),
        ],
        'Variants'
      )}
      ${row(stateCells('swc-Link--staticWhite'), 'States')}
    `,
    'white'
  )}
  ${staticColorBackground(
    html`
      ${row(
        [
          link('swc-Link--staticBlack', 'Static black'),
          link('swc-Link--staticBlack swc-Link--secondary', 'Secondary'),
        ],
        'Variants'
      )}
      ${row(stateCells('swc-Link--staticBlack'), 'States')}
    `,
    'black'
  )}
`;

// VRT stories

// Rendered once in light/ltr and once in dark/rtl so both color-scheme and
// direction axes are covered in a single snapshot. The static-color rows carry
// their own contrast background via staticColorBackground and read correctly
// under either theme.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  // No shadow root on these plain <a> elements, so forcePseudoState() mirrors
  // link.css from document.styleSheets instead. See helpers/pseudo-state.ts.
  play: forcePseudoStates('.swc-Link[data-force-state]'),
};

// `forced-colors` replaces the whole page palette, so it can't be scoped to a
// subtree the way theme()'s light/dark split is, and needs its own snapshot.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forcePseudoStates('.swc-Link[data-force-state]'),
};
