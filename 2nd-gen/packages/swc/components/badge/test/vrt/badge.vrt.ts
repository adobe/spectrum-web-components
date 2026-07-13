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
  BADGE_VALID_SIZES,
  BADGE_VARIANTS_COLOR,
  BADGE_VARIANTS_SEMANTIC,
  FIXED_VALUES,
} from '@spectrum-web-components/core/components/badge';

import '@adobe/spectrum-wc/components/badge/swc-badge.js';
import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import {
  createPermutations,
  forcedColorsVrtParameters,
  renderStorybookPermutation,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import { Arrow100Icon } from '../../../icon/elements/Arrow100Icon.js';

const meta: Meta = {
  title: 'Badge/VRT',
  component: 'swc-badge',
  tags: ['dev'],
};

export default meta;

const semanticLabels = {
  accent: 'New',
  informative: 'Active',
  neutral: 'Archived',
  positive: 'Approved',
  notice: 'Pending approval',
  negative: 'Rejected',
} as const;

const colorLabels = {
  fuchsia: 'Marketing',
  indigo: 'Engineering',
  magenta: 'Design',
  purple: 'Product',
  seafoam: 'Support',
  yellow: 'Busy',
  gray: 'Available',
  red: 'Sales',
  orange: 'Research',
  chartreuse: 'Quality',
  celery: 'Documentation',
  green: 'Legal',
  cyan: 'Analytics',
  blue: 'Security',
  pink: 'Creative',
  turquoise: 'Training',
  brown: 'Facilities',
  cinnamon: 'Compliance',
  silver: 'Version 1.2.10',
} as const;

const renderBadgePermutation = renderStorybookPermutation('swc-badge');

const SIZE_PERMUTATIONS = createPermutations([{ size: BADGE_VALID_SIZES }]);
const SEMANTIC_VARIANT_PERMUTATIONS = createPermutations([
  { variant: BADGE_VARIANTS_SEMANTIC },
]);
const COLOR_VARIANT_PERMUTATIONS = createPermutations([
  { variant: BADGE_VARIANTS_COLOR },
]);
const STYLE_PERMUTATIONS = createPermutations([
  { variant: BADGE_VARIANTS_SEMANTIC, subtle: [true] },
  { variant: BADGE_VARIANTS_SEMANTIC, outline: [true] },
]);

const arrowIcon = () => html`
  <swc-icon slot="icon" aria-hidden="true">${Arrow100Icon()}</swc-icon>
`;

const badgeContent = () => html`
  ${row(
    SIZE_PERMUTATIONS.map(({ size }) =>
      renderBadgePermutation({ size, 'default-slot': `Size ${size}` })
    ),
    'Sizes'
  )}
  ${row(
    SEMANTIC_VARIANT_PERMUTATIONS.map(({ variant }) =>
      renderBadgePermutation({
        variant,
        'default-slot': semanticLabels[variant],
      })
    ),
    'Semantic variants'
  )}
  ${row(
    COLOR_VARIANT_PERMUTATIONS.map(({ variant }) =>
      renderBadgePermutation({
        variant,
        'default-slot': colorLabels[variant],
      })
    ),
    'Color variants'
  )}
  ${row(
    STYLE_PERMUTATIONS.map((permutation) =>
      renderBadgePermutation({
        ...permutation,
        'default-slot': permutation.outline ? 'Outline' : 'Subtle',
      })
    ),
    'Subtle and outline'
  )}
  ${row(
    BADGE_VALID_SIZES.map(
      (size) => html`
        <swc-badge size=${size}>${arrowIcon()}Icon ${size}</swc-badge>
      `
    ),
    'Icon and label'
  )}
  ${row(
    BADGE_VALID_SIZES.map(
      (size) => html`
        <swc-badge size=${size} aria-label="Icon badge">
          ${arrowIcon()}
        </swc-badge>
      `
    ),
    'Icon only'
  )}
  ${row(
    FIXED_VALUES.map((fixed) =>
      renderBadgePermutation({
        fixed,
        variant: 'accent',
        'default-slot': fixed,
      })
    ),
    'Fixed placement'
  )}
  ${row(
    [
      html`
        <swc-badge lang="ja">承認ワークフロー</swc-badge>
      `,
      html`
        <swc-badge lang="ko">승인 워크플로</swc-badge>
      `,
      html`
        <swc-badge lang="zh">${arrowIcon()}审批工作流</swc-badge>
      `,
    ],
    'CJK language'
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(badgeContent(), 'light', 'ltr')}
    ${theme(badgeContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(badgeContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
