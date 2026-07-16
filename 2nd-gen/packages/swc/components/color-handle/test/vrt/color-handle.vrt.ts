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

import '@adobe/spectrum-wc/components/color-handle/swc-color-handle.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Color Handle/Color Handle VRT',
  component: 'swc-color-handle',
  tags: ['dev'],
};

export default meta;

const handle = ({
  label,
  color,
  open = false,
  focused = false,
  disabled = false,
  fill = true,
}: {
  label: string;
  color: string;
  open?: boolean;
  focused?: boolean;
  disabled?: boolean;
  fill?: boolean;
}) => html`
  <div
    style="display: flex; flex-direction: column; align-items: center; gap: 12px;"
  >
    <div
      style="inline-size: 48px; block-size: 96px; display: flex; align-items: flex-end; justify-content: center;"
    >
      <div style="position: relative;">
        <swc-color-handle
          color=${color}
          ?open=${open}
          ?focused=${focused}
          ?disabled=${disabled}
          .fill=${fill}
        ></swc-color-handle>
      </div>
    </div>
    <span style="font-size: 12px;">${label}</span>
  </div>
`;

const colorHandleContent = () => html`
  ${row(
    [
      handle({ label: 'Hex', color: '#1473e6' }),
      handle({ label: 'RGBA', color: 'rgba(44, 62, 224, 0.4)' }),
      handle({ label: 'HSL', color: 'hsl(111 82% 56%)' }),
      handle({ label: 'White', color: 'rgb(255 255 255)' }),
    ],
    'Colors'
  )}
  ${row([handle({ label: 'Open', color: '#1473e6', open: true })], 'Open')}
  ${row(
    [handle({ label: 'Focused', color: '#1473e6', focused: true })],
    'Focused'
  )}
  ${row(
    [handle({ label: 'Disabled', color: '#1473e6', disabled: true })],
    'Disabled'
  )}
  ${row(
    [handle({ label: 'Outline only', color: '#1473e6', fill: false })],
    'Outline only'
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(colorHandleContent(), 'light', 'ltr')}
    ${theme(colorHandleContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(colorHandleContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
