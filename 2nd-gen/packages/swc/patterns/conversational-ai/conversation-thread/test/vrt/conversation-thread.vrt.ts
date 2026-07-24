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
import '../../../prompt-field/index.js';
import '../../../response-status/index.js';
import '../../../system-message/index.js';
import '../../../upload-artifact/index.js';
import '../../../user-message/index.js';
import '../../index.js';

import {
  forcedColorsVrtParameters,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Conversational AI/Conversation thread/Conversation thread VRT',
  component: 'swc-conversation-thread',
  tags: ['dev'],
};

export default meta;

const thread = () => html`
  <div style="max-inline-size: 720px;">
    <swc-conversation-thread>
      <swc-conversation-turn type="user">
        <swc-user-message>
          Can you help me create a 45-minute presentation?
        </swc-user-message>
      </swc-conversation-turn>
      <swc-conversation-turn type="system">
        <swc-system-message>
          <swc-response-status slot="status" open>
            I interpreted your request as an executive narrative task.
          </swc-response-status>
          <div class="swc-Typography--prose">
            <h3>Big idea: The warmth of welcome</h3>
            <p>
              Hospitality begins the moment customers set foot off their plane.
            </p>
          </div>
          <swc-message-feedback
            slot="feedback"
            status="positive"
          ></swc-message-feedback>
          <swc-message-sources slot="sources" open>
            <a href="#">Brand brief Q1 2026</a>
          </swc-message-sources>
        </swc-system-message>
      </swc-conversation-turn>
      <swc-conversation-turn type="user">
        <swc-user-message type="card">
          <div slot="thumbnail" role="img" aria-label="File"></div>
          <span slot="title">Hilton commercial assets</span>
          <span slot="subtitle">2026</span>
        </swc-user-message>
      </swc-conversation-turn>
      <swc-prompt-field label="Prompt" value="Shorten that into three slides.">
        <swc-upload-artifact slot="artifact" type="card" dismissible>
          <div slot="thumbnail" role="img" aria-label="PDF"></div>
          <span slot="title">Brand guidelines</span>
          <span slot="subtitle">PDF</span>
        </swc-upload-artifact>
      </swc-prompt-field>
    </swc-conversation-thread>
  </div>
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(thread(), 'light', 'ltr')} ${theme(thread(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(thread(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
