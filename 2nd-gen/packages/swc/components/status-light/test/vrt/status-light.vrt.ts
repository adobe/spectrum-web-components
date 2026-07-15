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
  STATUS_LIGHT_VARIANTS_COLOR,
  STATUS_LIGHT_VARIANTS_SEMANTIC,
} from '@spectrum-web-components/core/components/status-light';

import '@adobe/spectrum-wc/components/status-light/swc-status-light.js';

import {
  createPermutations,
  forcedColorsVrtParameters,
  renderStorybookPermutation,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Status light/Status light VRT',
  component: 'swc-status-light',
  tags: ['dev'],
};

export default meta;

const semanticLabels = {
  info: 'Active',
  neutral: 'Archived',
  positive: 'Approved',
  notice: 'Pending approval',
  negative: 'Rejected',
} as const;

const colorLabels = {
  yellow: 'Operations',
  chartreuse: 'Quality',
  celery: 'Documentation',
  seafoam: 'Support',
  cyan: 'Analytics',
  indigo: 'Engineering',
  purple: 'Product',
  fuchsia: 'Marketing',
  magenta: 'Design',
  pink: 'Creative',
  turquoise: 'Training',
  brown: 'Facilities',
  cinnamon: 'Compliance',
  silver: 'Version 1.2.10',
} as const;

const sizeLabels = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const;

const renderStatusLightPermutation =
  renderStorybookPermutation('swc-status-light');

const SIZE_PERMUTATIONS = createPermutations([
  { size: STATUS_LIGHT_VALID_SIZES },
]);

const SEMANTIC_VARIANT_PERMUTATIONS = createPermutations([
  { variant: STATUS_LIGHT_VARIANTS_SEMANTIC },
]);

const COLOR_VARIANT_PERMUTATIONS = createPermutations([
  { variant: STATUS_LIGHT_VARIANTS_COLOR },
]);

const statusLightContent = () => html`
  ${row(
    SIZE_PERMUTATIONS.map(({ size }) =>
      renderStatusLightPermutation({
        size,
        'default-slot': sizeLabels[size],
      })
    ),
    'Sizes'
  )}
  ${row(
    SEMANTIC_VARIANT_PERMUTATIONS.map(({ variant }) =>
      renderStatusLightPermutation({
        variant,
        'default-slot': semanticLabels[variant],
      })
    ),
    'Semantic variants'
  )}
  ${row(
    COLOR_VARIANT_PERMUTATIONS.map(({ variant }) =>
      renderStatusLightPermutation({
        variant,
        'default-slot': colorLabels[variant],
      })
    ),
    'Non-semantic variants'
  )}
  ${row(
    [
      html`
        <swc-status-light variant="positive" style="max-inline-size: 200px;">
          Document processing in progress - validating submission
        </swc-status-light>
      `,
      html`
        <swc-status-light variant="notice" style="max-inline-size: 120px;">
          Pending approval from legal and finance
        </swc-status-light>
      `,
    ],
    'Wrapping'
  )}
  ${row(
    [
      html`
        <swc-status-light lang="ja" variant="positive">
          送信が承認されました
        </swc-status-light>
      `,
      html`
        <swc-status-light
          lang="ko"
          variant="notice"
          style="max-inline-size: 160px;"
        >
          승인 대기 중입니다
        </swc-status-light>
      `,
      html`
        <swc-status-light lang="zh" variant="info">
          正在处理请求
        </swc-status-light>
      `,
    ],
    'CJK language'
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(statusLightContent(), 'light', 'ltr')}
    ${theme(statusLightContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(statusLightContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
