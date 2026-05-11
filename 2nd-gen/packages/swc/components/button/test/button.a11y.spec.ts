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
 * Accessibility tests for Button component (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('Button - ARIA Snapshots', () => {
  test('should have correct accessibility tree for default button', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-button--overview',
      'swc-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Save"
    `);
  });

  test('should handle anatomy — label-only, icon+label, and icon-only', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-button--anatomy',
      'swc-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Label only"
      - button "Icon and label"
      - button "Add"
    `);
  });

  test('should handle disabled state with native disabled attribute', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-button--states',
      'swc-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Default"
      - button "Disabled" [disabled]
      - button "Save, busy" [disabled]
    `);
  });

  test('should handle different sizes', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-button--sizes',
      'swc-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Small"
      - button "Medium"
      - button "Large"
      - button "Extra-large"
    `);
  });

  test('should handle all variants', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-button--variants',
      'swc-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Primary"
      - button "Secondary"
      - button "Accent"
      - button "Negative"
    `);
  });

  test('should handle outline fill-style for primary and secondary', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-button--outline',
      'swc-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Outline Primary"
      - button "Outline Secondary"
    `);
  });

  test('should have correct accessibility tree for accessibility story', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-button--accessibility',
      'swc-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Save document"
      - button "Add item"
      - button "Upload in-progress" [disabled]
    `);
  });
});
