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

import '../../../conversation-turn/index.js';
import '../../index.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Conversational AI/User message/User message VRT',
  component: 'swc-user-message',
  tags: ['dev'],
};

export default meta;

const turn = (message: unknown) => html`
  <swc-conversation-turn type="user">${message}</swc-conversation-turn>
`;

const content = () => html`
  ${row(
    [
      turn(html`
        <swc-user-message>
          Can you create a 45-minute executive presentation?
        </swc-user-message>
      `),
      turn(html`
        <swc-user-message type="card">
          <div slot="thumbnail" role="img" aria-label="File"></div>
          <span slot="title">Hilton commercial assets</span>
          <span slot="subtitle">2026</span>
        </swc-user-message>
      `),
      turn(html`
        <swc-user-message type="media">
          <div
            slot="thumbnail"
            style="background: linear-gradient(135deg, #a78bfa, #f472b6);"
            role="img"
            aria-label="Campaign preview"
          ></div>
        </swc-user-message>
      `),
    ],
    'Types'
  )}
  ${row(
    [
      turn(html`
        <swc-user-message>
          承認ワークフローを3つの要点に要約してください。
        </swc-user-message>
      `),
      turn(html`
        <swc-user-message style="max-inline-size: 280px;">
          Can you shorten this into a concise summary for the executive review?
        </swc-user-message>
      `),
    ],
    'CJK and wrapping'
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
