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

test.describe('Radio group - ARIA snapshots', () => {
  test('group and radio items expose their accessible structure', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-radio-group--overview',
      'swc-radio-group'
    );
    const group = root.getByRole('radiogroup', { name: 'Example radios' });

    await expect(group).toMatchAriaSnapshot(`
      - radiogroup "Example radios":
        - radio "Option 1 Description for Option 1" [checked]
        - radio "Option 2 Description for Option 2"
        - radio "Option 3 Description for Option 3"
    `);
  });

  test('required, invalid, and read-only states are exposed', async ({
    page,
  }) => {
    const requiredRoot = await gotoStory(
      page,
      'components-radio-group--required',
      'swc-radio-group'
    );
    await expect(requiredRoot.getByRole('radiogroup')).toHaveAttribute(
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
});
