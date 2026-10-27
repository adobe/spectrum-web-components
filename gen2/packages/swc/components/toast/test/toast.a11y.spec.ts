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

import { expect, type Locator, type Page, test } from '@playwright/test';

import { gotoStory } from '../../../utils/a11y-helpers.js';

/**
 * Accessibility tests for standalone Toast.
 *
 * ARIA snapshot tests validate the accessibility tree structure. aXe WCAG
 * compliance and color contrast validation are run via test-storybook (see
 * .storybook/test-runner.ts). Both are included in the `test:a11y` command.
 */

// TODO(SWC-2567): add container region, landmark, and focus-on-close snapshots.
// TODO(SWC-2654, SWC-2655): add peek-stack and expanded-view snapshots.

test.describe('Toast - ARIA Snapshots', () => {
  test('open toast exposes an alertdialog with an alert and close button', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-toast--overview',
      'swc-toast'
    );
    await expect(root).toMatchAriaSnapshot(`
      - alertdialog "File saved":
        - alert: File saved
        - button "Close"
    `);
  });

  test('action renders a named button between the message and close', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-toast--anatomy',
      'swc-toast'
    );
    await expect(root).toMatchAriaSnapshot(`
      - alertdialog "File archived":
        - alert: File archived
        - button "Undo"
        - button "Close"
    `);
  });

  test('icon-label exposes the variant icon inside the alert', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-toast--overview',
      'swc-toast'
    );
    await page.evaluate(async () => {
      const toast = document.querySelector('swc-toast') as HTMLElement & {
        updateComplete: Promise<boolean>;
      };
      toast.setAttribute('variant', 'info');
      toast.setAttribute('icon-label', 'Information');
      await toast.updateComplete;
    });
    await expect(root).toMatchAriaSnapshot(`
      - alertdialog "File saved":
        - alert:
          - img "Information"
          - text: File saved
        - button "Close"
    `);
  });

  test('ID-bearing message names the alertdialog by reference', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-toast--accessibility',
      'swc-toast'
    );
    await expect(root).toMatchAriaSnapshot(`
      - alertdialog "File saved":
        - alert: File saved
        - button "Close"
      - alertdialog "Upload complete":
        - alert: Upload complete
        - button "Close"
    `);
  });
});

const focusedInToast = (page: Page): Promise<string | null> =>
  page.evaluate(() => {
    const toast = document.querySelector('swc-toast');
    if (document.activeElement !== toast) {
      return document.activeElement?.localName ?? null;
    }
    return toast?.shadowRoot?.activeElement?.localName ?? 'swc-toast';
  });

test.describe('Toast - Keyboard', () => {
  test('Tab reaches the host, the action, then close; Enter closes', async ({
    page,
  }) => {
    await gotoStory(page, 'components-toast--anatomy', 'swc-toast');
    const toast = page.locator('swc-toast');

    await page.keyboard.press('Tab');
    expect(await focusedInToast(page)).toBe('swc-toast');

    await page.keyboard.press('Tab');
    expect(await focusedInToast(page)).toBe('swc-button');

    await page.keyboard.press('Tab');
    expect(await focusedInToast(page)).toBe('swc-close-button');

    await page.keyboard.press('Enter');
    await expect(toast).not.toHaveAttribute('open');
    await expect(toast).toHaveAttribute('aria-hidden', 'true');
  });
});

const surfaceStyle = (
  toast: Locator,
  property: 'transitionDuration' | 'transitionDelay'
): Promise<string> =>
  toast.evaluate(
    (element, prop) =>
      getComputedStyle(element.shadowRoot!.querySelector('.swc-Toast')!)[prop],
    property
  );

// Matches "0s" or a list of them, which is how computed styles report it.
const INSTANT = /^0s(, 0s)*$/;

test.describe('Toast - Reduced motion', () => {
  test('removes the fade but keeps the two-frame delay', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await gotoStory(page, 'components-toast--overview', 'swc-toast');
    const toast = page.locator('swc-toast');

    expect(await surfaceStyle(toast, 'transitionDuration')).toMatch(INSTANT);
    expect(await surfaceStyle(toast, 'transitionDelay')).toBe('0.034s');
  });

  test('keeps the fade when motion is not reduced', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await gotoStory(page, 'components-toast--overview', 'swc-toast');
    const toast = page.locator('swc-toast');

    expect(await surfaceStyle(toast, 'transitionDuration')).not.toMatch(
      INSTANT
    );
  });
});
