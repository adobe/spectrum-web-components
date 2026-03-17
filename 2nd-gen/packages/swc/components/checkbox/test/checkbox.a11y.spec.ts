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
 * Accessibility tests for Checkbox component (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('Checkbox - ARIA Snapshots', () => {
  test('should have correct accessibility tree for overview', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-checkbox--overview',
      'swc-checkbox'
    );
    await expect(root).toMatchAriaSnapshot(`
      - checkbox "Option 1"
      - checkbox "Option 2"
      - checkbox "Option 3"
    `);
  });

  test('should have correct accessibility tree for default story', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-checkbox--default',
      'swc-checkbox'
    );
    await expect(root).toMatchAriaSnapshot(`
      - checkbox "Checkbox"
    `);
  });

  test('should handle checked state', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-checkbox--checked',
      'swc-checkbox'
    );
    await expect(root).toMatchAriaSnapshot(`
      - checkbox "Checkbox"
    `);
  });

  test('should handle indeterminate state', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-checkbox--indeterminate',
      'swc-checkbox'
    );
    await expect(root).toMatchAriaSnapshot(`
      - checkbox "Indeterminate"
    `);
  });

  test('should handle disabled state', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-checkbox--disabled',
      'swc-checkbox'
    );
    await expect(root).toMatchAriaSnapshot(`
      - checkbox "Disabled checkbox"
    `);
  });

  test('should handle sizes story', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-checkbox--sizes',
      'swc-checkbox'
    );
    await expect(root).toMatchAriaSnapshot(`
      - checkbox "Size s"
      - checkbox "Size m"
      - checkbox "Size l"
      - checkbox "Size xl"
    `);
  });

  test('should handle accessibility story', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-checkbox--accessibility',
      'swc-checkbox'
    );
    await expect(root).toMatchAriaSnapshot(`
      - checkbox "Accept terms"
      - checkbox "Subscribe to newsletter"
    `);
  });
});
