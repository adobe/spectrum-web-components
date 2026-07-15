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

import { METER_VARIANTS } from '@spectrum-web-components/core/components/meter';
import {
  LINEAR_PROGRESS_LABEL_POSITIONS,
  LINEAR_PROGRESS_STATIC_COLORS,
  LINEAR_PROGRESS_VALID_SIZES,
} from '@spectrum-web-components/core/mixins/index.js';

import '@adobe/spectrum-wc/components/meter/swc-meter.js';

import {
  forcedColorsVrtParameters,
  row,
  staticColorBackground,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Meter/Meter VRT',
  component: 'swc-meter',
  tags: ['dev'],
};

export default meta;

const meter = ({
  variant = 'informative',
  size = 'm',
  value = 60,
  labelPosition = 'top',
  staticColor,
  label = 'Storage used',
}: {
  variant?: (typeof METER_VARIANTS)[number];
  size?: (typeof LINEAR_PROGRESS_VALID_SIZES)[number];
  value?: number;
  labelPosition?: (typeof LINEAR_PROGRESS_LABEL_POSITIONS)[number];
  staticColor?: (typeof LINEAR_PROGRESS_STATIC_COLORS)[number];
  label?: string;
}) => html`
  <swc-meter
    variant=${variant}
    size=${size}
    value=${value}
    label-position=${labelPosition}
    static-color=${staticColor ?? ''}
    style="inline-size: 220px;"
  >
    <span slot="label">${label}</span>
    <span slot="description">Add details to reach 100%.</span>
  </swc-meter>
`;

const meterContent = () => html`
  ${row(
    METER_VARIANTS.map((variant) => meter({ variant })),
    'Variants'
  )}
  ${row(
    LINEAR_PROGRESS_VALID_SIZES.map((size) => meter({ size })),
    'Sizes'
  )}
  ${row(
    [0, 25, 50, 75, 100].map((value) => meter({ value, label: `${value}%` })),
    'Values'
  )}
  ${row(
    LINEAR_PROGRESS_LABEL_POSITIONS.map((labelPosition) =>
      meter({ labelPosition })
    ),
    'Label positions'
  )}
  ${row(
    [
      meter({ label: '承認ワークフロー' }),
      meter({ label: '승인 워크플로' }),
      meter({ label: '审批工作流' }),
    ],
    'CJK language'
  )}
  ${LINEAR_PROGRESS_STATIC_COLORS.map((color) =>
    staticColorBackground(
      row(
        [
          meter({ staticColor: color }),
          meter({ staticColor: color, value: 90 }),
        ],
        `Static ${color}`
      ),
      color
    )
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(meterContent(), 'light', 'ltr')}
    ${theme(meterContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(meterContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
