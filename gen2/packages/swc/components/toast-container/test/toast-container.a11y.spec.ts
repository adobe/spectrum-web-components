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
  // The host's name comes from ElementInternals, which Playwright's snapshots cannot see (see toast.a11y.spec.ts).
  await expect(region).toMatchAriaSnapshot(`
    - region "1 notification.":
      - alertdialog:
        - alert:
          - img "Success"
          - text: File saved
        - button "Close"
  `);
});

const openTimedStory = async (
  page: Page,
  storyId = 'components-toast-container--auto-dismiss'
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

// Runs on the real clock: Playwright's fake clock also stops requestAnimationFrame,
// which hid the stuck countdown this test guards against.
test('closing the focused toast with the keyboard focuses the promoted toast, which auto-dismisses once focus leaves', async ({
  page,
}) => {
  await gotoStory(
    page,
    'components-toast-container--auto-dismiss',
    'swc-button'
  );
  const add = page.getByRole('button', { name: 'Add toast', exact: true });
  await add.click();
  await page.waitForTimeout(1500);
  await add.click();
  const region = page.getByRole('region');
  await expect(region).toHaveAttribute('aria-label', '2 notifications.');
  await page.waitForTimeout(1500);
  await add.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(region).toHaveAttribute('aria-label', '1 notification.');
  await expect(page.locator('swc-toast')).toBeFocused();
  // Moving focus out of the region resumes the countdown, which then dismisses the promoted toast.
  await add.focus();
  await expect(page.locator('swc-toast')).toHaveCount(0, { timeout: 10000 });
});

test('closing the focused toast with a pointer leaves the region and gives the promoted toast a full timeout', async ({
  page,
}) => {
  await openTimedStory(page);
  const add = page.getByRole('button', { name: 'Add toast', exact: true });
  await add.click();
  await add.click();
  const region = page.getByRole('region');
  await expect(region).toHaveAttribute('aria-label', '2 notifications.');
  await disableCloseTransition(page);
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(region).toHaveAttribute('aria-label', '1 notification.');
  await expect(add).toBeFocused();
  await page.mouse.move(0, 0);
  await disableCloseTransition(page);
  await page.clock.runFor(5999);
  await expect(page.locator('swc-toast')).toHaveCount(1);
  await page.clock.runFor(1);
  await expect(page.locator('swc-toast')).toHaveCount(0);
});

test('the stack exposes one named toast; the layers behind it are not in the accessibility tree', async ({
  page,
}) => {
  await gotoStory(page, 'components-toast-container--overview', 'swc-button');
  const add = page.getByRole('button', { name: 'Add toast', exact: true });
  await add.click();
  await add.click();
  await add.click();
  const region = page.getByRole('region', { name: '3 notifications.' });
  // The host's name comes from ElementInternals, which Playwright's snapshots cannot see (see toast.a11y.spec.ts).
  await expect(region).toMatchAriaSnapshot(`
    - region "3 notifications.":
      - alertdialog:
        - alert:
          - img "Success"
          - text: File saved (3)
        - button "Close"
  `);
  await expect(page.getByRole('alertdialog')).toHaveCount(1);
  await expect(page.locator('.swc-ToastContainer-layer')).toHaveCount(2);
});

test('Tab only reaches the front toast, never a layer or a queued toast behind it', async ({
  page,
}) => {
  await gotoStory(page, 'components-toast-container--overview', 'swc-button');
  const add = page.getByRole('button', { name: 'Add toast', exact: true });
  for (let count = 0; count < 4; count += 1) {
    await add.click();
  }
  await expect(page.getByRole('region')).toHaveAttribute(
    'aria-label',
    '4 notifications.'
  );
  await add.focus();
  // Enough presses to pass every stop on the page and wrap around.
  const stops: { inToast: boolean; inLayer: boolean; inRegion: boolean }[] = [];
  for (let press = 0; press < 8; press += 1) {
    await page.keyboard.press('Tab');
    stops.push(
      await page.evaluate(() => {
        let active: Element | null = document.activeElement;
        while (active?.shadowRoot?.activeElement) {
          active = active.shadowRoot.activeElement;
        }
        // Walks up through slots and shadow hosts.
        const closest = (selector: string): Element | null => {
          let node: Element | null = active;
          while (node) {
            if (node.matches(selector)) {
              return node;
            }
            node =
              node.assignedSlot ??
              node.parentElement ??
              (node.getRootNode() as ShadowRoot).host ??
              null;
          }
          return null;
        };
        return {
          inToast: Boolean(closest('swc-toast')),
          inLayer: Boolean(closest('.swc-ToastContainer-layer')),
          inRegion: Boolean(closest('swc-toast-container')),
        };
      })
    );
  }
  // Without this, a page where Tab never reached the toast would pass.
  expect(stops.filter((stop) => stop.inToast).length).toBeGreaterThanOrEqual(2);
  for (const stop of stops) {
    expect(stop.inLayer).toBe(false);
    if (stop.inRegion) {
      expect(stop.inToast).toBe(true);
    }
  }
});

test('a pointer still inside the region keeps the promoted toast paused', async ({
  page,
}) => {
  await openTimedStory(
    page,
    'components-toast-container--programmatic-close-fixture'
  );
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
  // The Action story has no timeout, so the URL supplies the one an action must ignore.
  await openTimedStory(
    page,
    'components-toast-container--action&args=timeout:6000'
  );
  await page.getByRole('button', { name: 'Add toast', exact: true }).click();
  await expect(page.locator('swc-toast')).toHaveAttribute('open', '');
  await page.clock.runFor(20000);
  await expect(page.locator('swc-toast')).toHaveAttribute('open', '');
  await expect(
    page.getByRole('button', { name: 'Undo', exact: true })
  ).toBeVisible();
});

test('F6 and Shift+F6 move focus into the region and back', async ({
  page,
}) => {
  await gotoStory(page, 'components-toast-container--playground', 'swc-button');
  const add = page.getByRole('button', {
    name: 'Show custom toast',
    exact: true,
  });
  await add.click();
  const region = page.getByRole('region');
  await expect(region).toHaveAttribute('aria-label', '1 notification.');

  await add.focus();
  await page.keyboard.press('F6');
  await expect(region).toBeFocused();
  await page.keyboard.press('F6');
  await expect(add).toBeFocused();

  await page.keyboard.press('Shift+F6');
  await expect(region).toBeFocused();
  await page.keyboard.press('Shift+F6');
  await expect(add).toBeFocused();
});

test('F6 keeps its browser behavior while no toast is showing', async ({
  page,
}) => {
  await gotoStory(page, 'components-toast-container--playground', 'swc-button');
  await page.evaluate(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'F6') {
        (window as unknown as { f6Prevented: boolean }).f6Prevented =
          event.defaultPrevented;
      }
    });
  });
  await page
    .getByRole('button', { name: 'Show custom toast', exact: true })
    .focus();
  await page.keyboard.press('F6');
  expect(
    await page.evaluate(
      () => (window as unknown as { f6Prevented: boolean }).f6Prevented
    )
  ).toBe(false);
});
