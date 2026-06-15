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
 * Accessibility tests for Close Button component (2nd Generation).
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('Close Button - ARIA Snapshots', () => {
  test('should expose a named dismiss button in the overview story', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-close-button--overview',
      'swc-close-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Close"
    `);
  });

  test('should handle anatomy story', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-close-button--anatomy',
      'swc-close-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Close"
    `);
  });

  test('should handle different sizes', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-close-button--sizes',
      'swc-close-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Close (s)"
      - button "Close (m)"
      - button "Close (l)"
      - button "Close (xl)"
    `);
  });

  test('should handle static colors', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-close-button--static-colors',
      'swc-close-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Close (white)"
      - button "Close (black)"
    `);
  });

  test('should handle default and disabled states', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-close-button--states',
      'swc-close-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Close"
      - button "Close" [disabled]
    `);
  });

  test('should handle accessibility story naming patterns', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-close-button--accessibility',
      'swc-close-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Close"
      - button "Dismiss"
      - button "Close dialog"
      - button "Close" [disabled]
    `);
  });
});

test.describe('Close Button - Keyboard', () => {
  test('should route tab focus to the internal button via delegatesFocus', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-close-button--overview',
      'swc-close-button'
    );

    await page.keyboard.press('Tab');

    const focusedTag = await root
      .locator('swc-close-button')
      .first()
      .evaluate((element) => {
        const shadowRoot = element.shadowRoot;
        return shadowRoot?.activeElement?.tagName.toLowerCase();
      });

    expect(focusedTag, 'delegated focus lands on the inner native button').toBe(
      'button'
    );
  });

  test('should skip disabled close button when tabbing through states', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-close-button--states',
      'swc-close-button'
    );

    await page.keyboard.press('Tab');

    const firstButtonFocused = await root
      .locator('swc-close-button')
      .nth(0)
      .evaluate((element) => {
        const shadowRoot = element.shadowRoot;
        const button = shadowRoot?.querySelector('button');
        return shadowRoot?.activeElement === button && !button?.disabled;
      });

    expect(
      firstButtonFocused,
      'first enabled close button receives focus'
    ).toBe(true);

    await page.keyboard.press('Tab');

    const disabledButtonFocused = await root
      .locator('swc-close-button')
      .nth(1)
      .evaluate((element) => {
        const shadowRoot = element.shadowRoot;
        const button = shadowRoot?.querySelector('button');
        return shadowRoot?.activeElement === button;
      });

    expect(
      disabledButtonFocused,
      'disabled close button is not focused after tab'
    ).toBe(false);
  });
});
