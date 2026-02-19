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
 * Accessibility tests for Status Light component (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are handled automatically
 * by the Storybook test-runner (see .storybook/test-runner.ts).
 *
 * IMPORTANT LIMITATION: ARIA snapshots only capture the FIRST element
 * =====================
 * For stories that render multiple instances (Sizes, SemanticVariants, etc.),
 * the ARIA snapshot will only validate the first element's accessibility tree.
 * This is a known limitation of the `gotoStory` helper which returns `.first()`.
 *
 * However, ALL elements are still validated for WCAG compliance by the
 * automatic test-runner, which uses axe-core to check every element in the story.
 *
 * Note: The neutral variant has a known color contrast issue (4.39 vs 4.5:1 required)
 * which is handled via story parameters (see status-light.stories.ts) to exclude only
 * that specific variant from color-contrast validation.
 *
 * Note: Uses the same test helpers as 1st gen - they work for both!
 * Key differences:
 * - Story IDs: 'components-status-light--default' (vs 'statuslight--m' in 1st gen)
 * - Element name: 'swc-status-light' (vs 'sp-status-light' in 1st gen)
 * - Storybook port: 6006 (vs 8080 in 1st gen) - handled by Playwright projects
 */

test.describe('Status Light - ARIA Snapshots', () => {
  test('should have correct accessibility tree structure', async ({ page }) => {
    const statusLight = await gotoStory(
      page,
      'components-status-light--overview',
      'swc-status-light'
    );
    await expect(statusLight).toMatchAriaSnapshot();
  });

  test('should handle semantic variants', async ({ page }) => {
    const statusLight = await gotoStory(
      page,
      'components-status-light--semantic-variants',
      'swc-status-light'
    );
    await expect(statusLight).toMatchAriaSnapshot();
  });

  test('should handle non-semantic variants', async ({ page }) => {
    const statusLight = await gotoStory(
      page,
      'components-status-light--non-semantic-variants',
      'swc-status-light'
    );
    await expect(statusLight).toMatchAriaSnapshot();
  });

  test('should reflect different sizes', async ({ page }) => {
    const statusLight = await gotoStory(
      page,
      'components-status-light--sizes',
      'swc-status-light'
    );
    await expect(statusLight).toMatchAriaSnapshot();
  });
});
