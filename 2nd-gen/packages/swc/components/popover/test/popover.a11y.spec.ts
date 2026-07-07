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
 * Accessibility tests for Popover component (2nd Generation)
 *
 * Two kinds of coverage the Storybook play-function tests cannot provide:
 * 1. Dismissal via real (trusted) input. Native `popover`/`<dialog>` light
 *    dismiss (Escape, outside click, backdrop click) only fires for trusted
 *    events, which Playwright drives but @storybook/test's synthetic `userEvent`
 *    cannot.
 * 2. ARIA-tree snapshots of the popover in its open states.
 *
 * aXe WCAG compliance and color-contrast validation run separately via
 * test-storybook (see .storybook/test-runner.ts).
 */

test.describe('Popover - dismissal (trusted input)', () => {
  test('default mode: a trigger click opens and Escape closes', async ({
    page,
  }) => {
    await gotoStory(page, 'components-popover--anatomy', 'swc-button');
    const popover = page.locator('swc-popover');

    await page.getByRole('button', { name: 'Open popover' }).click();
    await expect(popover).toHaveJSProperty('open', true);

    await page.keyboard.press('Escape');
    await expect(popover).toHaveJSProperty('open', false);
  });

  test('default mode: an outside click closes the popover', async ({
    page,
  }) => {
    await gotoStory(page, 'components-popover--anatomy', 'swc-button');
    const popover = page.locator('swc-popover');

    await page.getByRole('button', { name: 'Open popover' }).click();
    await expect(popover).toHaveJSProperty('open', true);

    // A press well away from the surface is a native light dismiss.
    await page.mouse.click(5, 5);
    await expect(popover).toHaveJSProperty('open', false);
  });

  test('modal: a backdrop click closes the dialog', async ({ page }) => {
    await gotoStory(page, 'components-popover--modal', 'swc-button');
    const popover = page.locator('swc-popover');

    await page.getByRole('button', { name: 'Open modal' }).click();
    await expect(popover).toHaveJSProperty('open', true);

    // The modal backdrop covers the viewport; a press outside the dialog box
    // (top-left corner) is a backdrop dismiss.
    await page.mouse.click(5, 5);
    await expect(popover).toHaveJSProperty('open', false);
  });

  test('modal: Escape closes the dialog', async ({ page }) => {
    await gotoStory(page, 'components-popover--modal', 'swc-button');
    const popover = page.locator('swc-popover');

    await page.getByRole('button', { name: 'Open modal' }).click();
    await expect(popover).toHaveJSProperty('open', true);

    await page.keyboard.press('Escape');
    await expect(popover).toHaveJSProperty('open', false);
  });
});

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
        - text: Your changes are saved automatically as you edit.
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
