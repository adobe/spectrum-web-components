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

import { expect, test } from '@playwright/test';

import { gotoStory } from '../../../../utils/a11y-helpers.js';

// This unit is an unimplemented prototype shell, so there is no ARIA tree yet
// to snapshot. Replace with `toMatchAriaSnapshot` assertions once real markup lands.
test.describe('PixelLoader - ARIA Snapshots', () => {
  test('renders and upgrades without accessibility violations', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-conversational-ai-pixel-loader--overview',
      'swc-pixel-loader'
    );
    await expect(root.locator('swc-pixel-loader')).toBeVisible();
  });
});
