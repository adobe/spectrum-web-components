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
 * aXe WCAG compliance and color contrast validation are handled automatically
 * by the Storybook test-runner (see .storybook/test-runner.ts).
 */

test.describe('Badge - ARIA Snapshots', () => {
  test('should have correct accessibility tree for default badge', async ({
    page,
  }) => {
    const badge = await gotoStory(
      page,
      'components-badge--overview',
      'swc-badge'
    );
    await expect(badge).toMatchAriaSnapshot();
  });

  test('should handle semantic variants', async ({ page }) => {
    const badge = await gotoStory(
      page,
      'components-badge--semantic-variants',
      'swc-badge'
    );
    await expect(badge).toMatchAriaSnapshot();
  });

  test('should handle non-semantic variants', async ({ page }) => {
    const badge = await gotoStory(
      page,
      'components-badge--non-semantic-variants',
      'swc-badge'
    );
    await expect(badge).toMatchAriaSnapshot();
  });

  test('should handle different sizes', async ({ page }) => {
    const badge = await gotoStory(page, 'components-badge--sizes', 'swc-badge');
    await expect(badge).toMatchAriaSnapshot();
  });

  test('should handle outline style', async ({ page }) => {
    const badge = await gotoStory(
      page,
      'components-badge--outline',
      'swc-badge'
    );
    await expect(badge).toMatchAriaSnapshot();
  });

  test('should handle subtle style', async ({ page }) => {
    const badge = await gotoStory(
      page,
      'components-badge--subtle',
      'swc-badge'
    );
    await expect(badge).toMatchAriaSnapshot();
  });
});
