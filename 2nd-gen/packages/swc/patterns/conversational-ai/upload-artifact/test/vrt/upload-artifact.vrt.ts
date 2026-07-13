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

import '../../index.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Conversational AI/Upload artifact/VRT',
  component: 'swc-upload-artifact',
  tags: ['dev'],
};

export default meta;

const card = (title: string, subtitle = 'PDF', dismissible = false) => html`
  <swc-upload-artifact type="card" ?dismissible=${dismissible}>
    <div slot="thumbnail" role="img" aria-label="File thumbnail"></div>
    <span slot="title">${title}</span>
    <span slot="subtitle">${subtitle}</span>
  </swc-upload-artifact>
`;

const media = (dismissible = false) => html`
  <swc-upload-artifact type="media" ?dismissible=${dismissible}>
    <div
      slot="thumbnail"
      style="inline-size: 100%; block-size: 100%; min-block-size: 120px; background: linear-gradient(135deg, #6366f1, #ec4899);"
      role="img"
      aria-label="Campaign still"
    ></div>
  </swc-upload-artifact>
`;

const content = () => html`
  ${row(
    [
      card('Brand guidelines'),
      card('Hilton commercial assets', '2026', true),
      media(true),
    ],
    'Types'
  )}
  ${row(
    [
      html`
        <div style="max-inline-size: 280px;">
          ${card(
            'Hotel commercial assets for marketing campaign Q1-Q2 regional rollout',
            '2026 fiscal year planning deck and executive summary',
            true
          )}
        </div>
      `,
      card('承認ワークフロー資料', 'PDF', true),
    ],
    'Overflow and CJK'
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(content(), 'light', 'ltr')} ${theme(content(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(content(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
