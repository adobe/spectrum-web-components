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
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('Status Light - ARIA Snapshots', () => {
  test('should have correct accessibility tree structure', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-status-light--overview',
      'swc-status-light'
    );
    await expect(root).toMatchAriaSnapshot(`
      - text: Archived
    `);
  });

  test('should handle semantic variants', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-status-light--semantic-variants',
      'swc-status-light'
    );
    await expect(root).toMatchAriaSnapshot(`
      - text: Archived Active Approved Rejected Pending approval
    `);
  });

  test('should handle non-semantic variants', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-status-light--non-semantic-variants',
      'swc-status-light'
    );
    await expect(root).toMatchAriaSnapshot(`
      - text: /Marketing Engineering Design Product Support Operations Quality Documentation Analytics Creative Training Facilities Compliance Version 1\\.\\d+\\.\\d+/
    `);
  });

  test('should reflect different sizes', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-status-light--sizes',
      'swc-status-light'
    );
    await expect(root).toMatchAriaSnapshot(`
      - text: Small Medium Large Extra-large
    `);
  });
});
