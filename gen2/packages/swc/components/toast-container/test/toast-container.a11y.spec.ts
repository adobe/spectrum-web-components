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

test('the container exposes a counted region with a single named toast', async ({
  page,
}) => {
  await gotoStory(page, 'components-toast-container--overview', 'swc-button');
  await page.getByRole('button', { name: 'Add toast', exact: true }).click();
  const region = page.getByRole('region', { name: '1 notification.' });
  await expect(region).toHaveAttribute('tabindex', '-1');
  await expect(region).toMatchAriaSnapshot(`
    - region "1 notification.":
      - alertdialog "File saved":
        - alert: File saved
        - button "Close"
  `);
});

const openTimedStory = async (
  page: Page,
  storyId = 'components-toast-container--playground'
): Promise<void> => {
  await gotoStory(page, storyId, 'swc-button');
  await page.clock.install({ time: new Date('2026-01-01T00:00:00Z') });
  await page.clock.pauseAt(new Date('2026-01-01T00:00:01Z'));
};

const disableCloseTransition = async (page: Page): Promise<void> => {
  const toast = page.locator('swc-toast');
  await expect(toast).toHaveAttribute('open', '');
  await toast.evaluate((element) => {
    const surface =
      element.shadowRoot!.querySelector<HTMLElement>('.swc-Toast')!;
    surface.style.transition = 'none';
  });
};

test('the region pauses until both pointer and focus leave, then resumes remaining time', async ({
  page,
}) => {
  await openTimedStory(page);
  const add = page.getByRole('button', { name: 'Add toast', exact: true });
  await add.click();
  await disableCloseTransition(page);
  const region = page.getByRole('region');
  await page.clock.runFor(2000);
  await region.dispatchEvent('pointerenter');
  await page.locator('swc-toast').focus();
  await page.clock.runFor(10000);
  await expect(page.locator('swc-toast')).toHaveCount(1);
  await region.dispatchEvent('pointerleave');
  await page.clock.runFor(10000);
  await expect(page.locator('swc-toast')).toHaveCount(1);
  await add.focus();
  await page.clock.runFor(3999);
  await expect(page.locator('swc-toast')).toHaveCount(1);
  await page.clock.runFor(1);
  await expect(page.locator('swc-toast')).toHaveCount(0);
});

for (const source of ['pointer', 'focus'] as const) {
  test(`${source} alone pauses the countdown and resumes the remaining time`, async ({
    page,
  }) => {
    await openTimedStory(page);
    const add = page.getByRole('button', { name: 'Add toast', exact: true });
    await add.click();
    await disableCloseTransition(page);
    const region = page.getByRole('region');
    await page.clock.runFor(2000);
    if (source === 'pointer') {
      await region.dispatchEvent('pointerenter');
    } else {
      await page.locator('swc-toast').focus();
    }
    await page.clock.runFor(10000);
    await expect(page.locator('swc-toast')).toHaveCount(1);
    if (source === 'pointer') {
      await region.dispatchEvent('pointerleave');
    } else {
      await add.focus();
    }
    await page.clock.runFor(3999);
    await expect(page.locator('swc-toast')).toHaveCount(1);
    await page.clock.runFor(1);
    await expect(page.locator('swc-toast')).toHaveCount(0);
  });
}

test('only the front counts down and promotion starts a full timeout', async ({
  page,
}) => {
  await openTimedStory(page);
  const add = page.getByRole('button', { name: 'Add toast', exact: true });
  await add.click();
  await disableCloseTransition(page);
  await page.clock.runFor(5000);
  await add.click();
  await disableCloseTransition(page);
  const region = page.getByRole('region');
  await expect(region).toHaveAttribute('aria-label', '2 notifications.');
  await expect(page.locator('swc-toast')).toHaveCount(1);
  await page.clock.runFor(5999);
  await expect(region).toHaveAttribute('aria-label', '2 notifications.');
  await page.clock.runFor(1);
  await expect(region).toHaveAttribute('aria-label', '1 notification.');
  await disableCloseTransition(page);
  await page.clock.runFor(5999);
  await expect(page.locator('swc-toast')).toHaveCount(1);
  await page.clock.runFor(1);
  await expect(page.locator('swc-toast')).toHaveCount(0);
});

test('a pointer still inside the region keeps the promoted toast paused', async ({
  page,
}) => {
  await openTimedStory(page);
  const add = page.getByRole('button', { name: 'Add toast', exact: true });
  await add.click();
  await disableCloseTransition(page);
  await add.click();
  await disableCloseTransition(page);
  const region = page.getByRole('region');
  await region.dispatchEvent('pointerenter');
  await page.getByRole('button', { name: 'Close newest', exact: true }).click();
  await expect(region).toHaveAttribute('aria-label', '1 notification.');
  await page.clock.runFor(10000);
  await expect(page.locator('swc-toast')).toHaveCount(1);
  await region.dispatchEvent('pointerleave');
  await disableCloseTransition(page);
  await page.clock.runFor(5999);
  await expect(page.locator('swc-toast')).toHaveCount(1);
  await page.clock.runFor(1);
  await expect(page.locator('swc-toast')).toHaveCount(0);
});

test('an emptied region does not retain a stale pointer pause', async ({
  page,
}) => {
  await openTimedStory(page);
  const add = page.getByRole('button', { name: 'Add toast', exact: true });
  await add.click();
  await disableCloseTransition(page);
  await page.getByRole('region').dispatchEvent('pointerenter');
  await page.getByRole('button', { name: 'Clear', exact: true }).click();
  await expect(page.locator('swc-toast')).toHaveCount(0);
  await add.click();
  await disableCloseTransition(page);
  await page.clock.runFor(6000);
  await expect(page.locator('swc-toast')).toHaveCount(0);
});

test('a configured action never auto-dismisses', async ({ page }) => {
  await openTimedStory(page, 'components-toast-container--action');
  await page.getByRole('button', { name: 'Add toast', exact: true }).click();
  await expect(page.locator('swc-toast')).toHaveAttribute('open', '');
  await page.clock.runFor(20000);
  await expect(page.locator('swc-toast')).toHaveAttribute('open', '');
  await expect(
    page.getByRole('button', { name: 'Undo', exact: true })
  ).toBeVisible();
});
