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

import { Toast } from '@adobe/spectrum-wc/toast';

import '@adobe/spectrum-wc/components/toast/swc-toast.js';

import { getComponent } from '../../../utils/test-utils.js';
import meta, { Overview } from '../stories/toast.stories.js';

export default {
  ...meta,
  title: 'Toast/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');

    await step('the custom element is registered', () => {
      expect(customElements.get('swc-toast')).toBe(Toast);
    });

    await step('the element is an instance of Toast', () => {
      expect(toast).toBeInstanceOf(Toast);
    });
  },
};
