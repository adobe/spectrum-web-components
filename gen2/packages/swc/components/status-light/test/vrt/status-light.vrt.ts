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
  STATUS_LIGHT_VALID_SIZES,
  STATUS_LIGHT_VARIANTS,
} from '@adobe/spectrum-wc-core/components/status-light';

import '@adobe/spectrum-wc/components/status-light/swc-status-light.js';

import {
  createPermutations,
  forcedColorsVrtParameters,
  groupPermutationsBy,
  renderStorybookPermutation,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Status light/Status light VRT',
  component: 'swc-status-light',
  tags: ['dev'],
};

export default meta;

// Helpers

// Every variant (5 semantic + 14 non-semantic) x every size. Status light has
// no icon slot, outline, subtle, or fixed API, so variant x size is the whole
// permutation surface.
const STATUS_LIGHT_PERMUTATIONS = createPermutations([
  { variant: STATUS_LIGHT_VARIANTS, size: STATUS_LIGHT_VALID_SIZES },
]);

// Status light is non-interactive (no :hover/:focus/:active rules in
// status-light.css), so unlike button there's no forced pseudo-state row to
// add here. The row heading (variant) already identifies each item, so the
// label stays plain rather than repeating the variant name.
const renderStatusLightPermutation = renderStorybookPermutation(
  'swc-status-light',
  { 'default-slot': 'Status light' }
);

const permutationContent = () => html`
  ${groupPermutationsBy(STATUS_LIGHT_PERMUTATIONS, 'variant').map(
    ([variant, perms]) => row(perms.map(renderStatusLightPermutation), variant)
  )}
  ${row(
    [
      html`
        <swc-status-light variant="notice" style="max-inline-size: 200px">
          Document processing in progress - please wait while we validate your
          submission
        </swc-status-light>
      `,
    ],
    'Wrapping'
  )}
  ${row(
    [
      html`
        <swc-status-light variant="notice" lang="ja">承認待ち</swc-status-light>
      `,
      html`
        <swc-status-light variant="notice" lang="ko">
          승인 대기 중
        </swc-status-light>
      `,
      html`
        <swc-status-light variant="notice" lang="zh">待审批</swc-status-light>
      `,
    ],
    'CJK language'
  )}
`;

// VRT stories

// Every variant x size, text wrapping, and CJK line-height (status-light.css
// sets a distinct line-height for :lang(ja/zh/ko)). Rendered once in
// light/ltr and once in dark/rtl in a single story so it costs one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

// Relying on color alone to distinguish variants fails WCAG 1.4.1, and
// out of context we can't know what a given color is meant to signal, so
// status-light.css flattens every dot to CanvasText in forced-colors mode
// rather than preserving the semantic variant color. Every variant renders
// identically here; the permutation set is kept to confirm that flattening
// holds across sizes and doesn't regress per-variant.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
