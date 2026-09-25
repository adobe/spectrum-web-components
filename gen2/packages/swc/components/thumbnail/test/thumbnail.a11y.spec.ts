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
 * Accessibility tests for Thumbnail component
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('Thumbnail - ARIA Snapshots', () => {
  test('should expose img role with alt text for a labeled thumbnail', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-thumbnail--overview',
      'swc-thumbnail'
    );
    await expect(root).toMatchAriaSnapshot(`
      - img "Preview"
    `);
  });

  test('should hide a decorative thumbnail from the accessibility tree', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-thumbnail--accessibility',
      'swc-thumbnail'
    );
    const decorative = root.locator('swc-thumbnail[decorative]');
    await expect(
      decorative,
      'decorative host is marked aria-hidden'
    ).toHaveAttribute('aria-hidden', 'true');

    // `toMatchAriaSnapshot` matches a subset. Absence is covered by the
    // `aria-hidden` and count assertions.
    await expect(
      root.getByRole('img'),
      'only non-decorative thumbnails are exposed'
    ).toHaveCount(2);

    await expect(root).toMatchAriaSnapshot(`
      - img "Preview"
      - button "File preview Upload file" [disabled]:
        - img "File preview"
        - text: Upload file
    `);
  });

  test('should expose correct img role for all size variants', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-thumbnail--sizes',
      'swc-thumbnail'
    );
    await expect(root).toMatchAriaSnapshot(`
      - img "Preview, size 50"
      - img "Preview, size 75"
      - img "Preview, size 100"
      - img "Preview, size 200"
      - img "Preview, size 300"
      - img "Preview, size 400"
      - img "Preview, size 500"
      - img "Preview, size 600"
      - img "Preview, size 700"
      - img "Preview, size 800"
      - img "Preview, size 900"
      - img "Preview, size 1000"
    `);
  });

  test('should stay accessible when embedded in a real disabled parent', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-thumbnail--accessibility',
      'swc-thumbnail'
    );
    const button = root.locator('button');
    await expect(button).toMatchAriaSnapshot(`
      - button "File preview Upload file" [disabled]:
        - img "File preview"
        - text: Upload file
    `);
  });

  test('should expose correct img role for fit variants', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-thumbnail--fit',
      'swc-thumbnail'
    );
    await expect(root).toMatchAriaSnapshot(`
      - img "Preview, fit cover"
      - img "Preview, fit contain"
    `);
  });

  test('should remain in the accessibility tree when a consumer applies its own disabled/selected styling', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-thumbnail--consumer-styled-states',
      'swc-thumbnail'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Preview Layer 1" [disabled]:
        - img "Preview"
        - text: Layer 1
      - button "Preview Layer 2" [pressed]:
        - img "Preview"
        - text: Layer 2
    `);
  });

  test('should not be keyboard focusable', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-thumbnail--overview',
      'swc-thumbnail'
    );
    const thumbnail = root.locator('swc-thumbnail');
    await expect(thumbnail).not.toBeFocused();

    // One press would only prove it isn't first in the tab order.
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      await expect(thumbnail).not.toBeFocused();
    }
  });

  test('should be skipped entirely when tabbing through a story with focusable siblings', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-thumbnail--accessibility',
      'swc-thumbnail'
    );
    const thumbnails = root.locator('swc-thumbnail');
    const count = await thumbnails.count();

    for (let i = 0; i < count + 5; i++) {
      await page.keyboard.press('Tab');
      const focusedIsThumbnail = await page.evaluate(
        () => document.activeElement?.tagName.toLowerCase() === 'swc-thumbnail'
      );
      expect(focusedIsThumbnail, 'focus never lands on a thumbnail').toBe(
        false
      );
    }
  });
});
