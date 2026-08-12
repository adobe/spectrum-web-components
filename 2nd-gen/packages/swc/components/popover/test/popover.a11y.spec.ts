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

import { expect, type Page, test } from '@playwright/test';

import { gotoStory } from '../../../utils/a11y-helpers.js';

/**
 * Playwright tests for Popover (2nd Generation): ARIA-tree snapshots of the open states,
 * plus native light-dismiss behavior (see the second describe block below).
 *
 * Native light-dismiss needs trusted browser input, which the Storybook play functions in
 * `popover.test.ts` cannot produce, so it lives here rather than as a play function. Synthetic
 * interaction (click-to-toggle, focus, programmatic close) stays in `popover.test.ts`. aXe WCAG
 * compliance and color-contrast validation run via test-storybook (see .storybook/test-runner.ts).
 */

test.describe('Popover - ARIA snapshots', () => {
  test('closed: the trigger exposes a collapsed dialog control', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-popover--anatomy',
      'swc-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Open popover"
    `);
  });

  test('open (default mode): a named dialog holds the content', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-popover--anatomy',
      'swc-button'
    );
    await page.getByRole('button', { name: 'Open popover' }).click();
    await expect(page.locator('swc-popover')).toHaveJSProperty('open', true);
    await expect(root).toMatchAriaSnapshot(`
      - button "Open popover"
      - dialog "Autosave":
        - paragraph: Your changes are saved automatically as you edit.
    `);
  });

  test('open (modal mode): a named modal dialog', async ({ page }) => {
    await gotoStory(page, 'components-popover--modal', 'swc-button');
    await page.getByRole('button', { name: 'Open modal' }).click();
    await expect(page.locator('swc-popover')).toHaveJSProperty('open', true);
    await expect(
      page.getByRole('dialog', { name: 'Account settings' })
    ).toBeVisible();
  });
});

/**
 * Native light-dismiss (`popover="auto"` Escape/outside-click, `<dialog>` Escape, and
 * nested dismissal ordering) is only triggered by trusted browser input, which the
 * Storybook play functions cannot produce. These drive real keyboard/pointer input
 * through Playwright against the published component stories (which exist in every
 * Storybook mode, unlike the dev-only `*.test.ts` fixtures).
 */
test.describe('Popover - native dismissal', () => {
  type CloseSourceWindow = Window & { __closeSource?: string };

  const trackCloseSource = (
    page: Page,
    selector = 'swc-popover'
  ): Promise<void> =>
    page.evaluate((sel) => {
      (window as CloseSourceWindow).__closeSource = undefined;
      document.querySelector(sel)?.addEventListener('swc-close', (event) => {
        (window as CloseSourceWindow).__closeSource = (
          event as CustomEvent<{ source: string }>
        ).detail.source;
      });
    }, selector);

  const readCloseSource = (page: Page): Promise<string | undefined> =>
    page.evaluate(() => (window as CloseSourceWindow).__closeSource);

  test('default mode: Escape closes and labels the source "escape"', async ({
    page,
  }) => {
    await gotoStory(page, 'components-popover--anatomy', 'swc-button');
    const popover = page.locator('swc-popover');
    await trackCloseSource(page);

    await page.locator('#anatomy-trigger').click();
    await expect(popover).toHaveJSProperty('open', true);
    await page.keyboard.press('Escape');
    await expect(popover).toHaveJSProperty('open', false);
    expect(await readCloseSource(page)).toBe('escape');
  });

  test('default mode: an outside click closes and labels the source "outside"', async ({
    page,
  }) => {
    await gotoStory(page, 'components-popover--anatomy', 'swc-button');
    const popover = page.locator('swc-popover');
    await trackCloseSource(page);

    await page.locator('#anatomy-trigger').click();
    await expect(popover).toHaveJSProperty('open', true);
    // A trusted pointer press in the empty top-left corner is outside the popover
    // and its trigger, so it light-dismisses.
    await page.mouse.click(2, 2);
    await expect(popover).toHaveJSProperty('open', false);
    expect(await readCloseSource(page)).toBe('outside');
  });

  test('modal mode: Escape closes and labels the source "escape"', async ({
    page,
  }) => {
    await gotoStory(page, 'components-popover--modal', 'swc-button');
    const popover = page.locator('swc-popover');
    await trackCloseSource(page);

    await page.locator('#modal-trigger').click();
    await expect(popover).toHaveJSProperty('open', true);
    await page.keyboard.press('Escape');
    await expect(popover).toHaveJSProperty('open', false);
    expect(await readCloseSource(page)).toBe('escape');
  });

  test('nested (3 levels): Escape peels the topmost popover, ancestor clicks dismiss only descendants', async ({
    page,
  }) => {
    await gotoStory(page, 'components-popover--nested', 'swc-button');
    const outer = page.locator('#nested-outer');
    const inner = page.locator('#nested-inner');
    const innermost = page.locator('#nested-innermost');

    const openAll = async (): Promise<void> => {
      const outerOpen = await outer.evaluate(
        (el) => (el as unknown as { open: boolean }).open
      );
      if (!outerOpen) {
        await page.locator('#nested-outer-trigger').click();
      }
      await expect(outer).toHaveJSProperty('open', true);
      await page.locator('#nested-inner-trigger').click();
      await expect(inner).toHaveJSProperty('open', true);
      await page.locator('#nested-innermost-trigger').click();
      await expect(innermost).toHaveJSProperty('open', true);
      // Nested auto popovers form an ancestor chain, so opening a descendant
      // does not light-dismiss its ancestors.
      await expect(outer).toHaveJSProperty('open', true);
      await expect(inner).toHaveJSProperty('open', true);
    };

    // Escape peels the stack one layer at a time, topmost first.
    await openAll();
    await page.keyboard.press('Escape');
    await expect(innermost).toHaveJSProperty('open', false);
    await expect(inner).toHaveJSProperty('open', true);
    await expect(outer).toHaveJSProperty('open', true);
    await page.keyboard.press('Escape');
    await expect(inner).toHaveJSProperty('open', false);
    await expect(outer).toHaveJSProperty('open', true);
    await page.keyboard.press('Escape');
    await expect(outer).toHaveJSProperty('open', false);

    // A click on the inner content dismisses only its descendant (the innermost).
    await openAll();
    await page.locator('#nested-inner-body').click();
    await expect(innermost).toHaveJSProperty('open', false);
    await expect(inner).toHaveJSProperty('open', true);
    await expect(outer).toHaveJSProperty('open', true);

    // A click on the outer content dismisses everything nested below it.
    await page.locator('#nested-innermost-trigger').click();
    await expect(innermost).toHaveJSProperty('open', true);
    await page.locator('#nested-outer-body').click();
    await expect(innermost).toHaveJSProperty('open', false);
    await expect(inner).toHaveJSProperty('open', false);
    await expect(outer).toHaveJSProperty('open', true);

    // A click fully outside the chain closes every layer.
    await page.locator('#nested-inner-trigger').click();
    await expect(inner).toHaveJSProperty('open', true);
    await page.locator('#nested-innermost-trigger').click();
    await expect(innermost).toHaveJSProperty('open', true);
    await page.locator('#nested-away').click();
    await expect(outer).toHaveJSProperty('open', false);
    await expect(inner).toHaveJSProperty('open', false);
    await expect(innermost).toHaveJSProperty('open', false);
  });
});
