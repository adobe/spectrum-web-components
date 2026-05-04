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

import { getComponent } from '../../../../utils/test-utils.js';
import { meta, Overview } from '../stories/system-message.stories.js';
import { SystemMessage } from '../SystemMessage.js';

export default {
  ...meta,
  title: 'Conversational AI/System message/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<SystemMessage>(
      canvasElement,
      'swc-system-message'
    );

    await step('element is defined and rendered', async () => {
      expect(el).toBeDefined();
      expect(el.shadowRoot).toBeTruthy();
    });

    await step(
      'shadow slots are in fixed document order (status → body → feedback → sources → suggestions)',
      async () => {
        const shadow = el.shadowRoot;
        if (!shadow) {
          throw new Error('swc-system-message: expected shadow root');
        }
        const slots = [...shadow.querySelectorAll('slot')];
        const slotNames = slots.map((slot) => slot.getAttribute('name') ?? '');
        expect(slotNames).toEqual([
          'status',
          '',
          'feedback',
          'sources',
          'suggestions',
        ]);
      }
    );
  },
};
