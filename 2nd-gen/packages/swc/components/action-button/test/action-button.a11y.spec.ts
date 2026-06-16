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
 * Accessibility tests for ActionButton component (2nd generation).
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('Action Button - ARIA Snapshots', () => {
  test('should have correct accessibility tree for default button', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-action-button--overview',
      'swc-action-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Edit"
    `);
  });

  test('should handle anatomy — label-only, icon+label, and icon-only', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-action-button--anatomy',
      'swc-action-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Label only"
      - button "Icon and label"
      - button "Edit"
    `);
  });

  test('should handle all five sizes including xs', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-action-button--sizes',
      'swc-action-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Extra-small"
      - button "Small"
      - button "Medium"
      - button "Large"
      - button "Extra-large"
    `);
  });

  test('should handle quiet variant — same role, no ARIA change', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-action-button--quiet',
      'swc-action-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Default"
      - button "Quiet"
    `);
  });

  test('should handle disabled state with native disabled attribute', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-action-button--states',
      'swc-action-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Default"
      - button "Disabled" [disabled]
      - button "Pending, busy" [disabled]
    `);
  });

  test('should handle icon-only button with accessible-label', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-action-button--icon-only',
      'swc-action-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Edit"
    `);
  });

  test('should have correct accessibility tree for accessibility story', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-action-button--accessibility',
      'swc-action-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Format"
      - button "Edit"
      - button "Upload in-progress" [disabled]
    `);
  });

  test('should have no aria-pressed — toggle semantics belong on swc-toggle-button', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-action-button--overview',
      'swc-action-button'
    );
    const button = root.locator('swc-action-button').first();
    const internalButton = button.locator('button').first();
    await expect(internalButton).not.toHaveAttribute('aria-pressed');
  });

  test('should have no role attribute on the host element', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-action-button--overview',
      'swc-action-button'
    );
    const host = root.locator('swc-action-button').first();
    await expect(host).not.toHaveAttribute('role');
  });
});

test.describe('Action Button - Keyboard Interactions', () => {
  test('should receive focus via Tab', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-action-button--overview',
      'swc-action-button'
    );
    const button = root.locator('swc-action-button').first();
    await expect(button).not.toBeFocused();
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
  });

  test('should activate on Enter', async ({ page }) => {
    await gotoStory(
      page,
      'components-action-button--overview',
      'swc-action-button'
    );
    await page.evaluate(() => {
      const el = document.querySelector('swc-action-button')!;
      (el as any).__clickCount = 0;
      el.addEventListener('click', () => {
        (el as any).__clickCount++;
      });
    });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    const count = await page.evaluate(
      () => (document.querySelector('swc-action-button') as any).__clickCount
    );
    expect(count, 'Enter fires click event').toBe(1);
  });

  test('should activate on Space', async ({ page }) => {
    await gotoStory(
      page,
      'components-action-button--overview',
      'swc-action-button'
    );
    await page.evaluate(() => {
      const el = document.querySelector('swc-action-button')!;
      (el as any).__clickCount = 0;
      el.addEventListener('click', () => {
        (el as any).__clickCount++;
      });
    });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    const count = await page.evaluate(
      () => (document.querySelector('swc-action-button') as any).__clickCount
    );
    expect(count, 'Space fires click event').toBe(1);
  });

  test('should exclude native-disabled button from tab order', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-action-button--states',
      'swc-action-button'
    );
    const defaultButton = root.locator('swc-action-button').nth(0);
    const disabledButton = root.locator('swc-action-button').nth(1);
    const pendingButton = root.locator('swc-action-button').nth(2);

    // First Tab: lands on the default button
    await page.keyboard.press('Tab');
    await expect(defaultButton).toBeFocused();

    // Second Tab: native-disabled button is skipped, pending button gets focus
    await page.keyboard.press('Tab');
    await expect(disabledButton).not.toBeFocused();
    await expect(pendingButton).toBeFocused();
  });

  test('should not activate when pending', async ({ page }) => {
    await gotoStory(
      page,
      'components-action-button--states',
      'swc-action-button'
    );
    await page.evaluate(() => {
      const pending = document.querySelectorAll('swc-action-button')[2] as any;
      pending.__clickCount = 0;
      pending.addEventListener('click', () => {
        pending.__clickCount++;
      });
    });

    // Tab twice: default → pending (native-disabled is skipped)
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    const count = await page.evaluate(
      () =>
        (document.querySelectorAll('swc-action-button')[2] as any).__clickCount
    );
    expect(count, 'Enter does not activate a pending button').toBe(0);
  });
});
