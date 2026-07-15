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
  TOOLTIP_PLACEMENTS,
  TOOLTIP_VARIANTS,
} from '@spectrum-web-components/core/components/tooltip';

import '@adobe/spectrum-wc/components/tooltip/swc-tooltip.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Tooltip/Tooltip VRT',
  component: 'swc-tooltip',
  tags: ['dev'],
};

export default meta;

const tooltip = ({
  variant = 'neutral',
  placement = 'top',
  content = 'Tooltip content',
}: {
  variant?: (typeof TOOLTIP_VARIANTS)[number];
  placement?: (typeof TOOLTIP_PLACEMENTS)[number];
  content?: string;
}) => html`
  <div style="position: relative; inline-size: 120px; block-size: 72px;">
    <swc-tooltip open variant=${variant} placement=${placement}>
      ${content}
    </swc-tooltip>
  </div>
`;

const tooltipContent = () => html`
  ${row(
    TOOLTIP_VARIANTS.map((variant) =>
      tooltip({ variant, content: `${variant} tooltip` })
    ),
    'Variants'
  )}
  ${row(
    TOOLTIP_PLACEMENTS.map((placement) => tooltip({ placement })),
    'Placements'
  )}
  ${row(
    [
      tooltip({ content: '承認ワークフローを開始' }),
      tooltip({ content: '승인 워크플로 시작' }),
      tooltip({ content: '启动审批工作流' }),
    ],
    'CJK language'
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(tooltipContent(), 'light', 'ltr')}
    ${theme(tooltipContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(tooltipContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
