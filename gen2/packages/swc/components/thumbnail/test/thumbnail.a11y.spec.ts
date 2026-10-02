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
      'standalone and in-button decorative thumbnails'
    ).toHaveCount(2);
    for (const thumbnail of await decorative.all()) {
      await expect(
        thumbnail,
        'decorative host is marked aria-hidden'
      ).toHaveAttribute('aria-hidden', 'true');
    }

    // `toMatchAriaSnapshot` matches a subset. Absence is covered by the
    // `aria-hidden` and count assertions.
    await expect(
      root.getByRole('img'),
      'only the non-decorative thumbnail is exposed'
    ).toHaveCount(1);

    await expect(root).toMatchAriaSnapshot(`
      - img "Preview"
      - button "Upload file" [disabled]
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
    // The decorative thumbnail keeps its preview out of the button's name.
    const button = root.locator('button');
    await expect(button).toMatchAriaSnapshot(`
      - button "Upload file" [disabled]
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

  test('should leave disabled and selected states to the parent controls', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-thumbnail--consumer-styled-states',
      'swc-thumbnail'
    );
    await expect(
      root.getByRole('img'),
      'thumbnails inside the controls are decorative'
    ).toHaveCount(0);

    await expect(root).toMatchAriaSnapshot(`
      - button "Layer 1"
      - button "Consumer-styled focus example" [disabled]
      - group "Active layer":
        - radio "Option 1" [checked]
        - radio "Option 2"
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

  test('should be skipped when tabbing through the controls that contain it', async ({
    page,
  }) => {
    await gotoStory(
      page,
      'components-thumbnail--consumer-styled-states',
      'swc-thumbnail'
    );

    const focusedTags: string[] = [];
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      focusedTags.push(
        await page.evaluate(
          () => document.activeElement?.tagName.toLowerCase() ?? ''
        )
      );
    }

    expect(focusedTags, 'focus reaches the enabled controls').toEqual(
      expect.arrayContaining(['swc-action-button', 'input'])
    );
    expect(focusedTags, 'focus never lands on a thumbnail').not.toContain(
      'swc-thumbnail'
    );
  });
});
