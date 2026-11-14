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
import { gotoStory } from '@swc-test-helpers/playwright';

test.describe('Radio group - ARIA snapshots', () => {
  test('group and radio items expose their accessible structure', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-radio-group--overview',
      'swc-radio-group'
    );
    const group = root.getByRole('radiogroup', {
      name: 'Shipping options',
    });

    await expect(group).toMatchAriaSnapshot(`
      - radiogroup "Shipping options":
        - radio "Standard Shipping (Free) Delivers in 5–7 business days" [checked]
        - radio "Expedited Shipping ($9.99) Delivers in 2–3 business days"
        - radio "Overnight Shipping ($19.99) Next-day delivery"
    `);
  });

  test('required, invalid, and read-only states are exposed', async ({
    page,
  }) => {
    const requiredRoot = await gotoStory(
      page,
      'components-radio-group--necessity-indicator',
      'swc-radio-group'
    );
    // The first group is required.
    await expect(requiredRoot.getByRole('radiogroup').first()).toHaveAttribute(
      'aria-required',
      'true'
    );

    const invalidRoot = await gotoStory(
      page,
      'components-radio-group--invalid',
      'swc-radio-group'
    );
    await expect(invalidRoot.getByRole('radiogroup')).toHaveAttribute(
      'aria-invalid',
      'true'
    );

    const readOnlyRoot = await gotoStory(
      page,
      'components-radio-group--read-only',
      'swc-radio-group'
    );
    await expect(readOnlyRoot.getByRole('radiogroup')).toHaveAttribute(
      'aria-readonly',
      'true'
    );
  });

  // Playwright's own description computation only reads `aria-describedby` id
  // attributes, so it can't see element-reflected references. Read the
  // browser's accessibility tree instead.
  test('error text replaces the description in the accessible description', async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName !== 'chromium',
      'Reads the Chromium accessibility tree'
    );
    await gotoStory(page, 'components-radio-group--invalid', 'swc-radio-group');
    const client = await page.context().newCDPSession(page);
    await client.send('Accessibility.enable');
    const { nodes } = await client.send('Accessibility.getFullAXTree');
    const group = nodes.find((node) => node.role?.value === 'radiogroup');
    expect(group?.description?.value).toBe(
      'Overnight shipping is not available for this address.'
    );
  });

  test('a disabled group exposes every item as disabled', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-radio-group--disabled',
      'swc-radio-group'
    );
    // The story renders the disabled group first, then a group with one disabled item.
    const disabledGroup = root.locator('swc-radio-group').nth(0);
    await expect(disabledGroup.getByRole('radio')).toHaveCount(3);
    for (const radio of await disabledGroup.getByRole('radio').all()) {
      await expect(radio).toHaveAttribute('aria-disabled', 'true');
    }
  });

  test('a disabled item does not disable the rest of an enabled group', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-radio-group--disabled',
      'swc-radio-group'
    );
    const radios = root.locator('swc-radio-group').nth(1).getByRole('radio');
    await expect(radios.nth(0)).not.toHaveAttribute('aria-disabled', 'true');
    await expect(radios.nth(1)).toHaveAttribute('aria-disabled', 'true');
    await expect(radios.nth(2)).not.toHaveAttribute('aria-disabled', 'true');
  });
});
