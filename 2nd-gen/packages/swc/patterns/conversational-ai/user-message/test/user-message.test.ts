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

import '../../upload-artifact/index.js';
import '../index.js';

import { getComponent } from '../../../../utils/test-utils.js';
import { meta, Overview } from '../stories/user-message.stories.js';
import { UserMessage } from '../UserMessage.js';

export default {
  ...meta,
  title: 'Conversational AI/User message/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<UserMessage>(
      canvasElement,
      'swc-user-message'
    );

    await step('infers copy content by default', async () => {
      expect(el.getAttribute('data-content-kind')).toBe('copy');
    });
  },
};

export const SlotInferenceTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<UserMessage>(
      canvasElement,
      'swc-user-message'
    );

    await step('infers card from slotted card artifact', async () => {
      el.innerHTML = `
        <swc-upload-artifact type="card">
          <span slot="title">Brand guidelines</span>
        </swc-upload-artifact>
      `;
      await el.updateComplete;
      await Promise.resolve();
      expect(el.getAttribute('data-content-kind')).toBe('card');
    });

    await step('infers media from slotted media artifact', async () => {
      el.innerHTML = `
        <div>
          <swc-upload-artifact type="media">
            <div slot="thumbnail" role="img" aria-label="Preview"></div>
          </swc-upload-artifact>
        </div>
      `;
      await el.updateComplete;
      await Promise.resolve();
      expect(el.getAttribute('data-content-kind')).toBe('media');
    });

    await step('falls back to copy for text-only slot content', async () => {
      el.innerHTML = `Can you summarize this document?`;
      await el.updateComplete;
      await Promise.resolve();
      expect(el.getAttribute('data-content-kind')).toBe('copy');
    });
  },
};
