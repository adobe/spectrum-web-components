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

import {
  ACTION_BUTTON_STATIC_COLORS,
  ACTION_BUTTON_VALID_SIZES,
} from '@adobe/spectrum-wc-core/components/action-button';

import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';
import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import {
  forcedColorsVrtParameters,
  forcePseudoStates,
  row,
  staticColorBackground,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import { Arrow100Icon } from '../../../icon/elements/Arrow100Icon.js';

const meta: Meta = {
  title: 'Action Button/Action Button VRT',
  component: 'swc-action-button',
  tags: ['dev'],
};

export default meta;

const forceActionButtonStates = forcePseudoStates(
  'swc-action-button',
  'button'
);

const icon = () => html`
  <swc-icon slot="icon" aria-hidden="true">${Arrow100Icon()}</swc-icon>
`;

const actionButton = ({
  label = 'Edit',
  size = 'm',
  quiet = false,
  disabled = false,
  pending = false,
  iconOnly = false,
  staticColor,
  state,
}: {
  label?: string;
  size?: (typeof ACTION_BUTTON_VALID_SIZES)[number];
  quiet?: boolean;
  disabled?: boolean;
  pending?: boolean;
  iconOnly?: boolean;
  staticColor?: (typeof ACTION_BUTTON_STATIC_COLORS)[number];
  state?: string;
} = {}) => html`
  <swc-action-button
    size=${size}
    static-color=${staticColor ?? nothing}
    data-force-state=${state ?? nothing}
    accessible-label=${iconOnly ? label : nothing}
    ?quiet=${quiet}
    ?disabled=${disabled}
    ?pending=${pending}
  >
    ${icon()}${iconOnly ? nothing : label}
  </swc-action-button>
`;

const actionButtonContent = () => html`
  ${row(
    ACTION_BUTTON_VALID_SIZES.map((size) =>
      actionButton({ size, label: `Size ${size}` })
    ),
    'Sizes'
  )}
  ${row(
    [
      actionButton(),
      actionButton({ quiet: true, label: 'Quiet' }),
      actionButton({ iconOnly: true }),
    ],
    'Anatomy'
  )}
  ${row(
    [
      actionButton({ state: 'hover', label: 'Hover' }),
      actionButton({ state: 'focus-visible', label: 'Focus' }),
      actionButton({ state: 'active', label: 'Active' }),
      actionButton({ disabled: true, label: 'Disabled' }),
      actionButton({ pending: true, label: 'Pending' }),
    ],
    'States'
  )}
  ${row(
    [
      actionButton({ label: '承認ワークフロー', size: 'm' }),
      html`
        <swc-action-button lang="ko" style="max-inline-size: 150px;">
          ${icon()}승인 워크플로 시작
        </swc-action-button>
      `,
      actionButton({ label: '启动审批工作流', quiet: true }),
    ],
    'CJK language'
  )}
  ${ACTION_BUTTON_STATIC_COLORS.map((color) =>
    staticColorBackground(
      row(
        [
          actionButton({ staticColor: color, label: 'Default' }),
          actionButton({ staticColor: color, quiet: true, label: 'Quiet' }),
          actionButton({ staticColor: color, iconOnly: true }),
        ],
        `Static ${color}`
      ),
      color
    )
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(actionButtonContent(), 'light', 'ltr')}
    ${theme(actionButtonContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceActionButtonStates,
};

export const ForcedColors: Story = {
  render: () => theme(actionButtonContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceActionButtonStates,
};
