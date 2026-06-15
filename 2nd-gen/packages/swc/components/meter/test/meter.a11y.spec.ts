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
 * Accessibility tests for Meter component (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure. The WAI-ARIA
 * `meter` role lives on the shadow `.swc-LinearProgress` wrapper; the host
 * carries no ARIA role. aXe WCAG compliance and color contrast validation are
 * run via test-storybook (see .storybook/test-runner.ts). Both are included in
 * the `test:a11y` command.
 */

test.describe('Meter - ARIA Snapshots', () => {
  test('exposes the meter role with the slotted label as its name', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-meter--overview',
      'swc-meter'
    );
    await expect(root).toMatchAriaSnapshot(`
      - meter "Profile completeness"
    `);
  });

  test('names each meter across the anatomy variations', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-meter--anatomy',
      'swc-meter'
    );
    await expect(root).toMatchAriaSnapshot(`
      - meter "Label only"
      - meter "Label and description"
      - meter "Screen-reader-only label"
      - meter "Custom value text"
    `);
  });

  test('names each meter across sizes', async ({ page }) => {
    const root = await gotoStory(page, 'components-meter--sizes', 'swc-meter');
    await expect(root).toMatchAriaSnapshot(`
      - meter "Small"
      - meter "Medium"
      - meter "Large"
      - meter "Extra-large"
    `);
  });

  test('names each meter across variants', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-meter--variants',
      'swc-meter'
    );
    await expect(root).toMatchAriaSnapshot(`
      - meter "Informative"
      - meter "Positive"
      - meter "Notice"
      - meter "Negative"
    `);
  });

  test('names each meter across label positions', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-meter--label-position',
      'swc-meter'
    );
    await expect(root).toMatchAriaSnapshot(`
      - meter "Top label"
      - meter "Side label"
    `);
  });

  test('exposes a meter for each value across the range', async ({ page }) => {
    const root = await gotoStory(page, 'components-meter--values', 'swc-meter');
    await expect(root).toMatchAriaSnapshot(`
      - meter "0 %"
      - meter "25 %"
      - meter "50 %"
      - meter "75 %"
      - meter "100 %"
    `);
  });

  test('exposes a meter with a custom numeric range', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-meter--custom-range',
      'swc-meter'
    );
    await expect(root).toMatchAriaSnapshot(`
      - meter "Inputs filled"
    `);
  });

  test('should not be keyboard focusable', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-meter--overview',
      'swc-meter'
    );
    const meter = root.locator('swc-meter');
    await expect(meter).not.toBeFocused();
    await page.keyboard.press('Tab');
    await expect(meter).not.toBeFocused();
  });
});
