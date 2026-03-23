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

import { expect, userEvent, within } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../index.js';

import { getComponent } from '../../../../utils/test-utils.js';
import { MessageFeedback } from '../MessageFeedback.js';
import { meta, Overview } from '../stories/message-feedback.stories.js';

export default {
  ...meta,
  title: 'Conversational AI/Message feedback/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<MessageFeedback>(
      canvasElement,
      'swc-message-feedback'
    );

    await step('renders with no selection by default', async () => {
      expect(el.selection).toBe('none');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Interaction
// ──────────────────────────────────────────────────────────────

export const InteractionTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<MessageFeedback>(
      canvasElement,
      'swc-message-feedback'
    );
    const canvas = within(canvasElement);

    await step('clicking thumb-up sets selection', async () => {
      const thumbUpBtn = canvas.getByRole('button', { name: 'Good response' });
      await userEvent.click(thumbUpBtn);
      await el.updateComplete;
      expect(el.selection).toBe('thumb-up');
    });

    await step('clicking thumb-up again toggles back to none', async () => {
      const thumbUpBtn = canvas.getByRole('button', { name: 'Good response' });
      await userEvent.click(thumbUpBtn);
      await el.updateComplete;
      expect(el.selection).toBe('none');
    });

    await step('clicking thumb-down sets selection', async () => {
      const thumbDownBtn = canvas.getByRole('button', {
        name: 'Poor response',
      });
      await userEvent.click(thumbDownBtn);
      await el.updateComplete;
      expect(el.selection).toBe('thumb-down');
    });
  },
};
