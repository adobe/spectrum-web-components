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

    await step('uses copy type by default', async () => {
      expect(el.type).toBe('copy');
      expect(el.getAttribute('type')).toBe('copy');
    });
  },
};

export const TypeAndSlotTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<UserMessage>(
      canvasElement,
      'swc-user-message'
    );

    await step('type reflects to the host and drives card structure', async () => {
      el.type = 'card';
      el.innerHTML = `
        <div
          slot="thumbnail"
          role="img"
          aria-label="File preview"
        ></div>
        <span slot="title">Brand guidelines</span>
        <span slot="subtitle">PDF</span>
      `;
      await el.updateComplete;
      await Promise.resolve();

      const title = el.shadowRoot?.querySelector('.swc-UserMessage-title');
      const subtitle = el.shadowRoot?.querySelector('.swc-UserMessage-subtitle');
      expect(el.getAttribute('type')).toBe('card');
      expect(title).toBeTruthy();
      expect(subtitle).toBeTruthy();
    });

    await step('media type renders the media attachment container', async () => {
      el.type = 'media';
      el.innerHTML = `
        <div slot="thumbnail" role="img" aria-label="Preview"></div>
        <span slot="title">Preview image</span>
        <span slot="subtitle">PNG</span>
      `;
      await el.updateComplete;
      await Promise.resolve();

      const attachment = el.shadowRoot?.querySelector(
        '.swc-UserMessage-attachment--media'
      );
      expect(el.getAttribute('type')).toBe('media');
      expect(attachment).toBeTruthy();
    });

    await step('copy type uses the default slot text path', async () => {
      el.type = 'copy';
      el.innerHTML = `Can you summarize this document?`;
      await el.updateComplete;
      await Promise.resolve();

      const textSlot = el.shadowRoot?.querySelector<HTMLSlotElement>(
        'slot:not([name])'
      );
      const assignedText = textSlot
        ?.assignedNodes({ flatten: true })
        .map((node) => node.textContent ?? '')
        .join('')
        .trim();

      expect(el.getAttribute('type')).toBe('copy');
      expect(assignedText).toBe('Can you summarize this document?');
    });
  },
};
