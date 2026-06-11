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

import { CloseButton } from '@adobe/spectrum-wc/components/close-button';
import { ButtonBase } from '@spectrum-web-components/core/components/button';

import '@adobe/spectrum-wc/components/close-button/swc-close-button.js';

import { getComponent } from '../../../utils/test-utils.js';
import meta, { Overview } from '../stories/close-button.stories.js';

export default {
  ...meta,
  title: 'Close Button/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const OverviewTest: Story = {
  ...Overview,
};

export const ButtonBaseInstanceofTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const closeButton = await getComponent<CloseButton>(
      canvasElement,
      'swc-close-button'
    );

    await step('is a ButtonBase', async () => {
      expect(
        closeButton instanceof ButtonBase,
        'swc-close-button instanceof ButtonBase'
      ).toBe(true);
    });
  },
};
