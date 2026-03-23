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
import { ResponseStatus } from '../ResponseStatus.js';
import { meta, Overview } from '../stories/response-status.stories.js';

export default {
  ...meta,
  title: 'Conversational AI/Response status/Tests',
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
    const el = await getComponent<ResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await step('renders with default state', async () => {
      expect(el.state).toBe('loading');
      expect(el.showReasoning).toBe(false);
      expect(el.reasoningExpanded).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: State mutation
// ──────────────────────────────────────────────────────────────

export const StateMutationTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<ResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await step('state reflects to attribute after mutation', async () => {
      el.state = 'loading-complete';
      await el.updateComplete;
      expect(el.getAttribute('state')).toBe('loading-complete');

      el.state = 'loading';
      await el.updateComplete;
      expect(el.getAttribute('state')).toBe('loading');
    });
  },
};
