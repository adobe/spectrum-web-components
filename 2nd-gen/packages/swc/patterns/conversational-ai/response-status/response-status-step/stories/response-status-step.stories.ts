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

/**
 * Data marker for one agentic execution step. Steps are not rendered on their own;
 * `<swc-response-status>` reads these attributes and paints the timeline.
 *
 * For full agentic UI states, see **Response status → Agentic states (spike)**.
 */
const meta: Meta = {
  title: 'Conversational AI/Response status/Response status step',
  component: 'swc-response-status-step',
  parameters: {
    docs: {
      subtitle:
        'Light DOM step descriptor slotted into `<swc-response-status>`.',
    },
    layout: 'padded',
  },
};

export default meta;

/** Typical usage — steps inside response status (only the parent is visible). */
export const Playground: Story = {
  tags: ['dev'],
  render: () => html`
    <swc-response-status
      phase="processing"
      open
      reasoning-label="Execution steps"
    >
      <swc-response-status-step
        status="complete"
        kind="thinking"
        title="Looked through documentation"
        detail="Prioritizing data from your documents."
      ></swc-response-status-step>
      <swc-response-status-step
        status="active"
        kind="acting"
        title="Searching web for: Carnival cruise trip packages Europe Asia"
        detail="Correlating package availability across regions."
      ></swc-response-status-step>
    </swc-response-status>
  `,
};

export const Overview: Story = {
  tags: ['overview'],
  ...Playground,
};
