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
 * Accessibility tests for Progress Circle component (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('Progress Circle - ARIA Snapshots', () => {
  test('should have correct accessibility tree for overview', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-progress-circle--overview',
      'swc-progress-circle'
    );
    await expect(root).toMatchAriaSnapshot(`
      - progressbar "Uploading document":
        - img
    `);
  });

  test('should handle anatomy story with different progress values', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-progress-circle--anatomy',
      'swc-progress-circle'
    );
    await expect(root).toMatchAriaSnapshot(`
      - progressbar "Starting upload":
        - img
    `);
  });

  test('should handle different sizes', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-progress-circle--sizes',
      'swc-progress-circle'
    );
    await expect(root).toMatchAriaSnapshot(`
      - progressbar "Processing small item":
        - img
    `);
  });

  test('should handle static colors', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-progress-circle--static-colors',
      'swc-progress-circle'
    );
    await expect(root).toMatchAriaSnapshot(`
      - progressbar "Processing media":
        - img
    `);
  });

  test('should handle progress values', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-progress-circle--progress-values',
      'swc-progress-circle'
    );
    await expect(root).toMatchAriaSnapshot(`
      - progressbar "Starting download":
        - img
    `);
  });

  test('should handle indeterminate state', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-progress-circle--indeterminate',
      'swc-progress-circle'
    );
    await expect(root).toMatchAriaSnapshot(`
      - progressbar "Processing request":
        - img
    `);
  });
});
