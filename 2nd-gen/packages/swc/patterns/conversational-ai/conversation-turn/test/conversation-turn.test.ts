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

import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../index.js';

import { ConversationTurn } from '../ConversationTurn.js';
import { meta, Overview } from '../stories/conversation-turn.stories.js';

export default {
  ...meta,
  title: 'Conversational AI/Conversation turn/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const els = canvasElement.querySelectorAll('swc-conversation-turn');
    const first = els[0] as ConversationTurn;

    await step('type reflects on host', async () => {
      expect(first.type).toBe('user');
      expect(first.getAttribute('type')).toBe('user');
    });

    await step('type updates when set', async () => {
      first.type = 'system';
      await first.updateComplete;
      expect(first.getAttribute('type')).toBe('system');
    });

    await step('turn host exposes role group and aria-label', async () => {
      first.type = 'user';
      first.accessibleLabel = '';
      await first.updateComplete;

      expect(first.getAttribute('role')).toBe('group');
      expect(first.getAttribute('aria-label')).toBe('User message');

      first.type = 'system';
      await first.updateComplete;
      expect(first.getAttribute('aria-label')).toBe('System message');
    });

    await step('accessible-label overrides type-derived label', async () => {
      first.type = 'system';
      first.accessibleLabel = 'Mensaje del sistema';
      await first.updateComplete;

      expect(first.accessibleLabel).toBe('Mensaje del sistema');
      expect(first.getAttribute('aria-label')).toBe('Mensaje del sistema');

      first.accessibleLabel = '   ';
      await first.updateComplete;
      expect(first.getAttribute('aria-label')).toBe('System message');
    });
  },
};
