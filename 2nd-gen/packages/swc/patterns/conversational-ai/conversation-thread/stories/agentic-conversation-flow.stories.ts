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

import '@adobe/spectrum-wc/patterns/conversational-ai/conversation-thread';
import '@adobe/spectrum-wc/patterns/conversational-ai/conversation-turn';
import '@adobe/spectrum-wc/patterns/conversational-ai/system-message';
import '@adobe/spectrum-wc/patterns/conversational-ai/user-message';
import '@adobe/spectrum-wc/patterns/conversational-ai/response-status';
import './agentic-conversation-flow-demo.js';

import {
  AGENTIC_DEMO_FLOW_STEPS,
  agenticDemoStep,
  executionStepsLabelSlot,
} from '../../agentic-demo-flow-script.js';

const meta: Meta = {
  title: 'Conversational AI/Conversation thread/Agentic flow (demo)',
  component: 'swc-agentic-conversation-flow-demo',
  tags: ['dev'],
  excludeStories: ['meta'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      subtitle:
        'Prompt submit drives agentic response status with timed step progression and rolling header titles.',
    },
  },
};

export { meta };
export default meta;

/** Frozen agentic thread for CI accessibility. {@link LiveFlow} is timed (`!test`). */
export const AgenticFlowAccessibility: Story = {
  tags: ['a11y'],
  render: () => {
    const completeSteps = AGENTIC_DEMO_FLOW_STEPS.map((step) =>
      agenticDemoStep(step, 'complete')
    );

    return html`
      <div
        style="max-width:960px;margin:auto;padding:24px;box-sizing:border-box;"
      >
        <swc-conversation-thread>
          <swc-conversation-turn type="user">
            <swc-user-message>
              Can you help me create a 45-minute presentation?
            </swc-user-message>
          </swc-conversation-turn>
          <swc-conversation-turn type="system">
            <swc-system-message>
              <swc-response-status slot="status" phase="complete" duration="12">
                ${executionStepsLabelSlot} ${completeSteps}
              </swc-response-status>
              <div class="swc-Typography--prose">
                <p>
                  I grouped your request into a presentation outline with three
                  supporting proof points and a concise close.
                </p>
              </div>
            </swc-system-message>
          </swc-conversation-turn>
        </swc-conversation-thread>
      </div>
    `;
  },
};

export const LiveFlow: Story = {
  tags: ['dev', '!test'],
  render: () => html`
    <swc-agentic-conversation-flow-demo></swc-agentic-conversation-flow-demo>
  `,
  parameters: {
    docs: {
      story: {
        height: '640px',
      },
    },
  },
};
