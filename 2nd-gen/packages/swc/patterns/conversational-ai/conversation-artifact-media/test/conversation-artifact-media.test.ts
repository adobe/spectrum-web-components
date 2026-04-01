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
import { ConversationArtifactMedia } from '../ConversationArtifactMedia.js';
import {
  meta,
  Overview,
  PreviewOnlyTile,
} from '../stories/conversation-artifact-media.stories.js';

export default {
  ...meta,
  title: 'Conversational AI/Conversation artifact media/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<ConversationArtifactMedia>(
      canvasElement,
      'swc-conversation-artifact-media'
    );

    await step(
      'does not use preview-only layout when title is slotted',
      async () => {
        await el.updateComplete;
        expect(el.hasAttribute('data-preview-only')).toBe(false);
      }
    );
  },
};

export const PreviewOnlyTileTest: Story = {
  ...PreviewOnlyTile,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<ConversationArtifactMedia>(
      canvasElement,
      'swc-conversation-artifact-media'
    );

    await step(
      'uses preview-only layout when title and subtitle are omitted',
      async () => {
        await el.updateComplete;
        expect(el.hasAttribute('data-preview-only')).toBe(true);
      }
    );
  },
};
