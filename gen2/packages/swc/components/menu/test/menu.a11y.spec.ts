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
      - button "Edit" [expanded=false]
    `);
    await expect(root.getByRole('menu')).toHaveCount(0);
  });

  test('open: an internal menu surface holds the rows', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-menu--open-and-close',
      'swc-button'
    );
    await page.getByRole('button', { name: 'Edit' }).click();
    await expect(page.locator('swc-menu')).toHaveJSProperty('open', true);
    // Shows unnamed because Playwright can't see `ariaLabelledByElements`;
    // Chromium resolves it to "Edit". Wiring asserted in menu.test.ts.
    await expect(root).toMatchAriaSnapshot(`
      - button "Edit" [expanded]
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

  // Activating a row closes the menu and restores focus to the trigger. If
  // that happened on keydown, the rest of the same physical press (the
  // repeats, then the keyup) would land on the trigger, which activates and
  // reopens the menu. Holding the key is what exposes it, because the repeats
  // are what reach the refocused trigger. Only trusted input runs the
  // browser's own activation behavior, so this cannot be a play function.
  for (const [name, key] of [
    ['Space', ' '],
    ['Enter', 'Enter'],
  ] as const) {
    test(`a held ${name} on a row activates it once`, async ({ page }) => {
      await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
      const menu = page.locator('swc-menu');
      const trigger = page.getByRole('button', { name: 'Edit' });

      await trigger.click();
      await expect(menu).toHaveJSProperty('open', true);

      // `open` alone is too weak a signal: held Enter used to reopen the menu
      // and then close it again, ending back at `false` while having run a
      // row twice. Counting activations and reopens catches both shapes.
      await page.evaluate(() => {
        const w = window as unknown as Record<string, number>;
        w.__rowClicks = 0;
        w.__reopens = 0;
        document.addEventListener(
          'click',
          (event) => {
            const onRow = event
              .composedPath()
              .some(
                (node) => (node as HTMLElement)?.localName === 'swc-menu-item'
              );
            if (onRow) {
              w.__rowClicks += 1;
            }
          },
          true
        );
        document.querySelector('swc-menu')?.addEventListener('swc-open', () => {
          w.__reopens += 1;
        });
      });

      // No awaits between the presses: a real held key gives the component no
      // gap to settle in, and an await here hides the bug entirely.
      await page.keyboard.down(key);
      await page.keyboard.down(key);
      await page.keyboard.down(key);
      await page.keyboard.up(key);

      const counts = await page.evaluate(() => {
        const w = window as unknown as Record<string, number>;
        return { rowClicks: w.__rowClicks, reopens: w.__reopens };
      });
      expect(counts.rowClicks, 'the row activates exactly once').toBe(1);
      expect(counts.reopens, 'the menu never reopens').toBe(0);
      await expect(menu).toHaveJSProperty('open', false);
      await expect(trigger).toBeFocused();
    });

    test(`a single ${name} on a row closes the menu once`, async ({ page }) => {
      await gotoStory(page, 'components-menu--open-and-close', 'swc-button');
      const menu = page.locator('swc-menu');
      const trigger = page.getByRole('button', { name: 'Edit' });

      await trigger.click();
      await expect(menu).toHaveJSProperty('open', true);

      await page.keyboard.press(key);

      await expect(menu).toHaveJSProperty('open', false);
      await expect(trigger).toBeFocused();
    });
  }

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
