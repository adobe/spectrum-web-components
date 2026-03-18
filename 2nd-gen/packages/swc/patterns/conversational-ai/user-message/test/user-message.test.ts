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
import { meta, Overview } from '../stories/user-message.stories.js';
import { UserMessage } from '../UserMessage.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Conversational AI/User message/Tests',
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
    const el = await getComponent<UserMessage>(
      canvasElement,
      'swc-user-message'
    );

    await step('renders with default modality and content', async () => {
      expect(el.modality).toBe('full-screen');
      expect(el.content).toBe('copy');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const PropertyMutationTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<UserMessage>(
      canvasElement,
      'swc-user-message'
    );

    await step('modality reflects to attribute after mutation', async () => {
      el.modality = 'split-right-rail';
      await el.updateComplete;
      expect(el.getAttribute('modality')).toBe('split-right-rail');

      el.modality = 'panel';
      await el.updateComplete;
      expect(el.getAttribute('modality')).toBe('panel');

      el.modality = 'full-screen';
      await el.updateComplete;
      expect(el.getAttribute('modality')).toBe('full-screen');
    });

    await step('content reflects to attribute after mutation', async () => {
      el.content = 'card';
      await el.updateComplete;
      expect(el.getAttribute('content')).toBe('card');

      el.content = 'image';
      await el.updateComplete;
      expect(el.getAttribute('content')).toBe('image');

      el.content = 'copy';
      await el.updateComplete;
      expect(el.getAttribute('content')).toBe('copy');
    });
  },
};
