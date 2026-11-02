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

import type { Checkbox } from '@adobe/spectrum-wc/checkbox';

import { gotoStory } from '../../../utils/a11y-helpers.js';

/**
 * Accessibility tests for the gen2 Checkbox component.
 *
 * Tests that need trusted input, which play functions can't produce. Each
 * test configures the Playground story because the CI Storybook build
 * excludes `test/*.test.ts` stories.
 */

const PLAYGROUND = 'components-checkbox--playground';

test.describe('Checkbox - Trusted input', () => {
  test('keeps a user click when a click listener updates the checkbox', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    await checkbox.evaluate(async (element: Checkbox) => {
      element.fieldStatus = 'invalid';
      await element.updateComplete;
      const changes: boolean[] = [];
      (window as Window & { __changes?: boolean[] }).__changes = changes;
      element.addEventListener('click', () => {
        element.fieldStatus = undefined;
      });
      element.addEventListener('change', () => changes.push(element.checked));
    });

    await checkbox.locator('input').click();

    await expect(checkbox).toHaveJSProperty('checked', true);
    await expect(checkbox.locator('input')).toBeChecked();
    expect(
      await page.evaluate(
        () => (window as Window & { __changes?: boolean[] }).__changes
      )
    ).toEqual([true]);
  });

  test('Space toggles, Enter does not', async ({ page }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');

    await page.keyboard.press('Tab');
    await expect(checkbox.locator('input')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(checkbox).toHaveJSProperty('checked', false);
    await page.keyboard.press('Space');
    await expect(checkbox).toHaveJSProperty('checked', true);
  });

  test('a read-only checkbox is a Tab stop that Space does not toggle', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    await checkbox.evaluate(async (element: Checkbox) => {
      element.checked = true;
      element.fieldStatus = 'readonly';
      await element.updateComplete;
    });

    await page.keyboard.press('Tab');
    await expect(checkbox.locator('input')).toBeFocused();
    await page.keyboard.press('Space');

    await expect(checkbox.locator('input')).toBeChecked();
    await expect(checkbox).toHaveJSProperty('checked', true);
  });

  for (const initial of [false, true]) {
    test(`a click listener that sets checked to ${initial} again keeps it ${initial}, as on a native checkbox`, async ({
      page,
    }) => {
      const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
      const checkbox = root.locator('swc-checkbox');
      await checkbox.evaluate(async (element: Checkbox, value: boolean) => {
        element.checked = value;
        await element.updateComplete;
        const native = document.createElement('input');
        native.type = 'checkbox';
        native.id = 'native';
        native.checked = value;
        element.after(native);
        for (const target of [element, native]) {
          target.addEventListener('click', () => {
            target.checked = value;
          });
        }
        const changes: boolean[] = [];
        (window as Window & { __changes?: boolean[] }).__changes = changes;
        element.addEventListener('change', () => changes.push(element.checked));
      }, initial);

      await page.locator('#native').click();
      await checkbox.locator('input').click();

      await expect(page.locator('#native')).toBeChecked({ checked: initial });
      await expect(checkbox).toHaveJSProperty('checked', initial);
      await expect(checkbox.locator('input')).toBeChecked({ checked: initial });
      expect(
        await page.evaluate(
          () => (window as Window & { __changes?: boolean[] }).__changes
        )
      ).toEqual([initial]);
    });
  }

  test('a click listener that re-adds the checked attribute keeps the user toggle, as on a native checkbox', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    await checkbox.evaluate(async (element: Checkbox) => {
      element.setAttribute('checked', '');
      await element.updateComplete;
      const native = document.createElement('input');
      native.type = 'checkbox';
      native.id = 'native';
      native.setAttribute('checked', '');
      element.after(native);
      for (const target of [element, native]) {
        target.addEventListener('click', () => {
          target.setAttribute('checked', '');
        });
      }
    });

    await page.locator('#native').click();
    await checkbox.locator('input').click();

    await expect(page.locator('#native')).not.toBeChecked();
    await expect(checkbox).toHaveJSProperty('checked', false);
    await expect(checkbox.locator('input')).not.toBeChecked();
  });

  test('a click listener that sets indeterminate again keeps it, as on a native checkbox', async ({
    page,
  }) => {
    const root = await gotoStory(page, PLAYGROUND, 'swc-checkbox');
    const checkbox = root.locator('swc-checkbox');
    await checkbox.evaluate(async (element: Checkbox) => {
      element.indeterminate = true;
      await element.updateComplete;
      const native = document.createElement('input');
      native.type = 'checkbox';
      native.id = 'native';
      native.indeterminate = true;
      element.after(native);
      for (const target of [element, native]) {
        target.addEventListener('click', () => {
          target.indeterminate = true;
        });
      }
    });

    await page.locator('#native').click();
    await checkbox.locator('input').click();

    for (const input of [page.locator('#native'), checkbox.locator('input')]) {
      await expect(input).toHaveJSProperty('indeterminate', true);
      await expect(input).toBeChecked();
    }
    await expect(checkbox).toHaveJSProperty('indeterminate', true);
    await expect(checkbox).toHaveJSProperty('checked', true);
  });
});
