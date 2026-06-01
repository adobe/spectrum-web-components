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

import { Popover } from '@adobe/spectrum-wc/popover';

import '@adobe/spectrum-wc/components/popover/swc-popover.js';

import { getComponent } from '../../../utils/test-utils.js';
import meta, { Overview } from '../stories/popover.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Popover/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Registration and rendering (Phase 2 scaffold)
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');

    await step('the custom element is registered', () => {
      expect(
        customElements.get('swc-popover'),
        'swc-popover is defined'
      ).toBeTruthy();
    });

    await step('the element is an instance of Popover', () => {
      expect(popover, 'swc-popover renders').toBeInstanceOf(Popover);
    });
  },
};
