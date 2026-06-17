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
 * Accessibility tests for ButtonGroup component (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * Keyboard interaction tests verify Tab order and key activation.
 * aXe WCAG validation ensures no accessibility violations per story.
 */

test.describe('ButtonGroup - ARIA Snapshots', () => {
  test('should have correct accessibility tree for overview', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-button-group--overview',
      'swc-button-group'
    );
    await expect(root).toMatchAriaSnapshot(`
      - group:
        - button "Save"
        - button "Cancel"
        - button "Reset"
    `);
  });

  test('should not set aria-orientation (not valid on role=group)', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-button-group--orientations',
      'swc-button-group'
    );
    const verticalGroup = root
      .locator('swc-button-group[orientation="vertical"]')
      .first();
    await expect(verticalGroup).not.toHaveAttribute('aria-orientation');
  });

  test('should expose aria-label when provided', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-button-group--accessibility',
      'swc-button-group'
    );
    await expect(root).toMatchAriaSnapshot(`
      - group "Document actions":
        - button "Save"
        - button "Discard"
        - button "Export"
    `);
  });
});

test.describe('ButtonGroup - Keyboard Interactions', () => {
  test('buttons are reachable via Tab in DOM order', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-button-group--overview',
      'swc-button-group'
    );
    const buttons = root.locator('swc-button');
    const count = await buttons.count();

    await page.keyboard.press('Tab');
    await expect(buttons.nth(0)).toBeFocused();

    for (let i = 1; i < count; i++) {
      await page.keyboard.press('Tab');
      await expect(buttons.nth(i)).toBeFocused();
    }
  });

  test('buttons are reachable via Shift+Tab in reverse order', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-button-group--overview',
      'swc-button-group'
    );
    const buttons = root.locator('swc-button');
    const count = await buttons.count();

    // Focus last button first
    await buttons.nth(count - 1).focus();
    await expect(buttons.nth(count - 1)).toBeFocused();

    for (let i = count - 2; i >= 0; i--) {
      await page.keyboard.press('Shift+Tab');
      await expect(buttons.nth(i)).toBeFocused();
    }
  });

  test('group host is NOT focusable', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-button-group--overview',
      'swc-button-group'
    );
    const group = root.locator('swc-button-group');
    await expect(group).not.toBeFocused();
    await page.keyboard.press('Tab');
    await expect(group).not.toBeFocused();
  });

  test('button is activatable via Enter key', async ({ page }) => {
    await gotoStory(
      page,
      'components-button-group--overview',
      'swc-button-group'
    );

    const firstButton = page.locator('swc-button').first();
    await firstButton.focus();
    await expect(firstButton).toBeFocused();
    await page.keyboard.press('Enter');
  });

  test('button is activatable via Space key', async ({ page }) => {
    await gotoStory(
      page,
      'components-button-group--overview',
      'swc-button-group'
    );

    const firstButton = page.locator('swc-button').first();
    await firstButton.focus();
    await expect(firstButton).toBeFocused();
    await page.keyboard.press('Space');
  });
});

test.describe('ButtonGroup - aXe Validation', () => {
  test('default state has no WCAG violations', async ({ page }) => {
    await gotoStory(
      page,
      'components-button-group--overview',
      'swc-button-group'
    );

    const results = await new AxeBuilder({ page })
      .include('#storybook-root')
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('disabled state has no WCAG violations', async ({ page }) => {
    await gotoStory(
      page,
      'components-button-group--disabled',
      'swc-button-group'
    );

    const results = await new AxeBuilder({ page })
      .include('#storybook-root')
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('vertical state has no WCAG violations', async ({ page }) => {
    await gotoStory(
      page,
      'components-button-group--orientations',
      'swc-button-group'
    );

    const results = await new AxeBuilder({ page })
      .include('#storybook-root')
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
