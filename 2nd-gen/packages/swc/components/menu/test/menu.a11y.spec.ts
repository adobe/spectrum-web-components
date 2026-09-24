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
 * Playwright tests for Menu (2nd Generation): ARIA-tree snapshots of the closed
 * and open states, plus native light-dismiss behavior (Escape and outside click).
 *
 * Native light-dismiss needs trusted browser input, which the Storybook play
 * functions in `menu.test.ts` cannot produce, so it lives here rather than as a
 * play function. Synthetic interaction (click-to-toggle, focus, arrow-key
 * navigation, programmatic open/close) stays in `menu.test.ts`. aXe WCAG
 * compliance and color-contrast validation run via test-storybook (see
 * `.storybook/test-runner.ts`).
 */

test.describe('Menu - ARIA snapshots', () => {
  test('closed: the trigger exposes a collapsed menu control', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-menu--open-and-close',
      'swc-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Edit"
    `);
  });

  test('open: an internal menu surface holds the rows', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-menu--open-and-close',
      'swc-button'
    );
    await page.getByRole('button', { name: 'Edit' }).click();
    await expect(page.locator('swc-menu')).toHaveJSProperty('open', true);
    await expect(root).toMatchAriaSnapshot(`
      - button "Edit"
      - menu:
        - menuitem "Cut"
        - menuitem "Copy"
        - menuitem "Paste"
    `);
  });

  test('the trigger exposes aria-haspopup="menu" and aria-expanded', async ({
    page,
  }) => {
    await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
    const trigger = page.getByRole('button', { name: 'Edit' });

    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await trigger.click();
    await expect(page.locator('swc-menu')).toHaveJSProperty('open', true);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});

/**
 * Native light-dismiss (`popover="auto"` Escape/outside-click) is only
 * triggered by trusted browser input, which the Storybook play functions
 * cannot produce. These drive real keyboard/pointer input through Playwright
 * against the published component stories (which exist in every Storybook
 * mode, unlike the dev-only `*.test.ts` fixtures).
 */
test.describe('Menu - native dismissal', () => {
  test('Escape closes the menu and returns focus to the trigger', async ({
    page,
  }) => {
    await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
    const menu = page.locator('swc-menu');
    const trigger = page.getByRole('button', { name: 'Edit' });

    await trigger.click();
    await expect(menu).toHaveJSProperty('open', true);
    // Opening moves focus onto the first row; escaping should close the menu
    // and hand focus back to the trigger.
    await page.keyboard.press('Escape');
    await expect(menu).toHaveJSProperty('open', false);
    await expect(trigger).toBeFocused();
  });

  test('an outside click closes the menu', async ({ page }) => {
    await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
    const menu = page.locator('swc-menu');
    const trigger = page.getByRole('button', { name: 'Edit' });

    await trigger.click();
    await expect(menu).toHaveJSProperty('open', true);
    // A trusted pointer press in the empty top-left corner is outside the
    // menu and its trigger, so it light-dismisses.
    await page.mouse.click(2, 2);
    await expect(menu).toHaveJSProperty('open', false);
  });

  // Regression test for the reopen guard: pressing the trigger again while
  // open light-dismisses the menu before the trailing click fires, so a
  // naive `open = !open` handler would read `open` as already false and
  // flip it back to true instead of leaving it closed. Needs a real,
  // trusted click; synthetic play-function clicks don't trigger native
  // light-dismiss at all.
  test('clicking the trigger again while open closes it instead of reopening it', async ({
    page,
  }) => {
    await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
    const menu = page.locator('swc-menu');
    const trigger = page.getByRole('button', { name: 'Edit' });

    await trigger.click();
    await expect(menu).toHaveJSProperty('open', true);

    await trigger.click();
    await expect(menu).toHaveJSProperty('open', false);
  });
});
