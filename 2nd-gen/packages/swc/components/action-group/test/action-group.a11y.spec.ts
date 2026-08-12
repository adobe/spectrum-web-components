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

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { gotoStory } from '../../../utils/a11y-helpers.js';

/**
 * Accessibility tests for ActionGroup component (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * Keyboard interaction tests verify the composite Tab-stop model (one Tab
 * stop into the strip, arrow keys move among children) — the main behavioral
 * difference from ButtonGroup, which lets Tab reach each button independently.
 * aXe WCAG validation ensures no accessibility violations per story.
 */

test.describe('ActionGroup - ARIA Snapshots', () => {
  test('should have correct accessibility tree for overview', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-action-group--overview',
      'swc-action-group'
    );
    await expect(root).toMatchAriaSnapshot(`
      - group "Text formatting":
        - button "Bold"
        - button "Italic"
        - button "Underline"
    `);
  });

  test('should not set aria-orientation (not valid on role=group)', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-action-group--orientations',
      'swc-action-group'
    );
    const verticalGroup = root
      .locator('swc-action-group[orientation="vertical"]')
      .first();
    await expect(verticalGroup).not.toHaveAttribute('aria-orientation');
  });

  test('should expose group names for each orientation', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-action-group--orientations',
      'swc-action-group'
    );
    await expect(root).toMatchAriaSnapshot(`
      - group "horizontal":
        - button "horizontal 1"
        - button "horizontal 2"
      - group "vertical":
        - button "vertical 1"
        - button "vertical 2"
    `);
  });

  test('toolbar wrapper composition exposes a toolbar landmark with named inner groups', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-action-group--toolbar-composition',
      'swc-action-group'
    );
    await expect(root).toMatchAriaSnapshot(`
      - toolbar "Document actions":
        - group "Edit actions":
          - button "Cut"
          - button "Copy"
          - button "Paste"
        - group "View actions":
          - button "Zoom in"
          - button "Zoom out"
    `);
  });

  test('disabled group sets aria-disabled on host and children', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-action-group--disabled',
      'swc-action-group'
    );
    const group = root.locator('swc-action-group');
    const buttons = root.locator('swc-action-button');

    await expect(group).toHaveAttribute('aria-disabled', 'true');
    for (const button of await buttons.all()) {
      await expect(button).toHaveAttribute('aria-disabled', 'true');
    }
  });
});

test.describe('ActionGroup - Keyboard Interactions', () => {
  test('group host is NOT focusable', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-action-group--overview',
      'swc-action-group'
    );
    const group = root.locator('swc-action-group');
    await expect(group).not.toBeFocused();
    await page.keyboard.press('Tab');
    await expect(group).not.toBeFocused();
  });

  test('Tab enters the strip once and focuses the first child', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-action-group--overview',
      'swc-action-group'
    );
    const buttons = root.locator('swc-action-button');

    await page.keyboard.press('Tab');
    await expect(buttons.nth(0)).toBeFocused();
  });

  test('a second Tab leaves the strip instead of moving to the next button', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-action-group--overview',
      'swc-action-group'
    );
    const buttons = root.locator('swc-action-button');

    await page.keyboard.press('Tab');
    await expect(buttons.nth(0)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(buttons.nth(0)).not.toBeFocused();
    await expect(buttons.nth(1)).not.toBeFocused();
    await expect(buttons.nth(2)).not.toBeFocused();
  });

  test('ArrowRight moves focus among children, ArrowLeft wraps to the last', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-action-group--overview',
      'swc-action-group'
    );
    const buttons = root.locator('swc-action-button');

    await buttons.nth(0).focus();
    await page.keyboard.press('ArrowRight');
    await expect(buttons.nth(1)).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(buttons.nth(2)).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(buttons.nth(0)).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(buttons.nth(2)).toBeFocused();
  });

  test('Home and End move focus to the first and last child', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-action-group--overview',
      'swc-action-group'
    );
    const buttons = root.locator('swc-action-button');

    await buttons.nth(0).focus();
    await page.keyboard.press('End');
    await expect(buttons.nth(2)).toBeFocused();

    await page.keyboard.press('Home');
    await expect(buttons.nth(0)).toBeFocused();
  });

  test('ArrowDown/ArrowUp move focus in a vertical group', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-action-group--orientations',
      'swc-action-group'
    );
    const verticalGroup = root
      .locator('swc-action-group[orientation="vertical"]')
      .first();
    const buttons = verticalGroup.locator('swc-action-button');

    await buttons.nth(0).focus();
    await page.keyboard.press('ArrowDown');
    await expect(buttons.nth(1)).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(buttons.nth(0)).toBeFocused();
  });

  test('button is activatable via Enter key', async ({ page }) => {
    await gotoStory(
      page,
      'components-action-group--overview',
      'swc-action-group'
    );

    const firstButton = page.locator('swc-action-button').first();
    await firstButton.focus();
    await expect(firstButton).toBeFocused();
    await page.keyboard.press('Enter');
  });

  test('button is activatable via Space key', async ({ page }) => {
    await gotoStory(
      page,
      'components-action-group--overview',
      'swc-action-group'
    );

    const firstButton = page.locator('swc-action-button').first();
    await firstButton.focus();
    await expect(firstButton).toBeFocused();
    await page.keyboard.press('Space');
  });
});

test.describe('ActionGroup - aXe Validation', () => {
  test('default state has no WCAG violations', async ({ page }) => {
    await gotoStory(
      page,
      'components-action-group--overview',
      'swc-action-group'
    );

    const results = await new AxeBuilder({ page })
      .include('#storybook-root')
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('disabled state has no WCAG violations', async ({ page }) => {
    await gotoStory(
      page,
      'components-action-group--disabled',
      'swc-action-group'
    );

    const results = await new AxeBuilder({ page })
      .include('#storybook-root')
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('vertical orientation has no WCAG violations', async ({ page }) => {
    await gotoStory(
      page,
      'components-action-group--orientations',
      'swc-action-group'
    );

    const results = await new AxeBuilder({ page })
      .include('#storybook-root')
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('compact density has no WCAG violations', async ({ page }) => {
    await gotoStory(
      page,
      'components-action-group--compact',
      'swc-action-group'
    );

    const results = await new AxeBuilder({ page })
      .include('#storybook-root')
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('quiet style has no WCAG violations', async ({ page }) => {
    await gotoStory(page, 'components-action-group--quiet', 'swc-action-group');

    const results = await new AxeBuilder({ page })
      .include('#storybook-root')
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('justified layout has no WCAG violations', async ({ page }) => {
    await gotoStory(
      page,
      'components-action-group--justified',
      'swc-action-group'
    );

    const results = await new AxeBuilder({ page })
      .include('#storybook-root')
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
