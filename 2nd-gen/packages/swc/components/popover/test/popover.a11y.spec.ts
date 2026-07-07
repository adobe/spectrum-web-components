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
 * Accessibility tests for Popover (2nd Generation): ARIA-tree snapshots of the
 * open states.
 *
 * Behavioral dismissal (Escape, outside/backdrop click) is covered by the
 * play-function tests in `popover.test.ts`, which use `@vitest/browser/context`
 * trusted input to fire native light-dismiss. aXe WCAG compliance and
 * color-contrast validation run via test-storybook (see .storybook/test-runner.ts).
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
