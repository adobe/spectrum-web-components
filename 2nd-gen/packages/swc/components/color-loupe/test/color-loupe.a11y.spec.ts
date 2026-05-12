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
 * Accessibility tests for ColorLoupe component (2nd generation)
 *
 * The color loupe is a purely visual, non-interactive component.
 * Its SVG carries aria-hidden="true" so the loupe graphic is fully
 * hidden from the accessibility tree. These tests assert that
 * attribute directly rather than using toMatchAriaSnapshot, which
 * does not accept an empty string even when the tree is legitimately
 * empty. aXe WCAG compliance and color contrast validation are run
 * via test-storybook (see .storybook/test-runner.ts).
 */

test.describe('ColorLoupe - ARIA Snapshots', () => {
  test('should hide SVG from the accessibility tree for overview', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-color-components-color-loupe--overview',
      'swc-color-loupe'
    );
    await expect(root.locator('svg').first()).toHaveAttribute(
      'aria-hidden',
      'true'
    );
    await expect(root).not.toHaveAttribute('aria-label');
    await expect(root).not.toHaveAttribute('aria-labelledby');
    await expect(root).not.toHaveAttribute('role');
  });

  test('should hide SVG from the accessibility tree for accessibility story', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-color-components-color-loupe--accessibility',
      'swc-color-loupe'
    );
    await expect(root.locator('svg').first()).toHaveAttribute(
      'aria-hidden',
      'true'
    );
    await expect(root).not.toHaveAttribute('aria-label');
    await expect(root).not.toHaveAttribute('aria-labelledby');
    await expect(root).not.toHaveAttribute('role');
  });
});
