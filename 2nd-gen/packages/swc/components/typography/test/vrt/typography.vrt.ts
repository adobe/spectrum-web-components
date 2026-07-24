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
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import {
  SIZES_BY_VARIANT,
  template,
  VARIANTS,
} from '../../stories/typography.template.js';

const meta: Meta = {
  title: 'Typography/Typography VRT',
  tags: ['dev'],
};

export default meta;

const typographyContent = () => html`
  ${row(
    VARIANTS.map((variant) =>
      template({
        variant,
        size: 'M',
        sampleText: `${variant} sample`,
      })
    ),
    'Variants'
  )}
  ${VARIANTS.map((variant) =>
    row(
      SIZES_BY_VARIANT[variant].map((size) =>
        template({ variant, size, sampleText: `${variant} ${size}` })
      ),
      `${variant} sizes`
    )
  )}
  ${row(
    [
      template({
        variant: 'heading',
        serif: true,
        sampleText: 'Serif heading',
      }),
      template({
        variant: 'heading',
        heavy: true,
        sampleText: 'Heavy heading',
      }),
      template({
        variant: 'body',
        emphasized: true,
        sampleText: 'Emphasized body copy.',
      }),
      template({
        variant: 'body',
        margins: true,
        sampleText: 'Body copy with margins.',
      }),
    ],
    'Modifiers'
  )}
  ${row(
    [
      template({
        variant: 'heading',
        lang: 'ja',
        sampleText: '承認ワークフロー',
      }),
      template({
        variant: 'body',
        lang: 'ko',
        sampleText: '승인 워크플로 상태를 확인합니다.',
      }),
      template({
        variant: 'detail',
        lang: 'zh',
        sampleText: '审批工作流状态',
      }),
    ],
    'CJK language'
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(typographyContent(), 'light', 'ltr')}
    ${theme(typographyContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(typographyContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
