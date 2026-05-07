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

import { gotoStory } from '../../../utils/a11y-helpers.js';

/**
 * Accessibility tests for Badge component (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('Badge - ARIA Snapshots', () => {
  test('should have correct accessibility tree for default badge', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-badge--overview',
      'swc-badge'
    );
    await expect(root).toMatchAriaSnapshot(`
      - text: Active
    `);
  });

  test('should handle semantic variants', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-badge--semantic-variants',
      'swc-badge'
    );
    await expect(root).toMatchAriaSnapshot(`
      - text: New Active Archived Approved Pending approval Rejected
    `);
  });

  test('should handle non-semantic variants', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-badge--non-semantic-variants',
      'swc-badge'
    );
    await expect(root).toMatchAriaSnapshot(`
      - text: /Marketing Engineering Design Product Support Busy Available Sales Research Quality Documentation Legal Analytics Security Creative Training Facilities Compliance Version 1\\.\\d+\\.\\d+/
    `);
  });

  test('should handle different sizes', async ({ page }) => {
    const root = await gotoStory(page, 'components-badge--sizes', 'swc-badge');
    await expect(root).toMatchAriaSnapshot(`
      - text: Small Medium Large Extra-large Small Medium Large Extra-large
      - img "Small"
      - img "Medium"
      - img "Large"
      - img "Extra-large"
    `);
  });

  test('should handle outline style', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-badge--outline',
      'swc-badge'
    );
    await expect(root).toMatchAriaSnapshot(`
      - text: New Active Archived Approved Pending approval Rejected
    `);
  });

  test('should handle subtle style', async ({ page }) => {
    const root = await gotoStory(page, 'components-badge--subtle', 'swc-badge');
    await expect(root).toMatchAriaSnapshot(`
      - text: /New Active Archived Approved Pending approval Rejected Marketing Engineering Design Product Support Busy Available Sales Research Quality Documentation Legal Analytics Security Creative Training Facilities Compliance Version 1\\.\\d+\\.\\d+/
    `);
  });

  test('should not be keyboard focusable', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-badge--overview',
      'swc-badge'
    );
    const badge = root.locator('swc-badge');
    await expect(badge).not.toBeFocused();
    await page.keyboard.press('Tab');
    await expect(badge).not.toBeFocused();
  });
});
