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
 * Accessibility tests scoped to what swc-user-card adds on top of the
 * shared CardBase contract, which is already covered by
 * card/test/card.a11y.spec.ts (role, keyboard, title-as-link). This spec
 * covers the avatar glyph slot specifically. aXe WCAG compliance runs
 * separately via test-storybook across every story.
 */

test.describe('User card - roles and names', () => {
  test('does not set a role on the host (a plain card is a generic container)', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-user-card--overview',
      'swc-user-card'
    );
    const host = root.locator('swc-user-card').first();
    await expect(host).not.toHaveAttribute('role');
  });

  test('exposes the avatar, title, and description as readable content', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-user-card--overview',
      'swc-user-card'
    );
    await expect(root.getByRole('img', { name: 'Jane Doe' })).toBeVisible();
    await expect(root.getByText('Jane Doe')).toBeVisible();
    await expect(root.getByText('Product designer')).toBeVisible();
  });
});
