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
 * Accessibility tests for IllustratedMessage component (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('IllustratedMessage - ARIA Snapshots', () => {
  test('should have correct accessibility tree for overview', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-illustrated-message--overview',
      'swc-illustrated-message'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading "No results found" [level=2]
    `);
  });

  test('should render correct heading levels for heading-levels story', async ({
    page,
  }) => {
    await gotoStory(
      page,
      'components-illustrated-message--heading-levels',
      'swc-illustrated-message'
    );
    const headings = page.locator('swc-illustrated-message');
    await expect(headings.nth(0).locator('h2')).toBeVisible();
    await expect(headings.nth(1).locator('h3')).toBeVisible();
    await expect(headings.nth(2).locator('h4')).toBeVisible();
  });
});
