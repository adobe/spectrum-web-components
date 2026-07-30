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

import '../swc-pixel-loader.js';

import { getComponent } from '../../../../utils/test-utils.js';
import { PixelLoader } from '../PixelLoader.js';
import { meta, Overview } from '../stories/pixel-loader.stories.js';

export default {
  ...meta,
  title: 'Conversational AI/Pixel loader/Tests',
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
    const el = await getComponent<PixelLoader>(
      canvasElement,
      'swc-pixel-loader'
    );

    await step('renders and upgrades as swc-pixel-loader', async () => {
      expect(el).toBeInstanceOf(PixelLoader);
    });
  },
};
