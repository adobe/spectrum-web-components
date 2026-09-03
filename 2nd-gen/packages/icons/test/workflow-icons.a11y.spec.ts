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

import { gotoStory } from '../../swc/utils/a11y-helpers.js';

/**
 * Accessibility tests for the public workflow icons (2nd Generation).
 *
 * These validate the host-owned accessibility contract inherited from `IconBase`: a
 * labeled icon is exposed as an image, an unlabeled icon is decorative and hidden from
 * the accessibility tree. aXe WCAG compliance runs separately via test-storybook.
 */
test.describe('Workflow icons - accessibility', () => {
  test('exposes a labeled icon as an img and hides a decorative one', async ({
    page,
  }) => {
    await gotoStory(
      page,
      'icons-workflow-icons--accessibility',
      'swc-icon-alert-triangle'
    );

    // The labeled icon is exposed as a single image carrying its accessible label.
    await expect(page.getByRole('img', { name: 'Warning' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'Warning' })).toHaveCount(1);

    // The decorative icon (empty label) marks itself aria-hidden, so it is not exposed.
    await expect(
      page.locator('swc-icon-alert-triangle[accessible-label=""]')
    ).toHaveAttribute('aria-hidden', 'true');
  });

  test('exposes each featured icon in the overview with its label', async ({
    page,
  }) => {
    await gotoStory(page, 'icons-workflow-icons--overview', 'swc-icon-star');

    // Every featured icon is labeled, so all are exposed as images.
    await expect(page.getByRole('img', { name: 'star' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'folder' })).toBeVisible();
  });
});
