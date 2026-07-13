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

import '../../../message-feedback/index.js';
import '../../../response-status/index.js';
import '../../../system-message/index.js';
import '../../../user-message/index.js';
import '../../index.js';

import {
  forcedColorsVrtParameters,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Conversational AI/Conversation turn/VRT',
  component: 'swc-conversation-turn',
  tags: ['dev'],
};

export default meta;

const content = () => html`
  <div
    style="display: flex; flex-direction: column; gap: 16px; max-inline-size: 640px;"
  >
    <swc-conversation-turn type="user">
      <swc-user-message>
        Can you summarize the attached campaign assets?
      </swc-user-message>
    </swc-conversation-turn>
    <swc-conversation-turn type="system">
      <swc-system-message>
        <swc-response-status slot="status">
          I grouped the response by audience and channel.
        </swc-response-status>
        <div class="swc-Typography--prose">
          <p>Here is a concise summary based on the files you shared.</p>
        </div>
        <swc-message-feedback slot="feedback"></swc-message-feedback>
      </swc-system-message>
    </swc-conversation-turn>
    <swc-conversation-turn type="user">
      <swc-user-message>承認ワークフローを短くしてください。</swc-user-message>
    </swc-conversation-turn>
  </div>
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
