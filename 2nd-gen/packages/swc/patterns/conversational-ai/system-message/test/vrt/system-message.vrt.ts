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
import '../../../message-feedback/index.js';
import '../../../message-sources/index.js';
import '../../../response-status/index.js';
import '../../../suggestion/index.js';
import '../../../suggestion-item/index.js';
import '../../index.js';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Conversational AI/System message/VRT',
  component: 'swc-system-message',
  tags: ['dev'],
};

export default meta;

const message = ({ loading = false, cjk = false } = {}) => html`
  <swc-conversation-turn type="system">
    <swc-system-message>
      <swc-response-status slot="status" ?loading=${loading} open>
        ${cjk
          ? '依頼内容を分析し、要点を整理しました。'
          : 'I prioritized campaign outcomes and next-step actions.'}
      </swc-response-status>
      <div class="swc-Typography--prose">
        <h3>${cjk ? '概要' : 'Executive summary'}</h3>
        <p>
          ${cjk
            ? '共有された資料に基づいて、簡潔な説明構成を作成しました。'
            : 'Here is a concise summary based on the files you shared.'}
        </p>
      </div>
      <swc-message-feedback slot="feedback"></swc-message-feedback>
      <swc-message-sources slot="sources" open>
        <a href="#">Brand brief Q1 2026</a>
        <a href="#">Creative Cloud release notes</a>
      </swc-message-sources>
      <swc-suggestion-group slot="suggestions">
        <h3 slot="heading">What would you like to do next?</h3>
        <swc-suggestion-item>Create a slide deck</swc-suggestion-item>
        <swc-suggestion-item>Summarize in 3 bullets</swc-suggestion-item>
      </swc-suggestion-group>
    </swc-system-message>
  </swc-conversation-turn>
`;

const content = () => html`
  ${row(
    [message(), message({ loading: true }), message({ cjk: true })],
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
