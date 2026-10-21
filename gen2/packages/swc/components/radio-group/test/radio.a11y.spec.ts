/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * this license is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { expect, test } from '@playwright/test';

import { gotoStory } from '../../../utils/a11y-helpers.js';

test.describe('Radio - ARIA snapshots', () => {
  test('radio items expose their accessible names and checked state', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-radio-group--overview',
      'swc-radio'
    );
    const radios = root.getByRole('radio');

    await expect(radios).toHaveCount(3);
    await expect(radios.first()).toHaveAttribute('role', 'radio');
    await expect(radios.first()).toHaveAttribute('aria-checked', 'true');
    await expect(radios.first()).toHaveAttribute('aria-posinset', '1');
    await expect(radios.first()).toHaveAttribute('aria-setsize', '3');
    await expect(radios.first()).toMatchAriaSnapshot(`
      - radio "Option 1 Description for Option 1" [checked]
    `);
    await expect(radios.nth(1)).toMatchAriaSnapshot(`
      - radio "Option 2 Description for Option 2"
    `);
  });

  test('group and item disabled states are exposed', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-radio-group--disabled',
      'swc-radio-group'
    );
    const groups = root.locator('swc-radio-group');

    await expect(groups.first().locator('swc-radio').first()).toHaveAttribute(
      'aria-disabled',
      'true'
    );
    await expect(groups.nth(1).locator('swc-radio').nth(1)).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });
});
