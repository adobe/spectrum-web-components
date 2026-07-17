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
 * Accessibility tests for Infield Button component (2nd generation).
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('Infield Button - ARIA Snapshots', () => {
  test('should have correct accessibility tree for default button', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-infield-button--overview',
      'swc-infield-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Open picker"
    `);
  });

  test('should handle anatomy — all four icon-only affordances', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-infield-button--anatomy',
      'swc-infield-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Open picker"
      - button "Clear"
      - button "Increment"
      - button "Decrement"
    `);
  });

  test('should handle all four sizes with correct accessible names', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-infield-button--sizes',
      'swc-infield-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Small open picker"
      - button "Medium open picker"
      - button "Large open picker"
      - button "Extra-large open picker"
    `);
  });

  test('should handle quiet variant — same role, no ARIA change', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-infield-button--quiet',
      'swc-infield-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Open picker (default)"
      - button "Open picker (quiet)"
    `);
  });

  test('should handle disabled state with native disabled attribute', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-infield-button--states',
      'swc-infield-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Open picker"
      - button "Open picker (disabled)" [disabled]
      - button "Open picker (quiet)"
      - button "Open picker (quiet disabled)" [disabled]
    `);
  });

  test('should have correct accessibility tree for accessibility story', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-infield-button--accessibility',
      'swc-infield-button'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Open picker"
    `);
  });

  test('should have no role attribute on the host element', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-infield-button--overview',
      'swc-infield-button'
    );
    const host = root.locator('swc-infield-button').first();
    await expect(host).not.toHaveAttribute('role');
  });

  test('inner button should have tabindex="-1" — not in tab order', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-infield-button--overview',
      'swc-infield-button'
    );
    const host = root.locator('swc-infield-button').first();
    const internalButton = host.locator('button').first();
    await expect(internalButton).toHaveAttribute('tabindex', '-1');
  });
});

test.describe('Infield Button - Keyboard Interactions', () => {
  test('should NOT receive focus via Tab — button is pointer-only', async ({
    page,
  }) => {
    await gotoStory(
      page,
      'components-infield-button--overview',
      'swc-infield-button'
    );
    // Press Tab: infield buttons are removed from the tab order; no button
    // should receive keyboard focus.
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => {
      const active = document.activeElement;
      return active?.tagName.toLowerCase() ?? '';
    });
    expect(
      focused,
      'Tab does not focus swc-infield-button — component is pointer-only'
    ).not.toBe('swc-infield-button');
  });

  test('inner button should not be in tab order — tabindex="-1"', async ({
    page,
  }) => {
    await gotoStory(
      page,
      'components-infield-button--overview',
      'swc-infield-button'
    );
    // Verify that pressing Tab does not land on any infield button component.
    await page.keyboard.press('Tab');
    const isInfieldFocused = await page.evaluate(() => {
      const active = document.activeElement;
      return (
        active instanceof HTMLElement &&
        active.tagName.toLowerCase() === 'swc-infield-button'
      );
    });
    expect(isInfieldFocused, 'swc-infield-button is not in the tab order').toBe(
      false
    );
  });
});

test.describe('Infield Button - Pointer Interactions', () => {
  test('should fire click event when clicked while enabled', async ({
    page,
  }) => {
    await gotoStory(
      page,
      'components-infield-button--overview',
      'swc-infield-button'
    );
    await page.evaluate(() => {
      const el = document.querySelector('swc-infield-button')!;
      (el as any).__clickCount = 0;
      el.addEventListener('click', () => {
        (el as any).__clickCount++;
      });
    });

    await page.locator('swc-infield-button').first().click();

    const count = await page.evaluate(
      () => (document.querySelector('swc-infield-button') as any).__clickCount
    );
    expect(count, 'click event fires when button is enabled').toBe(1);
  });

  test('should not fire click event when clicked while disabled', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-infield-button--states',
      'swc-infield-button'
    );
    // The disabled button is the second in the States story.
    const disabledButton = root.locator('swc-infield-button[disabled]').first();

    await page.evaluate(() => {
      const el = document.querySelector('swc-infield-button[disabled]')!;
      (el as any).__clickCount = 0;
      el.addEventListener('click', () => {
        (el as any).__clickCount++;
      });
    });

    // Playwright click on a disabled element still dispatches the event at
    // the browser level — handleClick on the host suppresses it.
    await disabledButton.click({ force: true });

    const count = await page.evaluate(() => {
      const el = document.querySelector('swc-infield-button[disabled]') as any;
      return el.__clickCount;
    });
    expect(count, 'click is suppressed while disabled').toBe(0);
  });
});
