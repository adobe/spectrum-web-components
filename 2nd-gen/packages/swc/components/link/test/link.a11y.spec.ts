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
 * Accessibility tests for Link component (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('Link - ARIA Snapshots', () => {
  test('should have correct accessibility tree for overview', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-link--overview',
      'swc-link'
    );
    await expect(root).toMatchAriaSnapshot(`
      - link "link"
    `);
  });

  test('should have correct accessibility tree for default story', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-link--default',
      'swc-link'
    );
    await expect(root).toMatchAriaSnapshot(`
      - link "link"
    `);
  });

  test('should handle quiet variant', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-link--quiet',
      'swc-link'
    );
    await expect(root).toMatchAriaSnapshot(`
      - link "quiet link"
    `);
  });

  test('should handle secondary variant', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-link--secondary',
      'swc-link'
    );
    await expect(root).toMatchAriaSnapshot(`
      - link "secondary link"
    `);
  });

  test('should handle disabled state', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-link--disabled',
      'swc-link'
    );
    await expect(root).toMatchAriaSnapshot(`
      - link "disabled link"
    `);
  });

  test('should handle static colors story', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-link--static-colors',
      'swc-link'
    );
    await expect(root).toMatchAriaSnapshot(`
      - link "link"
      - link "link"
    `);
  });

  test('should handle accessibility story', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-link--accessibility',
      'swc-link'
    );
    await expect(root).toMatchAriaSnapshot(`
      - link "link"
    `);
  });
});
