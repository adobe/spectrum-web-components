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
 * Accessibility tests for the Menu separator component
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts).
 */

test.describe('Menu separator - ARIA Snapshots', () => {
  for (const story of ['overview', 'anatomy', 'accessibility']) {
    test(`${story}: one separator sits between menu items`, async ({
      page,
    }) => {
      await gotoStory(
        page,
        `components-menu-separator--${story}`,
        'swc-button'
      );
      const menu = page.locator('swc-menu');

      // Play functions don't run on initial render outside Chromatic, so open
      // the menu here; Overview is already open.
      await menu.evaluate((el: HTMLElement & { open: boolean }) => {
        el.open = true;
      });

      await expect(menu.getByRole('separator')).toHaveCount(1);
      await expect(menu).toMatchAriaSnapshot(`
        - menu:
          - menuitem "Cut"
          - menuitem "Copy"
          - separator
          - menuitem "Delete"
      `);
    });
  }

  test('the separator is a direct child of the menu', async ({ page }) => {
    await gotoStory(
      page,
      'components-menu-separator--overview',
      'swc-menu-separator'
    );

    await expect(page.locator('swc-menu > swc-menu-separator')).toHaveCount(1);
  });
});
