/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
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

    await step('renders composed user-message shell', async () => {
      const root = el.shadowRoot;
      expect(root?.querySelector('.swc-UserMessage')).toBeTruthy();
      expect(root?.querySelector('.swc-UserMessage-text-bubble')).toBeTruthy();
    });
  },
};
