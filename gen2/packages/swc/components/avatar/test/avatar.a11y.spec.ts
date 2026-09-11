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
 * Accessibility tests for Avatar component (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('Avatar - ARIA Snapshots', () => {
  test('should expose img role with alt text for a labeled avatar', async ({
    page,
  }) => {
    // Use the Anatomy story (explicit html template) rather than Overview
    // (template(args)) to avoid a timing issue where wc-toolkit sets `alt`
    // as a JS property after first render, leaving the img briefly decorative.
    const root = await gotoStory(
      page,
      'components-avatar--anatomy',
      'swc-avatar'
    );
    await expect(root).toMatchAriaSnapshot(`
      - img "Jane Doe"
    `);
  });

  test('should hide a decorative avatar from the accessibility tree', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-avatar--decorative',
      'swc-avatar'
    );
    // Verify aria-hidden is on the host, then confirm the AT tree is empty.
    const avatar = root.locator('swc-avatar');
    expect(
      await avatar.getAttribute('aria-hidden'),
      'aria-hidden on decorative host'
    ).toBe('true');
    // aria-hidden="true" on the host removes the avatar entirely from the AT.
    await expect(root.getByRole('img')).toHaveCount(0);
  });

  test('should handle both labeled and decorative avatars in the same story', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-avatar--accessibility',
      'swc-avatar'
    );
    // The labeled avatar appears; the decorative one is hidden via aria-hidden.
    await expect(root).toMatchAriaSnapshot(`
      - img "Jane Doe"
    `);
  });

  test('should expose correct img role for all size variants', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-avatar--sizes',
      'swc-avatar'
    );
    await expect(root).toMatchAriaSnapshot(`
      - img "Jane Doe, size 50"
      - img "Jane Doe, size 75"
      - img "Jane Doe, size 100"
      - img "Jane Doe, size 200"
      - img "Jane Doe, size 300"
      - img "Jane Doe, size 400"
      - img "Jane Doe, size 500"
      - img "Jane Doe, size 600"
      - img "Jane Doe, size 700"
      - img "Jane Doe, size 800"
      - img "Jane Doe, size 900"
      - img "Jane Doe, size 1000"
      - img "Jane Doe, size 1100"
      - img "Jane Doe, size 1200"
      - img "Jane Doe, size 1300"
      - img "Jane Doe, size 1400"
      - img "Jane Doe, size 1500"
    `);
  });

  test('should expose correct img role when outline is active', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-avatar--outline',
      'swc-avatar'
    );
    await expect(root).toMatchAriaSnapshot(`
      - img "Jane Doe"
      - img "Jane Doe"
    `);
  });

  test('should remain in the accessibility tree when disabled', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-avatar--disabled',
      'swc-avatar'
    );
    // disabled is purely visual (opacity); the avatar stays accessible.
    await expect(root).toMatchAriaSnapshot(`
      - img "Jane Doe"
    `);
  });

  test('should not be keyboard focusable', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-avatar--overview',
      'swc-avatar'
    );
    const avatar = root.locator('swc-avatar');
    await expect(avatar).not.toBeFocused();
    await page.keyboard.press('Tab');
    await expect(avatar).not.toBeFocused();
  });
});
