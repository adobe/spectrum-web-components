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
 * Accessibility tests for the Card component (2nd generation).
 *
 * aXe WCAG compliance and color-contrast validation run separately via
 * test-storybook (see .storybook/test-runner.ts) across every story; both are
 * included in the `test:a11y` command. This spec covers the card's own
 * accessibility contract, which is intentionally minimal: a card is a generic
 * container with no role of its own, so its accessible structure comes
 * entirely from the consumer's slotted content (roles, names, and focus
 * behavior), which is what these assertions target.
 */

test.describe('Card - roles and names', () => {
  test('does not set a role on the host — a plain card is a generic container', async ({
    page,
  }) => {
    const root = await gotoStory(page, 'components-card--overview', 'swc-card');
    const host = root.locator('swc-card').first();
    await expect(host).not.toHaveAttribute('role');
  });

  test('exposes slotted title and description as readable content', async ({
    page,
  }) => {
    const root = await gotoStory(page, 'components-card--overview', 'swc-card');
    await expect(root.getByText('Card title')).toBeVisible();
    await expect(root.getByText('Supporting description text.')).toBeVisible();
  });

  test('title-as-link exposes the consumer anchor as a link', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-card--title-as-link',
      'swc-card'
    );
    await expect(
      root.getByRole('link', { name: 'Linked card title' })
    ).toBeVisible();
    // A nested interactive control keeps its own role and name and is not
    // swallowed by the title link's extended hit area.
    await expect(
      root.getByRole('button', { name: 'More actions' })
    ).toBeVisible();
  });

  test('selectable card sets no role yet — deferred to the future CardView selection model', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-card--selectable',
      'swc-card'
    );
    const host = root.locator('swc-card').first();
    await expect(host).not.toHaveAttribute('role');
  });
});

test.describe('Card - keyboard', () => {
  test('a plain card is not in the tab order', async ({ page }) => {
    const root = await gotoStory(page, 'components-card--overview', 'swc-card');
    const host = root.locator('swc-card').first();
    await expect(host).not.toBeFocused();
    await page.keyboard.press('Tab');
    await expect(host).not.toBeFocused();
  });

  test('a selectable card receives focus via Tab', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-card--selectable',
      'swc-card'
    );
    const host = root.locator('swc-card').first();
    await expect(host).not.toBeFocused();
    await page.keyboard.press('Tab');
    await expect(host).toBeFocused();
  });

  test('a title-as-link card is not itself focusable — its anchor is the tab stop', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-card--title-as-link',
      'swc-card'
    );
    const host = root.locator('swc-card').first();
    const anchor = root.getByRole('link', { name: 'Linked card title' });

    await page.keyboard.press('Tab');
    await expect(anchor).toBeFocused();
    await expect(host).not.toBeFocused();
  });
});
