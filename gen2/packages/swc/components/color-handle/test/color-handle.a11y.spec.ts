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
 * Accessibility tests for the ColorHandle component .
 *
 * The color handle is a non-interactive visual primitive. Name, role, value,
 * and keyboard semantics belong to the parent color picker, so the handle host
 * exposes no role and no accessible name, and its built-in color-loupe keeps
 * its SVG aria-hidden. `gotoStory` returns the Storybook root; assertions
 * must target the handle within it to catch host attribute regressions. We
 * check attributes directly rather than with toMatchAriaSnapshot, which
 * rejects an empty string even when the tree is legitimately empty. aXe WCAG
 * compliance runs via test-storybook.
 */

test.describe('ColorHandle - ARIA', () => {
  test('is role-less and name-less', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-color-handle--overview',
      'swc-color-handle'
    );
    const handle = root.locator('swc-color-handle').first();

    await expect(handle).not.toHaveAttribute('role');
    await expect(handle).not.toHaveAttribute('aria-label');
    await expect(handle).not.toHaveAttribute('aria-labelledby');
    await expect(handle).not.toHaveAttribute('tabindex');
  });

  test('hides the built-in loupe SVG from the a11y tree', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-color-handle--overview',
      'swc-color-handle'
    );
    const handle = root.locator('swc-color-handle').first();
    await expect(handle.locator('swc-color-loupe svg').first()).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  });
});
