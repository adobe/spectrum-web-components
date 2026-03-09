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
 * Accessibility tests for Divider component (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('Divider - ARIA Snapshots', () => {
  test('should have correct accessibility tree for overview', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-divider--overview',
      'swc-divider'
    );
    await expect(root).toMatchAriaSnapshot(`
      - separator
    `);
  });

  test('should handle anatomy story', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-divider--anatomy',
      'swc-divider'
    );
    await expect(root).toMatchAriaSnapshot(`
      - separator
    `);
  });

  test('should handle different sizes', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-divider--sizes',
      'swc-divider'
    );
    await expect(root).toMatchAriaSnapshot(`
      - separator
    `);
  });

  test('should handle vertical orientation', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-divider--vertical',
      'swc-divider'
    );
    await expect(root).toMatchAriaSnapshot(`
      - separator
    `);
  });

  test('should handle static colors', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-divider--static-colors',
      'swc-divider'
    );
    await expect(root).toMatchAriaSnapshot(`
      - separator
    `);
  });
});
