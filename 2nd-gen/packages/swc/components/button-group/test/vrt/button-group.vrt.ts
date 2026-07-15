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
  BUTTON_GROUP_ALIGNMENTS,
  BUTTON_GROUP_ORIENTATIONS,
  BUTTON_GROUP_SIZES,
} from '@spectrum-web-components/core/components/button-group';

import '@adobe/spectrum-wc/components/button-group/swc-button-group.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Button Group/Button Group VRT',
  component: 'swc-button-group',
  tags: ['dev'],
};

export default meta;

const group = ({
  size = 'm',
  orientation = 'horizontal',
  align = 'start',
  disabled = false,
  cjk = false,
}: {
  size?: (typeof BUTTON_GROUP_SIZES)[number];
  orientation?: (typeof BUTTON_GROUP_ORIENTATIONS)[number];
  align?: (typeof BUTTON_GROUP_ALIGNMENTS)[number];
  disabled?: boolean;
  cjk?: boolean;
}) => html`
  <swc-button-group
    size=${size}
    orientation=${orientation}
    align=${align}
    ?disabled=${disabled}
    style="inline-size: ${align === 'start' ? 'auto' : '420px'};"
  >
    <swc-button>${cjk ? '保存' : 'Save'}</swc-button>
    <swc-button>${cjk ? 'キャンセル' : 'Cancel'}</swc-button>
    <swc-button>${cjk ? 'リセット' : 'Reset'}</swc-button>
  </swc-button-group>
`;

const buttonGroupContent = () => html`
  ${row(
    BUTTON_GROUP_SIZES.map((size) => group({ size })),
    'Sizes'
  )}
  ${row(
    BUTTON_GROUP_ORIENTATIONS.map((orientation) => group({ orientation })),
    'Orientations'
  )}
  ${row(
    BUTTON_GROUP_ALIGNMENTS.map((align) => group({ align })),
    'Alignment'
  )}
  ${row([group({ disabled: true }), group({ cjk: true })], 'States and CJK')}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(buttonGroupContent(), 'light', 'ltr')}
    ${theme(buttonGroupContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(buttonGroupContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
