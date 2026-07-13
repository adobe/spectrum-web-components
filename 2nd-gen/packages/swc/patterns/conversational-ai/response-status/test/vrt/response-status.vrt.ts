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
  title: 'Conversational AI/Response status/VRT',
  component: 'swc-response-status',
  tags: ['dev'],
};

export default meta;

const content = () => html`
  ${row(
    [
      html`
        <swc-response-status loading></swc-response-status>
      `,
      html`
        <swc-response-status>
          I grouped your request into an executive-ready outline.
        </swc-response-status>
      `,
      html`
        <swc-response-status open>
          Step 1: Review source files. Step 2: Build a concise narrative.
        </swc-response-status>
      `,
      html`
        <swc-response-status complete-label="準備完了">
          プレゼンテーションの構成を作成しました。
        </swc-response-status>
      `,
    ],
    'States'
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
