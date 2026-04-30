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

/**
 * Accessibility tests for UserMessage pattern (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('UserMessage - ARIA Snapshots', () => {
  test('should have correct accessibility tree for default user message', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-conversational-ai-user-message--overview',
      'swc-user-message'
    );
    await expect(root).toMatchAriaSnapshot(`
      - text: /Can you help me/
    `);
  });

  test('should expose accessible card attachment content', async ({ page }) => {
    const root = await gotoStory(
      page,
      'patterns-conversational-ai-user-message--content',
      'swc-user-message'
    );
    const cardMessage = root.locator('swc-user-message').nth(1);
    await expect(cardMessage).toMatchAriaSnapshot(`
      - img "File"
      - text: Hilton commercial assets 2026
    `);
  });

  test('should expose accessible media attachment content', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-conversational-ai-user-message--content',
      'swc-user-message'
    );
    const mediaMessage = root.locator('swc-user-message').nth(2);
    await expect(mediaMessage).toMatchAriaSnapshot(`
      - img "Campaign preview"
      - text: Hilton commercial assets 2026
    `);
  });
});
